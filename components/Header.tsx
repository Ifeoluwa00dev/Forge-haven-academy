"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
            src="/brand/logo-primary@2x.png"
            alt="Forge Haven Academy"
            className="h-10 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-forge-black/80 transition-colors hover:text-forge-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/events"
            className="hidden rounded-full bg-forge-orange px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-forge-orange-dark sm:inline-flex"
          >
            Register for an event
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-forge-black md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <nav className="border-t border-black/10 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-forge-black/80 hover:bg-black/5 hover:text-forge-orange"
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