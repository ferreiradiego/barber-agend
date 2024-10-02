import SigninWithGoogle from "@/components/auth/signin-with-google";
import SignupForm from "@/components/auth/signup-form";
import Logo from "@/components/shared/logo";
import Link from "next/link";

const SignupPage = () => {
  return (
    <main className="flex flex-col gap-6 p-6 min-w-96">
      <Logo />

      <h1 className="mt-4 text-xl">Crie a sua conta</h1>

      <section className="">
        <SignupForm />
      </section>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>

      <SigninWithGoogle />

      <section className="flex flex-col justify-center items-center gap-1 md:flex-row">
        <p className="text-gray-500">Já tem uma conta?</p>
        <Link href="/signin" className="hover:underline">
          Entrar
        </Link>
      </section>
    </main>
  );
};

export default SignupPage;
