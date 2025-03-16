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
} from "@chakra-ui/react";
import {
  AiOutlineMenu as HamburgerIcon,
  AiOutlineClose as CloseIcon,
} from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";

import { NAV_LINKS } from "../../config/navigation";
import { NavLink } from "./NavLink";

interface NavbarProps {
  internalRoutes?: string[]; // Internal routes for soft navigation
}

export const Navbar = ({ internalRoutes = [] }: NavbarProps) => {
  const { open: isMainNavOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

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
        <Flex alignItems={"center"}>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button variant="ghost" size="sm">
                <Avatar.Root>
                  <Avatar.Fallback name="John Doe" />
                  <Avatar.Image src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9" />
                </Avatar.Root>
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="new-txt">Profile</Menu.Item>
                  <Menu.Item value="new-file">Settings</Menu.Item>
                  <Menu.Item value="new-win">Logout</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
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
