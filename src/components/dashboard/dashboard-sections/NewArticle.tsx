"use client";

import { articleRequestSchema } from "@/zod/articleRequestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const NewArticle = () => {

  const t = useTranslations("Dashboard.NewArticleSection");

  const form = useForm<z.infer<typeof articleRequestSchema>>({
    resolver: zodResolver(articleRequestSchema),
    defaultValues: {
      url: "",
      title: "",
      description: "",
    },
  });

  const { register, handleSubmit, formState: { errors }, reset, } = form;

  const onSubmit = async (values: z.infer<typeof articleRequestSchema>) => {
    try {
      const res = await fetch("/api/articleRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Article request failed");

      toast.success(t("ArticleSubmitted"));
      reset();
    } catch (e) {
      console.error(e);
      toast.error(t("ErrorSubmitting"));
    }
  };

  return (
    <main className="flex-1 p-2 pt-28 ml-32 lg:ml-[500px]">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="flex text-left justify-start text-4xl font-bold mb-4">{t("SubmitArticle")}</h1>

        {/* <h1 className="text-4xl font-bold mb-4">{t("Admin")}</h1> */}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div>
            <input
              type="text"
              placeholder={t("URL")}
              className="w-[200px] lg:w-[1200px] text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
              {...register("url")}
            />
            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder={t("Title")}
              className="w-[200px] lg:w-[1200px] text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
              {...register("title")}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <textarea
              placeholder={t("Description")}
              className="w-[200px] lg:w-[1200px] min-h-[120px] text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
              {...register("description")}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <button
            type="submit"
            className="w-[200px] lg:w-[1200px] bg-cyan-600  hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl "
          >
            {t("Submit")}
          </button>
        </form>
      </div>
    </main>
  );
};
