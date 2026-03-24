import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import LiturgyCalendar from "../components/LiturgyCalendar";

const Liturgy = () => {
  const { t } = useTranslation();

  // Service schedules organized by region
  const schedules = [
    {
      region: t("directory.filter_ch", "Швајцарска"),
      parishes: [
        {
          city: t("liturgy.zurich", "Цирих"),
          church: t("liturgy.zurich_church", "Храм Свете Тројице"),
          address: "Elisabethenstrasse 20, 8004 Zürich",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "09:30", type: t("liturgy.divine_liturgy", "Света Литургија") },
            { day: t("liturgy.saturday", "Субота"), time: "18:00", type: t("liturgy.vespers", "Вечерње") },
          ]
        },
        {
          city: t("liturgy.basel", "Базел"),
          church: t("liturgy.basel_church", "Парохија свих светих"),
          address: "Kirche zu St. Alban, Mühlenberg 5, 4051 Basel",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
        {
          city: t("liturgy.bern", "Берн"),
          church: t("liturgy.bern_church", "Храм Светих Кирила и Методија"),
          address: "Aemmenmattstrasse 12, 3123 Belp",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
        {
          city: t("liturgy.lausanne", "Лозана"),
          church: t("liturgy.lausanne_church", "Парохија Света Три Јерарха"),
          address: "Route de Berne 230, 1066 Epalinges",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
        {
          city: t("liturgy.geneva", "Женева"),
          church: t("liturgy.geneva_church", "Парохија Св. Андреја Првозваног"),
          address: "Temple de Chancy, route de Bellegarde 69, 1284 Chancy",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
        {
          city: t("liturgy.lucerne", "Луцерн"),
          church: t("liturgy.lucerne_church", "Парохија Рођења Пресвете Богородице"),
          address: "Dorfstrasse 2, 6035 Perlen",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
        {
          city: t("liturgy.st_gallen", "Санкт Гален"),
          church: t("liturgy.st_gallen_church", "Храм предобног Симона Монаха"),
          address: "Langgasse 161, 9008 St. Gallen",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
        {
          city: t("liturgy.ticino", "Тићино"),
          church: t("liturgy.ticino_church", "Парохија Сабора Српских Светитеља"),
          address: "Chiesa San Giovanni, via San Giovanni 7, 6500 Bellinzona",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
      ]
    },
    {
      region: t("directory.filter_it", "Италија"),
      parishes: [
        {
          city: t("liturgy.trieste", "Трст"),
          church: t("liturgy.trieste_church", "Храм Светог Спиридона"),
          address: "Via Genova 12, 34121 Trieste",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
        {
          city: t("liturgy.vicenza", "Вићенца"),
          church: t("liturgy.vicenza_church", "Парохија Светог Луке"),
          address: "Contrada della Misericordia 20, 36100 Vicenza",
          services: [
            { day: t("liturgy.sunday_holidays", "Недеља и празници"), time: "09:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
        {
          city: t("liturgy.milan", "Милано"),
          church: t("liturgy.milan_church", "Парохија Св. краља Стефана Првовенчаног"),
          address: "Carate Brianza, Via Alessandro Volta 2",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
      ]
    },
    {
      region: t("directory.filter_ma", "Малта"),
      parishes: [
        {
          city: t("liturgy.malta", "Малта"),
          church: t("liturgy.malta_church", "Парохија Св. Ап. Павла и Св. Николе"),
          address: "Chapel of Our Lady of Carmel, 432 Triq San Pawl",
          services: [
            { day: t("liturgy.sunday", "Недеља"), time: "10:00", type: t("liturgy.divine_liturgy", "Света Литургија") },
          ]
        },
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>{t("liturgy.page_title", "Распоред богослужења")} | {t("home.title", "Епархија швајцарска")}</title>
      </Head>

      <div className="min-h-screen bg-[#FDFBF7] font-sans">
        {/* Banner */}
        <div className="bg-[#6b151b] pt-40 pb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] bg-center bg-cover opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 container-custom">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              {t("liturgy.page_title", "Распоред богослужења")}
            </h1>
            <div className="h-1 w-24 bg-orthodox-gold mx-auto mb-4"></div>
            <p className="text-orthodox-gold tracking-[0.2em] text-sm uppercase font-bold">
              {t("liturgy.page_subtitle", "Светa Литургија и Вечерње")}
            </p>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="bg-orthodox-brown text-white">
          <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-sans leading-relaxed text-center md:text-left">
              <span className="text-orthodox-gold font-bold">{t("liturgy.note_label", "Напомена:")}</span>{" "}
              {t("liturgy.note_text", "Тачне информације о времену богослужења потражите на веб страницама појединих парохија или контактирајте свештеника директно.")}
            </p>
            <Link href="/sematizam" className="text-orthodox-gold text-xs tracking-[0.15em] uppercase font-bold hover:text-white transition-colors whitespace-nowrap flex items-center">
              {t("liturgy.all_parishes_link", "Све Парохије")}
              <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>

        {/* Calendar View */}
        <div className="container-custom py-16">
          <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-8 text-center">
            {t("liturgy.calendar_title", "Календар богослужења")}
          </h2>
          <LiturgyCalendar
            parishes={schedules.flatMap(r => r.parishes.map(p => ({
              city: p.city,
              church: p.church,
              address: p.address,
              services: p.services,
            })))}
          />
        </div>

        <div className="h-px bg-gray-200 container-custom"></div>

        {/* Schedule by Region */}
        <div className="container-custom py-20">
          {schedules.map((region, rIdx) => (
            <div key={rIdx} className="mb-16 last:mb-0">
              {/* Region Header */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-serif text-gray-900">{region.region}</h2>
                <div className="h-px flex-1 bg-orthodox-gold/20"></div>
              </div>

              {/* Parish Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {region.parishes.map((parish, pIdx) => (
                  <motion.div
                    key={pIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: pIdx * 0.05 }}
                    className="bg-white rounded-xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Card Header */}
                    <div className="bg-[#6b151b] px-6 py-4 relative">
                      <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
                      <h3 className="text-xl font-serif text-white relative z-10">{parish.city}</h3>
                      <p className="text-white/70 text-xs font-sans mt-1 relative z-10">{parish.church}</p>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Address */}
                      <div className="flex items-start gap-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 text-orthodox-gold mt-0.5 shrink-0" />
                        <span>{parish.address}</span>
                      </div>

                      {/* Service Times */}
                      <div className="space-y-2">
                        {parish.services.map((svc, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                            <Clock className="w-4 h-4 text-orthodox-gold shrink-0" />
                            <div className="flex-1">
                              <span className="text-sm font-semibold text-gray-900">{svc.type}</span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-gray-500">{svc.day}</span>
                                <span className="text-xs text-orthodox-gold font-bold">{svc.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Liturgy;
