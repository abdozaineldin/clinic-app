"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getBeautyCenterData } from "@/lib/supabase-data";
import { BeautyCenterPageData, WhyChooseUsItem } from "@/lib/types";
import { Save, Plus, Trash2, Edit3, CheckCircle, Sparkles, Image as ImageIcon, Heart } from "lucide-react";

export default function AdminBeautyCenterEditor() {
  const [data, setData] = useState<BeautyCenterPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  // Featured Services State
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [isServiceModal, setIsServiceModal] = useState(false);

  // Why Choose Us State
  const [whyTitle, setWhyTitle] = useState("");
  const [whyDesc, setWhyDesc] = useState("");
  const [isWhyModal, setIsWhyModal] = useState(false);

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

  const handleAddFeaturedService = async () => {
    if (!data || !serviceTitle || !serviceDesc) return;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      const { data: inserted, error } = await supabase
        .from("beauty_center_featured_services")
        .insert({
          title: serviceTitle,
          description: serviceDesc,
          icon_name: "Sparkles",
          sort_order: (data.featuredServices?.length || 0) + 1,
        })
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      if (inserted) {
        const newItem: WhyChooseUsItem = {
          id: inserted.id,
          title: inserted.title,
          description: inserted.description,
          iconName: inserted.icon_name || "Sparkles",
        };
        const updated = [...(data.featuredServices || []), newItem];
        setData({ ...data, featuredServices: updated });
        setIsServiceModal(false);
        setServiceTitle("");
        setServiceDesc("");
      }
    } else {
      const newItem: WhyChooseUsItem = {
        id: Date.now(),
        title: serviceTitle,
        description: serviceDesc,
        iconName: "Sparkles",
      };
      const updated = [...(data.featuredServices || []), newItem];
      setData({ ...data, featuredServices: updated });
      setIsServiceModal(false);
      setServiceTitle("");
      setServiceDesc("");
    }
  };

  const handleDeleteFeaturedService = async (id?: number) => {
    if (!data || !id) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      const { error } = await supabase
        .from("beauty_center_featured_services")
        .delete()
        .eq("id", id);
      if (error) {
        alert(error.message);
        return;
      }
    }
    setData({
      ...data,
      featuredServices: data.featuredServices.filter((s) => s.id !== id),
    });
  };

  const handleAddWhyChooseUs = async () => {
    if (!data || !whyTitle || !whyDesc) return;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      const { data: inserted, error } = await supabase
        .from("beauty_center_why_choose_us")
        .insert({
          title: whyTitle,
          description: whyDesc,
          icon_name: "Heart",
          sort_order: (data.whyChooseUs?.length || 0) + 1,
        })
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      if (inserted) {
        const newItem: WhyChooseUsItem = {
          id: inserted.id,
          title: inserted.title,
          description: inserted.description,
          iconName: inserted.icon_name || "Heart",
        };
        const updated = [...(data.whyChooseUs || []), newItem];
        setData({ ...data, whyChooseUs: updated });
        setIsWhyModal(false);
        setWhyTitle("");
        setWhyDesc("");
      }
    } else {
      const newItem: WhyChooseUsItem = {
        id: Date.now(),
        title: whyTitle,
        description: whyDesc,
        iconName: "Heart",
      };
      const updated = [...(data.whyChooseUs || []), newItem];
      setData({ ...data, whyChooseUs: updated });
      setIsWhyModal(false);
      setWhyTitle("");
      setWhyDesc("");
    }
  };

  const handleDeleteWhyChooseUs = async (id?: number) => {
    if (!data || !id) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      const { error } = await supabase
        .from("beauty_center_why_choose_us")
        .delete()
        .eq("id", id);
      if (error) {
        alert(error.message);
        return;
      }
    }
    setData({
      ...data,
      whyChooseUs: data.whyChooseUs.filter((w) => w.id !== id),
    });
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

      {/* Featured Services Section */}
      <div className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#eccec5]/40 pb-4">
          <h2 className="text-lg font-bold text-[#2d1b28]">باقات تجديد النضارة والاستجمام</h2>
          <button
            type="button"
            onClick={() => {
              setServiceTitle("");
              setServiceDesc("");
              setIsServiceModal(true);
            }}
            className="px-4 py-2 bg-[#2d1b28] hover:bg-[#1a0f1b] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة باقة جديدة</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.featuredServices?.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#fdf8f6] border border-[#eccec5]/60 flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-[#2d1b28] text-sm">{item.title}</h3>
                <p className="text-xs text-[#6e5c6b] mt-1">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteFeaturedService(item.id)}
                className="p-1.5 text-red-400 hover:text-red-600 transition shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#eccec5]/40 pb-4">
          <h2 className="text-lg font-bold text-[#2d1b28]">لماذا يعتبر مركزنا وجهتك المثالية؟</h2>
          <button
            type="button"
            onClick={() => {
              setWhyTitle("");
              setWhyDesc("");
              setIsWhyModal(true);
            }}
            className="px-4 py-2 bg-[#2d1b28] hover:bg-[#1a0f1b] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة ميزة جديدة</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.whyChooseUs?.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#fdf8f6] border border-[#eccec5]/60 flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-[#2d1b28] text-sm">{item.title}</h3>
                <p className="text-xs text-[#6e5c6b] mt-1">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteWhyChooseUs(item.id)}
                className="p-1.5 text-red-400 hover:text-red-600 transition shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

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

      {/* Modals */}
      {isServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[#2d1b28]">إضافة باقة جديدة</h3>
            <div>
              <label className="block text-xs font-semibold text-[#2d1b28] mb-1">العنوان</label>
              <input
                type="text"
                placeholder="عنوان الباقة"
                value={serviceTitle}
                onChange={(e) => setServiceTitle(e.target.value)}
                className="w-full p-2.5 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الوصف</label>
              <textarea
                rows={3}
                placeholder="وصف الباقة"
                value={serviceDesc}
                onChange={(e) => setServiceDesc(e.target.value)}
                className="w-full p-2.5 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsServiceModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs rounded-xl text-slate-700 transition font-semibold"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleAddFeaturedService}
                className="px-4 py-2 bg-[#e29578] hover:bg-[#d87b5b] text-white text-xs font-bold rounded-xl shadow transition"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {isWhyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[#2d1b28]">إضافة ميزة جديدة</h3>
            <div>
              <label className="block text-xs font-semibold text-[#2d1b28] mb-1">العنوان</label>
              <input
                type="text"
                placeholder="عنوان الميزة"
                value={whyTitle}
                onChange={(e) => setWhyTitle(e.target.value)}
                className="w-full p-2.5 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الوصف</label>
              <textarea
                rows={3}
                placeholder="وصف الميزة"
                value={whyDesc}
                onChange={(e) => setWhyDesc(e.target.value)}
                className="w-full p-2.5 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsWhyModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs rounded-xl text-slate-700 transition font-semibold"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleAddWhyChooseUs}
                className="px-4 py-2 bg-[#e29578] hover:bg-[#d87b5b] text-white text-xs font-bold rounded-xl shadow transition"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
