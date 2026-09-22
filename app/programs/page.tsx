"use client";

import { useState } from "react";
import {
  Compass,
  HeartHandshake,
  CheckCircle,
  Calendar,
  BellRing,
} from "lucide-react";
import { PROGRAMS, EVENTS } from "@/lib/mock-data";

export default function ProgramsPage() {
  const [selected, setSelected] = useState<"discovery-lab" | "graceful-parenting">(
    "discovery-lab"
  );
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const current = PROGRAMS.find((p) => p.id === selected)!;
  const discoveryEvent = EVENTS.find((e) => e.id === "discovery-lab-oct-2026");

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.includes("@")) return;
    setWaitlistSubmitted(true);
  };

  return (
    <div className="pb-20">
      <section className="border-b border-black/10 bg-forge-cream py-16 text-center dark:border-white/10 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-forge-orange">
            Our programs
          </span>
          <h1 className="mt-3 text-3xl font-medium md:text-5xl">
            Two pathways, one goal
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-forge-black/70 dark:text-white/70">
            Mentorship for preteens and teens, and support for the parents
            raising them.
          </p>

          <div className="mt-8 inline-flex gap-1 rounded-2xl border border-black/10 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-forge-surface">
            <button
              onClick={() => setSelected("discovery-lab")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                selected === "discovery-lab"
                  ? "bg-forge-black text-white dark:bg-forge-orange"
                  : "text-forge-black/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5"
              }`}
            >
              <Compass className="h-4 w-4" />
              Discovery Lab
            </button>
            <button
              onClick={() => setSelected("graceful-parenting")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                selected === "graceful-parenting"
                  ? "bg-forge-black text-white dark:bg-forge-orange"
                  : "text-forge-black/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5"
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              Graceful Parenting
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-forge-orange-dark dark:text-forge-orange">
                {current.audience}
              </span>
              <h2 className="mt-1 text-3xl font-medium">{current.name}</h2>
              <p className="mt-1 text-lg text-forge-black/60 dark:text-white/60">
                {current.tagline}
              </p>
            </div>

            <p className="text-base text-forge-black/70 dark:text-white/70">{current.description}</p>

            {current.focusAreas.length > 0 && (
              <div className="space-y-3 rounded-2xl border border-black/10 p-6 dark:border-white/10 dark:bg-forge-surface">
                <div className="text-sm font-bold uppercase tracking-wider text-forge-black/60 dark:text-white/60">
                  What to expect
                </div>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {current.focusAreas.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-forge-black/70 dark:text-white/70">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-forge-orange" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            {selected === "discovery-lab" && discoveryEvent ? (
              <div className="space-y-6 rounded-3xl border border-black/10 p-8 shadow-sm dark:border-white/10 dark:bg-forge-surface">
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-forge-orange-dark dark:text-forge-orange">
                    Upcoming session
                  </span>
                  <h3 className="mt-1 text-xl font-medium">{discoveryEvent.title}</h3>
                  <p className="mt-1 text-sm text-forge-black/60 dark:text-white/60">
                    {discoveryEvent.dates} ({discoveryEvent.time})
                  </p>
                </div>

                <div className="space-y-2 rounded-xl bg-forge-cream p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-forge-black/60 dark:text-white/60">Facilitator</span>
                    <strong className="dark:text-white">{discoveryEvent.facilitatorName} ({discoveryEvent.facilitatorRole})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forge-black/60 dark:text-white/60">Fee</span>
                    <strong className="dark:text-white">${discoveryEvent.price} / child</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forge-black/60 dark:text-white/60">Location</span>
                    <strong className="dark:text-white">{discoveryEvent.location}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forge-black/60 dark:text-white/60">Availability</span>
                    <strong className="dark:text-white">{discoveryEvent.slotsNote}</strong>
                  </div>
                </div>

                
                  <a href="/events"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-forge-orange px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-forge-orange-dark"
                >
                  <Calendar className="h-4 w-4" />
                  Register for Discovery Lab
                </a>
              </div>
            ) : (
              <div className="space-y-6 rounded-3xl border border-black/10 p-8 shadow-sm dark:border-white/10 dark:bg-forge-surface">
                <div>
                  <span className="rounded-full bg-forge-black/5 px-2.5 py-1 text-sm font-bold uppercase tracking-wider text-forge-black/60 dark:bg-white/10 dark:text-white/60">
                    Coming soon
                  </span>
                  <h3 className="mt-2 text-xl font-medium">
                    Join the Graceful Parenting waitlist
                  </h3>
                  <p className="mt-1 text-sm text-forge-black/60 dark:text-white/60">
                    Be the first to know when registration opens.
                  </p>
                </div>

                {waitlistSubmitted ? (
                  <div className="flex items-center gap-2 rounded-xl border border-forge-orange/20 bg-forge-orange/10 p-4 text-sm text-forge-orange-dark dark:text-forge-orange">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    You&apos;re on the list — we&apos;ll notify you when this opens.
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-xl border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-forge-orange dark:border-white/15 dark:bg-forge-surface"
                    />
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-forge-black px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-forge-black/85 dark:bg-forge-orange dark:hover:bg-forge-orange-dark"
                    >
                      <BellRing className="h-4 w-4" />
                      Notify me
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}