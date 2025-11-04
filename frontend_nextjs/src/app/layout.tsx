import type { Metadata } from "next";
import "./globals.css";
import ClientShell from "./client-shell";

export const metadata: Metadata = {
  title: "Ocean Notes",
  description: "A modern notes app with tags and search.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell" suppressHydrationWarning>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
