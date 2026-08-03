import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/strapi";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#E29578]">
            الرئيسية
          </Link>
          <ChevronRight size={14} />
          <Link href="/services" className="hover:text-[#E29578]">
            الخدمات
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#2D1B28]">{service.title}</span>
        </div>
      </div>

      {/* Main Service Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-pink-100 text-[#2D1B28] text-xs font-bold px-3.5 py-1 rounded-full">
                {service.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
                {service.title}
              </h1>
              <p className="text-base text-slate-600 leading-relaxed font-medium">
                {service.shortDescription}
              </p>
            </div>

            <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-pink-100">
              <img
                src={service.image as string}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-[#2D1B28] border-r-4 border-[#E29578] pr-3">
                تفاصيل ودواعي العلاج
              </h3>
              <div className="text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line">
                {service.fullDescription}
              </div>

              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-pink-50/60">
                  <ShieldCheck size={24} className="text-[#E29578]" />
                  <div>
                    <h4 className="font-bold text-xs text-[#2D1B28]">
                      أمان تام ومعتمد
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      أجهزة ومواد حاصلة على الفود والدواء
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50/60">
                  <Sparkles size={24} className="text-amber-600" />
                  <div>
                    <h4 className="font-bold text-xs text-[#2D1B28]">
                      نتائج مستدامة
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      تحت إشراف مباشر من د. منال سرحان
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#2D1B28] text-white p-8 rounded-3xl shadow-xl border border-amber-500/20 space-y-6 sticky top-28">
              <div className="space-y-2 text-center">
                <span className="text-xs font-bold text-amber-300 uppercase">
                  حجز خدمة مخصصة
                </span>
                <h3 className="text-xl font-bold text-white">
                  هل ترغبين في حجز هذه الجلسة؟
                </h3>
                <p className="text-xs text-pink-200/80">
                  احجزي موعدكِ الآن وسيتم التواصل معكِ فوراً للتأكيد.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                  <span>استشارة أولية وتقييم حالة البشرة</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                  <span>متاحة في جميع فروعنا</span>
                </div>
              </div>

              <Link
                href="/booking"
                className="w-full flex items-center justify-center gap-2 bg-[#E29578] hover:bg-[#d87b5b] text-white py-3.5 rounded-full font-bold shadow-md text-sm transition-all"
              >
                <Calendar size={18} />
                <span>احجزي موعدكِ الآن</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
