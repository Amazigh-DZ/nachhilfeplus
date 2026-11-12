<?php
$allowedOrigins = [
    'https://nachhilfe-plus.de',
    'https://www.nachhilfe-plus.de',
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

/** Limits mirror the manager API (website-form-intake.ts), so a request can never
 * pass here and be rejected there afterwards. Counted in characters, not bytes. */
function too_long($value, $max) {
    // preg_match_all counts UTF-8 characters without requiring the mbstring extension.
    return preg_match_all('/./us', (string) $value) > $max;
}

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

/** Sendet an die Verwaltungs-App und bestätigt nur eine eindeutige Annahme.
 * Das Geheimnis liegt ausschließlich in der PHP-Umgebung, nie im Browser. */
function send_to_verwaltung($apiUrl, $apiSecret, $payload) {
    if (empty($apiUrl) || empty($apiSecret)) {
        return [false, 'Schnittstelle nicht konfiguriert'];
    }

    if (!function_exists('curl_init')) {
        error_log('[Verwaltung] cURL nicht verfügbar');
        return [false, 'cURL nicht verfügbar'];
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

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error    = curl_error($ch);
    curl_close($ch);

    if ($error) {
        error_log('[Verwaltung] cURL-Fehler: ' . $error);
        return [false, 'Übertragung fehlgeschlagen'];
    } elseif ($httpCode < 200 || $httpCode >= 300) {
        error_log('[Verwaltung] HTTP ' . $httpCode . ' beim Import');
        return [false, 'Verwaltung hat die Anfrage abgelehnt'];
    }

    $decoded = json_decode((string) $response, true);
    if (!is_array($decoded) || empty($decoded['accepted'])) {
        error_log('[Verwaltung] keine bestätigte Annahme');
        return [false, 'Keine bestätigte Annahme'];
    }
    return [true, null];
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

// Spam-Schutz: verdaechtige Anfragen werden still verworfen (Bot bekommt "Erfolg")
function looks_like_gibberish($text) {
    $text = trim((string) $text);
    if ($text === '') {
        return false;
    }

    foreach (preg_split('/\s+/', $text) as $word) {
        // z.B. "kboXHbwBcjHWqyCAsGG": langes Wort mit vielen Gross-/Klein-Wechseln
        if (strlen($word) >= 8 && preg_match_all('/[a-z][A-Z]/', $word) >= 2) {
            return true;
        }
    }

    return false;
}

function is_rate_limited($ip, $max = 3, $window = 600) {
    $file = sys_get_temp_dir() . '/np_rate_' . md5($ip);
    $now = time();
    $hits = [];

    if (is_readable($file)) {
        $hits = array_filter(
            array_map('intval', explode(',', (string) file_get_contents($file))),
            function ($t) use ($now, $window) { return $t > $now - $window; }
        );
    }

    if (count($hits) >= $max) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, implode(',', $hits), LOCK_EX);
    return false;
}

$spamReason = '';
$elapsed = $data['_elapsed'] ?? null;
$emailLocal = strtolower(strstr((string) ($data['email'] ?? ''), '@', true) ?: '');
$emailDomain = strtolower(substr(strrchr((string) ($data['email'] ?? ''), '@') ?: '', 1));

if (!empty($data['honeypot'] ?? '')) {
    $spamReason = 'honeypot';
} elseif ($requestOrigin === '' || !in_array($requestOrigin, $allowedOrigins, true)) {
    $spamReason = 'origin';
} elseif (!is_numeric($elapsed) || $elapsed < 3000) {
    $spamReason = 'too fast';
} elseif (in_array($emailDomain, ['gmail.com', 'googlemail.com'], true) && substr_count($emailLocal, '.') >= 3) {
    $spamReason = 'gmail dot trick';
} else {
    foreach (['firstName', 'lastName', 'name', 'fullName', 'message', 'availability'] as $field) {
        if (looks_like_gibberish($data[$field] ?? '')) {
            $spamReason = "gibberish in {$field}";
            break;
        }
    }
}

if ($spamReason === '' && is_rate_limited($_SERVER['REMOTE_ADDR'] ?? 'unknown')) {
    $spamReason = 'rate limit';
}

if ($spamReason !== '') {
    error_log('Spam blockiert (' . $spamReason . ') von ' . ($_SERVER['REMOTE_ADDR'] ?? 'unbekannt'));
    respond(true, 'Vielen Dank! Deine Nachricht wurde gesendet.');
}

$formType = trim((string) ($data['formType'] ?? 'contact'));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$submissionId = trim((string) ($data['submissionId'] ?? ''));

if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $submissionId)) {
    respond(false, 'Die Übertragung konnte nicht sicher zugeordnet werden. Bitte Seite neu laden und erneut versuchen.', 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'E-Mail ungueltig', 400);
}

if (strlen($phone) < 6) {
    respond(false, 'Telefon ist zu kurz', 400);
}

if (too_long($email, 254)) {
    respond(false, 'E-Mail ist zu lang', 400);
}

if (too_long($phone, 40)) {
    respond(false, 'Telefonnummer ist zu lang (max. 40 Zeichen)', 400);
}

