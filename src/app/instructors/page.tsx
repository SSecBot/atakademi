"use client";

import React, { useState, useEffect } from "react";
import InstructorCard from "@/components/InstructorCard";
import { Instructor } from "@/types";
import { Sparkles, Users, Award, GraduationCap, CheckCircle2 } from "lucide-react";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instructors")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInstructors(data.data);
        }
      })
      .catch((err) => console.error("Error loading instructors:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-20 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 relative overflow-hidden shadow-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            Alanında Uzman Kadro
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Eğitmenlerimiz & Uzmanlarımız
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-montserrat">
            Alanında lisans/yüksek lisans derecesine sahip, ana dili hedef dil olan ve uluslararası sertifikalı eğitmen kadromuzla tanışın.
          </p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-80 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((inst) => (
              <InstructorCard key={inst.id} instructor={inst} />
            ))}
          </div>
        )}
      </section>

      {/* Quality Standards Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-ambient grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-poppins font-bold text-2xl text-slate-900">
              Eğitmen Seçim Standartlarımız
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ata Akademi&apos;de görev yapan tüm eğitmenlerimiz; pedagojik formasyon yeterliliği, uluslararası sınav mentörlüğü deneyimi ve iletişim becerileri testlerinden başarıyla geçerek kadromuza dahil edilmektedir.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Uluslararası Sertifikasyon (CELTA, DELTA, DAF, TOPIK)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Düzenli İçiçi Hizmet ve Metodoloji Eğitimleri</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Öğrenci Memnuniyet Analizleri</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Birebir Öğrenci Koçluğu & Gelişim Takibi</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <a
              href="/contact"
              className="btn-gradient px-8 py-4 rounded-2xl font-poppins font-semibold text-sm shadow-md text-center"
            >
              Eğitmenlerimizle Tanışın & Seviye Belirleyin
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
