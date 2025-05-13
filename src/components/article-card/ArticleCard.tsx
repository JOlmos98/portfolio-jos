"use client";

import { ArticleDTO, TagDTO } from "@/types/dto";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CopyUrlButton, LikeButton } from "@/components";

interface ArticleCardProps { article: ArticleDTO; }

export const ArticleCard = ({ article }: ArticleCardProps) => {
  // export const ArticleCard = (article: ArticleDTO) => {

  const [tags, setTags] = useState<TagDTO[]>([]);
  const [authorName, setAuthorName] = useState<string>("Cargando...");

  useEffect(() => {
    const fetchTagsAndUser = async () => {
      try {
        const [tagsRes, userRes] = await Promise.all([
          fetch(`/api/articlesFeed/tags/${article.id}`),
          fetch(`/api/articlesFeed/users/${article.userId}`),
        ]);

        if (!tagsRes.ok || !userRes.ok) throw new Error("Failed to fetch");

        const tagsData = await tagsRes.json();
        const userData = await userRes.json();

        setTags(tagsData);
        setAuthorName(userData.name);//+ " " + userData.lastName);
      } catch (err) { console.error("Error fetching article data:", err); }
    };

    fetchTagsAndUser();
  }, [article.id, article.userId]);

  // const rDescription = article.description && article.description.length > 35
  //   ? article.description.substring(0, 35) + "..."
  //   : article.description || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, transition: { duration: 0.08, ease: "easeOut" } }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center text-center bg-white dark:bg-neutral-800 border rounded-2xl border-white dark:border-neutral-800 shadow mb-6 w-80 lg:w-[325px] max-w-4xl mx-auto "
    >
      <Link
        href={article.url}
        target="_blank"
        className="inline-block mt-4 text-blue-600 dark:text-blue-cyan"
      >
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {new Date(article.createdAt ?? '').toLocaleDateString()} · {authorName}
        </p>

        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
          {article.title}
        </h3>

        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <div className="">
            {/* <p className="text-base text-neutral-700 dark:text-neutral-300 mb-2 w-52">
              {rDescription}
            </p> */}
            <Image
              src={typeof article.imageUrl !== "string" ? "https://i.imgur.com/N1Q5pm7.png" : article.imageUrl}
              alt={article.title}
              width={300}
              height={160}
              className={"rounded-3xl object-contain w-full sm:w-60"}
            />

          </div>

        </div>

        <div className="mt-4 flex flex-wrap justify-center">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="inline-block whitespace-nowrap text-sm mr-2 mb-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </Link>
      <div className="flex flex-row mb-4 ">
        <LikeButton />
        <CopyUrlButton />
      </div>
    </motion.div>
  );
};
