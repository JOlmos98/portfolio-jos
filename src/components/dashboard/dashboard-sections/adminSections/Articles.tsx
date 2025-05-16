"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArticleDTO, TagDTO } from "@/types/dto";
import { Link, usePathname } from "@/i18n/navigation";
import toast from "react-hot-toast";

export const Articles = () => {
  const [articles, setArticles] = useState<(ArticleDTO & { currentTags?: TagDTO[] })[]>([]);
  const [tags, setTags] = useState<TagDTO[]>([]);
  const [selectedTags, setSelectedTags] = useState<Record<number, number[]>>({});
  const [imageUrls, setImageUrls] = useState<Record<number, string>>({});


  const t = useTranslations("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch("/api/admin/articles");
      const data = await res.json();

      // Para cada artículo, obten sus etiquetas actuales
      const articlesWithTags = await Promise.all(
        data.map(async (article: ArticleDTO) => {
          const tagRes = await fetch(`/api/admin/articleTags/${article.id}`);
          const tagData = await tagRes.json();
          return { ...article, currentTags: tagData }; // ← añadimos la propiedad currentTags
        })
      );

      setArticles(articlesWithTags);
    };

    const fetchTags = async () => {
      const res = await fetch("/api/admin/tags");
      const data = await res.json();
      setTags(data);
    };

    fetchArticles();
    fetchTags();
  }, []);

  // const handleTagChange = (articleId: number, index: number, tagId: number) => {
  //   const current = selectedTags[articleId] ?? [];
  //   current[index] = tagId;
  //   selectedTags[articleId] = current;
  //   setSelectedTags(selectedTags);
  // };

  const handleImageUrlChange = (articleId: number, url: string) => {
    setImageUrls((prev) => ({
      ...prev,
      [articleId]: url,
    }));
  };

  const handleTagChange = (articleId: number, index: number, tagId: number) => {
    setSelectedTags((prev) => {
      const current = prev[articleId] ? [...prev[articleId]] : [];
      current[index] = tagId;
      return {
        ...prev,
        [articleId]: current,
      };
    });
  };

  const handleSaveImageAndTags = async (articleId: number) => {
    const tagIds = selectedTags[articleId]?.filter(Boolean);
    const imageUrl = imageUrls[articleId]?.trim();

    if ((!tagIds || tagIds.length === 0) && !imageUrl) {
      toast.error("Debes seleccionar al menos una etiqueta o modificar la imagen.");
      return;
    }

    try {
      const res = await fetch("/api/admin/saveImageAndTags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, tagIds, imageUrl }),
      });

      if (!res.ok) throw new Error("Error al guardar");

      toast.success("Datos guardados correctamente.");
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar.");
    }
  };


  return (
    <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
      <h1 className="text-4xl font-bold mb-4">{t("Admin")}</h1>
      {/* <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-6">Requests: Solicitudes de artículos. - Users: Usuarios registrados - Articles: Artículos aceptados.</p> */}

      <Link className={pathname.includes("requests") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/requests"}>Solicitudes de artículos</Link>
      <Link className={pathname.includes("users") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/users"}>Usuarios registrados</Link>
      <Link className={pathname.includes("articles") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2' : 'text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/articles"}>Artículos aceptados</Link>

      <h2 className="text-3xl font-bold mb-4 mt-6">Artículos aceptados</h2>

      <table className="w-full text-left border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-neutral-200 p-2">
        <thead>
          <tr>
            <th className='p-2'>ID</th>
            <th className='p-2'>User ID</th>
            <th className='p-2'>URL</th>
            <th className='p-2'>Título</th>
            <th className='p-2'>ImgLink</th>
            <th className='p-2'>Imagen</th>
            <th className='p-2'>Descripción</th>
            <th className='p-2'>Created At</th>
            <th className='p-2'>Tags actuales</th>
            <th className='p-2'>Tag 1</th>
            <th className='p-2'>Tag 2</th>
            <th className='p-2'>Tag 3</th>
            <th className='p-2'>Guardar</th>
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
              <td className='p-2 border text-xs'>{article.title}</td>
              <td className='p-2 border'>
                {article.imageUrl ? (<Link href={article.imageUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-cyan">Link</Link>) : "-"}
              </td>
              <td className='p-2 border'>
                <input
                  type="text"
                  value={imageUrls[article.id] ?? article.imageUrl ?? ""}
                  onChange={(e) => handleImageUrlChange(article.id, e.target.value)}
                  className="p-1 bg-white dark:bg-neutral-700 rounded-md"
                />
              </td>
              <td className='p-2 border text-xs'>{article.description || "-"}</td>
              <td className='p-2 border'>
                {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : "-"}
              </td>
              <td className='p-2 border'>
                {article.currentTags?.length
                  ? [
                    article.currentTags[0]?.name || "-",
                    article.currentTags[1]?.name || "-",
                    article.currentTags[2]?.name || "-",
                  ].join(" | ")
                  : "- | - | -"}
              </td>

              {[0, 1, 2].map((i) => (
                <td key={i} className='p-2 border'>
                  <select
                    value={selectedTags[article.id]?.[i] || ""}
                    onChange={(e) => handleTagChange(article.id, i, Number(e.target.value))}
                    className="p-1 bg-white dark:bg-neutral-700 rounded-md"
                  >
                    <option value="">-</option>
                    {tags.map((tag) => (
                      <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                  </select>
                </td>
              ))}
              <td className='p-2 border'>
                <button
                  onClick={() => handleSaveImageAndTags(article.id)}
                  className="text-white rounded-md bg-cyan-600 px-2 py-1 hover:bg-blue-700 transition-colors duration-300"
                >
                  Guardar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
