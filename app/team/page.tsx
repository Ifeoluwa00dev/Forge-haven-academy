import { CheckCircle } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-black/10 bg-forge-cream py-16 text-center dark:border-white/10 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-forge-orange">
            The people behind Forge Haven
          </span>
          <h1 className="mt-3 text-3xl font-medium md:text-5xl">Meet the Team</h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-20 px-6 py-16">
        {/* Olabisi Olaleye — photo left */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-black/10 dark:border-white/10">
            <div className="flex aspect-[4/5] items-center justify-center bg-forge-orange/10 text-6xl font-bold text-forge-orange">
              OO
            </div>
            <div className="border-t border-black/10 bg-white p-4 dark:border-white/10 dark:bg-forge-surface">
              <p className="font-medium">Olabisi Olaleye</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-forge-orange">
                Founder
              </p>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-forge-orange">
              Founder
            </span>
            <h2 className="mt-2 text-2xl font-medium md:text-3xl">
              Equipping parents. Empowering the next generation.
            </h2>

            <div className="mt-5 space-y-4 text-base text-forge-black/70 dark:text-white/70">
              <p>
                Olabisi Olaleye is a Certified Parenting Coach, Educator, Speaker, and
                the Founder of Forge Haven Academy, an organization dedicated to
                strengthening families and empowering young people through
                intentional development, mentorship, education, and meaningful
                conversations.
              </p>
              <p>
                With a passion for parenting, personal growth, and family
                relationships, Olabisi works with parents, educators, and mentors
                to develop a deeper understanding of children and teenagers,
                equipping them with practical tools to nurture confident,
                emotionally intelligent, and well-rounded young people.
              </p>
              <p>
                Through Forge Haven Academy, she designs and facilitates
                developmental programmes that help preteens and teenagers build
                self-awareness, character, communication skills, leadership
                abilities, resilience, and essential life skills needed to thrive
                beyond the classroom. Her work also creates safe and engaging spaces where young people can discover their strengths, develop healthy relationships, and grow into their fullest potential.
              </p>
              <p>
                Beyond youth development, Olabisi is passionate about equipping parents and caregivers to become more intentional in their approach to raising children. Through workshops, speaking engagements, and interactive conversations, she provides insights that help families build stronger connections and create environments where children can flourish.
              </p>
              <p>
                Olabisi holds a Bachelor&apos;s degree in French Language from
                Obafemi Awolowo University and a Master&apos;s degree in Business
                Administration from Prairie View A&amp;M University, Texas. She is
                married to Oluwafemi Olaleye, and together they are blessed with
                children.
              </p>
              <p>
                Through her work, Olabisi continues to advocate for intentional parenting, purposeful youth development, and stronger family relationships.
                 
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 p-6 dark:border-white/10 dark:bg-forge-surface">
              <p className="text-xs font-semibold uppercase tracking-wider text-forge-black/60 dark:text-white/60">
                At Forge Haven, Olabisi focuses on:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-forge-black/70 dark:text-white/70">
                {[
                  "Designing developmental programmes for preteens and teens",
                  "Equipping parents and caregivers to be more intentional",
                  "Building self-awareness, character, and leadership in young people",
                  "Creating safe spaces for healthy relationships and growth",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-forge-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Femi Olaleye — photo right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div className="order-2 lg:order-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-forge-orange">
              Team
            </span>
            <h2 className="mt-2 text-2xl font-medium md:text-3xl">
              Leading with faith, purpose, and presence.
            </h2>

            <div className="mt-5 space-y-4 text-base text-forge-black/70 dark:text-white/70">
              <p>
                Femi Olaleye is a husband, father, Systems Quality Engineer at
                Apple, and a passionate advocate for intentional parenting and
                raising children with strong spiritual foundations.
              </p>
              <p>
                Having lost his father at the age of nine, Femi was raised by his
                mother alongside his three younger sisters in a home where faith,
                resilience, and family values were deeply emphasized. His early
                experiences shaped his understanding of the importance of
                presence, purpose, and strong foundations in a child&apos;s
                development.
              </p>
              <p>
                Today, as a father of two boys, Femi is committed to building a
                Christ-centered home and creating an environment where his
                children can grow in faith, character, confidence, and purpose.
                He believes that effective parenting begins with intentional leadership, consistent example, and genuine connection.
              </p>
              <p>
                Through his experiences as a parent and professional, Femi brings
                a unique perspective on balancing faith, family, and career.
                 He is passionate about encouraging parents to embrace their responsibility in shaping the next generation and raising children who love God, understand their identity, and live purposefully.

              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 p-6 dark:border-white/10 dark:bg-forge-surface">
              <p className="text-xs font-semibold uppercase tracking-wider text-forge-black/60 dark:text-white/60">
                Femi is passionate about:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-forge-black/70 dark:text-white/70">
                {[
                  "Building a Christ-centered home",
                  "Intentional leadership and consistent example",
                  "Balancing faith, family, and career",
                  "Encouraging parents to raise purposeful children",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-forge-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="order-1 overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 lg:order-2">
            <div className="flex aspect-[4/5] items-center justify-center bg-forge-orange/10 text-6xl font-bold text-forge-orange">
              FO
            </div>
            <div className="border-t border-black/10 bg-white p-4 dark:border-white/10 dark:bg-forge-surface">
              <p className="font-medium">Femi Olaleye</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-forge-orange">
                Team Member
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}