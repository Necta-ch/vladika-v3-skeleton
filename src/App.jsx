import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Home from './pages/index';
import Eparhija from './pages/eparhija';
import History from './pages/history';
import Sematizam from './pages/sematizam';
import Liturgy from './pages/liturgy';
import Calendar from './pages/calendar';
import Bishop from './pages/bishop';
import Contact from './pages/contact';
import Vesti from './pages/vesti';
import Admin from './pages/admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isHomepage = location.pathname === '/';

  return (
    <div dir={i18n.dir()}>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={isHomepage ? 'min-h-screen' : 'pt-[130px] min-h-screen'}
        >
          <Routes location={location}>
            <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
            <Route path="/eparhija" element={<ErrorBoundary><Eparhija /></ErrorBoundary>} />
            <Route path="/history" element={<ErrorBoundary><History /></ErrorBoundary>} />
            <Route path="/sematizam" element={<ErrorBoundary><Sematizam /></ErrorBoundary>} />
            <Route path="/liturgy" element={<ErrorBoundary><Liturgy /></ErrorBoundary>} />
            <Route path="/calendar" element={<ErrorBoundary><Calendar /></ErrorBoundary>} />
            <Route path="/bishop" element={<ErrorBoundary><Bishop /></ErrorBoundary>} />
            <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
            <Route path="/vesti" element={<ErrorBoundary><Vesti /></ErrorBoundary>} />
            <Route path="/admin" element={<ErrorBoundary><Admin /></ErrorBoundary>} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gradient-to-b from-[#1a1410] to-[#0f0c08] text-white">
      {/* Top golden divider line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-orthodox-gold/40 to-transparent"></div>

      {/* Decorative ornament */}
      <div className="flex items-center justify-center pt-16 pb-14">
        <span className="block w-24 h-px bg-gradient-to-r from-transparent to-orthodox-gold/30"></span>
        <span className="mx-5 text-orthodox-gold/50 text-xl">☦</span>
        <span className="block w-24 h-px bg-gradient-to-l from-transparent to-orthodox-gold/30"></span>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
          {/* Branding */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-white/90 leading-tight">{t("footer.title", "Епархија швајцарска")}</h3>
            <div className="w-10 h-[2px] bg-orthodox-gold/40"></div>
            <p className="text-white/35 font-sans leading-[1.8] text-[13px]">
              {t("footer.description", "Званична интернет страница Епархије швајцарске Српске Православне Цркве.")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.25em] text-orthodox-gold/70 font-semibold">{t("footer.links_title", "Навигација")}</h4>
            <div className="w-10 h-[2px] bg-orthodox-gold/20"></div>
            <ul className="space-y-4 font-sans text-white/35 text-[13px]">
              <li><Link to="/" className="hover:text-orthodox-gold transition-colors duration-300">{t("footer.link_home", "Почетна")}</Link></li>
              <li><Link to="/bishop" className="hover:text-orthodox-gold transition-colors duration-300">{t("footer.link_bishop", "Епископ Андреј")}</Link></li>
              <li><Link to="/liturgy" className="hover:text-orthodox-gold transition-colors duration-300">{t("footer.link_schedule", "Распоред богослужења")}</Link></li>
              <li><Link to="/contact" className="hover:text-orthodox-gold transition-colors duration-300">{t("footer.link_contact", "Контакт")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.25em] text-orthodox-gold/70 font-semibold">{t("footer.contact_title", "Контакт")}</h4>
            <div className="w-10 h-[2px] bg-orthodox-gold/20"></div>
            <div className="text-white/35 font-sans space-y-4 text-[13px]">
              <p>{t("footer.address", "Elisabethenstrasse 20, 8004 Zürich, Швајцарска")}</p>
              <p>Email: <a href="mailto:eparhija@crkva.ch" className="hover:text-orthodox-gold transition-colors duration-300">eparhija@crkva.ch</a></p>
              <p>Tel: <a href="tel:+41442428990" className="hover:text-orthodox-gold transition-colors duration-300">+41 44 242 89 90</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-8 text-center">
        <p className="text-white/20 font-sans text-[11px] tracking-[0.15em]">
          &copy; {new Date().getFullYear()} {t("footer.copyright", "Епархија швајцарска. Сва права задржана.")}
        </p>
        <p className="mt-3 text-white/15 font-sans text-[10px] tracking-[0.2em] italic">
          With faith and love made by{" "}
          <a href="https://necta.ch" target="_blank" rel="noopener noreferrer" className="text-orthodox-gold/50 hover:text-orthodox-gold transition-colors duration-300 not-italic font-semibold">
            Necta
          </a>
        </p>
      </div>
    </footer>
  );
};

export default App;
