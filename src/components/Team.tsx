import React from 'react';
import { User, Users } from 'lucide-react';

const teamMembers = [
  { name: 'Anna Berger', role: 'Lehrkraft Mathe', bio: 'Geduldig, strukturiert und mit 8 Jahren Nachhilfeerfahrung.', photo: '/images/team-1.jpg' },
  { name: 'Lukas Schmidt', role: 'Lehrkraft Sprachen', bio: 'Fokus auf individuelle Förderung & Prüfungscoaching.', photo: '/images/team-2.jpg' },
  { name: 'Sofia Maier', role: 'Lehrkraft Naturwissenschaften', bio: 'Experte für Physik & Chemie und Motivationstraining.', photo: '/images/team-3.jpg' }
];

const Team = () => {
  return (
    <section id="team" className="py-32 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-primary text-xs font-black tracking-[0.2em] uppercase mb-6">
            <Users className="w-4 h-4 mr-2" />
            Team
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight uppercase">
            Unser <span className="gradient-text">Team</span>
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg font-medium">
            Erfahrene Tutoren, personalisiertes Coaching, transparente Prozesse und volle Leidenschaft für deinen Lernfortschritt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="glass p-8 rounded-[2.5rem] border border-white/10 hover:border-primary/40 transition-all">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <User className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black mb-2 uppercase tracking-tight">{member.name}</h3>
              <p className="text-sm text-primary uppercase font-bold mb-4">{member.role}</p>
              <p className="text-slate-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
