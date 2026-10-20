import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://shevris.com"),
  title: "Shevris Technologies — Software Company",
  description:
    "Shevris Technologies is an independent software company in Lahore, Pakistan — building subscription products for commerce, starting with Tijarah, our own marketplace.",
  authors: [{ name: "Shevris Technologies" }],
  alternates: {
    canonical: "/",
    languages: {
      "en-PK": "https://shevris.com/",
      ur: "https://shevris.com/ur",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
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
      "Independent software company in Lahore, Pakistan, building subscription products for commerce. First product: Tijarah.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Shevris Technologies",
              url: "https://shevris.com",
              logo: "https://shevris.com/logo.png",
              description:
                "Independent software company in Lahore, Pakistan — building subscription products for commerce, starting with Tijarah.",
              email: "hello@shevris.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "433 Gulshan-e-Iqbal Rd, Ravi Block Town",
                addressLocality: "Lahore",
                postalCode: "54000",
                addressCountry: "PK",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-324-4397194",
                email: "hello@shevris.com",
                contactType: "customer service",
              },
              hasMap:
                "https://www.google.com/maps/search/?api=1&query=Shevris+Technologies+433+Gulshan-e-Iqbal+Rd+Lahore",
              sameAs: [
                "https://github.com/shevris",
                "https://instagram.com/tijarah.pk_official",
                "https://www.facebook.com/tijarah.pk.official",
                "https://x.com/tijarahpk",
                "https://www.linkedin.com/company/tijarahpk",
              ],
            }),
          }}
        />
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
