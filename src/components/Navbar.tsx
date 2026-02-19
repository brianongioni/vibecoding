"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isOwner = session?.user?.role === "OWNER";

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-bold text-zinc-900 dark:text-zinc-50"
            >
              RoomBook
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/search"
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Search Rooms
              </Link>
              {status === "authenticated" && (
                <>
                  <Link
                    href="/dashboard/booker"
                    className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    My Bookings
                  </Link>
                  {isOwner && (
                    <Link
                      href="/dashboard/owner"
                      className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                    >
                      Owner Dashboard
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {status === "loading" && (
              <div className="h-8 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            )}
            {status === "unauthenticated" && (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Sign Up
                </Link>
              </>
            )}
            {status === "authenticated" && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-zinc-200 py-4 md:hidden dark:border-zinc-800">
            <div className="flex flex-col gap-3">
              <Link
                href="/search"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Search Rooms
              </Link>
              {status === "authenticated" && (
                <>
                  <Link
                    href="/dashboard/booker"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  {isOwner && (
                    <Link
                      href="/dashboard/owner"
                      className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Owner Dashboard
                    </Link>
                  )}
                </>
              )}
              {status === "unauthenticated" && (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {status === "authenticated" && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-left text-sm font-medium text-zinc-600 dark:text-zinc-400"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
