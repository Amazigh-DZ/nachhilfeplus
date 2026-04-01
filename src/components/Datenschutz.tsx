import React from "react";
import { X } from 'lucide-react';

interface DatenschutzProps {
  onClose?: () => void;
  isModal?: boolean;
  onBack?: () => void;
}

const DatenschutzContent = ({ isModal }: { isModal: boolean }) => (
  <div className={isModal ? "space-y-4 text-sm text-slate-300" : "space-y-6 text-base text-slate-300"}>
    {/* Header Section */}
    <div>
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-3xl font-black mb-4 uppercase text-primary"}>Datenschutz auf einen Blick</h2>
      <div className="space-y-4 text-xs">
        <div>
          <h3 className="font-bold text-white mb-2">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Webseite besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
          <p>
            <strong>Nachhilfe Plus</strong><br/>
            Inhaber: <strong>Nassim Ouaissa</strong><br/>
            <strong>Gormarstr. 3, 37085 Göttingen, Deutschland</strong><br/>
            E-Mail: <strong>kontakt@nachhilfe-plus.de</strong>
          </p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Wie erfassen wir Ihre Daten?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Daten, die Sie uns mitteilen (z. B. über Kontaktformular, Bewerbungsformular, E-Mail)</li>
            <li>Daten, die automatisch beim Besuch erfasst werden (Browser, IP-Adresse, etc.)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Wofür nutzen wir Ihre Daten?</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Bereitstellung und Sicherheit der Webseite</li>
            <li>Bearbeitung von Anfragen und Kommunikation</li>
            <li>Bearbeitung von Bewerbungen</li>
            <li>Statistische Analyse (nur nach Einwilligung)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Welche Rechte haben Sie?</h3>
          <p>
            Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch, Datenübertragbarkeit sowie Widerruf erteilter Einwilligungen.
          </p>
        </div>
      </div>
    </div>

    {/* Section 1 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>1. Allgemeine Hinweise und Pflichtinformationen</h2>
      <div className="space-y-3 text-xs">
        <div>
          <h3 className="font-bold text-white mb-1">Verantwortliche Stelle:</h3>
          <p>
            <strong>Nachhilfe Plus</strong><br/>
            Inhaber: <strong>Nassim Ouaissa</strong><br/>
            <strong>Gormarstr. 3, 37085 Göttingen, Deutschland</strong><br/>
            E-Mail: <strong>kontakt@nachhilfe-plus.de</strong>
          </p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-1">Widerruf Ihrer Einwilligung:</h3>
          <p>Sie können eine Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an kontakt@nachhilfe-plus.de.</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-1">Beschwerderecht:</h3>
          <p>Im Falle datenschutzrechtlicher Verstöße steht Ihnen ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde zu.</p>
        </div>
      </div>
    </div>

    {/* Section 2 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>2. Datenerfassung auf unserer Webseite</h2>
      <div className="space-y-3 text-xs">
        <div>
          <h3 className="font-bold text-white mb-1">Cookies:</h3>
          <p className="mb-2">
            Unsere Internetseiten verwenden Cookies. Sie dienen dazu, unser Angebot nutzerfreundlicher und sicherer zu machen.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><strong>Notwendige Cookies:</strong> erforderlich für den Betrieb der Website</li>
            <li><strong>Optionale Cookies:</strong> z. B. für Analyse (nur nach Einwilligung)</li>
          </ul>
          <p className="mt-2">
            Wir verwenden ein <strong>CookieConsent-Tool</strong> zur Verwaltung optionaler Cookies. Sie können Ihre Auswahl <strong>jederzeit</strong> ändern über <strong>„Cookie-Einstellungen"</strong> im Banner.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-1">Server-Log-Files:</h3>
          <p className="mb-2">Beim Besuch werden automatisch Informationen gespeichert:</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li>Browsertyp und -version</li>
            <li>Verwendetes Betriebssystem</li>
            <li>IP-Adresse</li>
            <li>Uhrzeit der Serveranfrage</li>
          </ul>
          <p className="mt-2"><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO</p>
        </div>
      </div>
    </div>

    {/* Section 3 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>3. Kontaktformular</h2>
      <div className="space-y-2 text-xs">
        <p>
          Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zur Bearbeitung verarbeitet.
        </p>
        <p><strong>Verarbeitete Daten:</strong> Name, E-Mail, Telefonnummer, Nachrichtentext</p>
        <p><strong>Zweck:</strong> Bearbeitung Ihrer Anfrage und Kommunikation</p>
        <p><strong>Speicherdauer:</strong> Solange erforderlich; danach Löschung</p>
      </div>
    </div>

    {/* Section 4 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>4. Bewerbungsformular</h2>
      <div className="space-y-2 text-xs">
        <p>
          Bei Bewerbungen verarbeiten wir die Bewerbungsdaten ausschließlich zur Bearbeitung des Bewerbungsverfahrens.
        </p>
        <p><strong>Verarbeitete Daten:</strong> Name, Kontaktdaten, Qualifikationen, Lebenslauf, Zeugnisse</p>
        <p><strong>Speicherdauer:</strong> In der Regel bis zu 6 Monate nach Abschluss des Verfahrens</p>
      </div>
    </div>

    {/* Section 5 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>5. Hosting (IONOS)</h2>
      <div className="space-y-2 text-xs">
        <p>
          Unsere Website wird bei <strong>IONOS</strong> gehostet. Im Rahmen des Hostings werden zur Bereitstellung und Sicherheit erforderliche Daten verarbeitet.
        </p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</p>
      </div>
    </div>

    {/* Section 6 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>6. Google Analytics</h2>
      <div className="space-y-2 text-xs">
        <p>
          Wir nutzen <strong>Google Analytics</strong> zur Analyse der Website-Nutzung und Optimierung.
        </p>
        <p><strong>Zweck:</strong> Reichweitenmessung, Optimierung</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung via CookieConsent)</p>
        <p><strong>Widerruf:</strong> Jederzeit über „Cookie-Einstellungen" möglich</p>
      </div>
    </div>

    {/* Section 7 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>7. Messenger (WhatsApp, Telegram, Signal)</h2>
      <div className="space-y-2 text-xs">
        <p>
          Wir bieten Kommunikation über <strong>WhatsApp, Telegram</strong> und <strong>Signal</strong> an. Die Anbieter verarbeiten Daten nach ihren eigenen Datenschutzbestimmungen.
        </p>
        <p><strong>Hinweis:</strong> Senden Sie über Messenger keine besonders sensiblen Informationen.</p>
        <p><strong>Alternative:</strong> E-Mail kontakt@nachhilfe-plus.de</p>
      </div>
    </div>

    {/* Section 8 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>8. Social Media</h2>
      <div className="space-y-2 text-xs">
        <p>
          Wir verlinken nur auf unsere Profile bei YouTube, TikTok, Facebook und Instagram. Beim Besuch unserer Website werden <strong>keine Daten automatisch</strong> an die Plattformen übertragen.
        </p>
        <p>Es gelten die Datenschutzbestimmungen des jeweiligen Anbieters, wenn Sie auf einen Link klicken.</p>
      </div>
    </div>

    {/* Section 9 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>9. Ihre Rechte</h2>
      <div className="space-y-2 text-xs">
        <p>Sie haben folgende Rechte:</p>
        <ul className="list-disc list-inside space-y-1 ml-1">
          <li>Recht auf Auskunft</li>
          <li>Recht auf Berichtigung</li>
          <li>Recht auf Löschung</li>
          <li>Recht auf Einschränkung der Verarbeitung</li>
          <li>Recht auf Datenübertragbarkeit</li>
          <li>Recht auf Widerspruch</li>
          <li>Widerruf von Einwilligungen</li>
        </ul>
        <p className="mt-2">Kontakt: <strong>kontakt@nachhilfe-plus.de</strong></p>
      </div>
    </div>

    {/* Section 10 */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>10. Änderung dieser Datenschutzerklärung</h2>
      <div className="space-y-2 text-xs">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung zu ändern, um sie an aktuelle rechtliche Anforderungen oder Änderungen unserer Leistungen anzupassen.
        </p>
        <p className="text-slate-500"><strong>Stand:</strong> 01.04.2026</p>
      </div>
    </div>
  </div>
);

const Datenschutz = ({ onClose, isModal = false, onBack }: DatenschutzProps) => {
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-white/10 shadow-2xl">
          <div className="sticky top-0 flex justify-between items-center p-4 sm:p-6 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm gap-2">
            <h1 className="text-lg sm:text-2xl font-black uppercase text-white">Datenschutzerklärung</h1>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 sm:p-6 pb-20">
            <DatenschutzContent isModal={true} />
          </div>
          <div className="sticky bottom-0 flex justify-end p-3 sm:p-4 border-t border-white/10 bg-slate-900/95 backdrop-blur-sm gap-2">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/80 transition-all uppercase text-xs sm:text-sm tracking-tight touch-target"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-20">
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-4 uppercase text-white">Datenschutzerklärung</h1>
        <p className="text-slate-400 text-sm mb-12">Nachhilfe Plus – Datenschutz auf einen Blick</p>
        <DatenschutzContent isModal={false} />
      </section>
    </main>
  );
};

export default Datenschutz;
