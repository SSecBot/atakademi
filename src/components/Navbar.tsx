"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Sparkles,
  ChevronRight,
  BookOpenCheck,
} from "lucide-react";
import { HomePageContent, ContactInfo } from "@/types";

const NAV_LINKS = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Kurslar", href: "/courses" },
  { name: "Hakkımızda", href: "/about" },
  { name: "Eğitmenler", href: "/instructors" },
  { name: "Öğrencilerimiz Ne Diyor", href: "/reviews" },
  { name: "İletişim", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null);

  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Fetch live site content and contact info for top notification bar
  useEffect(() => {
    fetch("/api/site-content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setHomeContent(data.data);
        }
      })
      .catch(() => {});

    fetch("/api/contact-info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setContactInfo(data.data);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const isNewRegistration = (homeContent?.siteMode || "NEW_REGISTRATION") === "NEW_REGISTRATION";
  const notificationText = isNewRegistration
    ? homeContent?.topBarNotification?.newRegistration || "Yeni Dönem Kayıtlarımız Başladı! Erken Kayıt Fırsatlarını Kaçırmayın."
    : homeContent?.topBarNotification?.activeTerm || "Aktif Dönem Derslerimiz Devam Ediyor. Yeni Gruplar & Ara Kayıtlar İçin İletişime Geçin.";

  const displayAddress = contactInfo?.address || "Tepeköy, 4550. Sk. No:51/A, 35000 Torbalı/İzmir, İzmir, Türkiye";
  const displayPhone = contactInfo?.phone || "(0232) 856 00 35";
  const displayPhoneRaw = contactInfo?.phoneRaw || "+902328560035";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Notification / Info Bar */}
      <div className="bg-[#191C1E] text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>{displayAddress}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-300">
              <Phone className="w-3.5 h-3.5 text-[#7C3AED]" />
              <a href={`tel:${displayPhoneRaw}`} className="hover:text-white transition-colors">
                {displayPhone}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              isNewRegistration
                ? "bg-pink-900/60 text-pink-300 border border-pink-700/50"
                : "bg-purple-900/60 text-purple-300 border border-purple-700/50"
            }`}>
              {isNewRegistration ? (
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#EC4899] animate-pulse" />
              ) : (
                <BookOpenCheck className="w-3.5 h-3.5 mr-1 text-purple-300" />
              )}
              {notificationText}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-header shadow-sm py-3"
            : "bg-white/95 backdrop-blur-md py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-105">
                <img
                  src="/assets/logo.png"
                  alt="Ata Akademi"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-xl sm:text-2xl tracking-tight text-[#191C1E] group-hover:text-[#712AE2] transition-colors">
                  ATA <span className="text-[#712AE2]">AKADEMİ</span>
                </span>
                <span className="text-[10px] sm:text-xs font-montserrat uppercase tracking-wider text-slate-500 font-semibold">
                  Dil & Kişisel Gelişim
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-montserrat font-medium transition-all duration-200 relative ${
                      isActive
                        ? "text-[#712AE2] font-semibold bg-purple-50"
                        : "text-[#444748] hover:text-[#712AE2] hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-[#712AE2] to-[#B4136D] rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="/contact"
                className="btn-gradient px-5 py-2.5 rounded-xl text-sm font-montserrat font-semibold shadow-md inline-flex items-center gap-1.5"
              >
                <span>{isNewRegistration ? "Erken Kayıt Ol" : "Hemen Başvur"}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a
                href="/contact"
                className="btn-gradient px-3.5 py-2 rounded-lg text-xs font-semibold sm:hidden"
              >
                {isNewRegistration ? "Kayıt" : "Başvur"}
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
                aria-label="Menüyü Aç"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#712AE2]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider px-3">
              Sayfa Menüsü
            </div>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-montserrat font-medium transition-colors ${
                    isActive
                      ? "bg-purple-50 text-[#712AE2] font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#712AE2]"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              );
            })}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 px-2">
              <a
                href="/contact"
                className="btn-gradient w-full text-center py-3 rounded-xl font-semibold text-sm shadow-md"
              >
                {isNewRegistration ? "Yeni Dönem Başvuru & Kayıt" : "Hemen Bilgi Al & Başvur"}
              </a>
              <div className="flex items-center justify-center text-xs text-slate-500 pt-2 px-1">
                <a href="tel:+902328560035" className="text-slate-600 font-semibold hover:text-[#712AE2] transition-colors">
                  Danışma Hattı: (0232) 856 00 35
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
