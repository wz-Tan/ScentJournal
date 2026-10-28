import Image from "next/image";
import Link from "next/link";
import type { Scent } from "../types";

export default function ScentCard({ scent }: { scent: Scent }) {
  return (
    <Link
      href={`/scents/${scent.scentId}`}
      className="h-full block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#664930]"
    >
      <article className="h-full overflow-hidden rounded-2xl border border-[#CCBEB1] bg-white font-(family-name:--font-josefin-sans) transition hover:border-[#997E67] hover:shadow-md">
        <div className="relative aspect-3/4 bg-white">
          {scent.photoUrl ? (
            <Image
              src={scent.photoUrl}
              alt={`${scent.name} by ${scent.house}`}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-4"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#FFDBBB]">
              <svg
                width="56"
                height="72"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#664930"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="6" y="10" width="12" height="11" rx="2.5" />
                <path d="M10 10V7h4v3" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 p-5">
          <p className="text-xs font-light uppercase tracking-[0.15em] text-[#664930]">
            {scent.house}
          </p>
          <h3 className="text-xl font-bold text-[#111111]">{scent.name}</h3>
          <p className="text-sm font-light capitalize text-neutral-600">
            {scent.gender}
          </p>
        </div>
      </article>
    </Link>
  );
}
