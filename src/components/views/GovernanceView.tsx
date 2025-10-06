import { useState } from "react";
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Network,
  Wallet,
  Activity,
} from "lucide-react";
import type { Proposal } from "../../types";
import { Section, Badge, Stat } from "../ui";
import { fmt } from "../../utils";

interface GovernanceViewProps {
  notify: (message: string, type?: "ok" | "err") => void;
}

export function GovernanceView({ notify }: GovernanceViewProps) {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: "P-41",
      title: "Add Blockchain C",
      details: "Register light client; set caps; fee = 0.15%",
      endsAt: "in 3 days",
      forVotes: 421_000,
      againstVotes: 38_000,
      status: "active",
    },
    {
      id: "P-40",
      title: "Adjust ICX emissions",
      details: "Reduce by 10% to extend runway",
      endsAt: "ended",
      forVotes: 612_000,
      againstVotes: 89_000,
      status: "passed",
    },
  ]);

  const vote = (id: string, dir: "for" | "against") => {
    setProposals((all) =>
      all.map((p) =>
        p.id !== id
          ? p
          : {
              ...p,
              [dir === "for" ? "forVotes" : "againstVotes"]:
                p[dir === "for" ? "forVotes" : "againstVotes"] + 1000,
            }
      )
    );
    notify(`Voted ${dir.toUpperCase()} on ${id}`, "ok");
  };

  return (
    <div className="h-full grid gap-4 md:grid-cols-2 md:grid-rows-1">
      <Section
        title="Active Proposals"
        icon={<Settings className="h-4 w-4" />}
        className="h-full"
      >
        <div className="flex flex-col gap-3 h-full overflow-y-auto">
          {proposals.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border bg-white/5 p-4 flex-shrink-0"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">
                  {p.title}{" "}
                  <span className="ml-2 text-xs opacity-60">{p.id}</span>
                </div>
                <div className="text-xs opacity-60">{p.endsAt}</div>
              </div>
              <div className="mt-1 text-sm opacity-80">{p.details}</div>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <Badge>
                  <CheckCircle2 className="mr-1 h-3 w-3" /> For{" "}
                  {fmt(p.forVotes)}
                </Badge>
                <Badge>
                  <XCircle className="mr-1 h-3 w-3" /> Against{" "}
                  {fmt(p.againstVotes)}
                </Badge>
              </div>
              {p.status === "active" && (
                <div className="mt-3 flex gap-2">
                  <button
                    className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-gray-900"
                    onClick={() => vote(p.id, "for")}
                  >
                    Vote For
                  </button>
                  <button
                    className="rounded-lg bg-white/0 px-3 py-1 text-xs font-semibold ring-1 ring-white/40"
                    onClick={() => vote(p.id, "against")}
                  >
                    Vote Against
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Validator / Staking"
        icon={<ShieldCheck className="h-4 w-4" />}
        className="h-full"
      >
        <div className="flex flex-col gap-4 h-full">
          <div className="grid gap-3 md:grid-cols-2">
            <Stat
              label="Active Validators"
              value="36"
              icon={<Network className="h-5 w-5" />}
            />
            <Stat
              label="Staked ICX"
              value="12.8M"
              icon={<Wallet className="h-5 w-5" />}
            />
            <Stat
              label="APR"
              value="8.2%"
              icon={<Activity className="h-5 w-5" />}
            />
            <Stat
              label="Slash events"
              value="0"
              icon={<ShieldCheck className="h-5 w-5" />}
            />
          </div>
          <div className="mt-auto pt-4">
            <button className="w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900">
              Stake ICX
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
