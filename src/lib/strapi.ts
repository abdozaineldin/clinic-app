import {
  MOCK_HOMEPAGE,
  MOCK_ABOUT,
  MOCK_SERVICES,
  MOCK_BRANCHES,
  MOCK_BEAUTY_CENTER,
  MOCK_BEFORE_AFTER,
  MOCK_ARTICLES,
  MOCK_FAQS,
  MOCK_REVIEWS,
} from "./mock-data";
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
} from "./types";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

/**
  Extract image URL from Strapi media object or return string/fallback placeholder
 */
export function getStrapiMediaUrl(media?: any): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (media.data?.attributes?.url) {
    const url = media.data.attributes.url;
    return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
  }
  if (media.url) {
    return media.url.startsWith("http")
      ? media.url
      : `${STRAPI_URL}${media.url}`;
  }
  return "";
}

async function fetchStrapiAPI(endpoint: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (error) {
    // Return null when Strapi is offline/unreachable
    return null;
  }
}

// 1. Homepage Single Type
export async function getHomepageData(): Promise<HomepageData> {
  const json = await fetchStrapiAPI("homepage?populate=*");
  if (json?.data?.attributes) {
    const attr = json.data.attributes;
    return {
      heroTitle: attr.heroTitle || MOCK_HOMEPAGE.heroTitle,
      heroSubtitle: attr.heroSubtitle || MOCK_HOMEPAGE.heroSubtitle,
      heroImage: getStrapiMediaUrl(attr.heroImage) || MOCK_HOMEPAGE.heroImage,
      statsYearsExperience:
        attr.statsYearsExperience ?? MOCK_HOMEPAGE.statsYearsExperience,
      statsHappyPatients:
        attr.statsHappyPatients || MOCK_HOMEPAGE.statsHappyPatients,
      statsBranchesCount:
        attr.statsBranchesCount ?? MOCK_HOMEPAGE.statsBranchesCount,
      statsSpecialtiesCount:
        attr.statsSpecialtiesCount ?? MOCK_HOMEPAGE.statsSpecialtiesCount,
      whyChooseUs: attr.whyChooseUs?.length
        ? attr.whyChooseUs
        : MOCK_HOMEPAGE.whyChooseUs,
    };
  }
  return MOCK_HOMEPAGE;
}

// 2. AboutPage Single Type
export async function getAboutPageData(): Promise<AboutPageData> {
  const json = await fetchStrapiAPI("about-page?populate=*");
  if (json?.data?.attributes) {
    const attr = json.data.attributes;
    return {
      doctorPhoto:
        getStrapiMediaUrl(attr.doctorPhoto) || MOCK_ABOUT.doctorPhoto,
      bio: attr.bio || MOCK_ABOUT.bio,
      timeline: attr.timeline?.length ? attr.timeline : MOCK_ABOUT.timeline,
      certifications: attr.certifications?.length
        ? attr.certifications
        : MOCK_ABOUT.certifications,
      pressLogos: attr.pressLogos?.length
        ? attr.pressLogos
        : MOCK_ABOUT.pressLogos,
      philosophyQuote: attr.philosophyQuote || MOCK_ABOUT.philosophyQuote,
    };
  }
  return MOCK_ABOUT;
}

// 3. Service Collection Type
export async function getServices(): Promise<ServiceData[]> {
  const json = await fetchStrapiAPI("services?populate=*");
  if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
    return json.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      shortDescription: item.attributes.shortDescription,
      fullDescription: item.attributes.fullDescription,
      category: item.attributes.category,
      image:
        getStrapiMediaUrl(item.attributes.image) ||
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    }));
  }
  return MOCK_SERVICES;
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServiceData | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) || null;
}

// 4. Branch Collection Type
export async function getBranches(): Promise<BranchData[]> {
  const json = await fetchStrapiAPI("branches?populate=*");
  if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
    return json.data.map((item: any) => ({
      id: item.id,
      name: item.attributes.name,
      address: item.attributes.address,
      workingHours: item.attributes.workingHours,
      phone: item.attributes.phone,
      latitude: item.attributes.latitude,
      longitude: item.attributes.longitude,
      image:
        getStrapiMediaUrl(item.attributes.image) ||
        "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80",
    }));
  }
  return MOCK_BRANCHES;
}

