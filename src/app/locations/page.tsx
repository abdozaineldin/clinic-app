import React from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, Calendar, Building2 } from "lucide-react";
import { getBranches } from "@/lib/strapi";
import BranchMap from "@/components/branch-map";
import EmptyState from "@/components/empty-state";

export const revalidate = 60;

export default async function LocationsPage() {
  const branches = await getBranches();

  return (
    <div className="space-y-12 pb-20 pt-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-[#E29578] uppercase tracking-wider">
          تواجدنا بالقرب منكِ
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28]">
          فروع عيادات د. منال سرحان
        </h1>
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          تفضل بزيارة أقرب فرع لكِ في الرياض، جدة، والخبر للاستمتاع برعاية
          تجميلية استثنائية.
        </p>
      </section>

      {/* Interactive Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-3xl border border-pink-100 shadow-md">
          <BranchMap branches={branches} />
        </div>
      </section>

      {/* Branch Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#2D1B28]">
            قائمة الفروع والتفاصيل
          </h2>

          {branches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="relative h-48 w-full bg-rose-50 overflow-hidden">
                      <img
                        src={branch.image as string}
                        alt={branch.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 right-3 bg-[#2D1B28] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Building2 size={12} className="text-amber-300" />
                        <span>فرع تخصصي</span>
                      </span>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-bold text-lg text-[#2D1B28]">
                        {branch.name}
                      </h3>

                      <div className="space-y-2 text-xs text-slate-600">
                        <div className="flex items-start gap-2">
                          <MapPin
                            size={15}
                            className="text-[#E29578] shrink-0 mt-0.5"
                          />
                          <span>{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock
                            size={15}
                            className="text-[#E29578] shrink-0"
                          />
                          <span>{branch.workingHours}</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-[#2D1B28]">
                          <Phone
                            size={15}
                            className="text-[#E29578] shrink-0"
                          />
                          <span dir="ltr">{branch.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href="/booking"
                      className="w-full flex items-center justify-center gap-2 bg-[#E29578] hover:bg-[#d87b5b] text-white py-3 rounded-2xl text-xs font-bold shadow-md transition-colors"
                    >
                      <Calendar size={15} />
                      <span>احجزي في هذا الفرع</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </div>
  );
}
