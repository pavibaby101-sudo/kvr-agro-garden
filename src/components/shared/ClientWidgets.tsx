"use client";
import { ThemeProvider } from "next-themes";
import ChatWidget from "./ChatWidget";

export default function ClientWidgets({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {children}
      <ChatWidget />
    </ThemeProvider>
  );
}
