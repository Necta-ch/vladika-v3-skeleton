import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, BookOpen, UtensilsCrossed, Calendar as CalendarIcon, Church } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getTodaySaint, getMonthSaints, getSaintByDate, getFastingLabel, getTypeLabel } from '../data/orthodoxCalendarData';

const MONTH_NAMES_SR = [
  'Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун',
  'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар'
];

const DAY_NAMES_SR = ['Пон', 'Уто', 'Сре', 'Чет', 'Пет', 'Суб', 'Нед'];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  const d = new Date(year, month - 1, 1).getDay();
  return d === 0 ? 6 : d - 1; // Convert to Monday-start
}

const typeColors = {
  great: 'bg-orthodox-gold text-white',
  major: 'bg-[#6b151b] text-white',
  regular: 'bg-gray-100 text-gray-700',
  fast: 'bg-purple-100 text-purple-800',
};

const typeDotColors = {
  great: 'bg-orthodox-gold',
  major: 'bg-[#6b151b]',
  regular: 'bg-gray-300',
  fast: 'bg-purple-400',
};

const fastingColors = {
  'no-fast': 'text-green-600 bg-green-50',
  'none': 'text-gray-500 bg-gray-50',
  'fish': 'text-blue-600 bg-blue-50',
  'oil': 'text-amber-600 bg-amber-50',
  'strict': 'text-red-600 bg-red-50',
};

