import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Plus, Trash2, BookOpen, Clock, User } from 'lucide-react';
import { FormSubmitError, submitForm } from '../lib/formApi';

interface Subject {
  name: string;
  grade: string;
}

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
}

export const ApplicationForm = ({ isOpen, onClose, jobTitle }: ApplicationFormProps) => {
  const [subjects, setSubjects] = useState<Subject[]>([{ name: '', grade: '' }]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [applicantData, setApplicantData] = useState({
    fullName: '',
    email: '',
    phone: '',
    status: 'Schueler',
    availability: '',
  });

  const addSubject = () => {
    setSubjects([...subjects, { name: '', grade: '' }]);
  };

  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const handleApplicantDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setErrorMessage('');
    setApplicantData({
      ...applicantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await submitForm({
        formType: 'application',
        jobTitle: jobTitle || 'Initiativbewerbung',
        fullName: applicantData.fullName.trim(),
        email: applicantData.email.trim(),
        phone: applicantData.phone.trim(),
        status: applicantData.status,
        availability: applicantData.availability.trim(),
        subjects: subjects.map((subject) => ({
          name: subject.name.trim(),
          grade: subject.grade,
        })),
      });

      setIsSubmitted(true);
      setSubjects([{ name: '', grade: '' }]);
      setApplicantData({
        fullName: '',
        email: '',
        phone: '',
        status: 'Schueler',
        availability: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (error) {
      setErrorMessage(
        error instanceof FormSubmitError
          ? error.message
          : 'Beim Senden der Bewerbung ist ein Fehler aufgetreten.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-[2.5rem] border border-white/10 shadow-2xl"
          >
            <div className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md p-6 md:p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                  Bewerbung <span className="gradient-text">starten</span>
                </h2>
                {jobTitle && (
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">
                    Position: {jobTitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 glass rounded-xl flex items-center justify-center text-white hover:text-primary transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Vielen Dank!</h3>
                  <p className="text-slate-400 font-medium">Deine Bewerbung ist bei uns eingegangen. Wir melden uns in Kuerze bei dir.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-black uppercase tracking-tighter">Persoenliche Daten</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Vollstaendiger Name*</label>
                        <input required type="text" name="fullName" value={applicantData.fullName} onChange={handleApplicantDataChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all" placeholder="Max Mustermann" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">E-Mail Adresse*</label>
                        <input required type="email" name="email" value={applicantData.email} onChange={handleApplicantDataChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all" placeholder="max@beispiel.de" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Telefonnummer*</label>
                        <input required type="tel" name="phone" value={applicantData.phone} onChange={handleApplicantDataChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all" placeholder="+49 123 456789" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Aktueller Status*</label>
                        <select required name="status" value={applicantData.status} onChange={handleApplicantDataChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all appearance-none">
                          <option className="bg-slate-900">Schueler</option>
                          <option className="bg-slate-900">Student</option>
                          <option className="bg-slate-900">Absolvent</option>
                          <option className="bg-slate-900">Lehrer / Dozent</option>
                          <option className="bg-slate-900">Sonstiges</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-black uppercase tracking-tighter">Faecher & Klassenstufen</h3>
                      </div>
                      <button type="button" onClick={addSubject} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                        <Plus className="w-3 h-3" /> Fach hinzufuegen
                      </button>
                    </div>

                    <div className="space-y-4">
                      {subjects.map((subject, index) => (
                        <div key={index} className="flex gap-4 items-end">
                          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Fach*</label>
                              <input required type="text" value={subject.name} onChange={(e) => updateSubject(index, 'name', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all" placeholder="z.B. Mathematik" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Bis Klasse*</label>
                              <select required value={subject.grade} onChange={(e) => updateSubject(index, 'grade', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all appearance-none">
                                <option value="" className="bg-slate-900">Waehlen...</option>
                                <option value="1 - 4" className="bg-slate-900">1. bis 4. Klasse</option>
                                <option value="5" className="bg-slate-900">5. Klasse</option>
                                <option value="6" className="bg-slate-900">6. Klasse</option>
                                <option value="7" className="bg-slate-900">7. Klasse</option>
                                <option value="8" className="bg-slate-900">8. Klasse</option>
                                <option value="9" className="bg-slate-900">9. Klasse</option>
                                <option value="10" className="bg-slate-900">10. Klasse</option>
                                <option value="11" className="bg-slate-900">11. Klasse</option>
                                <option value="12" className="bg-slate-900">12. Klasse</option>
                                <option value="13" className="bg-slate-900">13. Klasse / Abitur</option>
                                <option value="uni" className="bg-slate-900">Universitaet / Studium</option>
                              </select>
                            </div>
                          </div>
                          {subjects.length > 1 && (
                            <button type="button" onClick={() => removeSubject(index)} className="w-14 h-14 glass rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all shrink-0">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-black uppercase tracking-tighter">Verfuegbarkeit (Optional)</h3>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Wann haettest du Zeit?</label>
                      <textarea rows={3} name="availability" value={applicantData.availability} onChange={handleApplicantDataChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-primary transition-all resize-none" placeholder="z.B. Montag & Mittwoch ab 16 Uhr, Samstag Vormittag..."></textarea>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="w-full bg-white text-black py-6 rounded-2xl font-black text-xl shadow-xl hover:bg-primary hover:text-white transition-all uppercase tracking-tighter flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Bewerbung wird gesendet...' : 'Bewerbung absenden'}
                    <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationForm;
