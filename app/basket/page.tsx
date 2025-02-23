"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useProductStore } from "@/store/productStore";

export default function BasketPage() {
    const { basket, removeFromBasket } = useProductStore();
    const router = useRouter();

    const handleDelete = (productId: number) => {
        removeFromBasket(productId);
    };

    const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Basket</h1>
            {basket.length === 0 ? (
                <p className="text-center">Your basket is empty.</p>
            ) : (
                <div className="space-y-6">
                    {basket.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white shadow-md hover:scale-105 transition-transform">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                                <div>
                                    <h2 className="font-semibold text-lg">{item.title}</h2>
                                    <p className="text-sm text-gray-600">${item.price}</p>
                                </div>
                            </div>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
                                onClick={() => handleDelete(item.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-6">
                        <span className="font-bold text-xl">Total: ${totalPrice}</span>
                        <button
                            className="bg-teal-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-teal-700 transition-all duration-300"
                            onClick={() => alert("Proceeding to checkout...")}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
