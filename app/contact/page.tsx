import { Mail, Phone, MapPin, AtSign, Users } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-black/10 bg-forge-cream py-16 text-center dark:border-white/10 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-forge-orange">
            Contact
          </span>
          <h1 className="mt-3 text-3xl font-medium md:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-forge-black/70 dark:text-white/70">
            Have a question about a program or an upcoming event? Send us a message.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Contact details</h2>
          <div className="space-y-4 text-base text-forge-black/70 dark:text-white/70">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-forge-orange" />
              5900 Balcones Drive, Austin, TX 78731, USA
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-forge-orange" />
              <a href="tel:+13465011249" className="hover:text-forge-orange">
                +1 (346) 501-1249
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-forge-orange" />
              <a href="mailto:forgehavenacademy@gmail.com" className="hover:text-forge-orange">
                forgehavenacademy@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <AtSign className="h-4 w-4 shrink-0 text-forge-orange" />
              <a
                href="https://instagram.com/forgehavenacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-forge-orange"
              >
                @forgehavenacademy
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 shrink-0 text-forge-orange" />
              <a
                href="https://facebook.com/forgehavenacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-forge-orange"
              >
                Forge Haven Academy
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
