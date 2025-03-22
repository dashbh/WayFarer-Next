"use client";

import { Link } from "@chakra-ui/react";
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

  return isInternal ? (
    <Link
      key={href}
      as={NextLink}
      href={href}
      px={4}
      py={1}
      rounded="md"
      variant="plain"
      fontWeight={isActive ? "bold" : "normal"}
      color={isActive ? "teal.500" : "gray.600"}
      _hover={{
        color: "teal.500",
        bg: "none",
        fontWeight: "bold",
        textDecoration: "none",
      }}
      _focus={{ outline: "none", boxShadow: "none" }}
      _focusVisible={{ outline: "none", boxShadow: "none" }}
      _active={{ outline: "none", boxShadow: "none" }}
    >
      {label}
    </Link>
  ) : (
    <Link
      key={href}
      href={href}
      px={4}
      py={1}
      rounded="md"
      variant="plain"
      fontWeight={isActive ? "bold" : "normal"}
      color={isActive ? "teal.500" : "gray.600"}
      _hover={{
        color: "teal.500",
        bg: "none",
        fontWeight: "bold",
        textDecoration: "none",
      }}
      _focus={{ outline: "none", boxShadow: "none" }}
      _focusVisible={{ outline: "none", boxShadow: "none" }}
      _active={{ outline: "none", boxShadow: "none" }}
    >
      {label}
    </Link>
  );
};
