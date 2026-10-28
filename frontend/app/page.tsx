import ScentBrowser from "./components/scentBrowser";

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <section className="px-6 pb-10 pt-16 text-center md:pb-12 md:pt-24">
        <h1 className="font-(family-name:--font-josefin-sans) text-4xl font-light text-[#111111] md:text-6xl">
          Your One-Stop Fragrance Platform
        </h1>
      </section>
      <ScentBrowser/>

    </main>
  );
}
