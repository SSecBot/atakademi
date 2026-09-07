import React from "react";
import { ataRepository } from "@/lib/repository";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contactInfo = ataRepository.getContactInfo();

  return (
    <footer className="bg-[#121416] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-12 h-12 relative flex-shrink-0 bg-white/5 rounded-xl p-1 border border-white/10">
                <img
                  src="/assets/logo.png"
                  alt="Ata Akademi"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-2xl tracking-tight text-white">
                  ATA <span className="text-[#EC4899]">AKADEMİ</span>
                </span>
                <span className="text-xs font-montserrat uppercase tracking-wider text-slate-400 font-semibold">
                  Torbalı / İzmir
                </span>
              </div>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              İzmir Torbalı&apos;nın öncü yabancı dil ve kişisel gelişim merkezi.
              Modern metodoloji, uzman eğitmenler ve konuşma odaklı programlarla
              geleceğinizi inşa edin.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={contactInfo.socialLinks?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-600/30 hover:text-purple-300 text-slate-400 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={contactInfo.socialLinks?.facebook || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-600/30 hover:text-purple-300 text-slate-400 flex items-center justify-center transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={contactInfo.socialLinks?.linkedin || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-600/30 hover:text-purple-300 text-slate-400 flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={contactInfo.socialLinks?.youtube || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-600/30 hover:text-purple-300 text-slate-400 flex items-center justify-center transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Courses Column */}
          <div>
            <h3 className="font-poppins font-semibold text-base text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#712AE2]" />
              Eğitim Programlarımız
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="/courses/ingilizce"
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Genel İngilizce (A1 - C1)
                </a>
              </li>
              <li>
                <a
                  href="/courses/almanca"
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Almanca (Goethe / Telc)
                </a>
              </li>
              <li>
                <a
                  href="/courses/hizli-okuma-ve-anlama"
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Yapay Zeka Destekli Hızlı Okuma
                </a>
              </li>
              <li>
                <a
                  href="/courses/diksiyon-ve-hitabet"
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Diksiyon &amp; Beden Dili
                </a>
              </li>
              <li>
                <a
                  href="/courses/romence"
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Romence Dil Eğitimi
                </a>
              </li>
              <li>
                <a
                  href="/courses/korece"
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Korece Dil Eğitimi
                </a>
              </li>
              <li>
                <a
                  href="/courses/italyanca"
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  İtalyanca Dil Eğitimi
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-poppins font-semibold text-base text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="/" className="hover:text-pink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-pink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Hakkımızda & Vizyon
                </a>
              </li>
              <li>
                <a href="/courses" className="hover:text-pink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Tüm Eğitimler
                </a>
              </li>
              <li>
                <a href="/instructors" className="hover:text-pink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Eğitmen Kadromuz
                </a>
              </li>
              <li>
                <a href="/reviews" className="hover:text-pink-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  Öğrenci Yorumları ve Başarılar
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Contact Column */}
          <div>
            <h3 className="font-poppins font-semibold text-base text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#712AE2]" />
              İletişim & Konum
            </h3>
            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EC4899] flex-shrink-0 mt-1" />
                <span className="leading-snug text-slate-300">
                  {contactInfo.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#712AE2] flex-shrink-0" />
                <a href={`tel:${contactInfo.phoneRaw}`} className="hover:text-white transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EC4899] flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-400 leading-relaxed">
                  <div>Hafta İçi &amp; Cts: {contactInfo.workingHours?.weekdays || "09:00 - 20:00"}</div>
                  <div>Pazar: {contactInfo.workingHours?.sunday || "10:00 - 18:00"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            © {currentYear} Ata Akademi. Tüm Hakları Saklıdır.
            &ensp;
            Made by{" "}
            <a
              href="https://digivideas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EC4899] hover:text-[#f472b6] font-semibold transition-colors underline-offset-4 hover:underline"
            >
              Digivideas
            </a>{" "}
            / 2026
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-slate-400">Torbalı / İzmir Premier Eğitim Merkezi</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="text-slate-400">MEB Standartlarına Uygun Müfredat</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
