"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  defaultCourse?: string;
}

const COURSES_OPTIONS = [
  "İngilizce (A1 - C2)",
  "Almanca (Goethe / Telc)",
  "Romence Eğitimi",
  "Korece & Hangul",
  "İtalyanca Eğitimi",
  "Yapay Zeka Destekli Hızlı Okuma ve Anlama",
  "Diksiyon & Hitabet",
  "Birebir Özel Ders",
  "Diğer / Genel Bilgi",
];

export default function ContactForm({ defaultCourse = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseInterest: defaultCourse || COURSES_OPTIONS[0],
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message:
            "Talebiniz başarıyla alındı! Eğitim danışmanlarımız en kısa sürede sizi arayacaktır.",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          courseInterest: COURSES_OPTIONS[0],
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Sunucu bağlantısında hata oluştu. Lütfen telefon ile ulaşın.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-ambient">
      <div className="mb-6">
        <h3 className="font-poppins font-bold text-2xl text-slate-900 mb-2">
          Hemen Bilgi Alın & Başvurun
        </h3>
        <p className="text-slate-600 text-sm">
          Formu doldurun, uzman eğitim danışmanımız seviye belirleme ve uygun ders saatleri için sizinle iletişime geçsin.
        </p>
      </div>

      {status.type === "success" && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Mesajınız İletildi!</div>
            <div>{status.message}</div>
          </div>
        </div>
      )}

      {status.type === "error" && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 text-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Hata Oluştu</div>
            <div>{status.message}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ad Soyad */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Adınız Soyadınız <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Örn: Ahmet Yılmaz"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#712AE2] text-sm text-slate-900 transition-all bg-slate-50/50"
          />
        </div>

        {/* Telefon & E-Posta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Telefon Numarası <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="0 (5XX) XXX XX XX"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#712AE2] text-sm text-slate-900 transition-all bg-slate-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              E-Posta Adresi
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ahmet@ornek.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#712AE2] text-sm text-slate-900 transition-all bg-slate-50/50"
            />
          </div>
        </div>

        {/* İlgilendiğiniz Eğitim */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            İlgilendiğiniz Eğitim Programı
          </label>
          <select
            value={formData.courseInterest}
            onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#712AE2] text-sm text-slate-900 transition-all bg-slate-50/50"
          >
            {COURSES_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Mesaj */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Mesajınız veya Sorularınız <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Hangi seviyede olduğunuzu, katılmak istediğiniz gün/saatleri veya sormak istediklerinizi yazabilirsiniz..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#712AE2] text-sm text-slate-900 transition-all bg-slate-50/50 resize-none"
          />
        </div>

        {/* Gönder Butonu */}
        <button
          type="submit"
          disabled={loading}
          className="btn-gradient w-full py-3.5 rounded-xl font-poppins font-semibold text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Gönderiliyor...</span>
            </>
          ) : (
            <>
              <span>Ücretsiz Bilgi & Randevu Al</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-400 text-center pt-2">
          Kişisel verileriniz KVKK kapsamında gizli tutulmaktadır. Bilgileriniz 3. şahıslarla paylaşılmaz.
        </p>
      </form>
    </div>
  );
}
