"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { SigninFormData, signinSchema } from "@/core";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MaskedInput } from "../ui/masked-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../shared/icons";
import { signinWithCredentials } from "@/actions/signin";

const SigninForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      cellphone: "(99) 9 9999-9999",
      password: "123456",
    },
  });

  const onSubmit: SubmitHandler<SigninFormData> = async (data) => {
    setIsLoading(true);

    const error = await signinWithCredentials(data);

    if (!error) {
      router.replace("/");
      return;
    }

    setError(error.error);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="cellphone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <MaskedInput
                  mask="phone"
                  placeholder="Digite seu telefone"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite sua senha"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage className="text-xs font-semibold" />
            </FormItem>
          )}
        />

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <Button size={"lg"} type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
