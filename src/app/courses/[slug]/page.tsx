import React from "react";
import { notFound } from "next/navigation";
import { ataRepository } from "@/lib/repository";
import ContactForm from "@/components/ContactForm";
import {
  Clock,
  BookOpen,
  User,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  MapPin,
} from "lucide-react";

interface CourseDetailPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = ataRepository.getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const instructor = ataRepository.getInstructorById(course.instructorId);
  const contactInfo = ataRepository.getContactInfo();

  return (
    <div className="pt-28 md:pt-32 pb-20 space-y-12 sm:space-y-16">
      {/* Top Breadcrumb & Return */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="/courses"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#712AE2] hover:text-[#B4136D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Kurslara Geri Dön</span>
        </a>
      </div>

      {/* Hero / Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-ambient grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-[#712AE2]">
                {course.category}
              </span>
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                Seviye: {course.level}
              </span>
              {course.badge && (
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#712AE2] to-[#B4136D] text-white">
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {course.shortDescription}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#712AE2]" />
                <div>
                  <div className="text-slate-400 text-[11px]">Toplam Süre</div>
                  <div className="font-bold text-slate-800">{course.duration}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B4136D]" />
                <div>
                  <div className="text-slate-400 text-[11px]">Haftalık Ders</div>
                  <div className="font-bold text-slate-800">{course.weeklyHours}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-amber-500" />
                <div>
                  <div className="text-slate-400 text-[11px]">Sertifika</div>
                  <div className="font-bold text-slate-800">MEB & Uluslararası</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image & Price Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-md">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-purple-50/80 p-5 rounded-2xl border border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left space-y-0.5">
                <span className="text-xs font-semibold text-[#712AE2] block">Kayıt &amp; Ücret Bilgisi</span>
                <span className="font-poppins font-bold text-sm sm:text-base text-slate-900 block">
                  Ücret ve Detaylı Bilgi İçin İletişime Geçiniz
                </span>
              </div>
              <a
                href="#kayit-formu"
                className="btn-gradient px-6 py-2.5 rounded-xl font-poppins font-semibold text-xs sm:text-sm shadow-md flex-shrink-0"
              >
                Bilgi Al &amp; Kaydol
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Syllabus Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Description, Learning Outcomes, Modules */}
          <div className="lg:col-span-7 space-y-10">
            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-slate-900">
                Eğitim Hakkında
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {course.fullDescription}
              </p>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B4136D]" />
                Bu Kurs Size Ne Kazandıracak?
              </h2>
              <div className="grid grid-cols-1 gap-3 pt-2">
                {course.learningOutcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-slate-800 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus / Modules */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-poppins font-bold text-xl sm:text-2xl text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#712AE2]" />
                  Müfredat ve Ders Modülleri
                </h2>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {course.modules.length} Modül
                </span>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod, index) => (
                  <div
                    key={mod.id || index}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-purple-300 transition-colors bg-slate-50/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-poppins font-bold text-base text-slate-900">
                        {index + 1}. {mod.title}
                      </h3>
                      <span className="text-xs font-semibold text-[#712AE2] bg-purple-50 px-2.5 py-0.5 rounded-md">
                        {mod.duration}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Details Card */}
            {instructor && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-poppins font-bold text-xl sm:text-2xl text-slate-900">
                  Kurs Eğitmeni
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-purple-200 bg-slate-100">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-poppins font-bold text-lg text-slate-900">
                      {instructor.name}
                    </h3>
                    <p className="text-xs font-medium text-[#712AE2]">
                      {instructor.title}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed pt-1">
                      {instructor.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Enrollment Form */}
          <div className="lg:col-span-5" id="kayit-formu">
            <div className="sticky top-28 space-y-6">
              <ContactForm defaultCourse={course.title} />

              <div className="bg-purple-900 text-white p-6 rounded-3xl space-y-3">
                <h4 className="font-poppins font-bold text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  Yüz Yüze Bilgi Almak İster misiniz?
                </h4>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Torbalı Tepeköy merkezimizi ziyaret ederek örnek ders materyallerimizi inceleyebilir ve eğitmenlerimizle tanışabilirsiniz.
                </p>
                <div className="text-xs font-bold text-white pt-1">
                  {contactInfo.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
