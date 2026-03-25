import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Globe, Search, Mail, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if we're on the homepage (hero overlaps navbar)
  const isHomepage = router.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { href: "/", label: t("nav.home", "ПОЧЕТНА") },
    { href: "/vesti", label: t("nav.news", "ВЕСТИ") },
    { href: "/eparhija", label: t("nav.eparchy", "ЕПАРХИЈА") },
    { href: "/history", label: t("nav.history", "ИСТОРИЈА") },
    { href: "/sematizam", label: t("nav.directory", "СВЕ ЦРКВЕ") },
    { href: "/liturgy", label: t("nav.liturgy", "БОГОСЛУЖЕЊА") },
    { href: "/calendar", label: t("nav.calendar", "КАЛЕНДАР") },
    { href: "/bishop", label: t("nav.bishop", "ЕПИСКОП") },
    { href: "/contact", label: t("nav.contact", "КОНТАКТ") }
  ];

  // Transparent when on homepage and not scrolled; otherwise solid white
  const isTransparent = isHomepage && !scrolled;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isTransparent 
        ? "bg-transparent" 
        : "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Branding Row */}
        <div className={`flex items-center justify-between pt-5 pb-2 border-b transition-colors duration-500 ${
          isTransparent ? "border-white/20" : "border-gray-100"
        }`}>
          {/* Logo + Title */}
          <Link href="/" className="flex flex-col group">
            <span className={`text-[9px] font-bold uppercase tracking-[0.3em] font-sans mb-1 transition-colors duration-500 ${
              isTransparent ? "text-white/70" : "text-gray-400"
            }`}>
              {t("home.subtitle", "Српска Православна Црква")}
            </span>
            <span className={`text-xl md:text-2xl font-serif tracking-[0.08em] leading-none transition-colors duration-500 ${
              isTransparent ? "text-white" : "text-gray-900"
            }`}>
              {t("home.title", "Епархија швајцарска").toUpperCase()}
            </span>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center space-x-1 transition-colors p-2 ${
                  isTransparent 
                    ? "text-white/80 hover:text-white" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Globe size={18} />
                <ChevronDown size={12} className={isLangMenuOpen ? "rotate-180 transition-transform" : "transition-transform"} />
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-2xl overflow-hidden text-gray-900 border border-gray-100 z-[100]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors font-medium ${
                          i18n.language === lang.code ? "text-orthodox-gold font-bold" : "text-gray-700"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Icon */}
            <a 
              href="mailto:eparhija@crkva.ch" 
              className={`hidden md:flex p-2 transition-colors ${
                isTransparent 
                  ? "text-white/80 hover:text-white" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Mail size={18} />
            </a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 transition-colors ${
                isTransparent ? "text-white" : "text-gray-900"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation Links Row */}
        <div className="hidden md:flex items-center justify-start space-x-1 py-3">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`relative px-4 py-2 text-[11px] font-sans font-medium tracking-[0.15em] uppercase transition-colors duration-300 group ${
                isTransparent 
                  ? "text-white/85 hover:text-white" 
                  : "text-gray-600 hover:text-orthodox-brown"
              } ${router.pathname === link.href ? (isTransparent ? "text-white font-bold" : "text-orthodox-brown font-bold") : ""}`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-4 right-4 h-[2px] transition-transform duration-300 origin-left ${
                router.pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              } ${isTransparent ? "bg-white" : "bg-orthodox-gold"}`}></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-orthodox-gold border-b border-gray-50 font-sans"
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
                    className={`px-4 py-2 text-xs font-bold rounded-full border ${
                      i18n.language === lang.code 
                        ? "bg-orthodox-gold text-white border-orthodox-gold" 
                        : "border-gray-200 text-gray-600"
                    }`}
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
