<?php
header('Content-Type: application/json; charset=utf-8');

// Simple JSON response helper
function respond($ok, $msg, $code = 200) {
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $msg]);
    exit;
}

// Only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Nur POST erlaubt', 405);
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    respond(false, 'Ungültiges JSON', 400);
}

// Honeypot
if (!empty($data['honeypot'] ?? '')) {
    respond(true, 'Danke!');
}

// Sanitize
$fn = trim($data['firstName'] ?? '');
$ln = trim($data['lastName'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if (strlen($fn) < 2) respond(false, 'Vorname ist zu kurz', 400);
if (strlen($ln) < 2) respond(false, 'Nachname ist zu kurz', 400);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(false, 'E-Mail ungültig', 400);
if (strlen($phone) < 6) respond(false, 'Telefon ist zu kurz', 400);
if ($subject === '') respond(false, 'Betreff fehlt', 400);
if (strlen($message) < 10) respond(false, 'Nachricht zu kurz', 400);

// SMTP settings (IONOS)
$smtpHost = 'smtp.ionos.de';
$smtpPort = 465;
$smtpUser = 'kontakt@nachhilfe-plus.de';
$smtpPass = 'Amazigh_2025?';
$recipient = 'kontakt@nachhilfe-plus.de';
$from = $smtpUser;
$replyTo = $email;

// Build email
$body  = "Neue Kontaktanfrage von der Website\n\n";
$body .= "Name: $fn $ln\n";
$body .= "E-Mail: $email\n";
$body .= "Telefon: $phone\n";
$body .= "Betreff: $subject\n\n";
$body .= "Nachricht:\n$message\n\n";
$body .= "Gesendet: " . date('d.m.Y H:i:s') . "\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unbekannt') . "\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode('Neue Kontaktanfrage: ' . $subject) . '?=';

$headers = [];
$headers[] = "From: Nachhilfe Plus <{$from}>";
$headers[] = "Reply-To: {$replyTo}";
$headers[] = "To: {$recipient}";
$headers[] = "Subject: {$encodedSubject}";
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$dataLines = array_merge($headers, ['',$body]);
$smtpData = implode("\r\n", $dataLines) . "\r\n";

function smtp_send($host, $port, $user, $pass, $from, $to, $data) {
    $fp = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 15);
    if (!$fp) return "connect: $errstr";
    stream_set_timeout($fp, 15);
    $read = function($expect) use ($fp) {
        $resp = '';
        while (($line = fgets($fp)) !== false) {
            $resp .= $line;
            if (preg_match('#^' . $expect . ' #', $line)) break;
        }
        return $resp;
    };
    $write = fn($cmd) => fwrite($fp, $cmd . "\r\n");

    $read('2'); // greeting
    $write("EHLO nachhilfe-plus.de"); $read('2');
    $write("AUTH LOGIN"); $read('3');
    $write(base64_encode($user)); $read('3');
    $write(base64_encode($pass)); $auth = $read('2');
    if (strpos($auth, '235') !== 0) { fclose($fp); return 'auth failed'; }

    $write("MAIL FROM:<{$from}>"); $mf = $read('2');
    if (strpos($mf, '250') !== 0) { fclose($fp); return 'MAIL FROM failed'; }
    $write("RCPT TO:<{$to}>"); $rt = $read('2');
    if (strpos($rt, '250') !== 0) { fclose($fp); return 'RCPT TO failed'; }
    $write("DATA"); $read('3');
    $write($data . "\r\n.");
    $dt = $read('2');
    $write("QUIT");
    fclose($fp);
    if (strpos($dt, '250') !== 0) return 'DATA failed';
    return true;
}

$res = smtp_send($smtpHost, $smtpPort, $smtpUser, $smtpPass, $from, $recipient, $smtpData);
if ($res === true) {
    respond(true, 'Vielen Dank! Deine Nachricht wurde gesendet.');
}
error_log('Mail Fehler SMTP: ' . $res);
respond(false, 'Mailversand fehlgeschlagen: ' . $res, 500);
?>
