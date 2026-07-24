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
    <div className="min-h-screen paper-bg text-foreground">
      <SiteHeader />

      {/* MASTHEAD */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Numero 01 · La Scienza della Performance
            </p>
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-5xl font-black leading-[0.98] tracking-tight text-foreground md:text-7xl lg:text-[92px]">
            Quattro sistemi.
            <br />
            <em className="italic font-normal text-accent">Un atleta.</em>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-[2fr_1fr]">
            <p className="max-w-2xl font-serif text-lg leading-relaxed text-foreground/80 md:text-xl">
              KINETRA è una rivista educativa sulla performance atletica.
              Velocità, Forza, Nutrizione e Recupero — analizzati con rigore
              scientifico, raccontati come un giornale.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span>Sistemi</span><span className="text-foreground">04</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span>Approfondimenti</span><span className="text-foreground">13+</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Compromessi</span><span className="text-foreground">00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEMS GRID */}
      <section id="systems" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-rule inline-block pt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              I Sistemi
            </p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight md:text-5xl">
              Scegli il tuo protocollo.
            </h2>
          </div>
          <p className="max-w-sm font-serif text-base leading-relaxed text-muted-foreground">
            Ogni sistema vive di vita propria. Insieme formano uno stack di
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
