"use client";

import { useEffect, useState } from "react";

interface Produk {
  name: string;
  category: string;
  prices: number | string;
}

export default function ProductList() {

    const [dataProduk, setDataProduk] = useState<Produk[]>([]);

    useEffect(() => {
        async function fetchProduk() {
            const response = await fetch("http://localhost:8000/api/products");

            const responseJson = await response.json();

            setDataProduk(responseJson.data);
        }
        fetchProduk();
    }, []);


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nomor</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Prices</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataProduk.map((item, index) => 
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.prices}</td>
                                <td>
                                    <button>edit</button>
                                    <br />
                                    <button>delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}