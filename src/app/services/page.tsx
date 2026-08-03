"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowLeft, Filter } from "lucide-react";
import { getServices } from "@/lib/strapi";
import { ServiceData } from "@/lib/types";
import EmptyState from "@/components/empty-state";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  useEffect(() => {
    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const categories = [
    "الكل",
    "الليزر",
    "التجميل غير الجراحي",
    "العناية بالبشرة",
    "علاجات الشعر",
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "الكل" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
          حلول تجميلية متكاملة
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
          خدمات عيادة د. منال سرحان
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto">
          نقدم لكِ مجموعة شاملة من أرقى الخدمات الجلدية والتجميلية والعلاج
          بالليزر تحت إشراف طبي متخصص.
        </p>
      </section>

      {/* Search & Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-pink-100 shadow-md space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={20}
              className="absolute right-4 top-3.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="ابحثي عن خدمة تجميلية (بوتوكس، ليزر، هيدرافايشل...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-pink-50/40 border border-pink-200 rounded-2xl text-xs sm:text-sm text-slate-800 outline-none focus:border-[#E29578] transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1 ml-2">
              <Filter size={14} />
              <span>التصنيفات:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#2D1B28] text-white shadow-sm"
                    : "bg-pink-50 text-slate-700 hover:bg-pink-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 bg-slate-100 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative h-52 w-full overflow-hidden bg-rose-50">
                    <img
                      src={service.image as string}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-bold text-lg text-[#2D1B28] group-hover:text-[#E29578] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-pink-50 hover:bg-[#E29578] text-[#2D1B28] hover:text-white py-3 rounded-2xl text-xs font-bold transition-all duration-300"
                  >
                    <span>تفاصيل الخدمة وحجز الجلسة</span>
                    <ArrowLeft size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="لم يتم العثور على خدمات"
            description="لا توجد نتائج تطابق بحثكِ حالياً. جربي اختيار تصنيف آخر أو البحث بكلمات مختلفة."
          />
        )}
      </section>
    </div>
  );
}
