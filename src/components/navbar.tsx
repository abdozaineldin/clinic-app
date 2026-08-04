"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Calendar, Globe, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<"AR" | "EN">("AR");
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "عن الدكتورة", href: "/about" },
    { name: "الخدمات", href: "/services" },
    { name: "الفروع", href: "/locations" },
    { name: "مركز التجميل", href: "/beauty-center" },
    { name: "معرض قبل وبعد", href: "/gallery" },
    { name: "المقالات", href: "/blog" },
    { name: "الأسئلة الشائعة", href: "/faq" },
    { name: "آراء العملاء", href: "/reviews" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  const toggleLanguage = () => {
    setLang((prev) => (prev === "AR" ? "EN" : "AR"));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm transition-all duration-300">
      {/* Top Banner Contact / Micro Bar */}
      <div className="bg-[#2D1B28] text-white py-1.5 px-4 text-xs font-medium border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Sparkles size={13} className="animate-pulse" />
              مرحباً بكِ في عيادات د. منال سرحان التخصصية
            </span>
            <span className="hidden sm:inline-block text-pink-200/60">|</span>
            <a
              href="tel:+966114567890"
              className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <PhoneCall size={12} />
              <span>+966 11 456 7890</span>
            </a>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 transition-all cursor-pointer"
              title="تغيير اللغة"
            >
              <Globe size={13} />
              <span className="font-bold">
                {lang === "AR" ? "العربية (AR)" : "English (EN)"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#2D1B28] to-[#E29578] flex items-center justify-center text-white font-bold shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
              <Sparkles size={22} className="text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold bg-gradient-to-l from-[#2D1B28] via-[#4A2D43] to-[#E29578] bg-clip-text text-transparent">
                د. منال سرحان
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                استشارية الجلدية والتجميل والليزر
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-[#E29578] bg-rose-50/80 shadow-xs"
                      : "text-slate-700 hover:text-[#2D1B28] hover:bg-pink-50/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button Desktop */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              href="/booking"
              className="flex items-center gap-2 bg-gradient-to-r from-[#E29578] to-[#2D1B28] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-rose-200 hover:shadow-lg hover:opacity-95 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Calendar size={16} />
              <span>احجزي موعدك الآن</span>
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Menu Trigger */}
          <div className="flex items-center xl:hidden gap-3">
            <Link
              href="/booking"
              className="flex items-center gap-1.5 bg-[#E29578] text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-sm"
            >
              <Calendar size={14} />
              <span>احجزي الآن</span>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="p-2.5 rounded-xl bg-pink-50 text-[#2D1B28] hover:bg-rose-100 transition-colors focus:outline-none"
              aria-label="افتح القائمة"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile & Tablet Side Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[55] transition-opacity xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out xl:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="shrink-0 p-5 bg-gradient-to-l from-[#2D1B28] to-[#4A2D43] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles size={18} className="text-amber-300" />
            </div>
            <div>
              <h2 className="font-bold text-base">د. منال سرحان</h2>
              <p className="text-[11px] text-pink-200/80">
                العيادة التخصصية للجلدية
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="إغلاق القائمة"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-rose-50 text-[#E29578] border-r-4 border-[#E29578]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer Call to Action */}
        <div className="shrink-0 p-5 border-t border-slate-100 bg-slate-50/80 space-y-3">
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-white transition-colors"
          >
            <Globe size={15} />
            <span>
              اللغة الحالية: {lang === "AR" ? "العربية" : "English"} (تبديل)
            </span>
          </button>

          <Link
            href="/booking"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E29578] to-[#2D1B28] text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-rose-200"
          >
            <Calendar size={18} />
            <span>احجزي موعدك الآن</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
