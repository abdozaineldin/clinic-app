"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  Mail,
  CheckCircle2,
} from "lucide-react";
import { getArticles } from "@/lib/strapi";
import { ArticleData } from "@/lib/types";
import EmptyState from "@/components/empty-state";

export default function BlogPage() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [visibleCount, setVisibleCount] = useState(4);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const categories = ["الكل", "الليزر", "النصائح الطبية", "العناية بالبشرة"];

  const filteredArticles = articles.filter((art) => {
    const matchesCat =
      selectedCategory === "الكل" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredArticle = articles[0];
  const displayedArticles = filteredArticles.slice(0, visibleCount);

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
          المدونة والمحتوى الطبي
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
          مقالات ونصائح د. منال سرحان
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          اطلعي على أحدث المقالات والإرشادات الطبية المعتمدة للحفاظ على صحة
          بشرتك وتألق جمالك.
        </p>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-md space-y-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute right-4 top-3.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="ابحثي عن موضوع طبي (ليزر، كلف، بوتوكس، روتين الصيف)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-pink-50/40 border border-pink-200 rounded-2xl text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E29578] transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 ml-2">
              التصنيفات:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#2D1B28] text-white shadow-sm"
                    : "bg-pink-50 text-slate-700 hover:bg-pink-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Articles Grid */}
          <div className="lg:col-span-8 space-y-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-slate-100 animate-pulse rounded-3xl"
                  />
                ))}
              </div>
            ) : displayedArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {displayedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        <div className="relative h-48 w-full bg-rose-50 overflow-hidden">
                          <img
                            src={article.coverImage as string}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>

                        <div className="p-6 space-y-2">
                          <h3 className="font-bold text-base text-[#2D1B28] group-hover:text-[#E29578] transition-colors leading-snug">
                            {article.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 mt-4">
                        <span className="flex items-center gap-1">
                          <Clock size={13} />
                          {article.readingTime}
                        </span>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="font-bold text-[#2D1B28] group-hover:text-[#E29578] transition-colors"
                        >
                          اقرأي المزيد ←
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Pagination Button */}
                {visibleCount < filteredArticles.length && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                      className="bg-white border border-pink-200 text-[#2D1B28] hover:bg-pink-50 px-8 py-3 rounded-full text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      تحميل المزيد من المقالات
                    </button>
                  </div>
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Featured Article Card */}
            {featuredArticle && (
              <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-md space-y-4">
                <span className="text-[11px] font-bold text-[#E29578] uppercase">
                  مقال متميز
                </span>
                <div className="relative h-44 rounded-2xl overflow-hidden bg-rose-50">
                  <img
                    src={featuredArticle.coverImage as string}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-base text-[#2D1B28]">
                  {featuredArticle.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {featuredArticle.excerpt}
                </p>
                <Link
                  href={`/blog/${featuredArticle.slug}`}
                  className="block text-center bg-pink-50 hover:bg-pink-100 text-[#2D1B28] py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  قراءة المقال المتميز
                </Link>
              </div>
            )}

            {/* Newsletter Signup Box */}
            <div className="bg-[#2D1B28] text-white p-6 rounded-3xl shadow-xl border border-amber-500/20 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-300">
                  النشرة الطبية
                </span>
                <h3 className="text-lg font-bold text-white">
                  اشتركي ليصلكِ كل جديد
                </h3>
                <p className="text-xs text-pink-200/80">
                  احصلي على نصائح العناية بالبشرة وأحدث العروض حصرية في بريدكِ.
                </p>
              </div>

              {subscribed ? (
                <div className="bg-emerald-950/80 border border-emerald-500/40 p-4 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 size={18} />
                  <span>شكراً لاشتراككِ في النشرة البريدية!</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="أدخلي بريدكِ الإلكتروني..."
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#E29578] hover:bg-[#d87b5b] text-white py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
                  >
                    تأكيد الاشتراك
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