export default function OrthodoxCalendarPage() {
  const { t } = useTranslation();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const todaySaint = getTodaySaint();
  const monthSaints = useMemo(() => getMonthSaints(currentMonth), [currentMonth]);
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  const selectedSaint = useMemo(() => getSaintByDate(currentMonth, selectedDay), [currentMonth, selectedDay]);

  const isToday = (day) => {
    return day === today.getDate() && currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear();
  };

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
    setSelectedDay(1);
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
    setSelectedDay(1);
  };

  return (
    <>
      <Head>
        <title>{t("calendar.title", "Православни Календар")} | {t("home.title", "Епархија швајцарска")}</title>
      </Head>

      <div className="min-h-screen bg-[#FDFBF7] font-sans">
        {/* Banner */}
        <div className="bg-[#6b151b] pt-40 pb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] bg-center bg-cover opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 container-custom">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              {t("calendar.title", "Православни Календар")}
            </h1>
            <div className="h-1 w-24 bg-orthodox-gold mx-auto mb-4"></div>
            <p className="text-orthodox-gold tracking-[0.2em] text-sm uppercase font-bold">
              {t("calendar.subtitle", "Светитељи и празници")}
            </p>
          </div>
        </div>

        {/* Today's Saint - Hero Card */}
        {todaySaint && (
          <div className="container-custom -mt-10 relative z-20 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl shadow-2xl p-8 md:p-12 border-l-8 border-orthodox-gold ${
                todaySaint.type === 'great' 
                  ? 'bg-gradient-to-br from-[#6b151b] to-[#4C3435] text-white' 
                  : 'bg-white text-gray-900'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
                    todaySaint.type === 'great' ? 'bg-orthodox-gold/20 text-orthodox-gold' : 'bg-orthodox-gold/10 text-orthodox-gold'
                  }`}>
                    {t("calendar.today", "Данас")} • {today.getDate()}. {MONTH_NAMES_SR[today.getMonth()]}
                  </span>
                  <h2 className={`text-2xl md:text-3xl font-serif mb-3 ${todaySaint.type === 'great' ? 'text-orthodox-gold' : 'text-gray-900'}`}>
                    {todaySaint.saint}
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                      todaySaint.type === 'great' ? 'bg-white/10 text-white' : typeColors[todaySaint.type]
                    }`}>
                      <Church size={12} /> {getTypeLabel(todaySaint.type)}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                      todaySaint.type === 'great' ? 'bg-white/10 text-white' : fastingColors[todaySaint.fasting]
                    }`}>
                      <UtensilsCrossed size={12} /> {getFastingLabel(todaySaint.fasting)}
                    </span>
                    {todaySaint.slava && (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                        todaySaint.type === 'great' ? 'bg-orthodox-gold/20 text-orthodox-gold' : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        <Star size={12} /> {t("calendar.slava", "Крсна Слава")}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`text-7xl font-serif font-bold ${todaySaint.type === 'great' ? 'text-orthodox-gold/30' : 'text-gray-100'}`}>
                  ☦
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Calendar Grid + Selected Day Detail */}
        <div className="container-custom pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calendar Grid */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Month Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-[#6b151b] text-white">
                  <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="text-xl font-serif tracking-wide">
                    {MONTH_NAMES_SR[currentMonth - 1]} {currentYear}
                  </h3>
                  <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Day Names Header */}
                <div className="grid grid-cols-7 border-b border-gray-100">
                  {DAY_NAMES_SR.map(d => (
                    <div key={d} className="text-center py-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day Cells */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square border-b border-r border-gray-50"></div>
                  ))}

                  {/* Day cells */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const saint = getSaintByDate(currentMonth, day);
                    const isSunday = (firstDay + i) % 7 === 6;
                    const selected = selectedDay === day;

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`aspect-square border-b border-r border-gray-50 p-1.5 flex flex-col items-center justify-center gap-1 transition-all relative group ${
                          selected
                            ? 'bg-[#6b151b] text-white' 
                            : isToday(day) 
                              ? 'bg-orthodox-gold/10'
                              : isSunday
                                ? 'bg-red-50/50'
                                : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className={`text-sm font-bold ${
                          selected ? 'text-white' : isToday(day) ? 'text-orthodox-gold' : isSunday ? 'text-red-500' : 'text-gray-700'
                        }`}>
                          {day}
                        </span>
                        {saint && (
                          <div className={`w-1.5 h-1.5 rounded-full ${selected ? 'bg-orthodox-gold' : typeDotColors[saint.type]}`}></div>
                        )}
                        {saint?.slava && (
                          <Star size={8} className={`absolute top-1 right-1 ${selected ? 'text-orthodox-gold' : 'text-yellow-400'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orthodox-gold"></div> {t("calendar.great_feast", "Велики празник")}</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#6b151b]"></div> {t("calendar.feast", "Празник")}</span>
                  <span className="flex items-center gap-1.5"><Star size={10} className="text-yellow-400" /> {t("calendar.slava", "Крсна Слава")}</span>
                </div>
              </div>
            </div>

            {/* Selected Day Detail Panel */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentMonth}-${selectedDay}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-28"
                >
                  {selectedSaint ? (
                    <>
                      <div className={`px-8 py-6 ${
                        selectedSaint.type === 'great' ? 'bg-gradient-to-r from-orthodox-gold to-yellow-600 text-white' :
                        selectedSaint.type === 'major' ? 'bg-[#6b151b] text-white' :
                        'bg-gray-50 text-gray-900'
                      }`}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">
                          {selectedDay}. {MONTH_NAMES_SR[currentMonth - 1]} {currentYear}
                        </p>
                        <h3 className="text-xl font-serif leading-snug">
                          {selectedSaint.saint}
                        </h3>
                      </div>

                      <div className="p-8 space-y-6">
                        {/* Type */}
                        <div className="flex items-center gap-3">
                          <Church size={18} className="text-orthodox-gold" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t("calendar.type", "Тип дана")}</p>
                            <p className="text-sm font-semibold text-gray-900">{getTypeLabel(selectedSaint.type)}</p>
                          </div>
                        </div>

                        {/* Fasting */}
                        <div className="flex items-center gap-3">
                          <UtensilsCrossed size={18} className="text-orthodox-gold" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t("calendar.fasting", "Пост")}</p>
                            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${fastingColors[selectedSaint.fasting]}`}>
                              {getFastingLabel(selectedSaint.fasting)}
                            </span>
                          </div>
                        </div>

                        {/* Slava */}
                        {selectedSaint.slava && (
                          <div className="flex items-center gap-3">
                            <Star size={18} className="text-orthodox-gold" />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t("calendar.slava", "Крсна Слава")}</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {t("calendar.slava_desc", "Овај дан се слави као крсна слава у многим српским породицама.")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="p-12 text-center text-gray-400">
                      <CalendarIcon size={48} className="mx-auto mb-4 opacity-30" />
                      <p className="text-sm">{t("calendar.no_info", "Нема информација за овај дан.")}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Month Saints List */}
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h4 className="font-serif text-lg text-gray-900 flex items-center gap-2">
                    <BookOpen size={18} className="text-orthodox-gold" />
                    {t("calendar.month_list", "Све славе овог месеца")}
                  </h4>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {monthSaints
                    .filter(s => s.slava)
                    .map(s => (
                      <button
                        key={s.day}
                        onClick={() => setSelectedDay(s.day)}
                        className={`w-full text-left px-6 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                          selectedDay === s.day ? 'bg-orthodox-gold/5' : ''
                        }`}
                      >
                        <span className="w-8 h-8 rounded-lg bg-orthodox-gold/10 text-orthodox-gold text-xs font-bold flex items-center justify-center">
                          {s.day}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{s.saint}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${typeDotColors[s.type]}`}></div>
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
