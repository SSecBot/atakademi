"use client";

import React from "react";
import { Course } from "@/types";
import { Clock, BookOpen, User, Award, ArrowRight } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-ambient ambient-shadow-hover flex flex-col h-full group">
      {/* Thumbnail Area */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-[#712AE2] shadow-sm">
            {course.category}
          </span>
          {course.badge && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#712AE2] to-[#B4136D] text-white shadow-sm">
              {course.badge}
            </span>
          )}
        </div>

        {/* Level Tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
            {course.level}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="font-poppins font-bold text-lg text-slate-900 group-hover:text-[#712AE2] transition-colors line-clamp-1">
            {course.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {course.shortDescription}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#712AE2]" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#B4136D]" />
              <span>{course.weeklyHours}</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-700 font-medium truncate">
                Eğitmen: {course.instructorName}
              </span>
            </div>
          </div>

          {/* CTA & Detail Link */}
          <div className="flex items-center justify-between pt-2 gap-2">
            <a
              href="/contact"
              className="text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-[#712AE2] transition-colors leading-tight"
            >
              Ücret ve Detaylı Bilgi İçin İletişime Geçiniz →
            </a>
            <a
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-2 rounded-xl bg-purple-50 text-[#712AE2] hover:bg-[#712AE2] hover:text-white transition-all duration-200 flex-shrink-0"
            >
              <span>İncele</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
