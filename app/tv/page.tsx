"use client";

import NetflixCard, { type NetflixCardProps } from "../components/Cards";
import NetflixHero from "../components/Hero";

const ROW: NetflixCardProps[] = [
  {
    title: "Crimson Static",
    match: 97,
    year: 2024,
    rating: "16+",
    duration: "2h 4m",
    genres: ["Thriller", "Suspenseful"],
    gradientFrom: "#7f1d1d",
    gradientTo: "#1c1917",
  },
  {
    title: "Neon Harbor",
    match: 88,
    year: 2023,
    rating: "18+",
    duration: "3 Seasons",
    genres: ["Crime", "Dark"],
    gradientFrom: "#0e7490",
    gradientTo: "#082f49",
  },
  {
    title: "The Last Signal",
    match: 93,
    year: 2022,
    rating: "13+",
    duration: "1h 58m",
    genres: ["Sci-Fi", "Mind-bending"],
    gradientFrom: "#4c1d95",
    gradientTo: "#1e1b4b",
  },
  {
    title: "Paper Moths",
    match: 81,
    year: 2024,
    rating: "16+",
    duration: "2 Seasons",
    genres: ["Drama", "Romantic"],
    gradientFrom: "#9a3412",
    gradientTo: "#1c1917",
  },
  {
    title: "Glass",
    match: 90,
    year: 2021,
    rating: "16+",
    duration: "1h 47m",
    genres: ["Mystery", "Suspenseful"],
    gradientFrom: "#065f46",
    gradientTo: "#022c22",
  },
  {
    title: "Moths",
    match: 81,
    year: 2024,
    rating: "16+",
    duration: "2 Seasons",
    genres: ["Drama", "Romantic"],
    gradientFrom: "#9a3412",
    gradientTo: "#1c1917",
  },
  {
    title: "Glard",
    match: 90,
    year: 2021,
    rating: "16+",
    duration: "1h 47m",
    genres: ["Mystery", "Suspenseful"],
    gradientFrom: "#065f46",
    gradientTo: "#022c22",
  },
];

export default function NetflixDemo() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="pt-24 px-4 md:px-12 pb-20">
        <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
          Popular on Kayflix
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-hidden">
          {ROW.map((item) => (
            <NetflixCard key={item.title} {...item} />
          ))}
        </div>
        <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
          Recommended for you
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-hidden">
          {ROW.map((item) => (
            <NetflixCard key={item.title} {...item} />
          ))}
        </div>
        <h2 className="text-white text-lg md:text-xl font-semibold mb-4">
          My List
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-y-hidden">
          {ROW.map((item) => (
            <NetflixCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
