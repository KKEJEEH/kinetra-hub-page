import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemCard } from "@/components/SystemCard";
import { SYSTEMS } from "@/lib/systems";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KINETRA — Four Systems for Elite Performance" },
      {
        name: "description",
        content:
          "KINETRA is a performance OS built on four systems: Velocity, Strength, Nutrition and Recovery. Engineered for athletes who measure everything.",
      },
      { property: "og:title", content: "KINETRA — Four Systems for Elite Performance" },
      {
        property: "og:description",
        content: "Velocity, Strength, Nutrition, Recovery. Four systems, one performance OS.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            Performance Operating System / v1.0
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]">
            Four systems.
            <br />
            <span className="text-accent text-glow">One athlete.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            KINETRA is a complete training architecture. Velocity, Strength,
            Nutrition and Recovery — engineered as one coherent protocol for
            athletes who train with intent.
          </p>

          <div className="mt-12 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Live Protocol
            </div>
            <span className="h-px w-12 bg-border" />
            <span>04 Systems</span>
            <span className="h-px w-12 bg-border" />
            <span>00 Compromise</span>
          </div>
        </div>
      </section>

      {/* SYSTEMS GRID */}
      <section id="systems" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              The Systems
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Choose your protocol.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Each system stands on its own. Together, they form a complete
            performance stack — designed to compound, not compete.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SYSTEMS.map((s) => (
            <SystemCard
              key={s.slug}
              index={s.index}
              title={s.title}
              tagline={s.tagline}
              description={s.description}
              subcategories={s.subcategories}
              to={s.to}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-display text-sm font-bold tracking-[0.2em]">KINETRA</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            © {new Date().getFullYear()} Kinetra — Performance is engineered.
          </p>
        </div>
      </footer>
    </div>
  );
}
