"use server";

import { AuthGuard } from "@/components";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function ArticlesPage() {

const t = await getTranslations("Articles");

  return (
    <AuthGuard>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
          <div>

            <div className="container mx-auto p-8">
              <h1 className="text-5xl font-bold mb-6">{t("Articles")}</h1>
              <p className="text-3xl ">{t("IntroText")}<Link href={"/dashboard/newArticle"} className="text-blue-cyan hover:text-cyan-500">{t("here")}</Link>.</p>
            </div>

            {/* <ArticlesFeed /> */}

          </div>
        </div>
      </div>
    </AuthGuard>
  );
}