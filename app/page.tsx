"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";

export default function HomePage() {
  const { filteredProducts, fetchProducts, filterByCategory, filterBySearch, filterByPriceRange, addToBasket, basket } = useProductStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // جستجو
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
 

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      const data = await response.json();
      setCategories(["All", ...data]);
    };
    fetchCategories();
  }, []);

  const handleSearch = () => {
    filterBySearch(searchQuery); 
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Store</h1>

      
      <div className="flex flex-col gap-6 mb-6">
       
        <div className="flex justify-between items-center gap-4">
          <select
            onChange={(e) => filterByCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg w-64"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => router.push("/basket")}
          >
            🛒 Basket ({basket.length})
          </button>
        </div>

        
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() => filterByPriceRange(0, 20)} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            $0 - $20
          </button>
          <button onClick={() => filterByPriceRange(20, 50)} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            $20 - $50
          </button>
          <button onClick={() => filterByPriceRange(50, 100)} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            $50 - $100
          </button>
          <button onClick={() => filterByPriceRange(100, 1000)} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300">
            $100+
          </button>
        </div>
      </div>

      
      {filteredProducts.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl shadow-lg p-4 bg-white hover:scale-105 transition-transform flex flex-col justify-between min-h-[400px]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <p className="text-md font-bold mb-4">${product.price}</p>
              <div className="flex justify-between items-center">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                  onClick={() => addToBasket(product)}
                >
                  Add to Basket
                </button>
                <button
                  className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  Show Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
