-- Dr. Manal Sarhan Dermatology Clinic - Seed SQL Script

-- 1. Homepage
INSERT INTO homepage (id, hero_title, hero_subtitle, hero_image_url, stats_years_experience, stats_happy_patients, stats_branches_count, stats_specialties_count)
VALUES (
    1,
    'مركز د. منال سرحان للجلدية والتجميل والعلاج بالليزر',
    'نعيد لبشرتك نضارتها ولجمالك تألقه بأحدث تقنيات الطب التجميلي والعناية بالبشرة تحت إشراف نخبة متخصصة.',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    14,
    '+5,000',
    3,
    20
) ON CONFLICT (id) DO UPDATE SET
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle,
    hero_image_url = EXCLUDED.hero_image_url,
    stats_years_experience = EXCLUDED.stats_years_experience,
    stats_happy_patients = EXCLUDED.stats_happy_patients,
    stats_branches_count = EXCLUDED.stats_branches_count,
    stats_specialties_count = EXCLUDED.stats_specialties_count;

TRUNCATE TABLE homepage_why_choose_us RESTART IDENTITY CASCADE;
INSERT INTO homepage_why_choose_us (icon_name, title, description, sort_order) VALUES
('Sparkles', 'أحدث التقنيات العالمية', 'نستخدم أجهزة ليزر وتجميل حاصلة على اعتماد FDA الأمريكي لضمان أفضل النتائج.', 1),
('UserCheck', 'خبرة طويلة بالثقة', 'أكثر من 14 عاماً من الخبرة الطبية المتميزة في العلاجات الجلدية والتجميلية.', 2),
('ShieldCheck', 'أعلى معايير الأمان', 'علاجات آمنة ومخصصة تناسب نوع بشرتك وااحتياجاتك الفردية.', 3),
('HeartHandshake', 'رعاية متكاملة وخاصة', 'متابعة دقيقة لكل حالة مع خطة علاجية مصممة خصيصاً للحفاظ على نتائج مستدامة.', 4);

-- 2. About Page
INSERT INTO about_page (id, doctor_photo_url, bio, philosophy_quote)
VALUES (
    1,
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    'استشارية الأمراض الجلدية والتجميل والعلاج بالليزر. تمتلك د. منال سرحان خبرة تجاوزت 14 عاماً في تقديم أحدث الحلول العلاجية والتجميلية للبشرة والشعر، مع تركيز دائم على النتائج الطبيعية الآمنة لكل حالة.',
    'نؤمن بأن الجمال الطبيعي هو أجمل أنواع الجمال، ومهمتنا هي مساعدتك في الحفاظ عليه بأكثر الطرق أماناً وفعالية.'
) ON CONFLICT (id) DO UPDATE SET
    doctor_photo_url = EXCLUDED.doctor_photo_url,
    bio = EXCLUDED.bio,
    philosophy_quote = EXCLUDED.philosophy_quote;

TRUNCATE TABLE about_timeline RESTART IDENTITY CASCADE;
INSERT INTO about_timeline (year, title, description, sort_order) VALUES
('2010', 'التخرج والبداية', 'تخرجت من كلية الطب وبدأت رحلة التخصص في طب الجلد.', 1),
('2015', 'درجة الماجستير', 'نيل درجة الماجستير في الأمراض الجلدية والتناسلية بتقدير امتياز.', 2),
('2018', 'افتتاح العيادة الرئيسية', 'تأسيس مركز متكامل للعناية بالبشرة والتجميل وبرؤية للامتداد.', 3),
('2024', 'جائزة الابتكار الطبي', 'الحصول على جائزة تقديرية لاستخدام تقنيات الليزر الحديثة في الجراحة والتجميل.', 4);

TRUNCATE TABLE about_certifications RESTART IDENTITY CASCADE;
INSERT INTO about_certifications (name, sort_order) VALUES
('البورد المصري للأمراض الجلدية', 1),
('زمالة الجمعية المصرية للجلدية والتناسلية', 2),
('عضوية الجمعية الأوروبية للجلدية (EADV)', 3),
('شهادة معتمدة في العلاج بالليزر', 4);

