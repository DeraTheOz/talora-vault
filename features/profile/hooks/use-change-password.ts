"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  createChangePasswordSchema,
  defaultChangePasswordInput,
  type ChangePasswordInput,
} from "@/features/profile/schemas/change-password-schema";
import { changePasswordAction } from "@/features/profile/actions/change-password";
import { toastStyles } from "@/lib/constants/toast";

/**
 * Manages the change-password form: validation, submission and post-save UI.
 */
export function useChangePassword(onSuccess?: () => void) {
  const t = useTranslations("changePassword");

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(
      createChangePasswordSchema((key) => t(`errors.${key}`)),
    ),
    defaultValues: defaultChangePasswordInput,
  });

  async function onSubmit(values: ChangePasswordInput) {
    const result = await changePasswordAction(values);

    if (result?.error) {
      toast.error(result.error, {
        id: "change-password-error",
        ...toastStyles.error,
      });
      return;
    }

    if (result?.success) {
      toast.success(t("toastPasswordChanged"));
      form.reset(defaultChangePasswordInput);
      onSuccess?.();
    }
  }

  return { form, onSubmit };
}
