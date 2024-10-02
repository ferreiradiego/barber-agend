import { z } from "zod";
import { signinSchema, signupSchema } from "../schemas";

type SigninFormData = z.infer<typeof signinSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export type { SigninFormData, SignupFormData };
