"use client";

import React, { useEffect, useState } from "react";
import { ALL_BRANDS } from "@/utils/ApiRoutes";
import { axiosAuth } from "@/lib/axiosInstance";

import Carousel from "./Carousel";
import { EmblaOptionsType } from "embla-carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import NextJs from "@/assets/brands.png";
import { Brand } from "next-auth";
import Link from "next/link";

export function BrowseByBrand() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [brands, setBrands] = useState([]);
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const getAllBrands = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const url = new URL(`${BASE_URL}/${ALL_BRANDS}`);
      const res = await axiosAuth.get(url.toString());

      setBrands(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching brands:", error);
      // alert"Error fetching the brands. Please try again.");
    }
  };
  useEffect(() => {
    getAllBrands();
  }, []);
  return (
    <section className="bg-white">
      <div className="w-full md:max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 md:py-28">
        <div className="flex flex-col justify-center items-center md:flex-col md:items-center w-full">
			<h2 className="mb-5 text-3xl font-extrabold text-primary sm:text-4xl dark:text-white">
            Explore the Best from Every Brand
          </h2>
          <p className="w-full md:max-w-4xl mx-auto text-gray-500">
            Browse the latest models from the world’s top car brands in one
            convenient hub. Whether you're loyal to a name or exploring
            something new, find what fits your style. From innovation to
            reliability, compare features across trusted manufacturers. Discover
            the brand that drives you — and the car that defines you.
          </p>
          <div className="w-full mt-8">
            {/* <h2 className="text-2xl font-bold">New Cars by Brands</h2> */}
            <div className="grid grid-cols-6 gap-2 md:gap-4 lg:gap-6 mt-6">
              {brands.map((brand: Brand) => (
                <div className="col-span-2 md:col-span-1" key={brand.id}>
                  <Link title={brand.name} href={`new-cars/${brand.slug}`}>
                    <Card className="group cursor-pointer rounded-xl hover:shadow-xl border bg-white">
                      <CardContent className="flex flex-col justify-center items-center p-2 gap-2">
                        <span className=" flex items-center justify-center w-36 h-36">
                          <Image
                            src={`${imageUrl}/${brand.logo}`}
                            width={100}
                            height={100}
                            // unoptimized
                            alt={brand.name}
                            className="object-contain"
                          />
                        </span>
                        <span className="text-primary text-base font-semibold ">
                          {brand.name}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
