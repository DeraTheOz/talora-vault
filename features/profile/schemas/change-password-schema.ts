import { z } from "zod";

/**
 * Creates the change-password schema with translated validation messages.
 * `t` must resolve keys under `changePassword.errors` (e.g. `newPasswordMin`).
 */
export function createChangePasswordSchema(t: (key: string) => string) {
  return z
    .object({
      currentPassword: z.string().min(1, t("currentPasswordRequired")),
      newPassword: z
        .string()
        .min(8, t("newPasswordMin"))
        .max(72, t("newPasswordMax")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
      path: ["newPassword"],
      message: t("passwordSameAsCurrent"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t("passwordsDoNotMatch"),
    });
}

export type ChangePasswordInput = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;

export const defaultChangePasswordInput: ChangePasswordInput = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
