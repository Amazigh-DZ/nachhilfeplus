import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, BookOpen, Monitor, Users, User, HandCoins } from 'lucide-react';

const offers = [
  {
    title: "Einzelstunde",
    price: "35 €",
    period: "/ 60 min",
     description: "Für gelegentliche Unterstützung.", 
    features: [
  "1-zu-1 Betreuung",
  "Flexible Zeitplanung",
  "Alle Fächer verfügbar",
  "Online oder vor Ort",
  "Kostenlose Probestunde",
  "keine Vertragliche Bindung",
  
],
total: "Gesamt: 35 € / 60 Minuten",
    validity: "Gültig: immer",
    icon: <HandCoins className="w-6 h-6" />,
    popular: false
  },
  {
     title: "10ER PAKET",
    price: "32€",
    period: "/ 60 Minuten",
    subtitle: "Beliebteste Wahl",
    highlight: "Am beliebtesten",
    features: [
      "1-zu-1 Betreuung",
      "Flexible Zeitplanung",
      "Alle Fächer verfügbar",
      "Online oder vor Ort",
      "3 € Ersparnis pro Stunde",
      "Kostenlose Probestunde",
      "keine Vertragliche Bindung",
    ],
    total: "Gesamt: 320€",
    validity: "Gültig: 3 Monate",
    icon: <HandCoins className="w-6 h-6" />,
    popular: true
  },
    {
     title: "20ER PAKET",
    price: "28€",
    period: "/ 60 Minuten",
    subtitle: "Beste Langzeit Lösung",
    highlight: "Am beliebtesten",
    features: [
      "1-zu-1 Betreuung",
      "Flexible Zeitplanung",
      "Alle Fächer verfügbar",
      "Online oder vor Ort",
      "7 € Ersparnis pro Stunde",
      "Kostenlose Probestunde",
      "keine Vertragliche Bindung",
    ],
    total: "Gesamt: 280€",
    validity: "Gültig: 4 Monate",
    icon: <HandCoins className="w-6 h-6" />,
    
  },
  // {
  //   title: "Prüfungskurse",
  //   price: "ab 149€",
  //   period: "/ Kurs",
  //  description: "Intensivkurse für Abitur, Realschulabschluss oder Nachprüfungen. Gezielte Vorbereitung.",
  //features: ["Alle prüfungsrelevanten Themen", "Probeklausuren", "Lernmaterial inklusive", "Kleine Gruppen"],
  //  icon: <BookOpen className="w-6 h-6" />,
  //  popular: false
  //}
];

const subjects = [
  "Mathematik", "Deutsch", "Englisch", "Physik", "Chemie", "Biologie", "Latein", "Französisch", "Spanisch", "Informatik", "BWL/VWL", "Geschichte"
];

const Offers = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
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
    <section id="offers" className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
            Faire Preise für  <span className="gradient-text">bessere Noten</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Wir bieten maßgeschneiderte Lösungen für jede Schulform und jedes Alter. 
            Wähle das passende Paket für deinen Erfolg. Keine versteckten Kosten, keine Anmeldegebühren
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass p-10 rounded-[2.5rem] relative flex flex-col z-20 ${offer.popular ? 'border-primary/50 glow' : ''}`}
            >
              {offer.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Empfohlen
                </div>
              )}
              
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-primary border border-white/10">
                {offer.icon}
              </div>
              
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{offer.title}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">{offer.price}</span>
                <span className="text-slate-500 font-bold">{offer.period}</span>
              </div>
              
              <p className="text-slate-400 mb-8 font-medium leading-relaxed">
                {offer.description}
              </p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {offer.features.map((feature, j) => (
                  <li key={j} className="flex items-center text-sm font-bold text-slate-300">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

<div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
  <div>
    <p className="text-sm font-black text-white">{offer.total}</p>
    <p className="text-xs font-semibold text-white/55">{offer.validity}</p>
  </div>

  <div className="text-right">
    <p className="text-xs font-black uppercase tracking-widest text-white/50">Sofort startklar</p>
    <p className="text-xs font-semibold text-white/55">ohne Anmeldegebühr</p>
  </div>
</div>


              <button onClick={scrollToBooking} className={`mt-6 w-full py-8 px-6 text-xl rounded-xl font-black uppercase tracking-tighter transition-all relative z-40 ${offer.popular ? 'bg-white text-black hover:bg-primary hover:text-white' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                Jetzt Anfragen
              </button>
            </motion.div>
          ))}
        </div>

      { /*  <div className="glass p-12 rounded-[2.5rem] border border-white/5">
          <h3 className="text-2xl font-black mb-10 text-center uppercase tracking-tighter">Alle Fächer im Überblick</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {subjects.map((subject, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl text-center font-bold text-sm hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default">
                {subject}
              </div>
            ))}
          </div> */}
             {/* footer */}
       
         {/* <a href="#contact">
          <p className="text-center mt-10 text-slate-500 text-sm font-medium">
            Dein Fach nicht dabei? <span className="text-primary cursor-pointer hover:underline">Frag uns einfach an!</span>
          </p></a>
        </div>*/}
      </div> 
    </section>
  );
};

export default Offers;
