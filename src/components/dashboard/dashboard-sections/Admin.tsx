"use client";

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export const Admin = () => {

  const t = useTranslations("Dashboard");
  const pathname = usePathname();

  return (
    <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
      <h1 className="text-4xl font-bold mb-4">{t("Admin")}</h1>
      <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-6">
        {t("AdminText")}
      </p>
      <Link className={pathname.includes("requests") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/requests"}>Requests</Link>
      <Link className={pathname.includes("users") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/users"}>Users</Link>
      <Link className={pathname.includes("articles") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/articles"}>Articles</Link>

      {/* <Request/> */}
      {/* 
      <table className="w-full text-left border text-white p-2">
        <thead>
          <tr>
            <th className='p-2'>ID</th>
            <th className='p-2'>User ID</th>
            <th className='p-2'>URL</th>
            <th className='p-2'>Title</th>
            <th className='p-2'>Status</th>
            <th className='p-2'>Created</th>
            <th className='p-2'>Updated</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-t rounded-md">
              <td className='p-2 border'>{req.id}</td>
              <td className='p-2 border'>{req.userId}</td>
              <td className='p-2 border'><a href={req.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver</a></td>
              <td className='p-2 border'>{req.title}</td>
              <td className='p-2 border'>{req.status}</td>
              <td className='p-2 border'>{new Date(req.createdAt as string).toLocaleDateString()}</td>
              <td className='p-2 border'>{new Date(req.updatedAt as string).toLocaleDateString()}</td>
              <td className='p-2 border'>
                
                <button className="text-green-600 hover:underline p-2">Aceptar</button>
                <Link className='text-red-600 hover:underline p-2' href={""}>Rechazar</Link>
                <button className="text-blue-600 hover:underline p-2">Etiquetas</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </main>
  );
};

