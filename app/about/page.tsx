import { Compass, Target, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pb-20">
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
            optimal potential — through parenting programs and mentorship for
            boys, girls, preteens, and teenagers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-lg leading-relaxed text-forge-black/80 dark:text-white/80">
          We help individuals and organizations reach optimal performance
          through parenting programmes and mentorship for boys, girls,
          preteens, and teenagers — so that their lives, their families, and
          the world around them can become a little better. Our programs are
          for parents of children ages 0–17.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-black/10 p-8 shadow-sm dark:border-white/10 dark:bg-forge-surface">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forge-orange/10 text-forge-orange">
              <Compass className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-medium">Discovery Lab</h2>
            <p className="text-base text-forge-black/70 dark:text-white/70">
              For preteens and teens — helping young people understand
              themselves and the people around them a little better, through
              interactive, hands-on sessions during one of the most important
              stages of growing up.
            </p>
          </div>

          <div className="space-y-4 rounded-3xl border border-black/10 p-8 shadow-sm dark:border-white/10 dark:bg-forge-surface">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forge-black/5 text-forge-black dark:bg-white/10 dark:text-white">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-medium">Graceful Parenting</h2>
            <p className="text-base text-forge-black/70 dark:text-white/70">
              For parents — practical parenting skills and support. Full
              details for this program are coming soon.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
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
    </div>
  );
}