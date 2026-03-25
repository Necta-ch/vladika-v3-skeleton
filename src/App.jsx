import { Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';

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
            <Route path="/" element={<Home />} />
            <Route path="/eparhija" element={<Eparhija />} />
            <Route path="/history" element={<History />} />
            <Route path="/sematizam" element={<Sematizam />} />
            <Route path="/liturgy" element={<Liturgy />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/bishop" element={<Bishop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vesti" element={<Vesti />} />
            <Route path="/admin" element={<Admin />} />
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
    <footer className="bg-orthodox-brown text-white py-20 border-t-4 border-orthodox-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="font-serif text-3xl text-orthodox-gold">{t("footer.title", "Епархија швајцарска")}</h3>
            <p className="text-gray-300 font-sans leading-relaxed text-sm">
              {t("footer.description", "Званична интернет страница Епархије швајцарске Српске Православне Цркве.")}
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-serif text-lg uppercase tracking-widest text-orthodox-gold">{t("footer.links_title", "Навигација")}</h4>
            <ul className="space-y-3 font-sans text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">{t("footer.link_home", "Почетна")}</Link></li>
              <li><Link to="/bishop" className="hover:text-white transition-colors">{t("footer.link_bishop", "Епископ Андреј")}</Link></li>
              <li><Link to="/liturgy" className="hover:text-white transition-colors">{t("footer.link_schedule", "Распоред богослужења")}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t("footer.link_contact", "Контакт")}</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-serif text-lg uppercase tracking-widest text-orthodox-gold">{t("footer.contact_title", "Контакт")}</h4>
            <div className="text-gray-400 font-sans space-y-2 text-sm">
              <p>{t("footer.address", "Elisabethenstrasse 20, 8004 Zürich, Швајцарска")}</p>
              <p>Email: <a href="mailto:eparhija@crkva.ch" className="hover:text-white transition-colors">eparhija@crkva.ch</a></p>
              <p>Tel: <a href="tel:+41442428990" className="hover:text-white transition-colors">+41 44 242 89 90</a></p>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-sans tracking-widest uppercase">
          <div>&copy; {new Date().getFullYear()} {t("footer.copyright", "Епархија швајцарска. Сва права задржана.")}</div>
          <div className="mt-3 text-gray-600">
            Powered by{" "}
            <a href="https://necta.ch" target="_blank" rel="noopener noreferrer" className="text-orthodox-gold hover:text-white transition-colors font-bold">
              Necta
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default App;
