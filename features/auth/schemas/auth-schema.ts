import { z } from "zod";

export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z.email(t("invalidEmail")).trim().toLowerCase(),
    password: z.string().min(1, t("passwordRequired")),
  });
}

export function createSignupSchema(t: (key: string) => string) {
  return z
    .object({
      username: z
        .string()
        .min(3, t("usernameMinLength"))
        .max(15, t("usernameMaxLength"))
        .regex(
          /^[\p{L}\p{N}._-]+$/u,
          t("usernameInvalidChars"),
        )
        .trim(),
      email: z.email(t("invalidEmail")).trim().toLowerCase(),
      password: z.string().min(8, t("passwordMinLength")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("passwordsDoNotMatch"),
    });
}

export type LoginInput = z.infer<ReturnType<typeof createLoginSchema>>;
export type SignupInput = z.infer<ReturnType<typeof createSignupSchema>>;
