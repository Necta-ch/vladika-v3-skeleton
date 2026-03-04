import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Newspaper, ChevronRight, Calendar, User } from "lucide-react";
import Link from "next/link";

const News = () => {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 1,
      title: "Geistliche Reise des Bischofs durch die Schweiz",
      date: "01. März 2026",
      excerpt: "Vladika Andrej besucht die Gemeinden in Zürich und Bern, um den Glauben und die Einheit zu stärken...",
      category: "Ereignisse",
      img: "/img/news-1.jpg"
    },
    {
      id: 2,
      title: "Neues Hilfsprojekt für bedürftige Familien in Italien gestartet",
      date: "25. Februar 2026",
      excerpt: "Die Eparchie kündigt eine großflächige Spendenaktion an, um humanitäre Hilfe in Norditalien zu leisten...",
      category: "Humanitär",
      img: "/img/news-2.jpg"
    },
    {
      id: 3,
      title: "Vorlesung über die Bedeutung der Liturgie in der modernen Welt",
      date: "15. Februar 2026",
      excerpt: "Theologische Reflexionen von Vladika Andrej über die spirituelle Tiefe des orthodoxen Gottesdienstes...",
      category: "Theologie",
      img: "/img/news-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="h-64 crimson-gradient relative flex items-center justify-center text-white overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('/img/orthodox-pattern.png')] bg-repeat"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-2 tracking-tight">
            {t("nav.news")}
          </h1>
          <div className="h-1.5 w-16 bg-orthodox-gold mx-auto"></div>
        </motion.div>
      </header>

      {/* News Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {newsItems.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -10 }}
              className="flex flex-col bg-white border border-gray-100 shadow-xl overflow-hidden rounded-2xl group transition-all"
            >
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-orthodox-gold text-white text-xs font-sans font-bold uppercase tracking-widest px-4 py-1.5 rounded-full z-10">
                  {item.category}
                </div>
                {/* Image Placeholder Overlay */}
                <div className="absolute inset-0 bg-orthodox-blue opacity-5 mix-blend-multiply group-hover:scale-110 transition-transform duration-700"></div>
                <div className="w-full h-full bg-[url('/img/news-placeholder.jpg')] bg-cover bg-center"></div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-4 text-gray-400 text-xs font-sans font-bold uppercase tracking-widest mb-4">
                  <div className="flex items-center"><Calendar size={14} className="mr-1.5 text-orthodox-gold" /> {item.date}</div>
                </div>
                
                <h2 className="text-2xl font-serif text-orthodox-blue mb-4 group-hover:text-orthodox-gold transition-colors leading-snug">
                  {item.title}
                </h2>
                
                <p className="text-gray-500 font-sans text-sm mb-8 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
                
                <div className="mt-auto">
                  <Link 
                    href={`/news/${item.id}`}
                    className="flex items-center text-sm font-sans font-bold text-orthodox-crimson uppercase tracking-widest group-hover:underline"
                  >
                    Weiterlesen <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-20 flex justify-center space-x-4">
          <button className="w-12 h-12 rounded-full border border-orthodox-gold text-orthodox-gold flex items-center justify-center font-bold hover:bg-orthodox-gold hover:text-white transition-all">1</button>
          <button className="w-12 h-12 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center font-bold hover:border-orthodox-gold hover:text-orthodox-gold transition-all">2</button>
          <button className="w-12 h-12 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center font-bold hover:border-orthodox-gold hover:text-orthodox-gold transition-all">3</button>
        </div>
      </section>
    </div>
  );
};

export default News;
