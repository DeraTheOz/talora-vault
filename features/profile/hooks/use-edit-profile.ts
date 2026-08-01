"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  createUpdateProfileSchema,
  type UpdateProfileInput,
} from "@/features/profile/schemas/profile-schema";
import { updateProfileAction } from "@/features/profile/actions/profile-actions";
import { toastStyles } from "@/lib/constants/toast";

/**
 * Manages the edit-profile form: validation, submission and post-save UI.
 * On success the app refreshes so it re-renders in the newly selected language.
 */
export function useEditProfile(
  initialValues: UpdateProfileInput,
  onSuccess: () => void,
) {
  const t = useTranslations("editProfile");
  const toastT = useTranslations("profile");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(
      createUpdateProfileSchema((key) => t(`errors.${key}`)),
    ),
    defaultValues: initialValues,
  });

  async function onSubmit(values: UpdateProfileInput) {
    const result = await updateProfileAction(values);

    if (result?.error) {
      toast.error(result.error, {
        id: "update-profile-error",
        ...toastStyles.error,
      });
      return;
    }

    if (result?.success) {
      toast.success(toastT("toastProfileUpdated"));
      form.reset({ ...values, bio: values.bio ?? "" });
      startTransition(() => {
        onSuccess();
        router.refresh();
      });
    }
  }

  return { form, isPending, onSubmit };
}
