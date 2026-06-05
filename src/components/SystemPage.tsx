import { Link } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { FUTURE_ARTICLES, type SystemData } from "@/lib/systems";

export function SystemPage({ system }: { system: SystemData }) {
  const articles = FUTURE_ARTICLES[system.slug];

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
            Back to Home
          </Link>

          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            System / {system.index} — {system.tagline}
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            {system.title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {system.longDescription}
          </p>

          {/* SUBCATEGORIES */}
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {system.subcategories.map((s, i) => (
              <div
                key={s}
                className="flex items-center gap-4 rounded-xl border border-border bg-card/60 px-5 py-4 transition hover:border-accent/60"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE ARTICLES */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
              Future Articles
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              In the pipeline.
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:inline">
            Sanity CMS / pending
          </span>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {articles.map((a, i) => (
            <li
              key={a}
              className="group flex items-center justify-between gap-6 py-5 transition hover:pl-2"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <FileText className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
                <span className="text-sm font-medium md:text-base">{a}</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Coming Soon
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <span className="font-display text-sm font-bold tracking-[0.2em]">KINETRA</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            System {system.index} / {system.slug}
          </span>
        </div>
      </footer>
    </div>
  );
}
