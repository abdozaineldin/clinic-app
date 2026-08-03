import React from "react";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Share2,
  Globe,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A0F1B] text-slate-300 pt-16 pb-8 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Clinic & Doctor Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E29578] to-[#D4AF37] flex items-center justify-center text-white shadow-md">
                <Sparkles size={20} className="text-[#1A0F1B]" />
              </div>
              <span className="text-xl font-extrabold text-white">
                د. منال سرحان
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              مركز د. منال سرحان المتخصص للجلدية والعلاج بالليزر والتجميل غير
              الجراحي. نقدم أحدث العلاجات الطبية المعتمدة بشرتكِ وجمالك بأعلى
              معايير الجودة والأمان.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E29578] hover:text-white flex items-center justify-center transition-colors text-amber-300"
                aria-label="إنستغرام"
              >
                <Share2 size={16} />
              </a>
              <a
                href="https://wa.me/201234567890"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-emerald-400"
                aria-label="واتساب"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E29578] hover:text-white flex items-center justify-center transition-colors text-amber-300"
                aria-label="الموقع الإلكتروني"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-r-4 border-[#E29578] pr-3">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#E29578] transition-colors"
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#E29578] transition-colors"
                >
                  عن الدكتورة منال سرحان
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E29578] transition-colors"
                >
                  قائمة الخدمات الطبية
                </Link>
              </li>
              <li>
                <Link
                  href="/beauty-center"
                  className="hover:text-[#E29578] transition-colors"
                >
                  مركز التجميل والسبا
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-[#E29578] transition-colors"
                >
                  معرض نتائج قبل وبعد
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="hover:text-[#E29578] transition-colors"
                >
                  فروعنا والتواصل
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Services Highlight */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-r-4 border-[#E29578] pr-3">
              خدماتنا المميزة
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E29578] transition-colors"
                >
                  إزالة الشعر بأحدث ليزر
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E29578] transition-colors"
                >
                  حقن البوتوكس والفيلر التجميلي
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E29578] transition-colors"
                >
                  تنظيف البشرة بالهيدرافايشل
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E29578] transition-colors"
                >
                  علاج الندبات والتصبغات بالفراكشنال
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E29578] transition-colors"
                >
                  علاجات تساقط الشعر والبلازما
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E29578] transition-colors"
                >
                  شد البشرة بدون جراحة (هاليفو)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base mb-4 border-r-4 border-[#E29578] pr-3">
              معلومات الاتصال
            </h3>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin size={16} className="text-[#E29578] shrink-0 mt-0.5" />
              <span>النزل، القاهرة - مصر (الفرع الرئيسي)</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Phone size={16} className="text-[#E29578] shrink-0" />
              <span dir="ltr">+966 11 456 7890</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail size={16} className="text-[#E29578] shrink-0" />
              <span>info@drmanalsarhan.com</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs pt-1 text-pink-200/80">
              <Clock size={16} className="text-amber-300 shrink-0 mt-0.5" />
              <span>السبت - الخميس: 10:00 صباحاً - 9:00 مساءً</span>
            </div>
          </div>
        </div>

        {/* Bottom Line Copyright (NO Privacy Policy Link!) */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} عيادات د. منال سرحان للجلدية والتجميل.
            جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-xs text-amber-200/80">
            <Link href="/faq" className="hover:underline">
              الأسئلة الشائعة
            </Link>
            <span>•</span>
            <Link href="/reviews" className="hover:underline">
              آراء العملاء
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:underline">
              اتصلي بنا
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
