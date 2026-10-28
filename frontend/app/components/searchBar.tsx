type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mx-6 md:mx-24">
      <div className="mx-auto flex max-w-xl items-center gap-3 rounded-full border border-[#CCBEB1] bg-white px-5 focus-within:border-[#997E67] focus-within:ring-2 focus-within:ring-[#FFDBBB]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#997E67"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <label htmlFor="perfume-search" className="sr-only">
          Search by perfume name or house
        </label>
        <input
          id="perfume-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by perfume name or house"
          className="min-h-13 w-full bg-transparent text-base text-[#111111] outline-none placeholder:text-neutral-500"
        />
      </div>
    </div>
  );
}
