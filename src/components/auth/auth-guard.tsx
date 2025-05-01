// components/auth/auth-guard.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push(`/${locale}/login`);
    }
  }, [session, status, router, locale]);

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}