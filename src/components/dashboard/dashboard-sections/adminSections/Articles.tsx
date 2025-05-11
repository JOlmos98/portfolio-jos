"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArticleDTO } from "@/types/dto";
import { Link, usePathname } from "@/i18n/navigation";

export const Articles = () => {
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const t = useTranslations("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/api/admin/articles");
      const data = await res.json();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
      <h1 className="text-4xl font-bold mb-4">{t("Admin")}</h1>
      <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-6">{t("AdminText")}</p>

      <Link className={pathname.includes("requests") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/requests"}>Requests</Link>
      <Link className={pathname.includes("users") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/users"}>Users</Link>
      <Link className={pathname.includes("articles") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/articles"}>Articles</Link>

      <h2 className="text-3xl font-bold mb-4 mt-6">Published Articles</h2>

      <table className="w-full text-left border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-neutral-200 p-2">
        <thead>
          <tr>
            <th className='p-2'>ID</th>
            <th className='p-2'>User ID</th>
            <th className='p-2'>URL</th>
            <th className='p-2'>Title</th>
            <th className='p-2'>Image</th>
            <th className='p-2'>Description</th>
            <th className='p-2'>Created At</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t">
              <td className='p-2 border'>{article.id}</td>
              <td className='p-2 border'>{article.userId}</td>
              <td className='p-2 border'>
                <Link href={article.url} target="_blank" rel="noopener noreferrer" className="underline text-blue-cyan">Link</Link>
              </td>
              <td className='p-2 border'>{article.title}</td>
              <td className='p-2 border'>
                {article.imageUrl ? (<Link href={article.imageUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-cyan">Link</Link>) : "-"}
              </td>
              <td className='p-2 border'>{article.description || "-"}</td>
              <td className='p-2 border'>
                {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
