import "../styles/globals.css";
import "../i18n";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div dir={i18n.dir()}>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-20 min-h-screen"
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-orthodox-blue text-white py-20 border-t-8 border-orthodox-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="font-serif text-3xl text-orthodox-gold">Eparhija</h3>
            <p className="text-gray-300 font-sans leading-relaxed">
              Willkommen bei der Serbisch-Orthodoxen Eparchie für Österreich, die Schweiz und Italien. Wir pflegen den Glauben und die Gemeinschaft.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-serif text-xl uppercase tracking-widest text-orthodox-gold">Links</h4>
            <ul className="space-y-4 font-sans text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Startseite</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bischof Andrej</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liturgieplan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-serif text-xl uppercase tracking-widest text-orthodox-gold">Kontakt</h4>
            <div className="text-gray-400 font-sans space-y-2">
              <p>Schottenfeldgasse 17, 1070 Wien, Österreich</p>
              <p>Email: eparhija@example.com</p>
              <p>Tel: +43 1 2345678</p>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-white/10 text-center text-sm text-gray-500 font-sans tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Eparhija Vladika Andrej. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};

export default MyApp;
