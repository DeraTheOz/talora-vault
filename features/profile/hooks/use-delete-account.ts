"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createDeleteAccountSchema } from "../schemas/delete-account-schema";
import { toast } from "sonner";
import { deleteAccountAction } from "../actions/delete-account";

export function useDeleteAccount(
  authProvider: "google" | "credentials",
  email: string,
) {
  const schema = createDeleteAccountSchema(authProvider, email);
  const [isDeleting, startDeleteAccountTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { confirmInput: "" },
  });

  function onSubmit(data: { confirmInput: string }) {
    startDeleteAccountTransition(async () => {
      const result = await deleteAccountAction({
        confirmInput: data.confirmInput,
        authProvider,
      });

      if (!result.success) {
        setError("confirmInput", { message: result.error });
        toast.error(result.error || "Failed to delete account");
        return;
      }
      toast.success("Account deleted successfully");
      router.push("/");
    });
  }

  return {
    errors,
    isSubmitting,
    isDeleting,
    register,
    handleSubmit,
    onSubmit,
  };
}
