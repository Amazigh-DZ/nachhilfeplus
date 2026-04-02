<?php
/**
 * Nachhilfe Plus - Kontaktformular Backend
 * Contact Form Handler für IONOS
 * 
 * Anforderungen erfüllt:
 * ✓ Kein mailto:
 * ✓ Validierung (Server-seitig)
 * ✓ Honeypot-Spamschutz
 * ✓ Header-Injection-Schutz
 * ✓ Input-Sanitization
 * ✓ JSON-Response
 * ✓ IONOS-kompatibel
 */

// Header setzen (CORS + JSON)
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Nur POST-Anfragen sind erlaubt']);
    exit;
}

// JSON-Daten auslesen
$inputData = file_get_contents('php://input');
$data = json_decode($inputData, true);

// Fehlerbehandlung
if ($data === null || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Ungültiges JSON-Format']);
    exit;
}

/**
 * INPUT VALIDIERUNG
 */

// Honeypot-Check (Spam-Schutz für Bots)
// Wenn dieses versteckte Feld ausgefüllt ist, abbrechen
if (!empty($data['honeypot'] ?? '')) {
    // Stille Ablehnung (sieht für Bot normal aus, aber macht nichts)
    echo json_encode(['success' => true, 'message' => 'Danke!']);
    exit;
}

// Funktion zum Sanitären und Trimmen
function sanitizeInput($input) {
    if (is_array($input)) {
        return array_map('sanitizeInput', $input);
    }
    $input = trim($input ?? '');
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

// Eingaben sanitär
$firstName = sanitizeInput($data['firstName'] ?? '');
$lastName = sanitizeInput($data['lastName'] ?? '');
$email = sanitizeInput($data['email'] ?? '');
$phone = sanitizeInput($data['phone'] ?? '');
$subject = sanitizeInput($data['subject'] ?? '');
$message = sanitizeInput($data['message'] ?? '');

// Validierungen
$errors = [];

if (empty($firstName)) {
    $errors[] = 'Vorname ist erforderlich';
}
if (strlen($firstName) < 2) {
    $errors[] = 'Vorname muss mindestens 2 Zeichen lang sein';
}

if (empty($lastName)) {
    $errors[] = 'Nachname ist erforderlich';
}
if (strlen($lastName) < 2) {
    $errors[] = 'Nachname muss mindestens 2 Zeichen lang sein';
}

if (empty($email)) {
    $errors[] = 'E-Mail-Adresse ist erforderlich';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'E-Mail-Adresse ist ungültig';
}

if (empty($phone)) {
    $errors[] = 'Telefonnummer ist erforderlich';
}
if (strlen($phone) < 6) {
    $errors[] = 'Telefonnummer ist zu kurz';
}

if (empty($subject)) {
    $errors[] = 'Betreff ist erforderlich';
}

if (empty($message)) {
    $errors[] = 'Nachricht ist erforderlich';
}
if (strlen($message) < 10) {
    $errors[] = 'Nachricht muss mindestens 10 Zeichen lang sein';
}

// Falls Validierungsfehler: Abbrechen
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $errors[0] // Erste Fehlermeldung
    ]);
    exit;
}

/**
 * E-MAIL VERSAND
 */

// E-Mail-Adresse des Empfängers (deine Nachhilfe Plus E-Mail)
$recipientEmail = 'kontakt@nachhilfe-plus.de';

// E-Mail-Headers (mit Header-Injection-Schutz)
$emailSubject = "Neue Kontaktanfrage: " . $subject;

// Validiere, dass die $email tatsächlich eine gültige E-Mail ist (nochmal für Sicherheit)
$replyTo = filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : $recipientEmail;

$headers = [];
// Absender fest auf eigene Domain setzen, Reply-To bleibt die Nutzer-Mail
$headers[] = "From: Nachhilfe Plus <" . $recipientEmail . ">";
$headers[] = "Reply-To: " . $replyTo;
$headers[] = "Return-Path: " . $recipientEmail;
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "X-Mailer: Nachhilfe Plus Contact Form";

$emailHeaders = implode("\r\n", $headers);

// E-Mail-Body erzeugen
$emailBody = "Neue Kontaktanfrage von der Nachhilfe Plus Website\n";
$emailBody .= "==========================================\n\n";
$emailBody .= "Name: " . $firstName . " " . $lastName . "\n";
$emailBody .= "E-Mail: " . $email . "\n";
$emailBody .= "Telefon: " . $phone . "\n";
$emailBody .= "Betreff: " . $subject . "\n";
$emailBody .= "\n--- Nachricht ---\n";
$emailBody .= $message . "\n";
$emailBody .= "\n==========================================\n";
$emailBody .= "Gesendet: " . date('d.m.Y H:i:s') . "\n";
$emailBody .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Versuch zu versenden
$mailSent = false;
$envelopeFrom = "-f " . $recipientEmail;
try {
    if (function_exists("mail")) {
        // Standard PHP mail() verwenden
        $mailSent = @mail($recipientEmail, $emailSubject, $emailBody, $emailHeaders, $envelopeFrom);
    } else {
        // Falls mail() nicht verfuegbar ist
        throw new Exception("mail() Funktion nicht verfuegbar");
    }
} catch (Exception $e) {
    error_log("Mail Fehler auf Nachhilfe Plus: " . $e->getMessage());
}
}
}

/**
 * RESPONSE
 */

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Vielen Dank! Deine Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei dir!'
    ]);
} else {
    // Mail-Fehler (aber nicht an User zeigen)
    error_log('Fehler beim E-Mail-Versand für Nachhilfe Plus Kontaktformular');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Es gab ein Problem beim Versenden der Nachricht. Bitte versuche es später erneut oder kontaktiere uns direkt.'
    ]);
}

?>
