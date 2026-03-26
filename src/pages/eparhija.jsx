import { useTranslation } from "react-i18next";
import { Map } from "lucide-react";

const Eparhija = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="min-h-screen bg-[#Fdfdfd] pt-[138px]">
        
        {/* Page Header */}
        <section className="bg-[#6b151b] text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 drop-shadow-md">
              {t("eparchy.page_title", "О Епархији швајцарској")}
            </h1>
            <div className="w-16 h-1 bg-orthodox-gold mx-auto mb-6"></div>
            <p className="text-sm md:text-base font-sans uppercase tracking-[0.2em] text-orthodox-gold font-bold">
              {t("home.subtitle", "Српска Православна Црква")}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              
              {/* Text Body */}
              <div className="lg:col-span-7">
                <div className="flex flex-col space-y-10 font-serif text-gray-800 text-lg md:text-xl leading-[1.8]">
                  
                  {/* Lead Paragraph with Drop Cap */}
                  <div className="relative">
                    {(() => {
                      const fullText = t("eparchy.section1_text", "Швајцарска епархија Српске православне цркве основана је одлуком Светог архијерејског Сабора у мају 2024. године.");
                      const firstChar = fullText.charAt(0);
                      const restText = fullText.slice(1);
                      return (
                        <p>
                          <span className="float-left text-7xl font-serif text-[#6b151b] pr-4 mt-2 leading-none">{firstChar}</span>
                          {restText}
                        </p>
                      );
                    })()}
                  </div>

                  {/* Section: Switzerland */}
                  <div>
                    <h3 className="text-3xl font-serif text-[#6b151b] mb-4">{t("eparchy.sec_ch_title", "Центар духовности у Швајцарској")}</h3>
                    <p>
                      {t("eparchy.sec_ch_text", "Седиште Епархије налази се при Саборном храму Свете Тројице у Цириху, који је већ дуги низ година централно место окупљања Срба православне вероисповести у Швајцарској. Осим Цириха, значајни духовни центри у Швајцарској укључују парохије у Базелу, Берну, Женеви, Лозани, Луцерну, Белинцони, Санкт Галену и Мелсу, које заједно чине јаку и разнолику православну заједницу широм земље.")}
                    </p>
                  </div>

                  {/* Section: Italy */}
                  <div>
                    <h3 className="text-3xl font-serif text-[#6b151b] mb-4">{t("eparchy.sec_it_title", "Наслеђе у Северној Италији")}</h3>
                    <p>
                      {t("eparchy.sec_it_text", "Епархија се такође протеже на неколико значајних градова у северној Италији, где постоји вишедеценијска традиција Српске православне цркве. Градови попут Трста, Вићенце, Удина, Рима и Милана представљају важне духовне центре за Србе који живе и раде у Италији.")}
                    </p>
                  </div>

                  {/* Section: Malta */}
                  <div>
                    <h3 className="text-3xl font-serif text-[#6b151b] mb-4">{t("eparchy.sec_ma_title", "Медитерански регион и Малта")}</h3>
                    <p>
                      {t("eparchy.sec_ma_text", "Посебно значајна је и парохија на Малти, која је део Епархије швајцарске, проширујући њен утицај и на овај медитерански острвски регион.")}
                    </p>
                  </div>

                  {/* Conclusion Box */}
                  <div className="p-8 bg-gray-50 border-l-[6px] border-orthodox-gold shadow-sm mt-8">
                    <p className="font-sans italic text-gray-700 text-base leading-relaxed">
                      {t("eparchy.quote", "Оснивање Швајцарске епархије представља важан корак у развоју Српске православне цркве на Западу, омогућавајући бољу организацију и већу пажњу заједницама које су до сада биле део шире, географски раширене епархије.")}
                    </p>
                  </div>

                </div>
              </div>

              {/* Sticky Sidebar with Map */}
              <div className="lg:col-span-5 relative group lg:sticky lg:top-40 mt-12 lg:mt-0">
                {/* Ultra-Modern Minimalist Frame */}
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 p-2 relative overflow-hidden">
                  
                  {/* Title Overlay */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-100 shadow-sm z-20 flex items-center">
                    <Map size={16} className="text-gray-900 mr-2" />
                    <span className="text-xs font-sans font-bold uppercase tracking-[0.15em] text-gray-900">
                      {t("eparchy.subtitle", "Територија Епархије")}
                    </span>
                  </div>

                  {/* The Map Image - Pure Modern Grayscale */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAFAFA]">
                    <img 
                      src="/img/eparchy-map.png" 
                      alt="Карта Швајцарске, Италије и Малте" 
                      className="w-full h-full object-cover grayscale contrast-125 brightness-110 opacity-70 group-hover:scale-105 transition-transform duration-1000"
                    />
                    {/* Sleek Gradient Overlay to blend sharp edges and remove any residual color */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
                    <div className="absolute inset-0 mix-blend-color bg-gray-400 opacity-50"></div>
                  </div>
                  
                  <div className="mt-2 p-6 text-center bg-white z-20 relative">
                    <p className="font-sans text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">
                      {t("eparchy.list_item1", "Швајцарска")} <span className="mx-2 text-gray-200">|</span> {t("eparchy.list_item2", "Италија")} <span className="mx-2 text-gray-200">|</span> {t("eparchy.list_item3", "Малта")}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Eparhija;
