import { useTranslation } from "react-i18next";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: "de", label: "DE" },
    { code: "sr-cyrillic", label: "ЋИР" },
    { code: "sr-latin", label: "LAT" },
    { code: "it", label: "IT" },
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/news", label: t("nav.news") },
    { href: "/bishop", label: t("nav.bishop") },
    { href: "/liturgy", label: t("nav.liturgy") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-orthodox-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full border-2 border-orthodox-gold flex items-center justify-center bg-orthodox-crimson text-white font-serif text-xl">
              A
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-bold text-orthodox-crimson uppercase tracking-wider font-sans">Eparhija</span>
              <span className="block text-lg font-serif text-orthodox-blue">Vladika Andrej</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-gray-700 hover:text-orthodox-gold transition-colors font-sans uppercase text-sm font-semibold tracking-wide"
              >
                {link.label}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 text-orthodox-blue font-bold border border-orthodox-gold/30 rounded-full px-3 py-1 hover:bg-orthodox-gold/10 transition-colors"
              >
                <Globe size={16} />
                <span className="text-xs">{i18n.language.toUpperCase().substring(0, 3)}</span>
                <ChevronDown size={14} className={isLangMenuOpen ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-white border border-orthodox-gold/20 rounded-lg shadow-xl overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orthodox-gold/10 hover:text-orthodox-gold"
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orthodox-gold p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-orthodox-gold/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-orthodox-gold border-b border-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-wrap gap-2 pt-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-4 py-2 text-xs font-bold rounded-full border ${i18n.language === lang.code ? "bg-orthodox-gold text-white border-orthodox-gold" : "border-gray-200 text-gray-600"}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