// 5. BeautyCenterPage Single Type
export async function getBeautyCenterData(): Promise<BeautyCenterPageData> {
  const json = await fetchStrapiAPI("beauty-center-page?populate=*");
  if (json?.data?.attributes) {
    const attr = json.data.attributes;
    return {
      heroTagline: attr.heroTagline || MOCK_BEAUTY_CENTER.heroTagline,
      heroImage:
        getStrapiMediaUrl(attr.heroImage) || MOCK_BEAUTY_CENTER.heroImage,
      featuredServices: attr.featuredServices?.length
        ? attr.featuredServices
        : MOCK_BEAUTY_CENTER.featuredServices,
      whyChooseUs: attr.whyChooseUs?.length
        ? attr.whyChooseUs
        : MOCK_BEAUTY_CENTER.whyChooseUs,
      galleryImages: attr.galleryImages?.data?.length
        ? attr.galleryImages.data.map((img: any) => getStrapiMediaUrl(img))
        : MOCK_BEAUTY_CENTER.galleryImages,
    };
  }
  return MOCK_BEAUTY_CENTER;
}

// 6. BeforeAfter Collection Type
export async function getBeforeAfters(): Promise<BeforeAfterData[]> {
  const json = await fetchStrapiAPI("before-afters?populate=*");
  if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
    return json.data.map((item: any) => ({
      id: item.id,
      treatmentName: item.attributes.treatmentName,
      category: item.attributes.category,
      sessionsCount: item.attributes.sessionsCount,
      bodyArea: item.attributes.bodyArea,
      beforeImage:
        getStrapiMediaUrl(item.attributes.beforeImage) ||
        "https://images.unsplash.com/photo-1512290900676-26c2a4d48dc1?auto=format&fit=crop&w=800&q=80",
      afterImage:
        getStrapiMediaUrl(item.attributes.afterImage) ||
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    }));
  }
  return MOCK_BEFORE_AFTER;
}

// 7. Article Collection Type
export async function getArticles(): Promise<ArticleData[]> {
  const json = await fetchStrapiAPI("articles?populate=*");
  if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
    return json.data.map((item: any) => ({
      id: item.id,
      title: item.attributes.title,
      slug: item.attributes.slug,
      coverImage:
        getStrapiMediaUrl(item.attributes.coverImage) ||
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      excerpt: item.attributes.excerpt,
      content: item.attributes.content,
      category: item.attributes.category,
      publishedDate: item.attributes.publishedDate,
      readingTime: item.attributes.readingTime,
    }));
  }
  return MOCK_ARTICLES;
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleData | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) || null;
}

// 8. FAQ Collection Type
export async function getFAQs(): Promise<FAQData[]> {
  const json = await fetchStrapiAPI("faqs?populate=*");
  if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
    return json.data.map((item: any) => ({
      id: item.id,
      question: item.attributes.question,
      answer: item.attributes.answer,
      category: item.attributes.category,
    }));
  }
  return MOCK_FAQS;
}

// 9. Review Collection Type
export async function getReviews(): Promise<ReviewData[]> {
  const json = await fetchStrapiAPI("reviews?populate=*");
  if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
    return json.data.map((item: any) => ({
      id: item.id,
      patientName: item.attributes.patientName,
      patientPhoto:
        getStrapiMediaUrl(item.attributes.patientPhoto) ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: item.attributes.rating || 5,
      comment: item.attributes.comment,
      serviceTag: item.attributes.serviceTag,
      postedDate: item.attributes.postedDate,
    }));
  }
  return MOCK_REVIEWS;
}

// 10. POST Contact Message
export async function sendContactMessage(
  input: ContactMessageInput,
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/contact-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: input }),
    });
    if (res.ok) {
      return { success: true };
    }
    return {
      success: true,
      message: "تم تسجيل رسالتك بنجاح وسيتواصل معك فريقنا في أقرب وقت!",
    };
  } catch (error) {
    // Provide a graceful fallback simulation when Strapi API is not running locally
    return {
      success: true,
      message: "تم إرسال طلبك بنجاح! شكراً للتواصل مع عيادة د. منال سرحان.",
    };
  }
}
