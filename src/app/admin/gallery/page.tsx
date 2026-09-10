"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getBeforeAfters } from "@/lib/supabase-data";
import { BeforeAfterData } from "@/lib/types";
import { Plus, Trash2, CheckCircle } from "lucide-react";

export default function AdminGalleryManager() {
  const [cases, setCases] = useState<BeforeAfterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getBeforeAfters();
      setCases(data);
      setLoading(false);
    }
    loadData();
  }, []);

 const handleImageUpload = async (file: File) => {
  setUploading(true);
  const url = await uploadMediaFile(file, "before_after");

  const payload = { image_url: url };
  let savedId: string | number = Date.now();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    const supabase = createClient();
    const { data, error } = await supabase.from("before_afters").insert(payload).select().single();

    if (error) {
      console.error("فشل حفظ الصورة:", error.message);
      setToast("حصل خطأ: " + error.message);
      setUploading(false);
      setTimeout(() => setToast(""), 4000);
      return;
    }

    if (data) savedId = data.id;
  }

  setCases((prev) => [...prev, { id: savedId, image: url }]);
  setUploading(false);
  setToast("تم رفع الصورة بنجاح!");
  setTimeout(() => setToast(""), 3000);
};

  const handleDeleteCase = async (id: string | number) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذه الصورة؟")) return;

    setCases(cases.filter((item) => item.id !== id));
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("before_afters").delete().eq("id", id);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">معرض نتائج الحالات (قبل وبعد)</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">ارفع صورة النتيجة وهتظهر في المعرض على طول</p>
        </div>
        <div className="flex items-center gap-3">
          {toast && (
            <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{toast}</span>
            </div>
          )}
          <label className="px-5 py-3 bg-[#e29578] hover:bg-[#d87b5b] text-white font-bold rounded-xl shadow transition flex items-center gap-2 text-sm cursor-pointer">
            <Plus className="w-5 h-5" />
            <span>{uploading ? "جاري الرفع..." : "إضافة صورة جديدة"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
              }}
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c) => (
          <div key={c.id} className="bg-white rounded-3xl border border-[#eccec5]/60 overflow-hidden shadow-sm">
            <img src={c.image} alt="Before/After" className="w-full h-64 object-cover" />
            <div className="p-3 bg-[#fdf8f6] border-t border-[#eccec5]/40 flex justify-end">
              <button
                onClick={() => handleDeleteCase(c.id)}
                className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-xl transition flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}