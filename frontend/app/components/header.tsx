"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";

export default function Header() {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  useEffect(() => {
    if (!accountMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [accountMenuOpen]);

  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="relative z-30 border-b border-[#CCBEB1] bg-white px-6 py-5">
        <div className="mx-24 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2.5 text-5xl font-(family-name:--font-fleur-de-leah) tracking-[-0.01em] text-[#111111] hover:text-[#997E67]"
          >
            ScentJournal
          </Link>
          <div>
            <button
              type="button"
              aria-label="Open account menu"
              aria-expanded={accountMenuOpen}
              onClick={() => setAccountMenuOpen((open) => !open)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#997E67] hover:bg-[#FFDBBB]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#997E67]"
            >
              <FiUser aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-label="Close account menu"
        aria-hidden={!accountMenuOpen}
        inert={!accountMenuOpen}
        tabIndex={accountMenuOpen ? 0 : -1}
        onClick={() => setAccountMenuOpen(false)}
        className={`fixed inset-0 z-10 backdrop-blur-sm transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          accountMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        aria-hidden={!accountMenuOpen}
        inert={!accountMenuOpen}
        className={`absolute left-0 right-0 top-full z-20 border-b border-[#CCBEB1] bg-white shadow-lg transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          accountMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="mx-24 flex flex-col items-end py-3">
          <button
            type="button"
            className="min-h-11 px-4 text-right text-base font-(family-name:--font-josefin-sans) text-[#111111] hover:text-[#997E67]"
          >
            Profile
          </button>
          <button
            type="button"
            className="min-h-11 px-4 text-right text-base font-(family-name:--font-josefin-sans) text-[#111111] hover:text-[#997E67]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
