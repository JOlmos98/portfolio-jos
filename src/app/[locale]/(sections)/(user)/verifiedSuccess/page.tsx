"use server";

import { getTranslations } from "next-intl/server";

export default async function VerifiedSuccessPage() {

    const t = await getTranslations("SignUp");

    return (
        <div>
            <h1 className="text-4xl font-bold bg-transparent">.</h1>

            <div className="bg-gray-300 dark:bg-zinc-800 p-5 lg:p-16 m-6 mt-72 mb-96 rounded-2xl max-w-4xl w-auto mx-auto flex flex-col items-center justify-center">
                <div className="text-center space-y-6">
                    <h1 className="text-3xl lg:text-5xl font-bold text-green-600 dark:text-green-500">
                        {t("Verified")}
                    </h1>
                    <p className="text-zinc-700 dark:text-zinc-300">
                        {t("Email successfully verified")}
                    </p>
                </div>
            </div>
        </div>
    );
}


// "use server";

// import { getTranslations } from "next-intl/server";

// export default async function VerifiedSuccessPage() {

//     const t = await getTranslations("SignUp");

//     return (
//         <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
//             <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-44">
//                 <h1 className="text-4xl font-bold bg-transparent"></h1>
//                 <div>
//                     <h1 className="text-4xl font-bold bg-transparent text-green-500 text-center mt-52 mb-64">{t("Email successfully verified")}</h1>
//                 </div>
//             </div>
//         </div>
//     );
// }