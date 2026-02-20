import Link from "next/link";

const PLACEHOLDER_ROOMS = [
  {
    id: "1",
    name: "Sunrise Boardroom",
    location: "Downtown, Floor 12",
    capacity: 12,
    pricePerHour: 75,
    amenities: ["Projector", "Whiteboard", "Video Conferencing"],
  },
  {
    id: "2",
    name: "The Huddle",
    location: "Midtown, Floor 3",
    capacity: 4,
    pricePerHour: 25,
    amenities: ["TV Screen", "Whiteboard"],
  },
  {
    id: "3",
    name: "Innovation Lab",
    location: "Tech District, Floor 5",
    capacity: 20,
    pricePerHour: 120,
    amenities: ["Projector", "Video Conferencing", "Sound System", "Catering"],
  },
];

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Search Conference Rooms
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Find the perfect space for your next meeting
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Location..."
            className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
          <select className="rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50">
            <option value="">Any capacity</option>
            <option value="4">Up to 4</option>
            <option value="8">Up to 8</option>
            <option value="12">Up to 12</option>
            <option value="20">Up to 20</option>
          </select>
          <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Search
          </button>
        </div>

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_ROOMS.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="group rounded-xl border border-zinc-200 p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
            >
              <div className="mb-3 h-36 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <h3 className="font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
                {room.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {room.location}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  Up to {room.capacity} people
                </span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  ${room.pricePerHour}/hr
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {room.amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
