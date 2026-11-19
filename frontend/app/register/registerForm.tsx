"use client";

import { useState, type FormEvent } from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/navigation";
import { notifyAuthStateChanged, signIn, signUp } from "@/lib/auth";

export default function RegisterForm({
  initialIsSignUp = false,
}: {
  initialIsSignUp?: boolean;
}) {
  ReactDOM.preload("/sign-in-img.jpg", { as: "image" });
  ReactDOM.preload("/sign-up-img.jpg", { as: "image" });

  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [brandImageMode, setBrandImageMode] = useState(initialIsSignUp);
  const [isBrandImageClosing, setIsBrandImageClosing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        await signUp({ username, email, password });
        try {
          await signIn({ email, password });
        } catch {
          switchMode();
          setError("Your account was created, but automatic sign-in failed. Please sign in with your new credentials.");
          return;
        }
      } else {
        await signIn({ email, password });
      }
      notifyAuthStateChanged(true);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to authenticate. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode() {
    if (isBrandImageClosing) return;
    const nextMode = !isSignUp;
    setIsSignUp(nextMode);
    setError(null);
    setIsBrandImageClosing(true);
    const closeDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400;
    window.setTimeout(() => {
      setBrandImageMode(nextMode);
      window.requestAnimationFrame(() => setIsBrandImageClosing(false));
    }, closeDuration);
  }

  const formPanel = (
    <div
      key={`form-panel-${isSignUp}`}
      className={`flex min-h-[720px] flex-col items-center justify-center px-8 py-12 md:min-h-[720px] md:px-16 ${
        isSignUp
          ? "border-t border-[#CCBEB1] md:border-l md:border-t-0"
          : "border-t border-[#CCBEB1] md:border-r md:border-t-0"
      }`}
    >
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-(family-name:--font-josefin-sans) text-4xl font-light text-[#111111]">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <p className="mt-3 font-(family-name:--font-josefin-sans) text-neutral-600">
          {isSignUp ? "Create your Scent Journal account." : "Welcome back to Scent Journal."}
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="mt-9 space-y-5">
          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="username" className="block font-(family-name:--font-josefin-sans) text-sm text-[#111111]">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-[#CCBEB1] px-4 text-[#111111] outline-none focus:border-[#997E67] focus:ring-2 focus:ring-[#FFDBBB]"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block font-(family-name:--font-josefin-sans) text-sm text-[#111111]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-12 w-full rounded-xl border border-[#CCBEB1] px-4 text-[#111111] outline-none focus:border-[#997E67] focus:ring-2 focus:ring-[#FFDBBB]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block font-(family-name:--font-josefin-sans) text-sm text-[#111111]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-[#CCBEB1] px-4 pr-16 text-[#111111] outline-none focus:border-[#997E67] focus:ring-2 focus:ring-[#FFDBBB]"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute inset-y-0 right-3 cursor-pointer px-2 font-(family-name:--font-josefin-sans) text-sm text-[#664930] hover:text-[#997E67]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block font-(family-name:--font-josefin-sans) text-sm text-[#111111]">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="min-h-12 w-full rounded-xl border border-[#CCBEB1] px-4 text-[#111111] outline-none focus:border-[#997E67] focus:ring-2 focus:ring-[#FFDBBB]"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="min-h-12 w-full cursor-pointer rounded-xl bg-[#664930] px-5 font-(family-name:--font-josefin-sans) text-white transition hover:bg-[#997E67] disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Please wait…" : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="mx-auto mt-5 flex w-full max-w-md items-start justify-between gap-3 rounded-xl border border-[#CCBEB1] bg-[#FFDBBB]/30 px-3 py-2 text-[#664930]"
        >
          <div className="font-(family-name:--font-josefin-sans) text-sm">
            <p className="mb-1 font-semibold">{isSignUp ? "Sign Up Failed" : "Sign In Failed"}</p>
            <p>{error}</p>
          </div>
          <button
            type="button"
            aria-label="Dismiss error message"
            onClick={() => setError(null)}
            className="cursor-pointer px-1 text-lg leading-5 text-[#664930] hover:text-[#997E67]"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );

  const brandPanel = (
    <div
      key="brand-panel"
      className="relative flex min-h-[720px] flex-col justify-center overflow-hidden bg-[#CCBEB1] px-8 py-12 text-center text-white md:min-h-[720px] md:px-12"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-3 bg-cover bg-[center_55%] blur-xl"
        style={{
          backgroundImage: `linear-gradient(rgba(17,17,17,0.4), rgba(17,17,17,0.4)), url('/sign-${brandImageMode ? "up" : "in"}-img.jpg')`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-[center_55%] transition-[clip-path] duration-200 ease-in-out motion-reduce:duration-0"
        style={{
          clipPath: isBrandImageClosing
            ? "circle(0% at 50% 50%)"
            : "circle(75% at 50% 50%)",
          backgroundImage: `linear-gradient(rgba(17,17,17,0.4), rgba(17,17,17,0.4)), url('/sign-${brandImageMode ? "up" : "in"}-img.jpg')`,
        }}
      />
      <p className="relative z-10 font-(family-name:--font-fleur-de-leah) text-5xl text-white md:text-6xl">
        ScentJournal
      </p>
      <p className="relative z-10 mt-4 font-(family-name:--font-josefin-sans) text-xl font-light text-white md:text-2xl">
        Your One-Stop Fragrance Platform
      </p>
      <p className="relative z-10 mt-14 flex items-center justify-center gap-3 font-(family-name:--font-josefin-sans) text-base text-white">
        <span>{isSignUp ? "Already Have an Account?" : "New Here?"}</span>
        <button
          type="button"
          onClick={switchMode}
          disabled={isBrandImageClosing}
          className="relative z-10 cursor-pointer font-semibold text-white underline decoration-white/70 underline-offset-4 hover:text-white/80"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );

  return (
    <main className="flex flex-1 items-stretch bg-[#FFDBBB]/15 px-6 py-10 md:px-12 md:py-16">
      <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-[#CCBEB1] bg-white md:min-h-[720px] md:grid-cols-2">
        {isSignUp ? <>{brandPanel}{formPanel}</> : <>{formPanel}{brandPanel}</>}
      </section>
    </main>
  );
}
