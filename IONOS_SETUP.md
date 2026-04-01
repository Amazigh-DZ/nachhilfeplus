# 📧 IONOS Backend-Integration für Kontaktformular

## Schritt 1: contact.php auf IONOS hochladen

### A) FileManager / FTP nutzen

1. **Melde dich bei IONOS an:**
   - Gehe zu https://www.ionos.de
   - Login in deinen Account

2. **Navigiere zu deinen Produkten:**
   - Klick auf "Meine Produkte"
   - Wähle deinen Webspace/deine Domain

3. **Öffne File Manager oder FTP:**
   - Im IONOS-Dashboard: "Website & Domains" → deine Domain
   - Klick auf "Verwaltung" oder "File Manager"
   - Oder nutze FTP-Client (z.B. FileZilla)

4. **Lade die Datei hoch:**
   - Finde die **contact.php** Datei (aus diesem Repository)
   - Lade sie in den **Root-Verzeichnis** deines Webspace hoch
   - **Wichtig:** ins Root, nicht in einen Unterordner!
   - Beispiel-Pfad: `/www/` oder `/public_html/`

### B) Struktur nach Upload:

```
/www/
├── index.html          (deine Website)
├── css/                (deine CSS-Dateien)
├── js/                 (deine JS-Dateien)
├── contact.php         ← HIER HOCHLADEN!
└── ...
```

---

## Schritt 2: Vite Build konfigurieren (Optional - nur falls nötig)

Falls bei dir ein Vite-Build das Projekt prozessiert, muss `contact.php` im Build erhalten bleiben:

**vite.config.js:**
```javascript
export default {
  build: {
    // contact.php wird als statische Datei kopiert
    copyPublicDir: true,
  }
}
```

Falls `contact.php` im `public/` Ordner liegt, wird sie automatisch ins dist/ kopiert.

---

## Schritt 3: Frontend-URL konfigurieren

### Wichtig: Wo wird contact.php gesucht?

Im **Contact.tsx** wird derzeit diese URL verwendet:
```typescript
const response = await fetch('/contact.php', {
```

Das bedeutet: "Suche contact.php im Root der Website"

### Falls deine Website auf einer Subdomain läuft:

**Beispiel:** https://nachhilfe-plus.de/website/

Dann ändere die Fetch-URL in Contact.tsx:
```typescript
const response = await fetch('/website/contact.php', {
```

### Falls contact.php in einem Ordner liegt:

**Beispiel:** `/mail/contact.php`

Dann:
```typescript
const response = await fetch('/mail/contact.php', {
```

---

## Schritt 4: E-Mail-Empfänger anpassen

In **contact.php** (Zeile ~112):
```php
$recipientEmail = 'kontakt@nachhilfe-plus.de';
```

✓ Das ist bereits korrekt eingestellt
✓ Falls anders gewünscht: hier anpassen

---

## Schritt 5: Testen

### Test 1: PHP-Syntax prüfen
```bash
php -l contact.php
```
Sollte `No syntax errors detected` ausgeben.

### Test 2: Formular testen

1. Öffne deine Website im Browser
2. Scrolle zum Kontaktformular
3. Fülle alle Felder aus
4. Klick "Nachricht Senden"
5. Bei Erfolg: Grüne Meldung ✓
6. Prüfe dein E-Mail-Postfach

### Test 3: Entwickler-Tools (F12)

Öffne die Browser-Konsole (F12):
- Network-Tab: Prüfe die `/contact.php` Request
- Response sollte JSON sein: `{"success": true, "message": "..."}`

---

## Sicherheitsfeatures (bereits implementiert)

✓ **Honeypot-Feld** - Bot-Schutz
✓ **Serverseitige Validierung** - Pflichtfelder
✓ **E-Mail-Format-Check** - Ungültige E-Mails abgelehnt
✓ **Header-Injection-Schutz** - Keine Mail-Header-Manipulation
✓ **Input-Sanitization** - XSS-Schutz mit htmlspecialchars()
✓ **JSON-Response** - Keine Datenlecks in der Response

---

## Häufige Probleme & Lösungen

### ❌ Problem: 404 Fehler bei /contact.php

**Ursache:** contact.php liegt nicht im Root

**Lösung:**
- Prüfe, dass contact.php im Root-Verzeichnis ist
- Nicht in `/src/`, `/public/`, `/components/`
- Correct: `/www/contact.php` oder `/public_html/contact.php`

---

### ❌ Problem: 500 Fehler in contact.php

**Ursache:** PHP-Fehler oder mail() nicht verfügbar

**Lösung:**
1. Prüfe PHP-Syntax: `php -l contact.php`
2. Prüfe IONOS Error-Logs
3. Kontaktiere IONOS Support, falls mail() deaktiviert ist

---

### ❌ Problem: E-Mail kommt nicht an

**Ursache:** 
- IONOS Mail-Service nicht korrekt konfiguriert
- Zeichen in Subject/Body-Feldern verursachen Probleme

**Lösung:**
1. Stelle sicher, dass die E-Mail-Adresse korrekt ist
2. Prüfe Spam-Ordner
3. Kontaktiere IONOS Support
4. Nutze ein Tool wie SMTP zur Konfiguration

---

### ❌ Problem: CORS-Fehler in Browser-Konsole

**Sie haben zwar die CORS-Header in contact.php, aber:**

Falls Fehler kommen, prüfe:
1. Das Frontend sendet an die gleiche Domain
2. Falls unterschiedliche Domains: CORS in contact.php prüfen

---

### ❌ Problem: Formular wird nach Versand nicht geleert

Das sollte eigentlich automatisch passieren. Falls nicht:

In **Contact.tsx** nach erfolgreicher Response:
```typescript
if (data.success) {
    setSuccessMessage('...');
    // Reset form
    setFormData({...});
}
```

Das ist bereits implementiert ✓

---

## Deployment-Checkliste

- [ ] contact.php ist im Root der Website hochgeladen
- [ ] PHP-Syntax ist korrekt (`php -l contact.php`)
- [ ] E-Mail-Adresse in contact.php ist korrekt
- [ ] Frontend-URL (`/contact.php`) passt zur Umgebung
- [ ] Formular wurde getestet
- [ ] E-Mail wurde erhalten
- [ ] Honeypot-Feld ist versteckt (in Contact.tsx mit `display: none`)

---

## Falls noch Fragen...

Falls Probleme auftreten:
1. Prüfe die Browser-Konsole (F12 → Network/Console)
2. Prüfe die IONOS Fehler-Logs
3. Teste mit einem einfachen HTML-Formular, ob PHP/mail() funktioniert
4. Kontaktiere IONOS Support

---

**Fertig!** 🚀 Dein Kontaktformular läuft jetzt über IONOS!
