"use client";

import { useEffect, useState } from "react";

interface Film {
    title: string;
    year: number;
    rating: string;
    duration: string;
    genres: string[];
}

export default function MovieList() {
    const [dataFilm, setDataFilm] = useState<Film[]>([]);

    useEffect(() => {
        async function fetchFilm() {
            const response = await fetch("http://localhost:8000/api/movie");

            const responseJson = await response.json();

            setDataFilm(responseJson.data);
        }

        fetchFilm();
    }, []);

    return (
        <div className="p-6">
                <br />
                <br />
                <br />
                <br />
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-900 text-white">
                        <tr>
                            <th className="px-4 py-3">Nomor</th>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Year</th>
                            <th className="px-4 py-3">Rating</th>
                            <th className="px-4 py-3">Duration</th>
                            <th className="px-4 py-3">Genres</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                        {dataFilm.map((item, index) => (
                            <tr
                                key={index}
                                className="transition hover:bg-gray-50"
                            >
                                <td className="px-4 py-3">
                                    {index + 1}
                                </td>

                                <td className="px-4 py-3 font-medium text-gray-900">
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
                                    {item.genres.join(", ")}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="rounded-md bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>

                                        <button
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
    );
}