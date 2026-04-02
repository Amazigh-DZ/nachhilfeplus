

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, ChevronLeft, ChevronRight, ChevronDown, Award } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  subjects: string;
}

const publicImage = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

const team: TeamMember[] = [
  {
    name: "Nassim Ouaissa",
    role: "Gründer & Leitung",
    bio: "Ich bin Nassim Ouaissa, Gründer von Nachhilfe Plus. Ich habe Mathematik und Physik studiert und unterrichte seit über 10 Jahren mit Leidenschaft. Mein Ziel ist es, Schüler:innen nicht nur Wissen, sondern auch Selbstvertrauen und Freude am Lernen zu vermitteln. Moderne Lernmethoden, Geduld und individuelle Förderung stehen für mich im Mittelpunkt.",
    image: publicImage("Nassim.jpg"),
    subjects: "Mathe, Physik, Französisch, Informatik",
  },
  {
    name: "Ari Sadoun",
    role: "Lehrer",
    bio: "Ich bin Ari Sadoun, 24 Jahre alt und studiere in Göttingen Gymnasiallehramt. Zur Zeit befinde ich mich im 3. Mastersemester. Meine Schwerpunkte sind Deutsch, Werte und Normen, Englisch und Mathe.",
    image: publicImage("ari.jpg"),
    subjects: "Deutsch, Werte und Normen, Englisch, Mathe",
  },
  {
    name: "Dunja Ben Chaladia",
    role: "Lehrerin",
    bio: "Ich bin Dunja Ben Chaladia und studiere Biologie. Ich unterrichte nicht nur verwandte Fächer wie Chemie und Mathematik, sondern auch Sprachen wie Deutsch, Englisch und Französisch.",
    image: publicImage("dunja.jpg"),
    subjects: "Biologie, Chemie, Deutsch, Englisch, Französisch",
  },
  {
    name: "Diana Kanjo",
    role: "Lehrerin",
    bio: "Seit mehreren Jahren unterstütze ich Schülerinnen und Schüler als engagierte Nachhilfelehrerin dabei, Lernlücken zu schließen und wieder Freude am Lernen zu entdecken. Mein Schwerpunkt liegt auf den Fächern Mathematik, Englisch und Deutsch. Dabei lege ich großen Wert darauf, individuell auf die Bedürfnisse meiner Schüler einzugehen und eine angenehme, motivierende Lernatmosphäre zu schaffen. Warum mir das wichtig ist? Weil meine Schüler sich auf die Unterrichtsstunden freuen sollen. Lernen funktioniert am besten, wenn man sich wohlfühlt, sich ernst genommen fühlt und merkt, dass man wirklich Fortschritte macht. Genau das möchte ich in jeder Stunde erreichen!.",
    image: publicImage("diana-kanjo.jpg"),
    subjects: "Mathe, Deutsch",
  },
  {
    name: "Sara Al-nasiri",
    role: "Lehrerin",
    bio: "Ich bin Sarah Al-Naseri, 24 Jahre Nachhilfelehrerin für Deutsch, Mathematik und Englisch Ich studiere derzeit im Masterstudiengang Psychologie und Klinische Psychologie und arbeite seit mehreren Jahren erfolgreich als Nachhilfelehrerin. Mein Schwerpunkt liegt auf Deutsch, Mathematik und Englisch sowie auf Spanisch-Grundkenntnissen und Grammatik. Besonders im Bereich der deutschen Sprache und im Kommunikationstraining bringe ich umfangreiche Erfahrung mit. Ich unterstütze Lernende beim Aufbau sicherer Sprachkompetenz von Grammatik und Wortschatz bis hin zu selbstbewusstem Sprechen. Mehrere Schülerinnen und Schüler habe ich erfolgreich von A1 bis zum B2-Niveau begleitet. Neben meiner Unterrichtstätigkeit spreche ich Deutsch, Arabisch, Englisch, Türkisch sowie Spanisch (Grundkenntnisse), was mir eine mehrsprachige und kultursensible Förderung ermöglicht. Durch mein psychologisches Fachwissen arbeite ich strukturiert, empathisch und individuell angepasst. Mein Ziel ist es, nicht nur schulische Leistungen zu verbessern, sondern auch Motivation, Selbstvertrauen und nachhaltige Lernerfolge zu fördern..",
    image: publicImage("logobg.png"),
    subjects: "Mathe, Englisch",
  },
  {
    name: "Sofia D.",
    role: "Lehrerin",
    bio: "Ich bin Sofia und seit 2023 Teil des Teams. Ich erkläre komplexe Themen verständlich und lege Wert darauf, dass sich alle Schüler:innen wohlfühlen und ihre individuellen Ziele erreichen. Geduld und eine ruhige Atmosphäre sind mir besonders wichtig.",
    image: publicImage("logobg.png"),
    subjects: "Mathe, Deutsch",
  },
  {
    name: "André Becker",
    role: "Lehrer",
    bio: "Hallo! Mein Name ist André, ich bin Nachhilfelehrer bei Nachhilfe+. Hauptsächlich für die Fächer Mathematik, Deutsch, Geschichte und Ethik. Neben meiner Arbeit studiere ich Philosophie als auch Geschichte an der Universität in Göttingen. \nIch habe zuletzt in einer Grundschule im Hort gearbeitet, dort Kinder bis zur 4. Klassenstufe betreut, mit den Hausaufgaben geholfen und Vertretungsstunden gegeben. Zudem habe ich mich 5 Jahre in einem Jugendverein sozial engagiert, wobei ich Sportunterricht mit Vorschulkinder machte um diese besser auf den Schulsport vorzubereiten und allgemeine Motorik, sowie Koordination zu verbessern. \nDie Arbeit mit Kindern und Jugendlichen macht mir sehr viel Spaß, am meisten Freude bereitet mir an der Nachhilfe das Gefühl wenn ein/e Schüler/in den Schulstoff versteht und ihre Frustration langsam schwindet. \nSo freue ich mich schon euch kennenzulernen, bis dahin. \nAndré",
    image: publicImage("andre-becker.jpg"),
    subjects: "Mathe",
  },
];

