# IONOS Email Setup fuer Nachhilfe Plus

## Was jetzt im Projekt umgesetzt ist

- `public/contact.php` sendet alle Formulare per SMTP ueber IONOS.
- Das SMTP-Passwort liegt nicht mehr im Repository.
- Fuer lokale Entwicklung kann `contact.php` eine `.php.env` Datei laden.
- Vite leitet `POST /contact.php` in der lokalen Entwicklung automatisch an `http://localhost:8000/contact.php` weiter.

## 1. IONOS-Produktionssetup

Lege in IONOS oder in deiner PHP-Umgebung diese Werte an:

- `IONOS_EMAIL_HOST=smtp.ionos.de`
- `IONOS_EMAIL_PORT=465`
- `IONOS_EMAIL_SECURITY=ssl`
- `IONOS_EMAIL_USERNAME=kontakt@nachhilfe-plus.de`
- `IONOS_EMAIL_PASSWORD=DEIN_IONOS_EMAIL_PASSWORT`
- `IONOS_EMAIL_RECIPIENT=kontakt@nachhilfe-plus.de`

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
```

Die Datei `.php.env` ist in `.gitignore` ausgeschlossen und wird nicht mit committed.

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
