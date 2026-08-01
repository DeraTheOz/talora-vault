import { z } from "zod";

export const createDeleteAccountSchema = (
  authProvider: "google" | "credentials",
  userEmail: string,
) =>
  z
    .object({
      confirmInput: z.string().min(1, "Confirmation input is required"),
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
            ? `Please type "${userEmail}" to confirm deletion.`
            : "Password is required.",
        path: ["confirmInput"],
      },
    );
