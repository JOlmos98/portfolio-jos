"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/zod/contactSchema";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const ContactForm = () =>  {
  const t = useTranslations("Contact");

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      content: "",
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Error al enviar");

      toast.success(t("Submitted successfully"));
      reset();
    } catch (e) {
      toast.error(t("Error sending message"));
      console.warn(e);
    }
  }

  return (
    <div className="bg-gray-300 dark:bg-zinc-800 p-6 m-6 rounded-2xl max-w-4xl w-auto mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {t("Send me")}{" "}
        <span className="text-blue-cyan dark:text-blue-cyan font-bold">
          {t("message")}
        </span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div>
          <input
            type="text"
            placeholder={t("Full Name")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
            {...register("fullName")}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{t("Error name")}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder={t("Email")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{t("Error email")}</p>}
        </div>

        <div>
          <textarea
            placeholder={t("Content")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl min-h-[150px]"
            {...register("content")}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{t("Error content")}</p>}
        </div>

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl w-full"
        >
          {t("Submit")}
        </button>
      </form>
    </div>
  );
}
