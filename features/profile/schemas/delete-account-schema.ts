import { z } from "zod";

/**
 * Creates the delete-account schema with translated validation messages.
 * `t` must resolve keys under `deleteAccount.errors` (e.g. `confirmInputRequired`).
 */
export function createDeleteAccountSchema(
  t: (key: string, values?: Record<string, string>) => string,
  authProvider: "google" | "credentials",
  userEmail: string,
) {
  return z
    .object({
      confirmInput: z.string().min(1, t("confirmInputRequired")),
    })
    .refine(
      (data) => {
        if (authProvider === "google") {
          return data.confirmInput === userEmail;
        }
        return true;
      },
      {
        message:
          authProvider === "google"
            ? t("confirmEmailMismatch", { email: userEmail })
            : t("passwordRequired"),
        path: ["confirmInput"],
      },
    );
}
