"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Film, Github, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuth = (provider: string) => {
    setIsLoading(provider);
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <Film className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Stream<span className="gradient-text">Navigator</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to save watchlists, get personalized recommendations, and track your history.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleOAuth("github")}
            disabled={!!isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border/40 bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
          >
            {isLoading === "github" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Github className="h-4 w-4" />
            )}
            Continue with GitHub
          </button>

          <button
            onClick={() => handleOAuth("google")}
            disabled={!!isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border/40 bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
          >
            {isLoading === "google" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="h-3 w-3 rotate-180" />
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
