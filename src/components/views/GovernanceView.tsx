import { useState } from "react";
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Network,
  Wallet,
  TrendingUp,
  Clock,
  Users,
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
    <div className="min-h-[600px] max-h-[800px] grid gap-6 md:grid-cols-2">
      <Section
        title="Active Proposals"
        icon={<Settings className="h-4 w-4" />}
        className="h-auto"
      >
        <div className="space-y-4">
          {proposals.map((p) => {
            const totalVotes = p.forVotes + p.againstVotes;
            const forPercentage =
              totalVotes > 0 ? (p.forVotes / totalVotes) * 100 : 0;
            const isActive = p.status === "active";
            const isPassed = p.status === "passed";

            return (
              <div
                key={p.id}
                className="group rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-sm hover:from-white/15 hover:to-white/10 hover:border-white/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-white">{p.title}</h3>
                      <Badge className="text-xs font-medium bg-blue-500/20 text-blue-200 border-blue-400/30">
                        {p.id}
                      </Badge>
                      {isActive && (
                        <Badge className="text-xs font-medium bg-green-500/20 text-green-200 border-green-400/30">
                          <Clock className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                      {isPassed && (
                        <Badge className="text-xs font-medium bg-emerald-500/20 text-emerald-200 border-emerald-400/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Passed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {p.details}
                    </p>
                  </div>
                  <div className="text-xs text-white/50 font-medium ml-4">
                    {p.endsAt}
                  </div>
                </div>

                {/* Voting Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-white/60 mb-2">
                    <span>Support: {forPercentage.toFixed(1)}%</span>
                    <span>Total: {fmt(totalVotes)} votes</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500"
                      style={{ width: `${forPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Vote Counts */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-white/80">For</span>
                    <span className="font-semibold text-green-200">
                      {fmt(p.forVotes)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="text-white/80">Against</span>
                    <span className="font-semibold text-red-200">
                      {fmt(p.againstVotes)}
                    </span>
                  </div>
                </div>

                {/* Voting Buttons */}
                {isActive && (
                  <div className="flex gap-3">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium text-sm hover:from-green-400 hover:to-emerald-400 transition-all duration-200 transform hover:scale-[1.02]"
                      onClick={() => vote(p.id, "for")}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Vote For
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/30 bg-white/5 text-white font-medium text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                      onClick={() => vote(p.id, "against")}
                    >
                      <XCircle className="w-4 h-4" />
                      Vote Against
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <Section
        title="Validator / Staking"
        icon={<ShieldCheck className="h-4 w-4" />}
        className="h-auto"
      >
        <div className="space-y-6">
          {/* Staking Stats */}
          <div className="grid gap-4 md:grid-cols-2">
            <Stat
              label="Active Validators"
              value="36"
              icon={<Users className="h-5 w-5" />}
              trend={{ value: "+3", direction: "up" }}
            />
            <Stat
              label="Staked ICX"
              value="12.8M"
              icon={<Wallet className="h-5 w-5" />}
              trend={{ value: "+5.2%", direction: "up" }}
            />
            <Stat
              label="APR"
              value="8.2%"
              icon={<TrendingUp className="h-5 w-5" />}
              trend={{ value: "+0.3%", direction: "up" }}
            />
            <Stat
              label="Slash Events"
              value="0"
              icon={<ShieldCheck className="h-5 w-5" />}
              trend={{ value: "0", direction: "neutral" }}
            />
          </div>

          {/* Network Health */}
          <div className="rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Network className="w-4 h-4" />
              Network Health
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-200">99.8%</div>
                <div className="text-xs text-white/60">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-200">2.1s</div>
                <div className="text-xs text-white/60">Block Time</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-200">847K</div>
                <div className="text-xs text-white/60">Block Height</div>
              </div>
            </div>
          </div>

          {/* Staking Action */}
          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-400 hover:to-purple-400 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25">
            <Wallet className="w-5 h-5" />
            Stake ICX
          </button>
        </div>
      </Section>
    </div>
  );
}
