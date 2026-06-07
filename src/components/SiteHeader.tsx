import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/velocity", label: "Velocità" },
  { to: "/strength", label: "Forza" },
  { to: "/nutrition", label: "Nutrizione" },
  { to: "/recovery", label: "Recupero" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-base font-bold tracking-[0.2em]">
            KINETRA
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground transition hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          v1.0
        </span>
      </div>
    </header>
  );
}
