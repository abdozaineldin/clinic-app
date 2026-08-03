import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  Heart,
  ShieldCheck,
  Gem,
  Image as ImageIcon,
} from "lucide-react";
import { getBeautyCenterData } from "@/lib/strapi";
import EmptyState from "@/components/empty-state";

export const revalidate = 60;

export default async function BeautyCenterPage() {
  const beauty = await getBeautyCenterData();

  return (
    <div className="space-y-16 pb-20 pt-6">
      {/* 1. Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-pink-100 min-h-[420px] flex items-center bg-[#2D1B28]">
          <img
            src={beauty.heroImage as string}
            alt="مركز التجميل والسبا الطبي"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="relative z-10 p-8 sm:p-14 max-w-2xl text-white space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Gem size={14} />
              <span>جناح التجميل والسبا الفاخر</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white">
              مركز د. منال سرحان للتجميل والسبا الطبي
            </h1>

            <p className="text-sm sm:text-base text-pink-100/90 leading-relaxed">
              {beauty.heroTagline}
            </p>

            <div>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-[#E29578] hover:bg-[#d87b5b] text-white px-8 py-3.5 rounded-full font-bold shadow-lg text-sm transition-all"
              >
                <Calendar size={18} />
                <span>احجزي تجربتكِ التجميلية الآن</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Services Icon Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#E29578] uppercase">
            خدمات الجمال والاسترخاء
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
            باقات تجديد النضارة والاستجمام
          </h2>
        </div>

        {beauty.featuredServices?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beauty.featuredServices.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all space-y-4 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-rose-100 to-amber-50 text-[#E29578] flex items-center justify-center shadow-inner">
                  <Sparkles size={26} />
                </div>
                <h3 className="font-bold text-lg text-[#2D1B28]">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {srv.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="bg-pink-50/50 py-16 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#E29578] uppercase">
              مميزات المركز
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
              لماذا يعتبر مركزنا وجهتكِ المثالية؟
            </h2>
          </div>

          {beauty.whyChooseUs?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beauty.whyChooseUs.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-pink-100 shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#E29578] flex items-center justify-center">
                    <Heart size={20} />
                  </div>
                  <h4 className="font-bold text-base text-[#2D1B28]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* 4. Horizontal Scrollable Interior Photo Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#E29578]">جولة مصورة</span>
            <h2 className="text-2xl font-bold text-[#2D1B28]">
              معرض صور أجنحة مركز التجميل
            </h2>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <ImageIcon size={16} />
            <span>اسحبي للاستعراض</span>
          </div>
        </div>

        {beauty.galleryImages?.length > 0 ? (
          <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-thin">
            {beauty.galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="w-72 sm:w-96 h-60 shrink-0 rounded-3xl overflow-hidden border border-pink-100 shadow-md group relative"
              >
                <img
                  src={imgUrl as string}
                  alt={`صورة المركز ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 5. Promotional CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D1B28] text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-amber-500/20 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-300">
            دللي نفسكِ بدورة نضارة وعناية فائقة في جناح السبا
          </h2>
          <p className="text-xs sm:text-sm text-pink-100/80 max-w-xl mx-auto leading-relaxed">
            استمتعي بأوقات الاسترخاء بين يدين خبيراتنا المتخصصات بأحدث التقنيات
            والمستحضرات العالمية.
          </p>
          <div>
            <Link
              href="/booking"
              className="bg-[#E29578] hover:bg-[#d87b5b] text-white px-8 py-3.5 rounded-full font-bold shadow-md text-xs sm:text-sm transition-all"
            >
              احجزي باقة التجميل الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
