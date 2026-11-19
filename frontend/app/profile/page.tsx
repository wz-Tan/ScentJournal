"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AUTH_STATE_CHANGED_EVENT, AuthError, getCurrentUser } from "@/lib/auth";

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsSignUp, setNeedsSignUp] = useState(false);

  useEffect(() => {
    let active = true;
    let requestId = 0;

    function loadProfile() {
      const currentRequestId = ++requestId;

      getCurrentUser()
        .then((currentUser) => {
          if (active && currentRequestId === requestId) {
            setEmail(currentUser);
            setNeedsSignUp(false);
          }
        })
        .catch((requestError: unknown) => {
          if (active && currentRequestId === requestId) {
            setEmail(null);
            if (requestError instanceof AuthError && requestError.status === 401) {
              setNeedsSignUp(true);
              setError(null);
            } else {
              setNeedsSignUp(false);
              setError(
                requestError instanceof Error
                  ? requestError.message
                  : "Unable to load your profile.",
              );
            }
          }
        })
        .finally(() => {
          if (active && currentRequestId === requestId) setLoading(false);
        });
    }

    function handleAuthStateChanged(event: Event) {
      const signedIn = (event as CustomEvent<boolean>).detail;
      if (signedIn) {
        setLoading(true);
        setError(null);
        loadProfile();
      } else {
        requestId += 1;
        setEmail(null);
        setNeedsSignUp(true);
        setError(null);
        setLoading(false);
      }
    }

    window.addEventListener(AUTH_STATE_CHANGED_EVENT, handleAuthStateChanged);
    loadProfile();

    return () => {
      active = false;
      window.removeEventListener(AUTH_STATE_CHANGED_EVENT, handleAuthStateChanged);
    };
  }, []);

  return (
    <main className="flex flex-1 items-start justify-center bg-white px-6 py-16 md:px-12 md:py-24">
      <section className="w-full max-w-2xl rounded-3xl border border-[#CCBEB1] bg-white p-8 md:p-12">
        <h1 className="font-(family-name:--font-josefin-sans) text-4xl font-light text-[#111111]">
          Profile
        </h1>

        {loading ? (
          <p className="mt-8 font-(family-name:--font-josefin-sans) text-neutral-600">
            Loading profile…
          </p>
        ) : error ? (
          <div className="mt-8 rounded-xl border border-[#CCBEB1] bg-[#FFDBBB]/30 p-4 text-[#664930]">
            <p role="alert" className="font-(family-name:--font-josefin-sans) text-sm">
              {error}
            </p>
            <Link
              href="/sign-up"
              className="mt-3 inline-block font-(family-name:--font-josefin-sans) text-sm font-semibold underline underline-offset-4 hover:text-[#997E67]"
            >
              Sign In
            </Link>
          </div>
        ) : needsSignUp ? (
          <div className="mt-8 rounded-xl border border-[#CCBEB1] bg-[#FFDBBB]/30 p-5 text-[#664930]">
            <p className="font-(family-name:--font-josefin-sans) text-base">
              You’re not signed in yet. Create an account to start your fragrance journal.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-[#664930] px-5 font-(family-name:--font-josefin-sans) text-white hover:bg-[#997E67]"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="mt-8 border-t border-[#CCBEB1] pt-6">
            <p className="font-(family-name:--font-josefin-sans) text-sm text-neutral-600">
              Email
            </p>
            <p className="mt-2 break-all font-(family-name:--font-josefin-sans) text-lg text-[#111111]">
              {email}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
