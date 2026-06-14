"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Frown, Loader2, MapPin, Wand2 } from "lucide-react";
import { ContentCard } from "@/components/streaming/ContentCard";
import { ContentRecommendation } from "@/types";
import { moods, countries } from "@/lib/utils";

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState("");
  const [country, setCountry] = useState("US");
  const [results, setResults] = useState<ContentRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleMoodSelect = async (moodId: string) => {
    const mood = moods.find((m) => m.id === moodId);
    if (!mood) return;

    setSelectedMood(moodId);
    setIsLoading(true);
    setHasSearched(true);
    setResults([]);

    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country,
          mood: mood.label,
          prompt: `I want to watch something ${mood.label.toLowerCase()}. Please match this mood perfectly.`,
          save: false,
        }),
      });
      const data = await res.json();
      setResults(data.recommendations || []);
    } catch (e) {
      console.error("Mood search error", e);
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Heart className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Mood Explorer</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Tell us how you feel and we'll match you with the perfect content. Pick a mood, select your country, and let AI do the rest.
        </p>
      </motion.div>

      {/* Country Selector */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5" />
          Your Region
        </div>
        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => setCountry(c.code)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                country === c.code
                  ? "bg-rose-600 text-white"
                  : "bg-accent text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{c.flag}</span>
              <span className="hidden sm:inline">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mood Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
        {moods.map((m) => (
          <button
            key={m.id}
            onClick={() => handleMoodSelect(m.id)}
            disabled={isLoading}
            className={`group relative overflow-hidden rounded-2xl border border-border/40 p-6 text-left transition-all hover:shadow-lg ${
              selectedMood === m.id
                ? "ring-2 ring-rose-500 shadow-lg scale-[1.02]"
                : "hover:scale-[1.01]"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-5 transition-opacity ${selectedMood === m.id ? "opacity-10" : ""}`} />
            <div className="relative">
              <div className="text-3xl mb-3">{m.emoji}</div>
              <h3 className="font-semibold text-sm">{m.label}</h3>
              {selectedMood === m.id && isLoading && (
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Consulting AI...
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Results */}
      <AnimatePresence>
        {hasSearched && !isLoading && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Wand2 className="h-4 w-4 text-rose-500" />
              <h2 className="text-lg font-semibold">
                Matched for: {moods.find((m) => m.id === selectedMood)?.label}
              </h2>
            </div>
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

        {hasSearched && !isLoading && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-border/40 bg-accent/30 p-12 text-center"
          >
            <Frown className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No mood matches found. Try a different mood or region.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
