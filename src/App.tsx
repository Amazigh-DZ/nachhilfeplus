import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users,
  User, 
  Monitor, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Menu, 
 
  X,
  GraduationCap,
  ChevronDown,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Cpu,
  Star,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Offers from './components/Offers';
import Team from './components/Team';
import Contact from './components/Contact';
import Jobs from './components/Jobs';
import Testimonials from './components/Testimonials';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import CookieConsent from './components/CookieConsent';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = ['home', 'about', 'offers', 'team', 'jobs', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const menuItems = [
    { id: 'home', label: 'Start' },
    { id: 'about', label: 'Über uns' },
    { id: 'offers', label: 'Preise' },
    { id: 'team', label: 'Team' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'contact', label: 'Kontakt' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-30 px-4 py-6 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`max-w-7xl mx-auto glass rounded-2xl px-6 py-4 flex justify-between items-center transition-all ${scrolled ? 'shadow-2xl border-white/20' : ''}`}>
        <Link to="/" className="flex items-center cursor-pointer">
          <img 
            src="/images/nachhilfe-plus-logo-quadratisch-removebg-2.png" 
            alt="Nachhilfe Plus Logo" 
            className="w-12 h-12 mr-3 drop-shadow-logo object-contain"
          />
          <span className="text-xl font-black tracking-tight text-white uppercase">Nachhilfe <span className="gradient-text">Plus</span></span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => isHomePage && scrollToSection(item.id)}
              className={`text-sm font-bold transition-all uppercase tracking-widest relative group ${
                isHomePage && activeSection === item.id 
                  ? 'text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                  : 'text-slate-400 hover:text-primary'
              }`}
            >
              {item.label}
              {isHomePage && activeSection === item.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <button onClick={() => isHomePage && scrollToSection('booking')} className="bg-white text-black px-6 py-2.5 rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all glow uppercase tracking-tight">
            JETZT STARTEN
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 glass rounded-2xl p-4 md:hidden"
          >
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isHomePage) scrollToSection(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-base font-bold uppercase tracking-widest transition-all ${
                    isHomePage && activeSection === item.id ? 'text-primary' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => isHomePage && scrollToSection('booking')}
                className="block w-full text-center mt-4 bg-primary text-white py-4 rounded-xl font-black uppercase tracking-tight"
              >
                JETZT STARTEN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "Wie schnell kann die Nachhilfe starten?", a: "In der Regel können wir innerhalb von 48 Stunden nach dem Erstgespräch eine passende Lehrkraft für Sie finden." },
    { q: "Gibt es eine Mindestvertragslaufzeit?", a: "Nein, bei Nachhilfe Plus setzen wir auf Flexibilität. Sie können monatlich kündigen oder Stundenpakete ohne Abo-Zwang buchen." },
    { q: "Sind die Lehrkräfte qualifiziert?", a: "Absolut. Wir arbeiten ausschließlich mit Lehramtsstudierenden, Fachakademikern oder erfahrenen Pädagogen zusammen." },
    { q: "Warum emphehlt Nachhilfe Plus Einzelunterricht", a: " Individuelle Nachhilfe hilft, weil sie sich gezielt an den Stärken und Schwächen des Schülers orientiert. Dadurch können Wissenslücken effizienter geschlossen und das Verständnis nachhaltiger aufgebaut werden." },
    { q: "Bietet Nachhilfe Plus Keine Gruppen Unterricht?", a: " Unser Gruppenunterricht findet ausschließlich mit Schülern aus derselben Klassenstufe statt, die sich bereits kennen. So entsteht eine vertraute Lernatmosphäre, in der gemeinsam gearbeitet, erklärt und voneinander gelernt werden kann. Dieses Konzept ist sinnvoll, weil Schüler sich in einer vertrauten Gruppe wohler fühlen und offener Fragen stellen. Wenn sie sich bereits kennen, sinkt die Hemmschwelle, Fehler zu machen oder etwas nicht zu verstehen. Gleichzeitig können sie gezielt gemeinsam an denselben Themen arbeiten, sich gegenseitig unterstützen und voneinander profitieren was den Lernerfolg nachhaltig verbessert." }
     ];

     return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-12 tracking-tighter uppercase">Häufige <span className="gradient-text">Fragen</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden border border-white/5">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left font-bold hover:bg-white/5 transition-colors"
              >
                <span className="uppercase tracking-tight">{faq.q}</span>
                <ChevronDown className={`transition-transform text-primary ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-slate-400 leading-relaxed font-medium"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
     
<div className="mt-10 flex justify-center">
<a href="#contact">
 <button
  className="glass px-10 py-5 rounded-2xl font-black uppercase tracking-normal hover:bg-white/10 transition-all relative group"
>
  <span className="group-hover:hidden">
    Hast du noch Fragen?
  </span>
  <span className="hidden group-hover:inline">
    dann Schreib uns
  </span>
</button>
</a>
</div>
    </section>
  );
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const BookingTool = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ 
    subjects: [] as string[], 
    customSubject: '',
    type: '', 
    name: '',
    email: '',
    phone: ''
  });

  const subjects = [
    'Mathe', 'Deutsch', 'Englisch', 'Physik', 
    'Chemie', 'Biologie', 'Latein', 'Französisch', 
    'Spanisch', 'Informatik', 'Wirtschaft', 'Geschichte'
  ];

  const toggleSubject = (subject: string) => {
    if (data.subjects.includes(subject)) {
      setData({ ...data, subjects: data.subjects.filter(s => s !== subject) });
    } else {
      setData({ ...data, subjects: [...data.subjects, subject] });
    }
  };

  return (
    <section id="booking" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-[2.5rem] overflow-hidden glow border border-white/10">
          <div className="bg-gradient-to-r from-primary to-accent p-10 text-white">
            <h2 className="text-3xl font-black mb-2 tracking-tighter uppercase">Termin-Anfrage</h2>
            <p className="opacity-80 font-bold">Wähle deinen Weg zum Erfolg.</p>
          </div>
          
          <div className="p-10">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">1. Fächer wählen</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {subjects.map(f => (
                    <button 
                      key={f}
                      onClick={() => toggleSubject(f)}
                      className={`p-6 rounded-2xl border-2 transition-all text-center font-black uppercase text-sm ${data.subjects.includes(f) ? 'border-primary bg-primary/20 text-white' : 'border-white/5 hover:border-white/20 text-slate-400'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-4 mb-10">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Anderes Fach?</label>
                  <input 
                    type="text" 
                    placeholder="Z.B. PHILOSOPHIE..." 
                    value={data.customSubject}
                    onChange={(e) => setData({...data, customSubject: e.target.value})}
                    className="w-full p-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-primary text-white font-bold uppercase"
                  />
                </div>

                <button 
                  disabled={data.subjects.length === 0 && !data.customSubject}
                  onClick={() => setStep(2)}
                  className="w-full bg-white text-black py-5 rounded-xl font-black text-xl shadow-xl hover:bg-primary hover:text-white transition-all uppercase tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Weiter zum Modus
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">2. Modus wählen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <button 
                    onClick={() => { setData({...data, type: 'Präsenz'}); setStep(3); }}
                    className={`p-8 rounded-2xl border-2 transition-all flex items-center bg-white/5 ${data.type === 'Präsenz' ? 'border-primary' : 'border-white/5 hover:border-primary'}`}
                  >
                    <MapPin className="mr-6 text-primary w-8 h-8" />
                    <div className="text-left">
                      <div className="font-black text-lg uppercase">Göttingen</div>
                      <div className="text-sm text-slate-400">Vor Ort im Zentrum</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => { setData({...data, type: 'Online'}); setStep(3); }}
                    className={`p-8 rounded-2xl border-2 transition-all flex items-center bg-white/5 ${data.type === 'Online' ? 'border-accent' : 'border-white/5 hover:border-primary'}`}
                  >
                    <Monitor className="mr-6 text-accent w-8 h-8" />
                    <div className="text-left">
                      <div className="font-black text-lg uppercase">Digital</div>
                      <div className="text-sm text-slate-400">Weltweit via Video</div>
                    </div>
                  </button>
                </div>
                <button onClick={() => setStep(1)} className="w-full text-slate-500 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors">
                  Zurück zur Fächerauswahl
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-primary">3. Daten eingeben</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Anfrage gesendet!'); setStep(1); setData({ subjects: [], customSubject: '', type: '', name: '', email: '', phone: '' }); }} className="space-y-4">
                  <input required type="text" placeholder="NAME*" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className="w-full p-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-primary text-white font-bold" />
                  <input required type="email" placeholder="E-MAIL*" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} className="w-full p-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-primary text-white font-bold" />
                  <input required type="tel" placeholder="TELEFONNUMMER*" value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})} className="w-full p-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-primary text-white font-bold" />
                  <button type="submit" className="w-full bg-white text-black py-5 rounded-xl font-black text-xl shadow-xl hover:bg-primary hover:text-white transition-all uppercase tracking-tighter">
                    Anfrage Absenden
                  </button>
                  <button type="button" onClick={() => setStep(2)} className="w-full text-slate-500 font-bold text-sm uppercase tracking-widest mt-4 hover:text-white transition-colors">
                    Zurück zum Modus
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight uppercase">
              Wir machen <br />
              <span className="gradient-text">Nachhilfe besser.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed font-medium">
              Nachhilfe Plus wurde in Göttingen gegründet, um Schülern nicht nur Wissen, sondern auch Mut, Struktur und Vertrauen in ihre Fähigkeiten zu geben.
            </p>
            <div className="space-y-6">
              {[
                { title: "Unsere Mission", desc: "Wir glauben, dass jedes Kind lernen kann. Mit individueller Betreuung, modernen Methoden und viel Geduld helfen wir Schülern, ihre Ziele zu erreichen. Keine Standard-Lösungen, nur maßgeschneiderte Nachhilfe." },
                { title: "Unsere Werte", 
                desc:(
    <div className="space-y-2">
      <div>✓ Individuelle Betreuung statt Massenunterricht</div>
      <div>✓ 100% Transparenz und faire Preise</div>
      <div>✓ Qualifizierte & engagierte Lehrer</div>
      <div>✓ Garantierter Lernerfolg</div>
    </div>
  ), },
                
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-white">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass p-4 rounded-[3rem] rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                alt="Team working" 
                className="rounded-[2.5rem] w-full h-auto shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl -rotate-6 hidden md:block">
              <div className="text-4xl font-black text-primary mb-1">10+</div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">Jahre Erfahrung </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const HomePage = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section id="home" className="relative pt-20 sm:pt-32 md:pt-56 pb-12 sm:pb-20 md:pb-32 px-4">
        {/* Background Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full -z-10"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full -z-10"></div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-primary text-xs font-black tracking-[0.2em] uppercase mb-6 sm:mb-8 md:mb-10">
              <Zap className="w-3 sm:w-4 h-3 sm:h-4 mr-2 fill-primary" />
              <span className="text-xs sm:text-sm">Mehr verstehen * Besser bestehen * Mit Nachhilfe Plus</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-[0.9] tracking-tight">
              Bessere Noten. <span className="gradient-text text-2xl sm:text-4xl md:text-5xl lg:text-7xl block sm:inline whitespace-nowrap">Mehr Selbstvertrauen.</span>
            </h1>
            <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-400 mb-6 sm:mb-8 md:mb-10 lg:mb-14 leading-relaxed max-w-2xl mx-auto font-medium px-2 sm:px-0">
              Bei Nachhilfe Plus bekommst du individuelle Unterstützung, die zu dir passt. Für bessere Noten, mehr Selbstvertrauen und langfristige Lernerfolge.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center">
              <button onClick={() => scrollToSection('booking')} className="bg-white text-black px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-xl md:rounded-2xl font-black text-sm sm:text-base md:text-lg lg:text-xl hover:bg-primary hover:text-white transition-all glow uppercase tracking-tighter">
                Jetzt Starten
              </button>
              <button onClick={() => scrollToSection('offers')} className="glass text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-xl md:rounded-2xl font-black text-sm sm:text-base md:text-lg lg:text-xl hover:bg-white/10 transition-all uppercase tracking-tighter">
                Unser Angebot
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 text-primary text-xs font-black tracking-[0.2em] uppercase">
              <Zap className="w-3 sm:w-4 h-3 sm:h-4 mr-2 fill-primary" />
              warum Nachhilfe Plus?
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {[
              { title: "Qualifizierte Lehrkräfte", desc: "Erfahrene und geprüfte Nachhilfelehrer mit pädagogischer Expertise.", icon: <GraduationCap /> },
              { title: "Online & Präsenz", desc: "Wählen Sie zwischen Unterricht vor Ort oder bequem von zu Hause. Nahtloser Wechsel möglich.", icon: <Globe /> },
              { title: "Individuelle Förderung", desc: "Maßgeschneiderter Unterricht, der auf die Bedürfnisse jedes Schülers eingeht", icon: <User /> }
            ].map((item, i) => (
              <div key={i} className="glass p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] hover:border-primary/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 blur-3xl -z-10"></div>
                <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-primary group-hover:scale-110 transition-transform border border-white/10">
                  {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-3 sm:mb-4 md:mb-6 tracking-tighter uppercase">{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <About />
      <Offers />
      <BookingTool />
      <Team />
      <Jobs />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
};

// --- Main App ---

export default function App() {
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-white selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>

      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-10">
            <img 
              src="/images/nachhilfe-plus-logo-quadratisch-removebg-2.png" 
              alt="Nachhilfe Plus Logo" 
              className="w-10 h-10 mr-3 drop-shadow-logo object-contain"
            />
            <span className="text-xl font-black tracking-tighter uppercase">Nachhilfe <span className="gradient-text">Plus</span></span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-xs font-black uppercase tracking-widest text-slate-500">
            <Link to="/" className="hover:text-white transition-colors">Start</Link>
            <Link to="/" onClick={() => {
              setTimeout(() => {
                const element = document.getElementById('about');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }} className="hover:text-white transition-colors">Über uns</Link>
            <Link to="/" onClick={() => {
              setTimeout(() => {
                const element = document.getElementById('offers');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }} className="hover:text-white transition-colors">Angebot</Link>
            <Link to="/" onClick={() => {
              setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }} className="hover:text-white transition-colors">Kontakt</Link>
            <button onClick={() => setShowImpressum(true)} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 m-0">Impressum</button>
            <button onClick={() => setShowDatenschutz(true)} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 m-0">Datenschutz</button>
          </div>
          <div className="text-xs font-bold text-slate-600 tracking-[0.3em] uppercase"> 
            &copy; 2019 Nachhilfe Plus &bull; Dein Weg zum Erfolg
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showImpressum && <Impressum isModal={true} onClose={() => setShowImpressum(false)} />}
      {showDatenschutz && <Datenschutz isModal={true} onClose={() => setShowDatenschutz(false)} />}
      
      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}

