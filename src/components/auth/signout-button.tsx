"use client";

import { signout } from "@/actions/signout";
import { Button } from "../ui/button";
import React from "react";

interface SignoutButtonProps {
  children: React.ReactNode;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const SignoutButton = ({ children, variant = "link" }: SignoutButtonProps) => {
  const handeSignoutClick = async () => {
    await signout({ redirectTo: "/" });
  };
  return (
    <Button onClick={handeSignoutClick} variant={variant} size="icon">
      {children}
    </Button>
  );
};

export default SignoutButton;
