import React from "react";
import { ataRepository } from "@/lib/repository";
import {
  Sparkles,
  Award,
  Target,
  Eye,
  HeartHandshake,
  MapPin,
  CheckCircle2,
  Users,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 0; // Dynamic server-rendered on demand

export default function AboutPage() {
  const aboutContent = ataRepository.getAboutContent();

  const renderValueIcon = (iconName: string) => {
    switch (iconName) {
      case "shield":
        return <ShieldCheck className="w-8 h-8 text-[#712AE2]" />;
      case "users":
        return <Users className="w-8 h-8 text-[#B4136D]" />;
      case "sparkles":
        return <Sparkles className="w-8 h-8 text-[#712AE2]" />;
      case "heart":
      default:
        return <HeartHandshake className="w-8 h-8 text-[#B4136D]" />;
    }
  };

  return (
    <div className="pt-28 md:pt-32 pb-20 space-y-16 sm:space-y-20">
      {/* 1. Header Banner (Dynamic CMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 relative overflow-hidden shadow-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {aboutContent.header.badge}
          </span>
          <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white">
            {aboutContent.header.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-montserrat leading-relaxed">
            {aboutContent.header.description}
          </p>
        </div>
      </section>

      {/* 2. Story & Campus Section (Dynamic CMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#712AE2]">
              <Award className="w-4 h-4" />
              <span>{aboutContent.story.tag}</span>
            </div>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              {aboutContent.story.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {aboutContent.story.paragraph1}
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {aboutContent.story.paragraph2}
            </p>

            <div className="space-y-3 pt-2">
              {aboutContent.story.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#712AE2] flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src={aboutContent.story.campusImage || "/assets/about-campus.webp"}
                alt={aboutContent.story.campusTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="font-poppins font-bold text-lg">
                  {aboutContent.story.campusTitle}
                </div>
                <div className="text-xs text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span>{aboutContent.story.campusAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Cards (Dynamic CMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-ambient space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#712AE2] flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="font-poppins font-bold text-2xl text-slate-900">
              {aboutContent.missionVision.missionTitle}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {aboutContent.missionVision.missionDescription}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-ambient space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 text-[#B4136D] flex items-center justify-center">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="font-poppins font-bold text-2xl text-slate-900">
              {aboutContent.missionVision.visionTitle}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {aboutContent.missionVision.visionDescription}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Institutional Values (Dynamic CMS) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#712AE2]">
              {aboutContent.valuesSection.tag}
            </span>
            <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-slate-900">
              {aboutContent.valuesSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutContent.valuesSection.items.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3"
              >
                {renderValueIcon(item.icon)}
                <h4 className="font-poppins font-bold text-base text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
