<?php
$allowedOrigins = [
    'https://nachhilfe-plus.de',
    'https://www.nachhilfe-plus.de',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($requestOrigin !== '' && in_array($requestOrigin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$requestOrigin}");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

function respond($ok, $msg, $code = 200) {
    http_response_code($code);
    echo json_encode(['success' => $ok, 'message' => $msg]);
    exit;
}

function load_php_env_file($path) {
    if (!is_readable($path)) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $trimmed = trim($line);

        if ($trimmed === '' || str_starts_with($trimmed, '#')) {
            continue;
        }

        [$key, $value] = array_pad(explode('=', $trimmed, 2), 2, '');
        $key = trim($key);
        $value = trim($value);

        if ($key === '') {
            continue;
        }

        if (
            (getenv($key) !== false && getenv($key) !== '') ||
            isset($_ENV[$key]) ||
            isset($_SERVER[$key])
        ) {
            continue;
        }

        if (
            strlen($value) >= 2 &&
            (($value[0] === '"' && $value[strlen($value) - 1] === '"') ||
             ($value[0] === "'" && $value[strlen($value) - 1] === "'"))
        ) {
            $value = substr($value, 1, -1);
        }

        putenv("{$key}={$value}");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
}

function get_config_value($key, $default = '') {
    $envValue = getenv($key);
    if ($envValue !== false && $envValue !== '') {
        return $envValue;
    }

    if (!empty($_ENV[$key])) {
        return $_ENV[$key];
    }

    if (!empty($_SERVER[$key])) {
        return $_SERVER[$key];
    }

    return $default;
}

function smtp_read_response($connection) {
    $response = '';

    while (($line = fgets($connection, 515)) !== false) {
        $response .= $line;

        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }

    return $response;
}

function smtp_write_command($connection, $command) {
    fwrite($connection, $command . "\r\n");
}

function smtp_expect_code($response, $allowedCodes) {
    $allowed = is_array($allowedCodes) ? $allowedCodes : [$allowedCodes];
    $code = substr($response, 0, 3);

    return in_array($code, array_map('strval', $allowed), true);
}

function smtp_send($host, $port, $user, $pass, $from, $to, $data, $security) {
    $remote = ($security === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $connection = @stream_socket_client($remote, $errno, $errstr, 20);

    if (!$connection) {
        return "Verbindung fehlgeschlagen: {$errstr}";
    }

    stream_set_timeout($connection, 20);

    $response = smtp_read_response($connection);
    if (!smtp_expect_code($response, 220)) {
        fclose($connection);
        return 'Unerwartete Server-Antwort: ' . trim($response);
    }

    smtp_write_command($connection, 'EHLO nachhilfe-plus.de');
    $response = smtp_read_response($connection);
    if (!smtp_expect_code($response, 250)) {
        fclose($connection);
        return 'EHLO fehlgeschlagen: ' . trim($response);
    }

    if ($security === 'tls') {
        smtp_write_command($connection, 'STARTTLS');
        $response = smtp_read_response($connection);
        if (!smtp_expect_code($response, 220)) {
            fclose($connection);
            return 'STARTTLS fehlgeschlagen: ' . trim($response);
        }

        $cryptoEnabled = stream_socket_enable_crypto(
            $connection,
            true,
            STREAM_CRYPTO_METHOD_TLS_CLIENT
        );

        if ($cryptoEnabled !== true) {
            fclose($connection);
            return 'TLS-Verschluesselung konnte nicht gestartet werden';
        }

        smtp_write_command($connection, 'EHLO nachhilfe-plus.de');
        $response = smtp_read_response($connection);
        if (!smtp_expect_code($response, 250)) {
            fclose($connection);
            return 'EHLO nach STARTTLS fehlgeschlagen: ' . trim($response);
        }
    }

    smtp_write_command($connection, 'AUTH LOGIN');
    $response = smtp_read_response($connection);
    if (!smtp_expect_code($response, 334)) {
        fclose($connection);
        return 'SMTP-Login konnte nicht gestartet werden: ' . trim($response);
    }

    smtp_write_command($connection, base64_encode($user));
    $response = smtp_read_response($connection);
    if (!smtp_expect_code($response, 334)) {
        fclose($connection);
        return 'SMTP-Benutzername wurde nicht akzeptiert: ' . trim($response);
    }

    smtp_write_command($connection, base64_encode($pass));
    $response = smtp_read_response($connection);
    if (!smtp_expect_code($response, 235)) {
        fclose($connection);
        return 'SMTP-Authentifizierung fehlgeschlagen: ' . trim($response);
    }

    smtp_write_command($connection, "MAIL FROM:<{$from}>");
    $response = smtp_read_response($connection);
    if (!smtp_expect_code($response, 250)) {
        fclose($connection);
        return 'MAIL FROM fehlgeschlagen: ' . trim($response);
    }

    smtp_write_command($connection, "RCPT TO:<{$to}>");
    $response = smtp_read_response($connection);
    if (!smtp_expect_code($response, [250, 251])) {
        fclose($connection);
        return 'RCPT TO fehlgeschlagen: ' . trim($response);
    }

    smtp_write_command($connection, 'DATA');
    $response = smtp_read_response($connection);
    if (!smtp_expect_code($response, 354)) {
        fclose($connection);
        return 'DATA fehlgeschlagen: ' . trim($response);
    }

    $escapedData = preg_replace('/^\./m', '..', $data);
    fwrite($connection, $escapedData . "\r\n.\r\n");

    $response = smtp_read_response($connection);
    smtp_write_command($connection, 'QUIT');
    fclose($connection);

    if (!smtp_expect_code($response, 250)) {
        return 'Versand fehlgeschlagen: ' . trim($response);
    }

    return true;
}

/**
 * Sendet Formulardaten zusätzlich an die Verwaltungs-App.
 * Scheitert diese Funktion, hat das KEINEN Einfluss auf den E-Mail-Versand.
 */
function send_to_verwaltung($apiUrl, $apiSecret, $payload) {
    if (empty($apiUrl) || empty($apiSecret)) {
        return;
    }

    if (!function_exists('curl_init')) {
        error_log('[Verwaltung] cURL nicht verfügbar');
        return;
    }

    $json = json_encode($payload, JSON_UNESCAPED_UNICODE);
    $ch   = curl_init($apiUrl);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $json,
        CURLOPT_TIMEOUT        => 5,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($json),
            'x-public-form-secret: ' . $apiSecret,
        ],
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error    = curl_error($ch);
    curl_close($ch);

    if ($error) {
        error_log('[Verwaltung] cURL-Fehler: ' . $error);
    } elseif ($httpCode < 200 || $httpCode >= 300) {
        error_log('[Verwaltung] HTTP ' . $httpCode . ' beim Import');
    }
}

load_php_env_file(__DIR__ . '/.php.env');
load_php_env_file(dirname(__DIR__) . '/.php.env');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Nur POST erlaubt', 405);
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    respond(false, 'Ungueltiges JSON', 400);
}

if (!empty($data['honeypot'] ?? '')) {
    respond(true, 'Danke!');
}

$formType = trim((string) ($data['formType'] ?? 'contact'));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'E-Mail ungueltig', 400);
}

