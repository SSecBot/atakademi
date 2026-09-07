export type CourseCategory = "Yabancı Dil" | "Kişisel Gelişim";

export type SiteMode = "NEW_REGISTRATION" | "ACTIVE_TERM";

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  level: string; // e.g. "A1 - C1", "Başlangıç - İleri", "Tüm Seviyeler"
  shortDescription: string;
  fullDescription: string;
  duration: string; // e.g. "12 Hafta"
  weeklyHours: string; // e.g. "6 Saat / Hafta"
  price?: string; // Optional contact reference (e.g. "Ücret ve Detaylı Bilgi İçin İletişime Geçiniz")
  instructorId: string;
  instructorName: string;
  image: string; // local path like "/assets/courses/ingilizce.webp"
  badge?: string; // e.g. "En Popüler", "Yeni", "Sertifikalı"
  featured: boolean;
  isVisible: boolean;
  learningOutcomes: string[];
  modules: CourseModule[];
  createdAt: string;
  updatedAt: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string; // e.g. "Kıdemli İngilizce & İtalyanca Eğitmeni"
  languages: string[]; // e.g. ["İngilizce", "İtalyanca"]
  bio: string;
  experience: string; // e.g. "8+ Yıl Deneyim"
  education: string; // e.g. "Ege Üniversitesi Mütercim Tercümanlık"
  image: string; // local path like "/assets/instructors/instructor-1.webp"
  isVisible: boolean;
  rating: number; // e.g. 4.9
  studentCount: number; // e.g. 450
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  studentName: string;
  courseTitle: string;
  rating: number; // 1 to 5
  comment: string;
  avatar: string; // local path like "/assets/reviews/student-1.webp"
  date: string;
  isVisible: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseInterest: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SiteStatistics {
  activeStudents: number;
  totalCourses: number;
  expertInstructors: number;
  successRate: number;
}

export interface FeatureBlock {
  id: string;
  icon: "users" | "message" | "zap" | "map";
  title: string;
  description: string;
}

export interface HomePageContent {
  siteMode: SiteMode;
  topBarNotification: {
    newRegistration: string;
    activeTerm: string;
  };
  hero: {
    badge: {
      newRegistration: string;
      activeTerm: string;
    };
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    primaryBtnText: {
      newRegistration: string;
      activeTerm: string;
    };
    secondaryBtnText: string;
    trustPoints: string[];
    floatingBadgeTitle: {
      newRegistration: string;
      activeTerm: string;
    };
    floatingBadgeSubtitle: {
      newRegistration: string;
      activeTerm: string;
    };
    floatingBadgeBtn: {
      newRegistration: string;
      activeTerm: string;
    };
  };
  stats: {
    activeStudents: string;
    activeStudentsLabel: string;
    successRate: string;
    successRateLabel: string;
    totalCourses: string;
    totalCoursesLabel: string;
    expertInstructors: string;
    expertInstructorsLabel: string;
  };
  featuresSection: {
    tag: string;
    title: string;
    description: string;
    items: FeatureBlock[];
  };
  coursesSection: {
    tag: string;
    title: string;
    viewAllText: string;
  };
  instructorsSection: {
    tag: string;
    title: string;
    viewAllText: string;
  };
  reviewsSection: {
    tag: string;
    title: string;
    viewAllText: string;
  };
  aiSpeedReadingSection: AiSpeedReadingSection;
  locationCta: {
    badge: string;
    title: string;
    address: string;
    description: string;
    primaryBtnText: string;
    phoneBtnText: string;
  };
}

export interface AiFeatureHighlight {
  id: string;
  icon: "zap" | "target" | "award" | "sparkles" | "check";
  title: string;
}

export interface AiSpeedReadingSection {
  badge: string;
  title: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  features: AiFeatureHighlight[];
  buttonText: string;
  buttonLink: string;
  image: string;
  imageBadge: string;
}

export interface WorkingHours {
  weekdays: string;
  saturday: string;
  sunday: string;
  summary: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
}

export interface ContactInfo {
  address: string;
  addressNote: string;
  phone: string;
  phoneRaw: string;
  email: string;
  workingHours: WorkingHours;
  mapEmbedUrl: string;
  mapDirectUrl: string;
  socialLinks: SocialLinks;
}

export interface ValueBlock {
  id: string;
  icon: "shield" | "users" | "sparkles" | "heart";
  title: string;
  description: string;
}

export interface AboutPageContent {
  header: {
    badge: string;
    title: string;
    description: string;
  };
  story: {
    tag: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    highlights: string[];
    campusTitle: string;
    campusAddress: string;
    campusImage: string;
  };
  missionVision: {
    missionTitle: string;
    missionDescription: string;
    visionTitle: string;
    visionDescription: string;
  };
  valuesSection: {
    tag: string;
    title: string;
    items: ValueBlock[];
  };
}
