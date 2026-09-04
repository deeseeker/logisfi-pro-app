import localFont from "next/font/local";

/** Self-hosted so `next build` does not need fonts.googleapis.com. */
export const inter = localFont({
  src: "../app/fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const ibmPlexMono = localFont({
  src: [
    {
      path: "../app/fonts/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/ibm-plex-mono-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
