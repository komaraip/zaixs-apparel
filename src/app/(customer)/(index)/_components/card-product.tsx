import { rupiahFormat } from "@/lib/utils";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProductProps {
  item: TProduct;
}

export default function CardProduct({ item }: CardProductProps) {
  return (
    <Link href={`/detail-product/${item.id}`} className="product-card group">
      <div className="bg-white flex flex-col gap-6 p-6 rounded-2xl ring-1 ring-gray-200 hover:ring-2 hover:ring-[#FFC736] hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 w-full h-full">
        {/* Product Image */}
        <div className="relative w-full h-48 flex shrink-0 items-center justify-center overflow-hidden bg-gray-50 rounded-xl">
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={item.image_url}
            alt={item.name}
            width={300}
            height={200}
          />
          {/* Optional: Add a subtle overlay on hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl"></div>
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col gap-4 flex-grow">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg leading-6 text-gray-900 group-hover:text-[#FFC736] transition-colors duration-300 line-clamp-2">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
              {item.category_name}
            </p>
          </div>
          
          {/* Price Section */}
          <div className="mt-auto">
            <p className="font-bold text-xl text-[#0D5CD7] leading-6">
              {rupiahFormat(Number(item.price))}
            </p>
          </div>
          
          {/* Call to Action */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-[#FFC736] font-medium text-sm">
              <span>View Details</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
