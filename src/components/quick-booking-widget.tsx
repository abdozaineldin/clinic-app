"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BranchData, ServiceData } from "@/lib/types";
import { MapPin, Sparkles, Calendar, ArrowLeft } from "lucide-react";

interface QuickBookingWidgetProps {
  branches: BranchData[];
  services: ServiceData[];
}

export default function QuickBookingWidget({
  branches,
  services,
}: QuickBookingWidgetProps) {
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

  const handleBookingRedirect = () => {
    const params = new URLSearchParams();
    if (selectedBranch) params.set("branch", selectedBranch);
    if (selectedService) params.set("service", selectedService);

    const queryString = params.toString();
    const targetUrl = queryString ? `/booking?${queryString}` : "/booking";
    router.push(targetUrl);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-pink-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center lg:text-right">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E29578] uppercase tracking-wider">
            <Sparkles size={14} />
            حجز سريع مباشر
          </span>
          <h3 className="text-xl font-bold text-[#2D1B28]">
            اختار الفرع والخدمة واحجز موعدك بضغطة زر
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Branch Select */}
          <div className="relative flex-1 lg:w-56">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#E29578]/50 transition-all cursor-pointer"
            >
              <option value="">اختار الفرع المناسب</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Service Select */}
          <div className="relative flex-1 lg:w-64">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#E29578]/50 transition-all cursor-pointer"
            >
              <option value="">اختار الخدمة المطلوبة</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Redirect Button */}
          <button
            type="button"
            onClick={handleBookingRedirect}
            className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#E29578] hover:bg-[#d87b5b] text-white px-7 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
          >
            <Calendar size={16} />
            <span>تأكيد وتوجيه للحجز</span>
            <ArrowLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
