import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KVR Agro Gardens | Premium Plant Nursery in Nemmara, Palakkad",
    template: "%s | KVR Agro Gardens",
  },
  description: "KVR Agro Gardens - Your complete gardening destination in Nemmara, Palakkad, Kerala. Premium indoor plants, outdoor plants, flowering plants, medicinal plants, landscaping services, and hatchery.",
  keywords: ["plant nursery", "garden", "plants", "Kerala", "Palakkad", "Nemmara", "indoor plants", "landscaping", "hatchery"],
  authors: [{ name: "KVR Agro Gardens" }],
  creator: "KVR Agro Gardens",
  icons: { icon: "/images/logo.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "KVR Agro Gardens",
    title: "KVR Agro Gardens | Premium Plant Nursery",
    description: "Your complete gardening destination in Nemmara, Palakkad, Kerala.",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "KVR Agro Gardens | Premium Plant Nursery",
    description: "Your complete gardening destination in Nemmara, Palakkad, Kerala.",
    images: ["/images/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1B5E20" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
