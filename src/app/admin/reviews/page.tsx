"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getReviews } from "@/lib/supabase-data";
import { ReviewData } from "@/lib/types";
import { Plus, Edit3, Trash2, Star, CheckCircle } from "lucide-react";

export default function AdminReviewsManager() {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewData | null>(null);

  const [patientName, setPatientName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [serviceTag, setServiceTag] = useState("إزالة الشعر بالليزر");
  const [postedDate, setPostedDate] = useState("منذ أيام");
  const [patientPhoto, setPatientPhoto] = useState("");

  useEffect(() => {
    async function loadData() {
      const data = await getReviews();
      setReviews(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingReview(null);
    setPatientName("");
    setRating(5);
    setComment("");
    setServiceTag("إزالة الشعر بالليزر");
    setPostedDate("منذ أيام");
    setPatientPhoto("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (r: ReviewData) => {
    setEditingReview(r);
    setPatientName(r.patientName);
    setRating(r.rating);
    setComment(r.comment);
    setServiceTag(r.serviceTag);
    setPostedDate(r.postedDate);
    setPatientPhoto(typeof r.patientPhoto === "string" ? r.patientPhoto : "");
    setIsModalOpen(true);
  };

  const handlePhotoUpload = async (file: File) => {
    const url = await uploadMediaFile(file, "reviews");
    setPatientPhoto(url);
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !comment) return;

    const payload = {
      patient_name: patientName,
      patient_photo_url: patientPhoto,
      rating,
      comment,
      service_tag: serviceTag,
      posted_date: postedDate,
    };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let savedId = editingReview?.id || Date.now();

    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      if (editingReview) {
        await supabase.from("reviews").update(payload).eq("id", editingReview.id);
      } else {
        const { data } = await supabase.from("reviews").insert(payload).select().single();
        if (data) savedId = data.id;
      }
    }

    if (editingReview) {
      setReviews(
        reviews.map((r) =>
          r.id === editingReview.id
            ? { ...r, patientName, rating, comment, serviceTag, postedDate, patientPhoto }
            : r
        )
      );
    } else {
      setReviews([
        ...reviews,
        { id: savedId, patientName, rating, comment, serviceTag, postedDate, patientPhoto },
      ]);
    }

    setIsModalOpen(false);
    setToast("تم حفظ التقييم بنجاح!");
    setTimeout(() => setToast(""), 3000);
  };

  const handleDeleteReview = async (id: string | number) => {
    if (!confirm("هل أنت تأكد من حذف هذا التقييم؟")) return;

    setReviews(reviews.filter((r) => r.id !== id));
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("reviews").delete().eq("id", id);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">إدارة آراء وتقييمات المرضى</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">إضافة وتعديل مراجعات العملاء وتجاربهم مع العيادة</p>
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
            <span>إضافة تقييم جديد</span>
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {r.patientPhoto ? (
                    <img src={typeof r.patientPhoto === "string" ? r.patientPhoto : ""} alt={r.patientName} className="w-10 h-10 rounded-full object-cover border" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#f4e7ce] text-[#2d1b28] font-bold flex items-center justify-center text-sm">
                      {r.patientName[0]}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-[#2d1b28] text-sm">{r.patientName}</h3>
                    <span className="text-xs text-[#6e5c6b]">{r.postedDate}</span>
                  </div>
                </div>
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              <span className="inline-block px-2.5 py-0.5 bg-[#fdf8f6] border border-[#eccec5] text-[#2d1b28] text-xs font-semibold rounded-md">
                {r.serviceTag}
              </span>

              <p className="text-xs text-[#6e5c6b] leading-relaxed italic">"{r.comment}"</p>
            </div>

            <div className="pt-3 border-t border-[#eccec5]/40 flex justify-end gap-2">
              <button onClick={() => handleOpenEdit(r)} className="px-3 py-1 bg-white border border-[#eccec5] text-[#2d1b28] text-xs rounded-xl">
                تعديل
              </button>
              <button onClick={() => handleDeleteReview(r.id)} className="px-3 py-1 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl border border-[#eccec5]">
            <h3 className="text-lg font-bold text-[#2d1b28]">
              {editingReview ? "تعديل التقييم" : "إضافة تقييم جديد"}
            </h3>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">اسم المريض</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الخدمة المتلقاه</label>
                  <input
                    type="text"
                    value={serviceTag}
                    onChange={(e) => setServiceTag(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">التقييم (من 1 إلى 5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">تعليق المريض</label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">صورة المريض (اختياري)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handlePhotoUpload(e.target.files[0]);
                  }}
                  className="block w-full text-xs text-[#6e5c6b] file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-[#f4e7ce] cursor-pointer"
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
                  حفظ التقييم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
