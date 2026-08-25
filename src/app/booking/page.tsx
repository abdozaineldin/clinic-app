import React, { Suspense } from "react";
import BookingFlow from "./booking-flow";
import { RefreshCw } from "lucide-react";

export const metadata = {
  title: "احجزي موعدكِ الآن | عيادات د. منال سرحان",
  description:
    "احجزي موعد استشارتكِ أو الجلسة التجميلية في عيادات د. منال سرحان للجلدية والتجميل والليزر بخطوات سهلة ومباشرة.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F6] py-10">
      <Suspense
        fallback={
          <div className="min-h-[500px] flex flex-col items-center justify-center space-y-4">
            <RefreshCw className="w-10 h-10 text-[#E29578] animate-spin" />
            <p className="text-slate-600 font-semibold text-sm">
              جاري تحميل نظام الحجز...
            </p>
          </div>
        }
      >
        <BookingFlow />
      </Suspense>
    </div>
  );
}
