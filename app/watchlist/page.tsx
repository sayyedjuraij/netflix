"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Eye,
  EyeOff,
  Trash2,
  Loader2,
  Bookmark,
  ArrowRight,
  Plus,
} from "lucide-react";
import { WatchlistItem } from "@/types";
import Link from "next/link";

export default function WatchlistPage() {
  const { data: session, status } = useSession();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "watched" | "unwatched">("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
    if (status === "authenticated") {
      fetchWatchlist();
    }
  }, [status]);

  const fetchWatchlist = async () => {
    try {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      setWatchlist(data.watchlist || []);
    } catch (e) {
      console.error("Watchlist fetch error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWatched = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/watchlist?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watched: !current }),
      });
      if (res.ok) {
        setWatchlist((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, watched: !current } : item
          )
        );
      }
    } catch (e) {
      console.error("Toggle error", e);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const res = await fetch(`/api/watchlist?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setWatchlist((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (e) {
      console.error("Delete error", e);
    }
  };

  const filtered = watchlist.filter((item) => {
    if (filter === "watched") return item.watched;
    if (filter === "unwatched") return !item.watched;
    return true;
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Bookmark className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Your Watchlist</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Track everything you want to watch across free streaming platforms. Mark watched items to keep your list organized.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {(
          [
            { key: "all", label: "All", count: watchlist.length },
            { key: "unwatched", label: "To Watch", count: watchlist.filter((w) => !w.watched).length },
            { key: "watched", label: "Watched", count: watchlist.filter((w) => w.watched).length },
          ] as const
        ).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-rose-600 text-white"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
            <span className="text-xs opacity-80">({f.count})</span>
          </button>
        ))}
        <Link
          href="/discover"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add More
        </Link>
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex items-center gap-4 rounded-xl border border-border/40 bg-background p-4 transition-all hover:border-border/80"
              >
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-accent">
                  {item.posterUrl ? (
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <Bookmark className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold text-sm truncate ${item.watched ? "text-muted-foreground line-through" : ""}`}>
                      {item.title}
                    </h3>
                    {item.year && (
                      <span className="text-xs text-muted-foreground">({item.year})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    {item.platform && (
                      <span className="rounded-md bg-accent px-1.5 py-0.5">{item.platform}</span>
                    )}
                    {item.genre && (
                      <span className="rounded-md bg-accent px-1.5 py-0.5">{item.genre}</span>
                    )}
                    {item.rating && (
                      <span className="rounded-md bg-accent px-1.5 py-0.5">{item.rating}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWatched(item.id, item.watched)}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      item.watched
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                        : "bg-accent text-muted-foreground hover:text-foreground"
                    }`}
                    title={item.watched ? "Mark unwatched" : "Mark watched"}
                  >
                    {item.watched ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-accent/30 p-12 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-muted-foreground mb-4">
            {filter === "all"
              ? "Your watchlist is empty. Start discovering content to add here!"
              : filter === "watched"
              ? "You haven't marked anything as watched yet."
              : "All caught up! You've watched everything on your list."}
          </p>
          <Link
            href="/discover"
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
          >
            Discover content <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
