import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { getSystemBySlug } from "@/lib/sanity";

export const Route = createFileRoute("/$system/")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["system", params.system],
      queryFn: () => getSystemBySlug(params.system),
    });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — KINETRA` },
          { name: "description", content: loaderData.longDescription },
          { property: "og:title", content: `${loaderData.title} — KINETRA` },
          { property: "og:description", content: loaderData.longDescription },
        ]
      : [{ title: "Sistema — KINETRA" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Sistema non trovato</h1>
        <Link to="/" className="mt-6 inline-block text-sm text-accent underline">
          Torna alla home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-sm text-muted-foreground">
      Errore: {error.message}
    </div>
  ),
  component: SystemRoute,
});

function SystemRoute() {
  const params = Route.useParams();
  const { data: system } = useQuery({
    queryKey: ["system", params.system],
    queryFn: () => getSystemBySlug(params.system),
  });

  if (!system) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[140px]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Torna alla home
          </Link>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            Sistema / {system.index} — {system.tagline}
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            {system.title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {system.longDescription}
          </p>
        </div>
      </section>

      {/* SUBCATEGORIES */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            Sottocategorie
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Approfondisci ogni area.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {system.subcategories.map((sub, i) => (
            <Link
              key={sub._id}
              to="/$system/$sub"
              params={{ system: system.slug, sub: sub.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_20px_60px_-20px_var(--accent-glow)]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold leading-tight">
                {sub.title}
              </h3>
              {sub.summary && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {sub.summary}
                </p>
              )}
              <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80 group-hover:text-accent">
                Apri →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla home
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <span className="font-display text-sm font-bold tracking-[0.2em]">KINETRA</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Sistema {system.index} / {system.slug}
          </span>
        </div>
      </footer>
    </div>
  );
}
