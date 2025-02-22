
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";

export default function ProductDetail() {
    const { id } = useParams();
    const { products } = useProductStore();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (products.length > 0) {
            const selectedProduct = products.find((p) => p.id === Number(id));
            setProduct(selectedProduct);
        }
    }, [id, products]);

    if (!product) return <p className="text-center mt-10">Loading product details...</p>;
    
   

    return (
        <main className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <img src={product.image} alt={product.title} className="w-full h-64 object-contain mb-4" />
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <span className="text-xl font-bold">${product.price}</span>
        </main>
    );
    
}

