import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Calendar,
  ChevronLeft,
  Award,
  Users,
  Building2,
  Stethoscope,
  ShieldCheck,
  HeartHandshake,
  UserCheck,
  MessageCircle,
  PhoneCall,
  Star,
  ArrowLeft,
} from "lucide-react";
import {
  getHomepageData,
  getServices,
  getBeforeAfters,
  getArticles,
  getReviews,
} from "@/lib/strapi";
import BeforeAfterSlider from "@/components/before-after-slider-client";
import EmptyState from "@/components/empty-state";

export const revalidate = 60;

export default async function HomePage() {
  const homepage = await getHomepageData();
  const allServices = await getServices();
  const allBeforeAfters = await getBeforeAfters();
  const allArticles = await getArticles();
  const allReviews = await getReviews();

  const featuredServices = allServices.slice(0, 6);
  const featuredBeforeAfters = allBeforeAfters.slice(0, 4);
  const recentArticles = allArticles.slice(0, 2);
  const featuredReviews = allReviews.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/60 via-[#FDF8F6] to-white py-16 md:py-24 border-b border-rose-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Right Text Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100/80 text-[#2D1B28] text-xs font-bold shadow-xs">
                <Sparkles size={14} className="text-[#E29578]" />
                <span>العيادة الطبية المعتمدة للجلدية والتجميل</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#2D1B28]">
                {homepage.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {homepage.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/booking"
                  className="flex items-center gap-2.5 bg-gradient-to-r from-[#E29578] to-[#2D1B28] text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-rose-200 hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                  <Calendar size={18} />
                  <span>احجزي موعدك الآن</span>
                </Link>

                <Link
                  href="/services"
                  className="flex items-center gap-2 bg-white text-[#2D1B28] border border-rose-200 px-6 py-3.5 rounded-full font-semibold shadow-xs hover:bg-rose-50 transition-colors"
                >
                  <span>استكشفي خدماتنا</span>
                  <ChevronLeft size={18} />
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-6 flex items-center gap-6 border-t border-rose-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#E29578]" />
                  <span>أجهزة حاصلة على اعتماد FDA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-[#D4AF37]" />
                  <span>استشارية سعودية معتمدة</span>
                </div>
              </div>
            </div>

            {/* Left Hero Image Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#E29578] to-[#D4AF37] rounded-3xl blur-2xl opacity-25" />
                <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white aspect-4/5">
                  {homepage.heroImage ? (
                    <img
                      src={homepage.heroImage as string}
                      alt="د. منال سرحان"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-rose-50 flex items-center justify-center text-rose-300">
                      لا تتوفر صورة
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-rose-100 shadow-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#2D1B28]">
                        د. منال سرحان
                      </h4>
                      <p className="text-xs text-slate-500">
                        استشارية الجلدية والتجميل
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-xs font-bold">
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span>4.9 / 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D1B28] text-white rounded-3xl p-8 shadow-xl border border-amber-500/20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10">
          <div className="space-y-1">
            <div className="flex justify-center text-amber-300 mb-2">
              <Award size={28} />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-300">
              +{homepage.statsYearsExperience}
            </div>
            <div className="text-xs text-pink-200/80">
              عاماً من الخبرة الطبية
            </div>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <div className="flex justify-center text-amber-300 mb-2">
              <Users size={28} />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-300">
              {homepage.statsHappyPatients}
            </div>
            <div className="text-xs text-pink-200/80">
              مراجعة سعيدة بالنتائج
            </div>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <div className="flex justify-center text-amber-300 mb-2">
              <Building2 size={28} />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-300">
              {homepage.statsBranchesCount}
            </div>
            <div className="text-xs text-pink-200/80">فروع تخصصية فاخرة</div>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <div className="flex justify-center text-amber-300 mb-2">
              <Stethoscope size={28} />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-300">
              {homepage.statsSpecialtiesCount}
            </div>
            <div className="text-xs text-pink-200/80">تخصص وإجراء تجميلي</div>
          </div>
        </div>
      </section>

      {/* 3. Quick Booking Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-pink-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-right">
              <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
                حجز سريع مباشر
              </span>
              <h3 className="text-xl font-bold text-[#2D1B28]">
                اختاري الفرع والخدمة واحجزي موعدكِ بضغطة زر
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <select className="flex-1 lg:w-48 px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl text-xs font-semibold text-slate-700 outline-none">
                <option>اختاري الفرع</option>
                <option>فرع الزرقا</option>
                <option>فرع النزل</option>
                <option>سنتر النزل</option>
              </select>

              <select className="flex-1 lg:w-56 px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl text-xs font-semibold text-slate-700 outline-none">
                <option>اختاري الخدمة المطلوبة</option>
                <option>إزالة الشعر بالليزر</option>
                <option>حقن البوتوكس والفيلر</option>
                <option>تنظيف الهيدرافايشل</option>
                <option>علاج التصبغات بالفراكشنال</option>
              </select>

              <Link
                href="/booking"
                className="w-full lg:w-auto bg-[#E29578] hover:bg-[#d87b5b] text-white px-7 py-3 rounded-xl text-sm font-bold shadow-md text-center transition-colors shrink-0"
              >
                تأكيد وتوجيه للحجز
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#E29578] uppercase tracking-widest">
            لماذا تختارين عيادتنا؟
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
            رعاية تجميلية فائقة الدقة والاحترافية
          </h2>
        </div>

        {homepage.whyChooseUs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepage.whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#E29578] flex items-center justify-center">
                  <Sparkles size={22} />
                </div>
                <h3 className="font-bold text-base text-[#2D1B28]">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 5. Featured Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-[#E29578]">
              علاجات متطورة
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
              أبرز الخدمات التجميلية
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-1 text-sm font-bold text-[#E29578] hover:text-[#2D1B28] transition-colors"
          >
            <span>عرض كل الخدمات</span>
            <ChevronLeft size={16} />
          </Link>
        </div>

        {featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-rose-50">
                  <img
                    src={service.image as string}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-[#2D1B28] group-hover:text-[#E29578] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D1B28] group-hover:text-[#E29578] transition-colors pt-2 border-t border-slate-100"
                  >
                    <span>التفاصيل الكاملة</span>
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 6. Before/After Preview */}
      <section className="bg-pink-50/50 py-16 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-[#E29578]">
                نتائج واقعية
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
                معرض نتائج قبل وبعد الجلسات
              </h2>
            </div>
            <Link
              href="/gallery"
              className="flex items-center gap-1 text-sm font-bold text-[#E29578] hover:text-[#2D1B28] transition-colors"
            >
              <span>عرض المزيد في المعرض</span>
              <ChevronLeft size={16} />
            </Link>
          </div>

          {featuredBeforeAfters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredBeforeAfters.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-3xl border border-pink-100 shadow-md space-y-4"
                >
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage as string}
                    afterImage={item.afterImage as string}
                  />
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h4 className="font-bold text-[#2D1B28] text-base">
                        {item.treatmentName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        منطقة العلاج: {item.bodyArea}
                      </p>
                    </div>
                    <span className="bg-pink-100 text-[#2D1B28] text-xs font-bold px-3 py-1 rounded-full">
                      {item.sessionsCount} جلسات
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* 7. Recent Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold text-[#E29578]">
              معلومات وطب تجميلي
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
              أحدث المقالات والنصائح الطبية
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm font-bold text-[#E29578] hover:text-[#2D1B28] transition-colors"
          >
            <span>الانتقال للمدونة</span>
            <ChevronLeft size={16} />
          </Link>
        </div>

        {recentArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group"
              >
                <div className="md:w-5/12 h-56 md:h-auto relative bg-rose-50 overflow-hidden">
                  <img
                    src={article.coverImage as string}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-7/12 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#E29578] bg-rose-50 px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <h3 className="font-bold text-lg text-[#2D1B28] group-hover:text-[#E29578] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                    <span>{article.publishedDate}</span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="font-bold text-[#2D1B28] group-hover:text-[#E29578] transition-colors"
                    >
                      قراءة المقال ←
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 8. Reviews Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#E29578]">
            آراء مراجعاتنا
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B28]">
            ثقة نعتز بها دائماً
          </h2>
        </div>

        {featuredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-pink-100 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    {rev.comment}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-rose-100">
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
                    <span className="text-[10px] text-[#E29578] font-medium">
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

      {/* 9. Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#2D1B28] via-[#4A2D43] to-[#2D1B28] rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden space-y-6">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-amber-300 tracking-widest uppercase">
              جاهزة لاستعادة نضارتكِ؟
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              احجزي استشارتكِ الطبية مع د. منال سرحان اليوم
            </h2>
            <p className="text-xs sm:text-sm text-pink-100/80 leading-relaxed">
              فريقنا الطبي بانتظارك لتقديم الاستشارة وتصميم الخطة العلاجية
              الأنسب لكِ.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/booking"
                className="bg-[#E29578] hover:bg-[#d87b5b] text-white px-8 py-3.5 rounded-full font-bold shadow-lg text-sm transition-all"
              >
                احجزي موعدك الآن
              </Link>
              <a
                href="https://wa.me/966114567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-full font-bold shadow-lg text-sm transition-all"
              >
                <MessageCircle size={18} />
                <span>تواصل عبر واتساب</span>
              </a>
              <a
                href="tel:+966114567890"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-full font-bold text-sm transition-all"
              >
                <PhoneCall size={18} />
                <span>اتصال مباشر</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
