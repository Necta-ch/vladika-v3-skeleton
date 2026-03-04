import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-orthodox-parchment/10">
      <header className="h-96 relative flex items-center justify-center crimson-gradient text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/img/contact-pattern.svg')]"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-4 drop-shadow-md">
            {t("nav.contact")}
          </h1>
          <div className="h-1 w-24 bg-orthodox-gold mx-auto"></div>
        </motion.div>
      </header>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="space-y-12">
            <h2 className="text-4xl font-serif text-orthodox-blue">Sprechen Sie uns an</h2>
            <p className="text-lg text-gray-600 font-sans leading-relaxed">
              Wir sind hier, um Ihnen zuzuhören und gemeinsam im Glauben zu wachsen. Egal ob Sie Fragen zur Gemeinschaft haben, geistliche Begleitung suchen oder administrative Informationen benötigen.
            </p>

            <div className="space-y-8">
              <ContactInfo icon={<MapPin size={24} />} title="Adresse" info="Schottenfeldgasse 17, 1070 Wien, Österreich" />
              <ContactInfo icon={<Mail size={24} />} title="Email" info="eparhija@example.com" />
              <ContactInfo icon={<Phone size={24} />} title="Telefon" info="+43 1 2345678" />
            </div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-10 rounded-2xl shadow-2xl border border-orthodox-gold/10"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400 font-sans">Name</label>
                  <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors font-sans" placeholder="Ihr Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400 font-sans">Email</label>
                  <input type="email" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors font-sans" placeholder="ihre@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400 font-sans">Betreff</label>
                <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors font-sans" placeholder="Worum geht es?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400 font-sans">Nachricht</label>
                <textarea rows="4" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors font-sans resize-none" placeholder="Ihre Nachricht an uns..."></textarea>
              </div>
              <button type="submit" className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-orthodox-crimson hover:bg-red-900 text-white font-sans font-bold uppercase tracking-widest rounded-lg transition-all shadow-xl hover:scale-[1.02]">
                <span>Senden</span>
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ContactInfo = ({ icon, title, info }) => (
  <div className="flex items-start space-x-6">
    <div className="w-14 h-14 bg-orthodox-gold/10 rounded-xl flex items-center justify-center text-orthodox-gold flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1 font-sans">{title}</h4>
      <p className="text-xl font-serif text-orthodox-blue">{info}</p>
    </div>
  </div>
);

export default Contact;
