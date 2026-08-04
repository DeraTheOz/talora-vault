"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar01Icon,
  Mail01Icon,
  EditUser02Icon,
  CheckmarkCircle01Icon,
  CancelCircleIcon,
  AccountRecoveryIcon,
} from "@hugeicons/core-free-icons";

import avatar from "@/public/image-avatar.png";
import GoogleIcon from "@/public/google.svg";
import { formatName, formatRegistrationDate } from "@/lib/helpers/format";
import { useLocale } from "next-intl";
import { createPortal } from "react-dom";
import EmailVerificationModal from "../modals/email-verification-modal";
import EditProfileModal from "../modals/edit-profile-modal";
import type { Locale } from "@/i18n/config";
import { useProfileHeader } from "@/features/profile/hooks/use-profile-header";

type ProfileHeaderProps = {
  name: string | null;
  email: string;
  image: string | null;
  bio: string | null;
  language: string;
  createdAt: Date;
  authProvider: "google" | "credentials";
  emailVerified: Date | null;
};

export default function ProfileHeader({
  name,
  email,
  image,
  bio,
  language,
  createdAt,
  authProvider,
  emailVerified,
}: ProfileHeaderProps) {
  const locale = useLocale();
  const {
    t,
    isOpen,
    isEditOpen,
    isVerifying,
    isVerified,
    isGenerating,
    setIsOpen,
    setIsEditOpen,
    handleVerify,
    handleRegenerate,
  } = useProfileHeader(emailVerified);

  return (
    <section
      aria-label={t("pageTitle")}
      className="rounded-xl bg-talora-semi-dark-blue p-5 md:p-8">
      <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-8">
        {/* Avatar */}
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl ring-2 ring-talora-greyish-blue md:size-28">
          <Image
            src={image ?? avatar}
            alt={name ? `${name} profile` : t("pageTitle")}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 112px, 80px"
          />
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="truncate text-xl font-normal md:text-[2rem] md:leading-tight">
              {formatName(name)}
            </h1>

            {/* Auth method badge */}
            <span
              className={
                isVerified
                  ? "inline-flex items-center gap-1 rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400"
                  : "inline-flex items-center gap-1 rounded-full bg-talora-red/15 px-3 py-1 text-xs font-medium text-talora-red"
              }>
              {authProvider === "google" ? (
                <Image src={GoogleIcon} alt="" height={14} />
              ) : null}
              {authProvider === "google" ? t("googleBadge") : t("emailBadge")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-talora-white/70">
            <span className="inline-flex items-center gap-1.5">
              <HugeiconsIcon icon={Mail01Icon} size={16} />
              {email}

              {isVerified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-medium text-green-400">
                  {t("verified")}
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={12} />
                </span>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1 rounded-full bg-talora-red/15 px-2.5 py-0.5 text-xs font-medium text-talora-red">
                    {t("emailNotVerified")}
                    <HugeiconsIcon icon={CancelCircleIcon} size={12} />
                  </span>

                  {/* Verify Email */}
                  <button
                    type="button"
                    disabled={isOpen}
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center gap-1 rounded-md bg-talora-white/10 px-2.5 py-1 text-xs font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isVerifying ? t("verifying") : t("verifyEmail")}
                  </button>
                </>
              )}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <HugeiconsIcon icon={Calendar01Icon} size={16} />
              {t("memberSince", {
                date: formatRegistrationDate(createdAt, locale),
              })}
            </span>
          </div>

          {/* Bio */}
          {bio ? (
            <p className="max-w-2xl text-sm text-talora-white/70">{bio}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Regenerate avatar */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleRegenerate}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-talora-white/10 px-5 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            <HugeiconsIcon icon={AccountRecoveryIcon} size={18} />
            {isGenerating ? t("regenerating") : t("regenerateAvatar")}
          </button>

          {/* Edit Profile button */}
          <button
            type="button"
            aria-label={t("editProfile")}
            onClick={() => setIsEditOpen(true)}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg bg-talora-white/10 px-5 text-sm font-medium text-talora-white cursor-pointer transition hover:bg-talora-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-talora-white active:scale-95">
            <HugeiconsIcon icon={EditUser02Icon} size={18} />
            {t("editProfile")}
          </button>
        </div>
      </div>

      {isOpen
        ? createPortal(
            <EmailVerificationModal
              email={email}
              onConfirm={handleVerify}
              isPending={isVerifying}
              onClose={() => setIsOpen(false)}
            />,
            document.body,
          )
        : null}

      {isEditOpen
        ? createPortal(
            <EditProfileModal
              email={email}
              initialValues={{
                username: name ?? "",
                bio: bio ?? "",
                language: language as Locale,
              }}
              onClose={() => setIsEditOpen(false)}
            />,
            document.body,
          )
        : null}
    </section>
  );
}
