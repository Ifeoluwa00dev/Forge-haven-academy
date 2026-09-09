import Link from "next/link";
import {
  Compass,
  HeartHandshake,
  Calendar,
  MapPin,
  Award,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { PROGRAMS, EVENTS } from "@/lib/mock-data";

export default function Home() {
  const discoveryLab = PROGRAMS.find((p) => p.id === "discovery-lab")!;
  const gracefulParenting = PROGRAMS.find((p) => p.id === "graceful-parenting")!;
  const featuredEvent = EVENTS.find((e) => e.isActive);

  return (
    <div className="pb-20">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "url('/brand/pattern.svg')",
            backgroundSize: "420px",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium shadow-sm">
              <span className="h-2 w-2 rounded-full bg-forge-orange" />
              Maximizing life through optimal performance
            </div>

            <h1 className="mt-6 text-4xl font-medium leading-tight md:text-5xl">
              Shaping potential into capability.
            </h1>

            <p className="mt-5 text-lg text-forge-black/70">
              Forge Haven Academy runs mentorship and parenting programs for
              children, teens, and their parents — practical, hands-on, and
              built around real growth, not theory.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/programs"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forge-black px-6 py-3.5 font-medium text-white transition-colors hover:bg-forge-black/85 sm:w-auto"
              >
                Explore programs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-6 py-3.5 font-medium transition-colors hover:border-forge-orange hover:text-forge-orange sm:w-auto"
              >
                <Calendar className="h-4 w-4 text-forge-orange" />
                Upcoming events
              </Link>
            </div>

            <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "Ages 0–17 mentorship" },
                { icon: Target, label: "Self-leadership focus" },
                { icon: Users, label: "Parent & child programs" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-white/80 p-3 text-left text-xs font-medium"
                >
                  <Icon className="h-4 w-4 shrink-0 text-forge-orange" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-forge-orange">
            Our two pathways
          </span>
          <h2 className="mt-2 text-3xl font-medium md:text-4xl">
            One for the child. One for the parent.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Discovery Lab */}
          <div className="flex flex-col justify-between rounded-3xl border border-black/10 p-8 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forge-orange/10 text-forge-orange">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-forge-orange/10 px-3 py-1 text-xs font-semibold text-forge-orange-dark">
                  {discoveryLab.audience}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-medium">{discoveryLab.name}</h3>
                <p className="mt-1 text-sm font-medium text-forge-orange-dark">
                  {discoveryLab.tagline}
                </p>
              </div>

              <p className="text-sm text-forge-black/70">
                {discoveryLab.description}
              </p>

              <ul className="space-y-2 pt-2">
                {discoveryLab.focusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-forge-black/70">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forge-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-6">
              <span className="text-xs font-medium text-forge-black/60">
                Next cohort: <strong className="text-forge-black">{discoveryLab.nextDate}</strong>
              </span>
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forge-orange-dark hover:text-forge-orange"
              >
                Details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Graceful Parenting */}
          <div className="flex flex-col justify-between rounded-3xl border border-black/10 p-8 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forge-black/5 text-forge-black">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full bg-forge-black/5 px-3 py-1 text-xs font-semibold text-forge-black/70">
                    {gracefulParenting.audience}
                  </span>
                  <span className="rounded-full bg-forge-black/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forge-black/60">
                    Coming soon
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-medium">{gracefulParenting.name}</h3>
              </div>

              <p className="text-sm text-forge-black/70">
                {gracefulParenting.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-6">
              <span className="text-xs font-medium text-forge-black/60">
                Details to be announced
              </span>
              <Link
                href="/programs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-forge-black/60 hover:text-forge-orange"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED EVENT */}
      {featuredEvent && (
        <section className="border-y border-black/10 bg-forge-cream py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-forge-orange">
                  Registrations open
                </span>
                <h2 className="mt-1 text-3xl font-medium">Upcoming event</h2>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-1 text-sm font-semibold hover:text-forge-orange"
              >
                View all events <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm md:flex-row">
              <div className="space-y-3">
                <span className="inline-block rounded-full border border-forge-orange/30 bg-forge-orange/10 px-2.5 py-1 text-xs font-bold text-forge-orange-dark">
                  {featuredEvent.audience}
                </span>
                <h3 className="text-xl font-medium">{featuredEvent.title}</h3>
                <p className="max-w-xl text-sm text-forge-black/70">
                  {featuredEvent.description}
                </p>

                <div className="space-y-1.5 border-t border-black/10 pt-3 text-xs text-forge-black/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-forge-orange" />
                    <strong className="text-forge-black">{featuredEvent.dates}</strong>
                    <span>({featuredEvent.time})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-forge-orange" />
                    {featuredEvent.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-3.5 w-3.5 text-forge-orange" />
                    Facilitator: <strong className="text-forge-black">{featuredEvent.facilitatorName}</strong> ({featuredEvent.facilitatorRole})
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-start justify-between gap-4 md:items-end md:text-right">
                <div>
                  <span className="block text-[11px] font-semibold uppercase text-forge-black/50">
                    Registration fee
                  </span>
                  <span className="text-2xl font-medium">
                    ${featuredEvent.price} / child
                  </span>
                  <span className="mt-1 block text-xs text-forge-black/50">
                    {featuredEvent.slotsNote}
                  </span>
                </div>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center rounded-xl bg-forge-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forge-orange-dark"
                >
                  Register now
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA STRIP */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-forge-black p-10 text-center text-white md:p-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-forge-orange">
            Registrations are open
          </span>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl font-medium md:text-4xl">
            Reserve a spot in the Discovery Lab
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
            Slots are limited for the Oct 9–10 session — register early to
            secure your child&apos;s place.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex w-full items-center justify-center rounded-xl bg-forge-orange px-7 py-3.5 font-medium text-white transition-colors hover:bg-forge-orange-dark sm:w-auto"
            >
              Register now
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-medium text-white transition-colors hover:bg-white/20 sm:w-auto"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
