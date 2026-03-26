import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Users, Clock } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useLocalized } from '../utils/localeHelper';

const parishes = [
  {
    id: 'vicenca',
    country: 'italy',
    city: { sr: 'Вићенца', de: 'Vicenza', it: 'Vicenza', 'sr-latin': 'Vićenca' },
    parish: { sr: 'Парохија Светог Луке', de: 'Gemeinde Hl. Lukas', it: 'Parrocchia di San Luca', 'sr-latin': 'Parohija Svetog Luke' },
    address: 'Contrada della Misericordia 20, 36100 Vicenza',
    priests: [{ name: { sr: 'протојереј Далибор Ђукић', de: 'Erzpriester Dalibor Đukić', it: 'protopresbitero Dalibor Đukić', 'sr-latin': 'protojerej Dalibor Đukić' }, phone: '+39 380 434 07 76', email: 'dalibor_djukic@hotmail.com' }],
    liturgyTime: { sr: 'Недеља и празници 09:00', de: 'Sonn- und Feiertage 09:00', it: 'Domenica e festivi 09:00', 'sr-latin': 'Nedelja i praznici 09:00' },
    image: '/img/image1.jpeg'
  },
  {
    id: 'rim',
    country: 'italy',
    city: { sr: 'Рим', de: 'Rom', it: 'Roma', 'sr-latin': 'Rim' },
    parish: { sr: 'Мисионарска Парохија Светог Саве у Риму', de: 'Missionspfarrei des Hl. Sava in Rom', it: 'Parrocchia Missionaria di San Sava a Roma', 'sr-latin': 'Misionarska Parohija Svetog Save u Rimu' },
    address: 'Chiesa San Filippo Neri all\'Esquilino, Via Sforza 16, Roma, Italie',
    priests: [{ name: { sr: 'протојереј Роман Фишер', de: 'Erzpriester Roman Fischer', it: 'protopresbitero Roman Fischer', 'sr-latin': 'protojerej Roman Fišer' }, phone: '+43 664 731 83 099', email: 'roman.f58@proton.me' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/image2.jpeg'
  },
  {
    id: 'trst',
    country: 'italy',
    city: { sr: 'Трст', de: 'Triest', it: 'Trieste', 'sr-latin': 'Trst' },
    parish: { sr: 'Црквена општина у Трсту - Храм Светог Спиридона', de: 'Kirchengemeinde in Triest – Hl. Spiridon', it: 'Comunità ecclesiale a Trieste – Chiesa di San Spiridone', 'sr-latin': 'Crkvena opština u Trstu - Hram Svetog Spiridona' },
    address: 'Via Genova 12, 34121 Trieste',
    website: 'www.comunitaserba.org',
    priests: [
      { name: { sr: 'протојереј-ставрофор Рашко Радовић', de: 'Erzpriester-Stavrophor Raško Radović', it: 'protopresbitero-stavroforo Raško Radović', 'sr-latin': 'protojerej-stavrofor Raško Radović' }, phone: '+39 340 468 47 38' },
      { name: { sr: 'ђакон Миле Марковић', de: 'Diakon Mile Marković', it: 'diacono Mile Marković', 'sr-latin': 'đakon Mile Marković' }, phone: '+39 371 367 1139' }
    ],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/trieste-spiridone.jpg'
  },
  {
    id: 'udine',
    country: 'italy',
    city: { sr: 'Удине', de: 'Udine', it: 'Udine', 'sr-latin': 'Udine' },
    parish: { sr: 'Парохија Светог краља Стефана Новог (Бранковића)', de: 'Gemeinde Hl. König Stefan der Neue (Branković)', it: 'Parrocchia di Santo Stefano il Nuovo (Branković)', 'sr-latin': 'Parohija Svetog kralja Stefana Novog (Brankovića)' },
    address: 'Chiesa della Pietà, Piazza Cella, 33100 Udine',
    priests: [{ name: { sr: 'јереј др Душан Ђукановић', de: 'Priester Dr. Dušan Đukanović', it: 'presbitero dott. Dušan Đukanović', 'sr-latin': 'jerej dr Dušan Đukanović' }, phone: '+39 342 795 88 64' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    note: { sr: 'Црква у Тревизу (Chiesa di San Luca) и Порћији.', de: 'Kirche in Treviso (Chiesa di San Luca) und Porcia.', it: 'Chiesa a Treviso (Chiesa di San Luca) e Porcia.', 'sr-latin': 'Crkva u Trevizu (Chiesa di San Luca) i Porćiji.' },
    image: '/img/image4.jpeg'
  },
  {
    id: 'milano',
    country: 'italy',
    city: { sr: 'Милано', de: 'Mailand', it: 'Milano', 'sr-latin': 'Milano' },
    parish: { sr: 'Парохија светог краља Стефана Првовенчаног', de: 'Gemeinde Hl. König Stefan der Erstgekrönte', it: 'Parrocchia di Santo Stefano il Primo Incoronato', 'sr-latin': 'Parohija svetog kralja Stefana Prvovenčanog' },
    address: 'Carate Brianza, Via Alessandro Volta 2',
    priests: [{ name: { sr: 'јереј Ивица Ђулић', de: 'Priester Ivica Đulić', it: 'presbitero Ivica Đulić', 'sr-latin': 'jerej Ivica Đulić' }, phone: '+39 380 654 10 53', email: 'ivicadjulic@yahoo.com' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/milano-church.jpg'
  },
  {
    id: 'malta',
    country: 'malta', 
    city: { sr: 'Малта', de: 'Malta', it: 'Malta', 'sr-latin': 'Malta' },
    parish: { sr: 'Парохија светог апостола Павла и светог Николе', de: 'Gemeinde Hl. Apostel Paulus und Hl. Nikolaus', it: 'Parrocchia dei Santi Apostolo Paolo e San Nicola', 'sr-latin': 'Parohija svetog apostola Pavla i svetog Nikole' },
    address: 'Chapel of Our Lady of Carmel, 432 Triq San Pawl',
    priests: [{ name: { sr: 'јереј Ристо Горанчић', de: 'Priester Risto Gorančić', it: 'presbitero Risto Gorančić', 'sr-latin': 'jerej Risto Gorančić' }, phone: '+35 677 005 789' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/image5.jpeg'
  },
  {
    id: 'bazel',
    country: 'switzerland',
    city: { sr: 'Базел', de: 'Basel', it: 'Basilea', 'sr-latin': 'Bazel' },
    parish: { sr: 'Парохија свих светих', de: 'Allerheiligengemeinde', it: 'Parrocchia di Tutti i Santi', 'sr-latin': 'Parohija svih svetih' },
    address: 'Kirche zu St. Alban, Mühlenberg 5, 4051 Basel',
    website: 'www.spc-basel.ch',
    priests: [{ name: { sr: 'протојереј-ставрофор Милутин Николић', de: 'Erzpriester-Stavrophor Milutin Nikolić', it: 'protopresbitero-stavroforo Milutin Nikolić', 'sr-latin': 'protojerej-stavrofor Milutin Nikolić' }, phone: '+41 61 272 08 68' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/image8.jpeg'
  },
  {
    id: 'bern',
    country: 'switzerland',
    city: { sr: 'Берн', de: 'Bern', it: 'Berna', 'sr-latin': 'Bern' },
    parish: { sr: 'Храм Светих Кирила и Методија', de: 'Kirche Hl. Kyrill und Method', it: 'Chiesa dei Santi Cirillo e Metodio', 'sr-latin': 'Hram Svetih Kirila i Metodija' },
    address: 'Aemmenmattstrasse 12, 3123 Belp',
    website: 'www.spcobern.ch',
    priests: [{ name: { sr: 'протојереј-ставрофор Станко Марковић', de: 'Erzpriester-Stavrophor Stanko Marković', it: 'protopresbitero-stavroforo Stanko Marković', 'sr-latin': 'protojerej-stavrofor Stanko Marković' }, phone: '+41 76 579 10 33' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/image9.jpeg'
  },
  {
    id: 'lozana',
    country: 'switzerland',
    city: { sr: 'Лозана', de: 'Lausanne', it: 'Losanna', 'sr-latin': 'Lozana' },
    parish: { sr: 'Парохија Света Три Јерарха', de: 'Gemeinde der Drei Hierarchen', it: 'Parrocchia dei Tre Gerarchi', 'sr-latin': 'Parohija Sveta Tri Jerarha' },
    address: 'Route de Berne 230, 1066 Epalinges',
    website: 'www.spco-lausanne.org',
    priests: [
      { name: { sr: 'протојереј Богољуб Поповић', de: 'Erzpriester Bogoljub Popović', it: 'protopresbitero Bogoljub Popović', 'sr-latin': 'protojerej Bogoljub Popović' }, phone: '+41 79 793 74 32' },
      { name: { sr: 'протојереј-ставрофор Франсоа Меан', de: 'Erzpriester-Stavrophor François Méan', it: 'protopresbitero-stavroforo François Méan', 'sr-latin': 'protojerej-stavrofor Fransoa Mean' }, other: { sr: 'Франкофонска парохија', de: 'Frankophone Gemeinde', it: 'Parrocchia francofona', 'sr-latin': 'Frankofonska parohija' } }
    ],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/image10.jpeg'
  },
  {
    id: 'zeneva',
    country: 'switzerland',
    city: { sr: 'Женева', de: 'Genf', it: 'Ginevra', 'sr-latin': 'Ženeva' },
    parish: { sr: 'Парохија Светог апостола Андреја Првозваног', de: 'Gemeinde Hl. Apostel Andreas der Erstberufene', it: 'Parrocchia di Sant\'Andrea Apostolo il Protoclito', 'sr-latin': 'Parohija Svetog apostola Andreja Prvozvanog' },
    address: 'Temple de Chancy, route de Bellegarde 69, 1284 Chancy',
    website: 'www.spczeneva.com',
    priests: [{ name: { sr: 'јереј Иван Толић', de: 'Priester Ivan Tolić', it: 'presbitero Ivan Tolić', 'sr-latin': 'jerej Ivan Tolić' }, phone: '+41 76 222 37 31', email: 'parohijazeneva@gmail.com' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/geneva-temple.jpg'
  },
  {
    id: 'ticino',
    country: 'switzerland',
    city: { sr: 'Тићино', de: 'Tessin', it: 'Ticino', 'sr-latin': 'Tićino' },
    parish: { sr: 'Парохија Сабора Српских Светитеља', de: 'Gemeinde der Serbischen Heiligen', it: 'Parrocchia del Sinodo dei Santi Serbi', 'sr-latin': 'Parohija Sabora Srpskih Svetitelja' },
    address: 'Chiesa San Giovanni, via San Giovanni 7, 6500 Bellinzona',
    website: 'www.spc-ticino.ch',
    priests: [{ name: { sr: 'јереј Марко Кнежевић', de: 'Priester Marko Knežević', it: 'presbitero Marko Knežević', 'sr-latin': 'jerej Marko Knežević' }, phone: '+41 76 479 97 89' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/bellinzona-church.jpg'
  },
  {
    id: 'lucern',
    country: 'switzerland',
    city: { sr: 'Луцерн', de: 'Luzern', it: 'Lucerna', 'sr-latin': 'Lucern' },
    parish: { sr: 'Парохија Рођења Пресвете Богородице', de: 'Gemeinde Mariä Geburt', it: 'Parrocchia della Natività della Santissima Madre di Dio', 'sr-latin': 'Parohija Rođenja Presvete Bogorodice' },
    address: 'Dorfstrasse 2, 6035 Perlen',
    website: 'www.spcoluzern.ch',
    priests: [{ name: { sr: 'протојереј Драган Станојевић', de: 'Erzpriester Dragan Stanojević', it: 'protopresbitero Dragan Stanojević', 'sr-latin': 'protojerej Dragan Stanojević' }, phone: '+41 76 587 00 11', email: 'otacdragan@spcoluzern.ch' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/image12.jpeg'
  },
  {
    id: 'cirih',
    country: 'switzerland',
    city: { sr: 'Цирих', de: 'Zürich', it: 'Zurigo', 'sr-latin': 'Cirih' },
    parish: { sr: 'Храм Свете Тројице & Храм Успења', de: 'Hl. Dreifaltigkeitskirche & Mariä Entschlafung', it: 'Chiesa della Santa Trinità & Chiesa della Dormizione', 'sr-latin': 'Hram Svete Trojice & Hram Uspenja' },
    address: 'Elisabethenstrasse 20, 8004 Zürich',
    website: 'www.crkva.ch',
    priests: [
      { name: { sr: 'протојереј Бранимир Петковић', de: 'Erzpriester Branimir Petković', it: 'protopresbitero Branimir Petković', 'sr-latin': 'protojerej Branimir Petković' }, phone: '+41 76 562 94 44', email: 'o.branimir@spc-zh.ch' },
      { name: { sr: 'протојереј Ђорђе Лукић', de: 'Erzpriester Đorđe Lukić', it: 'protopresbitero Đorđe Lukić', 'sr-latin': 'protojerej Đorđe Lukić' }, phone: '+41 76 489 97 89', email: 'o.djordje@spc-zh.ch' },
      { name: { sr: 'протојереј Александар Ресимић', de: 'Erzpriester Aleksandar Resimić', it: 'protopresbitero Aleksandar Resimić', 'sr-latin': 'protojerej Aleksandar Resimić' }, email: 'o.aleksandar@spc-zh.ch' },
      { name: { sr: 'протојереј-ставрофор др Мирослав Симијоновић', de: 'Erzpriester-Stavrophor Dr. Miroslav Simijović', it: 'protopresbitero-stavroforo dott. Miroslav Simijović', 'sr-latin': 'protojerej-stavrofor dr Miroslav Simijović' }, email: 'o.miroslav@spc-zh.ch' }
    ],
    liturgyTime: { sr: 'Недеља 09:30', de: 'Sonntag 09:30', it: 'Domenica 09:30', 'sr-latin': 'Nedelja 09:30' },
    image: '/img/image13.jpeg'
  },
  {
    id: 'sankt-galen',
    country: 'switzerland',
    city: { sr: 'Санкт Гален', de: 'St. Gallen', it: 'San Gallo', 'sr-latin': 'Sankt Galen' },
    parish: { sr: 'Храм предобног Симона Монаха', de: 'Kirche des hl. Simon des Mönches', it: 'Chiesa di San Simeone Monaco', 'sr-latin': 'Hram predobnog Simona Monaha' },
    address: 'Langgasse 161, 9008 St. Gallen',
    website: 'www.spc-sg.ch',
    priests: [
      { name: { sr: 'протојереј Бране Сарић', de: 'Erzpriester Brane Sarić', it: 'protopresbitero Brane Sarić', 'sr-latin': 'protojerej Brane Sarić' }, phone: '+41 79 546 10 83', email: 'o.brane@spc-sg.ch' },
      { name: { sr: 'јереј Миладин Вујковић', de: 'Priester Miladin Vujković', it: 'presbitero Miladin Vujković', 'sr-latin': 'jerej Miladin Vujković' }, phone: '+41 79 850 98 86', email: 'o.miladin@spc-sg.ch' }
    ],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/stgallen-church.jpg'
  },
  {
    id: 'mels',
    country: 'switzerland',
    city: { sr: 'Мелс', de: 'Mels', it: 'Mels', 'sr-latin': 'Mels' },
    parish: { sr: 'Парохија Светог владике Николаја Жичког', de: 'Gemeinde des Hl. Bischofs Nikolaj von Žiča', it: 'Parrocchia di San Nikolaj Vescovo di Žiča', 'sr-latin': 'Parohija Svetog vladike Nikolaja Žičkog' },
    address: 'Kapuzinerkloster, Klosterweg 6, 8887 Mels SG',
    website: 'www.spc-gr.ch',
    priests: [{ name: { sr: 'јереј Ненад Бркић', de: 'Priester Nenad Brkić', it: 'presbitero Nenad Brkić', 'sr-latin': 'jerej Nenad Brkić' }, phone: '+41 76 580 01 28', email: 'o.nenad@spc-gr.ch' }],
    liturgyTime: { sr: 'Недеља 10:00', de: 'Sonntag 10:00', it: 'Domenica 10:00', 'sr-latin': 'Nedelja 10:00' },
    image: '/img/image14.jpeg'
  }
];

export default function SematizamPage() {
  const { t } = useTranslation();
  const L = useLocalized();
  const [filter, setFilter] = useState('all');

  const filteredParishes = parishes.filter((p) => {
    if (filter === 'all') return true;
    return p.country === filter;
  });

  return (
    <>

      <div className="min-h-screen bg-[#FDFBF7] font-sans">
        
        {/* Banner */}
        <div className="bg-[#6b151b] pt-40 pb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] bg-center bg-cover opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 container-custom">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{t("directory.title", "Alle Kirchen der Eparchie")}</h1>
            <p className="text-[#D4AF37] tracking-[0.2em] text-sm uppercase font-bold">{t("directory.subtitle", "Aktive Pfarreien und Kirchengemeinden")}</p>
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
                {type === 'all' ? t("directory.filter_all", "Alle Standorte") 
                  : type === 'switzerland' ? t("directory.filter_ch", "Schweiz") 
                  : type === 'italy' ? t("directory.filter_it", "Italien") 
                  : t("directory.filter_ma", "Malta")}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="container-custom py-20">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            <AnimatePresence>
              {filteredParishes.map((parish) => (
                <motion.div
                  key={parish.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] overflow-hidden group hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                >
                  {/* Parish Default Image or Fallback Header */}
                  {parish.image ? (
                    <div className="h-52 w-full bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                      <img src={parish.image} alt={L(parish.city)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute bottom-5 left-6 z-20 text-white font-serif text-2xl font-bold drop-shadow-lg">
                        {L(parish.city)}
                      </div>
                    </div>
                  ) : (
                    <div className="h-28 w-full bg-[#6b151b] relative px-6 py-5 flex items-end">
                      <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                      <div className="font-serif text-white text-2xl font-bold relative z-10">{L(parish.city)}</div>
                    </div>
                  )}

                  <div className="p-7 md:p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-5 leading-snug">{L(parish.parish)}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin className="w-4 h-4 text-orthodox-gold mt-1 shrink-0" />
                        <span className="text-sm leading-relaxed">{parish.address}</span>
                      </div>
                      
                      {parish.website && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <Globe className="w-4 h-4 text-orthodox-gold shrink-0" />
                          <a href={`http://${parish.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#6b151b] font-medium transition-colors">{parish.website}</a>
                        </div>
                      )}
                    </div>

                    {/* Service Times */}
                    {parish.liturgyTime && (
                      <div className="flex items-center gap-3 bg-orthodox-gold/5 rounded-xl px-4 py-3.5 border border-orthodox-gold/10 mb-4">
                        <Clock className="w-5 h-5 text-orthodox-gold shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-orthodox-gold block mb-0.5">{t("directory.service_time", "Hl. Liturgie")}</span>
                          <span className="text-sm font-semibold text-gray-900">{L(parish.liturgyTime)}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#6b151b] mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" /> {t("directory.priests", "Klerus")}
                      </div>
                      <ul className="space-y-3">
                        {parish.priests.map((priest, index) => (
                          <li key={index} className="flex flex-col text-sm bg-gray-50 border border-gray-100 rounded-xl p-4">
                            <span className="block font-semibold text-gray-900 mb-2.5">{L(priest.name)}</span>
                            <div className="flex flex-wrap gap-4 mt-auto">
                              {priest.phone && (
                                <a href={`tel:${priest.phone.replace(/[\s()]/g, '')}`} className="flex items-center gap-1.5 text-gray-500 hover:text-[#6b151b] transition-colors" title={`${t("directory.call", "Anrufen")} ${priest.phone}`}>
                                  <Phone className="w-3.5 h-3.5 text-orthodox-gold" />
                                  <span className="text-[11px] font-semibold uppercase tracking-wider">{t("directory.call", "Anrufen")}</span>
                                </a>
                              )}
                              {priest.email && (
                                <a href={`mailto:${priest.email}`} className="flex items-center gap-1.5 text-gray-500 hover:text-[#6b151b] transition-colors" title={`${t("directory.email", "E-Mail")}: ${priest.email}`}>
                                  <Mail className="w-3.5 h-3.5 text-orthodox-gold" />
                                  <span className="text-[11px] font-semibold uppercase tracking-wider">{t("directory.email", "E-Mail")}</span>
                                </a>
                              )}
                              {priest.other && (
                                <span className="text-gray-400 text-xs italic">{L(priest.other)}</span>
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
