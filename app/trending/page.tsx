"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Flame, Loader2, MapPin } from "lucide-react";
import { ContentCard } from "@/components/streaming/ContentCard";
import { TrendingItem } from "@/types";
import { countries } from "@/lib/utils";

export default function TrendingPage() {
  const [country, setCountry] = useState("US");
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrending();
  }, [country]);

  const fetchTrending = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/trending?country=${country}&limit=20`);
      const data = await res.json();
      setTrending(data.trending || []);
    } catch (e) {
      console.error("Trending fetch error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Trending Now</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          See what's popular across free streaming platforms in your country right now.
        </p>
      </motion.div>

      {/* Country Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5" />
          Select Region
        </div>
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => setCountry(c.code)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                country === c.code
                  ? "bg-emerald-600 text-white"
                  : "bg-accent text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{c.flag}</span>
              <span className="hidden sm:inline">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/40 overflow-hidden">
              <div className="aspect-[2/3] skeleton-shimmer" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 skeleton-shimmer rounded" />
                <div className="h-3 w-1/2 skeleton-shimmer rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : trending.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ContentCard
                content={{
                  id: item.contentId,
                  title: item.title,
                  type: item.contentType as any,
                  year: item.year,
                  genres: item.genre,
                  platforms: item.platform,
                  rating: item.rating,
                  overview: item.overview || "",
                  posterUrl: item.posterUrl,
                  confidence: item.score / 10,
                  country: item.country,
                }}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-accent/30 p-12 text-center">
          <Flame className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No trending data available for this region yet.</p>
        </div>
      )}
    </div>
  );
}
