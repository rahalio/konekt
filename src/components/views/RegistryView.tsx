import { useMemo, useState } from "react";
import {
  Store,
  Search,
  ExternalLink,
  Star,
  Download,
  Users,
  Shield,
  Zap,
  TrendingUp,
  Filter,
} from "lucide-react";
import { DAPPS } from "../../constants";
import { Badge } from "../ui";

export function RegistryView() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get all unique categories from DAPPS
  const categories = useMemo(() => {
    const allTags = DAPPS.flatMap((d) => d.tags);
    return ["all", ...Array.from(new Set(allTags))];
  }, []);

  const items = useMemo(
    () =>
      DAPPS.filter((d) => {
        const matchesQuery =
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.tags.some((t) => t.includes(query.toLowerCase()));
        const matchesCategory =
          selectedCategory === "all" || d.tags.includes(selectedCategory);
        return matchesQuery && matchesCategory;
      }),
    [query, selectedCategory]
  );

  // Enhanced DApp data with additional UI properties
  const enhancedDApps = useMemo(
    () =>
      items.map((d) => ({
        ...d,
        icon: d.id === "dex" ? Zap : d.id === "bridge" ? Shield : TrendingUp,
        description:
          d.id === "dex"
            ? "Decentralized exchange for cross-chain token swaps"
            : d.id === "bridge"
            ? "Secure cross-chain asset transfers via BTP"
            : "Earn yield on your LP tokens and assets",
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        downloads: Math.floor(Math.random() * 10000) + 1000,
        verified: true,
      })),
    [items]
  );

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      swap: "bg-blue-500/20 text-blue-200 border-blue-400/30",
      amm: "bg-purple-500/20 text-purple-200 border-purple-400/30",
      icx: "bg-green-500/20 text-green-200 border-green-400/30",
      btp: "bg-orange-500/20 text-orange-200 border-orange-400/30",
      bridge: "bg-indigo-500/20 text-indigo-200 border-indigo-400/30",
      yield: "bg-yellow-500/20 text-yellow-200 border-yellow-400/30",
      lp: "bg-pink-500/20 text-pink-200 border-pink-400/30",
    };
    return colors[tag] || "bg-gray-500/20 text-gray-200 border-gray-400/30";
  };

  return (
    <div className="space-y-8">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30">
            <Store className="h-6 w-6 text-purple-200" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              DApp Registry
            </h1>
            <p className="text-sm text-white/60">
              Discover and deploy decentralized applications
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            placeholder="Search DApps..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/30 transition-all duration-200"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        <div className="flex items-center gap-3 text-sm text-white/60 flex-shrink-0">
          <Filter className="h-4 w-4" />
          <span>Categories:</span>
        </div>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === category
                ? "bg-blue-500/30 text-blue-200 border border-blue-400/50"
                : "bg-white/5 text-white/70 border border-white/20 hover:bg-white/10 hover:text-white/90"
            }`}
          >
            {category === "all"
              ? "All"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* DApp Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {enhancedDApps.map((d) => {
          const IconComponent = d.icon;
          return (
            <div
              key={d.id}
              className="group flex flex-col h-full rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm hover:from-white/15 hover:to-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30">
                    <IconComponent className="h-5 w-5 text-blue-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white flex items-center gap-2 mb-1">
                      {d.name}
                      {d.verified && (
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-green-400" />
                        </div>
                      )}
                    </h3>
                    <p className="text-xs text-white/60">by {d.owner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-yellow-300">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{d.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 mb-5 leading-relaxed flex-grow">
                {d.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {d.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className={`text-xs font-medium ${getTagColor(tag)}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-white/60 mb-5">
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{d.downloads.toLocaleString()} installs</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>
                    {Math.floor(d.downloads * 0.1).toLocaleString()} users
                  </span>
                </div>
              </div>

              {/* CID */}
              <div className="text-xs text-white/40 mb-6 font-mono">
                CID: {d.cid}
              </div>

              {/* Actions - pushed to bottom */}
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm hover:from-blue-400 hover:to-purple-400 transition-all duration-200 transform hover:scale-[1.02]">
                  <Download className="h-4 w-4" />
                  Install
                </button>
                <button className="px-3 py-3 rounded-lg border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 transition-all duration-200">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {enhancedDApps.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="h-10 w-10 text-white/40" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            No DApps Found
          </h3>
          <p className="text-white/60 max-w-sm mx-auto">
            Try adjusting your search or filter criteria to discover more
            applications
          </p>
        </div>
      )}
    </div>
  );
}
