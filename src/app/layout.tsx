import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ata Akademi | İzmir Torbalı Yabancı Dil ve Kişisel Gelişim Kursu",
  description:
    "Ata Akademi - İzmir Torbalı'da İngilizce, Almanca, Romence, Korece, İtalyanca, Hızlı Okuma ve Diksiyon eğitimleriyle geleceğinizi şekillendirin. Tepeköy, 4550. Sk. No:51/A, 35000 Torbalı/İzmir, İzmir, Türkiye.",
  keywords: [
    "Ata Akademi",
    "Torbalı İngilizce Kursu",
    "Torbalı Almanca Kursu",
    "Torbalı Dil Kursu",
    "İzmir Torbalı Hızlı Okuma",
    "Diksiyon Kursu Torbalı",
    "Romence Kursu",
    "Korece Kursu",
    "İtalyanca Kursu",
  ],
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "Ata Akademi | Yabancı Dil ve Kişisel Gelişim Kursu",
    description:
      "Modern eğitim yöntemleri ve uzman kadromuzla İzmir Torbalı'da hizmetinizdeyiz.",
    images: ["/assets/logo.png"],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F7F9FB] text-[#191C1E] antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
