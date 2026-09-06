"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getServices } from "@/lib/supabase-data";
import { ServiceData } from "@/lib/types";
import { Plus, Edit3, Trash2, Stethoscope, Image as ImageIcon, CheckCircle } from "lucide-react";

function generateSafeSlug(title: string): string {
  const timestamp = Date.now().toString().slice(-6);
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // يشيل أي حرف مش إنجليزي أو رقم (يعني يشيل العربي تماماً)
    .trim()
    .replace(/\s+/g, "-") // يستبدل المسافات بشرطة
    .replace(/-+/g, "-"); // يمنع تكرار الشرطات

  return cleanTitle ? `${cleanTitle}-${timestamp}` : `service-${timestamp}`;
}

export default function AdminServicesManager() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("الليزر");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function loadData() {
      const data = await getServices();
      setServices(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingService(null);
    setTitle("");
    setSlug("");
    setCategory("الليزر");
    setShortDesc("");
    setFullDesc("");
    setImageUrl("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: ServiceData) => {
    setEditingService(s);
    setTitle(s.title);
    setSlug(s.slug);
    setCategory(s.category);
    setShortDesc(s.shortDescription);
    setFullDesc(s.fullDescription);
    setImageUrl(typeof s.image === "string" ? s.image : "");
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const url = await uploadMediaFile(file, "services");
    setImageUrl(url);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !shortDesc) return;

    const generatedSlug = slug || generateSafeSlug(title);
    const servicePayload = {
      title,
      slug: generatedSlug,
      category,
      short_description: shortDesc,
      full_description: fullDesc,
      image_url: imageUrl,
    };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let savedId = editingService?.id || Date.now();

    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      if (editingService) {
        await supabase.from("services").update(servicePayload).eq("id", editingService.id);
      } else {
        const { data } = await supabase.from("services").insert(servicePayload).select().single();
        if (data) savedId = data.id;
      }
    }

    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...s,
                title,
                slug: generatedSlug,
                category,
                shortDescription: shortDesc,
                fullDescription: fullDesc,
                image: imageUrl,
              }
            : s
        )
      );
    } else {
      setServices([
        ...services,
        {
          id: savedId,
          title,
          slug: generatedSlug,
          category,
          shortDescription: shortDesc,
          fullDescription: fullDesc,
          image: imageUrl,
        },
      ]);
    }

    setIsModalOpen(false);
    setToast("تم حفظ الخدمة بنجاح!");
    setTimeout(() => setToast(""), 3000);
  };

  const handleDeleteService = async (id: string | number) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذه الخدمة؟")) return;

    setServices(services.filter((s) => s.id !== id));
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("services").delete().eq("id", id);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">إدارة الخدمات الطبية والتجميلية</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">إضافة وتعديل الخدمات المعروضة للمرضى على الموقع</p>
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
            <span>إضافة خدمة جديدة</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.id} className="bg-white rounded-3xl border border-[#eccec5]/60 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {s.image && (
                <div className="h-44 w-full overflow-hidden">
                  <img src={typeof s.image === "string" ? s.image : ""} alt={s.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 space-y-3">
                <span className="inline-block px-3 py-1 bg-[#f4e7ce] text-[#2d1b28] text-xs font-bold rounded-md">
                  {s.category}
                </span>
                <h3 className="font-extrabold text-[#2d1b28] text-lg">{s.title}</h3>
                <p className="text-xs text-[#6e5c6b] leading-relaxed line-clamp-2">{s.shortDescription}</p>
              </div>
            </div>

            <div className="p-4 bg-[#fdf8f6] border-t border-[#eccec5]/40 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(s)}
                className="px-3 py-1.5 bg-white border border-[#eccec5] text-[#2d1b28] text-xs font-semibold rounded-xl transition flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل</span>
              </button>
              <button
                onClick={() => handleDeleteService(s.id)}
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
          <div className="bg-white rounded-3xl p-6 w-full max-w-xl space-y-4 shadow-2xl border border-[#eccec5] overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold text-[#2d1b28]">
              {editingService ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">اسم الخدمة</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: إزالة الشعر بالليزر"
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">التصنيف</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  >
                    <option value="الليزر">الليزر</option>
                    <option value="التجميل غير الجراحي">التجميل غير الجراحي</option>
                    <option value="العناية بالبشرة">العناية بالبشرة</option>
                    <option value="علاجات الشعر">علاجات الشعر</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الرابط الفريد (Slug)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="laser-hair-removal"
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الوصف المختصر</label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الوصف الشامل والتفاصيل</label>
                <textarea
                  rows={4}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">صورة الخدمة</label>
                {imageUrl && (
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-2 border">
                    <img src={imageUrl} alt="Service preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
                  }}
                  className="block w-full text-xs text-[#6e5c6b] file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#f4e7ce] cursor-pointer"
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
                  حفظ البيانات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}