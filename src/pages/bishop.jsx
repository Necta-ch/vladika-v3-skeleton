import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Bishop = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="pt-32 pb-16 lg:pt-48 lg:pb-24 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orthodox-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="h-[1px] w-12 bg-orthodox-gold"></div>
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-gray-400">
                {t("bishop.title", "Епископ швајцарски")}
              </span>
              <div className="h-[1px] w-12 bg-orthodox-gold"></div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 mb-6 tracking-tight leading-none">
              {t("bishop.subtitle", "Његово Преосвештенство Епископ Г. Андреј")}
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Main Editorial Journey */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 relative group lg:sticky lg:top-32">
            <div className="absolute inset-0 bg-orthodox-gold translate-x-4 translate-y-4 rounded-xl -z-10 opacity-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-500"></div>
            <div className="aspect-[3/4] bg-[#f8f9fa] rounded-xl overflow-hidden relative border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
              <div className="w-full h-full bg-[url('/img/bishop-portrait-real.jpeg')] bg-cover bg-center grayscale-[15%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-px bg-gray-100 mt-12 rounded-xl overflow-hidden border border-gray-100 text-center">
              <div className="bg-white p-6">
                <div className="text-2xl font-serif text-gray-900 mb-1">{t("bishop.year", "2024")}</div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400">{t("bishop.year_label", "Епархија швајцарска")}</div>
              </div>
              <div className="bg-white p-6">
                <div className="text-2xl font-serif text-gray-900 mb-1">{t("bishop.city", "Цирих")}</div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400">{t("bishop.city_label", "Седиште")}</div>
              </div>
            </div>
          </div>

          {/* Right Scrolling Column */}
          <div className="lg:col-span-7 lg:pl-10 text-gray-900 font-serif">
            
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed mb-24 font-serif text-justify">
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-orthodox-gold first-letter:mr-3 first-letter:float-left">
                {t("bishop.p1", "Епископ швајцарски Господин Андреј (Ћилерџић) рођен је 21. 8. 1961. у Оснабрику (СР Немачка), као други син протојереја-ставрофора Добривоја Ћилерџића и мајке Маријане.")}
              </p>
              <p className="mt-6">
                {t("bishop.p2", "Основну школу и гимназију завршио је у Диселдорфу (СР Немачка)...")}
              </p>
              <p className="mt-6">
                {t("bishop.p3", "У манастиру Високим Дечанима, 7. јануара 1987, замонашио га је његов духовник...")}
              </p>
              <p className="mt-6">
                {t("bishop.p4", "За време несрећног грађанског рата у бившој Југославији, од 1992. до 1995, и 1999. године, био је познат у народу као духовник ратној сирочади, ратним инвалидима и избеглицама које је прихватао и збрињавао.")}
              </p>
              
              <div className="my-12 p-8 border-l-4 border-orthodox-gold bg-[#f8f9fa] shadow-sm italic text-xl md:text-2xl text-gray-800 leading-snug font-serif">
                {t("bishop.quote", "Током свог дугог служења у Српској Православној Цркви, учествовао је на многим међуцрквеним и међународним конференцијама... Члан је више европских мировних иницијатива и удружења...")}
              </div>

              <div className="mt-12 bg-gray-50 p-8 pt-6 rounded-xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-4">
                <p className="font-bold text-[#6b151b] text-xl md:text-2xl">
                  {t("bishop.box1", "На редовном заседању Светог архијерејског Сабора одржаном од 14. до 24. маја 2014. године, изабран је за првог Епископа новоосноване Епархије аустријско-швајцарске са седиштем у Бечу.")}
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent my-4"></div>
                <p className="font-bold text-gray-900 text-2xl md:text-3xl tracking-tight">
                  {t("bishop.box2", "На Светом архијерејском Сабору у мају 2024. године изабран је за епископа швајцарског.")}
                </p>
              </div>
            </div>

            {/* Elegant Quote Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="px-10 py-16 bg-[#FDFBF7] rounded-2xl relative border border-orthodox-gold/20 mb-24 text-center"
            >
              <Quote className="mx-auto text-orthodox-gold mb-8 opacity-40" size={48} />
              <p className="text-2xl md:text-3xl font-serif text-gray-900 italic leading-snug">
                {t("bishop.inspirational_quote")}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center">
                <div className="h-[2px] w-12 bg-orthodox-gold mb-4"></div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400">{t("bishop.quote_attribution")}</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Bishop;
