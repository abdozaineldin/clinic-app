"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ShieldAlert, Filter } from "lucide-react";
import { getBeforeAfters } from "@/lib/strapi";
import { BeforeAfterData } from "@/lib/types";
import BeforeAfterSlider from "@/components/before-after-slider";
import EmptyState from "@/components/empty-state";

export default function BeforeAfterGalleryPage() {
  const [items, setItems] = useState<BeforeAfterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getBeforeAfters().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    { label: "الكل", value: "All" },
    { label: "إزالة الشعر", value: "Hair Removal" },
    { label: "نضارة البشرة", value: "Skin" },
    { label: "التصبغات والكلف", value: "Pigmentation" },
    { label: "حب الشباب والآثار", value: "Acne" },
    { label: "شد البشرة", value: "Skin Tightening" },
  ];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
          شفافية ونتائج حقيقية
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
          معرض صور قبل وبعد العلاج
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          شاهدي نتائج الجلسات العلاجية والتجميلية الحقيقية لمراجعاتنا بالعيادة
          واستكشفي التغيير الملحوظ.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-3xl border border-pink-100 shadow-sm flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? "bg-[#2D1B28] text-white shadow-md"
                  : "bg-pink-50 text-slate-700 hover:bg-pink-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Before/After Interactive Comparison Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-96 bg-slate-100 animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-3xl border border-pink-100 shadow-md space-y-4 hover:shadow-lg transition-all"
              >
                <BeforeAfterSlider
                  beforeImage={item.beforeImage as string}
                  afterImage={item.afterImage as string}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <h3 className="font-bold text-lg text-[#2D1B28]">
                      {item.treatmentName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      منطقة العلاج: {item.bodyArea}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-100 text-[#2D1B28] text-xs font-bold px-3 py-1 rounded-full">
                      {item.sessionsCount} جلسات
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="لا توجد صور متوفرة لهذا التصنيف"
            description="يرجى اختيار تصنيف آخر لاستعراض نتائج الجلسات العلاجية."
          />
        )}
      </section>

      {/* Privacy Disclaimer Note */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/80 border border-amber-200 p-6 rounded-3xl flex items-start gap-4 text-xs text-amber-900 leading-relaxed shadow-2xs">
          <ShieldAlert size={24} className="text-amber-600 shrink-0 mt-0.5" />
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
