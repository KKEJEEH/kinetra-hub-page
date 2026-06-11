type Kind = "velocita" | "nutrizione" | "recupero" | "forza" | "default";

function detect(slug: string, title?: string): Kind {
  const s = `${slug} ${title ?? ""}`.toLowerCase();
  if (/(veloc|sprint|speed)/.test(s)) return "velocita";
  if (/(nutri|food|energ|metab)/.test(s)) return "nutrizione";
  if (/(recup|recover|sleep|calm|nervo)/.test(s)) return "recupero";
  if (/(forza|strength|power|muscol)/.test(s)) return "forza";
  return "default";
}

export function SystemAnimation({
  slug,
  title,
  className,
}: {
  slug: string;
  title?: string;
  className?: string;
}) {
  const kind = detect(slug, title);
  return (
    <div
      className={
        className ??
        "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-card/40"
      }
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/10" />
      <svg
        viewBox="0 0 400 225"
        className="relative h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {kind === "velocita" && <Velocita />}
        {kind === "nutrizione" && <Nutrizione />}
        {kind === "recupero" && <Recupero />}
        {kind === "forza" && <Forza />}
        {kind === "default" && <Velocita />}
      </svg>
    </div>
  );
}

/* ---------- Velocità: sprint lines accelerating ---------- */
function Velocita() {
  const lines = [40, 70, 100, 130, 160];
  return (
    <g stroke="var(--accent)" strokeLinecap="round" fill="none">
      {lines.map((y, i) => (
        <line
          key={i}
          x1="20"
          x2="380"
          y1={y}
          y2={y}
          strokeWidth={1 + i * 0.3}
          strokeDasharray="60 220"
          opacity={0.25 + i * 0.12}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-560"
            dur={`${2.2 - i * 0.25}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
      <circle cx="320" cy="112" r="6" fill="var(--accent)">
        <animate
          attributeName="cx"
          values="60;340;60"
          dur="2.4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

/* ---------- Nutrizione: orbiting molecules ---------- */
function Nutrizione() {
  return (
    <g>
      <circle
        cx="200"
        cy="112"
        r="22"
        fill="var(--accent)"
        opacity="0.9"
      />
      <circle
        cx="200"
        cy="112"
        r="32"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0.4"
      >
        <animate
          attributeName="r"
          values="32;46;32"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0;0.5"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 200 112)`}>
          <g>
            <circle cx="280" cy="112" r="5" fill="var(--accent)" opacity="0.85" />
            <line
              x1="222"
              y1="112"
              x2="275"
              y2="112"
              stroke="var(--accent)"
              strokeWidth="1"
              opacity="0.35"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 112"
              to="360 200 112"
              dur={`${6 + i}s`}
              repeatCount="indefinite"
            />
          </g>
        </g>
      ))}
    </g>
  );
}

/* ---------- Recupero: slow heartbeat / breath ---------- */
function Recupero() {
  return (
    <g fill="none" stroke="var(--accent)" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="200" cy="112" r="40" strokeWidth="1.5" opacity="0.4">
        <animate
          attributeName="r"
          values="40;60;40"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0.1;0.5"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="200" cy="112" r="24" strokeWidth="1" opacity="0.6">
        <animate
          attributeName="r"
          values="24;36;24"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <path
        d="M40 112 H140 L155 80 L175 150 L195 95 L215 130 L235 112 H360"
        strokeWidth="2"
        strokeDasharray="600"
        strokeDashoffset="600"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="600;0;-600"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
}

/* ---------- Forza: rising power bars ---------- */
function Forza() {
  const bars = [60, 110, 160, 210, 260, 310];
  const heights = [40, 70, 55, 95, 75, 120];
  return (
    <g>
      <line
        x1="20"
        y1="190"
        x2="380"
        y2="190"
        stroke="var(--accent)"
        strokeWidth="1"
        opacity="0.4"
      />
      {bars.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={190 - heights[i]}
          width="32"
          height={heights[i]}
          rx="4"
          fill="var(--accent)"
          opacity={0.35 + i * 0.1}
        >
          <animate
            attributeName="height"
            values={`8;${heights[i]};${heights[i] - 10};${heights[i]}`}
            dur={`${2 + i * 0.15}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values={`182;${190 - heights[i]};${200 - heights[i]};${190 - heights[i]}`}
            dur={`${2 + i * 0.15}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
    </g>
  );
}
