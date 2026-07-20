import { auth } from "@/auth";
import { redirect } from "next/navigation";

import AuthCard from "@/app/components/forms/auth/auth-card";
import SignupForm from "@/app/components/forms/auth/signup-form";

export default async function SignupPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <AuthCard title="Sign Up">
      <SignupForm />
    </AuthCard>
  );
}
