"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users,
  MessageSquare,
  Mail,
  RefreshCw,
  Star,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Save,
  Sliders,
  Award,
  Target,
  ShieldCheck,
  HeartHandshake,
  Phone,
  MapPin,
  Clock,
  Globe,
  Zap,
  Check,
} from "lucide-react";
import {
  Course,
  Instructor,
  Review,
  ContactMessage,
  HomePageContent,
  AboutPageContent,
  SiteMode,
  ContactInfo,
} from "@/types";

const ADMIN_PASSCODE = "Ata35.1881";
const AUTH_STORAGE_KEY = "ata_admin_authenticated";

export default function AdminDashboardPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "home" | "ai-speed-reading" | "contact-info" | "about" | "courses" | "instructors" | "reviews" | "messages"
  >("home");

  // Data states
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutPageContent | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [savingHome, setSavingHome] = useState<boolean>(false);
  const [savingAbout, setSavingAbout] = useState<boolean>(false);
  const [savingContact, setSavingContact] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Modal edit/create states
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [editingInstructor, setEditingInstructor] = useState<Partial<Instructor> | null>(null);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Check persisted auth session
  useEffect(() => {
    const sessionAuth =
      sessionStorage.getItem(AUTH_STORAGE_KEY) ||
      localStorage.getItem(AUTH_STORAGE_KEY);
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [hRes, aRes, cRes, iRes, rRes, mRes, ctRes] = await Promise.all([
        fetch("/api/site-content"),
        fetch("/api/about-content"),
        fetch("/api/courses?all=true"),
        fetch("/api/instructors?all=true"),
        fetch("/api/reviews?all=true"),
        fetch("/api/contact"),
        fetch("/api/contact-info"),
      ]);

      const [hData, aData, cData, iData, rData, mData, ctData] = await Promise.all([
        hRes.json(),
        aRes.json(),
        cRes.json(),
        iRes.json(),
        rRes.json(),
        mRes.json(),
        ctRes.json(),
      ]);

      if (hData.success) setHomeContent(hData.data);
      if (aData.success) setAboutContent(aData.data);
      if (cData.success) setCourses(cData.data);
      if (iData.success) setInstructors(iData.data);
      if (rData.success) setReviews(rData.data);
      if (mData.success) setMessages(mData.data);
      if (ctData.success) setContactInfo(ctData.data);
    } catch (e) {
      showNotification("error", "Veriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContactInfo = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!contactInfo) return;
    setSavingContact(true);

    try {
      const res = await fetch("/api/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactInfo),
      });
      const data = await res.json();
      if (data.success) {
        setContactInfo(data.data);
        showNotification("success", "İletişim ve konum bilgileri tüm sitede başarıyla güncellendi!");
      } else {
        showNotification("error", data.error || "İletişim bilgileri kaydedilemedi.");
      }
    } catch {
      showNotification("error", "İletişim bilgileri kaydedilirken sunucu hatası oluştu.");
    } finally {
      setSavingContact(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Geçersiz yönetici şifresi! Lütfen tekrar deneyin.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPasscode("");
  };

  // --- Dual-State Site Mode Switcher ---
  const handleToggleSiteMode = async () => {
    if (!homeContent) return;
    const nextMode: SiteMode =
      homeContent.siteMode === "NEW_REGISTRATION" ? "ACTIVE_TERM" : "NEW_REGISTRATION";
    try {
      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: nextMode }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setHomeContent(data.data);
        showNotification(
          "success",
          `Site modu başarıyla '${
            nextMode === "NEW_REGISTRATION" ? "Yeni Dönem Kayıtları" : "Kurslar Başladı"
          }' olarak değiştirildi.`
        );
      }
    } catch {
      showNotification("error", "Site modu değiştirilemedi.");
    }
  };

  // --- Save Home Content Changes ---
  const handleSaveHomeContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeContent) return;
    setSavingHome(true);

    try {
      const res = await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homeContent),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Ana sayfa metinleri ve ayarları başarıyla kaydedildi.");
        setHomeContent(data.data);
      } else {
        showNotification("error", data.error || "Kaydedilemedi.");
      }
    } catch {
      showNotification("error", "Sunucu bağlantı hatası oluştu.");
    } finally {
      setSavingHome(false);
    }
  };

  // --- Save About Content Changes ---
  const handleSaveAboutContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutContent) return;
    setSavingAbout(true);

    try {
      const res = await fetch("/api/about-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutContent),
      });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Hakkımızda sayfası içerikleri başarıyla kaydedildi.");
        setAboutContent(data.data);
      } else {
        showNotification("error", data.error || "Kaydedilemedi.");
      }
    } catch {
      showNotification("error", "Sunucu bağlantı hatası oluştu.");
    } finally {
      setSavingAbout(false);
    }
  };

  // --- Course CRUD with Bug Fix Deletion ---
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse?.title || !editingCourse?.category) {
      showNotification("error", "Kurs başlığı ve kategori zorunludur.");
      return;
    }

    try {
      const isNew = !editingCourse.id;
      const url = isNew ? "/api/courses" : `/api/courses/${editingCourse.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCourse),
      });

      const data = await res.json();
      if (data.success) {
        showNotification(
          "success",
          isNew ? "Yeni kurs başarıyla oluşturuldu." : "Kurs başarıyla güncellendi."
        );
        setIsModalOpen(false);
        setEditingCourse(null);
        fetchAllData();
      } else {
        showNotification("error", data.error || "Kurs kaydedilemedi.");
      }
    } catch {
      showNotification("error", "Sunucu hatası oluştu.");
    }
  };

  // REFACTORED CLEAN DELETION HANDLER (Courses)
  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Bu kursu kalıcı olarak silmek istediğinize emin misiniz?")) return;

    // Optimistic UI state removal
    setCourses((prev) => prev.filter((c) => c.id !== id));

    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Kurs başarıyla silindi.");
      } else {
        showNotification("error", data.error || "Silme işlemi başarısız.");
        fetchAllData(); // Rollback if failed
      }
    } catch {
      showNotification("error", "Silme işlemi sırasında sunucu hatası oluştu.");
      fetchAllData();
    }
  };

  const toggleCourseVisibility = async (course: Course) => {
    try {
      const res = await fetch(`/api/courses/${course.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVisible: !course.isVisible }),
      });
      if (res.ok) {
        showNotification(
          "success",
          `Kurs görünürlüğü ${!course.isVisible ? "aktif" : "gizli"} yapıldı.`
        );
        fetchAllData();
      }
    } catch {
      showNotification("error", "Görünürlük değiştirilemedi.");
    }
  };

  // --- Instructor CRUD with Bug Fix Deletion ---
  const handleSaveInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInstructor?.name || !editingInstructor?.title) {
      showNotification("error", "Eğitmen adı ve unvanı zorunludur.");
      return;
    }

    try {
      const isNew = !editingInstructor.id;
      const url = isNew ? "/api/instructors" : `/api/instructors/${editingInstructor.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingInstructor),
      });

      const data = await res.json();
      if (data.success) {
        showNotification(
          "success",
          isNew ? "Yeni eğitmen eklendi." : "Eğitmen bilgileri güncellendi."
        );
        setIsModalOpen(false);
        setEditingInstructor(null);
        fetchAllData();
      } else {
        showNotification("error", data.error || "Eğitmen kaydedilemedi.");
      }
    } catch {
      showNotification("error", "Sunucu hatası oluştu.");
    }
  };

  // REFACTORED CLEAN DELETION HANDLER (Instructors)
  const handleDeleteInstructor = async (id: string) => {
    if (!confirm("Bu eğitmeni kalıcı olarak silmek istediğinize emin misiniz?")) return;

    // Optimistic UI state removal
    setInstructors((prev) => prev.filter((i) => i.id !== id));

    try {
      const res = await fetch(`/api/instructors/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Eğitmen başarıyla silindi.");
      } else {
        showNotification("error", data.error || "Silme işlemi başarısız.");
        fetchAllData();
      }
    } catch {
      showNotification("error", "Silme hatası oluştu.");
      fetchAllData();
    }
  };

  // --- Review CRUD with Bug Fix Deletion ---
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview?.studentName || !editingReview?.comment) {
      showNotification("error", "Öğrenci adı ve yorum metni zorunludur.");
      return;
    }

    try {
      const isNew = !editingReview.id;
      const url = isNew ? "/api/reviews" : `/api/reviews/${editingReview.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingReview),
      });

      const data = await res.json();
      if (data.success) {
        showNotification("success", isNew ? "Yeni yorum eklendi." : "Yorum güncellendi.");
        setIsModalOpen(false);
        setEditingReview(null);
        fetchAllData();
      }
    } catch {
      showNotification("error", "Yorum kaydedilemedi.");
    }
  };

  // REFACTORED CLEAN DELETION HANDLER (Reviews)
  const handleDeleteReview = async (id: string) => {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;

    // Optimistic UI state removal
    setReviews((prev) => prev.filter((r) => r.id !== id));

    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Yorum başarıyla silindi.");
      } else {
        showNotification("error", data.error || "Silme başarısız.");
        fetchAllData();
      }
    } catch {
      showNotification("error", "Silme hatası oluştu.");
      fetchAllData();
    }
  };

  // REFACTORED CLEAN DELETION HANDLER (Messages)
  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

    setMessages((prev) => prev.filter((m) => m.id !== id));

    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        showNotification("success", "Mesaj silindi.");
      } else {
        fetchAllData();
      }
    } catch {
      fetchAllData();
    }
  };

  // If checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
          <span>Yönetici oturumu kontrol ediliyor...</span>
        </div>
      </div>
    );
  }

  // --- LOGIN GUARD SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 text-center space-y-6">
          {/* Official Logo */}
          <div className="w-20 h-20 mx-auto relative p-2 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
            <img
              src="/assets/logo.png"
              alt="Ata Akademi"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#712AE2] text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Güvenli Yönetim Paneli</span>
            </div>
            <h1 className="font-poppins font-bold text-2xl text-slate-900 pt-2">
              Ata Akademi CMS
            </h1>
            <p className="text-xs text-slate-500">
              Lütfen devam etmek için yönetici güvenlik şifrenizi girin.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 text-left animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Yönetici Şifresi (Passcode)
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Şifreyi giriniz..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#712AE2] text-sm text-slate-900 bg-slate-50"
              />
            </div>

            <button
              type="submit"
              className="btn-gradient w-full py-3.5 rounded-xl font-poppins font-semibold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Yönetim Paneline Giriş Yap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100">
            Ata Akademi Yönetim Portalı &bull; Torbalı / İzmir
          </div>
        </div>
      </div>
    );
  }

  const isNewRegistration = homeContent?.siteMode === "NEW_REGISTRATION";

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#F7F9FB] pt-24 pb-16">
      {/* Top Admin Header */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 p-1.5 border border-purple-100 flex items-center justify-center">
              <img src="/assets/logo.png" alt="Ata Akademi" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-lg text-slate-900 flex items-center gap-2">
                Ata Akademi Yönetim Paneli
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  Aktif Oturum
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                Ana Sayfa, Hakkımızda, Mod Switcher, Kurslar, Eğitmenler ve Yorumlar
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-xs flex items-center gap-1.5"
              title="Yenile"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Yenile</span>
            </button>

            <a
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl border border-purple-200 text-[#712AE2] hover:bg-purple-50 transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Siteyi Gör</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-2 overflow-x-auto border-t border-slate-100 pt-2 pb-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "home"
                ? "bg-purple-100 text-[#712AE2]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Ana Sayfa &amp; Mod</span>
          </button>

          <button
            onClick={() => setActiveTab("ai-speed-reading")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "ai-speed-reading"
                ? "bg-purple-100 text-[#712AE2]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#B4136D]" />
            <span>Öne Çıkan Panosu</span>
          </button>

          <button
            onClick={() => setActiveTab("contact-info")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "contact-info"
                ? "bg-purple-100 text-[#712AE2]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <MapPin className="w-4 h-4 text-[#712AE2]" />
            <span>İletişim &amp; Konum Bilgileri</span>
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "about"
                ? "bg-purple-100 text-[#712AE2]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Hakkımızda</span>
          </button>

          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "courses"
                ? "bg-purple-100 text-[#712AE2]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kurslar ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("instructors")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "instructors"
                ? "bg-purple-100 text-[#712AE2]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Eğitmenler ({instructors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "reviews"
                ? "bg-purple-100 text-[#712AE2]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Yorumlar ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "messages"
                ? "bg-purple-100 text-[#712AE2]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Gelen Başvurular ({messages.length})</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm shadow-md animate-in slide-in-from-top ${
              notification.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span>{notification.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* ============================================================ */}
        {/* 1. HOME CMS & DUAL-STATE SITE MODE TAB */}
        {/* ============================================================ */}
        {activeTab === "home" && homeContent && (
          <div className="space-y-8">
            {/* Top Operational Mode Switcher Banner */}
            <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 rounded-3xl p-6 sm:p-8 text-white border border-purple-800/40 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-pink-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Global Site Çalışma Modu</span>
                  </div>
                  <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                    Canlı Site Durumu:{" "}
                    <span className={isNewRegistration ? "text-pink-400" : "text-emerald-400"}>
                      {isNewRegistration
                        ? "Mod 1: Yeni Dönem Kayıtları Açık"
                        : "Mod 2: Kurslar Başladı / Aktif Dönem"}
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                    {isNewRegistration
                      ? "Şu anda sitede erken kayıt çağrıları, kayıt formları, geri sayım rozetleri ve kayıt başlıkları gösterilmektedir."
                      : "Şu anda sitede aktif ders programları, devam eden sınıflar ve ara kayıt bilgilendirme başlıkları gösterilmektedir."}
                  </p>
                </div>

                {/* Switcher Button */}
                <button
                  onClick={handleToggleSiteMode}
                  className={`px-6 py-3.5 rounded-2xl font-poppins font-bold text-sm shadow-lg flex items-center gap-3 transition-all ${
                    isNewRegistration
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white"
                  }`}
                >
                  {isNewRegistration ? (
                    <>
                      <ToggleLeft className="w-6 h-6" />
                      <span>&apos;Kurslar Başladı&apos; Moduna Geç</span>
                    </>
                  ) : (
                    <>
                      <ToggleRight className="w-6 h-6" />
                      <span>&apos;Yeni Dönem Kayıtları&apos; Moduna Geç</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Home Page Content Full Editor Form */}
            <form onSubmit={handleSaveHomeContent} className="space-y-8">
              {/* Section 1: Top Notification Bar */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  1. Üst Bildirim Çubuğu Metinleri (Top Bar)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Yeni Dönem Kayıtları Modu Duyurusu:
                    </label>
                    <input
                      type="text"
                      value={homeContent.topBarNotification?.newRegistration || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          topBarNotification: {
                            ...homeContent.topBarNotification,
                            newRegistration: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Kurslar Başladı Modu Duyurusu:
                    </label>
                    <input
                      type="text"
                      value={homeContent.topBarNotification?.activeTerm || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          topBarNotification: {
                            ...homeContent.topBarNotification,
                            activeTerm: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Hero & Banner Content */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4136D]" />
                  2. Hero / Karşılama Bölümü Metinleri
                </h3>

                {/* Hero Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hero Rozeti (Yeni Kayıt Modu):
                    </label>
                    <input
                      type="text"
                      value={homeContent.hero?.badge?.newRegistration || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          hero: {
                            ...homeContent.hero,
                            badge: {
                              ...homeContent.hero.badge,
                              newRegistration: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hero Rozeti (Aktif Dönem Modu):
                    </label>
                    <input
                      type="text"
                      value={homeContent.hero?.badge?.activeTerm || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          hero: {
                            ...homeContent.hero,
                            badge: {
                              ...homeContent.hero.badge,
                              activeTerm: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>

                {/* Hero Title Elements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Ana Başlık Ön Eki:
                    </label>
                    <input
                      type="text"
                      value={homeContent.hero?.titlePrefix || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          hero: {
                            ...homeContent.hero,
                            titlePrefix: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Vurgulu Marka Metni (Degrade):
                    </label>
                    <input
                      type="text"
                      value={homeContent.hero?.titleHighlight || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          hero: {
                            ...homeContent.hero,
                            titleHighlight: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Ana Başlık Son Eki:
                    </label>
                    <input
                      type="text"
                      value={homeContent.hero?.titleSuffix || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          hero: {
                            ...homeContent.hero,
                            titleSuffix: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>

                {/* Hero Description */}
                <div className="text-xs sm:text-sm">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Hero Açıklama Paragrafı:
                  </label>
                  <textarea
                    rows={3}
                    value={homeContent.hero?.description || ""}
                    onChange={(e) =>
                      setHomeContent({
                        ...homeContent,
                        hero: {
                          ...homeContent.hero,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>

                {/* Hero CTA Button texts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Birincil Buton (Yeni Kayıt Modu):
                    </label>
                    <input
                      type="text"
                      value={homeContent.hero?.primaryBtnText?.newRegistration || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          hero: {
                            ...homeContent.hero,
                            primaryBtnText: {
                              ...homeContent.hero.primaryBtnText,
                              newRegistration: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Birincil Buton (Aktif Dönem Modu):
                    </label>
                    <input
                      type="text"
                      value={homeContent.hero?.primaryBtnText?.activeTerm || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          hero: {
                            ...homeContent.hero,
                            primaryBtnText: {
                              ...homeContent.hero.primaryBtnText,
                              activeTerm: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      İkincil Buton Metni:
                    </label>
                    <input
                      type="text"
                      value={homeContent.hero?.secondaryBtnText || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          hero: {
                            ...homeContent.hero,
                            secondaryBtnText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Statistics Bar */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  3. Canlı İstatistik Sayıları ve Etiketleri
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Öğrenci Sayısı:</label>
                    <input
                      type="text"
                      value={homeContent.stats?.activeStudents || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          stats: { ...homeContent.stats, activeStudents: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                    />
                    <label className="block text-[11px] text-slate-500 mt-1">Etiket:</label>
                    <input
                      type="text"
                      value={homeContent.stats?.activeStudentsLabel || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          stats: { ...homeContent.stats, activeStudentsLabel: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Başarı Oranı:</label>
                    <input
                      type="text"
                      value={homeContent.stats?.successRate || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          stats: { ...homeContent.stats, successRate: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                    />
                    <label className="block text-[11px] text-slate-500 mt-1">Etiket:</label>
                    <input
                      type="text"
                      value={homeContent.stats?.successRateLabel || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          stats: { ...homeContent.stats, successRateLabel: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Toplam Kurs:</label>
                    <input
                      type="text"
                      value={homeContent.stats?.totalCourses || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          stats: { ...homeContent.stats, totalCourses: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                    />
                    <label className="block text-[11px] text-slate-500 mt-1">Etiket:</label>
                    <input
                      type="text"
                      value={homeContent.stats?.totalCoursesLabel || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          stats: { ...homeContent.stats, totalCoursesLabel: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Eğitmen Sayısı:</label>
                    <input
                      type="text"
                      value={homeContent.stats?.expertInstructors || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          stats: { ...homeContent.stats, expertInstructors: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                    />
                    <label className="block text-[11px] text-slate-500 mt-1">Etiket:</label>
                    <input
                      type="text"
                      value={homeContent.stats?.expertInstructorsLabel || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          stats: { ...homeContent.stats, expertInstructorsLabel: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Features Cards */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4136D]" />
                  4. &quot;Neden Ata Akademi?&quot; Özellik Kartları
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bölüm Üst Etiketi:</label>
                    <input
                      type="text"
                      value={homeContent.featuresSection?.tag || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          featuresSection: {
                            ...homeContent.featuresSection,
                            tag: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bölüm Ana Başlığı:</label>
                    <input
                      type="text"
                      value={homeContent.featuresSection?.title || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          featuresSection: {
                            ...homeContent.featuresSection,
                            title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {homeContent.featuresSection?.items?.map((item, idx) => (
                    <div key={item.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="font-bold text-xs text-purple-700">Kart {idx + 1} ({item.icon})</div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...homeContent.featuresSection.items];
                          updated[idx].title = e.target.value;
                          setHomeContent({
                            ...homeContent,
                            featuresSection: {
                              ...homeContent.featuresSection,
                              items: updated,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...homeContent.featuresSection.items];
                          updated[idx].description = e.target.value;
                          setHomeContent({
                            ...homeContent,
                            featuresSection: {
                              ...homeContent.featuresSection,
                              items: updated,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Location & Footer CTA */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  5. Torbalı Kampüs & Alt CTA Bölümü
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Başlık:</label>
                    <input
                      type="text"
                      value={homeContent.locationCta?.title || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          locationCta: { ...homeContent.locationCta, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Resmi Adres Metni:</label>
                    <input
                      type="text"
                      value={homeContent.locationCta?.address || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          locationCta: { ...homeContent.locationCta, address: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="text-xs sm:text-sm">
                  <label className="block font-semibold text-slate-700 mb-1">Açıklama Metni:</label>
                  <textarea
                    rows={2}
                    value={homeContent.locationCta?.description || ""}
                    onChange={(e) =>
                      setHomeContent({
                        ...homeContent,
                        locationCta: { ...homeContent.locationCta, description: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={savingHome}
                  className="btn-gradient px-8 py-4 rounded-2xl font-poppins font-bold text-sm sm:text-base shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-5 h-5" />
                  <span>{savingHome ? "Kaydediliyor..." : "Ana Sayfa Değişikliklerini Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. ÖNE ÇIKAN PANOSU TAB */}
        {/* ============================================================ */}
        {activeTab === "ai-speed-reading" && homeContent && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-purple-800/40 shadow-xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-pink-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Öne Çıkan Panosu Düzenleyici</span>
              </div>
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                Öne Çıkan Panosu
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Bu alandan yapacağınız tüm değişiklikler Ana Sayfa üzerindeki özel Öne Çıkan Panosu tanıtım sütununu, başlıklarını, açıklamasını, 3 adet özellik kutusunu ve yönlendirme butonunu anında canlı olarak günceller.
              </p>
            </div>

            {/* Live Interactive Preview Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#712AE2]" />
                  Canlı Arayüz Önizlemesi (Ana Sayfa Görünümü)
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-[#712AE2]">
                  Canlı Önizleme
                </span>
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span>{homeContent.aiSpeedReadingSection?.badge || "Türkiye'de Tek & Ata Akademi'ye Özel"}</span>
                    </div>

                    <h3 className="font-poppins font-extrabold text-xl sm:text-2xl lg:text-3xl text-white leading-tight">
                      {homeContent.aiSpeedReadingSection?.title || "Yapay Zeka Destekli"}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300">
                        {homeContent.aiSpeedReadingSection?.titleHighlight || "Hızlı Okuma ve Anlama"}
                      </span>{" "}
                      {homeContent.aiSpeedReadingSection?.titleSuffix || "Programı"}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-montserrat">
                      {homeContent.aiSpeedReadingSection?.description ||
                        "Göz kası hareketlerini ve odaklanmayı kişiselleştirilmiş yapay zeka algoritmalarıyla analiz eden Türkiye'nin ilk ve tek tescilli sistemiyle okuma hızınızı 3 ila 5 katına çıkarın, kavrama oranınızı %90'ın üzerine taşıyın."}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {(homeContent.aiSpeedReadingSection?.features || [
                        { id: "ai-feat-1", icon: "zap", title: "Kişiselleştirilmiş AI Algoritmaları" },
                        { id: "ai-feat-2", icon: "award", title: "LGS, YKS, KPSS & ALES Başarısı" },
                        { id: "ai-feat-3", icon: "sparkles", title: "%90+ Kalıcı Anlama Oranı" },
                      ]).map((feat, idx) => (
                        <div
                          key={feat.id || idx}
                          className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 space-y-1"
                        >
                          <div className="flex items-center gap-2 text-pink-300 font-bold text-xs">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Özellik #{idx + 1}</span>
                          </div>
                          <p className="text-xs text-white font-medium line-clamp-2">
                            {feat.title}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <span className="btn-gradient inline-flex px-6 py-3 rounded-xl font-poppins font-bold text-xs sm:text-sm shadow-lg items-center gap-2">
                        <span>{homeContent.aiSpeedReadingSection?.buttonText || "Hızlı okuma ve anlama için ulaşınız."}</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative rounded-2xl overflow-hidden border-2 border-purple-400/30 aspect-[4/3] w-full max-w-sm shadow-2xl">
                      <img
                        src={homeContent.aiSpeedReadingSection?.image || "/assets/courses/hizli-okuma.webp"}
                        alt="Yapay Zeka Destekli Hızlı Okuma"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-pink-600 text-white shadow-md inline-block">
                          {homeContent.aiSpeedReadingSection?.imageBadge || "Tescilli AI Algoritması"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Speed Reading Form Editor */}
            <form onSubmit={handleSaveHomeContent} className="space-y-8">
              {/* Card 1: Titles & Badges */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  1. Başlıklar &amp; Rozet Ayarları
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Üst Rozet Metni (Badge):</label>
                    <input
                      type="text"
                      value={homeContent.aiSpeedReadingSection?.badge || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          aiSpeedReadingSection: {
                            ...(homeContent.aiSpeedReadingSection || {
                              badge: "",
                              title: "",
                              titleHighlight: "",
                              titleSuffix: "",
                              description: "",
                              features: [],
                              buttonText: "",
                              buttonLink: "",
                              image: "",
                              imageBadge: "",
                            }),
                            badge: e.target.value,
                          },
                        })
                      }
                      placeholder="Türkiye'de Tek &amp; Ata Akademi'ye Özel"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Başlık Ön Ek (Title Prefix):</label>
                    <input
                      type="text"
                      value={homeContent.aiSpeedReadingSection?.title || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          aiSpeedReadingSection: {
                            ...(homeContent.aiSpeedReadingSection || {
                              badge: "",
                              title: "",
                              titleHighlight: "",
                              titleSuffix: "",
                              description: "",
                              features: [],
                              buttonText: "",
                              buttonLink: "",
                              image: "",
                              imageBadge: "",
                            }),
                            title: e.target.value,
                          },
                        })
                      }
                      placeholder="Yapay Zeka Destekli"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Vurgulu Başlık (Highlight Gradient):</label>
                    <input
                      type="text"
                      value={homeContent.aiSpeedReadingSection?.titleHighlight || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          aiSpeedReadingSection: {
                            ...(homeContent.aiSpeedReadingSection || {
                              badge: "",
                              title: "",
                              titleHighlight: "",
                              titleSuffix: "",
                              description: "",
                              features: [],
                              buttonText: "",
                              buttonLink: "",
                              image: "",
                              imageBadge: "",
                            }),
                            titleHighlight: e.target.value,
                          },
                        })
                      }
                      placeholder="Hızlı Okuma ve Anlama"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Başlık Son Ek (Title Suffix):</label>
                    <input
                      type="text"
                      value={homeContent.aiSpeedReadingSection?.titleSuffix || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          aiSpeedReadingSection: {
                            ...(homeContent.aiSpeedReadingSection || {
                              badge: "",
                              title: "",
                              titleHighlight: "",
                              titleSuffix: "",
                              description: "",
                              features: [],
                              buttonText: "",
                              buttonLink: "",
                              image: "",
                              imageBadge: "",
                            }),
                            titleSuffix: e.target.value,
                          },
                        })
                      }
                      placeholder="Programı"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Description & CTA Button */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4136D]" />
                  2. Tanıtım Açıklaması &amp; CTA Buton Ayarları
                </h3>

                <div className="text-xs sm:text-sm">
                  <label className="block font-semibold text-slate-700 mb-1">Detaylı Açıklama Paragrafı:</label>
                  <textarea
                    rows={3}
                    value={homeContent.aiSpeedReadingSection?.description || ""}
                    onChange={(e) =>
                      setHomeContent({
                        ...homeContent,
                        aiSpeedReadingSection: {
                          ...(homeContent.aiSpeedReadingSection || {
                            badge: "",
                            title: "",
                            titleHighlight: "",
                            titleSuffix: "",
                            description: "",
                            features: [],
                            buttonText: "",
                            buttonLink: "",
                            image: "",
                            imageBadge: "",
                          }),
                          description: e.target.value,
                        },
                      })
                    }
                    placeholder="Göz kası hareketlerini ve odaklanmayı..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Buton Metni (Button Label):</label>
                    <input
                      type="text"
                      value={homeContent.aiSpeedReadingSection?.buttonText || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          aiSpeedReadingSection: {
                            ...(homeContent.aiSpeedReadingSection || {
                              badge: "",
                              title: "",
                              titleHighlight: "",
                              titleSuffix: "",
                              description: "",
                              features: [],
                              buttonText: "",
                              buttonLink: "",
                              image: "",
                              imageBadge: "",
                            }),
                            buttonText: e.target.value,
                          },
                        })
                      }
                      placeholder="Hızlı okuma ve anlama için ulaşınız."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Buton Hedef Rotası (Button Link):</label>
                    <input
                      type="text"
                      value={homeContent.aiSpeedReadingSection?.buttonLink || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          aiSpeedReadingSection: {
                            ...(homeContent.aiSpeedReadingSection || {
                              badge: "",
                              title: "",
                              titleHighlight: "",
                              titleSuffix: "",
                              description: "",
                              features: [],
                              buttonText: "",
                              buttonLink: "",
                              image: "",
                              imageBadge: "",
                            }),
                            buttonLink: e.target.value,
                          },
                        })
                      }
                      placeholder="/courses/hizli-okuma-ve-anlama"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: 3 Highlight Feature Cards */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  3. Öne Çıkan 3 Bilişsel AI Özelliği
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  {[0, 1, 2].map((idx) => {
                    const currentFeat = (homeContent.aiSpeedReadingSection?.features || [])[idx] || {
                      id: `ai-feat-${idx + 1}`,
                      icon: idx === 0 ? "zap" : idx === 1 ? "award" : "sparkles",
                      title: idx === 0 ? "Kişiselleştirilmiş AI Algoritmaları" : idx === 1 ? "LGS, YKS, KPSS & ALES Başarısı" : "%90+ Kalıcı Anlama Oranı",
                    };
                    return (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">Özellik #{idx + 1}</span>
                          <span className="text-[10px] font-semibold text-purple-600">Madde {idx + 1}</span>
                        </div>

                        <div>
                          <label className="block font-medium text-slate-600 text-xs mb-1">İkon Seçimi:</label>
                          <select
                            value={currentFeat.icon}
                            onChange={(e) => {
                              const feats = [...(homeContent.aiSpeedReadingSection?.features || [
                                { id: "ai-feat-1", icon: "zap", title: "Kişiselleştirilmiş AI Algoritmaları" },
                                { id: "ai-feat-2", icon: "award", title: "LGS, YKS, KPSS & ALES Başarısı" },
                                { id: "ai-feat-3", icon: "sparkles", title: "%90+ Kalıcı Anlama Oranı" },
                              ])];
                              feats[idx] = {
                                ...feats[idx],
                                icon: e.target.value as "zap" | "target" | "award" | "sparkles" | "check",
                              };
                              setHomeContent({
                                ...homeContent,
                                aiSpeedReadingSection: {
                                  ...(homeContent.aiSpeedReadingSection || {
                                    badge: "",
                                    title: "",
                                    titleHighlight: "",
                                    titleSuffix: "",
                                    description: "",
                                    features: [],
                                    buttonText: "",
                                    buttonLink: "",
                                    image: "",
                                    imageBadge: "",
                                  }),
                                  features: feats,
                                },
                              });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                          >
                            <option value="zap">Yıldırım (Hız &amp; Algoritma)</option>
                            <option value="award">Ödül (Sınav &amp; Başarı)</option>
                            <option value="sparkles">Yapay Zeka (İnovasyon &amp; Kavrama)</option>
                            <option value="target">Hedef (Bilişsel Odaklanma)</option>
                            <option value="check">Onay (Garantili Sonuç)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-medium text-slate-600 text-xs mb-1">Özellik Başlığı:</label>
                          <input
                            type="text"
                            value={currentFeat.title}
                            onChange={(e) => {
                              const feats = [...(homeContent.aiSpeedReadingSection?.features || [
                                { id: "ai-feat-1", icon: "zap", title: "Kişiselleştirilmiş AI Algoritmaları" },
                                { id: "ai-feat-2", icon: "award", title: "LGS, YKS, KPSS & ALES Başarısı" },
                                { id: "ai-feat-3", icon: "sparkles", title: "%90+ Kalıcı Anlama Oranı" },
                              ])];
                              feats[idx] = { ...feats[idx], title: e.target.value };
                              setHomeContent({
                                ...homeContent,
                                aiSpeedReadingSection: {
                                  ...(homeContent.aiSpeedReadingSection || {
                                    badge: "",
                                    title: "",
                                    titleHighlight: "",
                                    titleSuffix: "",
                                    description: "",
                                    features: [],
                                    buttonText: "",
                                    buttonLink: "",
                                    image: "",
                                    imageBadge: "",
                                  }),
                                  features: feats,
                                },
                              });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 4: Media & Image */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4136D]" />
                  4. Tanıtım Görseli &amp; Görsel Rozeti
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Görsel Dosya Yolu (Image Path):</label>
                    <input
                      type="text"
                      value={homeContent.aiSpeedReadingSection?.image || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          aiSpeedReadingSection: {
                            ...(homeContent.aiSpeedReadingSection || {
                              badge: "",
                              title: "",
                              titleHighlight: "",
                              titleSuffix: "",
                              description: "",
                              features: [],
                              buttonText: "",
                              buttonLink: "",
                              image: "",
                              imageBadge: "",
                            }),
                            image: e.target.value,
                          },
                        })
                      }
                      placeholder="/assets/courses/hizli-okuma.webp"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Görsel Üzerindeki Rozet (Image Badge):</label>
                    <input
                      type="text"
                      value={homeContent.aiSpeedReadingSection?.imageBadge || ""}
                      onChange={(e) =>
                        setHomeContent({
                          ...homeContent,
                          aiSpeedReadingSection: {
                            ...(homeContent.aiSpeedReadingSection || {
                              badge: "",
                              title: "",
                              titleHighlight: "",
                              titleSuffix: "",
                              description: "",
                              features: [],
                              buttonText: "",
                              buttonLink: "",
                              image: "",
                              imageBadge: "",
                            }),
                            imageBadge: e.target.value,
                          },
                        })
                      }
                      placeholder="Tescilli AI Algoritması"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={savingHome}
                  className="btn-gradient px-8 py-4 rounded-2xl font-poppins font-bold text-sm sm:text-base shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-5 h-5" />
                  <span>{savingHome ? "Kaydediliyor..." : "Öne Çıkan Panosu Değişikliklerini Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. CONTACT & LOCATION CMS TAB */}
        {/* ============================================================ */}
        {activeTab === "contact-info" && contactInfo && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 rounded-3xl p-6 sm:p-8 text-white border border-purple-800/40 shadow-xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-pink-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>Site Geneli İletişim &amp; Konum Yönetimi</span>
              </div>
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                Fiziksel Adres, Telefonlar, Çalışma Saatleri ve Harita Linkleri
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Bu modülden düzenleyeceğiniz bilgiler; sitenin Header (üst bilgi çubuğu), Footer, İletişim Sayfası (/contact), Ana Sayfa lokasyon alanı ve Kurs Detay kartlarında anında ve otomatik olarak güncellenir.
              </p>
            </div>

            {/* Live Interactive Contact Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#712AE2] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-[#712AE2] uppercase">Fiziksel Adres</div>
                <div className="text-sm font-semibold text-slate-900 leading-snug">
                  {contactInfo.address}
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  {contactInfo.addressNote}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#B4136D] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-[#B4136D] uppercase">Telefon &amp; E-Posta</div>
                <div className="text-sm font-bold text-slate-900">
                  {contactInfo.phone}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {contactInfo.email}
                </div>
                <div className="text-[11px] text-slate-400">
                  Tel Linki: {contactInfo.phoneRaw}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-emerald-700 uppercase">Çalışma Saatleri</div>
                <div className="text-xs text-slate-700 space-y-1">
                  <div><strong>Hafta İçi:</strong> {contactInfo.workingHours?.weekdays}</div>
                  <div><strong>Cumartesi:</strong> {contactInfo.workingHours?.saturday}</div>
                  <div><strong>Pazar:</strong> {contactInfo.workingHours?.sunday}</div>
                </div>
              </div>
            </div>

            {/* Contact Info Form Editor */}
            <form onSubmit={handleSaveContactInfo} className="space-y-8">
              {/* Card 1: Physical Campus Address & Landmark */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  1. Fiziksel Yerleşke &amp; Ulaşım Bilgileri
                </h3>

                <div className="text-xs sm:text-sm space-y-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tam Fiziksel Adres (Site Genelinde Gösterilen):
                    </label>
                    <input
                      type="text"
                      value={contactInfo.address || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          address: e.target.value,
                        })
                      }
                      placeholder="Tepeköy, 4550. Sk. No:51/A, 35000 Torbalı/İzmir, İzmir, Türkiye"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Ulaşım &amp; İZBAN / Çevre Tarifi Notu:
                    </label>
                    <input
                      type="text"
                      value={contactInfo.addressNote || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          addressNote: e.target.value,
                        })
                      }
                      placeholder="(Torbalı İZBAN İstasyonu ve İlçe Merkezine 5 dk yürüme mesafesinde)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Contact Channels & Email */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4136D]" />
                  2. Telefon &amp; E-Posta Kanalları
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Görünen Telefon Numarası:
                    </label>
                    <input
                      type="text"
                      value={contactInfo.phone || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          phone: e.target.value,
                        })
                      }
                      placeholder="(0232) 856 00 35"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Arama Bağlantısı (tel: raw number):
                    </label>
                    <input
                      type="text"
                      value={contactInfo.phoneRaw || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          phoneRaw: e.target.value,
                        })
                      }
                      placeholder="+902328560035"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Resmi E-Posta Adresi:
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          email: e.target.value,
                        })
                      }
                      placeholder="info@ataakademi.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Working & Study Hours */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  3. Çalışma &amp; Ders Saatleri
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hafta İçi (Pazartesi - Cuma):
                    </label>
                    <input
                      type="text"
                      value={contactInfo.workingHours?.weekdays || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          workingHours: {
                            ...(contactInfo.workingHours || {
                              weekdays: "",
                              saturday: "",
                              sunday: "",
                              summary: "",
                            }),
                            weekdays: e.target.value,
                          },
                        })
                      }
                      placeholder="09:00 - 20:00"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Cumartesi:
                    </label>
                    <input
                      type="text"
                      value={contactInfo.workingHours?.saturday || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          workingHours: {
                            ...(contactInfo.workingHours || {
                              weekdays: "",
                              saturday: "",
                              sunday: "",
                              summary: "",
                            }),
                            saturday: e.target.value,
                          },
                        })
                      }
                      placeholder="09:00 - 20:00"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Pazar (Etüt &amp; Özel Seans):
                    </label>
                    <input
                      type="text"
                      value={contactInfo.workingHours?.sunday || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          workingHours: {
                            ...(contactInfo.workingHours || {
                              weekdays: "",
                              saturday: "",
                              sunday: "",
                              summary: "",
                            }),
                            sunday: e.target.value,
                          },
                        })
                      }
                      placeholder="10:00 - 18:00 (Özel Seanslar &amp; Etüt)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>

                <div className="text-xs sm:text-sm">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Footer &amp; Kartlar İçin Özet Saat Formatı:
                  </label>
                  <input
                    type="text"
                    value={contactInfo.workingHours?.summary || ""}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        workingHours: {
                          ...(contactInfo.workingHours || {
                            weekdays: "",
                            saturday: "",
                            sunday: "",
                            summary: "",
                          }),
                          summary: e.target.value,
                        },
                      })
                    }
                    placeholder="Hafta İçi &amp; Cts: 09:00 - 20:00 | Pazar: 10:00 - 18:00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              {/* Card 4: Google Maps Links */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4136D]" />
                  4. Google Harita Embed &amp; Rota Bağlantıları
                </h3>

                <div className="text-xs sm:text-sm space-y-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Harita Iframe Embed URL (İletişim Sayfasında Gömülü Harita):
                    </label>
                    <input
                      type="text"
                      value={contactInfo.mapEmbedUrl || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          mapEmbedUrl: e.target.value,
                        })
                      }
                      placeholder="https://maps.google.com/maps?q=Torbal%C4%B1%20Tepek%C3%B6y%204550%20Sokak&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Doğrudan Google Maps Rota Linki:
                    </label>
                    <input
                      type="text"
                      value={contactInfo.mapDirectUrl || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          mapDirectUrl: e.target.value,
                        })
                      }
                      placeholder="https://maps.google.com/?q=Tepeköy,+4550.+Sk.+No:51/A,+35000+Torbalı/İzmir"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Card 5: Social Media Links */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  5. Sosyal Medya Hesapları
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Instagram URL:</label>
                    <input
                      type="text"
                      value={contactInfo.socialLinks?.instagram || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          socialLinks: {
                            ...(contactInfo.socialLinks || { instagram: "", facebook: "", linkedin: "", youtube: "" }),
                            instagram: e.target.value,
                          },
                        })
                      }
                      placeholder="https://instagram.com/ataakademi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Facebook URL:</label>
                    <input
                      type="text"
                      value={contactInfo.socialLinks?.facebook || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          socialLinks: {
                            ...(contactInfo.socialLinks || { instagram: "", facebook: "", linkedin: "", youtube: "" }),
                            facebook: e.target.value,
                          },
                        })
                      }
                      placeholder="https://facebook.com/ataakademi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">LinkedIn URL:</label>
                    <input
                      type="text"
                      value={contactInfo.socialLinks?.linkedin || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          socialLinks: {
                            ...(contactInfo.socialLinks || { instagram: "", facebook: "", linkedin: "", youtube: "" }),
                            linkedin: e.target.value,
                          },
                        })
                      }
                      placeholder="https://linkedin.com/company/ataakademi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">YouTube URL:</label>
                    <input
                      type="text"
                      value={contactInfo.socialLinks?.youtube || ""}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          socialLinks: {
                            ...(contactInfo.socialLinks || { instagram: "", facebook: "", linkedin: "", youtube: "" }),
                            youtube: e.target.value,
                          },
                        })
                      }
                      placeholder="https://youtube.com/@ataakademi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={savingContact}
                  className="btn-gradient px-8 py-4 rounded-2xl font-poppins font-bold text-sm sm:text-base shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-5 h-5" />
                  <span>{savingContact ? "Kaydediliyor..." : "İletişim &amp; Konum Bilgilerini Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. ABOUT CMS TAB */}
        {/* ============================================================ */}
        {activeTab === "about" && aboutContent && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-purple-800/40 shadow-xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-pink-300">
                <Award className="w-3.5 h-3.5" />
                <span>Hakkımızda Sayfa İçerik Yönetimi (/about)</span>
              </div>
              <h2 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                Kurumsal Kimlik, Hikaye, Misyon, Vizyon ve Değerler
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Bu panelden yapacağınız tüm değişiklikler canlı `/about` sayfasındaki başlıkları, hikaye paragraflarını, misyon-vizyon kartlarını ve kurumsal ilkeleri anında günceller.
              </p>
            </div>

            <form onSubmit={handleSaveAboutContent} className="space-y-8">
              {/* Section 1: Header Banner */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  1. Başlık & Karşılama Bannerı
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Üst Rozet Metni:</label>
                    <input
                      type="text"
                      value={aboutContent.header?.badge || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          header: { ...aboutContent.header, badge: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Ana Sayfa Başlığı:</label>
                    <input
                      type="text"
                      value={aboutContent.header?.title || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          header: { ...aboutContent.header, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>

                <div className="text-xs sm:text-sm">
                  <label className="block font-semibold text-slate-700 mb-1">Banner Tanıtım Açıklaması:</label>
                  <textarea
                    rows={3}
                    value={aboutContent.header?.description || ""}
                    onChange={(e) =>
                      setAboutContent({
                        ...aboutContent,
                        header: { ...aboutContent.header, description: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              {/* Section 2: Story & Campus */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4136D]" />
                  2. Kurumsal Hikaye, Kampüs Bilgisi ve Öne Çıkanlar
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bölüm Üst Etiketi:</label>
                    <input
                      type="text"
                      value={aboutContent.story?.tag || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          story: { ...aboutContent.story, tag: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bölüm Ana Başlığı:</label>
                    <input
                      type="text"
                      value={aboutContent.story?.title || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          story: { ...aboutContent.story, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">1. Paragraf (Eğitim Yaklaşımı):</label>
                    <textarea
                      rows={4}
                      value={aboutContent.story?.paragraph1 || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          story: { ...aboutContent.story, paragraph1: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">2. Paragraf (Torbalı & Teknoloji):</label>
                    <textarea
                      rows={4}
                      value={aboutContent.story?.paragraph2 || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          story: { ...aboutContent.story, paragraph2: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                {/* Highlights (3 items) */}
                <div className="space-y-2 pt-2">
                  <label className="block font-semibold text-slate-700 text-xs sm:text-sm">
                    Öne Çıkan 3 Madde (Madde İşaretleri):
                  </label>
                  {aboutContent.story?.highlights?.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-purple-600 w-6">{idx + 1}.</span>
                      <input
                        type="text"
                        value={hl}
                        onChange={(e) => {
                          const updated = [...aboutContent.story.highlights];
                          updated[idx] = e.target.value;
                          setAboutContent({
                            ...aboutContent,
                            story: { ...aboutContent.story, highlights: updated },
                          });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Campus Image & Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kampüs Kart Başlığı:</label>
                    <input
                      type="text"
                      value={aboutContent.story?.campusTitle || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          story: { ...aboutContent.story, campusTitle: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kampüs Adres Metni:</label>
                    <input
                      type="text"
                      value={aboutContent.story?.campusAddress || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          story: { ...aboutContent.story, campusAddress: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Görsel Dosya Yolu:</label>
                    <input
                      type="text"
                      value={aboutContent.story?.campusImage || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          story: { ...aboutContent.story, campusImage: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Mission & Vision */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#712AE2]" />
                  3. Misyon ve Vizyon Metinleri
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                  {/* Mission */}
                  <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 space-y-3">
                    <div className="flex items-center gap-2 text-[#712AE2] font-bold">
                      <Target className="w-4 h-4" />
                      <span>Misyon Kartı</span>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Başlık:</label>
                      <input
                        type="text"
                        value={aboutContent.missionVision?.missionTitle || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            missionVision: {
                              ...aboutContent.missionVision,
                              missionTitle: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Misyon Açıklaması:</label>
                      <textarea
                        rows={4}
                        value={aboutContent.missionVision?.missionDescription || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            missionVision: {
                              ...aboutContent.missionVision,
                              missionDescription: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="p-4 rounded-xl border border-pink-100 bg-pink-50/40 space-y-3">
                    <div className="flex items-center gap-2 text-[#B4136D] font-bold">
                      <Eye className="w-4 h-4" />
                      <span>Vizyon Kartı</span>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Başlık:</label>
                      <input
                        type="text"
                        value={aboutContent.missionVision?.visionTitle || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            missionVision: {
                              ...aboutContent.missionVision,
                              visionTitle: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Vizyon Açıklaması:</label>
                      <textarea
                        rows={4}
                        value={aboutContent.missionVision?.visionDescription || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            missionVision: {
                              ...aboutContent.missionVision,
                              visionDescription: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Institutional Values */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-poppins font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B4136D]" />
                  4. Kurumsal İlkeler ve Değerler (4 Kart)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bölüm Üst Etiketi:</label>
                    <input
                      type="text"
                      value={aboutContent.valuesSection?.tag || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          valuesSection: {
                            ...aboutContent.valuesSection,
                            tag: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Bölüm Ana Başlığı:</label>
                    <input
                      type="text"
                      value={aboutContent.valuesSection?.title || ""}
                      onChange={(e) =>
                        setAboutContent({
                          ...aboutContent,
                          valuesSection: {
                            ...aboutContent.valuesSection,
                            title: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {aboutContent.valuesSection?.items?.map((item, idx) => (
                    <div key={item.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-purple-700">Değer Kartı {idx + 1}</span>
                        <select
                          value={item.icon}
                          onChange={(e) => {
                            const updated = [...aboutContent.valuesSection.items];
                            updated[idx].icon = e.target.value as any;
                            setAboutContent({
                              ...aboutContent,
                              valuesSection: {
                                ...aboutContent.valuesSection,
                                items: updated,
                              },
                            });
                          }}
                          className="px-2 py-1 rounded-md border border-slate-200 bg-white text-xs"
                        >
                          <option value="shield">Güvenlik / Kalkan</option>
                          <option value="users">Öğrenci / Kullanıcılar</option>
                          <option value="sparkles">İnovasyon / Işıltı</option>
                          <option value="heart">İletişim / Kalp & El Sıkışma</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...aboutContent.valuesSection.items];
                          updated[idx].title = e.target.value;
                          setAboutContent({
                            ...aboutContent,
                            valuesSection: {
                              ...aboutContent.valuesSection,
                              items: updated,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                      />
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...aboutContent.valuesSection.items];
                          updated[idx].description = e.target.value;
                          setAboutContent({
                            ...aboutContent,
                            valuesSection: {
                              ...aboutContent.valuesSection,
                              items: updated,
                            },
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={savingAbout}
                  className="btn-gradient px-8 py-4 rounded-2xl font-poppins font-bold text-sm sm:text-base shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-5 h-5" />
                  <span>{savingAbout ? "Kaydediliyor..." : "Hakkımızda Değişikliklerini Kaydet"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. COURSES TAB */}
        {/* ============================================================ */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-poppins font-bold text-xl text-slate-900">
                  Kurs Yönetimi (/courses)
                </h2>
                <p className="text-xs text-slate-500">
                  Yabancı dil ve kişisel gelişim eğitimlerini ekleyin, düzenleyin veya kalıcı olarak silin.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCourse({
                    title: "",
                    category: "Yabancı Dil",
                    level: "A1 - B2",
                    shortDescription: "",
                    fullDescription: "",
                    duration: "12 Hafta",
                    weeklyHours: "4 Saat / Hafta",
                    price: "Ücret ve Detaylı Bilgi İçin İletişime Geçiniz",
                    instructorName: instructors[0]?.name || "Elif Yılmaz",
                    instructorId: instructors[0]?.id || "inst-1",
                    image: "/assets/courses/ingilizce.webp",
                    badge: "Yeni Dönem",
                    isVisible: true,
                    featured: true,
                    learningOutcomes: ["Akıcı konuşma becerisi"],
                    modules: [
                      {
                        id: "m1",
                        title: "Giriş Modülü",
                        description: "Temel kavramlar ve diyaloglar",
                        duration: "4 Hafta",
                      },
                    ],
                  });
                  setIsModalOpen(true);
                }}
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Kurs Ekle</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">Kurs Görseli & Adı</th>
                      <th className="p-4">Kategori & Seviye</th>
                      <th className="p-4">Eğitmen</th>
                      <th className="p-4">Süre & Haftalık Ders</th>
                      <th className="p-4 text-center">Durum</th>
                      <th className="p-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 line-clamp-1">
                                {course.title}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                slug: /{course.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-[#712AE2] border border-purple-100">
                            {course.category}
                          </span>
                          <div className="text-[11px] text-slate-500 mt-1">
                            {course.level}
                          </div>
                        </td>
                        <td className="p-4 text-slate-700 font-medium">
                          {course.instructorName}
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-900">{course.duration}</div>
                          <div className="text-[11px] text-slate-500">{course.weeklyHours}</div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => toggleCourseVisibility(course)}
                            className={`p-1.5 rounded-lg text-xs font-semibold ${
                              course.isVisible
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                            }`}
                            title={
                              course.isVisible
                                ? "Yayında (Gizlemek için tıkla)"
                                : "Gizli (Yayınlamak için tıkla)"
                            }
                          >
                            {course.isVisible ? (
                              <Eye className="w-4 h-4" />
                            ) : (
                              <EyeOff className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-1">
                          <button
                            onClick={() => {
                              setEditingCourse(course);
                              setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                            title="Düzenle"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Kalıcı Olarak Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 4. INSTRUCTORS TAB */}
        {/* ============================================================ */}
        {activeTab === "instructors" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-poppins font-bold text-xl text-slate-900">
                  Eğitmen Kadrosu Yönetimi (/instructors)
                </h2>
                <p className="text-xs text-slate-500">
                  Eğitmen biyografileri, yabancı dil uzmanlıkları ve profil resimlerini yönetin veya silin.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingInstructor({
                    name: "",
                    title: "Kıdemli Dil Eğitmeni",
                    languages: ["İngilizce"],
                    bio: "",
                    experience: "5+ Yıl Deneyim",
                    education: "Lisans / Yüksek Lisans",
                    image: "/assets/instructors/instructor-1.webp",
                    rating: 5.0,
                    studentCount: 100,
                    isVisible: true,
                  });
                  setIsModalOpen(true);
                }}
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Eğitmen Ekle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((inst) => (
                <div
                  key={inst.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border">
                      <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-slate-900 truncate">{inst.name}</h3>
                      <p className="text-xs text-[#712AE2] font-medium truncate">{inst.title}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {inst.languages.map((l, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-purple-50 text-[#712AE2] px-2 py-0.5 rounded-md font-semibold"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-3 pt-3 border-t border-slate-100">
                    {inst.bio}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400">{inst.experience}</span>
                    <div className="space-x-1">
                      <button
                        onClick={() => {
                          setEditingInstructor(inst);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteInstructor(inst.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 5. REVIEWS TAB */}
        {/* ============================================================ */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-poppins font-bold text-xl text-slate-900">
                  Öğrenci Yorumları Yönetimi (/reviews)
                </h2>
                <p className="text-xs text-slate-500">
                  Site genelinde sergilenen mezun yorumlarını ve değerlendirmeleri yönetin veya silin.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingReview({
                    studentName: "",
                    courseTitle: "İngilizce Eğitimi",
                    rating: 5,
                    comment: "",
                    avatar: "/assets/reviews/student-1.webp",
                    date: new Date().toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                    isVisible: true,
                    featured: true,
                  });
                  setIsModalOpen(true);
                }}
                className="btn-gradient px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Yorum Ekle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border">
                        <img src={rev.avatar} alt={rev.studentName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{rev.studentName}</h4>
                        <span className="text-xs text-[#712AE2] font-medium">{rev.courseTitle}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-xs font-bold text-slate-700">{rev.rating}.0</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                    <span>{rev.date}</span>
                    <div className="space-x-1">
                      <button
                        onClick={() => {
                          setEditingReview(rev);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. MESSAGES TAB */}
        {/* ============================================================ */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-poppins font-bold text-xl text-slate-900">
                Gelen İletişim & Başvuru Formları
              </h2>
              <p className="text-xs text-slate-500">
                Web sitesi iletişim ve kurs detay sayfalarından gönderilen başvuruları inceleyin veya silin.
              </p>
            </div>

            {messages.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 text-sm">
                Henüz yeni bir iletişim başvurusu bulunmamaktadır.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{msg.fullName}</h4>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-[#712AE2] font-semibold">
                          {msg.courseInterest}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">
                          {new Date(msg.createdAt).toLocaleString("tr-TR")}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Mesajı Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
                      <span>
                        <strong>Telefon:</strong>{" "}
                        <a href={`tel:${msg.phone}`} className="text-purple-600 hover:underline">
                          {msg.phone}
                        </a>
                      </span>
                      {msg.email && (
                        <span>
                          <strong>E-Posta:</strong>{" "}
                          <a href={`mailto:${msg.email}`} className="text-purple-600 hover:underline">
                            {msg.email}
                          </a>
                        </span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 mt-2">
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* EDIT / CREATE MODALS (Courses, Instructors, Reviews) */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="font-poppins font-bold text-xl text-slate-900">
                {editingCourse && (editingCourse.id ? "Kursu Düzenle" : "Yeni Kurs Ekle")}
                {editingInstructor && (editingInstructor.id ? "Eğitmeni Düzenle" : "Yeni Eğitmen Ekle")}
                {editingReview && (editingReview.id ? "Yorumu Düzenle" : "Yeni Yorum Ekle")}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCourse(null);
                  setEditingInstructor(null);
                  setEditingReview(null);
                }}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                ✕
              </button>
            </div>

            {/* Course Form */}
            {editingCourse && (
              <form onSubmit={handleSaveCourse} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kurs Başlığı *</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.title || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Kategori *</label>
                    <select
                      value={editingCourse.category || "Yabancı Dil"}
                      onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <option value="Yabancı Dil">Yabancı Dil</option>
                      <option value="Kişisel Gelişim">Kişisel Gelişim</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Seviye</label>
                    <input
                      type="text"
                      value={editingCourse.level || ""}
                      onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
                      placeholder="A1 - C1"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Toplam Süre</label>
                    <input
                      type="text"
                      value={editingCourse.duration || ""}
                      onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                      placeholder="12 Hafta / Kur"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Haftalık Ders Saati</label>
                    <input
                      type="text"
                      value={editingCourse.weeklyHours || ""}
                      onChange={(e) => setEditingCourse({ ...editingCourse, weeklyHours: e.target.value })}
                      placeholder="6 Saat / Hafta"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-xs text-[#712AE2] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0 text-[#B4136D]" />
                  <span><strong>Fiyat Politikası:</strong> Fiyat gösterilmez, kullanıcılar doğrudan <em>&apos;Ücret ve Detaylı Bilgi İçin İletişime Geçiniz&apos;</em> ile iletişim sayfasına yönlendirilir.</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kısa Açıklama</label>
                  <textarea
                    rows={2}
                    value={editingCourse.shortDescription || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, shortDescription: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Detaylı Açıklama</label>
                  <textarea
                    rows={4}
                    value={editingCourse.fullDescription || ""}
                    onChange={(e) => setEditingCourse({ ...editingCourse, fullDescription: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Yerel Görsel Yolu</label>
                    <input
                      type="text"
                      value={editingCourse.image || ""}
                      onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                      placeholder="/assets/courses/ingilizce.webp"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Eğitmen Adı</label>
                    <input
                      type="text"
                      value={editingCourse.instructorName || ""}
                      onChange={(e) => setEditingCourse({ ...editingCourse, instructorName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCourse.isVisible !== false}
                      onChange={(e) => setEditingCourse({ ...editingCourse, isVisible: e.target.checked })}
                      className="rounded text-purple-600"
                    />
                    <span className="font-semibold text-slate-700">Yayında Göster</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCourse.featured === true}
                      onChange={(e) => setEditingCourse({ ...editingCourse, featured: e.target.checked })}
                      className="rounded text-purple-600"
                    />
                    <span className="font-semibold text-slate-700">Öne Çıkan</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600"
                  >
                    İptal
                  </button>
                  <button type="submit" className="btn-gradient px-6 py-2.5 rounded-xl font-semibold">
                    Kaydet
                  </button>
                </div>
              </form>
            )}

            {/* Instructor Form */}
            {editingInstructor && (
              <form onSubmit={handleSaveInstructor} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Eğitmen Adı Soyadı *</label>
                  <input
                    type="text"
                    required
                    value={editingInstructor.name || ""}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unvan *</label>
                  <input
                    type="text"
                    required
                    value={editingInstructor.title || ""}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, title: e.target.value })}
                    placeholder="Kıdemli İngilizce & Almanca Eğitmeni"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Deneyim</label>
                    <input
                      type="text"
                      value={editingInstructor.experience || ""}
                      onChange={(e) => setEditingInstructor({ ...editingInstructor, experience: e.target.value })}
                      placeholder="8+ Yıl Deneyim"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Eğitim / Mezuniyet</label>
                    <input
                      type="text"
                      value={editingInstructor.education || ""}
                      onChange={(e) => setEditingInstructor({ ...editingInstructor, education: e.target.value })}
                      placeholder="Ege Üniversitesi İngiliz Dili ve Edebiyatı"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Biyografi</label>
                  <textarea
                    rows={3}
                    value={editingInstructor.bio || ""}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, bio: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Yerel Görsel Yolu</label>
                  <input
                    type="text"
                    value={editingInstructor.image || ""}
                    onChange={(e) => setEditingInstructor({ ...editingInstructor, image: e.target.value })}
                    placeholder="/assets/instructors/instructor-1.webp"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600"
                  >
                    İptal
                  </button>
                  <button type="submit" className="btn-gradient px-6 py-2.5 rounded-xl font-semibold">
                    Kaydet
                  </button>
                </div>
              </form>
            )}

            {/* Review Form */}
            {editingReview && (
              <form onSubmit={handleSaveReview} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Öğrenci Adı Soyadı *</label>
                  <input
                    type="text"
                    required
                    value={editingReview.studentName || ""}
                    onChange={(e) => setEditingReview({ ...editingReview, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Katıldığı Kurs</label>
                    <input
                      type="text"
                      value={editingReview.courseTitle || ""}
                      onChange={(e) => setEditingReview({ ...editingReview, courseTitle: e.target.value })}
                      placeholder="İngilizce Eğitimi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Puan (1-5)</label>
                    <select
                      value={editingReview.rating || 5}
                      onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <option value={5}>5 Yıldız (Mükemmel)</option>
                      <option value={4}>4 Yıldız (Çok İyi)</option>
                      <option value={3}>3 Yıldız (Orta)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Öğrenci Yorumu *</label>
                  <textarea
                    rows={4}
                    required
                    value={editingReview.comment || ""}
                    onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Yerel Avatar Yolu</label>
                  <input
                    type="text"
                    value={editingReview.avatar || ""}
                    onChange={(e) => setEditingReview({ ...editingReview, avatar: e.target.value })}
                    placeholder="/assets/reviews/student-1.webp"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600"
                  >
                    İptal
                  </button>
                  <button type="submit" className="btn-gradient px-6 py-2.5 rounded-xl font-semibold">
                    Kaydet
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
