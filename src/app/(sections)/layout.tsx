import { Navbar } from "../../components";

export default function SectionsLayout({
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