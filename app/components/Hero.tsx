"use client";

import { Play, Info, Megaphone } from "lucide-react";

export interface NetflixHeroProps {
  /** Big stylized title, e.g. "Suzzana Santet: Dosa di Atas Dosa" */
  title: string;
  /** Metadata chips shown under the title, in order, e.g. ["Film", "Horor", "2026", "2j 15m", "18+"] */
  meta: string[];
  /** Background image URL (a still/poster). Falls back to a dark gradient if omitted. */
  backgroundImage?: string;
  /** Optional small badge text, e.g. "Baru Ditambahkan" */
  badgeText?: string;
  /** Optional ranking badge, e.g. "Film No. 2" */
  rankText?: string;
  onPlay?: () => void;
  onMoreInfo?: () => void;
}

export default function NetflixHero({
  title,
  meta,
  backgroundImage,
  badgeText,
  rankText,
  onPlay,
  onMoreInfo,
}: NetflixHeroProps) {
  return (
    <section className="relative mx-4 md:mx-12 mt-4 rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
      {/* 1. Background layer */}
      <div
        className="absolute inset-0"
        style={{
          background: backgroundImage
            ? `url(${backgroundImage}) center/cover no-repeat`
            : "linear-gradient(135deg, #1c1917, #000000)",
        }}
      />

      {/* 2. Gradient overlays — one for bottom fade, one for left-side legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/10 to-transparent" />

      {/* 3. Content, sitting on top of the gradients */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
        <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg max-w-lg mb-3">
          {title}
        </h1>

        <div className="flex items-center gap-2 text-sm md:text-base text-gray-200 mb-5">
          {meta.map((m, i) => (
            <span key={m} className="flex items-center">
              {m}
              {i < meta.length - 1 && <span className="mx-2 text-gray-500">•</span>}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onPlay}
            className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-md hover:bg-white/85 transition-colors"
          >
            <Play size={20} fill="black" />
            Mainkan
          </button>
          <button
            onClick={onMoreInfo}
            className="flex items-center gap-2 bg-gray-500/40 text-white font-semibold px-5 py-2.5 rounded-md hover:bg-gray-500/30 transition-colors backdrop-blur-sm"
          >
            <Info size={20} />
            Informasi Selengkapnya
          </button>
        </div>
      </div>

      {/* 4. Bottom-right badges */}
      {(badgeText || rankText) && (
        <div className="absolute bottom-6 right-6 flex items-center gap-2">
          {badgeText && (
            <span className="flex items-center gap-1.5 bg-black/70 text-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-md backdrop-blur-sm">
              <Megaphone size={14} />
              {badgeText}
            </span>
          )}
          {rankText && (
            <span className="flex items-center gap-1.5 bg-black/70 text-white text-xs md:text-sm font-medium px-3 py-1.5 rounded-md backdrop-blur-sm">
              <span className="bg-[#e50914] text-white text-[10px] font-black px-1.5 py-0.5 rounded leading-none">
                TOP
                <br />
                10
              </span>
              {rankText}
            </span>
          )}
        </div>
      )}
    </section>
  );
}