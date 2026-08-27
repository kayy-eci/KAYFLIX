"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [users, setDataUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("http://localhost:8000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const responseJson = await response.json();
        setDataUsers(responseJson.data ?? []);
      } catch {
        setDataUsers([]);
      }
    }

    fetchUser();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Form tidak boleh kosong");
      return;
    }

    const clearEmail = email.trim().toLowerCase();
    const existingUser = users.some((user) => user.email.toLowerCase() === clearEmail);

    if (existingUser) {
      alert("Email sudah terdaftar");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: clearEmail,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const responseJson = await response.json();
      const createdUser = responseJson.data ?? {
        username: username.trim(),
        email: clearEmail,
        password,
      };

      setDataUsers((prevUsers) => [...prevUsers, createdUser]);
      alert(`${username.trim()} berhasil mendaftar`);
      router.push("/login");
    } catch {
      alert("Gagal mendaftar. Coba lagi.");
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="relative z-10 w-full max-w-md bg-black/75 px-16 py-14 rounded">
        <h1 className="text-red-600 text-4xl font-extrabold mb-10 tracking-tight">KAYFLIX</h1>

        <h2 className="text-white text-3xl font-bold mb-8">Sign up</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            className="w-full bg-zinc-700 text-white placeholder-gray-400 rounded px-4 py-4 outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="Email or phone number"
            className="w-full bg-zinc-700 text-white placeholder-gray-400 rounded px-4 py-4 outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-700 text-white placeholder-gray-400 rounded px-4 py-4 outline-none focus:ring-2 focus:ring-white"
          />

          <Link href="/login" className="block text-white">
            Already have an account? Sign in here
          </Link>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded mt-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
