import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ThemeProvider from "@/providers/theme-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BarberAgend",
  description: "Agendamento de horários para barbearias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased w-full min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
