"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Stethoscope,
  MapPin,
  CalendarCheck,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  Star,
  Plus,
} from "lucide-react";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    servicesCount: 6,
    branchesCount: 3,
    pendingBookingsCount: 0,
    unreadMessagesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!url || url.includes("placeholder")) {
          setLoading(false);
          return;
        }

        const supabase = createClient();
        const [
          { count: servicesCount },
          { count: branchesCount },
          { count: pendingBookingsCount },
          { count: unreadMessagesCount },
        ] = await Promise.all([
          supabase.from("services").select("*", { count: "exact", head: true }),
          supabase.from("branches").select("*", { count: "exact", head: true }),
          supabase
            .from("bookings")
            .select("*", { count: "exact", head: true })
            .eq("status", "pending"),
          supabase
            .from("contact_messages")
            .select("*", { count: "exact", head: true })
            .eq("is_read", false),
        ]);

        setStats({
          servicesCount: servicesCount ?? 6,
          branchesCount: branchesCount ?? 3,
          pendingBookingsCount: pendingBookingsCount ?? 0,
          unreadMessagesCount: unreadMessagesCount ?? 0,
        });
      } catch (err) {
        console.error("Error loading admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8" dir="rtl">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2d1b28] to-[#4a2e43] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e29578]/20 border border-[#e29578]/40 rounded-full text-xs text-[#eccec5] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>لوحة تحكم النظام</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">أهلاً بك، د. منال سرحان</h1>
          <p className="text-[#eccec5]/90 text-sm leading-relaxed">
            مرحباً بك في نظام إدارة المحتوى والخدمات الخاصة بالعيادة. يمكنك إدارة الفروع، الحجوزات، والخدمات بسهولة.
          </p>
        </div>
        <div className="z-10 flex flex-wrap gap-3">
          <Link
            href="/admin/bookings"
            className="px-5 py-3 bg-[#e29578] hover:bg-[#d87b5b] text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>متابعة الحجوزات</span>
          </Link>
          <Link
            href="/admin/services"
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition flex items-center gap-2 text-sm backdrop-blur-sm"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة خدمة</span>
          </Link>
        </div>
      </div>

      {/* Quick Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#eccec5]/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6e5c6b] font-medium">عدد الخدمات</p>
            <h3 className="text-3xl font-extrabold text-[#2d1b28] mt-1">
              {loading ? "..." : stats.servicesCount}
            </h3>
            <span className="inline-block mt-2 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
              نشطة حالياً
            </span>
          </div>
          <div className="w-14 h-14 bg-[#fdf8f6] border border-[#eccec5] rounded-2xl flex items-center justify-center text-[#e29578]">
            <Stethoscope className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eccec5]/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6e5c6b] font-medium">فروع العيادة</p>
            <h3 className="text-3xl font-extrabold text-[#2d1b28] mt-1">
              {loading ? "..." : stats.branchesCount}
            </h3>
            <span className="inline-block mt-2 text-xs text-[#2d1b28] font-semibold bg-[#f4e7ce] px-2 py-0.5 rounded-md">
              الزرقا والنزهة
            </span>
          </div>
          <div className="w-14 h-14 bg-[#fdf8f6] border border-[#eccec5] rounded-2xl flex items-center justify-center text-[#c99e55]">
            <MapPin className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eccec5]/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6e5c6b] font-medium">الحجوزات المعلقة</p>
            <h3 className="text-3xl font-extrabold text-[#2d1b28] mt-1">
              {loading ? "..." : stats.pendingBookingsCount}
            </h3>
            <span className="inline-block mt-2 text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
              تتطلب التأكيد
            </span>
          </div>
          <div className="w-14 h-14 bg-[#fdf8f6] border border-[#eccec5] rounded-2xl flex items-center justify-center text-amber-600">
            <CalendarCheck className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eccec5]/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-[#6e5c6b] font-medium">الرسائل غير المقروءة</p>
            <h3 className="text-3xl font-extrabold text-[#2d1b28] mt-1">
              {loading ? "..." : stats.unreadMessagesCount}
            </h3>
            <span className="inline-block mt-2 text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
              من استمارة التواصل
            </span>
          </div>
          <div className="w-14 h-14 bg-[#fdf8f6] border border-[#eccec5] rounded-2xl flex items-center justify-center text-blue-600">
            <MessageSquare className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Quick Navigation Sections Grid */}
      <div>
        <h2 className="text-xl font-bold text-[#2d1b28] mb-4">الوصول السريع لصفحات الإدارة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "إدارة الحجوزات",
              desc: "عرض جميع الحجوزات الواردة وتأكيدها أو إلغاؤها",
              href: "/admin/bookings",
              icon: CalendarCheck,
              color: "text-amber-600",
            },
            {
              title: "رسائل التواصل",
              desc: "مراجعة استفسارات الزوار الواردة من صفحة التواصل",
              href: "/admin/messages",
              icon: MessageSquare,
              color: "text-blue-600",
            },
            {
              title: "الخدمات الطبية",
              desc: "تعديل تفاصيل الخدمات وإضافة خدمات تجميلية جديدة",
              href: "/admin/services",
              icon: Stethoscope,
              color: "text-[#e29578]",
            },
            {
              title: "معرض قبل وبعد",
              desc: "إضافة وتحديث صور الحالات العلاجية والتجميلية",
              href: "/admin/gallery",
              icon: TrendingUp,
              color: "text-emerald-600",
            },
            {
              title: "المقالات والمدونة",
              desc: "نشر نصائح الطبية والمقالات التوعوية للمرضى",
              href: "/admin/articles",
              icon: FileText,
              color: "text-purple-600",
            },
            {
              title: "آراء وتقييمات المرضى",
              desc: "إدارة تقييمات العملاء وتجاربهم مع العيادة",
              href: "/admin/reviews",
              icon: Star,
              color: "text-yellow-500",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white p-6 rounded-2xl border border-[#eccec5]/60 hover:border-[#e29578] shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl bg-[#fdf8f6] ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#6e5c6b] group-hover:text-[#e29578] group-hover:-translate-x-1 transition" />
                </div>
                <h3 className="font-bold text-lg text-[#2d1b28] mb-1">{item.title}</h3>
                <p className="text-xs text-[#6e5c6b] leading-relaxed">{item.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
