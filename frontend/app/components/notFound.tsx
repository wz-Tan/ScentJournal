import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-white px-6 py-20 text-center">
      <section className="w-full max-w-xl">
        <h1 className="mt-5 font-(family-name:--font-josefin-sans) text-4xl font-light text-[#111111] md:text-5xl">
          Uh oh! <br/>This page doesn’t exist.
        </h1>
        <p className="mt-4 font-(family-name:--font-josefin-sans) text-base text-neutral-600">
          The page you’re looking for may have been moved or no longer exists.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#664930] px-6 font-(family-name:--font-josefin-sans) text-white transition hover:bg-[#997E67]"
        >
          Return to Homepage
        </Link>
      </section>
    </main>
  );
}
