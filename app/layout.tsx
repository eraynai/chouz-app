import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/provider";
export const metadata: Metadata = {
  title: "Chouz — A calmer way to begin",
  description:
    "Chouz is a gentle 7-day morning ritual delivered by email, designed to help you begin your day with calm, presence, and emotional grounding — before the world needs you.",
  openGraph: {
    title: "Chouz — A calmer way to begin",
    description:
      "A gentle 7-day morning ritual delivered by email. No tracking. No pressure. Just presence.",
    url: "https://chouz.app", // update if different
    siteName: "Chouz",
    images: [
      {
        url: "/og-chouz.png",
        width: 1200,
        height: 630,
        alt: "Chouz — A calmer way to begin",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              document.documentElement.classList.add('dark');
            })();
          `
        }} />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,200..700,0..1,-50..200&display=optional"
        />
        <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
            />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet"></link>
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              background-color: #f8f9fa;
              color: #27272a;
            }
            .dark body {
              background-color: #0f0f13;
              color: #e4e4e7;
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="theme"
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
