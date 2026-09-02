"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronDown } from "lucide-react";



interface NavLink {
  label: string;
  href: string;
}

export default function NetflixNavbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "TV Shows", href: "/tv" },
    { label: "Movies", href: "/movies" },
    { label: "New & Popular", href: "/new-and-popular" },
    { label: "My List", href: "/my-list" },
    { label: "Browse by Languages", href: "/browse-by-languages" },
  ];

  const menuItems = [
  { name: "Manage Profiles", href: "/profiles" },
  { name: "Settings", href: "/settings" },
  { name: "Help Center", href: "/help" },
];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-4 transition-colors duration-500 ${
        scrolled ? "bg-black" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="flex items-center gap-8">
        {/* Logo */}
        <span
          className="text-[#e50914] font-black text-2xl md:text-3xl tracking-tight cursor-pointer select-none"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: "-0.5px" }}
        >
          KAYFLIX
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-5 text-sm text-gray-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-gray-400 ${
                    isActive ? "font-semibold text-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile "Browse" dropdown trigger */}
        <button className="flex md:hidden items-center gap-1 text-sm text-gray-200">
          Browse <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-center gap-4 text-white">
        {/* Search */}
        <div className="flex items-center">
          {searchOpen && (
            <input
              autoFocus
              onBlur={() => setSearchOpen(false)}
              type="text"
              placeholder="Titles, people, genres"
              className="bg-black/80 border border-white/40 text-sm text-white placeholder-gray-400 px-2 py-1.5 mr-1 w-36 sm:w-56 outline-none"
            />
          )}
          <Search
            size={20}
            className="cursor-pointer hover:text-gray-300"
            onClick={() => setSearchOpen((v) => !v)}
          />
        </div>

        <span className="hidden sm:inline text-sm cursor-pointer hover:text-gray-300">
          Kids
        </span>

        <Bell size={20} className="cursor-pointer hover:text-gray-300" />

        {/* Profile */}
        <div
          className="relative flex items-center gap-1 cursor-pointer"
          onClick={() => setProfileOpen((v) => !v)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://api.dicebear.com/7.x/shapes/svg?seed=netflix-profile&backgroundType=gradientLinear"
            alt="Profile"
            className="w-8 h-8 rounded-md"
          />
          <ChevronDown
            size={16}
            className={`transition-transform ${profileOpen ? "rotate-180" : ""}`}
          />

          {profileOpen && (
            <div className="absolute top-10 right-0 w-48 bg-black/90 border border-white/10 text-sm text-gray-200 rounded-sm overflow-hidden shadow-xl">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2.5 hover:underline hover:bg-white/10 transition"
                > 
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/10 px-4 py-2.5 hover:underline">
              <Link href="/login">
                Sign out of KayFlix
              </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}