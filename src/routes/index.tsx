import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemCard } from "@/components/SystemCard";
import { getAllSystems } from "@/lib/sanity";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KINETRA — Quattro sistemi per la performance d'élite" },
      {
        name: "description",
        content:
          "KINETRA è un sistema operativo per la performance: Velocità, Forza, Nutrizione e Recupero. Quattro sistemi, un atleta.",
      },
      { property: "og:title", content: "KINETRA — Quattro sistemi per la performance d'élite" },
      {
        property: "og:description",
        content: "Velocità, Forza, Nutrizione, Recupero. Quattro sistemi, un sistema operativo per la performance.",
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["systems"],
      queryFn: getAllSystems,
    }),
  component: Home,
});

function Home() {
  const { data: systems = [] } = useQuery({
    queryKey: ["systems"],
    queryFn: getAllSystems,
  });

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
            Quattro sistemi.
            <br />
            <span className="text-accent text-glow">Un atleta.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            KINETRA è un'architettura di allenamento completa. Velocità, Forza,
            Nutrizione e Recupero — ingegnerizzati come un unico protocollo
            coerente per atleti che si allenano con intenzione.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Protocollo Attivo
            </div>
            <span className="h-px w-12 bg-border" />
            <span>04 Sistemi</span>
            <span className="h-px w-12 bg-border" />
            <span>00 Compromessi</span>
          </div>
        </div>
      </section>

      {/* SYSTEMS GRID */}
      <section id="systems" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              I Sistemi
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Scegli il tuo protocollo.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Ogni sistema vive di vita propria. Insieme, formano uno stack di
            performance completo — pensato per sommarsi, non per competere.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {systems.map((s) => (
            <SystemCard
              key={s._id}
              index={s.index}
              title={s.title}
              tagline={s.tagline}
              description={s.description}
              slug={s.slug}
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
            © {new Date().getFullYear()} Kinetra — La performance è ingegneria.
          </p>
        </div>
      </footer>
    </div>
  );
}
