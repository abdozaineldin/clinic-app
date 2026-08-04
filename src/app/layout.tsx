import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "د. منال سرحان | مركز الجلدية والتجميل والعلاج بالليزر",
  description:
    "الموقع الرسمي لعيادات د. منال سرحان استشارية الأمراض الجلدية والتجميل والعلاج بالليزر. احجزي موعدك الآن للحصول على أحدث الخدمات التجميلية والعناية بالبشرة.",
  openGraph: {
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen flex flex-col bg-[#FDF8F6] text-[#2D1B28] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
