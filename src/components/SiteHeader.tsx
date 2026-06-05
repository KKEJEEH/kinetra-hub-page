import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent-glow)]" />
          <span className="font-display text-lg font-bold tracking-[0.18em]">KINETRA</span>
        </Link>
        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <Link to="/velocity" className="transition hover:text-foreground">Velocity</Link>
          <Link to="/strength" className="transition hover:text-foreground">Strength</Link>
          <Link to="/nutrition" className="transition hover:text-foreground">Nutrition</Link>
          <Link to="/recovery" className="transition hover:text-foreground">Recovery</Link>
        </nav>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:inline">
          v1.0 / Performance OS
        </span>
      </div>
    </header>
  );
}
