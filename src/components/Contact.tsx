import { Phone, Mail, MapPin, Clock, Send, Instagram, Facebook, AlertCircle, CheckCircle } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { SiSignal } from "react-icons/si";
import { useState } from 'react';
import { FormSubmitError, submitForm } from '../lib/formApi';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Allgemeine Anfrage',
    message: '',
    honeypot: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setErrorMessage('Bitte gib deinen Vornamen ein');
      return false;
    }
    if (!formData.lastName.trim()) {
      setErrorMessage('Bitte gib deinen Nachnamen ein');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage('Bitte gib eine gueltige E-Mail-Adresse ein');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Bitte gib deine Telefonnummer ein');
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Bitte gib eine Nachricht ein (mindestens 10 Zeichen)');
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setErrorMessage('');
    setSuccessMessage('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.honeypot) {
      console.warn('Honeypot triggered');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await submitForm({
        formType: 'contact',
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        honeypot: formData.honeypot,
      });

      setSuccessMessage('Vielen Dank! Deine Nachricht wurde erfolgreich gesendet. Wir melden uns in Kuerze bei dir!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'Allgemeine Anfrage',
        message: '',
        honeypot: ''
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setErrorMessage(
        err instanceof FormSubmitError
          ? err.message
          : 'Es gab ein Problem beim Senden. Bitte versuche es spaeter erneut oder kontaktiere uns direkt.'
      );
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/deinprofil", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/deinprofil", label: "Facebook" },
    { icon: FaWhatsapp, href: "https://wa.me/4915757423911", label: "WhatsApp" },
    { icon: FaTelegramPlane, href: "https://t.me/NachhilfePlus", label: "Telegram" },
    { icon: SiSignal, href: "https://signal.me/#p/+4915757423911", label: "Signal" },
  ];

  return (
    <section id="contact" className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
            UNVERBINDLICHE <span className="gradient-text">ANFRAGE</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Hast du Fragen oder moechtest direkt starten? Schreib uns eine Nachricht oder ruf uns an. Wir freuen uns auf dich!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                    <div className="text-xl font-bold text-white">Gotmarstr. 3, 37073 Goettingen</div>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0 border border-white/10">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Oeffnungszeiten</div>
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

            <div className="glass rounded-[2.5rem] overflow-hidden relative border border-white/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2534.087!2d9.9336!3d51.5350!2m3!1f0!2f0!3f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a34a27c7c7c7c7%3A0x1234567890!2sGotmarstr%203%2037073%20G%C3%B6ttingen!5e0!3m2!1sde!2sde!4v1700000000000"
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

          <div className="glass p-10 rounded-[2.5rem] border border-white/5">
            <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter">Schreib uns</h3>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <p className="text-green-300 font-bold text-sm">{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 font-bold text-sm">{errorMessage}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Vorname*</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled={loading} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all disabled:opacity-50" placeholder="Max" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nachname*</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={loading} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all disabled:opacity-50" placeholder="Mustermann" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">E-Mail Adresse*</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={loading} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all disabled:opacity-50" placeholder="max@beispiel.de" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Telefonnummer*</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={loading} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all disabled:opacity-50" placeholder="+49 123 456789" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Betreff</label>
                <select name="subject" value={formData.subject} onChange={handleChange} disabled={loading} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all appearance-none disabled:opacity-50">
                  <option className="bg-slate-900">Allgemeine Anfrage</option>
                  <option className="bg-slate-900">Probestunde vereinbaren</option>
                  <option className="bg-slate-900">Frage zum Angebot</option>
                  <option className="bg-slate-900">Bewerbung als Nachhilfe Lehrer/in</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Deine Nachricht*</label>
                <textarea rows={4} name="message" value={formData.message} onChange={handleChange} disabled={loading} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all resize-none disabled:opacity-50" placeholder="Wie koennen wir dir helfen?" />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-white text-black py-5 rounded-xl font-black text-xl shadow-xl hover:bg-primary hover:text-white transition-all uppercase tracking-tighter flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Wird gesendet...' : 'Nachricht Senden'}
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
