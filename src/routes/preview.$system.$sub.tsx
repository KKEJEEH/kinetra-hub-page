import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Eye, AlertTriangle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { getSubcategoryPreview } from "@/lib/sanity.preview.functions";

export const Route = createFileRoute("/preview/$system/$sub")({
  head: () => ({
    meta: [
      { title: "Anteprima — KINETRA" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Bozza non trovata</h1>
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
  component: PreviewRoute,
});

function PreviewRoute() {
  const params = Route.useParams();
  const fetchPreview = useServerFn(getSubcategoryPreview);
  const { data, isLoading, error } = useQuery({
    queryKey: ["preview", params.system, params.sub],
    queryFn: () =>
      fetchPreview({ data: { systemSlug: params.system, subSlug: params.sub } }),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <PreviewBanner hasToken />
        <div className="p-10 text-center text-sm text-muted-foreground">
          Caricamento anteprima…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <PreviewBanner hasToken={false} />
        <div className="p-10 text-center text-sm text-destructive">
          Errore: {(error as Error).message}
        </div>
      </div>
    );
  }

  const sub = data?.data;
  const hasToken = data?.hasToken ?? false;

  if (!sub) throw notFound();
  const system = sub.system;
  const isDraft = sub._isDraft;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PreviewBanner hasToken={hasToken} isDraft={isDraft} />
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-accent/15 blur-[140px]" />
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
            {system ? `Sistema ${system.index} / Anteprima` : "Anteprima"}
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
        <article className="prose prose-invert max-w-none">
          {Array.isArray(sub.content) && sub.content.length > 0 ? (
            <PortableTextLite blocks={sub.content as PtBlock[]} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Nessun contenuto nel campo <strong>Contenuto</strong>.
            </p>
          )}
        </article>
      </section>
    </div>
  );
}

function PreviewBanner({
  hasToken,
  isDraft,
}: {
  hasToken: boolean;
  isDraft?: boolean;
}) {
  if (!hasToken) {
    return (
      <div className="sticky top-0 z-50 border-b border-yellow-500/40 bg-yellow-500/15 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-400" />
          <p className="text-xs leading-relaxed text-yellow-100/90 md:text-sm">
            <strong className="font-semibold">Preview non configurata.</strong>{" "}
            Aggiungi il secret <code className="font-mono text-[11px]">SANITY_API_READ_TOKEN</code>{" "}
            per vedere le bozze. Al momento vedi solo i contenuti pubblicati.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="sticky top-0 z-50 border-b border-accent/40 bg-accent/15 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">
        <Eye className="h-4 w-4 shrink-0 text-accent" />
        <p className="text-xs leading-relaxed text-foreground/90 md:text-sm">
          <strong className="font-semibold">Modalità Preview attiva.</strong>{" "}
          {isDraft
            ? "Stai vedendo una BOZZA non ancora pubblicata."
            : "Stai vedendo l'ultima versione pubblicata (nessuna bozza presente)."}
        </p>
      </div>
    </div>
  );
}

type PtSpan = { _type: "span"; text: string };
type PtBlock = { _type: "block"; style?: string; children?: PtSpan[] };

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
