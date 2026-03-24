import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Users, Clock } from 'lucide-react';
import { useTranslation } from "react-i18next";

const parishes = [
  {
    id: 'vicenca',
    country: 'italy',
    city: 'Вићенца',
    parish: 'Парохија Светог Луке',
    address: 'Contrada della Misericordia 20, 36100 Vicenza',
    priests: [{ name: 'протојереј Далибор Ђукић', phone: '+39 380 434 07 76', email: 'dalibor_djukic@hotmail.com' }],
    liturgyTime: 'Недеља и празници 09:00',
    image: '/img/image1.jpeg'
  },
  {
    id: 'rim',
    country: 'italy',
    city: 'Рим',
    parish: 'Мисионарска Парохија Светог Саве у Риму',
    address: 'Chiesa San Filippo Neri all’Esquilino, Via Sforza 16, Roma, Italie',
    priests: [{ name: 'протојереј Роман Фишер', phone: '+43 664 731 83 099', email: 'roman.f58@proton.me' }],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image2.jpeg'
  },
  {
    id: 'trst',
    country: 'italy',
    city: 'Трст',
    parish: 'Црквена општина у Трсту - Храм Светог Спиридона',
    address: 'Via Genova 12, 34121 Trieste',
    website: 'www.comunitaserba.org',
    priests: [
      { name: 'протојереј-ставрофор Рашко Радовић', phone: '+39 340 468 47 38' },
      { name: 'ђакон Миле Марковић', phone: '+39 371 367 1139' }
    ],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image3.jpeg'
  },
  {
    id: 'udine',
    country: 'italy',
    city: 'Удине',
    parish: 'Парохија Светог краља Стефана Новог (Бранковића)',
    address: 'Chiesa della Pietà, Piazza Cella, 33100 Udine',
    priests: [{ name: 'јереј др Душан Ђукановић', phone: '+39 342 795 88 64' }],
    liturgyTime: 'Недеља 10:00',
    note: 'Црква у Тревизу (Chiesa di San Luca) и Порћији.',
    image: '/img/image4.jpeg'
  },
  {
    id: 'milano',
    country: 'italy',
    city: 'Милано',
    parish: 'Парохија светог краља Стефана Првовенчаног',
    address: 'Carate Brianza, Via Alessandro Volta 2',
    priests: [{ name: 'јереј Ивица Ђулић', phone: '+39 380 654 10 53', email: 'ivicadjulic@yahoo.com' }],
    liturgyTime: 'Недеља 10:00',
  },
  {
    id: 'malta',
    country: 'malta', 
    city: 'Малта',
    parish: 'Парохија светог апостола Павла и светог Николе',
    address: 'Chapel of Our Lady of Carmel, 432 Triq San Pawl',
    priests: [{ name: 'јереј Ристо Горанчић', phone: '+35 677 005 789' }],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image5.jpeg'
  },
  {
    id: 'bazel',
    country: 'switzerland',
    city: 'Базел',
    parish: 'Парохија свих светих',
    address: 'Kirche zu St. Alban, Mühlenberg 5, 4051 Basel',
    website: 'www.spc-basel.ch',
    priests: [{ name: 'протојереј-ставрофор Милутин Николић', phone: '+41 61 272 08 68' }],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image8.jpeg'
  },
  {
    id: 'bern',
    country: 'switzerland',
    city: 'Берн',
    parish: 'Храм Светих Кирила и Методија',
    address: 'Aemmenmattstrasse 12, 3123 Belp',
    website: 'www.spcobern.ch',
    priests: [{ name: 'протојереј-ставрофор Станко Марковић', phone: '+41 76 579 10 33' }],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image9.jpeg'
  },
  {
    id: 'lozana',
    country: 'switzerland',
    city: 'Лозана',
    parish: 'Парохија Света Три Јерарха',
    address: 'Route de Berne 230, 1066 Epalinges',
    website: 'www.spco-lausanne.org',
    priests: [
      { name: 'протојереј Богољуб Поповић', phone: '+41 79 793 74 32' },
      { name: 'протојереј-ставрофор Франсоа Меан', other: 'Франкофонска парохија' }
    ],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image10.jpeg'
  },
  {
    id: 'zeneva',
    country: 'switzerland',
    city: 'Женева',
    parish: 'Парохија Светог апостола Андреја Првозваног',
    address: 'Temple de Chancy, route de Bellegarde 69, 1284 Chancy',
    website: 'www.spczeneva.com',
    priests: [{ name: 'јереј Иван Толић', phone: '+41 76 222 37 31', email: 'parohijazeneva@gmail.com' }],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image11.tiff'
  },
  {
    id: 'ticino',
    country: 'switzerland',
    city: 'Тићино',
    parish: 'Парохија Сабора Српских Светитеља',
    address: 'Chiesa San Giovanni, via San Giovanni 7, 6500 Bellinzona',
    website: 'www.spc-ticino.ch',
    priests: [{ name: 'јереј Марко Кнежевић', phone: '+41 76 479 97 89' }],
    liturgyTime: 'Недеља 10:00',
  },
  {
    id: 'lucern',
    country: 'switzerland',
    city: 'Луцерн',
    parish: 'Парохија Рођења Пресвете Богородице',
    address: 'Dorfstrasse 2, 6035 Perlen',
    website: 'www.spcoluzern.ch',
    priests: [{ name: 'протојереј Драган Станојевић', phone: '+41 76 587 00 11', email: 'otacdragan@spcoluzern.ch' }],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image12.jpeg'
  },
  {
    id: 'cirih',
    country: 'switzerland',
    city: 'Цирих',
    parish: 'Храм Свете Тројице & Храм Успења',
    address: 'Elisabethenstrasse 20, 8004 Zürich',
    website: 'www.crkva.ch',
    priests: [
      { name: 'протојереј Бранимир Петковић', phone: '+41 76 562 94 44', email: 'o.branimir@spc-zh.ch' },
      { name: 'протојереј Ђорђе Лукић', phone: '+41 76 489 97 89', email: 'o.djordje@spc-zh.ch' },
      { name: 'протојереј Александар Ресимић', email: 'o.aleksandar@spc-zh.ch' },
      { name: 'протојереј-ставрофор др Мирослав Симијоновић', email: 'o.miroslav@spc-zh.ch' }
    ],
    liturgyTime: 'Недеља 09:30',
    image: '/img/image13.jpeg'
  },
  {
    id: 'sankt-galen',
    country: 'switzerland',
    city: 'Санкт Гален',
    parish: 'Храм предобног Симона Монаха',
    address: 'Langgasse 161, 9008 St. Gallen',
    website: 'www.spc-sg.ch',
    priests: [
      { name: 'протојереј Бране Сарић', phone: '+41 79 546 10 83', email: 'o.brane@spc-sg.ch' },
      { name: 'јереј Миладин Вујковић', phone: '+41 79 850 98 86', email: 'o.miladin@spc-sg.ch' }
    ],
    liturgyTime: 'Недеља 10:00',
  },
  {
    id: 'mels',
    country: 'switzerland',
    city: 'Мелс',
    parish: 'Парохија Светог владике Николаја Жичког',
    address: 'Kapuzinerkloster, Klosterweg 6, 8887 Mels SG',
    website: 'www.spc-gr.ch',
    priests: [{ name: 'јереј Ненад Бркић', phone: '+41 76 580 01 28', email: 'o.nenad@spc-gr.ch' }],
    liturgyTime: 'Недеља 10:00',
    image: '/img/image14.jpeg'
  }
];

