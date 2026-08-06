"use client";

import { useState } from "react";
import { Play, Plus, ThumbsUp, ChevronDown, Check } from "lucide-react";

export interface NetflixCardProps {
  /** Title of the show/movie */
  title: string;
  /** Poster image URL. Omit to use a generated gradient placeholder. */
  image?: string;
  /** Percent match, e.g. 97 */
  match?: number;
  /** Release year */
  year?: string | number;
  /** Content rating, e.g. "16+" */
  rating?: string;
  /** e.g. "2h 14m" or "3 Seasons" */
  duration?: string;
  /** e.g. ["Thriller", "Suspenseful", "Dark"] */
  genres?: string[];
  /** Gradient placeholder start color (used when `image` is not provided) */
  gradientFrom?: string;
  /** Gradient placeholder end color (used when `image` is not provided) */
  gradientTo?: string;
  /** Initial "in my list" state */
  inList?: boolean;
}


export default function NetflixCard({
  title = "Untitled",
  image,
  match = 92,
  year = 2024,
  rating = "16+",
  duration = "1h 45m",
  genres = ["Drama", "Suspenseful"],
  gradientFrom = "#3b0764",
  gradientTo = "#0f172a",
  inList: initialInList = false,
}: NetflixCardProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [inList, setInList] = useState<boolean>(initialInList);
  const [liked, setLiked] = useState<boolean>(false);

  const background = image
    ? `url(${image}) center/cover no-repeat`
    : `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`;

  return (
    <div
      className="relative w-56 shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ zIndex: hovered ? 30 : 1 }}
    >
      {/* Base poster */}
      <div
        className={`relative w-56 h-32 rounded-sm overflow-hidden transition-all duration-300 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
        style={{ background }}
      >
        {!image && (
          <span className="absolute inset-0 flex items-center justify-center text-white/90 font-semibold text-sm px-3 text-center">
            {title}
          </span>
        )}
      </div>

      {/* Expanded hover card */}
      <div
        className={`absolute top-0 left-0 w-56 rounded-sm bg-[#181818] shadow-2xl transition-all duration-300 origin-top-left ${
          hovered
            ? "opacity-100 scale-110 -translate-y-6 pointer-events-auto"
            : "opacity-0 scale-100 pointer-events-none"
        }`}
      >
        <div className="w-full h-32 rounded-t-sm overflow-hidden" style={{ background }}>
          {!image && (
            <span className="w-full h-full flex items-center justify-center text-white/90 font-semibold text-sm px-3 text-center">
              {title}
            </span>
          )}
        </div>

        <div className="p-3 text-white">
          <div className="flex items-center gap-2 mb-2">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Play size={16} fill="black" className="text-black ml-0.5" />
            </button>
            <button
              onClick={() => setInList((v) => !v)}
              className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors"
            >
              {inList ? <Check size={16} /> : <Plus size={16} />}
            </button>
            <button
              onClick={() => setLiked((v) => !v)}
              className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors"
            >
              <ThumbsUp size={14} fill={liked ? "white" : "none"} />
            </button>
            <button className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors ml-auto">
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs mb-1.5">
            <span className="text-green-500 font-semibold">{match}% Match</span>
            <span className="border border-gray-500 px-1 text-[10px] text-gray-300">
              {rating}
            </span>
            <span className="text-gray-300">{year}</span>
          </div>

          <div className="text-xs text-gray-300 mb-1.5">{duration}</div>

          <div className="flex flex-wrap items-center gap-1 text-[11px] text-gray-300">
            {genres.map((g, i) => (
              <span key={g} className="flex items-center">
                {g}
                {i < genres.length - 1 && <span className="mx-1.5 text-gray-500">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}