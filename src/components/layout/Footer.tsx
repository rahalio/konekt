import { Badge, ChainDot } from "../ui";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-900/50 py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-xs opacity-70">
        <div className="flex items-center gap-2">
          <Badge>
            <ChainDot id="konekt" />
            KONEKT
          </Badge>
          <Badge>
            <ChainDot id="chain-a" />
            Blockchain A
          </Badge>
          <Badge>
            <ChainDot id="chain-b" />
            Blockchain B
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <span>ICX used for fees • LFT/BFT validators • BTP messaging</span>
        </div>
      </div>
    </footer>
  );
}
