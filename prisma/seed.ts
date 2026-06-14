import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mockTrending = [
  { title: "The Dark Knight", year: 2008, genre: ["Action", "Crime", "Drama"], score: 9.5, contentType: "movie", country: "US" },
  { title: "Inception", year: 2010, genre: ["Action", "Sci-Fi", "Thriller"], score: 9.3, contentType: "movie", country: "US" },
  { title: "Breaking Bad", year: 2008, genre: ["Drama", "Crime", "Thriller"], score: 9.8, contentType: "series", country: "US" },
  { title: "The Office", year: 2005, genre: ["Comedy"], score: 8.9, contentType: "series", country: "US" },
  { title: "Parasite", year: 2019, genre: ["Thriller", "Drama", "Comedy"], score: 9.2, contentType: "movie", country: "US" },
  { title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Drama", "Adventure"], score: 9.0, contentType: "movie", country: "US" },
  { title: "Peaky Blinders", year: 2013, genre: ["Crime", "Drama"], score: 8.8, contentType: "series", country: "GB" },
  { title: "Downton Abbey", year: 2010, genre: ["Drama", "Romance"], score: 8.7, contentType: "series", country: "GB" },
  { title: "Everything Everywhere All At Once", year: 2022, genre: ["Comedy", "Adventure", "Sci-Fi"], score: 9.1, contentType: "movie", country: "US" },
  { title: "Succession", year: 2018, genre: ["Drama"], score: 9.3, contentType: "series", country: "US" },
];

async function main() {
  for (const item of mockTrending) {
    await prisma.trendingContent.upsert({
      where: { contentId: `seed-${item.title.toLowerCase().replace(/\s+/g, "-")}` },
      create: {
        contentId: `seed-${item.title.toLowerCase().replace(/\s+/g, "-")}`,
        contentType: item.contentType,
        title: item.title,
        overview: `A critically acclaimed ${item.contentType} available on free streaming platforms.`,
        posterUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&background=random&size=512`,
        genre: item.genre,
        platform: ["Tubi", "Pluto TV", "Plex"],
        rating: ["PG-13", "R", "TV-MA", "PG", "TV-14"][Math.floor(Math.random() * 5)],
        year: item.year,
        country: item.country,
        score: item.score,
      },
      update: {},
    });
  }
  console.log("Seeded trending content.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
