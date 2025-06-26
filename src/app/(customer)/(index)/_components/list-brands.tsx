import React from "react";
import { getBrands } from "../lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function ListBrands() {
  const brands = await getBrands();

  return (
    <div
      id="brands"
      className="flex flex-col items-center gap-[40px] max-w-7xl mx-auto px-4 mt-16"
    >
      <div className="text-center space-y-4">
        <h2 className="font-bold text-3xl md:text-4xl leading-tight text-gray-900">
          Our Popular Brands
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover premium fashion from the world's most trusted and loved
          brands
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
        {brands.map((item) => (
          <Link
            key={`${item.id + item.logo}`}
            href="#"
            className="logo-card group"
          >
            <div className="bg-white flex items-center justify-center p-5 rounded-2xl hover:ring-2 hover:ring-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 w-full h-32">
              <div className="w-full h-full flex shrink-0 items-center justify-center overflow-hidden">
                <Image
                  src={item.logo_url}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  alt={`Brand logo`}
                  width={200}
                  height={90}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
