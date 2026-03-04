import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User, Shield, BookOpen, Quote, Award } from "lucide-react";

const Bishop = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <header className="h-96 relative flex items-center justify-center crimson-gradient text-white overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-15 bg-[url('/img/orthodox-cross-pattern.png')] bg-repeat"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-4 tracking-tighter drop-shadow-lg italic">
            Vladika Andrej
          </h1>
          <div className="h-1.5 w-24 bg-orthodox-gold mx-auto"></div>
          <p className="mt-6 text-xl md:text-2xl font-sans font-light uppercase tracking-widest text-orthodox-parchment/80">
            Erzbischof von Österreich, Schweiz und Italien
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-orthodox-gold translate-x-4 translate-y-4 rounded-3xl -z-10 opacity-20"></div>
            <div className="h-[700px] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative border-4 border-orthodox-gold/30">
              <div className="absolute inset-0 bg-gradient-to-t from-orthodox-blue/40 to-transparent"></div>
              {/* Image Placeholder */}
              <div className="w-full h-full bg-[url('/img/bishop-portrait.jpg')] bg-cover bg-center"></div>
            </div>
            
            {/* Quick Stats Overlay */}
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-orthodox-gold/20">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text- orthodox-gold mb-2 flex justify-center"><Shield size={24} /></div>
                  <div className="text-2xl font-serif text-orthodox-blue">2014</div>
                  <div className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400 mt-1">Amtseinführung</div>
                </div>
                <div>
                  <div className="text-orthodox-gold mb-2 flex justify-center"><Award size={24} /></div>
                  <div className="text-2xl font-serif text-orthodox-blue">Wien</div>
                  <div className="text-xs font-sans font-bold uppercase tracking-widest text-gray-400 mt-1">Amtssitz</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-8">
              <div className="flex items-center space-x-3 text-orthodox-crimson">
                <div className="h-px w-10 bg-orthodox-crimson"></div>
                <span className="text-sm font-sans font-bold uppercase tracking-widest">Biografie</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-orthodox-blue leading-tight">
                Ein Hirte des Glaubens und der Versöhnung
              </h2>
              <div className="space-y-6 text-lg text-gray-600 font-sans leading-relaxed">
                <p>
                  Bischof Andrej wurde am 21. August 1961 in Osnabrück (Deutschland) geboren. Als Sohn eines serbisch-orthodoxen Priesters wuchs er in einem Umfeld auf, das tief vom Glauben und der ökumenischen Zusammenarbeit geprägt war.
                </p>
                <p>
                  Nach seinem Studium an der Theologischen Fakultät in Belgrad setzte er seine Ausbildung in Saloniki und Rom fort, wo er seine Sprachkenntnisse in Griechisch, Italienisch, Deutsch und Französisch perfektionierte. Diese multikulturelle Prägung macht ihn heute zu einem idealen Brückenbauer in Europa.
                </p>
                <p>
                  Am 24. Mai 2014 wurde er von der Heiligen Bischofskonferenz zum Bischof der neu gegründeten Eparchie für Österreich, die Schweiz und Italien gewählt. Sein Wirken ist geprägt von einer tiefen Liebe zur Liturgie und einer unermüdlichen Arbeit für die Einheit der Gläubigen in der Diaspora.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-12 bg-orthodox-parchment/30 rounded-3xl relative border border-orthodox-gold/10"
            >
              <Quote className="absolute top-8 left-8 text-orthodox-gold opacity-30" size={64} />
              <p className="relative text-2xl font-serif text-orthodox-blue italic leading-relaxed pl-8">
                Die Kirche ist keine Institution, sie ist der lebendige Leib Christi. In jedem Gesicht unseres Nächsten müssen wir das Abbild des Schöpfers suchen.
              </p>
              <div className="mt-8 pl-8 flex items-center space-x-4">
                <div className="h-0.5 w-12 bg-orthodox-gold"></div>
                <span className="text-sm font-sans font-bold uppercase tracking-widest text-orthodox-crimson">+ Bischof Andrej</span>
              </div>
            </motion.div>

            {/* Achievements List */}
            <div className="space-y-8">
              <h3 className="text-2xl font-serif text-orthodox-blue">Schwerpunkte seiner Arbeit</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <AchievementItem icon={<BookOpen size={20} />} title="Jugendarbeit" text="Förderung der christlichen Identität unter jungen Menschen in der Diaspora." />
                <AchievementItem icon={<Shield size={20} />} title="Ökumene" text="Aktive Teilnahme am interreligiösen Dialog und zur Stärkung der Einheit." />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AchievementItem = ({ icon, title, text }) => (
  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-orthodox-gold/10 rounded-lg flex items-center justify-center text-orthodox-gold mb-4">
      {icon}
    </div>
    <h4 className="text-lg font-serif text-orthodox-blue mb-2">{title}</h4>
    <p className="text-sm text-gray-500 font-sans leading-relaxed">{text}</p>
  </div>
);

export default Bishop;
