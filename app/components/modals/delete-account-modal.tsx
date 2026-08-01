"use client";

import { useDeleteAccount } from "@/features/profile/hooks/use-delete-account";
import FormError from "../forms/form-error";

interface DeleteAccountModalProps {
  authProvider: "google" | "credentials";
  email: string;
  onClose: () => void;
}

export default function DeleteAccountModal({
  authProvider,
  email,
  onClose,
}: DeleteAccountModalProps) {
  const { errors, isSubmitting, isDeleting, register, handleSubmit, onSubmit } =
    useDeleteAccount(authProvider, email);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-account-title"
      className="fixed inset-0 z-50 grid place-items-center bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2
          id="delete-account-title"
          className="text-xl font-medium text-talora-red">
          Delete Account
        </h2>

        <p className="mt-2 text-sm text-talora-white/70">
          This action is permanent and cannot be undone. All your watchlists,
          reviews, and ratings will be deleted.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="confirmInput" className="block text-sm font-medium">
              {authProvider === "google" ? (
                <>
                  Type{" "}
                  <span className="font-bold text-talora-red">{email}</span> to
                  confirm:
                </>
              ) : (
                "Enter your password to confirm:"
              )}
            </label>

            <input
              id="confirmInput"
              type={authProvider === "google" ? "text" : "password"}
              autoComplete={
                authProvider === "google" ? "off" : "current-password"
              }
              disabled={isSubmitting || isDeleting}
              aria-disabled={isSubmitting || isDeleting}
              aria-invalid={Boolean(errors.confirmInput)}
              placeholder={
                authProvider === "google" ? email : "Enter your password"
              }
              {...register("confirmInput")}
              className="w-full rounded-lg border border-talora-greyish-blue/30 bg-talora-dark-blue px-4 py-3 text-sm text-talora-white outline-none transition placeholder:text-talora-white/35 focus:border-talora-red disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.confirmInput ? (
              <FormError errorMessage={errors.confirmInput.message} />
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting || isDeleting}
              className="inline-flex min-h-10 items-center rounded-lg bg-talora-white/10 px-5 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15 disabled:cursor-not-allowed disabled:opacity-60">
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isDeleting}
              className="inline-flex min-h-10 items-center rounded-lg bg-talora-red px-5 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-red/85       disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting || isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
