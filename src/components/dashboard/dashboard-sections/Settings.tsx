"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { updateSettingsSchema } from "@/zod/updateSettingsSchema";
import { useEffect } from "react";

export const Settings = () => {
  const { data: session, status } = useSession();
  const t = useTranslations("Dashboard");

const form = useForm<z.infer<typeof updateSettingsSchema>>({
  resolver: zodResolver(updateSettingsSchema),
  defaultValues: {
    userId: undefined,
    avatarUrl: "",
    phone: "",
    bio: "",
    website: "",
  },
});

const { register, handleSubmit, formState: { errors }, reset } = form;

useEffect(() => {
  if (session?.user?.id) {
    const currentValues = form.getValues();

    const isEmpty =
      !currentValues.avatarUrl &&
      !currentValues.phone &&
      !currentValues.bio &&
      !currentValues.website;

    if (isEmpty) {
      reset({
        userId: session.user.id,
        avatarUrl: session.user.image ?? "",
        phone: "",
        bio: "",
        website: "",
      });
    }
  }
}, [session, reset]);


  const onSubmit = async (values: z.infer<typeof updateSettingsSchema>) => {
    try {
      const res = await fetch("/api/updateSettings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data.error);
        throw new Error("Failed");
      }

      toast.success(t("Updated"));
    } catch (error) {
      console.warn("Error updating settings:", error);
      toast.error(t("ErrorUpdating"));
    }
  };

  if (status === "loading") return <p className="ml-36 lg:ml-80 p-4">{t("Loading")}...</p>;

  return (
    <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80 pr-2">
      <h1 className="flex text-left justify-start text-4xl font-bold mb-4">
        {t("Settings")}
      </h1>
      <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-6">
        {t("SettingsText")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 max-w-[1200px]">
        <div>
          <input
            type="text"
            placeholder={t("NewImageUrl")}
            className="w-full text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
            {...register("avatarUrl")}
          />
          {errors.avatarUrl && <p className="text-red-500 text-sm mt-1">{errors.avatarUrl.message}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder={t("Phone")}
            className="w-full text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <textarea
            placeholder={t("Bio")}
            className="w-full min-h-[100px] text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
            {...register("bio")}
          />
          {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
        </div>

        <div>
          <input
            type="url"
            placeholder={t("Website")}
            className="w-full text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
            {...register("website")}
          />
          {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
        </div>

        <input type="hidden" {...register("userId", { valueAsNumber: true })} />

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl"
        >
          {t("Save")}
        </button>
      </form>
    </main>
  );
};


// "use client";

// import { useSession } from "next-auth/react";
// import { useTranslations } from "next-intl";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { updateSettingsSchema } from "@/zod/updateSettingsSchema";

// export const Settings = () => {
//   const { data: session } = useSession();
//   const t = useTranslations("Dashboard");

//   const form = useForm<z.infer<typeof updateSettingsSchema>>({
//     resolver: zodResolver(updateSettingsSchema),
//     defaultValues: {
//       userId: session?.user?.id || 0 || undefined,
//       avatarUrl: session?.user?.image || "",
//       phone: "",
//       bio: "",
//       website: "",
//     },
//   });

// console.warn("!!!!!!!!!!!!!! ID  !!!!!!!!!!!!!!!!", session?.user?.id )

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = form;

//   const onSubmit = async (values: z.infer<typeof updateSettingsSchema>) => {
//     try {
//       const res = await fetch("/api/updateSettings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         console.error(data.error);
//         throw new Error("Failed");
//       }

//       toast.success(t("ImageUpdated"));
//     } catch (error) {
//       toast.error(t("ErrorUpdating"));
//     }
//   };

//   return (
//     <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80 pr-2">
//       <h1 className="flex text-left justify-start text-4xl font-bold mb-4">
//         {t("Settings")}
//       </h1>
//       <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-6">
//         {t("SettingsText")}
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6 max-w-[1200px]">
//         <div>
//           <input
//             type="text"
//             placeholder={t("NewImageUrl")}
//             className="w-full text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
//             {...register("avatarUrl")}
//           />
//           {errors.avatarUrl && <p className="text-red-500 text-sm mt-1">{errors.avatarUrl.message}</p>}
//         </div>

//         <div>
//           <input
//             type="tel"
//             placeholder={t("Phone")}
//             className="w-full text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
//             {...register("phone")}
//           />
//           {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
//         </div>

//         <div>
//           <textarea
//             placeholder={t("Bio")}
//             className="w-full min-h-[100px] text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
//             {...register("bio")}
//           />
//           {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
//         </div>

//         <div>
//           <input
//             type="url"
//             placeholder={t("Website")}
//             className="w-full text-blue-cyan dark:text-blue-cyan border border-zinc-300 dark:border-[#121212] bg-neutral-50 dark:bg-neutral-800 px-4 py-2 rounded-2xl"
//             {...register("website")}
//           />
//           {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
//         </div>

//         <input type="hidden" {...register("userId", { valueAsNumber: true })} />

//         <button
//           type="submit"
//           className="w-full bg-cyan-600 hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl"
//         >
//           {t("Save")}
//         </button>
//       </form>
//     </main>
//   );
// };


// "use client";

// import { useTranslations } from 'next-intl';
// import React from 'react'

// export const Settings = () => {

//     const t = useTranslations("Dashboard");

//     return (
//         <div>
//             <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
//                 <h1 className="text-4xl font-bold mb-4">{t("Settings")}</h1>
//                 <p className="text-zinc-700 dark:text-zinc-300 text-xl">
//                     {t("SettingsText")}
//                 </p>
//             </main>
//         </div>
//     )
// }
