"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  MessageCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { getFAQs } from "@/lib/strapi";
import { FAQData } from "@/lib/types";
import EmptyState from "@/components/empty-state";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [openId, setOpenId] = useState<string | number | null>(null);

  useEffect(() => {
    getFAQs().then((data) => {
      setFaqs(data);
      if (data.length > 0) setOpenId(data[0].id);
      setLoading(false);
    });
  }, []);

  const categories = ["الكل", "الليزر", "حقن التجميل", "العناية بالبشرة"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat =
      selectedCategory === "الكل" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string | number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
          إجابات الطبية الشاملة
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
          الأسئلة الشائعة والمعلومات الطبية
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          جمعنا لكِ أبرز تساؤلات المراجعات حول علاجات الليزر، الحقن التجميلي،
          والروتين اليومي للبشرة.
        </p>
      </section>

      {/* Search & Category Pills */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-md space-y-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute right-4 top-3.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="ابحثي عن سؤالكِ (ألم الليزر، ثبات الفيلر، الهيدرافايشل...)..."
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

      {/* Accordion List (Single open at a time) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-20 bg-slate-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : filteredFaqs.length > 0 ? (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-6 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#2D1B28] hover:text-[#E29578] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle
                        size={20}
                        className="text-[#E29578] shrink-0"
                      />
                      <span>{faq.question}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#E29578]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-rose-50 bg-pink-50/20 whitespace-pre-line">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="لم نجد إجابة لبحثكِ"
            description="جربي البحث بكلمات أخرى أو تواصلي مباشرة مع فريق العيادة للحصول على إجابة وافية."
          />
        )}
      </section>

      {/* Still Have Questions CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D1B28] text-white p-8 rounded-3xl text-center shadow-xl border border-amber-500/20 space-y-4">
          <span className="text-xs font-bold text-amber-300">
            لم تجدي إجابة لسؤالكِ؟
          </span>
          <h3 className="text-xl font-bold text-white">
            فريق الاستشارات الطبية جاهز للإجابة عبر الواتساب
          </h3>
          <p className="text-xs text-pink-100/80 max-w-md mx-auto">
            تواصل معنا مباشرة وسنقوم بالرد على كافة استفساراتكِ ومساعدتكِ في
            تحديد الإجراء المناسب.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/966114567890"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-full font-bold shadow-md text-xs sm:text-sm transition-all"
            >
              <MessageCircle size={18} />
              <span>تواصل مباشر عبر الواتساب</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
