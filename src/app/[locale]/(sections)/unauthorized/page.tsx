"use server";

import { getTranslations } from "next-intl/server";

export default async function UnauthorizedPage() {

  const t = await getTranslations("Dashboard");

  return (
    <div className="min-h-screen grid place-items-center p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-gray-300 dark:bg-zinc-800 p-5 lg:p-16 mt-72 mb-96 rounded-2xl max-w-4xl w-full text-center space-y-6">
        <h1 className="text-3xl lg:text-5xl font-bold text-blue-cyan">
          {t("Unauthorized")}
        </h1>
      </div>
    </div>
  );
}
