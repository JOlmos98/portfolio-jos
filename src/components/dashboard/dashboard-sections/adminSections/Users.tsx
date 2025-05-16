"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { UserDTO } from "@/types/dto";
import { Link, usePathname } from "@/i18n/navigation";

export const Users = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const t = useTranslations("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
      <h1 className="text-4xl font-bold mb-4">{t("Admin")}</h1>
      {/* <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-6">Requests: Solicitudes de artículos. - Users: Usuarios registrados - Articles: Artículos aceptados.</p> */}

      <Link className={pathname.includes("requests") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/requests"}>Solicitudes de artículos</Link>
      <Link className={pathname.includes("users") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/users"}>Usuarios registrados</Link>
      <Link className={pathname.includes("articles") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/articles"}>Artículos aceptados</Link>
      <h2 className="text-3xl font-bold mb-4 mt-6">Usuarios registrados</h2>

      <table className="w-full text-left border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-neutral-200 p-2">
        <thead>
          <tr>
            <th className='p-2'>ID</th>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Apellidos</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Teléfono</th>
            <th className='p-2'>Bio</th>
            <th className='p-2'>Website</th>
            <th className='p-2'>Verificado</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className="border-t">
              <td className='p-2 border'>{user.id}</td>
              <td className='p-2 border'>{user.name}</td>
              <td className='p-2 border'>{user.last_name}</td>
              <td className='p-2 border'>{user.email}</td>
              <td className='p-2 border'>{user.phone || "-"}</td>
              <td className='p-2 border'>{user.bio || "-"}</td>
              <td className='p-2 border'>{user.website ? <a href={user.website} target="_blank" className="underline text-blue-cyan">Link</a> : "-"}</td>
              <td className={'p-2 border' + (user.isVerified ? " text-green-500" : " text-red-500")}>{user.isVerified ? "TRUE" : "FALSE "}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
