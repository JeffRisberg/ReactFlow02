import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NODE_REGISTRY } from "@/nodes";

export default function HomePage() {
  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10">
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="size-2 rounded-full bg-orange-500" />
          ReactFlow02
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Design workflows visually
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Flow Studio is a drag-and-drop editor for building flows.
        </p>
      </section>

      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 pb-16">
        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Build flows
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every flow is assembled from a concise vocabulary of nodes.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {NODE_REGISTRY.map(({ type, label, description, Icon, background }) => (
              <div
                key={type}
                className="flex flex-col gap-1.5 rounded-lg border p-3.5"
                style={{ background: `${background}0f`, borderColor: `${background}40` }}
              >
                <span className="inline-flex size-7 items-center justify-center rounded-md" style={{ background: `${background}22`, color: background }}>
                  <Icon size={16} />
                </span>
                <div className="text-sm font-semibold" style={{ color: background }}>
                  {label}
                </div>
                <div className="text-xs leading-relaxed text-muted-foreground">{description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-border bg-muted/40 px-8 py-10 sm:flex-row sm:items-center sm:justify-between">
          <Button
            size="lg"
            className="shrink-0"
            nativeButton={false}
            render={
              <Link href="/flow-editor">
                Open Flow Editor <ArrowRight className="ml-1" />
              </Link>
            }
          />
        </section>
      </div>
    </div>
  );
}
