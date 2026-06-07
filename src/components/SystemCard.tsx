import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export interface SystemCardProps {
  index: string;
  title: string;
  tagline: string;
  description: string;
  slug: string;
}

export function SystemCard({ index, title, tagline, description, slug }: SystemCardProps) {
  return (
    <Link
      to="/$system"
      params={{ system: slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 card-hover hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_60px_-20px_var(--accent-glow)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Sistema / {index}
        </span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>

      <h3 className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight">
        {title}
      </h3>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {tagline}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-7 flex items-center justify-between border-t border-border/60 pt-5">
        <span className="text-sm font-medium text-foreground">Esplora il sistema</span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">→</span>
      </div>
    </Link>
  );
}
