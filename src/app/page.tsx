import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Calendar,
  ChevronLeft,
  Award,
  Users,
  Building2,
  Stethoscope,
  MessageCircle,
  Star,
  ArrowLeft,
  ShieldCheck,
  HeartHandshake,
  UserCheck,
  ClipboardCheck,
  Microscope,
} from "lucide-react";
import {
  getHomepageData,
  getServices,
  getBranches,
  getBeforeAfters,
  getArticles,
  getReviews,
} from "@/lib/supabase-data";
import BeforeAfterSlider from "@/components/before-after-slider-client";
import EmptyState from "@/components/empty-state";
import QuickBookingWidget from "@/components/quick-booking-widget";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/animated-counter";

export const revalidate = 60;

const whyChooseUsIcons = [
  Microscope,
  Award,
  ShieldCheck,
  HeartHandshake,
  UserCheck,
  ClipboardCheck,
];

export default async function HomePage() {
  const homepage = await getHomepageData();
  const allServices = await getServices();
  const allBranches = await getBranches();
  const allBeforeAfters = await getBeforeAfters();
  const allArticles = await getArticles();
  const allReviews = await getReviews();

  if (!homepage) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <EmptyState />
      </div>
    );
  }

  const featuredServices = allServices.slice(0, 6);
  const featuredBeforeAfters = allBeforeAfters.slice(0, 4);
  const recentArticles = allArticles.slice(0, 2);
  const featuredReviews = allReviews.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section — Editorial Overlap */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-[1600px] mx-auto relative">
          <Reveal
            as="div"
            variant="fade"
            delay={1}
            className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 items-center gap-3 rotate-90 origin-center"
          >
            <span className="text-[11px] tracking-[0.3em] text-[#2D1B28]/50 font-semibold whitespace-nowrap">
              منال سرحان كلينك · تأسست{" "}
              {homepage.statsYearsExperience
                ? new Date().getFullYear() -
                  Number(homepage.statsYearsExperience)
                : "٢٠٠٥"}
            </span>
            <span className="w-10 h-px bg-[#D4AF37]/50" />
          </Reveal>

          <div className="relative w-full h-[78vh] min-h-[560px] max-h-[760px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-[#D4AF37]/25 shadow-xl shadow-[#2D1B28]/15">
            {homepage.heroImage ? (
              <img
                src={homepage.heroImage as string}
                alt="عيادة د. منال سرحان"
                className="hero-kenburns absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-rose-50 flex items-center justify-center text-rose-300">
                لا تتوفر صورة
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-tr from-[#2D1B28]/50 via-[#2D1B28]/15 to-[#E29578]/5 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B28]/90 via-[#2D1B28]/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#2D1B28]/90 via-[#2D1B28]/50 to-transparent" />

            {/* Live availability chip */}
            <Reveal
              variant="fade"
              delay={0.4}
              className="absolute top-6 sm:top-8 right-6 sm:right-10 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full ps-3 pe-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-white/90 text-xs font-semibold">
                متاحة للحجز اليوم
              </span>
            </Reveal>

            {/* Bottom content — free-standing, no card */}
            <div className="absolute bottom-8 sm:bottom-12 md:bottom-14 right-6 sm:right-10 md:right-14 left-6 sm:left-10 md:left-14">
              <div className="max-w-2xl space-y-5">
                <Reveal variant="rise" delay={0.1}>
                  <p className="text-white/70 text-sm font-light [text-shadow:0_1px_10px_rgba(0,0,0,0.3)]">
                    {homepage.statsYearsExperience}+ عاماً خبرة ·{" "}
                    {homepage.statsBranchesCount} فروع · استشارية معتمدة
                  </p>
                </Reveal>

                <Reveal variant="rise" delay={0.25}>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]">
                    {homepage.heroTitle}
                  </h1>
                </Reveal>

                <Reveal variant="rise" delay={0.4}>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light max-w-lg [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]">
                    {homepage.heroSubtitle}
                  </p>
                </Reveal>

                <Reveal variant="rise" delay={0.55}>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href="/booking"
                      className="flex items-center gap-2 bg-[#E29578] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-black/20 hover:bg-[#d87b5b] hover:scale-[1.03] active:scale-95 transition-all"
                    >
                      <Calendar size={16} />
                      <span>احجزي موعدك الآن</span>
                    </Link>

                    <a
                      href="https://wa.me/201142832015"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-white/10 border border-white/25 text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-white/20 hover:scale-[1.03] active:scale-95 transition-all"
                    >
                      <MessageCircle size={16} />
                      <span>واتساب</span>
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Rating card overlapping the top edge of the frame */}
          <Reveal
            variant="scale"
            delay={0.7}
            duration={0.7}
            className="hidden md:flex absolute -top-6 left-10 lg:left-14 z-20 items-center gap-4 bg-white rounded-2xl shadow-xl shadow-[#2D1B28]/10 border border-pink-100 px-6 py-4"
          >
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={16} className="fill-amber-400" />
            </div>
            <div className="w-px h-8 bg-slate-100" />
            <div>
              <p className="text-lg font-extrabold text-[#2D1B28] leading-none">
                4.9 / 5
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                تقييم أكثر من {homepage.statsHappyPatients} مراجعة
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Stats Bar Section (Dark) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          variant="rise"
          className="bg-[#2D1B28] text-white rounded-3xl p-8 shadow-xl border border-amber-500/20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10"
          staggerChildren
          stagger={0.15}
        >
          <div className="space-y-1">
            <div className="flex justify-center text-amber-300 mb-2">
              <Award size={28} />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-300">
              <AnimatedCounter value={`+${homepage.statsYearsExperience}`} />
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
              <AnimatedCounter value={homepage.statsHappyPatients} />
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
              <AnimatedCounter value={homepage.statsBranchesCount} />
            </div>
            <div className="text-xs text-pink-200/80">فروع تخصصية فاخرة</div>
          </div>

          <div className="space-y-1 pt-4 md:pt-0">
            <div className="flex justify-center text-amber-300 mb-2">
              <Stethoscope size={28} />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-300">
              <AnimatedCounter value={homepage.statsSpecialtiesCount} />
            </div>
            <div className="text-xs text-pink-200/80">
              تخصص وإجراء تجميلي
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. Quick Booking Widget (Light) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="rise">
          <QuickBookingWidget branches={allBranches} services={allServices} />
        </Reveal>
      </section>

      {/* 4. Why Choose Us Section (Dark) */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#2D1B28] rounded-[2.5rem] px-6 sm:px-10 py-16 sm:py-20 relative overflow-hidden border border-amber-500/10 shadow-2xl">
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#E29578]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <Reveal
              variant="fade"
              className="relative text-center max-w-2xl mx-auto mb-12 space-y-3"
            >
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                لماذا تختار عيادتنا؟
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                رعاية تجميلية فائقة الدقة والاحترافية
              </h2>
            </Reveal>

            {homepage.whyChooseUs?.length > 0 ? (
              <Reveal
                variant="scale"
                staggerChildren
                stagger={0.12}
                className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {homepage.whyChooseUs.map((item, idx) => {
                  const ItemIcon =
                    whyChooseUsIcons[idx % whyChooseUsIcons.length];
                  return (
                    <div
                      key={idx}
                      className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 hover:bg-white/10 hover:-translate-y-1 transition-all space-y-3"
                    >
                      <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <ItemIcon size={22} />
                      </div>
                      <h3 className="font-bold text-base text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-pink-100/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </Reveal>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </section>

      {/* 5. Featured Services Preview (Light) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade" className="flex items-end justify-between mb-10">
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
        </Reveal>

        {featuredServices.length > 0 ? (
          <Reveal
            variant="scale"
            staggerChildren
            stagger={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col"
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
          </Reveal>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 6. Before/After Preview (Dark) */}
      <section className="bg-[#2D1B28] py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E29578]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative">
          <Reveal
            variant="slide-right"
            className="flex items-end justify-between"
          >
            <div>
              <span className="text-xs font-bold text-[#E29578]">
                نتائج واقعية
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                معرض نتائج قبل وبعد الجلسات
              </h2>
            </div>
            <Link
              href="/gallery"
              className="flex items-center gap-1 text-sm font-bold text-amber-300 hover:text-white transition-colors"
            >
              <span>عرض المزيد في المعرض</span>
              <ChevronLeft size={16} />
            </Link>
          </Reveal>

        {featuredBeforeAfters.length > 0 ? (
          <Reveal
            variant="rise"
            staggerChildren
            stagger={0.15}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {featuredBeforeAfters.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-3xl shadow-2xl overflow-hidden"
              >
                <img
                  src={item.image as string}
                  alt="نتيجة قبل وبعد"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            ))}
          </Reveal>
        ) : (
          <EmptyState />
        )}
        </div>
      </section>

      {/* 7. Recent Articles Preview (Light) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade" className="flex items-end justify-between mb-10">
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
        </Reveal>

        {recentArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentArticles.map((article, idx) => (
              <Reveal
                key={article.id}
                variant={idx % 2 === 0 ? "slide-right" : "slide-left"}
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
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      {/* 8. Reviews Preview (Dark) */}
      <section className="bg-[#2D1B28] py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Reveal
            variant="slide-right"
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-xs font-bold text-amber-300">
                آراء مراجعاتنا
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                ثقة نعتز بها دائماً
              </h2>
            </div>
            <Link
              href="/reviews"
              className="flex items-center gap-1 text-sm font-bold text-amber-300 hover:text-white transition-colors"
            >
              <span>عرض جميع التقييمات</span>
              <ChevronLeft size={16} />
            </Link>
          </Reveal>

          {featuredReviews.length > 0 ? (
            <Reveal
              variant="rise"
              staggerChildren
              stagger={0.15}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {featuredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-3 rounded-2xl shadow-lg overflow-hidden"
                >
                  <img
                    src={rev.image as string}
                    alt="تقييم مريض"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              ))}
            </Reveal>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* 9. Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          variant="scale"
          className="cta-shimmer bg-gradient-to-r from-[#2D1B28] via-[#4A2D43] to-[#2D1B28] rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden space-y-6"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-amber-300 tracking-widest uppercase">
              جاهز لاستعادة نضارتك؟
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              احجز استشارتك الطبية مع د. منال سرحان اليوم
            </h2>
            <p className="text-xs sm:text-sm text-pink-100/80 leading-relaxed">
              فريقنا الطبي بانتظارك لتقديم الاستشارة وتصميم الخطة العلاجية
              الأنسب لكِ.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/booking"
                className="bg-[#E29578] hover:bg-[#d87b5b] hover:scale-[1.03] active:scale-95 text-white px-8 py-3.5 rounded-full font-bold shadow-lg text-sm transition-all"
              >
                احجز موعدك الآن
              </Link>
              <a
                href="https://wa.me/201142832015"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.03] active:scale-95 text-white px-6 py-3.5 rounded-full font-bold shadow-lg text-sm transition-all"
              >
                <MessageCircle size={18} />
                <span>تواصل عبر واتساب</span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}