"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Flower2, Calendar, PhoneCall } from "lucide-react";
import { gsap } from "@/lib/gsap";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  if (pathname?.startsWith("/admin")) return null;

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

  // يمنع أي overflow أفقي تسببه القائمة الجانبية (drawer) وهي "مخفية" خارج الشاشة،
  // وده اللي كان بيظهر منه شريط صغير من الجنب حتى لو القائمة مقفولة
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
  }, []);

  // حركة دخول واحدة للنافبار عند تحميل الصفحة (لحظة منسّقة واحدة بدل ما يظهر فجأة)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!headerRef.current || prefersReducedMotion) return;

    gsap.fromTo(
      headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.15, ease: "power3.out" }
    );
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "عن الدكتورة", href: "/about" },
    { name: "الخدمات", href: "/services" },
    { name: "الفروع", href: "/locations" },
    { name: "مركز التجميل", href: "/beauty-center" },
    // { name: "معرض قبل وبعد", href: "/gallery" },
    { name: "المقالات", href: "/blog" },
    { name: "الأسئلة الشائعة", href: "/faq" },
    // { name: "آراء العملاء", href: "/reviews" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-5 left-0 right-0 z-50 mx-3 sm:mx-4 lg:mx-6 rounded-full bg-white/60 backdrop-blur-md border border-pink-200 shadow-sm transition-all duration-300 overflow-hidden"
      >
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#2D1B28] to-[#E29578] flex items-center justify-center text-white font-bold shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
                <Flower2 size={22} className="text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold bg-gradient-to-l from-[#2D1B28] via-[#4A2D43] to-[#E29578] bg-clip-text text-transparent">
                  د. منال سرحان
                </span>
                <span className="hidden sm:block text-[11px] font-medium text-slate-500 tracking-wide">
                  استشارية الجلدية والتجميل والليزر
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/" && pathname === "");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive
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
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    duration: 0.25,
                    ease: "power2.out",
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }
                className="flex items-center gap-2 bg-gradient-to-r from-[#E29578] to-[#2D1B28] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-rose-200 hover:shadow-lg transition-shadow duration-300"
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
      </header>

      {/* Mobile & Tablet Side Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-xs z-[55] transition-opacity xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-dvh w-80 max-w-[85vw] bg-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out xl:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="shrink-0 p-5 bg-gradient-to-l from-[#2D1B28] to-[#4A2D43] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Flower2 size={18} className="text-amber-300" />
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
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
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
    </>
  );
}