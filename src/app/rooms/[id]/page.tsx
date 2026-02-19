import Link from "next/link";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/search"
        className="inline-flex items-center text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        &larr; Back to search
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-64 rounded-xl bg-zinc-100 dark:bg-zinc-800" />

          <h1 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Conference Room {id}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Downtown, Floor 12
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Description
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              A spacious and modern conference room perfect for team meetings,
              presentations, and workshops. Equipped with the latest
              audio/visual technology and comfortable seating for up to 12
              people.
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Amenities
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Projector", "Whiteboard", "Video Conferencing", "Wi-Fi", "Coffee"].map(
                (a) => (
                  <span
                    key={a}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {a}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="text-center">
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              $75
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">/hour</span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Date
              </label>
              <input
                type="date"
                className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Start
                </label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  End
                </label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                />
              </div>
            </div>
            <button className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Book Now
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-zinc-500">
            You won&apos;t be charged yet
          </p>
        </div>
      </div>
    </div>
  );
}
