"use client";

import { Link, usePathname } from '@/i18n/navigation';

export const Admin = () => {

  const pathname = usePathname();

  return (
    <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
      <h1 className="text-4xl font-bold mb-4">Admin</h1>
      <Link className={pathname.includes("requests") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2' : 'text-black dark:text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-200 dark:bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/requests"}>Solicitudes de artículos</Link>
      <Link className={pathname.includes("users") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2' : 'text-black dark:text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/users"}>Usuarios registrados</Link>
      <Link className={pathname.includes("articles") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2' : 'text-black dark:text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/articles"}>Artículos aceptados</Link>
    </main>
  );
};

