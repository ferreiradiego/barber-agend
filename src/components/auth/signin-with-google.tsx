"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../shared/icons";

const SigninWithGoogle = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <Button variant="outline" type="button" disabled={isLoading}>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Google
    </Button>
  );
};

export default SigninWithGoogle;
