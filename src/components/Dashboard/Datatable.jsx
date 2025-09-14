import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
};

// 🔹 Skeleton Row for Loading State
const TableSkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-3">
      <div className="h-4 w-40 bg-gray-700 rounded"></div>
    </td>
    <td className="p-3">
      <div className="h-4 w-24 bg-gray-700 rounded"></div>
    </td>
    <td className="p-3">
      <div className="h-4 w-16 bg-gray-700 rounded"></div>
    </td>
    <td className="p-3">
      <div className="h-4 w-12 bg-gray-700 rounded"></div>
    </td>
  </tr>
);

const ProductsTable = () => {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (error) return <p className="text-red-400 p-6">⚠️ Failed to load products</p>;

  return (
    <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 shadow-lg m-4">
      <div className="bg-gray-900 rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold text-white mb-4">Products Table</h2>
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gray-800 text-gray-300 text-left">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Rating</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? // 🔹 Show 6 skeleton rows while loading
                Array.from({ length: 6 }).map((_, idx) => (
                  <TableSkeletonRow key={idx} />
                ))
              : // 🔹 Show real data when loaded
                products.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-800/40" : "bg-gray-800/20"
                    } border-b border-gray-700 hover:bg-gray-700/60 transition`}
                  >
                    <td className="p-3 text-gray-200">{p.title}</td>
                    <td className="p-3 text-cyan-400">{p.category}</td>
                    <td className="p-3 text-green-400 font-semibold">
                      ${p.price}
                    </td>
                    <td className="p-3 text-yellow-400">
                      {p.rating?.rate} ⭐
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
