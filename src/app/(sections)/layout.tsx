import { Navbar } from "../../components";

export default function GeneralLayout({
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