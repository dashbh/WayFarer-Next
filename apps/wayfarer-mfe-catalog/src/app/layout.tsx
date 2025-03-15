import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClientLayout } from "./ClientLayout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "WayFarer",
  description: "WayFarer ",
};

interface RootLayoutProps {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div>
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
