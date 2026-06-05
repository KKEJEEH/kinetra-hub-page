import { createFileRoute } from "@tanstack/react-router";
import { SystemPage } from "@/components/SystemPage";
import { SYSTEMS } from "@/lib/systems";

const system = SYSTEMS.find((s) => s.slug === "velocity")!;

export const Route = createFileRoute("/velocity")({
  head: () => ({
    meta: [
      { title: `${system.title} — KINETRA` },
      { name: "description", content: system.longDescription },
      { property: "og:title", content: `${system.title} — KINETRA` },
      { property: "og:description", content: system.longDescription },
    ],
  }),
  component: () => <SystemPage system={system} />,
});
