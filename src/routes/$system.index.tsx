import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SystemAnimation } from "@/components/SystemAnimation";
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

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("Tutti");

  // Derive simple tags from titles (first keyword) — pragmatic until a tag field exists.
  const tags = useMemo(() => {
    if (!system) return ["Tutti"];
    const t = new Set<string>();
    system.subcategories.forEach((s) => {
      const first = s.title.split(/[\s—–-]/)[0];
      if (first && first.length > 2) t.add(first);
    });
    return ["Tutti", ...Array.from(t).slice(0, 6)];
  }, [system]);

  const filtered = useMemo(() => {
    if (!system) return [];
    return system.subcategories.filter((s) => {
      const matchesQ =
        !query ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        (s.summary ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesTag =
        activeTag === "Tutti" || s.title.toLowerCase().startsWith(activeTag.toLowerCase());
      return matchesQ && matchesTag;
    });
  }, [system, query, activeTag]);

  if (!system) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO with animation */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:pb-24 md:pt-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Torna alla home
          </Link>

          <div className="mt-10 grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
                Sistema / {system.index} — {system.tagline}
              </p>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
                {system.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {system.longDescription}
              </p>
            </div>

            <SystemAnimation slug={system.slug} title={system.title} />
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Articoli
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Approfondimenti scientifici.
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca un articolo…"
              className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm outline-none transition focus:border-accent"
            />
          </div>
        </div>

        {tags.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] transition ${
                  activeTag === t
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sub, i) => (
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
              <h3 className="mt-6 font-display text-lg font-bold leading-tight">
                {sub.title}
              </h3>
              {sub.summary && (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {sub.summary}
                </p>
              )}
              <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80 group-hover:text-accent">
                Leggi →
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-border bg-card/40 p-10 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                Nessun risultato
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Prova a modificare la ricerca o rimuovere i filtri.
              </p>
            </div>
          )}
        </div>

        <div className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                Future Articles
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                In arrivo.
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {system.articles.length.toString().padStart(2, "0")} articoli
            </span>
          </div>

          {system.articles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card/30 p-10 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Nessun articolo ancora pubblicato per questo sistema.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
              {system.articles.map((a, i) => (
                <li
                  key={a._id}
                  className="group flex items-start gap-6 p-6 transition hover:bg-accent/5"
                >
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {a.excerpt}
                      </p>
                    )}
                    {a.publishedAt && (
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {new Date(a.publishedAt).toLocaleDateString("it-IT", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </li>
              ))}
            </ul>
          )}
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
