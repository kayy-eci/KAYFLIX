"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("kayflixUser");
    if (!savedUser) return;

    const currentUser = JSON.parse(savedUser) as User;
    setUser(currentUser);
    setUsername(currentUser.username);
    setEmail(currentUser.email);
    setPassword(currentUser.password);
  }, []);

  async function handleUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (!user || !username.trim() || !email.trim() || !password.trim()) {
      alert("Semua field harus diisi");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), email: email.trim(), password }),
      });
      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = { ...user, username: username.trim(), email: email.trim(), password };
      localStorage.setItem("kayflixUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert("Data akun berhasil diupdate");
    } catch {
      alert("Gagal mengupdate akun. Coba lagi.");
    }
  }

  async function handleDelete() {
    if (!user || !window.confirm("Hapus akun ini?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/users/${user.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete user");
      localStorage.removeItem("kayflixUser");
      alert("Akun berhasil dihapus");
      router.push("/login");
    } catch {
      alert("Gagal menghapus akun. Coba lagi.");
    }
  }

  if (!user) {
    return <main className="min-h-screen bg-slate-950 p-6 pt-28 text-white">Silakan login terlebih dahulu.</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 pt-28 text-white">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"
            className="w-full rounded-lg bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            className="w-full rounded-lg bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            className="w-full rounded-lg bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500" />
          <button className="rounded-lg bg-red-600 px-4 py-2.5 font-semibold hover:bg-red-500">Simpan Perubahan</button>
        </form>
        <button onClick={handleDelete} className="mt-8 rounded-lg border border-red-500 px-4 py-2.5 text-red-400 hover:bg-red-500 hover:text-white">
          Hapus Akun
        </button>
      </div>
    </main>
  );
}
