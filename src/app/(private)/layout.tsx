import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
