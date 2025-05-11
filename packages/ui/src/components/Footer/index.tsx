"use client";

import Link from "next/link";

export function WayFarerFooter() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl mx-auto py-4 flex flex-col md:flex-row gap-4">
        <div className="flex gap-6">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link href="/about" className="text-blue-600 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact
          </Link>
        </div>
        <p className="text-gray-600">© 2025 WayFarer. All rights reserved</p>
      </div>
    </div>
  );
}
