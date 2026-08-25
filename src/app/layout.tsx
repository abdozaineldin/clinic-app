import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import ScrollToTop from "@/components/scroll-to-top";

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
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col bg-[#FDF8F6] text-[#2D1B28] antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
