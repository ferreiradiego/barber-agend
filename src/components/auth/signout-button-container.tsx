import { signOut } from "../../../auth";

interface SignoutButtonContainerProps {
  redirectTo?: string;
  button: React.ReactNode;
}

const SignoutButtonContainer = ({
  redirectTo = "/signin",
  button,
}: SignoutButtonContainerProps) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo });
      }}
    >
      {button}
    </form>
  );
};

export default SignoutButtonContainer;
