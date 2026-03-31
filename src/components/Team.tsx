import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Star, Award } from "lucide-react";
import {  ChevronLeft, ChevronRight, ChevronDown  } from "lucide-react";

const team = [
  {
    name: "Nassim Ouaissa",
    role: "Gründer & Leitung",
    subjects: "Mathe, Physik, Französisch, Informatik",
    image:
       "/images/Nassim.jpg", 
               
     // "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Mein Name ist Nassim Ouaissa und ich bin der Gründer von Nachhilfe Plus. Mit meinem Angebot verfolge ich das Ziel, Schülerinnen und Schüler individuell zu fördern und sie gezielt auf ihrem schulischen Weg zu unterstützen.Ich weiß, dass schulische Herausforderungen für Familien oft mit Unsicherheiten und zusätzlichem Druck verbunden sind. Genau hier setze ich an: Nachhilfe Plus steht für eine verlässliche, strukturierte und auf die Bedürfnisse Ihres Kindes abgestimmte Förderung. Im Mittelpunkt meiner Arbeit steht nicht nur die kurzfristige Verbesserung der Noten, sondern vor allem ein nachhaltiges Verständnis der Lerninhalte. Durch klare Erklärungen, eine ruhige Lernatmosphäre und eine systematische Vorgehensweise helfe ich Ihrem Kind, Wissenslücken gezielt zu schließen und neues Selbstvertrauen aufzubauen. Ein transparenter Austausch mit Ihnen als Eltern ist mir dabei besonders wichtig. Sie erhalten regelmäßige Rückmeldungen zum Lernfortschritt, sodass Sie jederzeit einen Überblick über die Entwicklung Ihres Kindes haben. Nachhilfe Plus steht für Qualität, Verlässlichkeit und eine individuelle Betreuung, die sich an den Stärken und Herausforderungen jedes einzelnen Schülers orientiert. Ich freue mich darauf, Sie und Ihr Kind persönlich kennenzulernen und gemeinsam die bestmögliche Unterstützung zu gestalten.",
  },
  {
    name: " Ari Sadoun",
    role: "Lehrer",
    subjects: "Deutsch, Werte und Normen, Englisch, Mathe",
    image:
      "/images/ari.jpg",
    bio: "Ich bin Ari Sadoun, 24 Jahre alt und studiere in Göttingen Gymnasiallehramt. Zur Zeit befinde ich mich im 3. Mastersemester. Meine beiden Studienfächer lauten Deutsch, Werte und Normen, ich gebe aber auch Nachhilfe in weiteren Fächern, wie beispielsweise Mathe und Englisch. Ich arbeite schon seit über einem Jahr bei Nachhilfe Plus und genieße die gemeinsame Zeit im Büro mit meinen Kolleg*innen sowie mit meinen Schüler*innen sehr",
  },
  {
    name: "Dunja Ben Chaladia",
    role: "Lehrerin",
    subjects: "Biologie, Chemie, Deutsch, Englisch, Französisch",
    image:
      "/images/dunja.jpg",
    bio: "Ich bin Dunja Ben Chaladia und studiere Biologie. Ich unterrichte nicht nur verwandte Fächer wie Chemie und Mathematik, sondern auch Sprachen wie Deutsch, Französisch und Englisch. Schon während meiner Schulzeit habe ich Nachhilfe gegeben und später als Tutorin an der Universität Studierende unterstützt. Es macht mir viel Spaß, mit Kindern und Jugendlichen jeden Alters zu arbeiten, ihre Stärken kennenzulernen und den Unterricht auf sie abzustimmen.",
  },
   {
    name: "Diana Kanjo",
    role: "Lehrerin",
    subjects: "Mathe, Deutsch, Englisch",
    image:"/images/diana-kanjo.jpg",
    bio: "Seit mehreren Jahren unterstütze ich Schülerinnen und Schüler als engagierte Nachhilfelehrerin dabei, Lernlücken zu schließen und wieder Freude am Lernen zu entdecken. Mein Schwerpunkt liegt auf den Fächern Mathematik, Englisch und Deutsch. Dabei lege ich großen Wert darauf, individuell auf die Bedürfnisse meiner Schüler einzugehen und eine angenehme, motivierende Lernatmosphäre zu schaffen. Warum mir das wichtig ist? Weil meine Schüler sich auf die Unterrichtsstunden freuen sollen. Lernen funktioniert am besten, wenn man sich wohlfühlt, sich ernst genommen fühlt und merkt, dass man wirklich Fortschritte macht. Genau das möchte ich in jeder Stunde erreichen!.",
  },
   {
    name: "Sarah Al-Naseri",
    role: "Lehrerin",
    subjects: "Deutsch , Englisch, Mathe",
    image:
      "/images/logobg.png",
    bio: "Ich bin Sarah Al-Naseri, 24 Jahre alt Nachhilfelehrerin für Deutsch, Mathematik und Englisch. Ich studiere derzeit im Masterstudiengang Psychologie und Klinische Psychologie und arbeite seit mehreren Jahren erfolgreich als Nachhilfelehrerin. Mein Schwerpunkt liegt auf Deutsch, Mathematik und Englisch sowie auf Spanisch-Grundkenntnissen und Grammatik. Besonders im Bereich der deutschen Sprache und im Kommunikationstraining bringe ich umfangreiche Erfahrung mit. Ich unterstütze Lernende beim Aufbau sicherer Sprachkompetenz von Grammatik und Wortschatz bis hin zu selbstbewusstem Sprechen. Mehrere Schülerinnen und Schüler habe ich erfolgreich von A1 bis zum B2-Niveau begleitet. Neben meiner Unterrichtstätigkeit spreche ich Deutsch, Arabisch, Englisch, Türkisch sowie Spanisch (Grundkenntnisse), was mir eine mehrsprachige und kultursensible Förderung ermöglicht. Durch mein psychologisches Fachwissen arbeite ich strukturiert, empathisch und individuell angepasst. Mein Ziel ist es, nicht nur schulische Leistungen zu verbessern, sondern auch Motivation, Selbstvertrauen und nachhaltige Lernerfolge zu fördern.",
  },
  {
    name: "Sofia D.",
    role: "Lehrerin",
    subjects: "Spanisch , Mathe",
    image:
      "/images/logobg.png",
    bio: "Als Muttersprachlerin aus Ecuador unterstütze ich Ihr Kind dabei, die spanische Sprache mit Freude und Selbstvertrauen zu lernen. Mir ist wichtig, dass sich Ihr Kind im Unterricht wohlfühlt und ohne Druck lernen kann. Mit viel Geduld, klaren Erklärungen und einer positiven Lernatmosphäre helfe ich dabei, Wissenslücken zu schließen und nachhaltige Fortschritte zu erzielen.",
  },
  {
    name: "André Becker",
    role: "Lehrer",
    subjects: "Informatik",
    image:
      "/images/andre-becker.jpg",
    bio: "Hallo! Mein Name ist André, ich bin Nachhilfelehrer bei Nachhilfe+. Hauptsächlich für die Fächer Mathematik, Deutsch, Geschichte und Ethik. Neben meiner Arbeit studiere ich Philosophie als auch Geschichte an der Universität in Göttingen. Ich habe zuletzt in einer Grundschule im Hort gearbeitet, dort Kinder bis zur 4. Klassenstufe betreut, mit den Hausaufgaben geholfen und Vertretungsstunden gegeben. Zudem habe ich mich 5 Jahre in einem Jugendverein sozial engagiert, wobei ich Sportunterricht mit Vorschulkinder machte um diese besser auf den Schulsport vorzubereiten und allgemeine Motorik, sowie Koordination zu verbessern. Die Arbeit mit Kindern und Jugendlichen macht mir sehr viel Spaß, am meisten Freude bereitet mir an der Nachhilfe das Gefühl wenn ein/e Schüler/in den Schulstoff versteht und ihre Frustration langsam schwindet. So freue ich mich schon euch kennenzulernen, bis dahin.",
  },
];

