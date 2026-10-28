import type { Scent } from "../types";
import ScentCard from "./scentCard";

export type SortKey = "name-asc" | "name-desc" | "house-asc" | "newest";

type Props = {
  results: Scent[];
  loading: boolean;
  error: string | null;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
};

export default function ScentGrid({
  results,
  loading,
  error,
  sort,
  onSortChange,
}: Props) {
  return (
    <section className="mx-6 mt-12 pb-20 md:mx-24">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-600">
          {loading
            ? "Loading…"
            : `${results.length} ${results.length === 1 ? "fragrance loaded" : "fragrances loaded"}`}
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-neutral-600">
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="rounded-lg border border-[#CCBEB1] bg-white px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#997E67]"
          >
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="house-asc">House (A–Z)</option>
            <option value="newest">Newest first</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-4/5 animate-pulse rounded-2xl bg-[#FFDBBB]/50"
            />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-2xl border border-dashed border-[#CCBEB1] py-16 text-center text-[#664930]">
          {error}
        </p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {results.map((s, i) => (
            <div
              key={s.scentId}
              className="h-full"
              style={{ animationDelay: `${Math.min(i, 20) * 25}ms` }}
            >
              <ScentCard scent={s} />
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-[#CCBEB1] py-16 text-center text-neutral-600">
          No fragrances found. Try a different name or house.
        </p>
      )}
    </section>
  );
}
