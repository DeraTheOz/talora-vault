import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

import AuthCard from "@/app/components/forms/auth/auth-card";
import SignupForm from "@/app/components/forms/auth/signup-form";

export default async function SignupPage() {
  const session = await auth();
  const t = await getTranslations("auth");

  if (session?.user) {
    redirect("/");
  }

  return (
    <AuthCard title={t("signupTitle")}>
      <SignupForm />
    </AuthCard>
  );
}
