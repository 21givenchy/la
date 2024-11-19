import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { NavBar } from "@/components/navbar"
import { ThemeProvider } from "../app/_providers";
import { ClerkProvider } from '@clerk/nextjs'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "frontforumfocus",
  description: "sustainability management software",
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/app/favicon.ico',
        href: '/app/favicon.ico',
      },
  
    ],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className="flex-1 w-full max-w-[1920px] mx-auto">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