TRUNCATE TABLE about_press_logos RESTART IDENTITY CASCADE;
INSERT INTO about_press_logos (name, sort_order) VALUES
('قناة النهار', 1),
('CBC', 2),
('صدى البلد', 3),
('ET بالعربي', 4);

-- 3. Beauty Center Page
INSERT INTO beauty_center_page (id, hero_image_url, hero_tagline)
VALUES (
    1,
    'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=1200&q=80',
    'تجربة فاخرة لجمالك تدمج بين الرفاهية والخدمات الطبية المعتمدة'
) ON CONFLICT (id) DO UPDATE SET
    hero_image_url = EXCLUDED.hero_image_url,
    hero_tagline = EXCLUDED.hero_tagline;

TRUNCATE TABLE beauty_center_featured_services RESTART IDENTITY CASCADE;
INSERT INTO beauty_center_featured_services (title, description, sort_order) VALUES
('إزالة الشعر بالليزر', 'تقنيات متطورة لإزالة الشعر بأمان وفعالية وثقة تدوم.', 1),
('شد البشرة', 'تقنيات متقدمة لرفع ونحت وقوام الجسم بأمان.', 2),
('نحت الجسم', 'جهاز حديث لنحت وتشكيل القوام وإذابة الدهون العنيدة.', 3),
('عناية البشرة المتقدمة', 'جلسات تنظيف وعلاج مشاكل البشرة المتقدمة.', 4),
('تقشير كيميائي', 'تقشيرات آمنة لتحسين ملمس ولون البشرة.', 5);

TRUNCATE TABLE beauty_center_why_choose_us RESTART IDENTITY CASCADE;
INSERT INTO beauty_center_why_choose_us (title, description, sort_order) VALUES
('أحدث الأجهزة', 'نستخدم تقنيات عالمية متطورة مضمونة الجودة.', 1),
('أطباء متخصصون', 'خبرة عالية في مجال التجميل والليزر.', 2),
('معايير عالية الجودة', 'بروتوكولات دولية صارمة في كل خطوة.', 3),
('نتائج طبيعية', 'نحرص على نتائج طبيعية تلامس ذوقك ولا تفضحك.', 4),
('متابعة مستمرة', 'رعاية قبل وبعد كل جلسة لضمان أفضل النتائج.', 5);

TRUNCATE TABLE beauty_center_gallery_images RESTART IDENTITY CASCADE;
INSERT INTO beauty_center_gallery_images (image_url, sort_order) VALUES
('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', 1),
('https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80', 2),
('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', 3),
('https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80', 4);

