"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function ButtonAuth() {
  const { data: session, status } = useSession();
  const t = useTranslations("Navbar");
//   const locale = useLocale(); // ← Idioma actual, ej: 'en', 'es', 'de'

//   if (!locale) return "en";

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => signOut({ callbackUrl: `/` })}
          className="border-2 border-black dark:border-white rounded-2xl px-3 py-1 text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-200 text-center"
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() =>
          signIn(undefined, {
            callbackUrl: `/dashboard`, // o `/${locale}/dashboard` si necesitas redirigir según idioma
          })
        }
        className="border-2 border-black dark:border-white rounded-2xl px-3 py-1 text-xl hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition duration-200 text-center"
      >
        {t("login")}
      </button>
    </>
  );
}


// "use client";

// import { signIn, signOut, useSession } from "next-auth/react";
// import { useLocale } from "next-intl";

// export default function ButtonAuth() {
//   const { data: session, status } = useSession();
//   const locale = useLocale(); // ← Idioma actual, ej: 'en', 'es', 'de'

//   if (status === "loading") return <p>Loading...</p>;

//   if (session) {
//     return (
//       <>
//         Signed in as {session.user?.email} <br />
//         <button onClick={() => signOut({ callbackUrl: `/${locale}` })} className="btn btn-danger">
//           Sign out
//         </button>
//       </>
//     );
//   }

//   return (
//     <>
//       Not signed in <br />
//       <button
//         onClick={() =>
//           signIn(undefined, {
//             // callbackUrl: `/${locale}/dashboard`,
//             callbackUrl: `/dashboard`,

//           })
//         }
//         className="btn btn-primary"
//       >
//         Sign in
//       </button>
//     </>
//   );
// }

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// "use client";

// import { signIn, signOut, useSession } from "next-auth/react";

// export default function ButtonAuth() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (session) {
//     return (
//       <>
//         Signed in as {session.user?.email} <br />
//         <button onClick={() => signOut()} className="btn btn-danger" >
//           Sign out
//         </button>
//       </>
//     );
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()} className="btn btn-primary" >
//         Sign in
//       </button>
//     </>
//   );
// }