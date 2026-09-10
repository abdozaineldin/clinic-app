import { createClient } from "./supabase/client";
import {
  HomepageData,
  AboutPageData,
  ServiceData,
  BranchData,
  BeautyCenterPageData,
  BeforeAfterData,
  ArticleData,
  FAQData,
  ReviewData,
  ContactMessageInput,
  BookingData,
  CreateBookingInput,
} from "./types";

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder"));
}

// 1. Homepage Data Fetcher
export async function getHomepageData(): Promise<HomepageData | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data: homeRow } = await supabase
      .from("homepage")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    const { data: whyChooseUs } = await supabase
      .from("homepage_why_choose_us")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!homeRow) return null;

    return {
      heroTitle: homeRow.hero_title || "",
      heroSubtitle: homeRow.hero_subtitle || "",
      heroImage: homeRow.hero_image_url || "",
      statsYearsExperience: homeRow.stats_years_experience ?? 0,
      statsHappyPatients: homeRow.stats_happy_patients || "",
      statsBranchesCount: homeRow.stats_branches_count ?? 0,
      statsSpecialtiesCount: homeRow.stats_specialties_count ?? 0,
      whyChooseUs: whyChooseUs
        ? whyChooseUs.map((item) => ({
          id: item.id,
          iconName: item.icon_name,
          title: item.title,
          description: item.description,
        }))
        : [],
    };
  } catch (error) {
    console.error("Error fetching homepage data from Supabase:", error);
    return null;
  }
}

// 2. About Page Data Fetcher
export async function getAboutPageData(): Promise<AboutPageData | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data: aboutRow } = await supabase
      .from("about_page")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    const { data: timeline } = await supabase
      .from("about_timeline")
      .select("*")
      .order("sort_order", { ascending: true });

    const { data: certs } = await supabase
      .from("about_certifications")
      .select("*")
      .order("sort_order", { ascending: true });

    const { data: press } = await supabase
      .from("about_press_logos")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!aboutRow) return null;

    return {
      doctorPhoto: aboutRow.doctor_photo_url || "",
      bio: aboutRow.bio || "",
      philosophyQuote: aboutRow.philosophy_quote || "",
      timeline: timeline
        ? timeline.map((t) => ({ id: t.id, year: t.year, title: t.title, description: t.description }))
        : [],
      certifications: certs
        ? certs.map((c) => ({ id: c.id, name: c.name, logo: c.logo_url }))
        : [],
      pressLogos: press
        ? press.map((p) => ({ id: p.id, name: p.name, logo: p.logo_url }))
        : [],
    };
  } catch (error) {
    console.error("Error fetching about page data from Supabase:", error);
    return null;
  }
}

// 3. Services Fetchers
export async function getServices(): Promise<ServiceData[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data) return [];

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      shortDescription: item.short_description,
      fullDescription: item.full_description,
      category: item.category,
      image: item.image_url,
    }));
  } catch (error) {
    console.error("Error fetching services from Supabase:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) || null;
}

// 4. Branches Fetcher
export async function getBranches(): Promise<BranchData[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data) return [];

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      workingHours: item.working_hours,
      phone: item.phone,
      latitude: item.latitude,
      longitude: item.longitude,
      image: item.image_url,
    }));
  } catch (error) {
    console.error("Error fetching branches from Supabase:", error);
    return [];
  }
}

// 5. Beauty Center Data Fetcher
export async function getBeautyCenterData(): Promise<BeautyCenterPageData | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data: pageRow } = await supabase
      .from("beauty_center_page")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    const { data: featured } = await supabase
      .from("beauty_center_featured_services")
      .select("*")
      .order("sort_order", { ascending: true });

    const { data: whyChooseUs } = await supabase
      .from("beauty_center_why_choose_us")
      .select("*")
      .order("sort_order", { ascending: true });

    const { data: gallery } = await supabase
      .from("beauty_center_gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!pageRow) return null;

    return {
      heroImage: pageRow.hero_image_url || "",
      heroTagline: pageRow.hero_tagline || "",
      featuredServices: featured
        ? featured.map((f) => ({ id: f.id, iconName: f.icon_name, title: f.title, description: f.description }))
        : [],
      whyChooseUs: whyChooseUs
        ? whyChooseUs.map((w) => ({ id: w.id, iconName: w.icon_name, title: w.title, description: w.description }))
        : [],
      galleryImages: gallery ? gallery.map((g) => g.image_url) : [],
    };
  } catch (error) {
    console.error("Error fetching beauty center data from Supabase:", error);
    return null;
  }
}

