"use client";

import { newsletterSchema } from "@/zod/newsletterSchema";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

export const NewsletterCard = () => {

    const t = useTranslations("Footer");
    const [email, setEmail] = useState("");

    // Acción de suscribirse
    const handleSubscribe = async () => {
        const parsed = newsletterSchema.safeParse({ email });

        if (!parsed.success) {
            toast.error(t("Invalid email"));
            return;
        }

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(t("Email sent successfully"));
                setEmail("");
            } else {
                toast.error(data.message === "Este email ya está suscrito" ? t("Error already subscribed") : t("Error sending email"));
            }
        } catch (error) {
            toast.error("Error de conexión");
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-300 dark:bg-zinc-800 p-6 m-6 rounded-2xl max-w-xl w-auto mx-auto">
            <h2 className='text-xl font-bold mb-4'>{t('Subscribe to my ')}<span className="text-blue-cyan dark:text-blue-cyan font-bold">{t('newsletter')}</span></h2>
            <div className="flex items-center justify-center">
                <p>
                    {t('Leave me your email if')}
                </p>
            </div>
            <div className="flex items-center justify-center pt-5">
                <input
                    type="text"
                    className="text-blue-cyan dark:text-blue-cyan min-w-24 px-4 py-2 rounded-2xl"
                    placeholder={t("Your email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSubscribe} className='ml-4 bg-cyan-600 hover:bg-blue-cyan text-white font-bold py-2 px-4 rounded-2xl'>
                    {t('Subscribe')}
                </button>
            </div>
        </div>
    )
}

