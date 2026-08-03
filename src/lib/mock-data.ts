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
} from "./types";

export const MOCK_HOMEPAGE: HomepageData = {
  heroTitle: "مركز د. منال سرحان للجلدية والتجميل والعلاج بالليزر",
  heroSubtitle:
    "نعيد لبشرتك نضارتها ولجمالك تألقه بأحدث تقنيات الطب التجميلي والعناية بالبشرة تحت إشراف نخبة متخصصة.",
  heroImage:
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  statsYearsExperience: 14,
  statsHappyPatients: "+5,000",
  statsBranchesCount: 3,
  statsSpecialtiesCount: 20,
  whyChooseUs: [
    {
      id: 1,
      iconName: "Sparkles",
      title: "أحدث التقنيات العالمية",
      description:
        "نستخدم أجهزة ليزر وتجميل حاصلة على اعتماد FDA الأمريكي لضمان أفضل النتائج.",
    },
    {
      id: 2,
      iconName: "UserCheck",
      title: "خبرة طويلة بالثقة",
      description:
        "أكثر من 14 عاماً من الخبرة الطبية المتميزة في العلاجات الجلدية والتجميلية.",
    },
    {
      id: 3,
      iconName: "ShieldCheck",
      title: "أعلى معايير الأمان",
      description: "علاجات آمنة ومخصصة تناسب نوع بشرتك واحتياجاتك الفردية.",
    },
    {
      id: 4,
      iconName: "HeartHandshake",
      title: "رعاية متكاملة وخاصة",
      description:
        "متابعة دقيقة لكل حالة مع خطة علاجية مصممة خصيصاً للحفاظ على نتائج مستدامة.",
    },
  ],
};

export const MOCK_ABOUT: AboutPageData = {
  doctorPhoto:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  bio: "استشارية الأمراض الجلدية والتجميل والعلاج بالليزر. تمتلك د. منال سرحان خبرة تجاوزت 14 عاماً في تقديم أحدث الحلول العلاجية والتجميلية للبشرة والشعر، مع تركيز دائم على النتائج الطبيعية الآمنة لكل حالة.",
  timeline: [
    {
      year: "2010",
      title: "التخرج والبداية",
      description: "تخرجت من كلية الطب وبدأت رحلة التخصص في طب الجلد.",
    },
    {
      year: "2015",
      title: "درجة الماجستير",
      description:
        "نيل درجة الماجستير في الأمراض الجلدية والتناسلية بتقدير امتياز.",
    },
    {
      year: "2018",
      title: "افتتاح العيادة الرئيسية",
      description:
        "تأسيس مركز متكامل للعناية بالبشرة والتجميل وبرؤية للامتداد.",
    },
    {
      year: "2024",
      title: "جائزة الابتكار الطبي",
      description:
        "الحصول على جائزة تقديرية لاستخدام تقنيات الليزر الحديثة في الجراحة والتجميل.",
    },
  ],
  certifications: [
    { name: "البورد المصري للأمراض الجلدية" },
    { name: "زمالة الجمعية المصرية للجلدية والتناسلية" },
    { name: "عضوية الجمعية الأوروبية للجلدية (EADV)" },
    { name: "شهادة معتمدة في العلاج بالليزر" },
  ],
  pressLogos: [
    { name: "قناة النهار" },
    { name: "CBC" },
    { name: "صدى البلد" },
    { name: "ET بالعربي" },
  ],
  philosophyQuote:
    "نؤمن بأن الجمال الطبيعي هو أجمل أنواع الجمال، ومهمتنا هي مساعدتك في الحفاظ عليه بأكثر الطرق أماناً وفعالية.",
};

