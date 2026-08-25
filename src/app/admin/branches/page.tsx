"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getBranches } from "@/lib/supabase-data";
import { BranchData } from "@/lib/types";
import { Plus, Edit3, Trash2, MapPin, Phone, Clock, Image as ImageIcon, Save, CheckCircle } from "lucide-react";

export default function AdminBranchesManager() {
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchData | null>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [phone, setPhone] = useState("");
  const [latitude, setLatitude] = useState<number>(30.0444);
  const [longitude, setLongitude] = useState<number>(31.2357);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getBranches();
      setBranches(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingBranch(null);
    setName("");
    setAddress("");
    setWorkingHours("السبت - الخميس: 9:00 صباحاً - 9:00 مساءً");
    setPhone("+20 123 456 7890");
    setLatitude(30.0444);
    setLongitude(31.2357);
    setImageUrl("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: BranchData) => {
    setEditingBranch(b);
    setName(b.name);
    setAddress(b.address);
    setWorkingHours(b.workingHours);
    setPhone(b.phone);
    setLatitude(b.latitude);
    setLongitude(b.longitude);
    setImageUrl(typeof b.image === "string" ? b.image : "");
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    const url = await uploadMediaFile(file, "branches");
    setImageUrl(url);
    setUploading(false);
  };

  const handleSaveBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) return;

    const branchPayload = {
      name,
      address,
      working_hours: workingHours,
      phone,
      latitude,
      longitude,
      image_url: imageUrl,
    };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let savedId = editingBranch?.id || Date.now();

    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      if (editingBranch) {
        await supabase.from("branches").update(branchPayload).eq("id", editingBranch.id);
      } else {
        const { data } = await supabase.from("branches").insert(branchPayload).select().single();
        if (data) savedId = data.id;
      }
    }

    if (editingBranch) {
      setBranches(
        branches.map((b) =>
          b.id === editingBranch.id
            ? { ...b, name, address, workingHours, phone, latitude, longitude, image: imageUrl }
            : b
        )
      );
    } else {
      setBranches([
        ...branches,
        {
          id: savedId,
          name,
          address,
          workingHours,
          phone,
          latitude,
          longitude,
          image: imageUrl,
        },
      ]);
    }

    setIsModalOpen(false);
    setToast("تم حفظ الفرع بنجاح!");
    setTimeout(() => setToast(""), 3000);
  };

  const handleDeleteBranch = async (id: string | number) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذا الفرع؟")) return;

    setBranches(branches.filter((b) => b.id !== id));
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("branches").delete().eq("id", id);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">إدارة الفروع والمواقع</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">إضافة وتعديل بيانات الفروع، أوقات العمل، وهواتف التواصل</p>
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
            <span>إضافة فرع جديد</span>
          </button>
        </div>
      </div>

      {/* Branches Table / Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((b) => (
          <div key={b.id} className="bg-white rounded-3xl border border-[#eccec5]/60 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              {b.image && (
                <div className="h-44 w-full overflow-hidden">
                  <img src={typeof b.image === "string" ? b.image : ""} alt={b.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 space-y-3">
                <h3 className="font-extrabold text-[#2d1b28] text-lg">{b.name}</h3>
                <div className="text-xs text-[#6e5c6b] space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#e29578] shrink-0" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#c99e55] shrink-0" />
                    <span>{b.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span dir="ltr">{b.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#fdf8f6] border-t border-[#eccec5]/40 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(b)}
                className="px-3 py-1.5 bg-white border border-[#eccec5] hover:border-[#e29578] text-[#2d1b28] text-xs font-semibold rounded-xl transition flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل</span>
              </button>
              <button
                onClick={() => handleDeleteBranch(b.id)}
                className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-xs font-semibold rounded-xl transition flex items-center gap-1"
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
              {editingBranch ? "تعديل بيانات الفرع" : "إضافة فرع جديد"}
            </h3>

            <form onSubmit={handleSaveBranch} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">اسم الفرع</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: فرع الزرقا"
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">العنوان التفصيلي</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">أوقات العمل</label>
                  <input
                    type="text"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">رقم الهاتف</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">خط العرض (Latitude)</label>
                  <input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">خط الطول (Longitude)</label>
                  <input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">صورة الفرع</label>
                {imageUrl && (
                  <div className="w-full h-32 rounded-xl overflow-hidden mb-2 border">
                    <img src={imageUrl} alt="Branch preview" className="w-full h-full object-cover" />
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
                  disabled={uploading}
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
