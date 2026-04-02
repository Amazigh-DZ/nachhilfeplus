# 🚀 Anleitung: Website auf IONOS aktualisieren

Nachdem Sie Ihr Projekt mit **IONOS Deploy Now** deployed haben, ist die Aktualisierung sehr einfach!

---

## **Schritt 1: Änderungen in VS Code machen**

1. Öffne dein Projekt in VS Code
2. Ändere was du möchtest (z.B. Text, Komponenten, CSS, etc.)
3. Speichern: **Strg + S**

---

## **Schritt 2: Änderungen in Git committen**

1. Linke Seite: **Source Control** Icon (3 Kreise)
   - Oder: **Strg + Shift + G** drücken

2. Du siehst nun **"Changes"** mit allen geänderten Dateien

3. **Alle Dateien hinzufügen:**
   - Klick auf die **"+"** neben "Changes"
   - Oder: **Alle hinzufügen** (falls es einen Button gibt)

4. **Commit Message schreiben:**
   - Im Textfeld oben: z.B. `"Texte aktualisiert"` oder `"Logo geändert"`
   - Beispiele:
     ```
     "Homepage aktualisiert"
     "Team Fotos ausgetauscht"
     "Kontaktformular verbessert"
     ```

5. **Haken-Button** klicken (oben rechts im Source Control) → Commit erstellen

---

## **Schritt 3: Zu GitHub pushen**

1. **Upload-Pfeil** oben rechts im Source Control klicken
   - Oder: Im Terminal: `git push`

2. Danach sehen Sie unten: **"✓ Synchronisieren"** oder ähnliches

---

## **Schritt 4: IONOS Deploy Now aktualisiert automatisch!**

**Das ist das Beste:** IONOS Deploy Now **überwacht dein GitHub-Repository** automatisch!

Wenn Sie pushen, passiert das **automatisch**:

1. ✅ Deploy Now erkennt neue Commits
2. ✅ Startet automatisch den Build (`npm run build`)
3. ✅ Uploaded die `dist/` Dateien zu IONOS
4. ✅ Ihre Website ist live aktualisiert! 🎉

**Sie müssen nichts manuell tun!**

---

## **So sehen Sie den Deployment-Status:**

1. Gehen Sie zu: https://www.ionos.de/hosting/deploynow
2. Klick auf Ihr Projekt
3. Sie sehen den **Deployment-Verlauf**:
   - 🟢 **Erfolgreich** (grün)
   - 🟡 **Lädt** (gelb)
   - 🔴 **Fehler** (rot)

---

## **Zusammenfassung - Die 3 Schritte:**

| Schritt | Was | Wo |
|---------|-----|-----|
| 1️⃣ | Änderungen speichern | VS Code (`Strg + S`) |
| 2️⃣ | Committen | Source Control (`+` + Haken ✓) |
| 3️⃣ | Pushen | Source Control (Upload-Pfeil ↑) |
| ✨ | **IONOS deployed automatisch!** | Sie brauchen nichts zu tun! |

---

## **Häufige Fehler vermeiden:**

❌ **NOT:** Direkt Dateien auf IONOS hochladen  
✅ **JA:** Immer via Git & GitHub → Deploy Now

❌ **NOT:** Nur speichern in VS Code  
✅ **JA:** Speichern → Commit → Push

---

## **Tipps:**

- **Gute Commit Messages:** `"Startseite aktualisiert"` statt `"fix"`
- **Kleine Commits machen:** Nicht 100 Dateien auf einmal
- **Regelmäßig pushen:** Am Ende jedes Arbeitstages

---

## **Problem? Schnelle Lösungen:**

**Wenn nach Push noch alte Version online ist:**
- Warten Sie 2-5 Minuten
- Browser-Cache löschen: `Strg + Shift + Del`
- Neu laden: `Strg + Shift + R`

**Wenn Deployment fehlschlägt:**
- Checken Sie die Logs in IONOS Deploy Now
- Oder kontaktieren Sie IONOS Support

---

**Viel Erfolg! 🚀**
