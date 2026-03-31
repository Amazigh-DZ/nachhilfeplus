import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Clock, MapPin, ArrowRight, GraduationCap, Zap } from 'lucide-react';
import ApplicationForm from './ApplicationForm';

const jobOpenings = [
  {
    title: "Nachhilfelehrer/in  für Mathematik",
    type: "Auf Honorar",
    location: "Bei Nachhilfe Plus / Beim Schüler",
    description: "Du liebst Mathe und kannst komplexe Themen einfach erklären? Werde Nachhilfe Lehrer/in für unsere Schüler.",
    tags: ["Mathe", "Flexibel", "Gut bezahlt"]
  },
  {
    title: "Nachhilfelehrer/in für Sprachen",
    type: "Auf Honorar",
    location: "Bei Nachhilfe Plus / Beim Schüler",
    description: "Deutsch, Englisch oder Französisch sind deine Leidenschaft? Hilf Schülern, ihre Sprachbarrieren zu überwinden.",
    tags: ["Sprachen", "Pädagogik", "Gut bezahlt"]
  },
  {
    title: "Nachhilfelehrer/in für Naturwissenschaften",
    type: "Werkstudent",
    location: "Göttingen",
    description: "Sind Naturwissenschaften deine Stärke? Werde Nachhilfe Lehrer/in für unsere Schüler.",
    tags: ["Physik", "Chemie", "Biologie", "Gut bezahlt"]
  }
];

const Jobs = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | undefined>(undefined);

  const handleApply = (title: string) => {
    setSelectedJob(title);
    setIsFormOpen(true);
  };

  return (
    <section id="jobs" className="py-16 px-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-primary text-xs font-black tracking-[0.2em] uppercase mb-6">
            <Briefcase className="w-4 h-4 mr-2" />
            Jobs
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">
            Offene <span className="gradient-text">Stellen</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            Wenn du Wissen gern teilst und Freude daran hast, Schülern zu helfen, dann werde Teil unseres Teams.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {jobOpenings.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-grow">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {job.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight uppercase group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {job.location}
                    </div>
                  </div>
                  <p className="text-slate-400 font-medium leading-relaxed max-w-3xl">
                    {job.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <button 
                    onClick={() => handleApply(job.title)}
                    className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    Details & Bewerben
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 glass p-12 rounded-[3rem] text-center border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Nichts Passendes dabei?</h3>
          <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
            Wir sind immer auf der Suche nach Talenten. Schick uns einfach eine Initiativbewerbung und erzähl uns, wie du uns unterstützen kannst.
          </p>
          <button 
            onClick={() => handleApply('Initiativbewerbung')}
            className="glass px-10 py-5 rounded-2xl font-black uppercase tracking-tight hover:bg-white/10 transition-all"
          >
            Initiativbewerbung senden
          </button>
        </div>
      </div>

      <ApplicationForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        jobTitle={selectedJob}
      />
    </section>
  );
};

export default Jobs;
