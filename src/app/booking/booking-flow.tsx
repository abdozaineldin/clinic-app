"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Calendar,
  User,
  Mail,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  Building2,
  Check,
} from "lucide-react";
import {
  getBranches,
  getServices,
  getBookingsForBranchAndDate,
  createBooking,
} from "@/lib/supabase-data";
import { BranchData, ServiceData, BookingData } from "@/lib/types";

// Step titles and icons for the progress indicator
const STEPS = [
  { id: 1, title: "اختيار الفرع", icon: Building2 },
  { id: 2, title: "اختيار الخدمة", icon: Stethoscope },
  { id: 3, title: "التاريخ والوقت", icon: Calendar },
  { id: 4, title: "بيانات المريضة", icon: User },
  { id: 5, title: "مراجعة الحجز", icon: ShieldCheck },
  { id: 6, title: "تأكيد الحجز", icon: CheckCircle2 },
];

export default function BookingFlow() {
  const searchParams = useSearchParams();
  const preselectedBranchId = searchParams.get("branch");
  const preselectedServiceId = searchParams.get("service");

  // Step State (1 to 6)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Data Loaded State
  const [branches, setBranches] = useState<BranchData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // User Selection State
  const [selectedBranch, setSelectedBranch] = useState<BranchData | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [patientEmail, setPatientEmail] = useState<string>("");

  // Category Filter for Services
  const [activeCategory, setActiveCategory] = useState<string>("الكل");

  // Existing Bookings & Loading Slots
  const [existingBookings, setExistingBookings] = useState<BookingData[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Fetch Branches & Services on Mount
  useEffect(() => {
    async function loadInitialData() {
      setLoadingData(true);
      try {
        const [fetchedBranches, fetchedServices] = await Promise.all([
          getBranches(),
          getServices(),
        ]);
        setBranches(fetchedBranches);
        setServices(fetchedServices);

        // Handle URL pre-selections
        let initialStep = 1;
        if (preselectedBranchId) {
          const matchedBranch = fetchedBranches.find(
            (b) => String(b.id) === String(preselectedBranchId)
          );
          if (matchedBranch) {
            setSelectedBranch(matchedBranch);
            initialStep = 2;
          }
        }

        if (preselectedServiceId) {
          const matchedService = fetchedServices.find(
            (s) => String(s.id) === String(preselectedServiceId)
          );
          if (matchedService) {
            setSelectedService(matchedService);
            if (initialStep === 2) initialStep = 3;
          }
        }

        setCurrentStep(initialStep);
      } catch (err) {
        console.error("Failed to load initial booking data", err);
      } finally {
        setLoadingData(false);
      }
    }
    loadInitialData();
  }, [preselectedBranchId, preselectedServiceId]);

  // Set default date to today when entering Step 3
  useEffect(() => {
    if (currentStep === 3 && !selectedDate) {
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
    }
  }, [currentStep, selectedDate]);

  // Fetch taken slots when branch or date changes in Step 3
  useEffect(() => {
    async function fetchTakenSlots() {
      if (selectedBranch && selectedDate) {
        setLoadingSlots(true);
        try {
          const booked = await getBookingsForBranchAndDate(
            selectedBranch.id,
            selectedDate
          );
          setExistingBookings(booked);
        } catch (err) {
          console.error("Error fetching booked slots:", err);
          setExistingBookings([]);
        } finally {
          setLoadingSlots(false);
        }
      }
    }
    if (currentStep === 3) {
      fetchTakenSlots();
    }
  }, [selectedBranch, selectedDate, currentStep]);

  // Generate 30-min time slots between 9:00 AM and 9:00 PM
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    const times = [
      "09:00 AM", "09:30 AM",
      "10:00 AM", "10:30 AM",
      "11:00 AM", "11:30 AM",
      "12:00 PM", "12:30 PM",
      "01:00 PM", "01:30 PM",
      "02:00 PM", "02:30 PM",
      "03:00 PM", "03:30 PM",
      "04:00 PM", "04:30 PM",
      "05:00 PM", "05:30 PM",
      "06:00 PM", "06:30 PM",
      "07:00 PM", "07:30 PM",
      "08:00 PM", "08:30 PM",
      "09:00 PM",
    ];
    return times;
  };

  // Helper to convert 12h time string to Arabic display
  const formatTimeArabic = (timeStr: string) => {
    return timeStr
      .replace("AM", "صباحاً")
      .replace("PM", "مساءً");
  };

  // Check if slot is taken
  const isSlotTaken = (slotTime: string): boolean => {
    return existingBookings.some(
      (b) => b.time === slotTime || b.time === formatTimeArabic(slotTime)
    );
  };

  // Unique categories for services
  const categories = ["الكل", ...Array.from(new Set(services.map((s) => s.category).filter(Boolean)))];
  const filteredServices =
    activeCategory === "الكل"
      ? services
      : services.filter((s) => s.category === activeCategory);

  // Validation logic per step
  const canProceedToNext = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!selectedBranch;
      case 2:
        return !!selectedService;
      case 3:
        return !!selectedDate && !!selectedTime && !isSlotTaken(selectedTime);
      case 4:
        return (
          patientName.trim().length >= 3 &&
          patientPhone.trim().length >= 8 &&
          (!patientEmail || patientEmail.includes("@"))
        );
      case 5:
        return true;
      default:
        return false;
    }
  };

  // Handle final submission in Step 6
  const handleSubmitBooking = async () => {
    if (!selectedBranch || !selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const result = await createBooking({
      branch: selectedBranch.id,
      service: selectedService.id,
      date: selectedDate,
      time: selectedTime,
      patientName,
      patientPhone,
      patientEmail,
    });

    setIsSubmitting(false);

    if (result.success) {
      setBookingSuccess(true);
      setBookingRef(`MS-${Math.floor(100000 + Math.random() * 900000)}`);
      setCurrentStep(6);
    } else {
      setSubmissionError(
        result.error ||
        "عذراً، هذا الموعد تم حجزه قبل قليل بواسطة عميل آخر. يرجى اختيار موعد آخر."
      );
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-10 h-10 text-[#E29578] animate-spin" />
        <p className="text-slate-600 font-semibold text-sm">
          جاري تحميل بيانات الفروع والخدمات المتاحة...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
      {/* 1. Step Indicator Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100/80">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-none gap-2">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id || (step.id === 6 && bookingSuccess);
            const isCurrent = currentStep === step.id;

            return (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center gap-2.5 shrink-0 px-3 py-2 rounded-2xl transition-all ${isCurrent
                    ? "bg-[#2D1B28] text-white shadow-md font-bold scale-[1.02]"
                    : isCompleted
                      ? "bg-rose-50 text-[#E29578] font-semibold"
                      : "text-slate-400 font-medium"
                    }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isCurrent
                      ? "bg-[#E29578] text-white"
                      : isCompleted
                        ? "bg-[#E29578] text-white"
                        : "bg-slate-100 text-slate-500"
                      }`}
                  >
                    {isCompleted ? <Check size={14} /> : step.id}
                  </div>
                  <span className="text-xs sm:text-sm whitespace-nowrap">{step.title}</span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-6 sm:w-10 shrink-0 transition-colors ${isCompleted ? "bg-[#E29578]" : "bg-slate-100"
                      }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Main Step Content Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-100 min-h-[450px]">
        {/* STEP 1: Branch Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-rose-100 pb-4">
              <h2 className="text-2xl font-extrabold text-[#2D1B28]">
                الخطوة الأولى: اختاري الفرع الأقرب إليكِ
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                تتوفر خدماتنا في فروع مجهزة بأحدث التقنيات لخدمتكِ بأعلى مستويات الراحة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {branches.map((branch) => {
                const isSelected = selectedBranch?.id === branch.id;
                return (
                  <div
                    key={branch.id}
                    onClick={() => setSelectedBranch(branch)}
                    className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${isSelected
                      ? "border-[#E29578] ring-4 ring-[#E29578]/20 shadow-xl bg-pink-50/30 scale-[1.02]"
                      : "border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-md bg-white"
                      }`}
                  >
                    {/* Branch Image */}
                    <div className="h-44 relative w-full overflow-hidden bg-rose-50">
                      {branch.image ? (
                        <img
                          src={branch.image as string}
                          alt={branch.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Building2 size={40} />
                        </div>
                      )}
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-[#E29578] text-white p-1.5 rounded-full shadow-md">
                          <Check size={16} />
                        </div>
                      )}
                    </div>

                    {/* Branch Info */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-bold text-[#2D1B28]">
                        {branch.name}
                      </h3>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-[#E29578] shrink-0 mt-0.5" />
                          <span>{branch.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-[#E29578] shrink-0" />
                          <span>{branch.workingHours}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-[#E29578] shrink-0" />
                          <span>{branch.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Service Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-rose-100 pb-4">
              <h2 className="text-2xl font-extrabold text-[#2D1B28]">
                الخطوة الثانية: اختاري الخدمة الطبية أو التجميلية
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                خدمات متكاملة للعناية بالبشرة، إزالة الشعر بالليزر، والحقن التجميلي تحت إشراف د. منال سرحان.
              </p>
            </div>

            {/* Categories filter tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeCategory === cat
                    ? "bg-[#2D1B28] text-white shadow-md"
                    : "bg-pink-50 text-slate-600 hover:bg-rose-100/70"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredServices.map((service) => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`group relative rounded-2xl p-5 border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between ${isSelected
                      ? "border-[#E29578] ring-4 ring-[#E29578]/20 shadow-xl bg-pink-50/40 scale-[1.02]"
                      : "border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-md bg-white"
                      }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-[#2D1B28]">
                          {service.category}
                        </span>
                        {isSelected && (
                          <div className="bg-[#E29578] text-white p-1 rounded-full shadow-xs">
                            <Check size={14} />
                          </div>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-[#2D1B28]">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-rose-100/60 flex items-center justify-between text-xs font-bold text-[#E29578]">
                      <span>{isSelected ? "تم الاختيار" : "انقري للاختيار"}</span>
                      <ChevronLeft size={16} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Date & Time Selection */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-rose-100 pb-4">
              <h2 className="text-2xl font-extrabold text-[#2D1B28]">
                الخطوة الثالثة: اختاري التاريخ والوقت المناسب
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                يتم عرض المواعيد المتاحة فقط في{" "}
                <span className="font-bold text-[#2D1B28]">
                  {selectedBranch?.name}
                </span>{" "}
                لحجز خدمة{" "}
                <span className="font-bold text-[#2D1B28]">
                  {selectedService?.title}
                </span>
                .
              </p>
            </div>

            {/* Date Picker Input */}
            <div className="max-w-md bg-pink-50/50 p-4 rounded-2xl border border-pink-200 space-y-2">
              <label className="block text-xs font-bold text-[#2D1B28]">
                اختاري تاريخ الموعد:
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(""); // Reset selected time on date change
                }}
                className="w-full px-4 py-3 bg-white border border-pink-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-[#E29578]"
              />
            </div>

            {/* Time Slots Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#2D1B28]">
                  الأوقات المتاحة لهذا اليوم (من 9:00 صباحاً حتى 9:00 مساءً):
                </h4>
                {loadingSlots && (
                  <span className="flex items-center gap-1.5 text-xs text-[#E29578] font-bold animate-pulse">
                    <RefreshCw size={14} className="animate-spin" />
                    جاري التحقق من المواعيد المتاحة...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {generateTimeSlots().map((slotTime) => {
                  const taken = isSlotTaken(slotTime);
                  const isSelected = selectedTime === slotTime;

                  return (
                    <button
                      key={slotTime}
                      disabled={taken}
                      onClick={() => setSelectedTime(slotTime)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${taken
                        ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through"
                        : isSelected
                          ? "bg-[#2D1B28] border-[#2D1B28] text-white shadow-md scale-105 ring-2 ring-[#E29578]"
                          : "bg-white border-rose-200 text-slate-700 hover:border-[#E29578] hover:bg-rose-50/50"
                        }`}
                    >
                      <div>{formatTimeArabic(slotTime)}</div>
                      <div className="text-[10px] mt-1 font-medium">
                        {taken ? "محجوز" : isSelected ? "محدد" : "متاح"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Patient Info Form */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-rose-100 pb-4">
              <h2 className="text-2xl font-extrabold text-[#2D1B28]">
                الخطوة الرابعة: أدخلي بيانات التواصل
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                سنقوم بإرسال تأكيد الموعد والتفاصيل إلى رقم الهاتف والبريد الإلكتروني المكتوبين.
              </p>
            </div>

            <div className="max-w-xl space-y-4 pt-2">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2D1B28]">
                  الاسم بالكامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute right-3.5 top-3.5 text-slate-400" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="أدخلي اسمك الكامل"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-pink-50/30 border border-pink-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#E29578]"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2D1B28]">
                  رقم الهاتف (واتساب) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute right-3.5 top-3.5 text-slate-400" size={18} />
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="010XXXXXXXX"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-pink-50/30 border border-pink-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#E29578] text-right"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#2D1B28]">
                  البريد الإلكتروني (اختياري)
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-3.5 text-slate-400" size={18} />
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 bg-pink-50/30 border border-pink-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-[#E29578]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review Screen */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-rose-100 pb-4">
              <h2 className="text-2xl font-extrabold text-[#2D1B28]">
                الخطوة الخامسة: مراجعة كافة تفاصيل الحجز
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                يرجى التأكد من صحة كافة البيانات المختارة قبل تأكيد الطلب إلكترونياً.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50/60 to-white p-6 sm:p-8 rounded-3xl border border-pink-200 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Branch Info */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#E29578] uppercase">الفرع المختار</span>
                  <div className="flex items-center gap-3">
                    <Building2 className="text-[#2D1B28]" size={20} />
                    <div>
                      <h4 className="font-bold text-[#2D1B28]">{selectedBranch?.name}</h4>
                      <p className="text-xs text-slate-500">{selectedBranch?.address}</p>
                    </div>
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#E29578] uppercase">الخدمة المطلوبة</span>
                  <div className="flex items-center gap-3">
                    <Stethoscope className="text-[#2D1B28]" size={20} />
                    <div>
                      <h4 className="font-bold text-[#2D1B28]">{selectedService?.title}</h4>
                      <p className="text-xs text-slate-500">{selectedService?.category}</p>
                    </div>
                  </div>
                </div>

                {/* Date & Time Info */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#E29578] uppercase">الموعد المحدد</span>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-[#2D1B28]" size={20} />
                    <div>
                      <h4 className="font-bold text-[#2D1B28]">
                        تاريخ {selectedDate}
                      </h4>
                      <p className="text-xs text-slate-500 font-semibold">
                        الساعة: {formatTimeArabic(selectedTime)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#E29578] uppercase">بيانات المريضة</span>
                  <div className="flex items-center gap-3">
                    <User className="text-[#2D1B28]" size={20} />
                    <div>
                      <h4 className="font-bold text-[#2D1B28]">{patientName}</h4>
                      <p className="text-xs text-slate-500">{patientPhone}</p>
                      {patientEmail && (
                        <p className="text-xs text-slate-400">{patientEmail}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation Screen */}
        {currentStep === 6 && (
          <div className="text-center py-6 space-y-6">
            {bookingSuccess ? (
              <div className="max-w-lg mx-auto space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <CheckCircle2 size={48} />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold text-[#2D1B28]">
                    تم حجز موعدكِ بنجاح!
                  </h2>
                  <p className="text-sm text-slate-600">
                    شكراً لاختياركِ عيادات د. منال سرحان. سنقوم بالتواصل معكِ لتأكيد الحجز قبل الموعد.
                  </p>
                </div>

                <div className="bg-pink-50/60 rounded-3xl p-6 border border-pink-200 space-y-4 text-right">
                  <div className="flex items-center justify-between border-b border-pink-200/60 pb-3">
                    <span className="text-xs font-bold text-slate-500">رقم مرجع الحجز:</span>
                    <span className="text-base font-extrabold text-[#2D1B28] tracking-widest">
                      {bookingRef}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">الفرع:</span>
                      <span className="font-bold">{selectedBranch?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">الخدمة:</span>
                      <span className="font-bold">{selectedService?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">الموعد:</span>
                      <span className="font-bold">
                        {selectedDate} — {formatTimeArabic(selectedTime)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">اسم المريضة:</span>
                      <span className="font-bold">{patientName}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#2D1B28] hover:bg-[#1f121b] text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-all"
                >
                  <span>العودة للصفحة الرئيسية</span>
                  <ChevronLeft size={18} />
                </Link>
              </div>
            ) : submissionError ? (
              <div className="max-w-lg mx-auto space-y-6">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={36} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-rose-600">
                    تعذر إتمام الحجز
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {submissionError}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmissionError(null);
                    setCurrentStep(3); // Send user back to step 3 to choose another time
                  }}
                  className="inline-flex items-center gap-2 bg-[#E29578] hover:bg-[#d87b5b] text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-all cursor-pointer"
                >
                  <RefreshCw size={18} />
                  <span>العودة لاختيار موعد آخر</span>
                </button>
              </div>
            ) : null}
          </div>
        )}

        {/* 3. Navigation Controls (Next / Back) for steps 1..5 */}
        {currentStep <= 5 && (
          <div className="mt-10 pt-6 border-t border-rose-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-rose-200 text-slate-700 font-bold hover:bg-rose-50 transition-all cursor-pointer text-xs sm:text-sm"
              >
                <ChevronRight size={18} />
                <span>الخطوة السابقة</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                disabled={!canProceedToNext()}
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold shadow-md transition-all text-xs sm:text-sm cursor-pointer ${canProceedToNext()
                  ? "bg-[#E29578] hover:bg-[#d87b5b] text-white shadow-rose-200 hover:scale-[1.02]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                  }`}
              >
                <span>الخطوة التالية</span>
                <ChevronLeft size={18} />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitBooking}
                className="flex items-center gap-2 px-9 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-[#E29578] to-[#2D1B28] shadow-lg shadow-rose-200 hover:scale-[1.02] transition-all text-xs sm:text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>جاري تأكيد الموعد...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>تأكيد الحجز الآن</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
