"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Home,
  UserCheck,
  Sparkles,
  MapPin,
  Stethoscope,
  Images,
  FileText,
  HelpCircle,
  Star,
  CalendarCheck,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "الرئيسية", href: "/admin", icon: LayoutDashboard },
  { name: "محتوى الصفحة الرئيسية", href: "/admin/homepage", icon: Home },
  { name: "عن الدكتورة", href: "/admin/about", icon: UserCheck },
  { name: "سنتر التجميل", href: "/admin/beauty-center", icon: Sparkles },
  { name: "الفروع والمواقع", href: "/admin/branches", icon: MapPin },
  { name: "الخدمات الطبية", href: "/admin/services", icon: Stethoscope },
  { name: "معرض قبل وبعد", href: "/admin/gallery", icon: Images },
  { name: "المقالات والمدونة", href: "/admin/articles", icon: FileText },
  { name: "الأسئلة الشائعة", href: "/admin/faqs", icon: HelpCircle },
  { name: "تقييمات المرضى", href: "/admin/reviews", icon: Star },
  { name: "إدارة الحجوزات", href: "/admin/bookings", icon: CalendarCheck },
  { name: "رسائل التواصل", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Do not wrap layout if on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    }
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#fdf8f6] flex flex-col md:flex-row text-[#2d1b28]" dir="rtl">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#2d1b28] text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#e29578]" />
          <span className="font-bold text-lg">لوحة التحكم</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white/80 hover:text-white"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 right-0 z-40 h-screen w-72 bg-[#2d1b28] text-white flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } shadow-xl`}
      >
        <div>
          {/* Clinic Branding Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e29578] flex items-center justify-center text-white font-bold shadow">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-base leading-tight">د. منال سرحان</h2>
                <p className="text-xs text-[#eccec5]/80">لوحة إدارة العيادة</p>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="p-2 text-white/60 hover:text-[#e29578] transition"
              title="معاينة الموقع الرئيسي"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Nav Items List */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[#e29578] text-white shadow-md font-semibold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#eccec5]"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronLeft className="w-4 h-4" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-red-300 hover:bg-red-500/20 hover:text-red-200 font-medium text-sm transition"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
