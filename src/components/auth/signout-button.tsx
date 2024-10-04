"use client";

import { signout } from "@/actions/signout";
import { Button } from "../ui/button";

const SignoutButton = () => {
  const handeSignoutClick = async () => {
    await signout({});
  };
  return (
    <Button onClick={handeSignoutClick} variant="link" size="icon">
      Sair
    </Button>
  );
};

export default SignoutButton;
