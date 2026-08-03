import React from "react";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function EmptyState({
  title = "لا توجد بيانات حالياً",
  description = "لم يتم إضافة أي بيانات في هذا القسم بعد. سيتم تحديث المحتوى قريباً.",
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-white/70 backdrop-blur-md border border-rose-100 rounded-2xl shadow-sm my-6 ${className}`}
    >
      <div className="w-16 h-16 bg-pink-50 text-rose-400 rounded-full flex items-center justify-center mb-4 shadow-inner">
        <FolderOpen size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-md text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
