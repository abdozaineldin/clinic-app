# دليل إعداد باك إند Strapi Headless CMS

هذا المستند يشرح بالتفصيل كيفية إعداد وتكوين أنواع المحتوى (Content Types) في Strapi CMS لتطابق نموذج بيانات موقع عيادة **د. منال سرحان (Dr. Manal Sarhan)**.

---

## 1. ضبط الصلاحيات للمحتوى العام (Public Permissions)

> [!IMPORTANT]
> بعد إنشاء أنواع المحتوى التالية في Strapi Admin Panel:
>
> 1. انتقلي إلى **Settings** -> **Users & Permissions Plugin** -> **Roles**.
> 2. انقري على دور **Public**.
> 3. قومي بتحديد صلاحية **find** و **findOne** لكل نوع محتوى (Collection Type / Single Type).
> 4. بالنسبة لنوع المحتوى `ContactMessage` قومي بتفعيل صلاحية **create**.
> 5. انقري على **Save**.

---

## 2. أنواع المحتوى الأحادية (Single Types)

### أ) `Homepage` (الصفحة الرئيسية)

- `heroTitle` (Text / Short)
- `heroSubtitle` (Text / Long)
- `heroImage` (Media / Single)
- `statsYearsExperience` (Number / Integer)
- `statsHappyPatients` (Text / Short)
- `statsBranchesCount` (Number / Integer)
- `statsSpecialtiesCount` (Number / Integer)
- `whyChooseUs` (Component / Repeatable):
  - `title` (Text)
  - `description` (Text)
  - `icon` (Media)

### ب) `AboutPage` (عن الدكتورة)

- `doctorPhoto` (Media / Single)
- `bio` (Rich Text)
- `timeline` (Component / Repeatable):
  - `year` (Text)
  - `title` (Text)
  - `description` (Text)
- `certifications` (Component / Repeatable):
  - `name` (Text)
  - `logo` (Media)
- `pressLogos` (Component / Repeatable):
  - `name` (Text)
  - `logo` (Media)
- `philosophyQuote` (Text)

### ج) `BeautyCenterPage` (مركز التجميل والسبا)

- `heroImage` (Media / Single)
- `heroTagline` (Text)
- `featuredServices` (Component / Repeatable):
  - `title` (Text)
  - `description` (Text)
- `whyChooseUs` (Component / Repeatable):
  - `title` (Text)
  - `description` (Text)
- `galleryImages` (Media / Multiple)

---

## 3. مجموعات المحتوى (Collection Types)

### أ) `Service` (الخدمات)

- `title` (Text)
- `slug` (UID - based on `title`)
- `shortDescription` (Text)
- `fullDescription` (Rich Text)
- `category` (Text)
- `image` (Media / Single)

### ب) `Branch` (الفروع)

- `name` (Text)
- `address` (Text)
- `workingHours` (Text)
- `phone` (Text)
- `latitude` (Number / Decimal)
- `longitude` (Number / Decimal)
- `image` (Media / Single)

### ج) `BeforeAfter` (قبل وبعد)

- `beforeImage` (Media / Single)
- `afterImage` (Media / Single)
- `treatmentName` (Text)
- `sessionsCount` (Number / Integer)
- `category` (Text)
- `bodyArea` (Text)

### د) `Article` (المقالات)

- `title` (Text)
- `slug` (UID - based on `title`)
- `coverImage` (Media / Single)
- `excerpt` (Text)
- `content` (Rich Text)
- `category` (Text)
- `publishedDate` (Date)
- `readingTime` (Text)

### هـ) `FAQ` (الأسئلة الشائعة)

- `question` (Text)
- `answer` (Rich Text)
- `category` (Text)

### و) `Review` (آراء العملاء)

- `patientName` (Text)
- `patientPhoto` (Media / Single)
- `rating` (Number / Integer: 1 to 5)
- `comment` (Text)
- `serviceTag` (Text)
- `postedDate` (Date)

### ز) `ContactMessage` (رسائل التواصل)

- `fullName` (Text)
- `phone` (Text)
- `email` (Email)
- `message` (Text)