const TeamGrid = ({ people }: { people: TeamMember[] }) => {
  const getSlidesPerView = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const [slidesPerView, setSlidesPerView] = useState(1);
  const [current, setCurrent] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setSlidesPerView(getSlidesPerView());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setCurrent(0);
  }, [slidesPerView]);

  const maxIndex = Math.max(0, people.length - slidesPerView);

  const prev = () => setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  const next = () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1));

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${(100 / slidesPerView) * current}%)` }}
      >
        {people.map((member: TeamMember, i: number) => (
          <div key={i} style={{ minWidth: `${100 / slidesPerView}%` }} className="px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-[2.5rem] overflow-hidden group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[2.5rem]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-img transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-primary/20 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full inline-flex items-center text-xs font-black uppercase tracking-widest text-white mb-2">
                    <GraduationCap className="w-3 h-3 mr-2" />
                    {member.role}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    {member.name}
                  </h3>
                </div>
              </div>
              <div className="p-10 md:p-12">
                <div className="mb-10">
                  <div
                    className={`text-slate-400 font-medium leading-relaxed text-base  transition-all duration-300
                      ${expandedIndex === i ? "max-h-48 overflow-y-auto pr-2" : "max-h-24 overflow-hidden"}
                    `}
                  >
                    {member.bio}
                  </div>
                  {member.bio.length > 160 && (
                    <button
                      onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                      className="mt-4 inline-flex items-center gap-2 text-slate-400 hover:text-primary text-sm font-semibold tracking-wide group transition-all"
                    >
                      <span className="relative">
                        {expandedIndex === i ? "Weniger anzeigen" : "Mehr lesen"}
                        <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedIndex === i ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                <div className="pt-8 border-t border-white/10">
                  <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">Schwerpunkte</div>
                  <div className="text-white font-bold">{member.subjects}</div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      {/* Pfeile */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
            Unser <span className="gradient-text">Team</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Lerne das Team von Nachhilfe Plus kennen. Wir begleiten dich nicht nur fachlich, sondern stehen dir als persönliche Unterstützer auf deinem Weg zum Erfolg zur Seite.
          </p>
        </div>
        <TeamGrid people={team} />
      </div>
    </section>
  );
};

export default Team;


