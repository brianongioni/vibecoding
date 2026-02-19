"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PLACEHOLDER_ROOMS = [
  {
    id: "1",
    name: "Sunrise Boardroom",
    bookings: 8,
    revenue: "$2,400",
    status: "Active",
  },
  {
    id: "2",
    name: "The Huddle",
    bookings: 15,
    revenue: "$1,875",
    status: "Active",
  },
];

const STATS = [
  { label: "Total Rooms", value: "2" },
  { label: "Total Bookings", value: "23" },
  { label: "Revenue (MTD)", value: "$4,275" },
  { label: "Avg. Occupancy", value: "67%" },
];

export default function OwnerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Owner Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Manage your listed spaces
          </p>
        </div>
        <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
          + Add Room
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Rooms */}
      <h2 className="mt-10 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Your Rooms
      </h2>
      <div className="mt-4 space-y-4">
        {PLACEHOLDER_ROOMS.map((room) => (
          <div
            key={room.id}
            className="flex items-center justify-between rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {room.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {room.bookings} bookings · {room.revenue} revenue
                </p>
              </div>
            </div>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {room.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
