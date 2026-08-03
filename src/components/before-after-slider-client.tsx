"use client";

import dynamic from "next/dynamic";

const BeforeAfterSlider = dynamic(
  () => import("@/components/before-after-slider"),
  { ssr: false },
);

export default BeforeAfterSlider;
