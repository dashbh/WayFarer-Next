"use client";
import Link from "next/link";

export default function LogoutButton() {
  return (
    <Link href="/user/logout" className="px-4 py-2 bg-red-500 text-white rounded">
      Logout
    </Link>
  );
}
