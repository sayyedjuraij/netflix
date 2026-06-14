import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
];

export const genres = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi",
  "Thriller", "War", "Western", "Musical", "History", "Biography", "Sport",
];

export const moods = [
  { id: "chill", label: "Chill & Relaxing", emoji: "🧘", color: "from-teal-500 to-emerald-500" },
  { id: "excited", label: "Excited & Energetic", emoji: "⚡", color: "from-yellow-500 to-orange-500" },
  { id: "romantic", label: "Romantic & Lovely", emoji: "💕", color: "from-pink-500 to-rose-500" },
  { id: "dark", label: "Dark & Mysterious", emoji: "🌑", color: "from-slate-600 to-gray-800" },
  { id: "funny", label: "Funny & Lighthearted", emoji: "😂", color: "from-amber-400 to-yellow-500" },
  { id: "thrilling", label: "Thrilling & Suspenseful", emoji: "🎢", color: "from-red-600 to-rose-700" },
  { id: "mindbending", label: "Mind-Bending", emoji: "🧠", color: "from-violet-600 to-purple-700" },
  { id: "inspirational", label: "Inspirational", emoji: "🌟", color: "from-sky-500 to-blue-600" },
  { id: "nostalgic", label: "Nostalgic", emoji: "📼", color: "from-stone-500 to-stone-700" },
  { id: "scary", label: "Scary & Horror", emoji: "👻", color: "from-gray-900 to-black" },
];

export const freePlatforms = [
  { name: "Tubi", url: "https://tubi.tv", regions: ["US", "CA", "AU", "MX"] },
  { name: "Pluto TV", url: "https://pluto.tv", regions: ["US", "GB", "CA", "DE", "ES"] },
  { name: "Crackle", url: "https://crackle.com", regions: ["US", "CA", "AU"] },
  { name: "Roku Channel", url: "https://therokuchannel.roku.com", regions: ["US", "CA", "GB", "MX"] },
  { name: "Plex", url: "https://plex.tv", regions: ["US", "GB", "CA", "AU", "DE"] },
  { name: "Freevee", url: "https://amazon.com/freevee", regions: ["US", "GB", "DE"] },
  { name: "Peacock Free", url: "https://peacocktv.com", regions: ["US"] },
  { name: "Kanopy", url: "https://kanopy.com", regions: ["US", "CA", "AU", "GB"] },
  { name: "hoopla", url: "https://hoopladigital.com", regions: ["US", "CA", "AU"] },
  { name: "Vudu Free", url: "https://vudu.com", regions: ["US", "MX"] },
  { name: "Redbox Free", url: "https://redbox.com", regions: ["US"] },
  { name: "Popcornflix", url: "https://popcornflix.com", regions: ["US", "CA"] },
  { name: "BBC iPlayer", url: "https://bbc.co.uk/iplayer", regions: ["GB"] },
  { name: "All 4", url: "https://channel4.com", regions: ["GB"] },
  { name: "9Now", url: "https://9now.com.au", regions: ["AU"] },
  { name: "7plus", url: "https://7plus.com.au", regions: ["AU"] },
  { name: "Zee5", url: "https://zee5.com", regions: ["IN"] },
  { name: "MX Player", url: "https://mxplayer.in", regions: ["IN"] },
];
