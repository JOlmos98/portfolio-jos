// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { useTranslations } from "next-intl";
// import { signUpSchema } from "@/zod/signUpSchema";
// import { Link } from "@/i18n/navigation";

// export const SignUpForm = () => {
//   const t = useTranslations("SignUp");

//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       name: "",
//       last_name: "",
//       email: "",
//       password: "",
//       phone: "",
//       bio: "",
//       website: "",
//     },
//   });

//   const { register, handleSubmit, formState: { errors }, reset } = form;

//   const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });

//       if (!res.ok) throw new Error("Signup failed");

//       toast.success(t("Registered successfully"));
//       reset();
//     } catch (e) {
//       toast.error(t("Error during registration"));
//       console.error(e);
//     }
//   };

//   return (
//     <div className="flex min-h-screen w-full">
//       {/* Lado izquierdo sin fondo */}
//       <div className="w-1/2 hidden lg:flex items-center justify-center">
//         <h2 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-white p-12">
//           {t("Sign Up to")} <br />
//           <span className="text-blue-cyan">{t("All the content")}</span>
//         </h2>
//       </div>

//       {/* Lado derecho con fondo gris */}
//       <div className="w-full h-full lg:w-1/2 bg-gray-300 dark:bg-zinc-800 flex items-center justify-center px-6 py-12">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           noValidate
//           className="w-full max-w-xl space-y-4"
//         >
//           <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
//             {t("Create your")}{" "}
//             <span className="text-blue-cyan dark:text-blue-cyan">{t("account")}</span>
//           </h2>

//           <input type="text" placeholder={t("Name")} {...register("name")} className="w-full px-4 py-2 rounded-2xl text-blue-cyan dark:text-blue-cyan" />
//           {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//           <input type="text" placeholder={t("Last Name")} {...register("last_name")} className="w-full px-4 py-2 rounded-2xl text-blue-cyan dark:text-blue-cyan" />
//           {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}

//           <input type="email" placeholder={t("Email")} {...register("email")} className="w-full px-4 py-2 rounded-2xl text-blue-cyan dark:text-blue-cyan" />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//           <input type="password" placeholder={t("Password")} {...register("password")} className="w-full px-4 py-2 rounded-2xl text-blue-cyan dark:text-blue-cyan" />
//           {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//           <input type="tel" placeholder={t("Phone")} {...register("phone")} className="w-full px-4 py-2 rounded-2xl text-blue-cyan dark:text-blue-cyan" />
//           {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

//           <textarea placeholder={t("Bio")} {...register("bio")} className="w-full px-4 py-2 rounded-2xl min-h-[100px] text-blue-cyan dark:text-blue-cyan" />
//           {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}

//           <input type="url" placeholder={t("Website")} {...register("website")} className="w-full px-4 py-2 rounded-2xl text-blue-cyan dark:text-blue-cyan" />
//           {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}

//           <button type="submit" className="bg-cyan-600 hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl w-full">
//             {t("Register")}
//           </button>

//           <p className="text-gray-500 dark:text-gray-400">
//             {t("Already have an account?")}{" "}
//             <Link href="/login" className="text-blue-cyan dark:text-blue-cyan hover:text-cyan-400 transition font-bold">
//               {t("Login")}
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };


//* Formato con tarjeta centrada en la pantalla:

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { signUpSchema } from "@/zod/signUpSchema";
import { Link } from "@/i18n/navigation";

export const SignUpForm = () => {
  const t = useTranslations("SignUp");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      bio: "",
      website: "",
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Signup failed");

      toast.success(t("Registered successfully"));
      reset();
    } catch (e) {
      toast.error(t("Error during registration"));
      console.error(e);
    }
  };

  return (
    <div className="bg-gray-300 dark:bg-zinc-800 p-6 m-6 rounded-2xl max-w-4xl w-auto mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {t("Create your")}{" "}
        <span className="text-blue-cyan dark:text-blue-cyan font-bold">
          {t("account")}
        </span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div>
          <input
            type="text"
            placeholder={t("Name")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder={t("Last Name")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
            {...register("last_name")}
          />
          {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder={t("Email")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder={t("Password")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <input
            type="tel"
            placeholder={t("Phone")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <textarea
            placeholder={t("Bio")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl min-h-[100px]"
            {...register("bio")}
          />
          {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
        </div>

        <div>
          <input
            type="url"
            placeholder={t("Website")}
            className="lg:w-[600px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
            {...register("website")}
          />
          {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl w-full"
        >
          {t("Register")}
        </button>
        <p className="text-gray-400">{t("Already have an account?")} <Link href="/login" className="text-blue-cyan dark:text-blue-cyan hover:text-red-400 transition font-bold">{t("Login")}</Link></p>
      </form>
    </div>
  );
};
