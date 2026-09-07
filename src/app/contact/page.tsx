import React from "react";
import { ataRepository } from "@/lib/repository";
import ContactForm from "@/components/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
} from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "İletişim & Konum | Ata Akademi İzmir Torbalı",
  description:
    "Ata Akademi iletişim bilgileri, resmi adresimiz, telefon numaramız ve Torbalı Tepeköy'deki yerleşkemize yol tarifi.",
};

export default function ContactPage() {
  const contactInfo = ataRepository.getContactInfo();

  return (
    <div className="pt-28 md:pt-32 pb-20 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 relative overflow-hidden shadow-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Bize Ulaşın
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            İletişim &amp; Torbalı Yerleşkemiz
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-montserrat">
            Eğitim programlarımız hakkında detaylı bilgi almak, seviyenizi ölçtürmek veya yerleşkemizi ziyaret etmek için bize dilediğiniz zaman ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Main Content: Info Cards & Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-ambient space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#712AE2] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-poppins font-bold text-lg text-slate-900">
                    Ata Akademi Resmi Adresi
                  </h3>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">
                    {contactInfo.address}
                  </p>
                  {contactInfo.addressNote && (
                    <p className="text-slate-400 text-xs pt-1">
                      {contactInfo.addressNote}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Phone & Email Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#712AE2] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-bold text-sm text-slate-900">
                  Telefon Hattımız
                </h4>
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="text-[#712AE2] font-semibold text-sm hover:underline block"
                >
                  {contactInfo.phone}
                </a>
                <span className="text-[11px] text-slate-400 block">
                  {contactInfo.workingHours?.summary || "Pzt - Cts: 09:00 - 20:00"}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#B4136D] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-bold text-sm text-slate-900">
                  E-Posta Adresimiz
                </h4>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[#B4136D] font-semibold text-sm hover:underline block truncate"
                >
                  {contactInfo.email}
                </a>
                <span className="text-[11px] text-slate-400 block">
                  7/24 Mesaj Gönderebilirsiniz
                </span>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <h4 className="font-poppins font-bold text-slate-900">
                  Çalışma Saatleri
                </h4>
                <div className="text-slate-600 space-y-0.5">
                  <div><strong>Hafta İçi (Pazartesi - Cuma):</strong> {contactInfo.workingHours?.weekdays}</div>
                  <div><strong>Cumartesi:</strong> {contactInfo.workingHours?.saturday}</div>
                  <div><strong>Pazar:</strong> {contactInfo.workingHours?.sunday}</div>
                </div>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm space-y-3 p-4">
              <div className="flex items-center justify-between px-2 pt-1">
                <span className="font-poppins font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-[#712AE2]" />
                  Harita &amp; Konum
                </span>
                <a
                  href={contactInfo.mapDirectUrl || `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#712AE2] hover:underline"
                >
                  Google Haritalarda Aç ↗
                </a>
              </div>
              <div className="w-full h-56 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <iframe
                  title="Ata Akademi Konum"
                  src={contactInfo.mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
