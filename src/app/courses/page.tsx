"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/types";
import { Search, Filter, BookOpen, Sparkles, HelpCircle } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCourses(data.data);
        }
      })
      .catch((err) => console.error("Error loading courses:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === "Tümü" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 md:pt-32 pb-20 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 relative overflow-hidden shadow-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Eğitim Kataloğu
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            Eğitim Programlarımız & Kurslar
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-montserrat">
            Avrupa standartlarında yabancı dil eğitimleri ve hayatınızı kolaylaştıracak kişisel gelişim atölyeleri.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {["Tümü", "Yabancı Dil", "Kişisel Gelişim"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "btn-gradient shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-[#712AE2]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kurs adı veya kelime ara..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#712AE2] text-xs sm:text-sm text-slate-900 bg-slate-50/50"
            />
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-96 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-poppins font-bold text-lg text-slate-800">
              Aradığınız Kriterlere Uygun Kurs Bulunamadı
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Filtreleri sıfırlayarak veya arama terimini değiştirerek tekrar deneyebilirsiniz.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Tümü");
                setSearchTerm("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-purple-50 text-[#712AE2] font-semibold text-xs hover:bg-purple-100 transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#712AE2]">
            Merak Edilenler
          </span>
          <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-poppins font-semibold text-base text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#712AE2] flex-shrink-0" />
              Dersler ne zaman ve nerede işleniyor?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">
              Derslerimiz İzmir Torbalı Tepeköy&apos;deki merkezimizde hafta içi akşam ve hafta sonu esnek seanslarla işlenmektedir. Ayrıca çalışanlar için online destekli hibrit seçenekler de sunulmaktadır.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-poppins font-semibold text-base text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#712AE2] flex-shrink-0" />
              Seviye tespiti nasıl yapılıyor?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">
              Kurs öncesinde uzman eğitmenlerimiz eşliğinde hem yazılı hem de sözlü mülakatla seviyeniz ücretsiz olarak belirlenir ve size en uygun kura yerleştirilirsiniz.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-poppins font-semibold text-base text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#712AE2] flex-shrink-0" />
              Kurs bitiminde sertifika veriliyor mu?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed pl-6">
              Evet, programı başarıyla tamamlayan tüm öğrencilerimize Avrupa Dil Portfolyosu ve MEB kriterlerine uyumlu resmi Başarı Sertifikası verilmektedir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
