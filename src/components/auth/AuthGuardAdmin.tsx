"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export const AuthGuardAdmin = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      if (pathname.includes("articles")) {
        router.push(`/${locale}/articlesLogIn`);
      } else {
        router.push(`/${locale}/login`);
      }
      return;
    }

    if (session.user?.email !== "soler98@hotmail.es") {
      router.push(`/${locale}/unauthorized`);
    }
  }, [session, status, router, locale, pathname]);

  if (!locale) return null;

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (!session || session.user?.email !== "soler98@hotmail.es") return null;

  return <>{children}</>;
};
