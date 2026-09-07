import React from "react";
import { ataRepository } from "@/lib/repository";
import CourseCard from "@/components/CourseCard";
import InstructorCard from "@/components/InstructorCard";
import ReviewCard from "@/components/ReviewCard";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
  CheckCircle,
  MessageSquare,
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  BookOpenCheck,
} from "lucide-react";

export const revalidate = 0; // Dynamic server-rendered on demand

export default function HomePage() {
  const homeContent = ataRepository.getHomeContent();
  const contactInfo = ataRepository.getContactInfo();
  const courses = ataRepository.getAllCourses().slice(0, 6);
  const instructors = ataRepository.getAllInstructors().slice(0, 4);
  const reviews = ataRepository.getAllReviews().slice(0, 3);
  const stats = homeContent.stats || {
    activeStudents: "1250+",
    activeStudentsLabel: "Mezun & Aktif Öğrenci",
    successRate: "%98",
    successRateLabel: "Sınav Başarı Oranı",
    totalCourses: "7+",
    totalCoursesLabel: "Aktif Eğitim Programı",
    expertInstructors: "5",
    expertInstructorsLabel: "Uzman & Ana Dil Eğitmeni",
  };

  const aiSection = homeContent.aiSpeedReadingSection || {
    badge: "Türkiye'de Tek & Ata Akademi'ye Özel",
    title: "Yapay Zeka Destekli",
    titleHighlight: "Hızlı Okuma ve Anlama",
    titleSuffix: "Programı",
    description:
      "Göz kası hareketlerini ve odaklanmayı kişiselleştirilmiş yapay zeka algoritmalarıyla analiz eden Türkiye'nin ilk ve tek tescilli sistemiyle okuma hızınızı 3 ila 5 katına çıkarın, kavrama oranınızı %90'ın üzerine taşıyın.",
    features: [
      { id: "ai-feat-1", icon: "zap", title: "Kişiselleştirilmiş AI Algoritmaları" },
      { id: "ai-feat-2", icon: "award", title: "LGS, YKS, KPSS & ALES Başarısı" },
      { id: "ai-feat-3", icon: "sparkles", title: "%90+ Kalıcı Anlama Oranı" },
    ],
    buttonText: "Hızlı okuma ve anlama için ulaşınız.",
    buttonLink: "/courses/hizli-okuma-ve-anlama",
    image: "/assets/courses/hizli-okuma.webp",
    imageBadge: "Tescilli AI Algoritması",
  };

  const isNewRegistration = homeContent.siteMode === "NEW_REGISTRATION";

  // Dynamic values depending on active site mode
  const heroBadge = isNewRegistration
    ? homeContent.hero.badge.newRegistration
    : homeContent.hero.badge.activeTerm;

  const primaryBtnText = isNewRegistration
    ? homeContent.hero.primaryBtnText.newRegistration
    : homeContent.hero.primaryBtnText.activeTerm;

  const floatingBadgeTitle = isNewRegistration
    ? homeContent.hero.floatingBadgeTitle.newRegistration
    : homeContent.hero.floatingBadgeTitle.activeTerm;

  const floatingBadgeSubtitle = isNewRegistration
    ? homeContent.hero.floatingBadgeSubtitle.newRegistration
    : homeContent.hero.floatingBadgeSubtitle.activeTerm;

  const floatingBadgeBtn = isNewRegistration
    ? homeContent.hero.floatingBadgeBtn.newRegistration
    : homeContent.hero.floatingBadgeBtn.activeTerm;

  // Icon mapper helper for dynamic feature cards
  const renderFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "users":
        return <Users className="w-6 h-6" />;
      case "message":
        return <MessageSquare className="w-6 h-6" />;
      case "zap":
        return <Zap className="w-6 h-6" />;
      case "map":
      default:
        return <MapPin className="w-6 h-6" />;
    }
  };

  return (
    <div className="pt-24 md:pt-28 pb-16 space-y-20 sm:space-y-24">
      {/* 1. HERO SECTION (100% DYNAMIC & DUAL-STATE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm border ${
                isNewRegistration
                  ? "bg-purple-100/80 border-purple-200 text-[#712AE2]"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
              }`}
            >
              {isNewRegistration ? (
                <Sparkles className="w-4 h-4 text-[#B4136D] animate-pulse" />
              ) : (
                <BookOpenCheck className="w-4 h-4 text-emerald-600" />
              )}
              <span>{heroBadge}</span>
            </div>

            <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 leading-[1.15]">
              {homeContent.hero.titlePrefix}{" "}
              <span className="text-gradient">{homeContent.hero.titleHighlight}</span>{" "}
              {homeContent.hero.titleSuffix}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-montserrat">
              {homeContent.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/courses"
                className="btn-gradient px-7 py-3.5 rounded-2xl font-poppins font-semibold text-sm sm:text-base shadow-lg inline-flex items-center gap-2"
              >
                <span>{primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/courses/hizli-okuma-ve-anlama"
                className="px-7 py-3.5 rounded-2xl font-poppins font-semibold text-sm sm:text-base border-2 border-[#712AE2] text-[#712AE2] hover:bg-purple-50 transition-all inline-flex items-center gap-2 bg-white shadow-sm"
              >
                <span>Hızlı okuma ve anlama için ulaşınız.</span>
                <ArrowRight className="w-4 h-4 text-[#712AE2]" />
              </a>
            </div>

            {/* Trust bullet points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-semibold text-slate-700">
              {homeContent.hero.trustPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Image Card with Dynamic Status Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/assets/hero-banner.webp"
                alt="Ata Akademi Modern Eğitim Ortamı"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Highlight Card (Dual-State) */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      isNewRegistration
                        ? "bg-purple-100 text-[#712AE2]"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-poppins font-bold text-sm text-slate-900">
                      {floatingBadgeTitle}
                    </div>
                    <div className="text-xs text-slate-500">
                      {floatingBadgeSubtitle}
                    </div>
                  </div>
                </div>
                <a
                  href="/contact"
                  className={`px-3.5 py-1.5 rounded-xl text-white text-xs font-semibold transition-colors ${
                    isNewRegistration
                      ? "bg-[#712AE2] hover:bg-purple-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {floatingBadgeBtn}
                </a>
              </div>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-purple-300/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER (DYNAMIC TEXT & VALUES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#712AE2] to-[#B4136D] rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-purple-900/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="space-y-1">
              <div className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl">
                {stats.activeStudents}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 font-medium">
                {stats.activeStudentsLabel}
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl">
                {stats.successRate}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 font-medium">
                {stats.successRateLabel}
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl">
                {stats.totalCourses}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 font-medium">
                {stats.totalCoursesLabel}
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl">
                {stats.expertInstructors}
              </div>
              <div className="text-xs sm:text-sm text-purple-100 font-medium">
                {stats.expertInstructorsLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 AI-POWERED SPEED READING SPOTLIGHT BANNER (DYNAMIC CMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#1e1138] to-slate-950 p-8 sm:p-12 text-white border border-purple-500/20 shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#712AE2] to-[#B4136D] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                <Sparkles className="w-4 h-4 animate-pulse" />
                {aiSection.badge}
              </div>
              <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                {aiSection.title}{" "}
                <span className="text-gradient">{aiSection.titleHighlight}</span>{" "}
                {aiSection.titleSuffix}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-montserrat">
                {aiSection.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-purple-100">
                {aiSection.features.map((feat, idx) => (
                  <div key={feat.id || idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span>{feat.title}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3">
                <a
                  href={aiSection.buttonLink || "/courses/hizli-okuma-ve-anlama"}
                  className="btn-gradient px-7 py-3.5 rounded-2xl font-poppins font-semibold text-sm shadow-lg inline-flex items-center gap-2"
                >
                  <span>{aiSection.buttonText || "Hızlı okuma ve anlama için ulaşınız."}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl aspect-[4/3]">
                <img
                  src={aiSection.image || "/assets/courses/hizli-okuma.webp"}
                  alt={aiSection.titleHighlight || "Yapay Zeka Destekli Hızlı Okuma"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-white bg-[#712AE2]/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                    {aiSection.imageBadge || "Tescilli AI Algoritması"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES SECTION (DYNAMIC HEADER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#712AE2] block mb-1">
              {homeContent.coursesSection.tag}
            </span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
              {homeContent.coursesSection.title}
            </h2>
          </div>
          <a
            href="/courses"
            className="text-xs sm:text-sm font-semibold text-[#712AE2] hover:text-[#581c87] transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{homeContent.coursesSection.viewAllText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE ATA AKADEMI (DYNAMIC FEATURES CMS) */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#712AE2]">
              {homeContent.featuresSection.tag}
            </span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
              {homeContent.featuresSection.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-montserrat">
              {homeContent.featuresSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeContent.featuresSection.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-ambient hover:-translate-y-1 transition-transform space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#712AE2] flex items-center justify-center">
                  {renderFeatureIcon(item.icon)}
                </div>
                <h3 className="font-poppins font-bold text-base text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERT INSTRUCTORS (DYNAMIC CMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#712AE2] block mb-1">
              {homeContent.instructorsSection.tag}
            </span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900">
              {homeContent.instructorsSection.title}
            </h2>
          </div>
          <a
            href="/instructors"
            className="text-xs sm:text-sm font-semibold text-[#712AE2] hover:text-[#581c87] transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <span>{homeContent.instructorsSection.viewAllText}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </section>

      {/* 6. STUDENT REVIEWS (DYNAMIC CMS) */}
      <section className="bg-purple-950 py-16 sm:py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-400 block mb-1">
                {homeContent.reviewsSection.tag}
              </span>
              <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
                {homeContent.reviewsSection.title}
              </h2>
            </div>
            <a
              href="/reviews"
              className="text-xs sm:text-sm font-semibold text-pink-300 hover:text-pink-200 transition-colors flex items-center gap-1 self-start sm:self-auto"
            >
              <span>{homeContent.reviewsSection.viewAllText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Ambient glow in reviews background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 7. LOCATION & CTA BANNER (DYNAMIC CMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{homeContent.locationCta.badge}</span>
              </div>
              <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white">
                {homeContent.locationCta.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Adresimiz: <strong className="text-white">{contactInfo.address}</strong>
              </p>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
                {contactInfo.addressNote || homeContent.locationCta.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="/contact"
                  className="btn-gradient px-6 py-3 rounded-xl font-poppins font-semibold text-sm shadow-md inline-flex items-center gap-2"
                >
                  <span>{homeContent.locationCta.primaryBtnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${contactInfo.phoneRaw}`}
                  className="px-6 py-3 rounded-xl font-poppins font-semibold text-sm border border-white/20 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                >
                  <span>{contactInfo.phone}</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-white/5 border border-white/10 p-3 flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Ata Akademi"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          {/* Background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
