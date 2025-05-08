"use client";

import { ArticleDTO, TagDTO } from "@/types/dto";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface ArticleCardProps {
  article: ArticleDTO & { id: number };
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const [tags, setTags] = useState<TagDTO[]>([]);
  const [authorName, setAuthorName] = useState<string>("Cargando...");

  useEffect(() => {
    const fetchTagsAndUser = async () => {
      try {
        const [tagsRes, userRes] = await Promise.all([
          fetch(`/api/tags?articleId=${article.id}`),
          fetch(`/api/users/${article.userId}`),
        ]);

        const tagsData = await tagsRes.json(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const userData = await userRes.json(); //! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        setTags(tagsData);
        setAuthorName(userData.name + " " + userData.lastName);
      } catch (err) {
        console.error("Error fetching article data:", err);
      }
    };

    fetchTagsAndUser();
  }, [article.id, article.userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-6 mb-6 w-full max-w-4xl mx-auto"
    >
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        {new Date(article.createdAt ?? '').toLocaleDateString()} · {authorName}
      </p>

      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
        {article.title}
      </h3>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-auto sm:flex-shrink-0">
          <Image
            src={article.imageUrl || "/placeholder-article.png"}
            alt={article.title}
            width={240}
            height={160}
            className="rounded-2xl object-cover w-full sm:w-60 h-40"
          />
        </div>
        <p className="text-base text-neutral-700 dark:text-neutral-300">
          {article.description || "No description available."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className="inline-block whitespace-nowrap text-sm mr-2 mb-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-900 text-blue-cyan dark:text-blue-cyan"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <Link
        href={article.url}
        target="_blank"
        className="inline-block mt-4 text-blue-600 dark:text-blue-cyan hover:underline"
      >
        Ver artículo completo
      </Link>
    </motion.div>
  );
};
