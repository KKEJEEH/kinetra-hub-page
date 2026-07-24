import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { getSubcategory } from "@/lib/sanity";

export const Route = createFileRoute("/$system/$sub")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["sub", params.system, params.sub],
      queryFn: () => getSubcategory(params.system, params.sub),
    });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — KINETRA` },
          {
            name: "description",
            content: loaderData.summary ?? `${loaderData.title} — KINETRA`,
          },
        ]
      : [{ title: "Sottocategoria — KINETRA" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Pagina non trovata</h1>
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
  component: SubcategoryRoute,
});

function SubcategoryRoute() {
  const params = Route.useParams();
  const { data: sub } = useQuery({
    queryKey: ["sub", params.system, params.sub],
    queryFn: () => getSubcategory(params.system, params.sub),
  });

  if (!sub) return null;
  const system = sub.system;

  return (
    <div className="min-h-screen paper-bg text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          {system && (
            <Link
              to="/$system"
              params={{ system: system.slug }}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {system.title}
            </Link>
          )}

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            {system ? `Sistema ${system.index} / Sottocategoria` : "Sottocategoria"}
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {sub.title}
          </h1>
          {sub.summary && (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {sub.summary}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <article className="prose max-w-none prose-headings:font-display prose-headings:font-black prose-p:font-serif prose-p:text-foreground/85">
          {Array.isArray(sub.content) && sub.content.length > 0 ? (
            <PortableTextLite blocks={sub.content as PtBlock[]} />
          ) : (
            <div className="rounded-xl border border-border bg-card/40 p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                Contenuto in arrivo
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
                Approfondimento in produzione.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Questo approfondimento di <strong>{sub.title}</strong> sarà
                pubblicato a breve dal CMS. Torna presto — oppure esplora gli
                altri moduli del sistema.
              </p>
              {system && (
                <Link
                  to="/$system"
                  params={{ system: system.slug }}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Torna a {system.title}
                </Link>
              )}
            </div>
          )}
        </article>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
          <span className="font-display text-sm font-bold tracking-[0.2em]">KINETRA</span>
          {system && (
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {system.title} / {sub.title}
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}

// Minimal Portable Text renderer (paragraphs + headings only) — enough for now.
type PtSpan = { _type: "span"; text: string };
type PtBlock = {
  _type: "block";
  style?: string;
  children?: PtSpan[];
};

function PortableTextLite({ blocks }: { blocks: PtBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b._type !== "block") return null;
        const text = (b.children ?? []).map((c) => c.text).join("");
        if (b.style === "h2")
          return (
            <h2 key={i} className="mt-10 font-display text-2xl font-bold tracking-tight">
              {text}
            </h2>
          );
        if (b.style === "h3")
          return (
            <h3 key={i} className="mt-8 font-display text-xl font-bold tracking-tight">
              {text}
            </h3>
          );
        return (
          <p key={i} className="mt-5 text-base leading-relaxed text-foreground/85">
            {text}
          </p>
        );
      })}
    </>
  );
}
