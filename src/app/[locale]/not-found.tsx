"use server";

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: '404 - Página no encontrada',
  description: 'Lo sentimos, la página que buscas no existe.',
};

export default async function MoreAboutMePage() {

  const t = await getTranslations("Navbar");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
        <div>
          <p className="text-5xl text-red-500">NOT FOUND!!!!!!!!!!!!!</p>
          <div className="mt-20 flex justify-center">
            {/* <Loader2 className="animate-spin w-20 h-20 text-blue-cyan" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}