"use client";

import { useTranslations } from "next-intl";

import type { UpdateProfileInput } from "@/features/profile/schemas/profile-schema";
import EditProfileForm from "../forms/edit-profile-form";

interface EditProfileModalProps {
  email: string;
  initialValues: UpdateProfileInput;
  onClose: () => void;
}

export default function EditProfileModal({
  email,
  initialValues,
  onClose,
}: EditProfileModalProps) {
  const t = useTranslations("editProfile");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-talora-dark-blue/80 px-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-md rounded-2xl bg-talora-semi-dark-blue p-6 text-talora-white shadow-2xl">
        <h2 id="edit-profile-title" className="text-xl font-medium">
          {t("title")}
        </h2>

        <EditProfileForm
          email={email}
          initialValues={initialValues}
          onCancel={onClose}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
