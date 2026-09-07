"use client";

import React, { useState, useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import { Review } from "@/types";
import { Sparkles, Star, MessageSquare, CheckCircle2, HeartHandshake } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviews(data.data);
        }
      })
      .catch((err) => console.error("Error loading reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28 md:pt-32 pb-20 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 relative overflow-hidden shadow-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            Öğrenci Deneyimleri
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Öğrencilerimiz Ne Diyor?
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-montserrat">
            Ata Akademi ile dil bariyerini aşan, sınavları kazanan ve kariyerinde sıçrama yapan mezunlarımızın samimi geri bildirimleri.
          </p>
        </div>
      </section>

      {/* Ratings Overview Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-ambient flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="font-poppins font-extrabold text-4xl sm:text-5xl text-[#712AE2]">
              4.9
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                500+ Doğrulanmış Öğrenci Değerlendirmesi
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50 text-[#712AE2]">
              <CheckCircle2 className="w-4 h-4 text-[#712AE2]" />
              <span>%98 Memnuniyet Oranı</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-50 text-[#B4136D]">
              <CheckCircle2 className="w-4 h-4 text-[#B4136D]" />
              <span>%95 Tavsiye Edilme</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-64 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        )}
      </section>

      {/* Share Your Story CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 shadow-xl">
          <HeartHandshake className="w-10 h-10 text-pink-300 mx-auto" />
          <h3 className="font-poppins font-bold text-2xl text-white">
            Siz de Başarı Hikayenizi Bizimle Yazın!
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Ata Akademi ailesine katılın, hedeflediğiniz dili akıcı şekilde konuşarak geleceğinize değer katın.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="btn-gradient px-8 py-3.5 rounded-2xl font-poppins font-semibold text-sm shadow-md inline-block"
            >
              Hemen Başvurun
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
