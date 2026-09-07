"use client";

import React from "react";
import { Instructor } from "@/types";
import { Award, Star, Users, Globe, GraduationCap } from "lucide-react";

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-ambient ambient-shadow-hover p-6 flex flex-col justify-between group">
      <div>
        {/* Avatar & Badges Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-purple-200 shadow-sm bg-slate-100">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800">
                {instructor.rating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">
                ({instructor.studentCount}+ Öğrenci)
              </span>
            </div>
            <h3 className="font-poppins font-bold text-lg text-slate-900 truncate">
              {instructor.name}
            </h3>
            <p className="text-xs font-medium text-[#712AE2] line-clamp-1">
              {instructor.title}
            </p>
          </div>
        </div>

        {/* Languages tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {instructor.languages.map((lang, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#712AE2] border border-purple-100"
            >
              <Globe className="w-3 h-3" />
              {lang}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-pink-50 text-[#B4136D] border border-pink-100">
            <Award className="w-3 h-3" />
            {instructor.experience}
          </span>
        </div>

        {/* Education & Bio */}
        <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-start gap-1.5 text-slate-700">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1 font-medium">{instructor.education}</span>
          </div>
          <p className="text-slate-500 leading-relaxed line-clamp-3">
            {instructor.bio}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-5 pt-3 border-t border-slate-100">
        <a
          href={`/contact?instructor=${encodeURIComponent(instructor.name)}`}
          className="w-full text-center block text-xs font-semibold py-2.5 rounded-xl border border-[#712AE2] text-[#712AE2] hover:bg-[#712AE2] hover:text-white transition-all duration-200"
        >
          Eğitmen ile Birebir Danışmanlık
        </a>
      </div>
    </div>
  );
}
