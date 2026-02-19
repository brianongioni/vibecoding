"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PLACEHOLDER_BOOKINGS = [
  {
    id: "1",
    room: "Sunrise Boardroom",
    date: "2026-02-25",
    time: "10:00 AM – 12:00 PM",
    status: "CONFIRMED",
    total: "$150",
  },
  {
    id: "2",
    room: "The Huddle",
    date: "2026-02-27",
    time: "2:00 PM – 3:00 PM",
    status: "PENDING",
    total: "$25",
  },
];

const statusColors: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  COMPLETED: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
};

export default function BookerDashboard() {
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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        My Bookings
      </h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Manage your room reservations
      </p>

      <div className="mt-8 space-y-4">
        {PLACEHOLDER_BOOKINGS.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
          >
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                {booking.room}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {booking.date} · {booking.time}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                {booking.total}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[booking.status]}`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
