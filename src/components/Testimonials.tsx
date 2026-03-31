
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Lukas M.",
    role: "Schüler (11. Klasse)",
    content: "Dank Nachhilfe Plus habe ich meine Mathe-Note von einer 4 auf eine 2 verbessert. Die Lehrer erklären alles super geduldig und verständlich.",
    rating: 5
  },
  {
    name: "Sima",
    role: "Schülerin (10. Klasse)",
    content: "Sehr freundliches und engagiertes Team. Man merkt, dass hier mit viel Herz gearbeitet wird. Es wird sich wirklich Zeit genommen und immer zuverlässig geholfen. Ich kann Nachhilfe Plus wirklich nur empfehlen.",
    rating: 5
  },
   {
    name: "Ons M.",
    role: "Ehemalige Lehrerin",
    content: "Eine sehr angenehme Arbeitsathmosphäre. Die Leitung setzt sich nicht nur für seine Mitarbeiter ein, sondern sorgt sich sehr um die Nachhilfeschüler, sodass alle mit einem guten Gefühl und hoher Lernbereitschaft lernen können.",
    rating: 5
  },
   {
    name: "Ari S.",
    role: "Lehrer",
    content: "Sehr engagiertes Team! Die Lehrkräfte sind fleißig und die Leitung nimmt sich immer die Zeit für einen!.",
    rating: 5
  },
   {
    name: "Sabine W.",
    role: "Mutter",
    content: "Die Flexibilität und die Qualität der Nachhilfe sind beeindruckend. Mein Sohn geht endlich wieder ohne Bauchschmerzen zur Schule.",
    rating: 5
  },
  {
    name: "Bella K.",
    role: "Abiturientin",
    content: "Die Prüfungsvorbereitung war Gold wert. Ich fühlte mich perfekt vorbereitet und konnte mein Abi mit Bestnoten abschließen.",
    rating: 5
  }
];
const Testimonials = () => {
  const getSlidesPerView = () => {
    if (window.innerWidth >= 1024) return 3; // Desktop
    if (window.innerWidth >= 640) return 2;  // Tablet
    return 1;                                 // Mobile
  };

  const [slidesPerView, setSlidesPerView] = useState(1);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    const update = () => setSlidesPerView(getSlidesPerView());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // wenn sich die Anzahl sichtbarer Slides ändert, reset
  useEffect(() => {
    setCurrent(0);
  }, [slidesPerView]);

  const maxIndex = Math.max(0, testimonials.length - slidesPerView);

  const prev = () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  const next = () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
useEffect(() => {
  if (isPaused) return;

  const id = setInterval(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, 4500); // 4.5s

  return () => clearInterval(id);
}, [isPaused, maxIndex]);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase">
            Was unsere <span className="gradient-text">Kunden sagen</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Erfolg ist kein Zufall. Hier sind einige Erfahrungen von Schülern und Eltern, die wir bereits unterstützen durften.
          </p>
        </div>

        {/* SLIDER WRAPPER */}
        <div
         className="relative w-full overflow-hidden"
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}
        >

          {/* TRACK */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(100 / slidesPerView) * current}%)`,
            }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                style={{ minWidth: `${100 / slidesPerView}%` }}
                className="px-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-surface/50 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group h-full flex flex-col"
                >
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-8 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                    <p className="text-slate-300 mb-8 relative z-10 italic leading-relaxed text-justify">
                      {t.content}
                    </p>
                  </div>

                  {/* Footer immer unten */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-sm text-primary">{t.role}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* PFEILE */}
          <button
            onClick={prev}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 
                       w-12 h-12 flex items-center justify-center rounded-full
                       bg-white/10 backdrop-blur-md border border-white/20 text-white
                       hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg"
                       opacity-0 group-hover:opacity-100

            aria-label="Vorherige Bewertung"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 
                       w-12 h-12 flex items-center justify-center rounded-full
                       bg-white/10 backdrop-blur-md border border-white/20 text-white
                       hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg"
                       opacity-0 group-hover:opacity-100

            aria-label="Nächste Bewertung"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          {/* DOTS */}
<div className="mt-8 flex justify-center gap-2">
  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrent(i)}
      className={`h-2.5 w-2.5 rounded-full transition-all ${
        i === current ? "bg-primary w-6" : "bg-white/20 hover:bg-white/30"
      }`}
      aria-label={`Gehe zu Slide ${i + 1}`}
    />
  ))}
</div>

        </div>
      </div>
    </section>
  );
};



export default Testimonials;