-- 4. Branches (Zerqa and El-Nozha Cairo)
TRUNCATE TABLE branches RESTART IDENTITY CASCADE;
INSERT INTO branches (name, address, working_hours, phone, latitude, longitude, image_url) VALUES
('فرع الزرقا', '[العنوان بالتفصيل] - الزرقا - مصر', 'السبت - الخميس: 9:00 صباحاً - 9:00 مساءً', '+20 123 456 7890', 30.0444, 31.2357, 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80'),
('فرع النزهة', '[العنوان بالتفصيل] - النزهة - القاهرة - مصر', 'السبت - الخميس: 9:00 صباحاً - 9:00 مساءً', '+20 123 456 7891', 30.05, 31.24, 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'),
('سنتر التجميل - النزهة', '[العنوان بالتفصيل] - النزهة - القاهرة - مصر', 'السبت - الخميس: 10:00 صباحاً - 10:00 مساءً', '+20 123 456 7892', 30.052, 31.242, 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80');

-- 5. Services (All 6 Services)
TRUNCATE TABLE services RESTART IDENTITY CASCADE;
INSERT INTO services (title, slug, category, short_description, full_description, image_url) VALUES
('إزالة الشعر بالليزر', 'laser-hair-removal', 'الليزر', 'تقنيات متطورة لإزالة الشعر بأمان وفعالية وتدوم نتائجها طويلاً.', 'جلسات إزالة الشعر بالليزر في مراكزنا تعتمد على أحدث الأجهزة العالمية المعتمدة طبياً. تمتاز الجلسات بالسرعة والفعالية والأمان التام لجميع مناطق الجسم مع نظام تبريد مبتكر لمنع الشعور بالألم.', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'),
('حقن البوتوكس والفيلر', 'botox-fillers', 'التجميل غير الجراحي', 'علاج تجاعيد التعبير واستعادة حجم الوجه بنتائج طبيعية ومشرقة.', 'نستخدم أفضل الماركات العالمية المعتمدة طبياً لحقن البوتوكس والفيلر. يساعد البوتوكس على إخفاء الخطوط التعبيرية في الجبهة وحول العينين، بينما يعمل الفيلر على تعبئة الخدود وتحديد الشفاه بدون أي تكتلات.', 'https://images.unsplash.com/photo-1512290900676-26c2a4d48dc1?auto=format&fit=crop&w=800&q=80'),
('جلسات تنظيف البشرة العميق', 'deep-facial-cleansing', 'العناية بالبشرة', 'تنظيف عميق وتقشير لطيف وترطيب مكثف لإعطاء بشرتك نضارة فورية.', 'تقنية التنظيف الخماسية تعمل على إزالة الخلايا الميتة والشوائب من مسام البشرة، مع ضخ سيرومات مغذية غنية بمضادات الأكسدة وحمض الهيالورونيك لتغذية البشرة وتفتيحها فورياً.', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'),
('علاج التصبغات والآثار', 'pigmentation-treatment', 'الليزر', 'تجديد خلايا البشرة والتخلص من ندبات حب الشباب والتصبغات المستعصية.', 'الليزر الجزئي يساعد على تحفيز إنتاج الكولاجين الطبيعي في طبقات الجلد العميقة، مما يقلل من ندبات حب الشباب، الآثار، الكلف، والخطوط الدقيقة.', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'),
('علاجات تساقط الشعر', 'hair-loss-treatment', 'علاجات الشعر', 'حقن البلازما والسيرومات المغذية لتقوية البصيلات وتحفيز نمو الشعر.', 'جلسات البلازما الغنية بالصفائح (PRP) والميزوثيرابي للشعر تساعد في تقليل تساقط الشعر وزيادة كثافته ونموه بطرق آمنة وطبيعية.', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80'),
('شد الوجه والرقبة بدون جراحة', 'non-surgical-face-lift', 'التجميل غير الجراحي', 'شد بدون جراحة باستخدام الموجات فوق الصوتية المكثفة لتحفيز الكولاجين.', 'تقنية شد البشرة الحديثة تعمل على شد الترهلات في الوجه والرقبة، وتحديد خط الفك بدون أي تدخل جراحي أو فترة توقف عن العمل.', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80');

-- 6. Before & After Cases
TRUNCATE TABLE before_afters RESTART IDENTITY CASCADE;
INSERT INTO before_afters (treatment_name, category, sessions_count, body_area, before_image_url, after_image_url) VALUES
('علاج التصبغات وبقع الشمس', 'Skin', 4, 'الوجه', 'https://images.unsplash.com/photo-1512290900676-26c2a4d48dc1?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'),
('إزالة الشعر بالليزر', 'Hair Removal', 6, 'منطقة الساق', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80'),
('علاج حب الشباب', 'Acne', 5, 'الوجه', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'),
('شد البشرة (ترافية الوجه)', 'Skin Tightening', 3, 'الوجه والرقبة', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80');

-- 7. Blog Articles
TRUNCATE TABLE articles RESTART IDENTITY CASCADE;
INSERT INTO articles (title, slug, category, excerpt, content, published_date, reading_time, cover_image_url) VALUES
('دليل شامل للتقشير الكيميائي وأثاره وفوائده المتوقعة', 'chemical-peeling-guide', 'العناية بالبشرة', 'تعرفي على أنواع التقشير الكيميائي وفوائده والنتائج المتوقعة منه لبشرة أكثر نضارة.', 'التقشير الكيميائي من أكثر الإجراءات فعالية في تحسين ملمس البشرة وتوحيد لونها. تختلف أنواعه حسب عمق التقشير المطلوب وااحتياج كل بشرة، وننصح دائماً باستشارة الطبيب المختص لاختيار النوع الأنسب لحالتك.', '2026-07-20', '7 دقائق', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'),
('هل يعود الشعر بعد إزالته بالليزر؟', 'does-hair-grow-back-after-laser', 'الليزر', 'الإجابة العلمية الواضحة عن هذا السؤال الذي يتردد كثيراً والعوامل التي تؤثر في نجاح الجلسات على المدى البعيد.', 'بعد إتمام العدد الموصى به من الجلسات، تقل كثافة الشعر بشكل كبير جداً وقد لا يعود نهائياً في معظم الحالات. العوامل الهرمونية الفردية قد تؤثر على النتيجة النهائية، لذا يُنصح بالمتابعة الدورية مع الطبيب المختص.', '2026-07-12', '5 دقائق', 'https://images.unsplash.com/photo-1512290900676-26c2a4d48dc1?auto=format&fit=crop&w=800&q=80'),
('نصائح ذهبية للعناية بالبشرة في الشتاء', 'winter-skincare-tips', 'نصائح عامة', 'روتين متكامل لحماية بشرتك من الجفاف والتشققات خلال فصل الشتاء البارد.', 'فصل الشتاء يتطلب روتيناً خاصاً يرتكز على الترطيب العميق باستخدام كريمات غنية، وتجنب الاستحمام بالماء الساخن جداً، مع الحفاظ على شرب كمية كافية من الماء للحفاظ على مرونة البشرة ونضارتها.', '2026-07-05', '5 دقائق', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80');

-- 8. FAQs
TRUNCATE TABLE faqs RESTART IDENTITY CASCADE;
INSERT INTO faqs (question, answer, category) VALUES
('كيف يمكنني حجز موعد؟', 'يمكنك حجز موعد بسهولة من خلال صفحة "حجز موعد" واختيار الفرع والخدمة والتاريخ المناسب لك، وسنرسل لك رسالة تأكيد على واتساب أو البريد الإلكتروني.', 'الحجز'),
('هل يمكن تعديل أو إلغاء الموعد؟', 'نعم، يمكنك تعديل أو إلغاء موعدك من خلال التواصل معنا على الرقم الموضح في صفحة "تواصل معنا" قبل الموعد بوقت كافٍ.', 'الحجز'),
('هل الجلسات مؤلمة؟', 'نستخدم أحدث الأجهزة المزودة بأنظمة تبريد متقدمة لتقليل الشعور بالألم قدر الإمكان، وتختلف درجة الإحساس حسب نوع العلاج وحساسية كل بشرة.', 'الخدمات'),
('هل النتائج دائمة؟', 'تختلف مدة دوام النتائج حسب نوع الإجراء المتبع، وسيقوم الطبيب المختص بشرح ذلك بالتفصيل أثناء الاستشارة قبل بدء أي علاج.', 'الخدمات'),
('ما هي طرق الدفع المتاحة؟', 'نوفر عدة طرق للدفع تشمل الدفع النقدي والدفع بالبطاقات البنكية داخل جميع فروعنا.', 'الدفع'),
('هل تتوفر الخدمات في جميع الفروع؟', 'معظم الخدمات متوفرة في جميع فروعنا، وبعض الخدمات المتخصصة تتوفر حصرياً في سنتر التجميل بالنزل. يمكنك التأكد من توفر خدمتك في الفرع الأقرب لك عند الحجز.', 'الفروع');

-- 9. Patient Reviews
TRUNCATE TABLE reviews RESTART IDENTITY CASCADE;
INSERT INTO reviews (patient_name, rating, comment, service_tag, posted_date, patient_photo_url) VALUES
('سارة محمد', 5, 'تجربة رائعة ونتائج واضحة جداً، نضارة في البشرة من أول جلسة. أنصح بشدة بالتعامل مع د. منال وفريقها المتميز.', 'إزالة الشعر بالليزر', 'منذ 3 أيام', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
('مريم أحمد', 5, 'جلسة مريحة جداً والنتائج واضحة في نضارة البشرة. أنصح بشدة بالتعامل مع دكتورة منال، فريق خبير ومتمكنة من عملها.', 'شد البشرة', 'منذ أسبوع', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'),
('ليلى محمود', 5, 'أفضل عيادة تعاملت معها في القاهرة، دقة في المواعيد واحترافية عالية في الأداء. شكراً جزيلاً لجميع الطاقم.', 'تجميل الوجه', 'منذ أسبوعين', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80');
