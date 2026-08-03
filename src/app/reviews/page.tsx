"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  MessageSquarePlus,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";
import { getReviews } from "@/lib/strapi";
import { ReviewData } from "@/lib/types";
import EmptyState from "@/components/empty-state";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  const totalCount = reviews.length;
  const averageRating =
    totalCount > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalCount).toFixed(1)
      : "5.0";

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
          تجارب واقعية
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
          آراء وتقييمات مراجعات العيادة
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          نفخر بثقة مراجعاتنا ويسعدنا مشاركتكِ لنتائج وتجارب الجلسات في عيادات
          د. منال سرحان.
        </p>
      </section>

      {/* Overall Rating Summary Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-center md:text-right">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#2D1B28] to-[#4A2D43] text-amber-300 flex flex-col items-center justify-center shadow-lg">
              <span className="text-3xl font-extrabold">{averageRating}</span>
              <span className="text-[10px] text-pink-200">من 5.0</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-amber-400 justify-center md:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={20} className="fill-amber-400" />
                ))}
              </div>
              <h3 className="font-bold text-base text-[#2D1B28]">
                تقييم ممتاز وموثق
              </h3>
              <p className="text-xs text-slate-500">
                إجمالي {totalCount} تقييم معتمد من مراجعات العيادة
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#E29578] to-[#2D1B28] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <MessageSquarePlus size={18} />
            <span>اكتبي رأيكِ وتجربتكِ</span>
          </button>
        </div>
      </section>

      {/* Reviews Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-slate-100 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={15} className="fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {rev.postedDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-rose-100 shrink-0">
                    <img
                      src={rev.patientPhoto as string}
                      alt={rev.patientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#2D1B28]">
                      {rev.patientName}
                    </h4>
                    <span className="text-[10px] text-[#E29578] font-semibold">
                      {rev.serviceTag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 rounded-full bg-slate-50 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#E29578]">
                مشاركتكِ تهمنا
              </span>
              <h3 className="text-xl font-bold text-[#2D1B28]">
                إضافة تقييم جديد
              </h3>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2 text-emerald-800">
                <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                <h4 className="font-bold text-base">شكراً لكِ!</h4>
                <p className="text-xs">
                  تم استقبال تقييمكِ بنجاح وسوف يتم اعتماده ونشره قريباً.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    اسمكِ الكريمة
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: نورة العتيبي"
                    className="w-full px-4 py-2.5 bg-pink-50/40 border border-pink-200 rounded-xl text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    الخدمة المستفادة
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: جلسات الليزر، بوتوكس، هيدرافايشل"
                    className="w-full px-4 py-2.5 bg-pink-50/40 border border-pink-200 rounded-xl text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    التقييم من 5
                  </label>
                  <div className="flex items-center gap-2 text-amber-400 pt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={22}
                        className="fill-amber-400 cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    رأيكِ وتعليقكِ
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="اكتبي تعليقكِ وانطباعكِ حول الخدمة..."
                    className="w-full px-4 py-2.5 bg-pink-50/40 border border-pink-200 rounded-xl text-xs outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E29578] hover:bg-[#d87b5b] text-white py-3 rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
                >
                  إرسال التقييم
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
