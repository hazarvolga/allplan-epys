import type { Metadata } from "next";
import { Instrument_Serif, Manrope, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { site } from "@/lib/site";
import "./globals.css";
const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "optional",
});
const body = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "optional",
  preload: false,
});
const mono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "optional",
  preload: false,
});
export const metadata: Metadata = {
  metadataBase: site.url
    ? new URL(site.url)
    : new URL(
        process.env.NEXT_PUBLIC_PREVIEW_ORIGIN || "http://127.0.0.1:3100",
      ),
  title: site.name,
  description: site.name,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light'}catch(e){}`,
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
        {site.analytics && (
          <Script
            defer
            data-domain={site.analytics}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
