import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, Calendar, Share2, Sparkles } from "lucide-react";
import { getArticleBySlug, getArticles } from "@/lib/strapi";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-10 pb-20 pt-8">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#E29578]">
            الرئيسية
          </Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-[#E29578]">
            المدونة
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#2D1B28] line-clamp-1">{article.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          <span className="inline-block bg-pink-100 text-[#2D1B28] text-xs font-bold px-3 py-1 rounded-full">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B28] leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-[#E29578]" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-[#E29578]" />
                وقت القراءة: {article.readingTime}
              </span>
            </div>
            <div className="flex items-center gap-1 font-bold text-[#2D1B28]">
              <Sparkles size={14} className="text-amber-500" />
              <span>بقلم د. منال سرحان</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-pink-100">
          <img
            src={article.coverImage as string}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Excerpt Banner */}
        <div className="bg-pink-50/70 p-6 rounded-2xl border border-pink-200 text-sm font-semibold text-slate-700 leading-relaxed italic">
          "{article.excerpt}"
        </div>

        {/* Article Content */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-pink-100 shadow-sm text-sm sm:text-base text-slate-700 leading-loose space-y-6 whitespace-pre-line">
          {article.content}
        </div>

        {/* Call to Action Footer */}
        <div className="bg-[#2D1B28] text-white p-8 rounded-3xl text-center space-y-4 shadow-xl">
          <h3 className="text-xl font-bold text-amber-300">
            هل لديكِ استفسار طبي بخصوص هذه الحالة؟
          </h3>
          <p className="text-xs text-pink-100/80">
            فريق د. منال سرحان مستعد للإجابة على تساؤلاتكِ وحجز موعد استشارة.
          </p>
          <div>
            <Link
              href="/booking"
              className="inline-block bg-[#E29578] hover:bg-[#d87b5b] text-white px-8 py-3 rounded-full text-xs font-bold transition-all"
            >
              احجزي موعد استشارة
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
