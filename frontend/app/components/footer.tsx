export default function Footer() {
  return (
    <footer className="border-t border-[#CCBEB1] bg-[#FFDBBB]/40 py-8 font-(family-name:--font-josefin-sans)">
      <div className="mx-6 flex flex-wrap items-center justify-between gap-3 md:mx-24">
        <div className="flex flex-wrap items-baseline gap-x-6">
          <span className="font-(family-name:--font-fleur-de-leah) text-3xl text-[#664930]">
            ScentJournal
          </span>
          <p className="text-sm font-light text-[#664930]">
            Your daily perfume research app. © 2026
          </p>
        </div>

        {/* Right side: empty for now */}
      </div>
    </footer>
  );
}
