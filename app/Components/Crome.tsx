"use client";

import { usePathname } from "next/navigation";
import TopNav from "../TopNavigation/topnav";
import Footer from "@/components/Footer";
import React from "react";

export default function Chrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
   const hideChrome =
    pathname.startsWith("/qr-generator") ||
    pathname.startsWith("/tag");

  return (
    <>
      {!hideChrome && (
        <div className="absolute top-0 left-0 w-full z-50">
          <TopNav />
        </div>
      )}

      <main className="min-h-screen">{children}</main>

      {!hideChrome && <Footer />}
    </>
  );
}
