"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getBeforeAfters } from "@/lib/supabase-data";
import { BeforeAfterData } from "@/lib/types";
import { Plus, Edit3, Trash2, Images, CheckCircle } from "lucide-react";

export default function AdminGalleryManager() {
  const [cases, setCases] = useState<BeforeAfterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<BeforeAfterData | null>(null);

  const [treatmentName, setTreatmentName] = useState("");
  const [category, setCategory] = useState("Skin");
  const [sessionsCount, setSessionsCount] = useState<number>(4);
  const [bodyArea, setBodyArea] = useState("الوجه");
  const [beforeImage, setBeforeImage] = useState("");
  const [afterImage, setAfterImage] = useState("");

  useEffect(() => {
    async function loadData() {
      const data = await getBeforeAfters();
      setCases(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingCase(null);
    setTreatmentName("");
    setCategory("Skin");
    setSessionsCount(4);
    setBodyArea("الوجه");
    setBeforeImage("");
    setAfterImage("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: BeforeAfterData) => {
    setEditingCase(c);
    setTreatmentName(c.treatmentName);
    setCategory(c.category);
    setSessionsCount(c.sessionsCount);
    setBodyArea(c.bodyArea);
    setBeforeImage(typeof c.beforeImage === "string" ? c.beforeImage : "");
    setAfterImage(typeof c.afterImage === "string" ? c.afterImage : "");
    setIsModalOpen(true);
  };

  const handleBeforeUpload = async (file: File) => {
    const url = await uploadMediaFile(file, "before_after_before");
    setBeforeImage(url);
  };

  const handleAfterUpload = async (file: File) => {
    const url = await uploadMediaFile(file, "before_after_after");
    setAfterImage(url);
  };

  const handleSaveCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!treatmentName || !beforeImage || !afterImage) return;

    const payload = {
      treatment_name: treatmentName,
      category,
      sessions_count: sessionsCount,
      body_area: bodyArea,
      before_image_url: beforeImage,
      after_image_url: afterImage,
    };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let savedId = editingCase?.id || Date.now();

    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      if (editingCase) {
        await supabase.from("before_afters").update(payload).eq("id", editingCase.id);
      } else {
        const { data } = await supabase.from("before_afters").insert(payload).select().single();
        if (data) savedId = data.id;
      }
    }

    if (editingCase) {
      setCases(
        cases.map((item) =>
          item.id === editingCase.id
            ? {
              ...item,
              treatmentName,
              category,
              sessionsCount,
              bodyArea,
              beforeImage,
              afterImage,
            }
            : item
        )
      );
    } else {
      setCases([
        ...cases,
        {
          id: savedId,
          treatmentName,
          category,
          sessionsCount,
          bodyArea,
          beforeImage,
          afterImage,
        },
      ]);
    }

    setIsModalOpen(false);
    setToast("تم حفظ حالة المعرض بنجاح!");
    setTimeout(() => setToast(""), 3000);
  };

  const handleDeleteCase = async (id: string | number) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذه الحالة؟")) return;

    setCases(cases.filter((item) => item.id !== id));
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
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
          <p className="text-sm text-[#6e5c6b] mt-1">إضافة حالات قبل وبعد العلاج، عدد الجلسات، والمنطقة المعالجة</p>
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
            <span>إضافة حالة جديدة</span>
          </button>
        </div>
      </div>

      {/* Grid of Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c) => (
          <div key={c.id} className="bg-white rounded-3xl border border-[#eccec5]/60 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="grid grid-cols-2 h-44 border-b border-[#eccec5]/40 relative">
                <div className="relative border-r border-[#eccec5]">
                  <img src={typeof c.beforeImage === "string" ? c.beforeImage : ""} alt="Before" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-bold">قبل</span>
                </div>
                <div className="relative">
                  <img src={typeof c.afterImage === "string" ? c.afterImage : ""} alt="After" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-[#e29578] text-white text-[10px] px-2 py-0.5 rounded font-bold">بعد</span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-extrabold text-[#2d1b28] text-base">{c.treatmentName}</h3>
                <div className="flex items-center gap-2 text-xs text-[#6e5c6b]">
                  <span className="bg-[#fdf8f6] border border-[#eccec5] px-2 py-0.5 rounded-md font-semibold text-[#2d1b28]">{c.bodyArea}</span>
                  <span>•</span>
                  <span>{c.sessionsCount} جلسات</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#fdf8f6] border-t border-[#eccec5]/40 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(c)}
                className="px-3 py-1.5 bg-white border border-[#eccec5] text-[#2d1b28] text-xs font-semibold rounded-xl transition flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل</span>
              </button>
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl border border-[#eccec5] overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold text-[#2d1b28]">
              {editingCase ? "تعديل الحالة" : "إضافة حالة جديدة"}
            </h3>

            <form onSubmit={handleSaveCase} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">اسم العلاج / الإجراء</label>
                <input
                  type="text"
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  placeholder="مثال: علاج التصبغات وبقع الشمس"
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">التصنيف</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">المنطقة</label>
                  <input
                    type="text"
                    value={bodyArea}
                    onChange={(e) => setBodyArea(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">عدد الجلسات</label>
                  <input
                    type="number"
                    value={sessionsCount}
                    onChange={(e) => setSessionsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">صورة (قبل العلاج)</label>
                  {beforeImage && (
                    <div className="w-full h-28 rounded-xl overflow-hidden mb-2 border">
                      <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleBeforeUpload(e.target.files[0]);
                    }}
                    className="block w-full text-xs text-[#6e5c6b] file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-[#f4e7ce] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">صورة (بعد العلاج)</label>
                  {afterImage && (
                    <div className="w-full h-28 rounded-xl overflow-hidden mb-2 border">
                      <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleAfterUpload(e.target.files[0]);
                    }}
                    className="block w-full text-xs text-[#6e5c6b] file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-[#e29578] file:text-white cursor-pointer"
                  />
                </div>
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
                  حفظ الحالة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