if (strlen($phone) < 6) {
    respond(false, 'Telefon ist zu kurz', 400);
}

$smtpHost = get_config_value('IONOS_EMAIL_HOST', 'smtp.ionos.de');
$smtpPort = (int) get_config_value('IONOS_EMAIL_PORT', '465');
$smtpUser = get_config_value('IONOS_EMAIL_USERNAME', 'kontakt@nachhilfe-plus.de');
$smtpPass = get_config_value('IONOS_EMAIL_PASSWORD', '');
$smtpDefaultRecipient = get_config_value('IONOS_EMAIL_RECIPIENT', $smtpUser);
$smtpApplicationRecipient = 'bewerbung@nachhilfe-plus.de';
$smtpRecipient = $smtpDefaultRecipient;
$smtpSecurity = strtolower((string) get_config_value('IONOS_EMAIL_SECURITY', ''));

if ($smtpPass === '') {
    respond(false, 'Mailserver ist nicht konfiguriert. Bitte IONOS_EMAIL_PASSWORD setzen.', 500);
}

if ($smtpSecurity === '') {
    $smtpSecurity = $smtpPort === 587 ? 'tls' : 'ssl';
}

$subjectLine        = '';
$body               = '';
$verwaltungPayload  = [];

if ($formType === 'contact') {
    $firstName = trim((string) ($data['firstName'] ?? ''));
    $lastName  = trim((string) ($data['lastName']  ?? ''));
    $subject   = trim((string) ($data['subject']   ?? ''));
    $message   = trim((string) ($data['message']   ?? ''));

    if (strlen($firstName) < 2) {
        respond(false, 'Vorname ist zu kurz', 400);
    }

    if (strlen($lastName) < 2) {
        respond(false, 'Nachname ist zu kurz', 400);
    }

    if ($subject === '') {
        respond(false, 'Betreff fehlt', 400);
    }

    if (strlen($message) < 10) {
        respond(false, 'Nachricht zu kurz', 400);
    }

    $subjectLine = 'Neue Kontaktanfrage: ' . $subject;
    $body  = "Neue Kontaktanfrage von der Website\n\n";
    $body .= "Name: {$firstName} {$lastName}\n";
    $body .= "E-Mail: {$email}\n";
    $body .= "Telefon: {$phone}\n";
    $body .= "Betreff: {$subject}\n\n";
    $body .= "Nachricht:\n{$message}\n";

    $verwaltungPayload = [
        'formType'   => 'contact',
        'first_name' => $firstName,
        'last_name'  => $lastName,
        'email'      => $email,
        'phone'      => $phone,
        'subject'    => $subject,
        'message'    => $message,
    ];
} elseif ($formType === 'booking') {
    $name     = trim((string) ($data['name'] ?? ''));
    $mode     = trim((string) ($data['mode'] ?? ''));
    $subjects = $data['subjects'] ?? [];

    if (strlen($name) < 2) {
        respond(false, 'Name ist zu kurz', 400);
    }

    if ($mode === '') {
        respond(false, 'Modus fehlt', 400);
    }

    if (!is_array($subjects) || count($subjects) === 0) {
        respond(false, 'Bitte waehle mindestens ein Fach', 400);
    }

    $cleanSubjects = array_values(array_filter(array_map(function ($subject) {
        return trim((string) $subject);
    }, $subjects)));

    if (count($cleanSubjects) === 0) {
        respond(false, 'Bitte waehle mindestens ein Fach', 400);
    }

    $subjectLine = 'Neue Termin-Anfrage: ' . $name;
    $body  = "Neue Termin-Anfrage von der Website\n\n";
    $body .= "Name: {$name}\n";
    $body .= "E-Mail: {$email}\n";
    $body .= "Telefon: {$phone}\n";
    $body .= "Modus: {$mode}\n";
    $body .= 'Faecher: ' . implode(', ', $cleanSubjects) . "\n";

    $nameParts = explode(' ', $name, 2);
    $verwaltungPayload = [
        'formType'   => 'booking',
        'first_name' => $nameParts[0],
        'last_name'  => $nameParts[1] ?? '',
        'email'      => $email,
        'phone'      => $phone,
        'subjects'   => $cleanSubjects,
        'message'    => "Unterrichtsart: {$mode}",
    ];
} elseif ($formType === 'application') {
    $fullName     = trim((string) ($data['fullName']     ?? ''));
    $status       = trim((string) ($data['status']       ?? ''));
    $jobTitle     = trim((string) ($data['jobTitle']     ?? 'Initiativbewerbung'));
    $availability = trim((string) ($data['availability'] ?? ''));
    $subjects     = $data['subjects'] ?? [];

    if (strlen($fullName) < 2) {
        respond(false, 'Name ist zu kurz', 400);
    }

    if ($status === '') {
        respond(false, 'Status fehlt', 400);
    }

    if (!is_array($subjects) || count($subjects) === 0) {
        respond(false, 'Bitte trage mindestens ein Fach ein', 400);
    }

    $subjectLines = [];
    foreach ($subjects as $entry) {
        if (!is_array($entry)) {
            continue;
        }

        $subjectName = trim((string) ($entry['name']  ?? ''));
        $grade       = trim((string) ($entry['grade'] ?? ''));

        if ($subjectName === '' || $grade === '') {
            continue;
        }

        $subjectLines[] = "- {$subjectName} (bis {$grade})";
    }

    if (count($subjectLines) === 0) {
        respond(false, 'Bitte trage mindestens ein gueltiges Fach ein', 400);
    }

    $smtpRecipient = $smtpApplicationRecipient !== '' ? $smtpApplicationRecipient : $smtpDefaultRecipient;
    $subjectLine   = 'Neue Bewerbung: ' . $jobTitle;
    $body  = "Neue Bewerbung von der Website\n\n";
    $body .= "Position: {$jobTitle}\n";
    $body .= "Name: {$fullName}\n";
    $body .= "E-Mail: {$email}\n";
    $body .= "Telefon: {$phone}\n";
    $body .= "Status: {$status}\n\n";
    $body .= "Faecher und Klassenstufen:\n" . implode("\n", $subjectLines) . "\n";

    if ($availability !== '') {
        $body .= "\nVerfuegbarkeit:\n{$availability}\n";
    }

    $nameParts     = explode(' ', $fullName, 2);
    $subjectNames  = array_values(array_filter(array_map(
        fn($s) => trim((string) ($s['name'] ?? '')),
        array_filter($subjects, fn($s) => is_array($s))
    )));

    $verwaltungPayload = [
        'formType'           => 'application',
        'first_name'         => $nameParts[0],
        'last_name'          => $nameParts[1] ?? '',
        'email'              => $email,
        'phone'              => $phone,
        'subject'            => $jobTitle,
        'job_title'          => $jobTitle,
        'message'            => $availability,
        'availability'       => $availability,
        'subjects'           => $subjectNames,
        'application_status' => $status,
    ];
} else {
    respond(false, 'Unbekannter Formulartyp', 400);
}

