import { Compass, Target, HeartHandshake, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pb-20">
      {/* Header banner */}
      <section className="border-b border-black/10 bg-forge-cream py-16 dark:border-white/10 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-forge-orange">
            Who we are
          </span>
          <h1 className="mt-3 text-3xl font-medium md:text-5xl">
            Maximizing life through optimal performance
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-forge-black/70 dark:text-white/70">
            Forge Haven Academy helps individuals and families reach their
            optimal potential, through parenting programs and mentorship for
            boys, girls, preteens, and teenagers.
          </p>
        </div>
      </section>

      {/* Who we are, in full */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-lg leading-relaxed text-forge-black/80 dark:text-white/80">
          We help individuals and organizations reach optimal performance
          through parenting programmes and mentorship for boys, girls,
          preteens, and teenagers, so that their lives, their families, and
          the world around them can become a little better. Our programs are
          for parents of children ages 0 to 17.
        </p>
        <p className="mt-4 text-sm font-medium text-forge-orange-dark dark:text-forge-orange">
          Founded November 2025.
        </p>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-black/10 bg-forge-cream p-8 dark:border-white/10 dark:bg-forge-surface md:p-12">
          <h2 className="text-2xl font-medium">Our mission</h2>
          <p className="mt-3 max-w-3xl text-base text-forge-black/70 dark:text-white/70">
            To equip preteens with practical life skills, emotional
            intelligence, social awareness, self-leadership, and personality
            insight through engaging, age-appropriate experiences that make
            self-discovery fun, relatable, and empowering.
          </p>
        </div>
      </section>

      {/* Two pathways */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-8 text-2xl font-medium">Our programs</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-black/10 p-8 shadow-sm dark:border-white/10 dark:bg-forge-surface">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forge-orange/10 text-forge-orange">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium">Discovery Lab</h3>
            <p className="text-base text-forge-black/70 dark:text-white/70">
              For preteens and teens, ages 9 to 12, helping young people
              understand themselves and the people around them a little
              better, through interactive, hands-on sessions during one of
              the most important stages of growing up. Discovery Lab is a
              recurring session and serves as a precursor to our upcoming
              12-week mentorship program.
            </p>
          </div>

          <div className="space-y-4 rounded-3xl border border-black/10 p-8 shadow-sm dark:border-white/10 dark:bg-forge-surface">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forge-black/5 text-forge-black dark:bg-white/10 dark:text-white">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium">Graceful Parenting</h3>
            <p className="text-base text-forge-black/70 dark:text-white/70">
              For parents of children ages 5 through the teen years,
              practical parenting skills and support, free to attend.
              Launching 2025.
            </p>
            <ul className="space-y-2 pt-2">
              {[
                "Practical tools for everyday parenting challenges",
                "A supportive community of parents on the same journey",
                "Guidance rooted in real family experience, not just theory",
                "Space to ask questions and share openly, without judgment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-forge-black/70 dark:text-white/70">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forge-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-black/10 p-8 shadow-sm dark:border-white/10 dark:bg-forge-surface md:p-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forge-orange/10 text-forge-orange">
            <Target className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-medium">Our vision</h2>
          <p className="mt-3 max-w-2xl text-base text-forge-black/70 dark:text-white/70">
            A generation of preteens who grow up knowing who they are,
            understanding how they think and feel, and confidently leading
            themselves through life&apos;s everyday moments.
          </p>
        </div>
      </section>

      {/* Refund policy */}
      {/* <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-black/10 p-6 text-sm text-forge-black/60 dark:border-white/10 dark:text-white/60">
          <strong className="text-forge-black dark:text-white">Refund policy:</strong> for
          paid events, cancellations made at least 5 days before the event
          date are eligible for a refund.
        </div>
      </section> */}
    </div>
  );
}