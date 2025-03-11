import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Footer, ParticlesBackground, Providers } from "@/components";
import { Toaster } from "react-hot-toast";
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {


  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "de" | "es")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>


        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Toaster position="bottom-right" reverseOrder={false} gutter={8} toastOptions={{ duration: 3000, style: { background: "var(--toast-bg)", color: "var(--toast-color)", }, }} />
            <ParticlesBackground />
            <div>{children}</div>
            <Footer />
          </Providers>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