const oldTeam = [
  {
    name: "Max Beispiel",
    role: "Ehemaliger Mentor",
    subjects: "Chemie, Biologie",
    image:
      "https://images.unsplash.com/photo-1520975958225-1e7c4f8c1f08?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Hat viele Schüler erfolgreich bis zum Abschluss begleitet.",
  },
  {
    name: "Lea Beispiel",
    role: "Ehemalige Mentorin",
    subjects: "Deutsch, Geschichte",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Spezialisiert auf Textanalyse und Prüfungsvorbereitung.",
  },
   
  {
    name: "Tim Beispiel",
    role: "Ehemaliger Tutor",
    subjects: "Informatik",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Hat Lernpläne für digitale Nachhilfe optimiert.",
  },
];

const TeamGrid = ({ people }: { people: typeof team }) => {
  const getSlidesPerView = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

    const [slidesPerView, setSlidesPerView] = useState(1);
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
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

  const prev = () =>
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));

  const next = () =>
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${(100 / slidesPerView) * current}%)`,
        }}
      >
        {people.map((member: typeof people[0], i: number) => (
          <div
            key={i}
            style={{ minWidth: `${100 / slidesPerView}%` }}
            className="px-4"
          >
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
                  className="w-full h-full object-contain object-center bg-background transition-transform duration-500 group-hover:scale-105"
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
  className="mt-4 inline-flex items-center gap-2 text-slate-400 hover:text-primary

 text-sm font-semibold tracking-wide group transition-all"
>
  <span className="relative">
    {expandedIndex === i ? "Weniger anzeigen" : "Mehr lesen"}
    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
  </span>

  <ChevronDown
    className={`w-4 h-4 transition-transform duration-300 ${
      expandedIndex === i ? "rotate-180" : ""
    }`}
  />
</button>

  )}
</div>


                <div className="pt-8 border-t border-white/10">

                  <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">
                    Schwerpunkte
                  </div>
                  <div className="text-white font-bold">
                    {member.subjects}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Pfeile */}
  
<button
  onClick={prev}
  className="absolute left-4 top-1/2 -translate-y-1/2 
             w-12 h-12 flex items-center justify-center
             rounded-full 
             bg-white/10 backdrop-blur-md
             border border-white/20
             text-white
             hover:bg-primary hover:scale-110
             transition-all duration-300 shadow-lg"
>
  <ChevronLeft className="w-6 h-6" />
</button>

<button
  onClick={next}
  className="absolute right-4 top-1/2 -translate-y-1/2 
             w-12 h-12 flex items-center justify-center
             rounded-full 
             bg-white/10 backdrop-blur-md
             border border-white/20
             text-white
             hover:bg-primary hover:scale-110
             transition-all duration-300 shadow-lg"
>
  <ChevronRight className="w-6 h-6" />
</button>

    </div>
  );
};


const Team = () => {
  const scrollToJobs = () => {
    const element = document.getElementById("jobs");
    if (!element) return;

    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return (
    <>
      <section id="team" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
              Unser <span className="gradient-text">Team</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Lerne das Team von Nachhilfe Plus kennen. Wir begleiten dich nicht nur fachlich, 
              sondern stehen dir als persönliche Unterstützer auf deinem Weg zum Erfolg zur Seite.
            </p>
          </div>

          <TeamGrid people={team} />
        </div>
      </section>

      {/* <section id="oldteam" className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
              Unsere{" "}
              <span className="gradient-text">Ehemaligen Wegbegleiter</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              Menschen, die Nachhilfe Plus geprägt haben und Schüler unterstützt
              haben.
            </p>
          </div>

          <TeamGrid people={oldTeam} />

          <div className="mt-20 glass p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-white/10">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-black uppercase tracking-tight">
                  Werde Teil des Teams
                </h4>
                <p className="text-slate-400 font-medium">
                  Du bist Student oder Lehrer und hast Lust, Schüler wirklich weiterzubringen? Dann werde Teil von Nachhilfe Plus.
                </p>
              </div>
            </div>
            <button
              onClick={scrollToJobs}
              className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-tight hover:bg-primary hover:text-white transition-all shrink-0"
            >
              Jetzt Bewerben
            </button>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Team;
