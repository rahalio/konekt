import { useMemo, useState } from "react";
import { Store } from "lucide-react";
import { DAPPS } from "../../constants";
import { Section, Badge } from "../ui";

export function RegistryView() {
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      DAPPS.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.tags.some((t) => t.includes(query.toLowerCase()))
      ),
    [query]
  );

  return (
    <div className="h-full">
      <Section
        title="DApp Registry"
        icon={<Store className="h-4 w-4" />}
        className="h-full"
        actions={
          <input
            placeholder="Search"
            className="rounded-lg border bg-white/5 px-3 py-1 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        }
      >
        <div className="grid gap-3 md:grid-cols-3 h-full content-start overflow-y-auto">
          {items.map((d) => (
            <div key={d.id} className="rounded-xl border bg-white/5 p-4 h-fit">
              <div className="font-semibold">{d.name}</div>
              <div className="mt-1 text-xs opacity-70">Owner {d.owner}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {d.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <div className="mt-3 text-xs opacity-60">CID: {d.cid}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
