import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Newspaper, Calendar, MapPin, User, Mail } from "lucide-react";
import Link from "next/link";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden crimson-gradient">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-40 bg-[url('/img/orthodox-church-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        
        {/* Gold Accent Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-orthodox-gold shadow-[0_0_20px_rgba(212,175,55,0.8)]"></div>

        <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-orthodox-gold flex items-center justify-center bg-white shadow-2xl">
              <img src="/img/icon-eparchia.svg" alt="Eparchia" className="w-16 h-16 p-2" />
            </div>
            <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-orthodox-parchment/90 font-sans max-w-3xl mx-auto mb-10 tracking-wide font-light">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/news"
                className="w-full sm:w-auto px-8 py-4 bg-orthodox-gold hover:bg-yellow-600 text-white font-sans font-bold uppercase tracking-widest rounded-sm transition-all shadow-xl hover:scale-105"
              >
                {t("nav.news")}
              </Link>
              <Link 
                href="/liturgy"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-orthodox-gold text-orthodox-gold hover:bg-orthodox-gold hover:text-white font-sans font-bold uppercase tracking-widest rounded-sm transition-all"
              >
                {t("nav.liturgy")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-orthodox-gold"></div>
          </div>
        </motion.div>
      </section>

      {/* Quick Sections Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <QuickActionCard 
              icon={<Newspaper size={32} />}
              title={t("sections.news")}
              href="/news"
              color="bg-orthodox-crimson"
            />
            <QuickActionCard 
              icon={<User size={32} />}
              title={t("sections.bishop")}
              href="/bishop"
              color="bg-orthodox-blue"
            />
            <QuickActionCard 
              icon={<Calendar size={32} />}
              title={t("sections.liturgy")}
              href="/liturgy"
              color="bg-orthodox-gold"
            />
            <QuickActionCard 
              icon={<Mail size={32} />}
              title={t("sections.contact")}
              href="/contact"
              color="bg-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Placeholder Image/Quote Section */}
      <section className="py-24 bg-orthodox-parchment/30 border-y border-orthodox-gold/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-8"
          >
            <span className="text-orthodox-gold text-5xl font-serif">“</span>
            <p className="text-2xl md:text-3xl font-serif text-orthodox-blue italic leading-relaxed">
              Lasset uns demütig sein, damit Gott unsere Seelen erleuchtet. In der Einigkeit und im Gebet finden wir den wahren Pfad.
            </p>
            <div className="h-1 w-20 bg-orthodox-gold mx-auto"></div>
            <p className="text-lg font-bold text-orthodox-crimson font-sans uppercase tracking-widest">
              + Bischof Andrej
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const QuickActionCard = ({ icon, title, href, color }) => (
  <Link href={href}>
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative p-8 h-64 overflow-hidden rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${color} opacity-10 group-hover:opacity-20 transition-all`}></div>
      <div className="flex flex-col h-full justify-between">
        <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-serif text-orthodox-blue font-bold mb-2 group-hover:text-orthodox-gold transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-sm font-sans font-bold text-gray-400 group-hover:text-orthodox-crimson uppercase tracking-wider">
            Mehr entdecken <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default Home;