$body .= "\nGesendet: " . date('d.m.Y H:i:s') . "\n";
$body .= 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unbekannt') . "\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode($subjectLine) . '?=';
$headers = [
    "From: Nachhilfe Plus <{$smtpUser}>",
    "Reply-To: {$email}",
    "To: {$smtpRecipient}",
    "Subject: {$encodedSubject}",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$smtpData = implode("\r\n", array_merge($headers, ['', $body]));
$result   = smtp_send(
    $smtpHost,
    $smtpPort,
    $smtpUser,
    $smtpPass,
    $smtpUser,
    $smtpRecipient,
    $smtpData,
    $smtpSecurity
);

if ($result === true) {
    // E-Mail wurde erfolgreich gesendet.
    // Zusätzlich: Datensatz in Verwaltungs-App speichern (fire-and-forget).
    $verwaltungApiUrl    = get_config_value('VERWALTUNG_API_URL', '');
    $verwaltungApiSecret = get_config_value('VERWALTUNG_API_SECRET', '');
    send_to_verwaltung($verwaltungApiUrl, $verwaltungApiSecret, $verwaltungPayload);

    respond(true, 'Vielen Dank! Deine Nachricht wurde gesendet.');
}

error_log('Mail Fehler SMTP: ' . $result);
respond(false, 'Mailversand fehlgeschlagen: ' . $result, 500);
?>
