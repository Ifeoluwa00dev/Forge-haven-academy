import type { Metadata } from "next";
import { postNordSans } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge Haven Academy",
  description:
    "Maximizing life through optimal performance — parenting and mentorship programs for children, teens, and parents.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${postNordSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-forge-white text-forge-black">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
