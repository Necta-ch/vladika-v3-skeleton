import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Head from "next/head";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("nav.contact", "Контакт")} | {t("home.title", "Епархија швајцарска")}</title>
      </Head>
      <div className="min-h-screen bg-[#FDFBF7]">
        {/* Page Hero Banner */}
        <div className="bg-[#6b151b] pt-40 pb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] bg-center bg-cover opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 container-custom">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              {t("contact.title", "Контакт")}
            </h1>
            <div className="h-1 w-24 bg-orthodox-gold mx-auto mb-4"></div>
            <p className="text-orthodox-gold tracking-[0.2em] text-sm uppercase font-bold">
              {t("contact.subtitle", "Епархија швајцарска")}
            </p>
          </div>
        </div>

        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Info Side */}
            <div className="space-y-12">
              <h2 className="text-4xl font-serif text-gray-900">
                {t("contact.heading", "Обратите нам се")}
              </h2>
              <p className="text-lg text-gray-600 font-sans leading-relaxed">
                {t("contact.description", "Ту смо да Вас саслушамо и да заједно растемо у вери. Без обзира да ли имате питања о заједници, тражите духовно водство или су Вам потребне административне информације.")}
              </p>

              <div className="space-y-8">
                <ContactInfo 
                  icon={<MapPin size={24} />} 
                  title={t("contact.address_label", "Адреса")} 
                  info="Elisabethenstrasse 20, 8004 Zürich, Schweiz"
                  href="https://maps.google.com/?q=Elisabethenstrasse+20+8004+Zürich"
                />
                <ContactInfo 
                  icon={<Mail size={24} />} 
                  title={t("contact.email_label", "Имејл")} 
                  info="eparhija@crkva.ch"
                  href="mailto:eparhija@crkva.ch"
                />
                <ContactInfo 
                  icon={<Phone size={24} />} 
                  title={t("contact.phone_label", "Телефон")} 
                  info="+41 44 242 89 90"
                  href="tel:+41442428990"
                />
                <ContactInfo 
                  icon={<Clock size={24} />} 
                  title={t("contact.hours_label", "Радно време")} 
                  info={t("contact.hours_info", "Пон–Пет: 09:00 – 17:00")}
                />
              </div>
            </div>

            {/* Form Side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400 font-sans">
                      {t("contact.form_name", "Име")}
                    </label>
                    <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors font-sans" placeholder={t("contact.form_name_placeholder", "Ваше име")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-gray-400 font-sans">
                      {t("contact.form_email", "Имејл")}
                    </label>
                    <input type="email" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors font-sans" placeholder={t("contact.form_email_placeholder", "ваш@имејл.com")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400 font-sans">
                    {t("contact.form_subject", "Тема")}
                  </label>
                  <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors font-sans" placeholder={t("contact.form_subject_placeholder", "О чему желите да нас питате?")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400 font-sans">
                    {t("contact.form_message", "Порука")}
                  </label>
                  <textarea rows="4" className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors font-sans resize-none" placeholder={t("contact.form_message_placeholder", "Ваша порука...")}></textarea>
                </div>
                <button type="submit" className="w-full flex items-center justify-center space-x-3 px-8 py-5 bg-[#6b151b] hover:bg-[#8B0000] text-white font-sans font-bold uppercase tracking-widest rounded-lg transition-all shadow-xl hover:scale-[1.02]">
                  <span>{t("contact.form_send", "Пошаљите")}</span>
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

const ContactInfo = ({ icon, title, info, href }) => (
  <div className="flex items-start space-x-6">
    <div className="w-14 h-14 bg-orthodox-gold/10 rounded-xl flex items-center justify-center text-orthodox-gold flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1 font-sans">{title}</h4>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-xl font-serif text-gray-900 hover:text-orthodox-gold transition-colors">
          {info}
        </a>
      ) : (
        <p className="text-xl font-serif text-gray-900">{info}</p>
      )}
    </div>
  </div>
);

export default Contact;
