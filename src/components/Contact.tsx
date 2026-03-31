import { Phone, Mail, MapPin, Clock, Send, Instagram, Facebook, } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { SiSignal } from "react-icons/si";

const Contact = () => {
const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/deinprofil", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/deinprofil", label: "Facebook" },
  { icon: FaWhatsapp, href: "https://wa.me/49157546454", label: "WhatsApp" },
  { icon: FaTelegramPlane, href: "https://t.me/NachhilfePlus", label: "Telegram" },
  { icon: SiSignal, href: "https://signal.me/#p/49157546454", label: "Signal" },
];

  return (
    <section id="contact" className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
            UNVERBINDLICHE <span className="gradient-text">ANFRAGE</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Hast du Fragen oder möchtest direkt starten? Schreib uns eine Nachricht oder ruf uns an. Wir freuen uns auf dich!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass p-10 rounded-[2.5rem] border border-white/5">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter">Kontaktinformationen</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 border border-white/10">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Telefon</div>
                    <div className="text-xl font-bold text-white">+49 (0) 157 57423911</div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0 border border-white/10">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">E-Mail</div>
                    <div className="text-xl font-bold text-white">kontakt@nachhilfe-plus.de</div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 border border-white/10">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Standort</div>
                    <div className="text-xl font-bold text-white">Gotmarstrasse 3, 37073 Göttingen</div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0 border border-white/10">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Öffnungszeiten</div>
                    <div className="text-xl font-bold text-white">Mo - Fr: 09:00 - 19:00 Uhr</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/5">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Social Media</div>

<div className="flex flex-wrap gap-4">
  {socialLinks.map((item, i) => {
    const Icon = item.icon;
    return (
      <a
        key={i}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label}
        className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-all"
      >
        <Icon className="w-5 h-5" />
      </a>
    );
  })}
</div>


             </div>
            </div>

            {/* Map */}
            <div className="glass rounded-[2.5rem] overflow-hidden relative border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2534.087!2d9.9336!3d51.5350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a34a27c7c7c7c7%3A0x1234567890!2sGotmarstr%203%2037073%20G%C3%B6ttingen!5e0!3m2!1sde!2sde!4v1700000000000"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm z-10">
                Nachhilfe Plus
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-10 rounded-[2.5rem] border border-white/5">
            <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter">Schreib uns</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Vorname*</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all" placeholder="Max" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nachname*</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all" placeholder="Mustermann" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">E-Mail Adresse*</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all" placeholder="max@beispiel.de" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Telefonnummer*</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all" placeholder="+49 123 456789" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Betreff</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all appearance-none">
                  <option className="bg-slate-900">Allgemeine Anfrage</option>
                  <option className="bg-slate-900">Probestunde vereinbaren</option>
                  <option className="bg-slate-900">Frage zum Angebot</option>
                  <option className="bg-slate-900">Bewerbung als Nachhilfe Lehrer/in</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Deine Nachricht</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all resize-none" placeholder="Wie können wir dir helfen?"></textarea>
              </div>

              <button className="w-full bg-white text-black py-5 rounded-xl font-black text-xl shadow-xl hover:bg-primary hover:text-white transition-all uppercase tracking-tighter flex items-center justify-center gap-3">
                Nachricht Senden
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

