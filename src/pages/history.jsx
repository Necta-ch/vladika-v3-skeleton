import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

export default function HistoryPage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('uvod');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const sections = [
    { id: 'uvod', title: t('history.sec1_title', 'Уједињење Покрајинских цркава') },
    { id: 'predratni', title: t('history.sec2_title', 'Предратни период') },
    { id: 'zapadna-evropa', title: t('history.sec3_title', 'Западноевропска епархија') },
    { id: 'arondacije', title: t('history.sec4_title', 'Арондације 1990-2011') },
    { id: 'italija', title: t('history.sec5_title', 'Историја у Италији') },
    { id: 'svajcarska', title: t('history.sec6_title', 'Историја у Швајцарској') },
    { id: 'malta', title: t('history.sec7_title', 'Историја на Малти') },
  ];

  return (
    <>

      <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-orthodox-gold selection:text-white">
        
        {/* Cinematic Hero */}
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 overflow-hidden bg-[#6b151b]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#6b151b] via-[#6b151b]/80 to-transparent"></div>
          </div>
          <div className="container-custom relative z-10 text-center text-white">
            <motion.span 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-6 block"
            >
              {t("history.subtitle", "Српска Православна Црква")}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8"
            >
              {t("history.title", "Историјат Епархије")}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto w-24 h-1 bg-[#D4AF37]"
            ></motion.div>
          </div>
        </section>

        {/* Two-Column Layout */}
        <div className="container-custom py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Table of Contents Sidebar */}
            <div className="hidden lg:block lg:col-span-3 sticky top-32">
              <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100">
                <h3 className="text-xl font-serif text-gray-900 mb-6 pb-4 border-b border-gray-100">{t("history.toc", "Садржај")}</h3>
                <nav className="space-y-4">
                  {sections.map((section) => (
                    <a 
                      key={section.id} 
                      href={`#${section.id}`}
                      className={`block text-sm font-medium transition-colors ${activeSection === section.id ? 'text-[#6b151b] font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Historic Content Document */}
            <div className="lg:col-span-9 bg-white p-8 md:p-16 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-50 text-gray-800 font-serif leading-relaxed md:text-lg">
              
              <section id="uvod" className="mb-20 scroll-mt-32">
                <h2 className="text-4xl text-[#6b151b] font-bold mb-10 tracking-tight">{t("history.sec1_title", "Увод – Уједињење Покрајинских цркава")}</h2>
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 text-justify">
                  <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-orthodox-gold first-letter:mr-3 first-letter:float-left">
                    {t("history.sec1_p1", "Српску православну цркву, чију је аутокефалност издејствовао Свети Сава 1219. године и тад постао њен први архиепископ, цар Душан је 1346. подигао на степен Патријаршије.")}
                  </p>
                  <p className="mt-6">
                    {t("history.sec1_p2", "Али после пропасти српске државе 1459, Српска патријаршија престала је да постоји, а црква је потпала под јурисдикцију охридске архиепископије. Васпостављање Српске патријаршије извршено је 1557... све до завршетка Првог светског рата.")}
                  </p>
                </div>
              </section>

              <hr className="border-gray-100 my-16" />

              <section id="predratni" className="mb-20 scroll-mt-32">
                <h2 className="text-4xl text-[#6b151b] font-bold mb-10 tracking-tight">{t("history.sec2_title", "Предратни период")}</h2>
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 text-justify">
                  <p>
                    {t("history.sec2_p1", "Историјска ситуација у погледу постојања и јуриздикције уједињене Српске патријаршије од 1921. до 1945. остала је непромењена, осим што је 1926. године основана Епархија за Америку и Канаду...")}
                  </p>
                </div>
              </section>

              <hr className="border-gray-100 my-16" />

               <section id="zapadna-evropa" className="mb-20 scroll-mt-32">
                <h2 className="text-4xl text-[#6b151b] font-bold mb-10 tracking-tight">{t("history.sec3_title", "Западноевропска епархија")}</h2>
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 text-justify">
                  <p>
                    {t("history.sec3_p1", "Након капитулације сила Осовине, Срби који су били у нацистичким логорима... остајали су и започињали живот у новој средини.")}
                  </p>
                </div>
              </section>

              <hr className="border-gray-100 my-16" />
              
              <section id="arondacije" className="mb-20 scroll-mt-32">
                <h2 className="text-4xl text-[#6b151b] font-bold mb-10 tracking-tight">{t("history.sec4_title", "Арондације 1990-2011")}</h2>
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 text-justify">
                  <p>
                    {t("history.sec4_p1", "Епархија западноевропска је 1990. године подељена на Епархију средњоевропску са седиштем у Химелстиру у чији састав улази Немачка, Аустрија, Швајцарска, Шпанија и Италија...")}
                  </p>
                  <div className="my-10 p-8 border-l-4 border-orthodox-gold bg-[#f8f9fa] shadow-sm italic text-xl md:text-2xl text-gray-800 leading-snug font-serif">
                    {t("history.sec4_quote", "На редовном заседању Светог Архијерејског Сабора Српске Православне Цркве 2024. године донета је одлука о подели дотадашње Епархије аустријско-швајцарске на Епархију аустријску... и на Епархију швајцарску (која обухвата парохије у Швајцарској, Италији и на Малти).")}
                  </div>
                </div>
              </section>

              <hr className="border-gray-100 my-16" />
              
              <section id="italija" className="mb-20 scroll-mt-32">
                <h2 className="text-4xl text-[#6b151b] font-bold mb-10 tracking-tight">{t("history.sec5_title", "Историја Српске цркве у Италији")}</h2>
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 text-justify">
                  <p>
                    {t("history.sec5_p1", "Укупан национални и црквени живот Срба у Италији повезан је са градом Трстом. Својим патентима из 1717. и 1719. године аустријски цар Карло VI прогласио је Трст слободном луком...")}
                  </p>
                </div>
              </section>

              <hr className="border-gray-100 my-16" />
              
              <section id="svajcarska" className="mb-20 scroll-mt-32">
                <h2 className="text-4xl text-[#6b151b] font-bold mb-10 tracking-tight">{t("history.sec6_title", "Историја Српске цркве у Швајцарској")}</h2>
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 text-justify">
                  <p>
                    {t("history.sec6_p1", "Срби су почели да се досељавају у Швајцарску и у Берн средином деветнаестог века. Између 1863. и 1914. студирало је у Берну и Цириху преко 180 студената...")}
                  </p>
                </div>
              </section>

              <hr className="border-gray-100 my-16" />
              
              <section id="malta" className="mb-20 scroll-mt-32">
                <h2 className="text-4xl text-[#6b151b] font-bold mb-10 tracking-tight">{t("history.sec7_title", "Историја Српске цркве на Малти")}</h2>
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 text-justify">
                  <p>
                    {t("history.sec7_p1", "Почеци окупљања Срба на Малти могли би бити смештени у прву деценију XXI века...")}
                  </p>
                </div>
              </section>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
