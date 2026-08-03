import React from "react";
import Link from "next/link";
import {
  Award,
  Calendar,
  Sparkles,
  CheckCircle2,
  Quote,
  Newspaper,
} from "lucide-react";
import { getAboutPageData } from "@/lib/strapi";
import EmptyState from "@/components/empty-state";

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAboutPageData();

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-100/70 via-[#FDF8F6] to-pink-50 rounded-3xl p-8 sm:p-12 border border-pink-200 shadow-sm text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#E29578] tracking-widest uppercase">
            السيرة الذاتية والخبرة الطبية
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
            د. منال سرحان
          </h1>
          <p className="text-sm text-slate-600 font-medium">
            استشارية الأمراض الجلدية والتجميل والعلاج بالليزر - مسيرة حافلة
            بالخبرات والإنجازات الطبية
          </p>
        </div>
      </section>

      {/* 1. Doctor Profile & Bio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-8 sm:p-10 border border-pink-100 shadow-md">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-xl border-4 border-pink-50">
              {about.doctorPhoto ? (
                <img
                  src={about.doctorPhoto as string}
                  alt="د. منال سرحان"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-pink-50 flex items-center justify-center text-slate-400">
                  صورة الدكتورة غير متاحة
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-[#E29578] text-xs font-bold">
              <Sparkles size={14} />
              <span>خبرة تجاوزت 18 عاماً</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
              رؤية طبية متخصصة تجمع بين العلم والفن التجميلي
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {about.bio}
            </p>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="bg-gradient-to-r from-[#E29578] to-[#2D1B28] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                احجزي موعدكِ الآن مع الدكتورة
              </Link>
              <Link
                href="/services"
                className="bg-pink-50 text-[#2D1B28] px-6 py-3 rounded-full text-xs sm:text-sm font-bold hover:bg-pink-100 transition-colors"
              >
                استعرضي الخدمات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vertical Timeline Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold text-[#E29578] uppercase">
            مسيرة النجاح
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
            محطات في المسيرة العلمية والمهنية
          </h2>
        </div>

        {about.timeline?.length > 0 ? (
          <div className="relative border-r-2 border-rose-200 pr-6 mr-4 sm:mr-8 space-y-10">
            {about.timeline.map((item, index) => (
              <div key={index} className="relative group">
                {/* Timeline Pin Dot */}
                <div className="absolute -right-[33px] top-1.5 w-4 h-4 rounded-full bg-[#E29578] border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

                <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-pink-50 text-[#E29578] text-xs font-extrabold rounded-full">
                    {item.year}
                  </span>
                  <h3 className="font-bold text-base text-[#2D1B28]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 3. Certifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#E29578] uppercase">
            الشهادات والاعتمادات
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
            عضويات واعتمادات دولية رفيعة
          </h2>
        </div>

        {about.certifications?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm flex items-center gap-4 hover:border-rose-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Award size={24} />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#2D1B28] leading-snug">
                  {cert.name}
                </h4>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 4. Press & Media Logos Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-pink-50/60 rounded-3xl p-8 border border-pink-100 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#E29578]">
              ظهور إعلامي ومؤتمرات
            </span>
            <h3 className="text-xl font-bold text-[#2D1B28]">
              في وسائل الإعلام والمؤتمرات العلمية
            </h3>
          </div>

          {about.pressLogos?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {about.pressLogos.map((press, idx) => (
                <div
                  key={idx}
                  className="bg-white py-4 px-6 rounded-xl border border-pink-100 flex items-center justify-center font-bold text-slate-700 text-xs shadow-2xs hover:text-[#E29578] transition-colors"
                >
                  <Newspaper size={16} className="ml-2 text-rose-300" />
                  <span>{press.name || "تغطية صحفية"}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* 5. Philosophy Quote Banner with CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D1B28] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-500/20 text-center relative overflow-hidden space-y-6">
          <div className="flex justify-center text-amber-300 mb-2">
            <Quote size={40} className="rotate-180" />
          </div>

          <p className="text-base sm:text-xl font-bold max-w-3xl mx-auto leading-relaxed text-amber-100">
            "{about.philosophyQuote}"
          </p>

          <div className="pt-4 flex justify-center">
            <Link
              href="/booking"
              className="bg-[#E29578] hover:bg-[#d87b5b] text-white px-8 py-3.5 rounded-full font-bold shadow-lg text-xs sm:text-sm transition-all"
            >
              احجزي استشارتك الخاصة الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
