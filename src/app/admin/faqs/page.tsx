"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getFAQs } from "@/lib/supabase-data";
import { FAQData } from "@/lib/types";
import { Plus, Edit3, Trash2, HelpCircle, CheckCircle } from "lucide-react";

export default function AdminFAQsManager() {
  const [faqs, setFaqs] = useState<FAQData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQData | null>(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("الحجز");

  useEffect(() => {
    async function loadData() {
      const data = await getFAQs();
      setFaqs(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setQuestion("");
    setAnswer("");
    setCategory("الحجز");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: FAQData) => {
    setEditingFaq(f);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category);
    setIsModalOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !answer) return;

    const payload = { question, answer, category };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let savedId = editingFaq?.id || Date.now();

    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      if (editingFaq) {
        await supabase.from("faqs").update(payload).eq("id", editingFaq.id);
      } else {
        const { data } = await supabase.from("faqs").insert(payload).select().single();
        if (data) savedId = data.id;
      }
    }

    if (editingFaq) {
      setFaqs(
        faqs.map((f) => (f.id === editingFaq.id ? { ...f, question, answer, category } : f))
      );
    } else {
      setFaqs([...faqs, { id: savedId, question, answer, category }]);
    }

    setIsModalOpen(false);
    setToast("تم حفظ السؤال بنجاح!");
    setTimeout(() => setToast(""), 3000);
  };

  const handleDeleteFaq = async (id: string | number) => {
    if (!confirm("هل أنت تأكد من حذف هذا السؤال؟")) return;

    setFaqs(faqs.filter((f) => f.id !== id));
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("faqs").delete().eq("id", id);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">إدارة الأسئلة الشائعة</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">إضافة وتعديل الأسئلة الشائعة الموجهة للعملاء</p>
        </div>
        <div className="flex items-center gap-3">
          {toast && (
            <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{toast}</span>
            </div>
          )}
          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 bg-[#e29578] hover:bg-[#d87b5b] text-white font-bold rounded-xl shadow transition flex items-center gap-2 text-sm"
          >
            <Plus className="w-5 h-5" />
            <span>إضافة سؤال جديد</span>
          </button>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.id} className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm flex items-start justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#fdf8f6] border border-[#eccec5] text-[#2d1b28] text-xs font-bold rounded-md">
                {f.category}
              </span>
              <h3 className="font-extrabold text-[#2d1b28] text-base">{f.question}</h3>
              <p className="text-xs text-[#6e5c6b] leading-relaxed">{f.answer}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleOpenEdit(f)} className="p-2 text-[#6e5c6b] hover:text-[#e29578]">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDeleteFaq(f.id)} className="p-2 text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl border border-[#eccec5]">
            <h3 className="text-lg font-bold text-[#2d1b28]">
              {editingFaq ? "تعديل السؤال" : "إضافة سؤال جديد"}
            </h3>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">التصنيف</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                >
                  <option value="الحجز">الحجز</option>
                  <option value="الخدمات">الخدمات</option>
                  <option value="الدفع">الدفع</option>
                  <option value="الفروع">الفروع</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">السؤال</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الإجابة</label>
                <textarea
                  rows={4}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#e29578] hover:bg-[#d87b5b] text-white text-xs font-bold rounded-xl shadow"
                >
                  حفظ السؤال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
