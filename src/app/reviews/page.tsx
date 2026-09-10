"use client";

import React, { useState, useEffect } from "react";
import { getReviews } from "@/lib/supabase-data";
import { ReviewData } from "@/lib/types";
import EmptyState from "@/components/empty-state";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-12 pb-20 pt-8">
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-3 rounded-3xl border border-pink-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={rev.image}
                  alt="تقييم مريض"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}