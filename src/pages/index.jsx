import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const heroSlides = [
  { image: "/img/hero-interior.png", position: "center" },
  { image: "/img/orthodox-church-bg.jpg", position: "center" },
  { image: "/img/hero-exterior.png", position: "center top" },
];

// News items with dates (linking to Facebook - since content comes from FB)
const newsItems = [
  { id: 1, date: "24/3", year: "2026", image: "/img/image5.jpeg", title: "news_1" },
  { id: 2, date: "21/3", year: "2026", image: "/img/image13.jpeg", title: "news_2" },
  { id: 3, date: "18/3", year: "2026", image: "/img/image8.jpeg", title: "news_3" },
  { id: 4, date: "15/3", year: "2026", image: "/img/image9.jpeg", title: "news_4" },
  { id: 5, date: "12/3", year: "2026", image: "/img/image12.jpeg", title: "news_5" },
];

const Home = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [adminPosts, setAdminPosts] = useState([]);

  // Load admin-created posts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vladika_posts');
    if (saved) setAdminPosts(JSON.parse(saved));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ===== CINEMATIC HERO SLIDER ===== */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{ 
                backgroundImage: `url('${heroSlides[current].image}')`,
                backgroundPosition: heroSlides[current].position
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Text — Right Aligned like reference */}
        <div className="absolute inset-0 flex items-center justify-end z-10">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-right max-w-2xl ml-auto"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[1.05] mb-8 drop-shadow-lg">
                {t("home.title", "Епархија швајцарска")}
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-sans font-light leading-relaxed mb-10 max-w-xl ml-auto">
                {t("home.welcome", "Добродошли на званичну презентацију новоосноване Епархије швајцарске.")}
              </p>
              <Link 
                href="/history"
                className="inline-flex items-center border border-white/50 text-white px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-gray-900 transition-all duration-500"
              >
                {t("home.read_more", "ОПШИРНИЈЕ")}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-6">
          <button onClick={prevSlide} className="w-10 h-10 flex items-center justify-center border border-white/30 text-white/70 hover:text-white hover:border-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex space-x-2">
            {heroSlides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${i === current ? "bg-white w-8" : "bg-white/40"}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="w-10 h-10 flex items-center justify-center border border-white/30 text-white/70 hover:text-white hover:border-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* "БЕСЕДЕ ЕПИСКОПА" Gold Bar — like reference */}
        <div className="absolute bottom-0 right-0 z-20 hidden md:block">
          <Link 
            href="/bishop" 
            className="flex items-center bg-orthodox-gold text-white px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase font-bold hover:bg-orthodox-brown transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {t("home.bishop_read", "Прочитајте Биографију")}
          </Link>
        </div>
      </section>

      {/* ===== NEWS FEED SECTION ===== */}
      <section className="py-16 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
              {t("home.news_title", "Епархијске Вести")}
            </h2>
            <a 
              href="https://www.facebook.com/EpiskopAndrejCilerdzic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orthodox-gold font-sans text-xs tracking-[0.15em] uppercase font-bold hover:text-orthodox-brown transition-colors flex items-center"
            >
              {t("home.fb_page", "Званична Страница")}
              <ChevronRight size={14} className="ml-1" />
            </a>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {newsItems.map((item) => (
              <a 
                key={item.id}
                href="https://www.facebook.com/EpiskopAndrejCilerdzic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Date Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-white leading-none drop-shadow-lg">
                    {item.date}
                  </div>
                  <div className="text-[10px] font-sans text-white/60 tracking-wider mt-1">
                    {item.year}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 border border-white/50 flex items-center justify-center">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BISHOP SECTION + FACEBOOK ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Bishop Promo Card */}
            <div className="lg:col-span-7">
              <Link href="/bishop" className="group block relative overflow-hidden h-full min-h-[400px]">
                <div className="absolute inset-0 bg-[url('/img/bishop-portrait-real.jpeg')] bg-cover bg-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-orthodox-brown/90 via-orthodox-brown/60 to-transparent" />
                <div className="relative z-10 p-10 md:p-16 flex flex-col justify-end h-full text-white">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-orthodox-gold mb-4">
                    {t("bishop.title", "Епископ швајцарски")}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif mb-4 group-hover:text-orthodox-gold transition-colors duration-500">
                    {t("bishop.subtitle", "Његово Преосвештенство Епископ Г. Андреј")}
                  </h3>
                  <div className="inline-flex items-center text-orthodox-gold font-sans text-xs tracking-[0.15em] uppercase font-bold mt-4">
                    {t("home.bishop_read", "Прочитајте Биографију")}
                    <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Facebook Sidebar */}
            <div className="lg:col-span-5">
              <div className="mb-6">
                <h2 className="text-2xl font-serif text-gray-900 mb-1">
                  {t("home.social_title", "Пратите нас")}
                </h2>
                <div className="w-12 h-[2px] bg-orthodox-gold"></div>
              </div>
              
              <div className="bg-white border border-gray-100 shadow-sm p-3 w-full flex justify-center overflow-hidden">
                <iframe 
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FEpiskopAndrejCilerdzic&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true" 
                  width="340" 
                  height="500" 
                  style={{ border: 'none', overflow: 'hidden', width: '100%', maxWidth: '340px' }} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  title="Facebook Feed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
