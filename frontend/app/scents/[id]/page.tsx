import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Scent } from "../../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function getScent(id: string): Promise<Scent | null> {
  const res = await fetch(`${API_URL}/scents/id=${encodeURIComponent(id)}`, {
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load scent (${res.status})`);
  return res.json();
}

type Props = { params: Promise<{ id: string }> };

export default function ScentPage({ params }: Props) {
  return (
    <main className="flex-1 bg-white font-(family-name:--font-josefin-sans)">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-base text-[#664930] hover:text-[#997E67]"
        >
          ← All fragrances
        </Link>

        <Suspense fallback={<ScentSkeleton />}>
          <ScentDetails params={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function ScentDetails({ params }: Props) {
  const { id } = await params;
  const scent = await getScent(id);
  if (!scent) notFound();

  const accords = Object.entries(scent.accords ?? {}).sort(([, a], [, b]) => b - a);
  const meta = [scent.gender, scent.year > 0 ? scent.year : null, scent.collection]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mt-8 grid items-center gap-10 md:grid-cols-[minmax(0,440px)_1fr] md:gap-16">
      {/* Photo */}
      <div className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-3xl border border-[#CCBEB1] bg-white">
        {scent.photoUrl ? (
          <Image
            src={scent.photoUrl}
            alt={`${scent.name} by ${scent.house}`}
            fill
            priority
            sizes="(min-width: 768px) 440px, 100vw"
            className="object-contain p-8"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#FFDBBB]">
            <svg
              width="96"
              height="128"
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

      {/* Details */}
      <div className="flex flex-col gap-3">
        <p className="text-base font-light uppercase tracking-[0.2em] text-[#664930]">
          {scent.house}
        </p>
        <h1 className="text-5xl font-bold text-[#111111] md:text-6xl">{scent.name}</h1>
        {meta && <p className="text-xl font-light capitalize text-neutral-600">{meta}</p>}

        {accords.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-5 text-2xl font-bold text-[#111111]">Main accords</h2>
            <ul className="flex flex-col gap-4">
              {accords.map(([name, value], i) => (
                <li key={name} className="flex items-center gap-4">
                  <span className="w-40 shrink-0 text-base font-light capitalize text-neutral-600">
                    {name}
                  </span>
                  <div className="h-3 flex-1 rounded-full bg-[#FFDBBB]/60">
                    <div
                      className="h-3 animate-accord-fill rounded-full bg-[#664930] motion-reduce:animate-none"
                      style={{
                        width: `${Math.min(value, 100)}%`,
                        animationDelay: `${i * 90}ms`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function ScentSkeleton() {
  return (
    <div className="mt-8 grid animate-pulse items-center gap-10 md:grid-cols-[minmax(0,440px)_1fr] md:gap-16">
      <div className="mx-auto aspect-3/4 w-full max-w-md rounded-3xl bg-[#FFDBBB]/50" />
      <div className="flex flex-col gap-4">
        <div className="h-5 w-40 rounded bg-[#FFDBBB]/50" />
        <div className="h-14 w-3/4 rounded bg-[#FFDBBB]/50" />
        <div className="h-5 w-56 rounded bg-[#FFDBBB]/50" />
      </div>
    </div>
  );
}
