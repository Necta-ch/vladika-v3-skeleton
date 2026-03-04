import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Info, ArrowRight } from "lucide-react";

const Liturgy = () => {
  const { t } = useTranslation();

  const events = [
    {
      id: 1,
      title: "Göttliche Liturgie zum Sonntag",
      date: "08. März 2026",
      time: "09:30",
      location: "Kathedrale zum hl. Sava, Wien",
      description: "Zelebriert von Vladika Andrej mit anschließendem Kirchenkaffee.",
      type: "Liturgie"
    },
    {
      id: 2,
      title: "Abendgottesdienst & Beichte",
      date: "07. März 2026",
      time: "18:00",
      location: "Hl. Dreifaltigkeit, Zürich",
      description: "Vorbereitung auf die sonntägliche Eucharistiefeier.",
      type: "Vesper"
    },
    {
      id: 3,
      title: "Akathistos-Hymnus an die Gottesgebärerin",
      date: "04. März 2026",
      time: "19:00",
      location: "St. Spiridon, Triest",
      description: "Gemeinsames Gebet für den Frieden und die Gesundheit der Welt.",
      type: "Akathist"
    }
  ];

  return (
    <div className="min-h-screen bg-orthodox-parchment/5">
      {/* Page Header */}
      <header className="h-64 crimson-gradient relative flex items-center justify-center text-white overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('/img/liturgy-pattern.svg')] bg-repeat"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-6xl font-serif mb-2 tracking-tight">
            {t("nav.liturgy")}
          </h1>
          <div className="h-1.5 w-16 bg-orthodox-gold mx-auto"></div>
          <p className="mt-4 text-sm font-sans font-bold uppercase tracking-widest text-white/70">
            Liturhijski Raspored • Liturgieplan
          </p>
        </motion.div>
      </header>

      {/* Liturgy Schedule Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Calendar Sidebar Placeholder */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-orthodox-gold/10">
              <h3 className="text-2xl font-serif text-orthodox-blue mb-8 border-b border-orthodox-gold/10 pb-4 flex items-center">
                <Calendar className="mr-3 text-orthodox-gold" size={24} />
                März 2026
              </h3>
              {/* Calendar Grid Mock */}
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map(d => (
                  <div key={d} className="font-bold text-gray-400 py-2">{d}</div>
                ))}
                {Array.from({ length: 31 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${[4, 7, 8].includes(i+1) ? "bg-orthodox-gold text-white font-bold" : "hover:bg-gray-100 text-gray-600"}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orthodox-blue text-white p-8 rounded-2xl shadow-xl border-l-8 border-orthodox-gold">
              <Info className="mb-4 text-orthodox-gold" size={32} />
              <h4 className="text-xl font-serif mb-4 text-orthodox-gold">Besonderer Hinweis</h4>
              <p className="text-sm font-sans text-gray-300 leading-relaxed">
                Während der Fastenzeit finden die Abendmahlgottesdienste unter der Woche jeweils um 18:00 Uhr statt, sofern nicht anders angegeben.
              </p>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl font-serif text-orthodox-blue mb-10 flex items-center justify-between">
              Kommende Gottesdienste
              <div className="h-px w-20 bg-orthodox-gold/30 hidden sm:block"></div>
            </h2>
            
            <div className="space-y-6">
              {events.map((event) => (
                <motion.div 
                  key={event.id}
                  whileHover={{ x: 10 }}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:border-orthodox-gold transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-orthodox-crimson/10 text-orthodox-crimson text-xs font-bold uppercase tracking-widest rounded-full">
                          {event.type}
                        </span>
                        <div className="flex items-center text-orthodox-gold text-sm font-bold uppercase tracking-widest">
                          <Calendar size={14} className="mr-1.5" /> {event.date}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                          <Clock size={14} className="mr-1.5" /> {event.time}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-serif text-orthodox-blue">{event.title}</h3>
                      
                      <div className="flex items-start text-gray-500 text-sm font-sans space-x-6">
                        <div className="flex items-start">
                          <MapPin size={16} className="mr-1.5 mt-0.5 text-orthodox-gold" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-start hidden sm:flex">
                          <Info size={16} className="mr-1.5 mt-0.5 text-orthodox-gold" />
                          <span>{event.description}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="flex items-center justify-center p-4 rounded-xl border border-orthodox-gold text-orthodox-gold hover:bg-orthodox-gold hover:text-white transition-all">
                      <ArrowRight size={24} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full py-5 bg-white border border-orthodox-gold/30 text-orthodox-gold font-sans font-bold uppercase tracking-widest rounded-xl hover:bg-orthodox-gold hover:text-white transition-all shadow-sm">
              Gesamten Kalender herunterladen (PDF)
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Liturgy;
