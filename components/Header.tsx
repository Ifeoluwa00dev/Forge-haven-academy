"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/team", label: "Team" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm dark:border-white/10 dark:bg-forge-black/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-icon.svg"
            alt=""
            aria-hidden="true"
            className="h-11 w-11 md:h-14 md:w-14"
          />
          <span className="leading-none">
            <span className="block text-xl font-bold text-forge-black dark:text-white md:text-2xl">
              Forge Haven
            </span>
            <span className="block text-[10px] font-medium tracking-widest text-forge-black/70 dark:text-white/70 md:text-xs">
              ACADEMY
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-forge-black/80 transition-colors hover:text-forge-orange dark:text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/events"
            className="hidden rounded-full bg-forge-orange px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-forge-orange-dark sm:inline-flex"
          >
            Register for an event
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-forge-black dark:text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-black/10 bg-white px-6 py-4 dark:border-white/10 dark:bg-forge-black md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-forge-black/80 hover:bg-black/5 hover:text-forge-orange dark:text-white/80 dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/events"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-forge-orange px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-forge-orange-dark"
            >
              Register for an event
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}