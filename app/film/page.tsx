"use client";

import { useState, useEffect } from "react";

interface Film {
  id: number;
  title: string;
  year: number;
  rating: string;
  duration: string;
  genres: string;
}

export default function MovieList() {
  const [films, setDataFilms] = useState<Film[]>([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [genres, setGenres] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFilm() {
      try {
        const response = await fetch("http://localhost:8000/api/movies");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const responseJson = await response.json();

        setDataFilms(responseJson.data ?? []);
      } catch {
        setDataFilms([]);
      }
    }

    fetchFilm();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !title.trim() ||
      !year ||
      !rating ||
      !duration.trim() ||
      !genres.trim()
    ) {
      alert("Semua field harus diisi");
      return;
    }

    try {
      const response = await fetch(
        editingId
          ? `http://localhost:8000/api/movies/${editingId}`
          : "http://localhost:8000/api/movies",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            year: Number(year),
            rating,
            duration: duration.trim(),
            genres: genres.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }

      const responseJson = await response.json();

      const createdMovie = responseJson.data ?? {
        title: title.trim(),
        year: Number(year),
        rating,
        duration: duration.trim(),
        genres: genres.trim(),
      };

      if (editingId) {
        setDataFilms((prevFilms) => prevFilms.map((film) =>
          film.id === editingId
            ? { ...film, title: createdMovie.title, year: createdMovie.year, rating: createdMovie.rating, duration: createdMovie.duration, genres: createdMovie.genres }
            : film
        ));
      } else {
        setDataFilms((prevFilms) => [...prevFilms, {
          ...createdMovie,
          id: createdMovie.id ?? responseJson.data?.moviesId,
        }]);
      }

      setTitle("");
      setYear("");
      setRating("");
      setDuration("");
      setGenres("");

      setShowForm(false);
      setEditingId(null);

      alert(editingId ? "Data film berhasil diupdate" : `${title.trim()} berhasil ditambahkan`);
    } catch {
      alert("Gagal menambahkan film. Coba lagi.");
    }
  }

  function handleEdit(film: Film) {
    setEditingId(film.id);
    setTitle(film.title);
    setYear(String(film.year));
    setRating(film.rating);
    setDuration(film.duration);
    setGenres(film.genres);
    setShowForm(true);
  }

  async function handleDelete(id: number, movieTitle: string) {
    if (!window.confirm(`Hapus film "${movieTitle}"?`)) return;

    try {
      const response = await fetch(`http://localhost:8000/api/movies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete movie");
      setDataFilms((prevFilms) => prevFilms.filter((film) => film.id !== id));
      alert(`${movieTitle} berhasil dihapus`);
    } catch {
      alert("Gagal menghapus film. Coba lagi.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-6xl pt-24">

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-red-400">
              Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Film List
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-500"
          >
            {showForm ? "Batal" : "Add Film"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-red-950/20 md:grid-cols-2"
          >

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Judul Film
              </label>

              <input
                type="text"
                value={title}
                placeholder="Masukkan judul film"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-slate-900 px-4 py-3 text-white placeholder:text-gray-400 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Tahun
              </label>

              <input
                type="number"
                value={year}
                placeholder="2025"
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-slate-900 px-4 py-3 text-white placeholder:text-gray-400 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-slate-900 px-4 py-3 text-white focus:border-red-500 focus:outline-none"
              >
                <option value="">Pilih rating</option>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                  (value) => (
                    <option
                      key={value}
                      value={String(value)}
                    >
                      {value}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Durasi
              </label>

              <input
                type="text"
                value={duration}
                placeholder="2h 15m"
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-slate-900 px-4 py-3 text-white placeholder:text-gray-400 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">
                Genres
              </label>

              <input
                type="text"
                value={genres}
                placeholder="Action, Drama"
                onChange={(e) => setGenres(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-slate-900 px-4 py-3 text-white placeholder:text-gray-400 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 md:col-span-2">

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="rounded-lg border border-gray-600 px-4 py-2.5 font-medium text-gray-200 transition hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-500"
              >
                {editingId ? "Update Film" : "Simpan Film"}
              </button>

            </div>
          </form>
        )}

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm text-gray-200">

              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-4 py-3">Nomor</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Genres</th>
                  <th className="px-4 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800 bg-slate-900">

                {films.map((item, index) => (
                  <tr
                    key={item.id ?? index}
                    className="transition hover:bg-slate-800/80"
                  >
                    <td className="px-4 py-3">
                      {index + 1}
                    </td>

                    <td className="px-4 py-3 font-medium text-white">
                      {item.title}
                    </td>

                    <td className="px-4 py-3">
                      {item.year}
                    </td>

                    <td className="px-4 py-3">
                      {item.rating}
                    </td>

                    <td className="px-4 py-3">
                      {item.duration}
                    </td>

                    <td className="px-4 py-3">
                      {item.genres}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">

                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600"
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </div>

      </div>
    </div>
  );
}