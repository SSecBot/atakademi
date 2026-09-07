import fs from "fs";
import path from "path";
import initialData from "@/data/initial-data.json";
import {
  Course,
  Instructor,
  Review,
  ContactMessage,
  SiteStatistics,
  HomePageContent,
  AboutPageContent,
  SiteMode,
  ContactInfo,
} from "@/types";

interface DataStore {
  courses: Course[];
  instructors: Instructor[];
  reviews: Review[];
  messages: ContactMessage[];
  statistics: SiteStatistics;
  homeContent: HomePageContent;
  aboutContent: AboutPageContent;
  contactInfo: ContactInfo;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src/data/store.json");

class AtaRepository {
  private memoryStore: DataStore | null = null;

  private readStore(): DataStore {
    try {
      if (fs.existsSync(DATA_FILE_PATH)) {
        const raw = fs.readFileSync(DATA_FILE_PATH, "utf-8");
        const parsed = JSON.parse(raw) as Partial<DataStore>;
        // Ensure homeContent exists and has aiSpeedReadingSection
        if (!parsed.homeContent) {
          parsed.homeContent = initialData.homeContent as unknown as HomePageContent;
        } else if (!parsed.homeContent.aiSpeedReadingSection) {
          parsed.homeContent.aiSpeedReadingSection = (initialData.homeContent as unknown as HomePageContent).aiSpeedReadingSection;
        }
        // Ensure aboutContent exists
        if (!parsed.aboutContent) {
          parsed.aboutContent = initialData.aboutContent as AboutPageContent;
        }
        // Ensure contactInfo exists
        if (!parsed.contactInfo) {
          parsed.contactInfo = initialData.contactInfo as ContactInfo;
        }
        return parsed as DataStore;
      }
    } catch (e) {
      console.warn("Could not read store file, falling back to initial data:", e);
    }

    if (!this.memoryStore) {
      this.memoryStore = {
        courses: initialData.courses as Course[],
        instructors: initialData.instructors as Instructor[],
        reviews: initialData.reviews as Review[],
        messages: [],
        statistics: initialData.statistics as SiteStatistics,
        homeContent: initialData.homeContent as unknown as HomePageContent,
        aboutContent: initialData.aboutContent as AboutPageContent,
        contactInfo: initialData.contactInfo as ContactInfo,
      };
      this.writeStore(this.memoryStore);
    }

    return this.memoryStore;
  }

  private writeStore(store: DataStore): void {
    this.memoryStore = store;
    try {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(store, null, 2), "utf-8");
    } catch (e) {
      console.warn("Could not persist store to disk:", e);
    }
  }

  // --- Home Content & Site Mode ---
  public getHomeContent(): HomePageContent {
    const store = this.readStore();
    return store.homeContent || (initialData.homeContent as HomePageContent);
  }

  public updateHomeContent(updates: Partial<HomePageContent>): HomePageContent {
    const store = this.readStore();
    store.homeContent = {
      ...store.homeContent,
      ...updates,
    };
    this.writeStore(store);
    return store.homeContent;
  }

  public setSiteMode(mode: SiteMode): HomePageContent {
    const store = this.readStore();
    store.homeContent.siteMode = mode;
    this.writeStore(store);
    return store.homeContent;
  }

  public toggleSiteMode(): HomePageContent {
    const store = this.readStore();
    const currentMode = store.homeContent.siteMode;
    const newMode: SiteMode = currentMode === "NEW_REGISTRATION" ? "ACTIVE_TERM" : "NEW_REGISTRATION";
    store.homeContent.siteMode = newMode;
    this.writeStore(store);
    return store.homeContent;
  }

  // --- About Content ---
  public getAboutContent(): AboutPageContent {
    const store = this.readStore();
    return store.aboutContent || (initialData.aboutContent as AboutPageContent);
  }

  public updateAboutContent(updates: Partial<AboutPageContent>): AboutPageContent {
    const store = this.readStore();
    store.aboutContent = {
      ...store.aboutContent,
      ...updates,
    };
    this.writeStore(store);
    return store.aboutContent;
  }

  // --- Contact Info & Location ---
  public getContactInfo(): ContactInfo {
    const store = this.readStore();
    return store.contactInfo || (initialData.contactInfo as ContactInfo);
  }

  public updateContactInfo(updates: Partial<ContactInfo>): ContactInfo {
    const store = this.readStore();
    store.contactInfo = {
      ...store.contactInfo,
      ...updates,
      workingHours: {
        ...(store.contactInfo?.workingHours || initialData.contactInfo.workingHours),
        ...(updates.workingHours || {}),
      },
      socialLinks: {
        ...(store.contactInfo?.socialLinks || initialData.contactInfo.socialLinks),
        ...(updates.socialLinks || {}),
      },
    };
    this.writeStore(store);
    return store.contactInfo;
  }

  // --- Courses CRUD ---
  public getAllCourses(includeHidden = false): Course[] {
    const store = this.readStore();
    return includeHidden ? store.courses : store.courses.filter((c) => c.isVisible);
  }

  public getCourseBySlug(slug: string): Course | undefined {
    const store = this.readStore();
    return store.courses.find((c) => c.slug === slug && c.isVisible);
  }

