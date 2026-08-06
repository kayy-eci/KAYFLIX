"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter();
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === "" || password == "") {
      alert("Form tidak boleh kosong")
      return
    }

    alert(`${email} berhasil login`)
    router.push("/")
    // -- kamu ngecek email dan pw kosong atau gk
    // kalau true return error
    // kalau false alert -> router untuk pindah ke /dashboard
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="relative z-10 w-full max-w-md bg-black/75 px-16 py-14 rounded">
        {/* Logo */}
        <h1 className="text-red-600 text-4xl font-extrabold mb-10 tracking-tight">
          KAYFLIX
        </h1>

        <h2 className="text-white text-3xl font-bold mb-8">
          Sign In
        </h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email or phone number"
            className="w-full bg-zinc-700 text-white placeholder-gray-400 rounded px-4 py-4 outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword
            (e.target.value)}
            className="w-full bg-zinc-700 text-white placeholder-gray-400 rounded px-4 py-4 outline-none focus:ring-2 focus:ring-white"
          />
        {/* <Link href={"/"}> */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 rounded mt-2"
            onClick={handleSubmit}>
            Sign In
          </button>
        {/* </Link> */}

        </form>
    </div>
    </div>
  );
}
