"use client";

import React, { useState, useEffect } from "react";
import { getBeforeAfters } from "@/lib/supabase-data";
import { BeforeAfterData } from "@/lib/types";
import EmptyState from "@/components/empty-state";

export default function BeforeAfterGalleryPage() {
  const [items, setItems] = useState<BeforeAfterData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBeforeAfters().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-12 pb-20 pt-8">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
          شفافية ونتائج حقيقية
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
          معرض صور قبل وبعد العلاج
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          شاهد نتائج الجلسات العلاجية والتجميلية الحقيقية لمراجعاتنا بالعيادة
          واستكشف التغيير الملحوظ.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 bg-slate-100 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-3xl border border-pink-100 shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <img
                  src={item.image}
                  alt="نتيجة قبل وبعد"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="لا توجد صور متوفرة حالياً"
            description="سيتم إضافة صور نتائج الجلسات قريباً."
          />
        )}
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/80 border border-amber-200 p-6 rounded-3xl flex items-start gap-4 text-xs text-amber-900 leading-relaxed shadow-2xs">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-950">
              إخلاء مسؤولية وخصوصية المرضى
            </h4>
            <p>
              جميع الصور المعروضة تم نشرها بموافقة كتابية ومسبقة من المراجعات
              الكرام. تختلف النتائج الفردية من شخص لآخر بناءً على طبيعة البشرة
              ونوع العلاج المستخدم وعدد الجلسات الموصى بها طبياً.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}