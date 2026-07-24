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
      className="group relative flex flex-col overflow-hidden border-t-2 border-foreground bg-card p-7 card-hover hover:-translate-y-1 hover:border-accent hover:shadow-[0_16px_40px_-24px_var(--accent-glow)]"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          Sistema · {index}
        </span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
        {tagline}
      </p>
      <h3 className="mt-2 font-display text-4xl font-black leading-[1.02] tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-4 font-serif text-base leading-relaxed text-foreground/75">{description}</p>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-semibold text-foreground">Leggi il sistema</span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">→</span>
      </div>
    </Link>
  );
}
