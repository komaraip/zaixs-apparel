import React, { ReactNode } from "react";
import { getProducts } from "../lib/data";
import CardProduct from "./card-product";
import Link from "next/link";

interface ListProductProps {
  isShowDetail?: boolean;
}

export default async function ListProducts({
  isShowDetail = true,
}: ListProductProps) {
  const products = await getProducts();

  return (
    <div
      id="picked"
      className="flex flex-col items-center gap-[40px] max-w-7xl mx-auto px-4 mt-16"
    >
      <div className="text-center space-y-4">
        <h2 className="font-bold text-3xl md:text-4xl leading-tight text-gray-900">
          New Releases Quality Products
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our handpicked collection of premium fashion items
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
        {products.map((item) => (
          <CardProduct
            key={`${item.name + item.id}`}
            item={{
              category_name: item.category.name,
              id: item.id,
              image_url: item.image_url,
              name: item.name,
              price: Number(item.price),
            }}
          />
        ))}
      </div>

      {isShowDetail && (
        <div className="flex justify-center mt-4">
          <Link
            href="/catalogs"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-gray-200 rounded-full text-black font-semibold hover:bg-[#0D5CD7] hover:text-white transition-colors duration-300"
          >
            <span>Explore All Products</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
