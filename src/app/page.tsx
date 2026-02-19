import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
          Book the perfect room for your next meeting
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Browse conference rooms, compare amenities, and book instantly.
          Whether you need a quick huddle space or a full boardroom, RoomBook
          has you covered.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/search"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Browse Rooms
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            List Your Space
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-4 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Search",
                description:
                  "Filter rooms by location, capacity, amenities, and availability.",
              },
              {
                title: "Book",
                description:
                  "Reserve your room instantly with secure Stripe payments.",
              },
              {
                title: "Meet",
                description:
                  "Show up and have a great meeting. It's that simple.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
