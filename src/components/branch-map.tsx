"use client";

import React, { useEffect, useState } from "react";
import { BranchData } from "@/lib/types";

interface BranchMapProps {
  branches: BranchData[];
}

export default function BranchMap({ branches }: BranchMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">
        جاري تحميل الخريطة التفاعلية...
      </div>
    );
  }

  // Client-side rendering of Leaflet map dynamically
  return <ClientLeafletMap branches={branches} />;
}

function ClientLeafletMap({ branches }: { branches: BranchData[] }) {
  useEffect(() => {
    // Inject Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Initialize Leaflet
    import("leaflet").then((L) => {
      // Default center: Saudi Arabia / Riyadh
      const mapCenter: [number, number] =
        branches.length > 0
          ? [branches[0].latitude, branches[0].longitude]
          : [24.7136, 46.6753];

      const mapContainer = document.getElementById("leaflet-clinic-map");
      if (!mapContainer) return;

      // Clear any existing map instance on container
      (mapContainer as any)._leaflet_id = null;

      const map = L.map("leaflet-clinic-map").setView(mapCenter, 6);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Custom Pin Icon
      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `<div style="background-color: #2D1B28; color: #E29578; border: 2px solid #E29578; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-weight: bold; font-size: 16px;">📍</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });

      branches.forEach((branch) => {
        L.marker([branch.latitude, branch.longitude], {
          icon: customIcon,
        }).addTo(map).bindPopup(`
            <div style="font-family: Cairo, sans-serif; text-align: right; direction: rtl; padding: 4px;">
              <h4 style="margin: 0 0 6px 0; color: #2D1B28; font-weight: bold; font-size: 15px;">${branch.name}</h4>
              <p style="margin: 0 0 4px 0; font-size: 12px; color: #64748b;">${branch.address}</p>
              <p style="margin: 0; font-size: 12px; color: #E29578; font-weight: bold;">${branch.phone}</p>
            </div>
          `);
      });
    });
  }, [branches]);

  return (
    <div
      id="leaflet-clinic-map"
      className="w-full h-[420px] rounded-2xl border border-pink-200 shadow-lg overflow-hidden z-10"
    />
  );
}
