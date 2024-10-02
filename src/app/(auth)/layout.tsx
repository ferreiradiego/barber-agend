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
