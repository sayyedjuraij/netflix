"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Film,
  Sparkles,
  Globe,
  Heart,
  TrendingUp,
  Search,
  ArrowRight,
  Play,
  Shield,
  Zap,
} from "lucide-react";
import { AISearchAssistant } from "@/components/ai/AISearchAssistant";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Discovery",
    description:
      "Describe what you want to watch in natural language. Our AI finds perfect matches across free platforms.",
  },
  {
    icon: Globe,
    title: "Country-Specific",
    description:
      "See what's actually available for free and legal streaming in your country right now.",
  },
  {
    icon: Heart,
    title: "Mood Matching",
    description:
      "Feeling nostalgic? Need a thrill? Pick a mood and get curated recommendations instantly.",
  },
  {
    icon: TrendingUp,
    title: "Trending & Gems",
    description:
      "Explore trending content and hidden gems you won't find on mainstream recommendation engines.",
  },
  {
    icon: Shield,
    title: "100% Legal & Free",
    description:
      "We only recommend content on legitimate, ad-supported free platforms and free tiers.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on modern web tech for instant loading, smooth animations, and a premium experience.",
  },
];

const platforms = [
  "Tubi", "Pluto TV", "Plex", "Freevee", "Crackle", "Roku Channel",
  "BBC iPlayer", "All 4", "Kanopy", "MX Player", "Popcornflix", "7plus",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
        <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              AI-Powered Streaming Discovery
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Find the best{" "}
              <span className="gradient-text">free streaming</span>
              <br />
              content for you
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto text-balance">
              StreamNavigator uses AI to discover movies, series, and documentaries
              available legally and for free in your country.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105"
              >
                <Search className="h-4 w-4" />
                Start Discovering
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/trending"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent/80"
              >
                <Play className="h-4 w-4" />
                Browse Trending
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Assistant Teaser */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <AISearchAssistant />
      </section>

      {/* Features */}
      <section className="border-y border-border/40 bg-accent/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to find your next watch
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for modern viewers who want curated, free content without subscription fatigue.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/40 bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Supported Free Platforms
          </h2>
          <p className="mt-4 text-muted-foreground">
            We scan the best free, ad-supported streaming services globally.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {platforms.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center rounded-lg border border-border/40 bg-accent px-4 py-2 text-sm font-medium text-muted-foreground"
            >
              <Film className="mr-2 h-3.5 w-3.5 text-indigo-500" />
              {platform}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/40">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
            Ready to stop scrolling?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join thousands of viewers who use StreamNavigator to find their next favorite movie or show in seconds.
          </p>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
