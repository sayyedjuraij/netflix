"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  Settings,
  User,
  Palette,
  Globe,
  Loader2,
  Save,
  Check,
  Moon,
  Sun,
  Clapperboard,
} from "lucide-react";
import { genres, countries } from "@/lib/utils";
import { UserProfile, UserPreferences } from "@/types";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    preferredGenres: [],
    darkMode: true,
    region: "US",
    language: "en",
  });

  useEffect(() => {
    if (status === "unauthenticated") redirect("/login");
    if (status === "authenticated") loadSettings();
  }, [status]);

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.profile) setProfile(data.profile);
      if (data.preferences) {
        setPreferences(data.preferences);
        if (data.preferences.darkMode !== undefined) {
          setTheme(data.preferences.darkMode ? "dark" : "light");
        }
      }
    } catch (e) {
      console.error("Settings load error", e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "profile", data: profile }),
      });

      await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "preferences",
          data: {
            ...preferences,
            darkMode: theme === "dark",
          },
        }),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      update(); // Refresh session
    } catch (e) {
      console.error("Save error", e);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleGenre = (g: string) => {
    setPreferences((prev) => {
      const current = prev.preferredGenres || [];
      const next = current.includes(g)
        ? current.filter((x) => x !== g)
        : [...current, g].slice(0, 5);
      return { ...prev, preferredGenres: next };
    });
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-400">
              <Settings className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <Check className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saved ? "Saved!" : isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="space-y-8">
          {/* Profile */}
          <section className="rounded-2xl border border-border/40 bg-accent/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Profile</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profile.username || ""}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  placeholder={session.user.name || "Username"}
                  className="w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Country
                </label>
                <select
                  value={profile.country || "US"}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Bio
                </label>
                <textarea
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us a bit about your taste..."
                  maxLength={500}
                  rows={3}
                  className="w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                />
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section className="rounded-2xl border border-border/40 bg-accent/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Appearance</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  theme === "light"
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-600"
                    : "border-border/40 bg-background hover:bg-accent"
                }`}
              >
                <Sun className="h-4 w-4" />
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  theme === "dark"
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-600"
                    : "border-border/40 bg-background hover:bg-accent"
                }`}
              >
                <Moon className="h-4 w-4" />
                Dark
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  theme === "system"
                    ? "border-indigo-500 bg-indigo-500/10 text-indigo-600"
                    : "border-border/40 bg-background hover:bg-accent"
                }`}
              >
                <Globe className="h-4 w-4" />
                System
              </button>
            </div>
          </section>

          {/* Preferences */}
          <section className="rounded-2xl border border-border/40 bg-accent/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clapperboard className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Content Preferences</h2>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Preferred Genres (up to 5)
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      (preferences.preferredGenres || []).includes(g)
                        ? "bg-indigo-600 text-white"
                        : "bg-background border border-border/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Language
                </label>
                <select
                  value={preferences.language || "en"}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                  className="w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                  <option value="hi">Hindi</option>
                  <option value="ar">Arabic</option>
                  <option value="pt">Portuguese</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                  Default Region
                </label>
                <select
                  value={preferences.region || "US"}
                  onChange={(e) =>
                    setPreferences({ ...preferences, region: e.target.value })
                  }
                  className="w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
