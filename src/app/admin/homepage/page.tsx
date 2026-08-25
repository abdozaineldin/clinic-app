"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getHomepageData } from "@/lib/supabase-data";
import { HomepageData, WhyChooseUsItem } from "@/lib/types";
import { Save, Plus, Trash2, Edit3, Image as ImageIcon, CheckCircle, Sparkles } from "lucide-react";

export default function AdminHomepageEditor() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  // Modal / Why Choose Us State
  const [editingItem, setEditingItem] = useState<WhyChooseUsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemTitle, setItemTitle] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemIcon, setItemIcon] = useState("Sparkles");

  useEffect(() => {
    async function loadData() {
      const homeData = await getHomepageData();
      setData(homeData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSaveSingleRow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        await supabase.from("homepage").upsert({
          id: 1,
          hero_title: data.heroTitle,
          hero_subtitle: data.heroSubtitle,
          hero_image_url: typeof data.heroImage === "string" ? data.heroImage : "",
          stats_years_experience: data.statsYearsExperience,
          stats_happy_patients: data.statsHappyPatients,
          stats_branches_count: data.statsBranchesCount,
          stats_specialties_count: data.statsSpecialtiesCount,
        });
      }
      setToast("تم حفظ تغييرات الصفحة الرئيسية بنجاح!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleHeroImageUpload = async (file: File) => {
    const uploadedUrl = await uploadMediaFile(file, "homepage");
    if (data) {
      setData({ ...data, heroImage: uploadedUrl });
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setItemTitle("");
    setItemDesc("");
    setItemIcon("Sparkles");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: WhyChooseUsItem) => {
    setEditingItem(item);
    setItemTitle(item.title);
    setItemDesc(item.description);
    setItemIcon(item.iconName || "Sparkles");
    setIsModalOpen(true);
  };

  const handleSaveWhyChooseUs = async () => {
    if (!data || !itemTitle || !itemDesc) return;

    let updatedList = [...data.whyChooseUs];
    if (editingItem) {
      updatedList = updatedList.map((i) =>
        i.id === editingItem.id
          ? { ...i, title: itemTitle, description: itemDesc, iconName: itemIcon }
          : i
      );
    } else {
      const newItem: WhyChooseUsItem = {
        id: Date.now(),
        title: itemTitle,
        description: itemDesc,
        iconName: itemIcon,
      };
      updatedList.push(newItem);
    }

    setData({ ...data, whyChooseUs: updatedList });
    setIsModalOpen(false);

    // Sync to Supabase if configured
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      if (editingItem && editingItem.id) {
        await supabase
          .from("homepage_why_choose_us")
          .update({
            title: itemTitle,
            description: itemDesc,
            icon_name: itemIcon,
          })
          .eq("id", editingItem.id);
      } else {
        await supabase.from("homepage_why_choose_us").insert({
          title: itemTitle,
          description: itemDesc,
          icon_name: itemIcon,
          sort_order: updatedList.length,
        });
      }
    }
  };

  const handleDeleteWhyChooseUs = async (id?: number) => {
    if (!data || !id) return;
    const updatedList = data.whyChooseUs.filter((item) => item.id !== id);
    setData({ ...data, whyChooseUs: updatedList });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("homepage_why_choose_us").delete().eq("id", id);
    }
  };

  if (loading || !data) {
    return (
      <div className="p-8 text-center text-[#6e5c6b]">جاري تحميل البيانات...</div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">تعديل محتوى الصفحة الرئيسية</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">تحديث عنوان البانر، الأرقام والإحصائيات، ومميزات العيادة</p>
        </div>
        {toast && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{toast}</span>
          </div>
        )}
      </div>

      {/* Main Single Row Form */}
      <form onSubmit={handleSaveSingleRow} className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#2d1b28] pb-3 border-b border-[#eccec5]/40 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#e29578]" />
          <span>قسم الواجهة الهيدر (Hero Section)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2d1b28] mb-1">
                العنوان الرئيسي (Hero Title)
              </label>
              <input
                type="text"
                value={data.heroTitle}
                onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
                className="w-full px-4 py-3 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm text-[#2d1b28] focus:outline-none focus:ring-2 focus:ring-[#e29578]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d1b28] mb-1">
                الوصف الفرعي (Hero Subtitle)
              </label>
              <textarea
                rows={3}
                value={data.heroSubtitle}
                onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
                className="w-full px-4 py-3 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm text-[#2d1b28] focus:outline-none focus:ring-2 focus:ring-[#e29578]"
                required
              />
            </div>
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
                    alt="Hero Preview"
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
                className="block w-full text-xs text-[#6e5c6b] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#f4e7ce] file:text-[#2d1b28] hover:file:bg-[#e29578] hover:file:text-white transition cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <h2 className="text-lg font-bold text-[#2d1b28] pt-4 pb-3 border-b border-[#eccec5]/40">
          أرقام وإحصائيات العيادة
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#6e5c6b] mb-1">سنوات الخبرة</label>
            <input
              type="number"
              value={data.statsYearsExperience}
              onChange={(e) => setData({ ...data, statsYearsExperience: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm font-bold text-[#2d1b28]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6e5c6b] mb-1">عدد المرضى السعداء</label>
            <input
              type="text"
              value={data.statsHappyPatients}
              onChange={(e) => setData({ ...data, statsHappyPatients: e.target.value })}
              className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm font-bold text-[#2d1b28]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6e5c6b] mb-1">عدد الفروع</label>
            <input
              type="number"
              value={data.statsBranchesCount}
              onChange={(e) => setData({ ...data, statsBranchesCount: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm font-bold text-[#2d1b28]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6e5c6b] mb-1">التخصصات الطبية</label>
            <input
              type="number"
              value={data.statsSpecialtiesCount}
              onChange={(e) => setData({ ...data, statsSpecialtiesCount: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm font-bold text-[#2d1b28]"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#e29578] hover:bg-[#d87b5b] text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 text-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>حفظ البيانات الرئيسية</span>
          </button>
        </div>
      </form>

      {/* Why Choose Us Section */}
      <div className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#eccec5]/40 pb-4">
          <h2 className="text-lg font-bold text-[#2d1b28]">لماذا تختار عيادتنا (Why Choose Us)</h2>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#2d1b28] hover:bg-[#1a0f1b] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة ميزة</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.whyChooseUs.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#fdf8f6] border border-[#eccec5]/60 flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-[#2d1b28] text-sm">{item.title}</h3>
                <p className="text-xs text-[#6e5c6b] mt-1 leading-relaxed">{item.description}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="p-2 text-[#6e5c6b] hover:text-[#e29578] transition"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteWhyChooseUs(item.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl border border-[#eccec5]">
            <h3 className="text-lg font-bold text-[#2d1b28]">
              {editingItem ? "تعديل الميزة" : "إضافة ميزة جديدة"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">العنوان</label>
                <input
                  type="text"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الوصف</label>
                <textarea
                  rows={3}
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveWhyChooseUs}
                className="px-4 py-2 bg-[#e29578] hover:bg-[#d87b5b] text-white text-xs font-bold rounded-xl shadow"
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
