"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getBranches, getServices } from "@/lib/supabase-data";
import { BookingData, BranchData, ServiceData } from "@/lib/types";
import { CalendarCheck, CheckCircle, XCircle, Clock, Filter, Phone, Mail, User } from "lucide-react";

export default function AdminBookingsManager() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");

  useEffect(() => {
    async function loadData() {
      const [branchList, serviceList] = await Promise.all([
        getBranches(),
        getServices(),
      ]);
      setBranches(branchList);
      setServices(serviceList);

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (url && !url.includes("placeholder")) {
        const supabase = createClient();
        const { data } = await supabase
          .from("bookings")
          .select("*")
          .order("id", { ascending: false });

        if (data) {
          setBookings(
            data.map((item) => ({
              id: item.id,
              branch: item.branch_id,
              service: item.service_id,
              date: item.date,
              time: item.time,
              patientName: item.patient_name,
              patientPhone: item.patient_phone,
              patientEmail: item.patient_email,
              status: item.status,
              createdAt: item.created_at,
            }))
          );
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string | number, newStatus: "confirmed" | "cancelled") => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (branchFilter !== "all" && String(b.branch) !== String(branchFilter)) return false;
    if (dateFilter && b.date !== dateFilter) return false;
    return true;
  });

  const getBranchName = (bId: any) => {
    const id = typeof bId === "object" ? bId?.id : bId;
    const found = branches.find((br) => String(br.id) === String(id));
    return found ? found.name : `فرع #${id}`;
  };

  const getServiceName = (sId: any) => {
    const id = typeof sId === "object" ? sId?.id : sId;
    const found = services.find((sv) => String(sv.id) === String(id));
    return found ? found.title : `خدمة #${id}`;
  };

  if (loading) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">إدارة الحجوزات والمواعيد</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">متابعة الحجوزات، تصفية المواعيد حسب الفرع والتاريخ، وتأكيد أو إلغاء الحجز</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-3xl border border-[#eccec5]/60 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#2d1b28] mb-1">حالة الحجز</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
          >
            <option value="all">جميع الحالات</option>
            <option value="pending">معلق (بانتظار التأكيد)</option>
            <option value="confirmed">مؤكد</option>
            <option value="cancelled">ملغى</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#2d1b28] mb-1">الفرع</label>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
          >
            <option value="all">جميع الفروع</option>
            {branches.map((br) => (
              <option key={br.id} value={br.id}>
                {br.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#2d1b28] mb-1">التاريخ</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Bookings List / Table */}
      <div className="bg-white rounded-3xl border border-[#eccec5]/60 overflow-hidden shadow-sm">
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-[#6e5c6b]">لا توجد حجوزات تطابق خيارات البحث الحالية.</div>
        ) : (
          <div className="divide-y divide-[#eccec5]/40">
            {filteredBookings.map((b) => (
              <div key={b.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#fdf8f6]/50 transition">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-[#2d1b28] text-base">{b.patientName}</span>
                    <span className="px-2.5 py-0.5 bg-[#f4e7ce] text-[#2d1b28] text-xs font-bold rounded-md">
                      {getServiceName(b.service)}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${
                        b.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : b.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {b.status === "confirmed" ? "مؤكد" : b.status === "cancelled" ? "ملغى" : "معلق"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#6e5c6b]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#e29578]" />
                      <span>{b.date} - الساعة {b.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>الفرع: {getBranchName(b.branch)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span dir="ltr">{b.patientPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {b.status !== "confirmed" && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, "confirmed")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>تأكيد الحجز</span>
                    </button>
                  )}

                  {b.status !== "cancelled" && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, "cancelled")}
                      className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>إلغاء الحجز</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