export const MOCK_SERVICES: ServiceData[] = [
  {
    id: 1,
    title: "إزالة الشعر بالليزر",
    slug: "laser-hair-removal",
    category: "الليزر",
    shortDescription:
      "تقنيات متطورة لإزالة الشعر بأمان وفعالية وتدوم نتائجها طويلاً.",
    fullDescription:
      "جلسات إزالة الشعر بالليزر في مراكزنا تعتمد على أحدث الأجهزة العالمية المعتمدة طبياً. تمتاز الجلسات بالسرعة والفعالية والأمان التام لجميع مناطق الجسم مع نظام تبريد مبتكر لمنع الشعور بالألم.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "حقن البوتوكس والفيلر",
    slug: "botox-fillers",
    category: "التجميل غير الجراحي",
    shortDescription:
      "علاج تجاعيد التعبير واستعادة حجم الوجه بنتائج طبيعية ومشرقة.",
    fullDescription:
      "نستخدم أفضل الماركات العالمية المعتمدة طبياً لحقن البوتوكس والفيلر. يساعد البوتوكس على إخفاء الخطوط التعبيرية في الجبهة وحول العينين، بينما يعمل الفيلر على تعبئة الخدود وتحديد الشفاه بدون أي تكتلات.",
    image:
      "https://images.unsplash.com/photo-1512290900676-26c2a4d48dc1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "جلسات تنظيف البشرة العميق",
    slug: "deep-facial-cleansing",
    category: "العناية بالبشرة",
    shortDescription:
      "تنظيف عميق وتقشير لطيف وترطيب مكثف لإعطاء بشرتك نضارة فورية.",
    fullDescription:
      "تقنية التنظيف الخماسية تعمل على إزالة الخلايا الميتة والشوائب من مسام البشرة، مع ضخ سيرومات مغذية غنية بمضادات الأكسدة وحمض الهيالورونيك لتغذية البشرة وتفتيحها فورياً.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "علاج التصبغات والآثار",
    slug: "pigmentation-treatment",
    category: "الليزر",
    shortDescription:
      "تجديد خلايا البشرة والتخلص من ندبات حب الشباب والتصبغات المستعصية.",
    fullDescription:
      "الليزر الجزئي يساعد على تحفيز إنتاج الكولاجين الطبيعي في طبقات الجلد العميقة، مما يقلل من ندبات حب الشباب، الآثار، الكلف، والخطوط الدقيقة.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "علاجات تساقط الشعر",
    slug: "hair-loss-treatment",
    category: "علاجات الشعر",
    shortDescription:
      "حقن البلازما والسيرومات المغذية لتقوية البصيلات وتحفيز نمو الشعر.",
    fullDescription:
      "جلسات البلازما الغنية بالصفائح (PRP) والميزوثيرابي للشعر تساعد في تقليل تساقط الشعر وزيادة كثافته ونموه بطرق آمنة وطبيعية.",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "شد الوجه والرقبة بدون جراحة",
    slug: "non-surgical-face-lift",
    category: "التجميل غير الجراحي",
    shortDescription:
      "شد بدون جراحة باستخدام الموجات فوق الصوتية المكثفة لتحفيز الكولاجين.",
    fullDescription:
      "تقنية شد البشرة الحديثة تعمل على شد الترهلات في الوجه والرقبة، وتحديد خط الفك بدون أي تدخل جراحي أو فترة توقف عن العمل.",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80",
  },
];

export const MOCK_BRANCHES: BranchData[] = [
  {
    id: 1,
    name: "فرع الزرقا",
    address: "[العنوان بالتفصيل] - الزرقا - مصر",
    workingHours: "السبت - الخميس: 9:00 صباحاً - 9:00 مساءً",
    phone: "+20 123 456 7890",
    latitude: 30.0444,
    longitude: 31.2357,
    image:
      "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "فرع النزل",
    address: "[العنوان بالتفصيل] - النزل - مصر",
    workingHours: "السبت - الخميس: 9:00 صباحاً - 9:00 مساءً",
    phone: "+20 123 456 7891",
    latitude: 30.05,
    longitude: 31.24,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "سنتر التجميل - النزل",
    address: "[العنوان بالتفصيل] - النزل - مصر",
    workingHours: "السبت - الخميس: 10:00 صباحاً - 10:00 مساءً",
    phone: "+20 123 456 7892",
    latitude: 30.052,
    longitude: 31.242,
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
  },
];