$smtpHost = get_config_value('IONOS_EMAIL_HOST', 'smtp.ionos.de');
$smtpPort = (int) get_config_value('IONOS_EMAIL_PORT', '465');
$smtpUser = get_config_value('IONOS_EMAIL_USERNAME', 'kontakt@nachhilfe-plus.de');
$smtpPass = get_config_value('IONOS_EMAIL_PASSWORD', '');
$smtpDefaultRecipient = get_config_value('IONOS_EMAIL_RECIPIENT', $smtpUser);
$smtpApplicationRecipient = 'bewerbung@nachhilfe-plus.de';
$smtpRecipient = $smtpDefaultRecipient;
$smtpSecurity = strtolower((string) get_config_value('IONOS_EMAIL_SECURITY', ''));

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

    if (too_long($firstName, 100) || too_long($lastName, 100)) {
        respond(false, 'Name ist zu lang (max. 100 Zeichen)', 400);
    }

    if (too_long($subject, 150)) {
        respond(false, 'Betreff ist zu lang (max. 150 Zeichen)', 400);
    }

    if (too_long($message, 4000)) {
        respond(false, 'Nachricht ist zu lang (max. 4000 Zeichen)', 400);
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

    if (count($cleanSubjects) > 20) {
        respond(false, 'Bitte waehle hoechstens 20 Faecher', 400);
    }

    foreach ($cleanSubjects as $cleanSubject) {
        if (too_long($cleanSubject, 100)) {
            respond(false, 'Ein Fachname ist zu lang (max. 100 Zeichen)', 400);
        }
    }

    if (too_long($mode, 100)) {
        respond(false, 'Unterrichtsart ist ungueltig', 400);
    }

    $nameParts = preg_split('/\s+/u', $name, 2);
    if (too_long($nameParts[0], 100) || too_long($nameParts[1] ?? '', 100)) {
        respond(false, 'Name ist zu lang (max. 100 Zeichen)', 400);
    }

    $subjectLine = 'Neue Termin-Anfrage: ' . $name;
    $body  = "Neue Termin-Anfrage von der Website\n\n";
    $body .= "Name: {$name}\n";
    $body .= "E-Mail: {$email}\n";
    $body .= "Telefon: {$phone}\n";
    $body .= "Modus: {$mode}\n";
    $body .= 'Faecher: ' . implode(', ', $cleanSubjects) . "\n";

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
    $jobTitle     = trim((string) ($data['jobTitle']     ?? ''));
    if ($jobTitle === '') {
        $jobTitle = 'Initiativbewerbung';
    }
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
    $cleanSubjectEntries = [];
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
        $cleanSubjectEntries[] = ['name' => $subjectName, 'grade' => $grade];
    }

    if (count($subjectLines) === 0) {
        respond(false, 'Bitte trage mindestens ein gueltiges Fach ein', 400);
    }

    // The manager stores applicants with separate first and last names.
    $nameParts = preg_split('/\s+/u', $fullName, 2);
    if (!isset($nameParts[1]) || trim($nameParts[1]) === '') {
        respond(false, 'Bitte gib deinen Vor- und Nachnamen an', 400);
    }

    if (too_long($nameParts[0], 100) || too_long($nameParts[1], 100)) {
        respond(false, 'Name ist zu lang (max. 100 Zeichen)', 400);
    }

    if (too_long($jobTitle, 150)) {
        respond(false, 'Stellenbezeichnung ist zu lang', 400);
    }

    if (too_long($status, 100)) {
        respond(false, 'Status ist zu lang (max. 100 Zeichen)', 400);
    }

    if (too_long($availability, 2000)) {
        respond(false, 'Verfuegbarkeit ist zu lang (max. 2000 Zeichen)', 400);
    }

    if (count($cleanSubjectEntries) > 20) {
        respond(false, 'Bitte trage hoechstens 20 Faecher ein', 400);
    }

    foreach ($cleanSubjectEntries as $entry) {
        if (too_long($entry['name'], 100) || too_long($entry['grade'], 40)) {
            respond(false, 'Fach oder Klassenstufe ist zu lang', 400);
        }
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
        'subjects'           => $cleanSubjectEntries,
        'application_status' => $status,
    ];
} else {
    respond(false, 'Unbekannter Formulartyp', 400);
}

$body .= "\nGesendet: " . date('d.m.Y H:i:s') . "\n";
$body .= 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unbekannt') . "\n";

$verwaltungPayload['submissionId'] = $submissionId;
$verwaltungApiUrl    = get_config_value('VERWALTUNG_API_URL', '');
$verwaltungApiSecret = get_config_value('VERWALTUNG_API_SECRET', '');
[$accepted, $integrationError] = send_to_verwaltung($verwaltungApiUrl, $verwaltungApiSecret, $verwaltungPayload);
if (!$accepted) {
    error_log('[Verwaltung] Anfrage nicht angenommen: ' . $integrationError);
    respond(false, 'Deine Anfrage konnte gerade nicht sicher gespeichert werden. Bitte versuche es später erneut.', 503);
}

// The management record is authoritative. An incomplete SMTP setup must not
// discard a request which has already been confirmed by the manager.
if ($smtpPass === '') {
    error_log('Mail Hinweis: IONOS_EMAIL_PASSWORD fehlt nach bestätigter Speicherung.');
    respond(true, 'Vielen Dank! Deine Anfrage wurde sicher gespeichert. Wir melden uns in Kürze.');
}

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

// The administrative record is authoritative. SMTP remains a notification for
// the team; an SMTP outage must not make an already saved request look lost.
if ($result !== true) {
    error_log('Mail Fehler SMTP nach bestätigter Speicherung: ' . $result);
}
respond(true, 'Vielen Dank! Deine Anfrage wurde sicher gespeichert. Wir melden uns in Kürze.');
?>
