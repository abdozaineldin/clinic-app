"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getAboutPageData } from "@/lib/supabase-data";
import { AboutPageData, TimelineItem, CertificationItem, PressLogoItem } from "@/lib/types";
import { Save, Plus, Trash2, Edit3, CheckCircle, UserCheck } from "lucide-react";

export default function AdminAboutEditor() {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  // Timeline State
  const [timelineYear, setTimelineYear] = useState("");
  const [timelineTitle, setTimelineTitle] = useState("");
  const [timelineDesc, setTimelineDesc] = useState("");
  const [isTimelineModal, setIsTimelineModal] = useState(false);

  // Certifications State
  const [certName, setCertName] = useState("");
  const [isCertModal, setIsCertModal] = useState(false);

  // Press Logos State
  const [pressName, setPressName] = useState("");
  const [isPressModal, setIsPressModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      const about = await getAboutPageData();
      setData(about);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setSaving(true);
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        await supabase.from("about_page").upsert({
          id: 1,
          doctor_photo_url: typeof data.doctorPhoto === "string" ? data.doctorPhoto : "",
          bio: data.bio,
          philosophy_quote: data.philosophyQuote,
        });
      }
      setToast("تم حفظ بيانات الدكتورة بنجاح!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    const uploadedUrl = await uploadMediaFile(file, "doctor");
    if (data) {
      setData({ ...data, doctorPhoto: uploadedUrl });
    }
  };

  const handleAddTimeline = () => {
    if (!data || !timelineYear || !timelineTitle) return;
    const newItem: TimelineItem = {
      id: Date.now(),
      year: timelineYear,
      title: timelineTitle,
      description: timelineDesc,
    };
    const updated = [...data.timeline, newItem];
    setData({ ...data, timeline: updated });
    setIsTimelineModal(false);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      supabase.from("about_timeline").insert({
        year: timelineYear,
        title: timelineTitle,
        description: timelineDesc,
        sort_order: updated.length,
      });
    }
  };

  const handleDeleteTimeline = (id?: number) => {
    if (!data || !id) return;
    setData({ ...data, timeline: data.timeline.filter((t) => t.id !== id) });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      supabase.from("about_timeline").delete().eq("id", id);
    }
  };

  const handleAddCert = () => {
    if (!data || !certName) return;
    const newItem: CertificationItem = { id: Date.now(), name: certName };
    const updated = [...data.certifications, newItem];
    setData({ ...data, certifications: updated });
    setIsCertModal(false);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      supabase.from("about_certifications").insert({ name: certName, sort_order: updated.length });
    }
  };

  const handleDeleteCert = (id?: number) => {
    if (!data || !id) return;
    setData({ ...data, certifications: data.certifications.filter((c) => c.id !== id) });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      supabase.from("about_certifications").delete().eq("id", id);
    }
  };

  const handleAddPress = () => {
    if (!data || !pressName) return;
    const newItem: PressLogoItem = { id: Date.now(), name: pressName };
    const updated = [...data.pressLogos, newItem];
    setData({ ...data, pressLogos: updated });
    setIsPressModal(false);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      supabase.from("about_press_logos").insert({ name: pressName, sort_order: updated.length });
    }
  };

  const handleDeletePress = (id?: number) => {
    if (!data || !id) return;
    setData({ ...data, pressLogos: data.pressLogos.filter((p) => p.id !== id) });
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      supabase.from("about_press_logos").delete().eq("id", id);
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
          <h1 className="text-2xl font-bold text-[#2d1b28]">تعديل صفحة عن الدكتورة</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">إدارة السيرة الذاتية، التسلسل الزمني، الشهادات، والمشاركات الإعلامية</p>
        </div>
        {toast && (
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{toast}</span>
          </div>
        )}
      </div>

      {/* Main Doctor Bio Form */}
      <form onSubmit={handleSaveAbout} className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-[#2d1b28] pb-3 border-b border-[#eccec5]/40 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-[#e29578]" />
          <span>المعلومات الشخصية والسيرة الذاتية</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2d1b28] mb-1">السيرة الذاتية (Bio)</label>
              <textarea
                rows={5}
                value={data.bio}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                className="w-full px-4 py-3 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2d1b28] mb-1">المقولة / الفلسفة الطبية</label>
              <textarea
                rows={3}
                value={data.philosophyQuote}
                onChange={(e) => setData({ ...data, philosophyQuote: e.target.value })}
                className="w-full px-4 py-3 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2d1b28] mb-1">صورة الدكتورة الشخصية</label>
            <div className="space-y-3">
              {data.doctorPhoto && (
                <div className="w-40 h-48 rounded-2xl overflow-hidden border border-[#eccec5]">
                  <img
                    src={typeof data.doctorPhoto === "string" ? data.doctorPhoto : ""}
                    alt="Doctor"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handlePhotoUpload(e.target.files[0]);
                }}
                className="block w-full text-xs text-[#6e5c6b] file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#f4e7ce] file:text-[#2d1b28] cursor-pointer"
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
            <span>حفظ البيانات</span>
          </button>
        </div>
      </form>

      {/* Timeline Section */}
      <div className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#eccec5]/40 pb-4">
          <h2 className="text-lg font-bold text-[#2d1b28]">التسلسل الزمني والمسيرة الطبية</h2>
          <button
            onClick={() => {
              setTimelineYear("");
              setTimelineTitle("");
              setTimelineDesc("");
              setIsTimelineModal(true);
            }}
            className="px-4 py-2 bg-[#2d1b28] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة المحطة</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.timeline.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#fdf8f6] border border-[#eccec5]/60 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#e29578] bg-[#e29578]/10 px-2 py-0.5 rounded-md">{item.year}</span>
                <h3 className="font-bold text-[#2d1b28] text-sm mt-1">{item.title}</h3>
                <p className="text-xs text-[#6e5c6b] mt-1">{item.description}</p>
              </div>
              <button onClick={() => handleDeleteTimeline(item.id)} className="p-2 text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Press Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications */}
        <div className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#eccec5]/40 pb-3">
            <h2 className="text-base font-bold text-[#2d1b28]">الشهادات والاعتمادات</h2>
            <button
              onClick={() => { setCertName(""); setIsCertModal(true); }}
              className="px-3 py-1.5 bg-[#2d1b28] text-white font-semibold rounded-lg text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة</span>
            </button>
          </div>
          <div className="space-y-2">
            {data.certifications.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 bg-[#fdf8f6] rounded-xl border border-[#eccec5]/40 text-xs text-[#2d1b28]">
                <span>{c.name}</span>
                <button onClick={() => handleDeleteCert(c.id)} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Press Logos */}
        <div className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#eccec5]/40 pb-3">
            <h2 className="text-base font-bold text-[#2d1b28]">المشاركات الإعلامية والقنوات</h2>
            <button
              onClick={() => { setPressName(""); setIsPressModal(true); }}
              className="px-3 py-1.5 bg-[#2d1b28] text-white font-semibold rounded-lg text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة</span>
            </button>
          </div>
          <div className="space-y-2">
            {data.pressLogos.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-[#fdf8f6] rounded-xl border border-[#eccec5]/40 text-xs text-[#2d1b28]">
                <span>{p.name}</span>
                <button onClick={() => handleDeletePress(p.id)} className="text-red-400 hover:text-red-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isTimelineModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-[#2d1b28]">إضافة محطة زمنية</h3>
            <input type="text" placeholder="السنة (مثال: 2024)" value={timelineYear} onChange={(e) => setTimelineYear(e.target.value)} className="w-full p-2 bg-[#fdf8f6] border rounded-xl text-sm" />
            <input type="text" placeholder="العنوان" value={timelineTitle} onChange={(e) => setTimelineTitle(e.target.value)} className="w-full p-2 bg-[#fdf8f6] border rounded-xl text-sm" />
            <textarea placeholder="الوصف" value={timelineDesc} onChange={(e) => setTimelineDesc(e.target.value)} className="w-full p-2 bg-[#fdf8f6] border rounded-xl text-sm" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsTimelineModal(false)} className="px-4 py-2 bg-gray-100 text-xs rounded-xl">إلغاء</button>
              <button onClick={handleAddTimeline} className="px-4 py-2 bg-[#e29578] text-white text-xs font-bold rounded-xl">حفظ</button>
            </div>
          </div>
        </div>
      )}

      {isCertModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-[#2d1b28]">إضافة شهادة</h3>
            <input type="text" placeholder="اسم الشهادة" value={certName} onChange={(e) => setCertName(e.target.value)} className="w-full p-2 bg-[#fdf8f6] border rounded-xl text-sm" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsCertModal(false)} className="px-4 py-2 bg-gray-100 text-xs rounded-xl">إلغاء</button>
              <button onClick={handleAddCert} className="px-4 py-2 bg-[#e29578] text-white text-xs font-bold rounded-xl">حفظ</button>
            </div>
          </div>
        </div>
      )}

      {isPressModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-[#2d1b28]">إضافة جهة إعلامية</h3>
            <input type="text" placeholder="اسم القناه أو الجهة" value={pressName} onChange={(e) => setPressName(e.target.value)} className="w-full p-2 bg-[#fdf8f6] border rounded-xl text-sm" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsPressModal(false)} className="px-4 py-2 bg-gray-100 text-xs rounded-xl">إلغاء</button>
              <button onClick={handleAddPress} className="px-4 py-2 bg-[#e29578] text-white text-xs font-bold rounded-xl">حفظ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
