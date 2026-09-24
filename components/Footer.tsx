import Link from "next/link";

import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forge-black pt-14 pb-10 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-icon.svg"
                alt=""
                aria-hidden="true"
                className="h-9 w-9"
              />
              <span className="font-medium">Forge Haven Academy</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Maximizing life through optimal performance — parenting and
              mentorship programs for children, teens, and parents.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-forge-orange">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/programs" className="hover:text-white">
                  Discovery Lab
                </Link>
              </li>
              <li>
                <Link href="/programs" className="flex items-center gap-1.5 hover:text-white">
                  Graceful Parenting
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-forge-orange">
                    Coming soon
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white">
                  Upcoming events
                </Link>
              </li>
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-forge-orange">
              Academy
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-forge-orange">
              Connect with us
            </h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forge-orange" />
                <span>5900 Balcones Drive, Austin, TX 78731, USA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-forge-orange" />
                <a href="mailto:forgehavenacademy@gmail.com" className="hover:text-white">
                  forgehavenacademy@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-forge-orange" />
                <a href="tel:+13465011249" className="hover:text-white">
                  +1 (346) 501-1249
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="h-4 w-4 shrink-0 text-forge-orange" />
                <a
                  href="https://instagram.com/forgehavenacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  @forgehavenacademy
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Facebook className="h-4 w-4 shrink-0 text-forge-orange" />
                <a
                  href="https://facebook.com/forgehavenacademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Forge Haven Academy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Forge Haven Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
