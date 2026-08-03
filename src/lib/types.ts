export interface StrapiMedia {
  id?: number;
  url: string;
  name?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface WhyChooseUsItem {
  id?: number;
  iconName?: string;
  icon?: StrapiMedia | string;
  title: string;
  description: string;
}

export interface TimelineItem {
  id?: number;
  year: string;
  title: string;
  description: string;
}

export interface CertificationItem {
  id?: number;
  logo?: StrapiMedia | string;
  name: string;
}

export interface PressLogoItem {
  id?: number;
  logo?: StrapiMedia | string;
  name?: string;
}

// 1. Homepage Single Type
export interface HomepageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: StrapiMedia | string;
  statsYearsExperience: number;
  statsHappyPatients: string;
  statsBranchesCount: number;
  statsSpecialtiesCount: number;
  whyChooseUs: WhyChooseUsItem[];
}

// 2. AboutPage Single Type
export interface AboutPageData {
  doctorPhoto?: StrapiMedia | string;
  bio: string;
  timeline: TimelineItem[];
  certifications: CertificationItem[];
  pressLogos: PressLogoItem[];
  philosophyQuote: string;
}

// 3. Service Collection Type
export interface ServiceData {
  id: string | number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  image?: StrapiMedia | string;
}

// 4. Branch Collection Type
export interface BranchData {
  id: string | number;
  name: string;
  address: string;
  workingHours: string;
  phone: string;
  latitude: number;
  longitude: number;
  image?: StrapiMedia | string;
}

// 5. BeautyCenterPage Single Type
export interface BeautyCenterPageData {
  heroImage?: StrapiMedia | string;
  heroTagline: string;
  featuredServices: WhyChooseUsItem[];
  whyChooseUs: WhyChooseUsItem[];
  galleryImages: (StrapiMedia | string)[];
}

// 6. BeforeAfter Collection Type
export interface BeforeAfterData {
  id: string | number;
  beforeImage: StrapiMedia | string;
  afterImage: StrapiMedia | string;
  treatmentName: string;
  sessionsCount: number;
  category: string;
  bodyArea: string;
}

// 7. Article Collection Type
export interface ArticleData {
  id: string | number;
  title: string;
  slug: string;
  coverImage?: StrapiMedia | string;
  excerpt: string;
  content: string;
  category: string;
  publishedDate: string;
  readingTime: string;
}

// 8. FAQ Collection Type
export interface FAQData {
  id: string | number;
  question: string;
  answer: string;
  category: string;
}

// 9. Review Collection Type
export interface ReviewData {
  id: string | number;
  patientName: string;
  patientPhoto?: StrapiMedia | string;
  rating: number;
  comment: string;
  serviceTag: string;
  postedDate: string;
}

// 10. ContactMessage Submission Type
export interface ContactMessageInput {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}