// 6. Before & After Cases Fetcher
export async function getBeforeAfters(): Promise<BeforeAfterData[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("before_afters")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data) return [];

    return data.map((item) => ({
      id: item.id,
      image: item.image_url,
    }));
  } catch (error) {
    console.error("Error fetching before/after cases from Supabase:", error);
    return [];
  }
}

// 7. Articles Fetchers
export async function getArticles(): Promise<ArticleData[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data) return [];

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      coverImage: item.cover_image_url,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      publishedDate: item.published_date,
      readingTime: item.reading_time,
    }));
  } catch (error) {
    console.error("Error fetching articles from Supabase:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleData | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) || null;
}

// 8. FAQs Fetcher
export async function getFAQs(): Promise<FAQData[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data) return [];

    return data.map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      category: item.category,
    }));
  } catch (error) {
    console.error("Error fetching FAQs from Supabase:", error);
    return [];
  }
}

// 9. Reviews Fetcher
export async function getReviews(): Promise<ReviewData[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data) return [];

    return data.map((item) => ({
      id: item.id,
      image: item.image_url,
    }));
  } catch (error) {
    console.error("Error fetching reviews from Supabase:", error);
    return [];
  }
}

// 10. POST Contact Message
export async function sendContactMessage(
  input: ContactMessageInput
): Promise<{ success: boolean; message?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: "الموقع غير متصل بقاعدة البيانات حالياً. يرجى المحاولة لاحقاً.",
    };
  }
  try {
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert({
      full_name: input.fullName,
      phone: input.phone,
      email: input.email,
      message: input.message,
    });

    if (error) {
      console.error("Supabase contact_messages insert error:", error);
      return {
        success: false,
        message: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.",
      };
    }
    return {
      success: true,
      message: "تم تسليم رسالتك بنجاح وسيتواصل معك فريقنا في أقرب وقت!",
    };
  } catch (error) {
    return {
      success: false,
      message: "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
    };
  }
}

// 11. Booking System Functions
export async function getBookingsForBranchAndDate(
  branchId: string | number,
  date: string
): Promise<BookingData[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_booked_slots", {
      p_branch_id: Number(branchId),
      p_date: date,
    });

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: 0,
      branch: Number(branchId),
      service: item.service_id,
      date: date,
      time: item.booked_time,
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      status: "pending",
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export async function createBooking(input: CreateBookingInput): Promise<{
  success: boolean;
  data?: BookingData;
  message?: string;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "الموقع غير متصل بقاعدة البيانات حالياً. يرجى المحاولة لاحقاً.",
    };
  }
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        branch_id: Number(input.branch),
        service_id: Number(input.service),
        date: input.date,
        time: input.time,
        patient_name: input.patientName,
        patient_phone: input.patientPhone,
        patient_email: input.patientEmail || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      // Postgres UNIQUE constraint code is 23505
      if (error.code === "23505" || error.message.includes("unique_active_booking")) {
        return {
          success: false,
          error: "عذراً، هذا الموعد تم حجزه قبل قليل بواسطة عميل آخر. يرجى اختيار موعد آخر.",
        };
      }
      return {
        success: false,
        error: error.message || "حدث خطأ أثناء إجراء الحجز. يرجى المحاولة لاحقاً.",
      };
    }

    return {
      success: true,
      data: {
        id: data.id,
        branch: data.branch_id,
        service: data.service_id,
        date: data.date,
        time: data.time,
        patientName: data.patient_name,
        patientPhone: data.patient_phone,
        patientEmail: data.patient_email,
        status: data.status,
        createdAt: data.created_at,
      },
      message: "تم حجز الموعد بنجاح!",
    };
  } catch (error: any) {
    return {
      success: false,
      error: "حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.",
    };
  }
}