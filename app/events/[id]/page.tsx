import { notFound } from "next/navigation";
import { Calendar, MapPin, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";
import RegistrationForm from "@/components/RegistrationForm";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (!event) notFound();

  return (
    <div className="pb-20">
      <section className="border-b border-black/10 bg-forge-cream py-14">
        <div className="mx-auto max-w-4xl px-6">
          <span className="inline-block rounded-full border border-forge-orange/30 bg-forge-orange/10 px-2.5 py-1 text-xs font-bold text-forge-orange-dark">
            {event.audience}
          </span>
          <h1 className="mt-3 text-3xl font-medium md:text-4xl">{event.title}</h1>
          <p className="mt-3 max-w-2xl text-forge-black/70">{event.description}</p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-forge-black/70">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-forge-orange" />
              <strong className="text-forge-black">{event.dates_label}</strong> ({event.time_label})
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-forge-orange" />
              {event.location}
            </div>
            {event.facilitator_name && (
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-forge-orange" />
                {event.facilitator_name}
                {event.facilitator_role ? ` (${event.facilitator_role})` : ""}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <RegistrationForm
          eventId={event.id}
          eventTitle={event.title}
          price={event.price}
          currency={event.currency}
        />
      </section>
    </div>
  );
}