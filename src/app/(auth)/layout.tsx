import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | BarberAgend",
  description: "Login na plataforma BarberAgend",
};

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen items-center justify-center w-full">
        {children}
      </div>
    </>
  );
}
