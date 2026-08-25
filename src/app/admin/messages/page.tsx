"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare, Mail, Phone, Clock, CheckCircle, Eye } from "lucide-react";

interface MessageItem {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesInbox() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        const { data } = await supabase
          .from("contact_messages")
          .select("*")
          .order("id", { ascending: false });

        if (data) {
          setMessages(
            data.map((item) => ({
              id: item.id,
              fullName: item.full_name,
              phone: item.phone,
              email: item.email,
              message: item.message,
              isRead: Boolean(item.is_read),
              createdAt: new Date(item.created_at || Date.now()).toLocaleDateString("ar-EG"),
            }))
          );
        }
      }
      setLoading(false);
    }
    loadMessages();
  }, []);

  const handleToggleRead = async (id: number, currentRead: boolean) => {
    const nextRead = !currentRead;
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, isRead: nextRead } : m))
    );

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase
        .from("contact_messages")
        .update({ is_read: nextRead })
        .eq("id", id);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">رسائل واستفسارات العملاء</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">عرض جميع الرسائل الواردة عبر نموذج تواصل معنا بالموقع</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#eccec5]/60 text-center text-[#6e5c6b]">
            لا توجد رسائل واردة حالياً.
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`p-6 rounded-3xl border transition shadow-sm space-y-3 ${
                m.isRead
                  ? "bg-white border-[#eccec5]/60 opacity-80"
                  : "bg-white border-[#e29578] ring-1 ring-[#e29578]/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      m.isRead ? "bg-gray-100 text-gray-600" : "bg-[#e29578] text-white"
                    }`}
                  >
                    {m.fullName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-[#2d1b28] text-base">{m.fullName}</h3>
                      {!m.isRead && (
                        <span className="px-2 py-0.5 bg-[#e29578] text-white text-[10px] font-bold rounded-full">
                          جديد
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#6e5c6b] mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span dir="ltr">{m.phone}</span>
                      </span>
                      {m.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-blue-600" />
                          <span>{m.email}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs text-[#6e5c6b] flex items-center gap-1 ml-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{m.createdAt}</span>
                  </span>
                  <button
                    onClick={() => handleToggleRead(m.id, m.isRead)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                      m.isRead
                        ? "bg-gray-50 border-gray-200 text-gray-700"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700"
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{m.isRead ? "تعليم كغير مقروء" : "تحديد كمقروء"}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#fdf8f6] rounded-2xl border border-[#eccec5]/40 text-xs text-[#2d1b28] leading-relaxed">
                {m.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