export const MOCK_BEAUTY_CENTER: BeautyCenterPageData = {
  heroTagline: "تجربة فاخرة لجمالك تدمج بين الرفاهية والخدمات الطبية المعتمدة",
  heroImage:
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80",
  featuredServices: [
    {
      id: 1,
      title: "إزالة الشعر بالليزر",
      description: "تقنيات متطورة لإزالة الشعر بأمان وفعالية وثقة تدوم.",
    },
    {
      id: 2,
      title: "شد البشرة",
      description: "تقنيات متقدمة لرفع ونحت وقوام الجسم بأمان.",
    },
    {
      id: 3,
      title: "نحت الجسم",
      description: "جهاز حديث لنحت وتشكيل القوام وإذابة الدهون العنيدة.",
    },
    {
      id: 4,
      title: "عناية البشرة المتقدمة",
      description: "جلسات تنظيف وعلاج مشاكل البشرة المتقدمة.",
    },
    {
      id: 5,
      title: "تقشير كيميائي",
      description: "تقشيرات آمنة لتحسين ملمس ولون البشرة.",
    },
  ],
  whyChooseUs: [
    {
      id: 1,
      title: "أحدث الأجهزة",
      description: "نستخدم تقنيات عالمية متطورة مضمونة الجودة.",
    },
    {
      id: 2,
      title: "أطباء متخصصون",
      description: "خبرة عالية في مجال التجميل والليزر.",
    },
    {
      id: 3,
      title: "معايير عالية الجودة",
      description: "بروتوكولات دولية صارمة في كل خطوة.",
    },
    {
      id: 4,
      title: "نتائج طبيعية",
      description: "نحرص على نتائج طبيعية تلامس ذوقك ولا تفضحك.",
    },
    {
      id: 5,
      title: "متابعة مستمرة",
      description: "رعاية قبل وبعد كل جلسة لضمان أفضل النتائج.",
    },
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80",
  ],
};

export const MOCK_BEFORE_AFTER: BeforeAfterData[] = [
  {
    id: 1,
    treatmentName: "علاج التصبغات وبقع الشمس",
    category: "Skin",
    sessionsCount: 4,
    bodyArea: "الوجه",
    beforeImage:
      "https://images.unsplash.com/photo-1512290900676-26c2a4d48dc1?auto=format&fit=crop&w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    treatmentName: "إزالة الشعر بالليزر",
    category: "Hair Removal",
    sessionsCount: 6,
    bodyArea: "منطقة الساق",
    beforeImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    treatmentName: "علاج حب الشباب",
    category: "Acne",
    sessionsCount: 5,
    bodyArea: "الوجه",
    beforeImage:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    treatmentName: "شد البشرة (ترافية الوجه)",
    category: "Skin Tightening",
    sessionsCount: 3,
    bodyArea: "الوجه والرقبة",
    beforeImage:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80",
  },
];

export const MOCK_ARTICLES: ArticleData[] = [
  {
    id: 1,
    title: "دليل شامل للتقشير الكيميائي وأثاره وفوائده المتوقعة",
    slug: "chemical-peeling-guide",
    category: "العناية بالبشرة",
    excerpt:
      "تعرفي على أنواع التقشير الكيميائي وفوائده والنتائج المتوقعة منه لبشرة أكثر نضارة.",
    content:
      "التقشير الكيميائي من أكثر الإجراءات فعالية في تحسين ملمس البشرة وتوحيد لونها. تختلف أنواعه حسب عمق التقشير المطلوب واحتياج كل بشرة، وننصح دائماً باستشارة الطبيب المختص لاختيار النوع الأنسب لحالتك.",
    publishedDate: "2026-07-20",
    readingTime: "7 دقائق",
    coverImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "هل يعود الشعر بعد إزالته بالليزر؟",
    slug: "does-hair-grow-back-after-laser",
    category: "الليزر",
    excerpt:
      "الإجابة العلمية الواضحة عن هذا السؤال الذي يتردد كثيراً والعوامل التي تؤثر في نجاح الجلسات على المدى البعيد.",
    content:
      "بعد إتمام العدد الموصى به من الجلسات، تقل كثافة الشعر بشكل كبير جداً وقد لا يعود نهائياً في معظم الحالات. العوامل الهرمونية الفردية قد تؤثر على النتيجة النهائية، لذا يُنصح بالمتابعة الدورية مع الطبيب المختص.",
    publishedDate: "2026-07-12",
    readingTime: "5 دقائق",
    coverImage:
      "https://images.unsplash.com/photo-1512290900676-26c2a4d48dc1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "نصائح ذهبية للعناية بالبشرة في الشتاء",
    slug: "winter-skincare-tips",
    category: "نصائح عامة",
    excerpt:
      "روتين متكامل لحماية بشرتك من الجفاف والتشققات خلال فصل الشتاء البارد.",
    content:
      "فصل الشتاء يتطلب روتيناً خاصاً يرتكز على الترطيب العميق باستخدام كريمات غنية، وتجنب الاستحمام بالماء الساخن جداً، مع الحفاظ على شرب كمية كافية من الماء للحفاظ على مرونة البشرة ونضارتها.",
    publishedDate: "2026-07-05",
    readingTime: "5 دقائق",
    coverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  },
];

