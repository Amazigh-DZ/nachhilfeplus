# IONOS Email Setup fuer Nachhilfe Plus

## Was jetzt im Projekt umgesetzt ist

- `public/contact.php` sendet Kontakt- und Terminformulare per SMTP ueber IONOS.
- Bewerbungen gehen fest an `bewerbung@nachhilfe-plus.de`.
- Das SMTP-Passwort liegt nicht mehr im Repository.
- Fuer lokale Entwicklung kann `contact.php` eine `.php.env` Datei laden.
- Vite leitet `POST /contact.php` in der lokalen Entwicklung automatisch an `http://localhost:8000/contact.php` weiter.
- Das Frontend kann alternativ ueber `VITE_FORM_ENDPOINT` an einen separaten PHP-Webspace-Endpunkt senden.

## Empfohlene Live-Architektur fuer IONOS

Wenn Deploy Now dein Frontend nur statisch ausliefert, nutze zwei Ziele:

- Website: `https://nachhilfe-plus.de`
- PHP-Mailer auf Webspace: `https://mail.nachhilfe-plus.de/contact.php`

Dann setzt du fuer den Frontend-Build:

```env
VITE_FORM_ENDPOINT=https://mail.nachhilfe-plus.de/contact.php
```

So spricht das React-Frontend nicht mehr `/contact.php` auf dem statischen Deploy an, sondern direkt den echten PHP-Endpunkt auf dem IONOS-Webspace.

## 1. IONOS-Produktionssetup

Lege in IONOS oder in deiner PHP-Umgebung diese Werte an:

- `IONOS_EMAIL_HOST=smtp.ionos.de`
- `IONOS_EMAIL_PORT=465`
- `IONOS_EMAIL_SECURITY=ssl`
- `IONOS_EMAIL_USERNAME=kontakt@nachhilfe-plus.de`
- `IONOS_EMAIL_PASSWORD=DEIN_IONOS_EMAIL_PASSWORT`
- `IONOS_EMAIL_RECIPIENT=kontakt@nachhilfe-plus.de`
- `VERWALTUNG_API_URL=https://manager.nachhilfe-plus.de/api/public/website-submissions`
- `VERWALTUNG_API_SECRET=DER_GLEICHE_ZUFALLSWERT_WIE_PUBLIC_FORMS_API_KEY_AUF_DEM_MANAGER`

Wenn dein IONOS-Setup stattdessen `587` nutzt, setze:

- `IONOS_EMAIL_PORT=587`
- `IONOS_EMAIL_SECURITY=tls`

## 2. Lokale Entwicklung

Erstelle im Projekt eine Datei `.php.env` auf Basis von `.php.env.example`.

Beispiel:

```env
IONOS_EMAIL_HOST=smtp.ionos.de
IONOS_EMAIL_PORT=465
IONOS_EMAIL_SECURITY=ssl
IONOS_EMAIL_USERNAME=kontakt@nachhilfe-plus.de
IONOS_EMAIL_PASSWORD=DEIN_IONOS_EMAIL_PASSWORT
IONOS_EMAIL_RECIPIENT=kontakt@nachhilfe-plus.de
VERWALTUNG_API_URL=https://manager.nachhilfe-plus.de/api/public/website-submissions
VERWALTUNG_API_SECRET=EIN_SEPARATER_ZUFALLSWERT_MIT_MINDESTENS_32_ZEICHEN
```

Die Datei `.php.env` ist in `.gitignore` ausgeschlossen und wird nicht mit committed.

Wenn du lokal eine andere Formular-URL erzwingen willst, kannst du zusaetzlich eine `.env.local` anlegen:

```env
VITE_FORM_ENDPOINT=http://localhost:8000/contact.php
```

## 3. Lokal testen

Starte zuerst den PHP-Server:

```bash
php -S localhost:8000 -t public
```

Starte danach in einem zweiten Terminal den Vite-Server:

```bash
npm run dev
```

Dann oeffnest du:

```text
http://localhost:5173
```

Weil `vite.config.js` jetzt einen Proxy fuer `/contact.php` hat, laufen Formular-Requests lokal automatisch zum PHP-Server auf Port `8000`.

## 4. Wichtige Dateien

- SMTP-Endpoint: `public/contact.php`
- Lokaler Proxy: `vite.config.js`
- Beispiel-Konfiguration: `.php.env.example`
- Ausschluss von Geheimnissen: `.gitignore`

## 5. Checks

PHP-Syntax pruefen:

```bash
php -l public/contact.php
```

Frontend pruefen:

```bash
npx tsc --noEmit
```

Produktionsbuild pruefen:

```bash
npm run build
```

## 6. Wichtiger Sicherheitshinweis

In einer frueheren Version lag das SMTP-Passwort direkt in `contact.php`. Wenn dieses Passwort schon einmal gepusht oder deployed wurde, solltest du das IONOS-Mailpasswort sofort aendern.

## 7. Sichere Übergabe an den Nachhilfe-Plus-Manager

Kontakt-, Termin- und Bewerbungsformulare werden erst als erfolgreich angezeigt,
wenn der Manager die Anfrage eindeutig gespeichert hat. Die Übergabe läuft
Server-zu-Server: Browser erhalten weder `VERWALTUNG_API_SECRET` noch
`PUBLIC_FORMS_API_KEY`.

1. Erzeuge auf dem Manager-VPS einen neuen, separaten Wert, zum Beispiel mit
   `openssl rand -hex 32`.
2. Trage ihn in `/opt/nachhilfe-plus-manager/.env.production` als
   `PUBLIC_FORMS_API_KEY=...` ein und starte nach dem Manager-Deployment die
   Container neu.
3. Trage denselben Wert ausschließlich in die nicht versionierte
   `.php.env` des PHP-Webspace als `VERWALTUNG_API_SECRET=...` ein. Ergänze
   dort außerdem `VERWALTUNG_API_URL=https://manager.nachhilfe-plus.de/api/public/website-submissions`.
4. Lege niemals einen dieser Werte als `VITE_*`-Variable, in GitHub Secrets für
   den Frontend-Build oder in JavaScript ab.

Der Manager prüft das Geheimnis zeitkonstant, begrenzt den Endpunkt zusätzlich
pro Server-IP und verwendet eine UUID pro Sendevorgang. Bei einer Wiederholung
derselben Übertragung wird kein doppelter Interessent und keine doppelte
Bewerbung erstellt.
