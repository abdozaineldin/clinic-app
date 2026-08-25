"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(
          error.message.includes("Invalid login credentials")
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة."
            : error.message
        );
      } else {
        router.push(redirectTo);
        router.refresh();
      }
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-[#eccec5]/50 relative z-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#2d1b28] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#e29578] shadow-md">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#2d1b28]">لوحة التحكم الأطباء</h1>
        <p className="text-sm text-[#6e5c6b] mt-1">مركز د. منال سرحان للجلدية والتجميل</p>
      </div>

      {/* Error Notification */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#2d1b28] mb-2">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6e5c6b]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@example.com"
              required
              className="w-full pr-12 pl-4 py-3 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-[#2d1b28] placeholder-[#6e5c6b]/60 focus:outline-none focus:ring-2 focus:ring-[#e29578] transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#2d1b28] mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6e5c6b]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pr-12 pl-12 py-3 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-[#2d1b28] placeholder-[#6e5c6b]/60 focus:outline-none focus:ring-2 focus:ring-[#e29578] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e5c6b] hover:text-[#2d1b28] transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 px-6 bg-[#e29578] hover:bg-[#d87b5b] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isPending ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>تسجيل الدخول</span>
              <ArrowRight className="w-5 h-5 rotate-180" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-[#6e5c6b] hover:text-[#e29578] transition font-medium"
        >
          العودة للموقع الرئيسي
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#fdf8f6] flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#eccec5]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f4e7ce]/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <Suspense fallback={<div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
