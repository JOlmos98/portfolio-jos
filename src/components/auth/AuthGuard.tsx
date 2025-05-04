// components/auth/auth-guard.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      if (pathname.includes("articles")) {
        router.push(`/${locale}/articlesLogIn`);
      } else router.push(`/${locale}/login`);
    }
  }, [session, status, router, locale, pathname]);

  if (status === "loading") return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;

  if (!session) return null;

  return <>{children}</>;
}