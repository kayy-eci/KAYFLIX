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

export default function Login() {
  const [users, setDataUsers] = useState<User[]>([]);
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Form tidak boleh kosong");
      return;
    }

    const user = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      alert("Email atau password salah");
      return;
    }

    alert(`${email.trim()} berhasil login`);
    localStorage.setItem("kayflixUser", JSON.stringify(user));
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="relative z-10 w-full max-w-md bg-black/75 px-16 py-14 rounded">
        <h1 className="text-red-600 text-4xl font-extrabold mb-10 tracking-tight">KAYFLIX</h1>

        <h2 className="text-white text-3xl font-bold mb-8">Sign In</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <Link href="/register" className="block text-white">
            Don&apos;t have an account? Sign up here
          </Link>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
