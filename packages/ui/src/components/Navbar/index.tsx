"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  useDisclosure,
  Stack,
  Portal,
  Link,
} from "@chakra-ui/react";
import {
  AiOutlineMenu as HamburgerIcon,
  AiOutlineClose as CloseIcon,
} from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { UserType } from "@wayfarer/types";

import { NAV_LINKS } from "../../config/navigation";
import { NavLink } from "./NavLink";

interface NavbarProps {
  internalRoutes?: string[]; // Internal routes for soft navigation
  user?: UserType | null;
}

export const Navbar = ({ internalRoutes = [], user }: NavbarProps) => {
  const { open: isMainNavOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const pathname: string = usePathname();

  const renderMainNavLinks = () => {
    const mainNavLinks = NAV_LINKS.map(({ label, path }) => {
      const isInternal = internalRoutes.includes(path);
      return (
        <NavLink
          key={path}
          isInternal={isInternal}
          label={label}
          href={path}
          pathname={pathname}
        />
      );
    });

    return mainNavLinks;
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="gray.100"
      px={4}
      py={2}
      shadow="md"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isMainNavOpen ? onClose : onOpen}
        >
          {isMainNavOpen ? <CloseIcon /> : <HamburgerIcon />}
        </IconButton>
        <HStack gap={8} alignItems={"center"}>
          <Box
            fontSize="xl"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => router.push("/")}
          >
            WayFarer
          </Box>
          <HStack as={"nav"} gap={4} display={{ base: "none", md: "flex" }}>
            {renderMainNavLinks()}
          </HStack>
        </HStack>

        {user ? (
          <Flex alignItems={"center"}>
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button variant="ghost" size="sm">
                  <Avatar.Root>
                    <Avatar.Fallback name={user.name} />
                    <Avatar.Image src={user.avatar} />
                  </Avatar.Root>
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="new-txt" asChild>
                      <Link
                        _focus={{ outline: "none", boxShadow: "none" }}
                        _focusVisible={{ outline: "none", boxShadow: "none" }}
                        _active={{ outline: "none", boxShadow: "none" }}
                        href="/user/profile"
                      >
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item value="new-file" asChild>
                      <Link
                        _focus={{ outline: "none", boxShadow: "none" }}
                        _focusVisible={{ outline: "none", boxShadow: "none" }}
                        _active={{ outline: "none", boxShadow: "none" }}
                        href="/user/profile"
                      >
                        Settings
                      </Link>
                    </Menu.Item>
                    <Menu.Item value="new-win" asChild>
                      <Link
                        _focus={{ outline: "none", boxShadow: "none" }}
                        _focusVisible={{ outline: "none", boxShadow: "none" }}
                        _active={{ outline: "none", boxShadow: "none" }}
                        href="/user/logout"
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Flex>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            gap={6}
          >
            <Button asChild fontSize={"sm"} fontWeight={400} variant={"ghost"}>
              <Link href={"/user/login"}>Login</Link>
            </Button>
            <Button
              asChild
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              _hover={{
                bg: "pink.300",
              }}
            >
              <Link href={"/user/signup"}>Sign Up</Link>
            </Button>
          </Stack>
        )}
      </Flex>

      {isMainNavOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} gap={4}>
            {renderMainNavLinks()}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};
