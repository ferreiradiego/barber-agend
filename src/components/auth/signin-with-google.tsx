import { signIn } from "@/auth";
import { Icons } from "../shared/icons";
import { Button } from "../ui/button";

const SigninWithGoogle = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
      className="flex items-center justify-center"
    >
      <Button type="submit" variant="outline" className="flex w-full">
        <Icons.google className="mr-2 h-4 w-4" />
        Entrar com o Google
      </Button>
    </form>
  );
};

export default SigninWithGoogle;