export default function SematizamPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const filteredParishes = parishes.filter((p) => {
    if (filter === 'all') return true;
    return p.country === filter;
  });

  return (
    <>
      <Head>
        <title>{t("directory.title", "Све Цркве")} | Епархија швајцарска</title>
      </Head>

      <div className="min-h-screen bg-[#FDFBF7] font-sans">
        
        {/* Banner */}
        <div className="bg-[#6b151b] pt-40 pb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] bg-center bg-cover opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 container-custom">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{t("directory.title", "Све Цркве Епархије")}</h1>
            <p className="text-[#D4AF37] tracking-[0.2em] text-sm uppercase font-bold">{t("directory.subtitle", "Активне парохије и црквене општине")}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="container-custom py-12 border-b border-gray-200">
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'switzerland', 'italy', 'malta'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-8 py-3 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                  filter === type 
                    ? 'bg-[#6b151b] text-white shadow-lg scale-105' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-orthodox-gold hover:text-[#6b151b]'
                }`}
              >
                {type === 'all' ? t("directory.filter_all", "Све Локације") 
                  : type === 'switzerland' ? t("directory.filter_ch", "Швајцарска") 
                  : type === 'italy' ? t("directory.filter_it", "Италија") 
                  : t("directory.filter_ma", "Малта")}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="container-custom py-20">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredParishes.map((parish) => (
                <motion.div
                  key={parish.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col group hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                >
                  {/* Parish Default Image or Fallback Header */}
                  {parish.image ? (
                    <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img src={parish.image} alt={parish.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute bottom-4 left-6 z-20 text-white font-serif text-2xl drop-shadow-md">
                        {parish.city}
                      </div>
                    </div>
                  ) : (
                    <div className="h-24 w-full bg-[#6b151b] relative px-6 py-4 flex items-end">
                      <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                      <div className="font-serif text-white text-2xl relative z-10">{parish.city}</div>
                    </div>
                  )}

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{parish.parish}</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-orthodox-gold mt-0.5 shrink-0" />
                        <span className="text-sm leading-relaxed">{parish.address}</span>
                      </div>
                      
                      {parish.website && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <Globe className="w-5 h-5 text-orthodox-gold shrink-0" />
                          <a href={`http://${parish.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#6b151b] font-medium transition-colors">{parish.website}</a>
                        </div>
                      )}
                    </div>

                    {/* Service Times */}
                    {parish.liturgyTime && (
                      <div className="flex items-center gap-3 bg-orthodox-gold/5 rounded-lg px-4 py-3 border border-orthodox-gold/10">
                        <Clock className="w-5 h-5 text-orthodox-gold shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-orthodox-gold block">{t("directory.service_time", "Св. Литургија")}</span>
                          <span className="text-sm font-semibold text-gray-900">{parish.liturgyTime}</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#6b151b] mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4" /> {t("directory.priests", "Свештенство")}
                      </div>
                      <ul className="space-y-3">
                        {parish.priests.map((priest, index) => (
                          <li key={index} className="flex flex-col text-sm bg-gray-50 border border-gray-100 rounded-lg p-3">
                            <span className="block font-medium text-gray-900 mb-2">{priest.name}</span>
                            <div className="flex flex-wrap gap-4 mt-auto">
                              {priest.phone && (
                                <a href={`tel:${priest.phone.replace(/[\s()]/g, '')}`} className="flex items-center gap-1.5 text-gray-500 hover:text-[#6b151b] transition-colors" title={`${t("directory.call", "Позови")} ${priest.phone}`}>
                                  <Phone className="w-4 h-4 text-orthodox-gold" />
                                  <span className="text-[11px] font-semibold uppercase tracking-wider">{t("directory.call", "Позови")}</span>
                                </a>
                              )}
                              {priest.email && (
                                <a href={`mailto:${priest.email}`} className="flex items-center gap-1.5 text-gray-500 hover:text-[#6b151b] transition-colors" title={`${t("directory.email", "Емаил")}: ${priest.email}`}>
                                  <Mail className="w-4 h-4 text-orthodox-gold" />
                                  <span className="text-[11px] font-semibold uppercase tracking-wider">{t("directory.email", "Емаил")}</span>
                                </a>
                              )}
                              {priest.other && (
                                <span className="text-gray-400 text-xs italic">{priest.other}</span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
