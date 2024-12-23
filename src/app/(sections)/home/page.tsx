import Image from "next/image";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold bg-transparent"></h1>
        <div className="flex flex-col sm:flex-row items-center gap-8"> {/* div que ajusta la imagen a la izquierda y texto a la derecha. */}
          <Image className="" src="/jos.png" alt="Next.js logo" width={360} height={76} priority />
          <p className="text-lg sm:max-w-xl">TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample TextExample </p>

        </div>
      </div>
    </div>
  );
}