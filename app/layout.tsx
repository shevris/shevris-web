import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://shevris.com"),
  title: "Shevris Technologies — Software Company",
  description:
    "Shevris Technologies is an independent software company in Lahore, Pakistan — custom software, web & mobile apps, cloud engineering, and Tijarah, our own commerce marketplace.",
  authors: [{ name: "Shevris Technologies" }],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: "https://shevris.com",
    siteName: "Shevris Technologies",
    title: "Shevris Technologies — Software Company",
    description:
      "Independent software company in Lahore, Pakistan. Custom software, cloud engineering, and Tijarah — our own commerce marketplace.",
    images: [
      {
        url: "https://shevris.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shevris Technologies — Software, built deliberately. Cutline logo on an ink background.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shevris Technologies — Software Company",
    description:
      "Independent software company in Lahore, Pakistan. Makers of Tijarah.",
    images: ["https://shevris.com/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#11131d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} flex min-h-screen flex-col font-sans`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
