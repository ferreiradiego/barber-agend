import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { SessionProvider } from "next-auth/react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Header />
      <main className="flex-1 items-center justify-center">{children}</main>
      <Footer />
    </SessionProvider>
  );
}
