import AuthField from "./auth-field";
import AuthGoogleButton from "./auth-google-button";
import AuthSubmitButton from "./auth-submit-button";
import AuthSwitchLink from "./auth-switch-link";

export default function LoginForm() {
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
            autoComplete="current-password"
            placeholder="Password"
          />
        </div>

        <AuthSubmitButton>Login to your account</AuthSubmitButton>
        <AuthGoogleButton>Login with Google</AuthGoogleButton>
      </form>

      <AuthSwitchLink
        prompt="Don't have an account?"
        href="/signup"
        label="Sign Up"
      />
    </>
  );
}
