"use client";
// This Page Centralises Data between Search Bar and Grid

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Scent } from "../types";
import SearchBar from "./searchBar";
import ScentGrid, { type SortKey } from "./scentGrid";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
const BATCH_SIZE = 100;

export default function ScentBrowser() {
  const [scents, setScents] = useState<Scent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name-asc");

  const offsetRef = useRef(0); // persists across renders, no re-render on change
  const fetchingRef = useRef(false); // blocks overlapping fetches
  const sentinelRef = useRef<HTMLDivElement>(null);

  // For Searches (Use if searching but retain original)
  const [search, setSearch] = useState<{
    query: string;
    results: Scent[];
    error: string | null;
  }>({ query: "", results: [], error: null });

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery !== "";
  const searchLoading = isSearching && search.query !== trimmedQuery; // derived, no state (loaded on every render)

  // Load the next batch of scents
  // useCallback to point to the same function in memory so useEffect won't rerun on rerender
  const loadMore = useCallback(async () => {
    if (fetchingRef.current) return; // Cancels New Fetch if There is an Ongoing Fetch
    fetchingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/scents/offset=${offsetRef.current}`);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data: Scent[] = (await res.json()) ?? [];

      offsetRef.current += data.length;
      setScents((prev) => [...prev, ...data]);
      if (data.length < BATCH_SIZE) setHasMore(false); // short batch = last page
    } catch {
      setError("Couldn't load fragrances. Please try again.");
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Initial load only
  useEffect(() => {
    loadMore();
  },[loadMore]);

  // Later batches: fetch when the sentinel (Div at bottom) nears the viewport
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || error || isSearching || scents.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, error, isSearching, loadMore, scents.length]);

  const results = useMemo(() => {
    const base = isSearching ? search.results : scents;
    return [...base].sort((a, b) => {
      switch (sort) {
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "house-asc":
          return a.house.localeCompare(b.house) || a.name.localeCompare(b.name);
        case "newest":
          return b.year - a.year;
        default:
          return a.name.localeCompare(b.name);
      }
    });
}, [isSearching, search.results, scents, sort]);


  // For Searches
  useEffect(() => {
    if (!trimmedQuery) return;

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_URL}/scents/name=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data: Scent[] = (await res.json()) ?? [];
        setSearch({ query: trimmedQuery, results: data, error: null });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setSearch({
          query: trimmedQuery,
          results: [],
          error: "Couldn't search fragrances. Please try again.",
        });
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmedQuery]);

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />
      <ScentGrid
        results={results}
        loading={isSearching ? searchLoading : loading && scents.length === 0}
        error={isSearching ? search.error : error}
        sort={sort}
        onSortChange={setSort}
      />

      <div ref={sentinelRef} className="h-10" />
      {!isSearching && loading && scents.length > 0 && (
        <p className="pb-10 text-center text-sm text-neutral-600">Loading more…</p>
      )}
    </>
  );
}
