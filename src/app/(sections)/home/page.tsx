import Image from "next/image";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold bg-transparent"></h1>
        <div className="flex flex-col sm:flex-row items-center gap-8"> {/* div que ajusta la imagen a la izquierda y texto a la derecha. */}
        <Image className="" src="/jos.png" alt="Next.js logo" width={360} height={76} priority />
        <p className="text-lg sm:max-w-xl">“All that is gold does not glitter, not all those who wander are lost; the old that is 
            strong does not wither, deep roots are not reached by the frost. From the ashes a 
            fire shall be woken, a light from the shadows shall spring; renewed shall be blade 
            that was broken, the crownless again shall be king.” Applying light and dark mode themes with TailwindCSS is easy. However, if you want to allow users to toggle between light and dark mode themes while also identifying the system preference setting at load time and avoiding a page flicker, things get a little more complicated.

Why This Is Challenging
Next.js generates static pages on the server before sending them to the browser (aka "the client"). This helps keep things fast and websites seem snappy, but the server cannot read what user preferences will be. The server has no idea in advance that John prefers light-mode in his browser and Jane prefers dark-mode in her browser.

The best you can do is apply the TailwindCSS dark mode variant in advance that will read the prefers-color-scheme user system setting and apply the dark mode theme if that is preferred.

When you want to allow a user to manually toggle the light-dark mode theme setting, you need to read the system preference first. If they do toggle the setting, you want to save the new setting in localStorage. However, localStorage is only available in the browser. Your server components won't be able to read this setting, and this situation can cause a theme flash when your site loads due to an incorrect theme being applied for a split second.

Fortunately, the next-themes package can help avoid this issue while allowing users the ability to toggle between light and dark mode in your Next.js website.

Here's how I applied next-themes with TailwindCSS to my blog:

1. Edit your TailwindCSS config file
You need to make one addition to your tailwind.config.ts file if you want to toggle dark mode manually. You must add a darkMode setting with a class value.</p>
            </div>
      </div>
    </div>
  );
}