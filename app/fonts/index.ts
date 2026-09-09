import localFont from "next/font/local";

// Official Forge Haven Academy typeface.
export const postNordSans = localFont({
  src: [
    { path: "./PostNordSansLight.ttf", weight: "300", style: "normal" },
    { path: "./PostNordSansLightItalic.ttf", weight: "300", style: "italic" },
    { path: "./PostNordSansRegular.ttf", weight: "400", style: "normal" },
    { path: "./PostNordSansRegularItalic.ttf", weight: "400", style: "italic" },
    { path: "./PostNordSansMedium.ttf", weight: "500", style: "normal" },
    { path: "./PostNordSansMediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./PostNordSansBold.ttf", weight: "700", style: "normal" },
    { path: "./PostNordSansBoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-postnord-sans",
  display: "swap",
});
