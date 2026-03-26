import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MapPin, CalendarPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MONTH_NAMES = {
  de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
  it: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
  sr: ['Јануар','Фебруар','Март','Април','Мај','Јун','Јул','Август','Септембар','Октобар','Новембар','Децембар'],
  'sr-cyrillic': ['Јануар','Фебруар','Март','Април','Мај','Јун','Јул','Август','Септембар','Октобар','Новембар','Децембар'],
  'sr-latin': ['Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar']
};
const DAY_NAMES_MAP = {
  de: ['Mo','Di','Mi','Do','Fr','Sa','So'],
  it: ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'],
  sr: ['Пон','Уто','Сре','Чет','Пет','Суб','Нед'],
  'sr-cyrillic': ['Пон','Уто','Сре','Чет','Пет','Суб','Нед'],
  'sr-latin': ['Pon','Uto','Sre','Čet','Pet','Sub','Ned']
};

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  const d = new Date(year, month - 1, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

/**
 * Generate and download an .ics calendar file for a service.
 */
function downloadICS({ title, location, address, date, time }) {
  const [hours, minutes] = (time || '10:00').split(':').map(Number);
  const start = new Date(date);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 1, 30); // 1.5h default duration

  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Eparhija Svajcarska//Vladika v3//EN',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${[location, address].filter(Boolean).join(', ')}`,
    `DESCRIPTION:${title} — ${location}`,
    `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@vladika`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(title || 'liturgija').replace(/[^a-zA-Z0-9а-яА-ЯёЁ\u0400-\u04FF]/g, '_')}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * LiturgyCalendar component — shows a monthly calendar grid
 * with service days highlighted and a detail panel for the selected day.
 * 
 * @param {Array} parishes - Array of parish objects, each with { city, church, address, services: [{ day, time, type }] }
 */
export default function LiturgyCalendar({ parishes = [] }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const monthNames = MONTH_NAMES[lang] || MONTH_NAMES['de'];
  const dayNames = DAY_NAMES_MAP[lang] || DAY_NAMES_MAP['de'];
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  // Generate services for each day of the month
  const serviceDays = useMemo(() => {
    const days = {};
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month - 1, d);
      const dayOfWeek = date.getDay(); // 0=Sun
      const isSunday = dayOfWeek === 0;
      
      if (isSunday) {
        // All parishes have Sunday liturgy
        days[d] = parishes.map(p => ({
          city: p.city,
          church: p.church,
          address: p.address,
          services: p.services || [{ day: 'Недеља', time: '10:00', type: 'Света Литургија' }]
        }));
      }
    }
    return days;
  }, [month, year, daysInMonth, parishes]);

  const isToday = (day) => day === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear();

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(1);
  };

  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(1);
  };

  const selectedServices = serviceDays[selectedDay] || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Calendar Grid */}
      <div className="lg:col-span-5">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Month Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-orthodox-brown text-white">
            <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronLeft size={18} />
            </button>
            <h3 className="text-lg font-serif">{monthNames[month - 1]} {year}</h3>
            <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {dayNames.map(d => (
              <div key={d} className="text-center py-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`e-${i}`} className="aspect-square border-b border-r border-gray-50"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const hasService = !!serviceDays[day];
              const isSun = (firstDay + i) % 7 === 6;
              const selected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square border-b border-r border-gray-50 flex flex-col items-center justify-center gap-1 transition-all ${
                    selected ? 'bg-orthodox-gold text-white' :
                    isToday(day) ? 'bg-orthodox-gold/10' :
                    isSun ? 'bg-red-50/50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-sm font-bold ${
                    selected ? 'text-white' : isToday(day) ? 'text-orthodox-gold' : isSun ? 'text-red-500' : 'text-gray-700'
                  }`}>
                    {day}
                  </span>
                  {hasService && (
                    <div className={`w-1.5 h-1.5 rounded-full ${selected ? 'bg-white' : 'bg-orthodox-gold'}`}></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orthodox-gold"></div> {t('liturgy.service', 'Богослужење')}
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400"></div> {t('liturgy.sunday', 'Недеља')}
            </span>
          </div>
        </div>
      </div>

      {/* Selected Day Services */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${month}-${selectedDay}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-serif text-gray-900 mb-6">
              {selectedDay}. {monthNames[month - 1]} {year}
              {isToday(selectedDay) && (
                <span className="ml-3 text-xs font-bold uppercase tracking-widest text-orthodox-gold bg-orthodox-gold/10 px-3 py-1 rounded-full">
                  {t('liturgy.today', 'Данас')}
                </span>
              )}
            </h3>

            {selectedServices.length > 0 ? (
              <div className="space-y-4">
                {selectedServices.map((parish, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-serif text-lg text-gray-900">{parish.city}</h4>
                        <p className="text-sm text-gray-500 mt-1">{parish.church}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                          <MapPin size={12} className="text-orthodox-gold" />
                          {parish.address}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {parish.services.map((svc, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 bg-orthodox-gold/5 rounded-lg px-3 py-2 mb-1">
                            <Clock size={14} className="text-orthodox-gold" />
                            <div>
                              <span className="text-sm font-bold text-gray-900">{svc.time}</span>
                              <span className="text-[10px] text-gray-400 block">{svc.type}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Add to Calendar */}
                    <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end">
                      <button
                        onClick={() => {
                          const svc = parish.services[0] || {};
                          downloadICS({
                            title: svc.type || t('liturgy.service', 'Богослужење'),
                            location: `${parish.church}, ${parish.city}`,
                            address: parish.address,
                            date: new Date(year, month - 1, selectedDay),
                            time: svc.time
                          });
                        }}
                        className="flex items-center gap-2 text-xs font-semibold text-orthodox-gold hover:text-[#6b151b] transition-colors uppercase tracking-wider"
                      >
                        <CalendarPlus size={14} />
                        {t('liturgy.add_to_calendar', 'Додај у календар')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <Clock size={36} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 text-sm">{t('liturgy.no_services', 'Нема заказаних богослужења за овај дан.')}</p>
                <p className="text-xs text-gray-300 mt-2">{t('liturgy.select_sunday', 'Одаберите недељу за преглед литургија.')}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
