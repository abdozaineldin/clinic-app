"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getBeautyCenterData } from "@/lib/supabase-data";
import { BeautyCenterPageData, WhyChooseUsItem } from "@/lib/types";
import { Save, Plus, Trash2, Edit3, CheckCircle, Sparkles, Image as ImageIcon } from "lucide-react";

export default function AdminBeautyCenterEditor() {
  const [data, setData] = useState<BeautyCenterPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function loadData() {
      const bcData = await getBeautyCenterData();
      setData(bcData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        await supabase.from("beauty_center_page").upsert({
          id: 1,
          hero_image_url: typeof data.heroImage === "string" ? data.heroImage : "",
          hero_tagline: data.heroTagline,
        });
      }
      setToast("تم حفظ بيانات قسم سنتر التجميل بنجاح!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleHeroImageUpload = async (file: File) => {
    const uploadedUrl = await uploadMediaFile(file, "beauty_center");
    if (data) {
      setData({ ...data, heroImage: uploadedUrl });
    }
  };

  const handleGalleryUpload = async (file: File) => {
    const uploadedUrl = await uploadMediaFile(file, "beauty_center_gallery");
    if (data) {
      const updatedGallery = [...data.galleryImages, uploadedUrl];
      setData({ ...data, galleryImages: updatedGallery });

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        await supabase.from("beauty_center_gallery_images").insert({
          image_url: uploadedUrl,
          sort_order: updatedGallery.length,
        });
      }
    }
  };

  const handleDeleteGalleryImage = async (imgUrl: string) => {
    if (!data) return;
    const updatedGallery = data.galleryImages.filter((img) => img !== imgUrl);
    setData({ ...data, galleryImages: updatedGallery });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("beauty_center_gallery_images").delete().eq("image_url", imgUrl);
    }
  };

  if (loading || !data) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">إدارة صفحة سنتر التجميل</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">تحديث بانر الهيدر، المميزات، ومعرض صور سنتر التجميل</p>
        </div>
        {toast && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{toast}</span>
          </div>
        )}
      </div>

      {/* Main Single Row Form */}
      <form onSubmit={handleSavePage} className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#2d1b28] pb-3 border-b border-[#eccec5]/40 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#e29578]" />
          <span>الشعار وبانر سنتر التجميل</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#2d1b28] mb-1">
              العنوان الرئيسي / الشعار (Tagline)
            </label>
            <textarea
              rows={4}
              value={data.heroTagline}
              onChange={(e) => setData({ ...data, heroTagline: e.target.value })}
              className="w-full px-4 py-3 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm text-[#2d1b28]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d1b28] mb-1">
              صورة البانر الرئيسية
            </label>
            <div className="space-y-3">
              {data.heroImage && (
                <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-[#eccec5]">
                  <img
                    src={typeof data.heroImage === "string" ? data.heroImage : ""}
                    alt="Beauty Center Hero"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleHeroImageUpload(e.target.files[0]);
                }}
                className="block w-full text-xs text-[#6e5c6b] file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#f4e7ce] cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#e29578] hover:bg-[#d87b5b] text-white font-bold rounded-xl shadow transition flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" />
            <span>حفظ بيانات البانر</span>
          </button>
        </div>
      </form>

      {/* Gallery Images Section */}
      <div className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#eccec5]/40 pb-4">
          <h2 className="text-lg font-bold text-[#2d1b28]">معرض صور سنتر التجميل</h2>
          <label className="px-4 py-2 bg-[#2d1b28] hover:bg-[#1a0f1b] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow cursor-pointer">
            <Plus className="w-4 h-4" />
            <span>رفع صورة جديدة</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleGalleryUpload(e.target.files[0]);
              }}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.galleryImages.map((imgUrl, idx) => (
            <div key={idx} className="relative group w-full h-36 rounded-2xl overflow-hidden border border-[#eccec5]">
              <img src={typeof imgUrl === "string" ? imgUrl : ""} alt="Gallery" className="w-full h-full object-cover" />
              <button
                onClick={() => handleDeleteGalleryImage(typeof imgUrl === "string" ? imgUrl : "")}
                className="absolute top-2 left-2 p-2 bg-red-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
