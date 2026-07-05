import AuthField from "./auth-field";
import AuthGoogleButton from "./auth-google-button";
import AuthSubmitButton from "./auth-submit-button";
import AuthSwitchLink from "./auth-switch-link";

export default function SignupForm() {
  return (
    <>
      <form className="space-y-6">
        <div className="space-y-6">
          <AuthField
            label="Email address"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
          />

          <AuthField
            label="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
          />

          <AuthField
            label="Repeat password"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Repeat password"
          />
        </div>

        <AuthSubmitButton>Create an account</AuthSubmitButton>
        <AuthGoogleButton>Sign up with Google</AuthGoogleButton>
      </form>

      <AuthSwitchLink
        prompt="Already have an account?"
        href="/login"
        label="Login"
      />
    </>
  );
}
