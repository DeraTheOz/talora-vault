import { z } from "zod";

import { locales } from "@/i18n/config";

/**
 * Creates the profile update schema with translated validation messages.
 * `t` must resolve keys under `editProfile.errors` (e.g. `usernameMin`).
 */
export function createUpdateProfileSchema(t: (key: string) => string) {
  return z.object({
    username: z
      .string()
      .min(3, t("usernameMin"))
      .max(15, t("usernameMax"))
      .regex(
        /^[\p{L}\p{N}._-]+$/u,
        t("usernamePattern"),
      )
      .trim(),
    bio: z.string().trim().max(200, t("bioMax")).optional(),
    language: z.enum(locales),
  });
}

export type UpdateProfileInput = z.infer<
  ReturnType<typeof createUpdateProfileSchema>
>;

export const defaultProfileInput: UpdateProfileInput = {
  username: "",
  bio: "",
  language: "en",
};