export const MOCK_FAQS: FAQData[] = [
  {
    id: 1,
    question: "كيف يمكنني حجز موعد؟",
    answer:
      'يمكنك حجز موعد بسهولة من خلال صفحة "حجز موعد" واختيار الفرع والخدمة والتاريخ المناسب لك، وسنرسل لك رسالة تأكيد على واتساب أو البريد الإلكتروني.',
    category: "الحجز",
  },
  {
    id: 2,
    question: "هل يمكن تعديل أو إلغاء الموعد؟",
    answer:
      'نعم، يمكنك تعديل أو إلغاء موعدك من خلال التواصل معنا على الرقم الموضح في صفحة "تواصل معنا" قبل الموعد بوقت كافٍ.',
    category: "الحجز",
  },
  {
    id: 3,
    question: "هل الجلسات مؤلمة؟",
    answer:
      "نستخدم أحدث الأجهزة المزودة بأنظمة تبريد متقدمة لتقليل الشعور بالألم قدر الإمكان، وتختلف درجة الإحساس حسب نوع العلاج وحساسية كل بشرة.",
    category: "الخدمات",
  },
  {
    id: 4,
    question: "هل النتائج دائمة؟",
    answer:
      "تختلف مدة دوام النتائج حسب نوع الإجراء المتبع، وسيقوم الطبيب المختص بشرح ذلك بالتفصيل أثناء الاستشارة قبل بدء أي علاج.",
    category: "الخدمات",
  },
  {
    id: 5,
    question: "ما هي طرق الدفع المتاحة؟",
    answer:
      "نوفر عدة طرق للدفع تشمل الدفع النقدي والدفع بالبطاقات البنكية داخل جميع فروعنا.",
    category: "الدفع",
  },
  {
    id: 6,
    question: "هل تتوفر الخدمات في جميع الفروع؟",
    answer:
      "معظم الخدمات متوفرة في جميع فروعنا، وبعض الخدمات المتخصصة تتوفر حصرياً في سنتر التجميل بالنزل. يمكنك التأكد من توفر خدمتك في الفرع الأقرب لك عند الحجز.",
    category: "الفروع",
  },
];

export const MOCK_REVIEWS: ReviewData[] = [
  {
    id: 1,
    patientName: "سارة محمد",
    rating: 5,
    comment:
      "تجربة رائعة ونتائج واضحة جداً، نضارة في البشرة من أول جلسة. أنصح بشدة بالتعامل مع د. نورة وفريقها المتميز.",
    serviceTag: "إزالة الشعر بالليزر",
    postedDate: "منذ 3 أيام",
    patientPhoto:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    patientName: "مريم أحمد",
    rating: 5,
    comment:
      "جلسة مريحة جداً والنتائج واضحة في نضارة البشرة. أنصح بشدة بالتعامل مع دكتورة منال، فريق خبير ومتمكنة من عملها.",
    serviceTag: "شد البشرة",
    postedDate: "منذ أسبوع",
    patientPhoto:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    patientName: "ليلى محمود",
    rating: 5,
    comment:
      "أفضل عيادة تعاملت معها في القاهرة، دقة في المواعيد واحترافية عالية في الأداء. شكراً جزيلاً لجميع الطاقم.",
    serviceTag: "تجميل الوجه",
    postedDate: "منذ أسبوعين",
    patientPhoto:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
];
