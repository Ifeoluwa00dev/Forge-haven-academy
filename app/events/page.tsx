import Link from "next/link";
import { Calendar, MapPin, Award, ArrowRight } from "lucide-react";
import { supabase, DbEvent } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

    if (error) console.error("Supabase events error:", error);

  return (
    <div className="pb-20">
      <section className="border-b border-black/10 bg-forge-cream py-16 text-center md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-forge-orange">
            Events
          </span>
          <h1 className="mt-3 text-3xl font-medium md:text-5xl">
            Upcoming sessions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-forge-black/70">
            Registrations open below — reserve a spot while slots remain.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {error && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Couldn&apos;t load events right now. Please refresh the page.
          </p>
        )}

        {!error && (!events || events.length === 0) && (
          <p className="text-forge-black/60">
            No events are open for registration right now — check back soon.
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {events?.map((event: DbEvent) => (
            <div
              key={event.id}
              className="flex flex-col justify-between rounded-2xl border border-black/10 p-6 shadow-sm"
            >
              <div className="space-y-3">
                <span className="inline-block rounded-full border border-forge-orange/30 bg-forge-orange/10 px-2.5 py-1 text-xs font-bold text-forge-orange-dark">
                  {event.audience}
                </span>
                <h2 className="text-xl font-medium">{event.title}</h2>
                <p className="text-sm text-forge-black/70">{event.description}</p>

                <div className="space-y-1.5 border-t border-black/10 pt-3 text-xs text-forge-black/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-forge-orange" />
                    <strong className="text-forge-black">{event.dates_label}</strong>
                    <span>({event.time_label})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-forge-orange" />
                    {event.location}
                  </div>
                  {event.facilitator_name && (
                    <div className="flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 text-forge-orange" />
                      {event.facilitator_name}
                      {event.facilitator_role ? ` (${event.facilitator_role})` : ""}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
                <div>
                  <span className="block text-[11px] font-semibold uppercase text-forge-black/50">
                    {event.price > 0 ? "Registration fee" : "Cost"}
                  </span>
                  <span className="text-lg font-medium">
                    {event.price > 0 ? `$${event.price} / child` : "Free"}
                  </span>
                </div>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-forge-orange px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forge-orange-dark"
                >
                  Register <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}