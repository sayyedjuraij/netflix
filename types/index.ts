export interface ContentRecommendation {
  id: string;
  title: string;
  type: "movie" | "series" | "documentary";
  year?: number;
  genres: string[];
  platforms: string[];
  rating?: string;
  overview: string;
  posterUrl?: string;
  backdropUrl?: string;
  confidence?: number;
  reason?: string;
  country?: string;
}

export interface AIRecommendationResponse {
  recommendations: ContentRecommendation[];
  platforms: { name: string; url: string; available: boolean }[];
  reasoning: string;
  confidence: number;
  moodMatch?: string;
}

export interface WatchlistItem {
  id: string;
  contentId: string;
  contentType: string;
  title: string;
  posterUrl?: string;
  platform?: string;
  genre?: string;
  rating?: string;
  year?: number;
  notes?: string;
  watched: boolean;
  priority: number;
  createdAt: string;
}

export interface TrendingItem {
  id: string;
  contentId: string;
  contentType: string;
  title: string;
  overview?: string;
  posterUrl?: string;
  backdropUrl?: string;
  genre: string[];
  platform: string[];
  rating?: string;
  year?: number;
  score: number;
}

export interface SavedSearch {
  id: string;
  name?: string;
  query: string;
  filters?: Record<string, unknown>;
  country?: string;
  mood?: string;
  genres: string[];
  resultCount?: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  username?: string;
  bio?: string;
  country: string;
  timezone: string;
  language: string;
  avatarUrl?: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  preferredGenres: string[];
  preferredPlatforms: string[];
  contentRatings: string[];
  emailNotifications: boolean;
  darkMode: boolean;
  autoplayTrailers: boolean;
  language: string;
  region: string;
}
