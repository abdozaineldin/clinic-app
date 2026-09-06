"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMediaFile } from "@/lib/supabase/storage";
import { getArticles } from "@/lib/supabase-data";
import { ArticleData } from "@/lib/types";
import { Plus, Edit3, Trash2, FileText, CheckCircle } from "lucide-react";

function generateSafeSlug(title: string): string {
  const timestamp = Date.now().toString().slice(-6);
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // يشيل أي حرف مش إنجليزي أو رقم (يعني يشيل العربي تماماً)
    .trim()
    .replace(/\s+/g, "-") // يستبدل المسافات بشرطة
    .replace(/-+/g, "-"); // يمنع تكرار الشرطات

  return cleanTitle ? `${cleanTitle}-${timestamp}` : `article-${timestamp}`;
}

export default function AdminArticlesManager() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleData | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("العناية بالبشرة");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [readingTime, setReadingTime] = useState("5 دقائق");
  const [publishedDate, setPublishedDate] = useState(new Date().toISOString().split("T")[0]);
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    async function loadData() {
      const data = await getArticles();
      setArticles(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setTitle("");
    setSlug("");
    setCategory("العناية بالبشرة");
    setExcerpt("");
    setContent("");
    setReadingTime("5 دقائق");
    setPublishedDate(new Date().toISOString().split("T")[0]);
    setCoverImage("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: ArticleData) => {
    setEditingArticle(a);
    setTitle(a.title);
    setSlug(a.slug);
    setCategory(a.category);
    setExcerpt(a.excerpt);
    setContent(a.content);
    setReadingTime(a.readingTime);
    setPublishedDate(a.publishedDate);
    setCoverImage(typeof a.coverImage === "string" ? a.coverImage : "");
    setIsModalOpen(true);
  };

  const handleCoverUpload = async (file: File) => {
    const url = await uploadMediaFile(file, "articles");
    setCoverImage(url);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const generatedSlug = slug || generateSafeSlug(title);
    const payload = {
      title,
      slug: generatedSlug,
      category,
      excerpt,
      content,
      published_date: publishedDate,
      reading_time: readingTime,
      cover_image_url: coverImage,
    };

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    let savedId = editingArticle?.id || Date.now();

    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      if (editingArticle) {
        await supabase.from("articles").update(payload).eq("id", editingArticle.id);
      } else {
        const { data } = await supabase.from("articles").insert(payload).select().single();
        if (data) savedId = data.id;
      }
    }

    if (editingArticle) {
      setArticles(
        articles.map((a) =>
          a.id === editingArticle.id
            ? {
                ...a,
                title,
                slug: generatedSlug,
                category,
                excerpt,
                content,
                publishedDate,
                readingTime,
                coverImage,
              }
            : a
        )
      );
    } else {
      setArticles([
        ...articles,
        {
          id: savedId,
          title,
          slug: generatedSlug,
          category,
          excerpt,
          content,
          publishedDate,
          readingTime,
          coverImage,
        },
      ]);
    }

    setIsModalOpen(false);
    setToast("تم حفظ المقال بنجاح!");
    setTimeout(() => setToast(""), 3000);
  };

  const handleDeleteArticle = async (id: string | number) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذا المقال؟")) return;

    setArticles(articles.filter((a) => a.id !== id));
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (url && !url.includes("placeholder")) {
      const supabase = createClient();
      await supabase.from("articles").delete().eq("id", id);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#6e5c6b]">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2d1b28]">إدارة المقالات والمدونة الطبية</h1>
          <p className="text-sm text-[#6e5c6b] mt-1">كتابة ونشر المقالات التثقيفية والنصائح الطبية للمرضى</p>
        </div>
        <div className="flex items-center gap-3">
          {toast && (
            <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{toast}</span>
            </div>
          )}
          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 bg-[#e29578] hover:bg-[#d87b5b] text-white font-bold rounded-xl shadow transition flex items-center gap-2 text-sm"
          >
            <Plus className="w-5 h-5" />
            <span>كتابة مقال جديد</span>
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-3xl border border-[#eccec5]/60 overflow-hidden shadow-sm">
        <table className="w-full text-right text-sm">
          <thead className="bg-[#fdf8f6] text-[#2d1b28] border-b border-[#eccec5]/40 font-bold">
            <tr>
              <th className="p-4">المقال</th>
              <th className="p-4">التصنيف</th>
              <th className="p-4">تاريخ النشر</th>
              <th className="p-4">وقت القراءة</th>
              <th className="p-4 text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eccec5]/40 text-[#2d1b28]">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-[#fdf8f6]/50 transition">
                <td className="p-4 font-semibold flex items-center gap-3">
                  {a.coverImage && (
                    <img src={typeof a.coverImage === "string" ? a.coverImage : ""} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  )}
                  <div>
                    <div className="font-bold text-[#2d1b28]">{a.title}</div>
                    <div className="text-xs text-[#6e5c6b] line-clamp-1">{a.excerpt}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-[#f4e7ce] text-[#2d1b28] text-xs font-bold rounded-md">
                    {a.category}
                  </span>
                </td>
                <td className="p-4 text-xs text-[#6e5c6b]">{a.publishedDate}</td>
                <td className="p-4 text-xs text-[#6e5c6b]">{a.readingTime}</td>
                <td className="p-4 text-left">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(a)}
                      className="p-2 text-[#6e5c6b] hover:text-[#e29578] transition"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(a.id)}
                      className="p-2 text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-2xl space-y-4 shadow-2xl border border-[#eccec5] overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold text-[#2d1b28]">
              {editingArticle ? "تعديل المقال" : "كتابة مقال جديد"}
            </h3>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">عنوان المقال</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">التصنيف</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">تاريخ النشر</label>
                  <input
                    type="date"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d1b28] mb-1">وقت القراءة</label>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">المقدمة / الملخص (Excerpt)</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">محتوى المقال التفصيلي</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fdf8f6] border border-[#eccec5] rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2d1b28] mb-1">صورة الغلاف</label>
                {coverImage && (
                  <div className="w-full h-36 rounded-xl overflow-hidden mb-2 border">
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleCoverUpload(e.target.files[0]);
                  }}
                  className="block w-full text-xs text-[#6e5c6b] file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#f4e7ce] cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#e29578] hover:bg-[#d87b5b] text-white text-xs font-bold rounded-xl shadow"
                >
                  نشر المقال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}