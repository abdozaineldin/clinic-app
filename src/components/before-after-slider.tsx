"use client";

import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "قبل",
  afterLabel = "بعد",
  className = "",
}: BeforeAfterSliderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg border border-pink-100 group ${className}`}
    >
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeImage}
            alt="صورة قبل العلاج"
            style={{ objectFit: "cover" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterImage}
            alt="صورة بعد العلاج"
            style={{ objectFit: "cover" }}
          />
        }
        className="w-full h-72 sm:h-80 md:h-96"
      />
      {/* Overlay Badge Labels */}
      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-20">
        {beforeLabel}
      </div>
      <div className="absolute top-3 left-3 bg-[#E29578]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-20">
        {afterLabel}
      </div>
    </div>
  );
}
