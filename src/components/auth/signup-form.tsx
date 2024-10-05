"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SignupFormData, signupSchema } from "@/core";
import { MaskedInput } from "../ui/masked-input";
import { useRouter } from "next/navigation";
import { Icons } from "../shared/icons";
import { signinWithCredentials } from "@/actions/signin";
import { signup } from "@/actions/signup";

const SignupForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "Fulano",
      cellphone: "(99) 9 9999-9999",
      password: "123456",
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsLoading(true);

    let withError = await signup(data);

    if (withError) {
      setError(withError.error);
      setIsLoading(false);
      return;
    }

    withError = await signinWithCredentials(data);

    if (withError) {
      setError(withError.error);
      setIsLoading(false);
      return;
    }

    router.replace("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage className="text-sm font-semibold" />
            </FormItem>
          )}
        />

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

        <Button type="submit" size={"lg"}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Criar conta
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
