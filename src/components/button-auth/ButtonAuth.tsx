"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export const ButtonAuth = () => {

  const { data: session, status } = useSession();
  const t = useTranslations("Navbar");
  const l = useTranslations("LogIn");

  const locale = useLocale();
  //   if (!locale) return "en";

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <>
        <p className="text-xl mx-2">{l("Welcome")}&nbsp;
          <Link
            title="Dashboard"
            href={"/dashboard"}
            className="hover:text-blue-cyan font-bold">{session.user?.name}&nbsp;&nbsp;
            <Image
              src={typeof session.user?.avatarUrl === "string" ? session.user?.avatarUrl as string : "https://i.imgur.com/bGW4oJg.png"}
              alt="image"
              width={25}
              height={25}
              className="rounded-full inline-block" />
          </Link>
        </p>
        <button
          onClick={() => signOut({ callbackUrl: `/` })}
          className="border-2 border-black dark:border-white rounded-2xl px-3 py-1 text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-200 text-center"
        >
          {l("Sign out")}
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() =>
          signIn(undefined, {
            callbackUrl: `/dashboard`,
          })
        }
        className="border-2 border-black dark:border-white rounded-2xl px-3 py-1 text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-200 text-center"
      >
        {t("login")}
      </button>
      <Link href={"/" + locale + "/signUp"} className="border-2 border-black dark:border-white rounded-2xl px-3 py-1 text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-200 text-center">{t('signUp')}</Link>
    </>
  );
}
