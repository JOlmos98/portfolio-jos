"use server";

import { Loader2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function MoreAboutMePage() {

  const t = await getTranslations("Navbar");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
        <div>
          <p className="text-5xl text-yellow-200">{t("moreAboutMe")}</p>
          <div className="mt-20 flex justify-center">
            <Loader2 className="animate-spin w-20 h-20 text-blue-cyan" />
          </div>
        </div>
      </div>
    </div>
  );
}