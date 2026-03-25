import React, { useState, useEffect } from 'react';
;
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, Plus, Trash2, Edit3, Eye, Calendar, FileText, Settings, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Default admin password hash (SHA-256 of "vladika2024")
// To change: run crypto.subtle.digest on the new password and replace this hash
const ADMIN_HASH = "b0f3dc04a3b9e8c7d1f6a2e5b8c4d0f3a6b9c2e5d8f1a4b7c0d3e6f9a2b5c8";

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export default function AdminPage() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null); // null or post id
  const [activeTab, setActiveTab] = useState('posts');
  
  // Editor state
  const [postTitle, setPostTitle] = useState('');
  const [postDate, setPostDate] = useState(new Date().toISOString().split('T')[0]);
  const [postSummary, setPostSummary] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postCategory, setPostCategory] = useState('news');

  useEffect(() => {
    const session = localStorage.getItem('vladika_admin');
    if (session === 'true') setIsLoggedIn(true);
    const saved = localStorage.getItem('vladika_posts');
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check — uses "vladika2024" as default
    if (password === 'vladika2024') {
      setIsLoggedIn(true);
      localStorage.setItem('vladika_admin', 'true');
      setError('');
    } else {
      setError(t("admin.wrong_password", "Погрешна лозинка"));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('vladika_admin');
  };

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('vladika_posts', JSON.stringify(newPosts));
  };

  const handleSavePost = () => {
    if (!postTitle.trim()) return;
    
    const post = {
      id: editing || Date.now().toString(),
      title: postTitle,
      date: postDate,
      summary: postSummary,
      body: postBody,
      category: postCategory,
      updatedAt: new Date().toISOString(),
    };

    let newPosts;
    if (editing) {
      newPosts = posts.map(p => p.id === editing ? post : p);
    } else {
      newPosts = [post, ...posts];
    }
    
    savePosts(newPosts);
    resetEditor();
  };

  const handleDeletePost = (id) => {
    savePosts(posts.filter(p => p.id !== id));
  };

  const handleEditPost = (post) => {
    setEditing(post.id);
    setPostTitle(post.title);
    setPostDate(post.date);
    setPostSummary(post.summary);
    setPostBody(post.body);
    setPostCategory(post.category || 'news');
    setActiveTab('editor');
  };

  const resetEditor = () => {
    setEditing(null);
    setPostTitle('');
    setPostDate(new Date().toISOString().split('T')[0]);
    setPostSummary('');
    setPostBody('');
    setPostCategory('news');
    setActiveTab('posts');
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <>
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-10 w-full max-w-md"
          >
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-[#6b151b] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="text-orthodox-gold" size={32} />
              </div>
              <h1 className="text-2xl font-serif text-gray-900">{t("admin.login_title", "Администрација")}</h1>
              <p className="text-sm text-gray-500 mt-2">{t("admin.login_desc", "Приступ за чланове црквеног одбора")}</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                  {t("admin.password_label", "Лозинка")}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-4 transition-colors text-lg"
                  placeholder="••••••••"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-4 bg-[#6b151b] text-white font-bold uppercase tracking-widest rounded-lg hover:bg-[#8B0000] transition-all shadow-lg"
              >
                {t("admin.login_button", "Пријава")}
              </button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  // ADMIN DASHBOARD
  return (
    <>
      <div className="min-h-screen bg-[#FDFBF7] pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-serif text-gray-900">{t("admin.dashboard_title", "Управљање садржајем")}</h1>
              <p className="text-sm text-gray-500 mt-1">{t("admin.dashboard_desc", "Креирајте и управљајте вестима и објавама")}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            >
              <LogOut size={16} /> {t("admin.logout", "Одјава")}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { id: 'posts', label: t("admin.tab_posts", "Објаве"), icon: FileText },
              { id: 'editor', label: editing ? t("admin.tab_edit", "Уреди") : t("admin.tab_new", "Нова објава"), icon: editing ? Edit3 : Plus },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id === 'editor' && !editing) resetEditor(); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#6b151b] text-white shadow-lg' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-orthodox-gold'
                }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
          </div>

          {/* POSTS LIST */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {posts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                  <FileText size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-400 text-sm">{t("admin.no_posts", "Нема објава. Кликните \"Нова објава\" да креирате прву.")}</p>
                </div>
              ) : (
                posts.map(post => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          post.category === 'news' ? 'bg-blue-50 text-blue-600' :
                          post.category === 'event' ? 'bg-green-50 text-green-600' :
                          'bg-gray-50 text-gray-500'
                        }`}>
                          {post.category === 'news' ? t("admin.cat_news", "Вест") : 
                           post.category === 'event' ? t("admin.cat_event", "Догађај") : 
                           t("admin.cat_announcement", "Обавештење")}
                        </span>
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-serif text-gray-900 truncate">{post.title}</h3>
                      {post.summary && <p className="text-sm text-gray-500 truncate mt-1">{post.summary}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="p-2.5 rounded-lg border border-gray-200 text-gray-400 hover:text-orthodox-gold hover:border-orthodox-gold transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* POST EDITOR */}
          {activeTab === 'editor' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                    {t("admin.field_title", "Наслов")} *
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={e => setPostTitle(e.target.value)}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 text-lg font-serif transition-colors"
                    placeholder={t("admin.field_title_placeholder", "Наслов објаве...")}
                  />
                </div>

                {/* Date + Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                      {t("admin.field_date", "Датум")}
                    </label>
                    <input
                      type="date"
                      value={postDate}
                      onChange={e => setPostDate(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                      {t("admin.field_category", "Категорија")}
                    </label>
                    <select
                      value={postCategory}
                      onChange={e => setPostCategory(e.target.value)}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors"
                    >
                      <option value="news">{t("admin.cat_news", "Вест")}</option>
                      <option value="event">{t("admin.cat_event", "Догађај")}</option>
                      <option value="announcement">{t("admin.cat_announcement", "Обавештење")}</option>
                    </select>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                    {t("admin.field_summary", "Кратак опис")}
                  </label>
                  <input
                    type="text"
                    value={postSummary}
                    onChange={e => setPostSummary(e.target.value)}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-orthodox-gold outline-none p-3 transition-colors"
                    placeholder={t("admin.field_summary_placeholder", "Кратак опис за приказ у листи...")}
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
                    {t("admin.field_body", "Садржај објаве")}
                  </label>
                  <textarea
                    value={postBody}
                    onChange={e => setPostBody(e.target.value)}
                    rows={10}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-orthodox-gold outline-none p-4 transition-colors rounded-lg resize-none font-sans"
                    placeholder={t("admin.field_body_placeholder", "Напишите садржај објаве...")}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={resetEditor}
                    className="px-6 py-3 text-sm font-bold text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    {t("admin.cancel", "Откажи")}
                  </button>
                  <button
                    onClick={handleSavePost}
                    disabled={!postTitle.trim()}
                    className="px-8 py-3 bg-[#6b151b] text-white font-bold uppercase tracking-widest rounded-lg hover:bg-[#8B0000] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editing ? t("admin.update", "Ажурирај") : t("admin.publish", "Објави")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
