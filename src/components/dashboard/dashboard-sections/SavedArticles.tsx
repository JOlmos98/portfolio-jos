"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { ArticleDTO } from "@/types/dto";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import Link from "next/link";

export const SavedArticles = () => {

  const t = useTranslations("Dashboard");
  const { data: session } = useSession();
  const [articles, setArticles] = useState<ArticleDTO[]>([]);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(`/api/articlesFeed/allLiked/${session.user.id}`);
        if (!res.ok) throw new Error("Failed to fetch saved articles");

        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Error loading saved articles:", err);
      }
    };

    fetchSavedArticles();
  }, [session]);



  return (
    <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t("SavedArticles")}</h1>
        <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-6">
          {t("SavedArticlesText")}
        </p>

        <Table className="bg-neutral-200 dark:bg-neutral-800 rounded-xl p-2 w-max-2xl lg:w-[1200px]">
          <TableHeader>
            <TableColumn className="p-2">{t("ArticleTitle")}</TableColumn>
            <TableColumn className="p-2">{t("SavedDate")}</TableColumn>
            <TableColumn className="p-2">Link</TableColumn>
            {/* <TableRow>
          </TableRow> */}
          </TableHeader>
          <TableBody>
            {articles.map((article, i) => (
              <TableRow key={article.id} className={i % 2 === 0 ? "bg-neutral-100 dark:bg-neutral-900 m-2" : "bg-neutral-200 dark:bg-neutral-800"}>
                <TableCell className="p-2">{article.title}</TableCell>
                <TableCell className="p-2 text-center">{(article.savedAt)?.substring(0, 10)}</TableCell>
                <TableCell className="p-2 text-center">
                  <Link href={article.url} target="_blank" className="text-blue-cyan underline">
                    Link
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};
