import { Navbar } from "@/components";

export default async function SectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Navbar />
      <div>
        <h1>
          {children}
        </h1>
      </div>
    </>
  );
}