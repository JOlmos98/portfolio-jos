export default async function SectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <div>
        <h1>
          {children}
        </h1>
      </div>
    </>
  );
}