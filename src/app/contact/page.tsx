"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { getBranches, sendContactMessage } from "@/lib/strapi";
import { BranchData } from "@/lib/types";
import BranchMap from "@/components/branch-map";

export default function ContactPage() {
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    getBranches().then(setBranches);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const res = await sendContactMessage(formData);
    setLoading(false);
    if (res.success) {
      setStatusMessage(
        res.message || "تم إرسال رسالتكِ بنجاح! شكراً للتواصل معنا.",
      );
      setFormData({ fullName: "", phone: "", email: "", message: "" });
    }
  };

  return (
    <div className="space-y-16 pb-20 pt-8">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
          نحن هنا لخدمتكِ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
          تواصل معنا وزيارة العيادة
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          يسعدنا استقبال استفساراتكِ ومساعدتكِ في تحديد أقرب فرع وموعد استشارة
          تجميلية.
        </p>
      </section>

      {/* Main Form & Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Info Card */}
          <div className="lg:col-span-5 bg-[#2D1B28] text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-amber-500/20 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase">
                المركز الرئيسي
              </span>
              <h2 className="text-2xl font-bold text-white">
                معلومات الإدارة والاستفسارات
              </h2>
              <p className="text-xs text-pink-200/80 leading-relaxed">
                تواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني وسيقوم فريق
                الاستقبال بالرد الفوري.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0 mt-1">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">
                    العنوان الرئيسي
                  </h4>
                  <p className="text-xs text-slate-300">النزل، القاهرة - مصر</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0 mt-1">
                  <Phone size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">
                    هاتف العيادة والواتساب
                  </h4>
                  <p className="text-xs text-slate-300" dir="ltr">
                    +20 123 456 7890
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0 mt-1">
                  <Mail size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">
                    البريد الإلكتروني
                  </h4>
                  <p className="text-xs text-slate-300">
                    info@drmanalsarhan.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0 mt-1">
                  <Clock size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">
                    أوقات العمل الرسمية
                  </h4>
                  <p className="text-xs text-slate-300">
                    السبت - الخميس: 10:00 صباحاً - 9:00 مساءً
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-pink-100 shadow-md space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#E29578]">
                أرسلي رسالتكِ
              </span>
              <h2 className="text-2xl font-bold text-[#2D1B28]">
                نموذج التواصل السريع
              </h2>
            </div>

            {statusMessage && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="مثال: سارة أحمد"
                    className="w-full px-4 py-3 bg-pink-50/40 border border-pink-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#E29578] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    رقم الجوال *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="05xxxxxxxx"
                    className="w-full px-4 py-3 bg-pink-50/40 border border-pink-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#E29578] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 bg-pink-50/40 border border-pink-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#E29578] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  الرسالة أو الاستفسار *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="اكتبي تفاصيل استفساركِ أو الخدمة المستهدفة..."
                  className="w-full px-4 py-3 bg-pink-50/40 border border-pink-200 rounded-xl text-xs text-slate-800 outline-none focus:border-[#E29578] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#E29578] hover:bg-[#d87b5b] text-white py-3.5 rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send size={16} />
                <span>
                  {loading ? "جاري الإرسال..." : "إرسال الرسالة الآن"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map & Branch Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#E29578] uppercase">
            خريطة الفروع
          </span>
          <h2 className="text-2xl font-bold text-[#2D1B28]">
            مواقع فروعنا التفاعلية
          </h2>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-pink-100 shadow-md">
          <BranchMap branches={branches} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {branches.map((b) => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-2xl border border-pink-100 shadow-xs space-y-2"
            >
              <h4 className="font-bold text-[#2D1B28] text-base">{b.name}</h4>
              <p className="text-xs text-slate-500">{b.address}</p>
              <p className="text-xs font-bold text-[#E29578]">{b.phone}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