  public getCourseById(id: string): Course | undefined {
    const store = this.readStore();
    return store.courses.find((c) => c.id === id);
  }

  public createCourse(data: Omit<Course, "id" | "createdAt" | "updatedAt">): Course {
    const store = this.readStore();
    const newCourse: Course = {
      ...data,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.courses.unshift(newCourse);
    this.writeStore(store);
    return newCourse;
  }

  public updateCourse(id: string, updates: Partial<Course>): Course | null {
    const store = this.readStore();
    const index = store.courses.findIndex((c) => c.id === id);
    if (index === -1) return null;

    store.courses[index] = {
      ...store.courses[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.writeStore(store);
    return store.courses[index];
  }

  /**
   * Complete atomic deletion of course from store.
   */
  public deleteCourse(id: string, hardDelete = true): boolean {
    const store = this.readStore();
    const index = store.courses.findIndex((c) => c.id === id);
    if (index === -1) return false;

    if (hardDelete) {
      store.courses.splice(index, 1);
    } else {
      store.courses[index].isVisible = false;
      store.courses[index].updatedAt = new Date().toISOString();
    }
    this.writeStore(store);
    return true;
  }

  // --- Instructors CRUD ---
  public getAllInstructors(includeHidden = false): Instructor[] {
    const store = this.readStore();
    return includeHidden ? store.instructors : store.instructors.filter((i) => i.isVisible);
  }

  public getInstructorById(id: string): Instructor | undefined {
    const store = this.readStore();
    return store.instructors.find((i) => i.id === id);
  }

  public createInstructor(data: Omit<Instructor, "id" | "createdAt" | "updatedAt">): Instructor {
    const store = this.readStore();
    const newInstructor: Instructor = {
      ...data,
      id: `inst-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.instructors.unshift(newInstructor);
    this.writeStore(store);
    return newInstructor;
  }

  public updateInstructor(id: string, updates: Partial<Instructor>): Instructor | null {
    const store = this.readStore();
    const index = store.instructors.findIndex((i) => i.id === id);
    if (index === -1) return null;

    store.instructors[index] = {
      ...store.instructors[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.writeStore(store);
    return store.instructors[index];
  }

  /**
   * Complete atomic deletion of instructor from store.
   */
  public deleteInstructor(id: string, hardDelete = true): boolean {
    const store = this.readStore();
    const index = store.instructors.findIndex((i) => i.id === id);
    if (index === -1) return false;

    if (hardDelete) {
      store.instructors.splice(index, 1);
    } else {
      store.instructors[index].isVisible = false;
      store.instructors[index].updatedAt = new Date().toISOString();
    }
    this.writeStore(store);
    return true;
  }

  // --- Reviews CRUD ---
  public getAllReviews(includeHidden = false): Review[] {
    const store = this.readStore();
    return includeHidden ? store.reviews : store.reviews.filter((r) => r.isVisible);
  }

  public getReviewById(id: string): Review | undefined {
    const store = this.readStore();
    return store.reviews.find((r) => r.id === id);
  }

  public createReview(data: Omit<Review, "id" | "createdAt" | "updatedAt">): Review {
    const store = this.readStore();
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.reviews.unshift(newReview);
    this.writeStore(store);
    return newReview;
  }

  public updateReview(id: string, updates: Partial<Review>): Review | null {
    const store = this.readStore();
    const index = store.reviews.findIndex((r) => r.id === id);
    if (index === -1) return null;

    store.reviews[index] = {
      ...store.reviews[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.writeStore(store);
    return store.reviews[index];
  }

  /**
   * Complete atomic deletion of review from store.
   */
  public deleteReview(id: string, hardDelete = true): boolean {
    const store = this.readStore();
    const index = store.reviews.findIndex((r) => r.id === id);
    if (index === -1) return false;

    if (hardDelete) {
      store.reviews.splice(index, 1);
    } else {
      store.reviews[index].isVisible = false;
      store.reviews[index].updatedAt = new Date().toISOString();
    }
    this.writeStore(store);
    return true;
  }

  // --- Contact Messages ---
  public createContactMessage(data: Omit<ContactMessage, "id" | "createdAt" | "isRead">): ContactMessage {
    const store = this.readStore();
    const newMessage: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    if (!store.messages) store.messages = [];
    store.messages.unshift(newMessage);
    this.writeStore(store);
    return newMessage;
  }

  public getAllMessages(): ContactMessage[] {
    const store = this.readStore();
    return store.messages || [];
  }

  public deleteMessage(id: string): boolean {
    const store = this.readStore();
    if (!store.messages) return false;
    const index = store.messages.findIndex((m) => m.id === id);
    if (index === -1) return false;
    store.messages.splice(index, 1);
    this.writeStore(store);
    return true;
  }

  // --- Site Statistics ---
  public getStatistics(): SiteStatistics {
    const store = this.readStore();
    const visibleCourses = store.courses.filter((c) => c.isVisible).length;
    const visibleInstructors = store.instructors.filter((i) => i.isVisible).length;

    return {
      activeStudents: store.statistics?.activeStudents || 1250,
      totalCourses: visibleCourses || 7,
      expertInstructors: visibleInstructors || 5,
      successRate: store.statistics?.successRate || 98,
    };
  }
}

export const ataRepository = new AtaRepository();
