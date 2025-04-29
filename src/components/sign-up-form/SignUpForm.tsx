"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { signUpSchema } from "@/zod/signUpSchema";
import { Link } from "@/i18n/navigation";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";

export const SignUpForm = () => {

  const t = useTranslations("SignUp");
  // const f = useTranslations("Footer");

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
      subscribe: false,
    },
  });

  const prefixes = [
    "+0", "+1", "+7", "+31", "+32", "+33", "+34", "+39", "+41", "+44",
    "+49", "+52", "+54", "+55", "+57", "+61", "+81", "+82", "+86", "+91",
    "+352", "+353", "+591"
  ];

  const [prefix, setPrefix] = useState(prefixes[0]);

  //! Revisar
  const { register, handleSubmit, formState: { errors }, reset } = form;

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {

      //Lógica de phone
      const processedValues = { ...values };

      if (processedValues.phone !== undefined && processedValues.phone.trim() !== "") {
        processedValues.phone = `${prefix} ${processedValues.phone.trim()}`;
      } else { processedValues.phone = ""; }

      if (processedValues.website !== undefined && processedValues.website.trim() !== "") {
        processedValues.website = `${processedValues.website.trim()}`;
      } else { processedValues.website = ""; }

      const res = await fetch("/api/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedValues),
      });

      if (res.status === 409) toast.error(t("Error already registered"));
      else if (!res.ok) throw new Error("Signup failed");
      else {

        //Lógica de newsletter check
        if (values.subscribe) {
          try {
            const newsletterRes = await fetch("/api/newsletter", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: values.email }),
            });

            if (newsletterRes.status === 409) { //Si ya está suscrito.
              // toast(f("Error already subscribed")); // opcional
              console.warn("Already subscribed");
            } else if (!newsletterRes.ok) {
              console.warn("Newsletter failed", await newsletterRes.text());
              // toast.error(t("Newsletter subscription failed")); 
            } else {
              // toast.success(t("Newsletter subscription successful"));
            }
          } catch (err) {
            console.warn(err);
            // toast.error(t("Newsletter subscription failed"));
          }
        }

        toast.success((t("Registered successfully") + " " + values.email), { duration: 5000 });
        reset();
      }
    } catch (e) {

      toast.error(t("Error during registration"));
      console.error(e);
    }
  };

  return (
    <div className=" p-6 m-6 rounded-2xl max-w-4xl w-auto mx-auto">
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
            className="w-[315] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{t("ErrorNameMin")}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder={t("Last Name")}
            className="w-[315] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
            {...register("last_name")}
          />
          {errors.last_name && <p className="text-red-500 text-sm mt-1">{t("ErrorLastNameMin")}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder={t("Email")}
            className="w-[315] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{t("ErrorEmailInvalid")}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder={t("Password")}
            className="w-[315] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
            {...register("password")}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{t("ErrorPasswordMin")}</p>}
        </div>
        <div>
          <div className="flex lg:w-[600px]">
            <Listbox value={prefix} onChange={setPrefix}>
              <div className="relative w-[100px]">
                <ListboxButton className="w-full h-full px-4 py-2 text-blue-cyan dark:text-blue-cyan rounded-l-2xl bg-white dark:bg-[#121212] border border-zinc-300 dark:border-[#121212]">
                  {prefix}
                </ListboxButton>
                <ListboxOptions className="absolute mt-1 max-h-40 overflow-auto w-full rounded-md bg-white dark:bg-[#121212] shadow-lg z-10">
                  {prefixes.map((p, idx) => (
                    <ListboxOption
                      key={idx}
                      value={p}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${active ? 'bg-blue-100 text-black dark:bg-blue-cyan' : ''
                        }`
                      }
                    >
                      {p}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>

            <input
              type="tel"
              placeholder={t("Phone")}
              className="w-full px-4 py-2 text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] rounded-r-2xl border border-l-0 "
              {...register("phone")}
            />
          </div>

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{t("ErrorPhoneMin")}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder={t("Bio")}
            className="w-[315] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl min-h-[100px]"
            {...register("bio")}
          />
          {errors.bio && <p className="text-red-500 text-sm mt-1">{t("ErrorBioMax")}</p>}
        </div>

        <div>
          <input
            type="url"
            placeholder={t("Website")}
            className="w-[315] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
            {...register("website")}
          />
          {errors.website && <p className="text-red-500 text-sm mt-1">{t("ErrorWebsiteUrl")}</p>}
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register("subscribe")}
            className="mt-1"
            id="subscribe"
          />
          <label htmlFor="subscribe" className="text-sm text-zinc-700 dark:text-zinc-300">
            {t("newsletterSubscription")}
          </label>
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

// <Select name="status" aria-label="Project status" className={"lg:w-[100px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-l-2xl"}>
//   <option value="+0">+0</option>
//   <option value="+0">+1</option>
//   <option value="+7">+7</option>
//   <option value="+31">+31</option>
//   <option value="+32">+32</option>
//   <option value="+33">+33</option>
//   <option value="+34">+34</option>
//   <option value="+39">+39</option>
//   <option value="+41">+41</option>
//   <option value="+44">+44</option>
//   <option value="+49">+49</option>
//   <option value="+52">+52</option>
//   <option value="+54">+54</option>
//   <option value="+55">+55</option>
//   <option value="+57">+57</option>
//   <option value="+61">+61</option>
//   <option value="+81">+81</option>
//   <option value="+82">+82</option>
//   <option value="+86">+86</option>
//   <option value="+91">+91</option>
//   <option value="+352">+352</option>
//   <option value="+353">+353</option>
//   <option value="+591">+591</option>
// </Select>



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
//         <h2 className="text-4xl font-bold leading-tight text-[#121212] dark:text-white p-12">
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
//           <h2 className="text-2xl font-bold text-[#121212] dark:text-white">
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
