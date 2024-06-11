"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
      <Footer />
    </SessionProvider>
  );
}
