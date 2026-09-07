"use client";

import React from "react";
import { Review } from "@/types";
import { Star, Quote, CheckCircle2 } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-ambient ambient-shadow-hover flex flex-col justify-between h-full relative">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-100 -z-0" />

      <div className="relative z-10 space-y-4">
        {/* Star Rating */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200"
              }`}
            />
          ))}
          <span className="text-xs font-bold text-slate-700 ml-1.5">
            {review.rating}.0 / 5.0
          </span>
        </div>

        {/* Comment */}
        <p className="text-slate-700 text-sm leading-relaxed italic">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      {/* Student Profile Info */}
      <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100 relative z-10">
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-purple-200 bg-slate-100">
          <img
            src={review.avatar}
            alt={review.studentName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="font-poppins font-bold text-sm text-slate-900 truncate">
              {review.studentName}
            </h4>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="truncate text-[#712AE2] font-medium">
              {review.courseTitle}
            </span>
            <span className="text-slate-400 text-[11px]">{review.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
