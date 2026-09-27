"use client";

import { usePathname } from "next/navigation";

export function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Halaman-halaman yang butuh lebar penuh (bypass 1200px)
  const isWide = pathname === "/toolbox/markdown-preview";
  
  return (
    <main className={`flex-1 w-full mx-auto px-4 md:px-8 py-6 md:py-8 ${isWide ? "max-w-none" : "max-w-[1200px]"}`}>
      {children}
    </main>
  );
}
