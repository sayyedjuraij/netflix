"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Play,
  Star,
  ExternalLink,
  Check,
  Plus,
  Film,
  Tv,
  Info,
} from "lucide-react";
import { ContentRecommendation } from "@/types";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  content: ContentRecommendation;
  className?: string;
}

export function ContentCard({ content, className }: ContentCardProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const addToWatchlist = async () => {
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: content.id,
          contentType: content.type,
          title: content.title,
          posterUrl: content.posterUrl,
          platform: content.platforms?.[0],
          genre: content.genres?.[0],
          rating: content.rating,
          year: content.year,
        }),
      });
      if (res.ok) setIsInWatchlist(true);
    } catch (e) {
      console.error("Failed to add to watchlist", e);
    }
  };

  const typeIcon = content.type === "series" ? Tv : Film;

  return (
    <motion.div
      layout
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-background shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {/* Image Area */}
      <div className="relative aspect-[2/3] overflow-hidden bg-accent">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton-shimmer" />
        )}
        <img
          src={
            content.posterUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(content.title)}&background=random&size=256`
          }
          alt={content.title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Type badge */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 rounded-lg bg-black/60 backdrop-blur-md px-2 py-1 text-xs font-medium text-white">
            <typeIcon className="h-3 w-3" />
            {content.type === "series" ? "Series" : content.type === "documentary" ? "Doc" : "Movie"}
          </span>
        </div>

        {/* Rating badge */}
        {content.rating && (
          <div className="absolute top-2 right-2">
            <span className="rounded-lg bg-black/60 backdrop-blur-md px-2 py-1 text-xs font-medium text-white">
              {content.rating}
            </span>
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-md px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-white"
            >
              <Info className="h-3.5 w-3.5" />
              Details
            </button>
            <button
              onClick={addToWatchlist}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition-colors",
                isInWatchlist
                  ? "bg-green-500/90 text-white"
                  : "bg-white/90 text-black hover:bg-white"
              )}
              title={isInWatchlist ? "In watchlist" : "Add to watchlist"}
            >
              {isInWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2 mb-1">
          {content.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          {content.year && <span>{content.year}</span>}
          {content.genres && content.genres.length > 0 && (
            <>
              <span>·</span>
              <span className="line-clamp-1">{content.genres.slice(0, 2).join(", ")}</span>
            </>
          )}
        </div>

        {/* Reason / Match */}
        {content.reason && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 italic">
            "{content.reason}"
          </p>
        )}

        {/* Platforms */}
        <div className="mt-auto flex flex-wrap gap-1">
          {content.platforms?.slice(0, 3).map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center rounded-md bg-accent px-2 py-1 text-[10px] font-medium text-muted-foreground"
            >
              <Play className="mr-1 h-3 w-3" />
              {platform}
            </span>
          ))}
        </div>

        {/* Confidence */}
        {typeof content.confidence === "number" && content.confidence > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-accent">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                style={{ width: `${content.confidence * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground">
              {Math.round(content.confidence * 100)}%
            </span>
          </div>
        )}
      </div>

      {/* Details Modal Overlay */}
      {showDetails && (
        <div className="absolute inset-0 z-20 flex flex-col overflow-y-auto bg-background/95 backdrop-blur-xl p-4 animate-in-scale">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Details</h3>
            <button
              onClick={() => setShowDetails(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {content.overview}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Year</span>
              <span className="font-medium">{content.year || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rating</span>
              <span className="font-medium">{content.rating || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Genres</span>
              <span className="font-medium text-right">{content.genres?.join(", ") || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platforms</span>
              <span className="font-medium text-right">{content.platforms?.join(", ") || "N/A"}</span>
            </div>
          </div>
          <div className="mt-auto pt-4">
            <button
              onClick={addToWatchlist}
              className={cn(
                "w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                isInWatchlist
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
            >
              {isInWatchlist ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved to Watchlist
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4" />
                  Add to Watchlist
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
