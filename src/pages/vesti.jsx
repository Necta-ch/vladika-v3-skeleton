import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, ChevronLeft, X, ArrowLeft } from 'lucide-react';
import { useTranslation } from "react-i18next";
import newsPosts from '../data/newsPosts';

const categoryLabels = {
  'liturgija': 'Литургија',
  'dogadjaj': 'Догађај',
  'saopstenje': 'Саопштење'
};

const categoryColors = {
  'liturgija': 'bg-orthodox-gold text-white',
  'dogadjaj': 'bg-[#6b151b] text-white',
  'saopstenje': 'bg-gray-700 text-white'
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}.`;
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

export default function VestiPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedPost, setSelectedPost] = useState(null);
  const [imageViewer, setImageViewer] = useState(null);

  const sortedPosts = [...newsPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Auto-open a post if navigated from homepage news card
  useEffect(() => {
    if (location.state?.openPostId) {
      const post = newsPosts.find(p => p.id === location.state.openPostId);
      if (post) setSelectedPost(post);
      // Clear the state so back/refresh doesn't re-trigger
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  return (
    <>

      <div className="min-h-screen bg-[#FDFBF7] font-sans">

        {/* Banner */}
        <div className="bg-[#6b151b] pt-40 pb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/orthodox-church-bg.jpg')] bg-center bg-cover opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 container-custom">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">{t("news.heading", "Епархијске Вести")}</h1>
            <p className="text-[#D4AF37] tracking-[0.2em] text-sm uppercase font-bold">{t("news.subheading", "Актуелности из живота Епархије")}</p>
          </div>
        </div>

        {/* Posts Grid or Single Post View */}
        <AnimatePresence mode="wait">
          {selectedPost ? (
            /* ===== SINGLE POST VIEW ===== */
            <motion.div
              key="single-post"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="container-custom py-12 md:py-20"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-[#6b151b] hover:text-orthodox-gold transition-colors mb-10 font-sans text-sm font-bold uppercase tracking-wider"
              >
                <ArrowLeft size={16} />
                {t("news.back", "Назад на вести")}
              </button>

              <article className="max-w-4xl mx-auto">
                {/* Category Badge */}
                <div className="mb-6">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${categoryColors[selectedPost.category] || 'bg-gray-200'}`}>
                    {categoryLabels[selectedPost.category] || selectedPost.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-8 leading-tight">
                  {selectedPost.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 mb-12 text-sm text-gray-500 border-b border-gray-200 pb-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-orthodox-gold" />
                    {formatDate(selectedPost.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-orthodox-gold" />
                    {selectedPost.location}
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] cursor-pointer group"
                  onClick={() => setImageViewer({ images: selectedPost.images, index: 0 })}
                >
                  <img
                    src={selectedPost.images[0]}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {selectedPost.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm">
                      +{selectedPost.images.length - 1} фото
                    </div>
                  )}
                </div>

                {/* Article Body */}
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed font-serif text-justify">
                  {selectedPost.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className={i === 0 ? 'first-letter:text-6xl first-letter:font-bold first-letter:text-orthodox-gold first-letter:mr-2 first-letter:float-left first-letter:leading-none' : 'mt-6'}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Image Gallery */}
                {selectedPost.images.length > 1 && (
                  <div className="mt-16">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 font-sans">
                      {t("news.gallery", "Фото галерија")}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedPost.images.map((img, i) => (
                        <div
                          key={i}
                          className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-shadow"
                          onClick={() => setImageViewer({ images: selectedPost.images, index: i })}
                        >
                          <img
                            src={img}
                            alt={`${selectedPost.title} - фото ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Facebook Link */}
                <div className="mt-16 p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                  <p className="text-sm text-gray-500 mb-3">{t("news.see_on_fb", "Погледајте оригиналну објаву на Facebook страници")}</p>
                  <a
                    href="https://www.facebook.com/EpiskopAndrejCilerdzic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#166FE5] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                  </a>
                </div>
              </article>
            </motion.div>
          ) : (
            /* ===== BLOG GRID VIEW ===== */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container-custom py-12 md:py-20"
            >
              {/* Featured Post (Latest) */}
              <div 
                className="mb-16 cursor-pointer group"
                onClick={() => setSelectedPost(sortedPosts[0])}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                  <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden relative">
                    <img
                      src={sortedPosts[0].images[0]}
                      alt={sortedPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${categoryColors[sortedPosts[0].category]}`}>
                        {categoryLabels[sortedPosts[0].category]}
                      </span>
                    </div>
                    {sortedPosts[0].images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm">
                        {sortedPosts[0].images.length} фото
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-orthodox-gold" />
                        {formatDate(sortedPosts[0].date)}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 mb-4 group-hover:text-[#6b151b] transition-colors leading-tight">
                      {sortedPosts[0].title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                      {sortedPosts[0].summary}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin size={14} className="text-orthodox-gold" />
                      {sortedPosts[0].location}
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-orthodox-gold font-sans text-xs tracking-[0.15em] uppercase font-bold group-hover:text-[#6b151b] transition-colors">
                      {t("news.read_more", "Прочитајте више")}
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedPosts.slice(1).map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-100 cursor-pointer group hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
                    onClick={() => setSelectedPost(post)}
                  >
                    {/* Post Image */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={post.images[0]}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${categoryColors[post.category]}`}>
                          {categoryLabels[post.category]}
                        </span>
                      </div>
                      {post.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm">
                          {post.images.length} фото
                        </div>
                      )}
                      {/* Date Badge */}
                      <div className="absolute bottom-3 left-3">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-center shadow-sm">
                          <div className="text-2xl font-serif font-bold text-gray-900 leading-none">{new Date(post.date).getDate()}</div>
                          <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{['ЈАН','ФЕБ','МАР','АПР','МАЈ','ЈУН','ЈУЛ','АВГ','СЕП','ОКТ','НОВ','ДЕЦ'][new Date(post.date).getMonth()]}</div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#6b151b] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.summary}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin size={12} className="text-orthodox-gold" />
                          {post.location}
                        </div>
                        <div className="flex items-center gap-1 text-orthodox-gold text-xs font-bold uppercase tracking-wider group-hover:text-[#6b151b] transition-colors">
                          Више <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA to Facebook */}
              <div className="mt-20 text-center">
                <div className="w-16 h-[1px] bg-orthodox-gold mx-auto mb-8"></div>
                <p className="text-gray-400 text-sm mb-6">{t("news.more_on_fb", "За више вести пратите нас на Facebook-у")}</p>
                <a
                  href="https://www.facebook.com/EpiskopAndrejCilerdzic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#1877F2] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#166FE5] transition-colors shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Episkop Andrej — Facebook
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Image Viewer */}
        <AnimatePresence>
          {imageViewer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
              onClick={() => setImageViewer(null)}
            >
              <button
                onClick={() => setImageViewer(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
              >
                <X size={28} />
              </button>

              {imageViewer.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageViewer(prev => ({
                        ...prev,
                        index: (prev.index - 1 + prev.images.length) % prev.images.length
                      }));
                    }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-colors rounded-full z-50"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageViewer(prev => ({
                        ...prev,
                        index: (prev.index + 1) % prev.images.length
                      }));
                    }}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-colors rounded-full z-50"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <motion.img
                key={imageViewer.index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                src={imageViewer.images[imageViewer.index]}
                alt="Full size"
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {imageViewer.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {imageViewer.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageViewer(prev => ({ ...prev, index: i }));
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === imageViewer.index ? 'bg-white w-6' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
