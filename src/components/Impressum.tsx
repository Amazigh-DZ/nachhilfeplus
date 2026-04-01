import React from "react";
import { X } from 'lucide-react';

interface ImpressumProps {
  onClose?: () => void;
  isModal?: boolean;
}

const ImpressumContent = ({ isModal }: { isModal: boolean }) => (
  <div className={isModal ? "space-y-4 text-sm text-slate-300" : "space-y-6 text-base text-slate-300"}>
    {/* Section: Angaben gemäß § 5 TMG */}
    <div>
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>Angaben gemäß § 5 TMG</h2>
      <div className="space-y-1 text-xs">
        <p><strong className="text-white">Nachhilfe Plus</strong></p>
        <p>Inhaber: <strong className="text-white">Nassim Ouaissa</strong></p>
        <p><strong className="text-white">Gormarstr. 3</strong></p>
        <p><strong className="text-white">37085 Göttingen</strong></p>
        <p>Deutschland</p>
      </div>
    </div>

    {/* Section: Kontakt */}
    <div>
      <h3 className="font-bold text-white mb-2">Kontakt</h3>
      <div className="space-y-1 text-xs">
        <p>Telefon: <strong>015757423911</strong></p>
        <p>E-Mail: <strong>kontakt@nachhilfe-plus.de</strong></p>
      </div>
    </div>

    {/* Section: Verantwortlich für den Inhalt */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <div className="space-y-1 text-xs">
        <p><strong className="text-white">Nassim Ouaissa</strong></p>
        <p>Gormarstr. 3, 37085 Göttingen, Deutschland</p>
      </div>
    </div>

    {/* Section: EU-Streitschlichtung */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>EU-Streitschlichtung</h2>
      <div className="space-y-2 text-xs">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
        </p>
        <p>
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
      </div>
    </div>

    {/* Section: Verbraucherstreitbeilegung */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <div className="space-y-2 text-xs">
        <p>
          Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </div>

    {/* Section: Geltung für Social Media */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>Geltung für Social Media</h2>
      <div className="space-y-2 text-xs">
        <p>
          Dieses Impressum gilt auch für unsere Onlinepräsenzen auf <strong>YouTube</strong>, <strong>TikTok</strong>, <strong>Facebook</strong> und <strong>Instagram</strong>, soweit dort auf dieses Angebot verwiesen wird oder Inhalte von Nachhilfe Plus bereitgestellt werden.
        </p>
      </div>
    </div>

    {/* Section: Haftungsausschluss */}
    <div className="pt-4 border-t border-white/10">
      <h2 className={isModal ? "text-lg font-black mb-2 uppercase text-primary" : "text-2xl font-black mb-3 uppercase text-primary"}>Haftungsausschluss (Disclaimer)</h2>
      
      <div className="space-y-3 text-xs">
        <div>
          <h3 className="font-bold text-white mb-1">Haftung für Inhalte</h3>
          <p className="mb-2">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-1">Haftung für Links</h3>
          <p className="mb-2">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <p className="mb-2">
            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-1">Urheberrecht</h3>
          <p className="mb-2">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
          <p>
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet und entsprechende Inhalte gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Impressum = ({ onClose, isModal = false }: ImpressumProps) => {
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto border border-white/10 shadow-2xl">
          <div className="sticky top-0 flex justify-between items-center p-4 sm:p-6 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm gap-2">
            <h1 className="text-lg sm:text-2xl font-black uppercase text-white">Impressum</h1>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 sm:p-6 pb-20">
            <ImpressumContent isModal={true} />
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
        <h1 className="text-5xl font-black mb-4 uppercase text-white">Impressum</h1>
        <p className="text-slate-400 text-sm mb-12">Nachhilfe Plus – Rechtliche Informationen</p>
        <ImpressumContent isModal={false} />
      </section>
    </main>
  );
};

export default Impressum;
