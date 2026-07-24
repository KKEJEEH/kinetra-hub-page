import { Link } from "@tanstack/react-router";

const NAV = [
  { slug: "velocity", label: "Velocità" },
  { slug: "strength", label: "Forza" },
  { slug: "nutrition", label: "Nutrizione" },
  { slug: "recovery", label: "Recupero" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-black tracking-tight text-foreground">
            KINETRA
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Rivista
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.slug}
              to="/$system"
              params={{ system: item.slug }}
              className="font-sans text-[13px] font-semibold uppercase tracking-wide text-foreground/80 transition hover:text-accent"
              activeProps={{ className: "text-accent underline underline-offset-4 decoration-2" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
          Ed. 2026
        </span>
      </div>
    </header>
  );
}
