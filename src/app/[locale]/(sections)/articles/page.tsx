"use server";

import { AuthGuard } from "@/components";
import { ArticleCard } from "@/components/article-card/ArticleCard";
import { Link } from "@/i18n/navigation";
import { getAllArticles } from "@/lib/actions";
import { getTranslations } from "next-intl/server";

export default async function ArticlesPage() {

  const t = await getTranslations("Articles");
  const articles = await getAllArticles();

  return (
    <AuthGuard>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-14">
          <div>

            <div className="container mx-auto p-8">
              <h1 className="text-5xl font-bold mb-6">{t("Articles")}</h1>
              <p className="text-lg lg:text-3xl">{t("IntroText")}<Link href={"/dashboard/newArticle"} className="text-blue-cyan hover:text-cyan-500">{t("here")}</Link>.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}