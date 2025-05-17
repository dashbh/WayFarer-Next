"use client"; // Ensure it runs on the client side

import { Navbar, WayFarerFooter } from "@wayfarer/ui";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "@wayfarer/ui/globals.css";
import "./globals.css";

interface ClientLayoutProps {
  children: ReactNode;
  user: any;
}

export function ClientLayout({ children, user }: ClientLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="z-50">
        <Navbar user={user}/>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto px-8 sm:px-6 lg:px-8 mt-8">
        {children}
      </main>

      <Toaster richColors position="top-right"/>

      {/* Footer */}
      <footer className="mt-auto z-50 pt-8">
        <WayFarerFooter />
      </footer>
    </div>
  );
}
