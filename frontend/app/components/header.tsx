import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[#CCBEB1] bg-white px-6 py-5">
      <div className="mx-24 flex items-center justify-start">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2.5 text-5xl font-(family-name:--font-fleur-de-leah) tracking-[-0.01em] text-[#111111] hover:text-[#997E67]"
        >
          ScentJournal
        </Link>
      </div>
    </header>
  );
}
