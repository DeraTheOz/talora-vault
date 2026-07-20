import { auth } from "@/auth";
import { redirect } from "next/navigation";

import AuthCard from "@/app/components/forms/auth/auth-card";
import LoginForm from "@/app/components/forms/auth/login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <AuthCard title="Login">
      <LoginForm />
    </AuthCard>
  );
}
