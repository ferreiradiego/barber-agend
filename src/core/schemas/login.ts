import { z } from "zod";

const signinSchema = z.object({
  cellphone: z
    .string({
      message: "O Celular é obrigatório",
    })
    .regex(/^\(\d{2}\)\s9\s\d{4}-\d{4}$/, {
      message: "O Celular deve estar no formato (99) 9 9999-9999",
    }),
  password: z
    .string({
      message: "A Senha é obrigatória",
    })
    .min(6, {
      message: "A Senha deve ter no mínimo 6 caracteres",
    })
    .max(255, {
      message: "A Senha deve ter no máximo 255 caracteres",
    }),
});

const signupSchema = z.object({
  name: z
    .string({
      message: "O Nome é obrigatório",
    })
    .min(2, {
      message: "O Nome deve ter no mínimo 2 caracteres",
    })
    .max(255, {
      message: "O Nome deve ter no máximo 255 caracteres",
    }),
  cellphone: z
    .string({
      message: "O Celular é obrigatório",
    })
    .regex(/^\(\d{2}\)\s9\s\d{4}-\d{4}$/, {
      message: "O Celular deve estar no formato (99) 9 9999-9999",
    }),
  password: z
    .string({
      message: "A Senha é obrigatória",
    })
    .min(6, {
      message: "A Senha deve ter no mínimo 6 caracteres",
    })
    .max(255, {
      message: "A Senha deve ter no máximo 255 caracteres",
    }),
});

export { signinSchema, signupSchema };
