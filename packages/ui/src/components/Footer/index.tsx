"use client";

import Link from "next/link";

export function WayFarerFooter() {
  return (
    <footer className="bg-gray-50 shadow shadow-t">
      <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <nav className="flex flex-col md:flex-row gap-2 md:gap-6">
        <Link
        href="/"
        className="px-3 py-1 rounded-md text-cyan-700 font-medium hover:bg-blue-200 hover:text-cyan-900 transition"
        >
        Home
        </Link>
        <Link
        href="/about"
        className="px-3 py-1 rounded-md text-cyan-700 font-medium hover:bg-blue-200 hover:text-cyan-900 transition"
        >
        About
        </Link>
        <Link
        href="/contact"
        className="px-3 py-1 rounded-md text-cyan-700 font-medium hover:bg-blue-200 hover:text-cyan-900 transition"
        >
        Contact
        </Link>
      </nav>
      <p className="text-gray-500 text-sm text-center md:text-right">
        © 2025 <span className="font-semibold text-cyan-700">WayFarer</span>. All rights reserved.
      </p>
      </div>
    </footer>
  );
}
