"use client";

import NextLink from "next/link";
import { useEffect, useState } from "react";

interface NavLinkProps {
  isInternal: boolean;
  label: string;
  href: string;
  pathname: string;
}

export const NavLink = (props: NavLinkProps) => {
  const { isInternal, label, href, pathname } = props;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(
      pathname === href || (pathname?.startsWith(href) && href !== "/")
    );
  }, [pathname, href]);

  const baseClasses =
    "px-4 py-1 rounded-md text-gray-600 hover:text-green-500 transition";
  const activeClasses = isActive
    ? "font-bold text-green-500"
    : "font-normal text-gray-600";

  return isInternal ? (
    <NextLink href={href}>
      <a
        className={`${baseClasses} ${activeClasses}`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </a>
    </NextLink>
  ) : (
    <a
      href={href}
      className={`${baseClasses} ${activeClasses}`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </a>
  );
};