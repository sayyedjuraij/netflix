"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Loader2,
  Wand2,
  MapPin,
  Clapperboard,
  Frown,
  X,
} from "lucide-react";
import { countries, genres, moods } from "@/lib/utils";
import { ContentRecommendation } from "@/types";
import { ContentCard } from "@/components/streaming/ContentCard";

export function AISearchAssistant() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("US");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ContentRecommendation[]>([]);
  const [reasoning, setReasoning] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleGenreToggle = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g].slice(0, 3)
    );
  };

  const handleSearch = async () => {
    if (!query.trim() && !selectedMood && selectedGenres.length === 0) {
      setError("Please enter a request, select a mood, or pick at least one genre.");
      return;
    }
    setError("");
    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country,
          mood: selectedMood || undefined,
          genres: selectedGenres.length > 0 ? selectedGenres : undefined,
          prompt: query.trim() || undefined,
          save: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get recommendations");
      }

      setResults(data.recommendations || []);
      setReasoning(data.reasoning || "");
      setConfidence(data.confidence || 0);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasSearched) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [results, error, hasSearched]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl border border-border/40 bg-gradient-to-b from-accent/50 to-background p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Wand2 className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold">AI Streaming Assistant</h2>
        </div>

        {/* Country Selector */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5" />
            Your Country
          </label>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  country === c.code
                    ? "bg-indigo-600 text-white"
                    : "bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{c.flag}</span>
                <span className="hidden sm:inline">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Selector */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Frown className="h-3.5 w-3.5" />
            Mood (optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMood(selectedMood === m.id ? "" : m.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                  selectedMood === m.id
                    ? `bg-gradient-to-r ${m.color} text-white shadow-md`
                    : "bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{m.emoji}</span>
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Genre Selector */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Clapperboard className="h-3.5 w-3.5" />
            Genres (up to 3)
          </label>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => handleGenreToggle(g)}
                className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedGenres.includes(g)
                    ? "bg-indigo-600 text-white"
                    : "bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Natural Language Input */}
        <div className="relative mb-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you want to watch... e.g., 'Something like Inception but less confusing' or 'A feel-good comedy for a bad day'"
            className="w-full min-h-[100px] rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            maxLength={500}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {query.length}/500
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-center gap-2"
            >
              <X className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Consulting AI...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Get Recommendations
            </>
          )}
        </button>

        {/* Reasoning */}
        <AnimatePresence>
          {reasoning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 px-4 py-3 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2 mb-1">
                <Wand2 className="h-3.5 w-3.5 text-indigo-500" />
                <span className="font-medium text-foreground">AI Reasoning</span>
                <span className="ml-auto text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                  {Math.round(confidence * 100)}% confidence
                </span>
              </div>
              {reasoning}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <AnimatePresence>
        {hasSearched && !isLoading && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold mb-4">
              Recommended for you
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((rec, i) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ContentCard content={rec} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {hasSearched && !isLoading && results.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 rounded-2xl border border-border/40 bg-accent/30 p-8 text-center"
          >
            <Frown className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              No recommendations found. Try adjusting your mood, genres, or description.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  );
}
