import {
  AiOutlineMenu as HamburgerIcon,
  AiOutlineClose as CloseIcon,
  AiFillBell,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSearch,
} from "react-icons/ai";
import { usePathname } from "next/navigation";
import { UserType } from "@wayfarer/types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { NAV_LINKS } from "../../config/navigation";
import { NavLink } from "./NavLink";
import { SearchBar } from "../Search";

interface NavbarProps {
  internalRoutes?: string[]; // Internal routes for soft navigation
  user?: UserType | null;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = ({ internalRoutes = [], user }: NavbarProps) => {
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
    <Disclosure as="nav" className="bg-white">
      <div className="w-full px-2 sm:px-6 lg:px-8 shadow">
        <div className="relative flex h-24 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <HamburgerIcon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <CloseIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          {/* Main Menu Items */}
          <div className="flex items-center justify-start ml-10">
            <div className="flex shrink-0 items-center text-3xl pr-8">
              Wayfarer
            </div>
            <div className="hidden sm:block">
              <div className="flex space-x-1">{renderMainNavLinks()}</div>
            </div>
          </div>

          {/* Search Bar - show only on lg+ */}
          <div className="flex flex-1 items-center justify-center lg:px-16">
            <SearchBar />
          </div>

          {/* Profile Menu Items */}
          <div className="flex items-center space-x-4">
            {/* Desktop (lg+) */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <>
                  <a
                    href="/checkout/cart"
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    aria-label="Cart"
                  >
                    <AiOutlineShoppingCart className="size-6" />
                  </a>
                  <button
                    type="button"
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    aria-label="Notifications"
                  >
                    <AiFillBell aria-hidden="true" className="size-6" />
                  </button>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.avatar}
                          alt={user.name}
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      aria-role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <MenuItem>
                        <a
                          href="/user/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Profile
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="/checkout/order"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          My Orders
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="/user/logout"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Logout
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </>
              ) : (
                <>
                  <a
                    href="/checkout/cart"
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    aria-label="Cart"
                  >
                    <AiOutlineShoppingCart className="size-6" />
                  </a>
                  <a
                    href="/user/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-gray-700 rounded-md"
                  >
                    Login
                  </a>
                  <a
                    href="/user/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-500 hover:bg-pink-400 rounded-md"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
            {/* Mobile/Tablet (xs, md) */}
            <div className="flex lg:hidden items-center space-x-2">
              <a
                href="/checkout/cart"
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Cart"
              >
                <AiOutlineShoppingCart className="size-6" />
              </a>
              {user ? (
                <Menu as="div" className="relative">
                  <div>
                    <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden"
                    aria-role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <MenuItem>
                      <a
                        href="/user/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/user/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/user/logout"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Logout
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <a
                  href="/user/login"
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  aria-label="Login"
                >
                  <AiOutlineUser className="size-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {NAV_LINKS.map((item) => (
            <DisclosureButton
              key={item.label}
              as="a"
              href={item.path}
              aria-current={item.path === pathname ? "page" : undefined}
              className={classNames(
                item.path === pathname
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.label}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
