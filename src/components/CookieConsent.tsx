import React, { useState, useEffect } from 'react';
import { X, Settings, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
  });

  // Check if user has already consented
  useEffect(() => {
    const savedSettings = localStorage.getItem('cookieConsent');
    if (!savedSettings) {
      setIsVisible(true);
    } else {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
    }
  }, []);

  const handleAcceptAll = () => {
    const newSettings = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(newSettings));
    setSettings(newSettings);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const newSettings = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(newSettings));
    setSettings(newSettings);
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(settings));
    setIsVisible(false);
    setShowSettings(false);
  };

  const toggleSetting = (key: keyof Omit<CookieSettings, 'timestamp'>) => {
    if (key === 'necessary') return; // Necessary cookies can't be disabled
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const cookieCategories = [
    {
      id: 'necessary',
      name: 'Notwendige Cookies',
      description: 'Diese Cookies sind essentiell für die Grundfunktionen der Website und können nicht deaktiviert werden.',
      required: true,
    },
    {
      id: 'analytics',
      name: 'Analyse-Cookies',
      description: 'Helfen uns zu verstehen, wie Besucher die Website nutzen, um das Nutzererlebnis zu verbessern.',
    },
    {
      id: 'marketing',
      name: 'Marketing-Cookies',
      description: 'Werden verwendet, um Besuchern relevante Anzeigen und Kampagnen zu zeigen.',
    },
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => !showSettings && setIsVisible(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Banner */}
      <AnimatePresence>
        {isVisible && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-7xl mx-auto glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 md:p-8">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h2 className="text-xl font-black text-white mb-2 uppercase tracking-tight">
                        Cookie-Einstellungen
                      </h2>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Wir verwenden Cookies, um dein Nutzererlebnis zu verbessern, Inhalte zu personalisieren und unseren Service zu optimieren. 
                        Mit deinem Einverständnis werden auch Analyse- und Marketing-Cookies gespeichert.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-slate-400 hover:text-white transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all uppercase text-sm tracking-tight"
                  >
                    Ablehnen
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary/50 bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-all uppercase text-sm tracking-tight"
                  >
                    <Settings className="w-4 h-4" />
                    Einstellungen
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/80 transition-all uppercase text-sm tracking-tight ml-auto"
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isVisible && showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <h1 className="text-2xl font-black uppercase text-white">Cookie-Einstellungen</h1>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-sm text-slate-400 mb-4">
                    Stelle deine Cookie-Präferenzen ein. Beachte, dass die Deaktivierung einiger Cookies die Funktionalität der Website beeinträchtigen kann.
                  </p>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-4">
                  {cookieCategories.map((category) => (
                    <div
                      key={category.id}
                      className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-white uppercase tracking-tight text-sm">
                            {category.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleSetting(category.id as keyof Omit<CookieSettings, 'timestamp'>)}
                          disabled={category.required}
                          className={`relative w-12 h-6 rounded-full transition-all shrink-0 ${
                            settings[category.id as keyof Omit<CookieSettings, 'timestamp'>]
                              ? 'bg-primary'
                              : 'bg-slate-600'
                          } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div
                            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                              settings[category.id as keyof Omit<CookieSettings, 'timestamp'>]
                                ? 'translate-x-6'
                                : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                      {category.required && (
                        <p className="text-xs text-primary font-bold uppercase tracking-tight mt-2">
                          Immer aktiviert
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Info Box */}
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-xs text-slate-300">
                    <strong className="text-primary">Weitere Informationen:</strong> Siehe unsere{' '}
                    <button onClick={() => setShowSettings(false)} className="text-primary hover:underline">
                      Datenschutzerklärung
                    </button>
                    {' '}für Details zur Datenverwaltung.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={handleRejectAll}
                    className="px-6 py-3 rounded-lg border border-white/20 text-white font-bold hover:bg-white/10 transition-all uppercase text-sm tracking-tight"
                  >
                    Alle ablehnen
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/80 transition-all uppercase text-sm tracking-tight ml-auto"
                  >
                    Speichern
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
