"use client";

import React, { useEffect, useState } from "react";
import { ALL_SUBCATEGORIES } from "@/utils/ApiRoutes";
import { axiosAuth } from "@/lib/axiosInstance";
import Carousel from "./Carousel";
import { EmblaOptionsType } from "embla-carousel";

export function BrowseByType() {
  const OPTIONS: EmblaOptionsType = {
    align: "start",
    dragFree: true,
    loop: true,
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subCategories, setSubCategories] = useState([]);
  const [filter, setFilter] = useState("Cars");
  const getAllSubCategories = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const url = new URL(`${BASE_URL}/${ALL_SUBCATEGORIES}`);
      url.searchParams.set("query", filter);
      const res = await axiosAuth.get(url.toString());

      setSubCategories(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching subCategories:", error);
      // alert"Error fetching the subCategories. Please try again.");
    }
  };
  useEffect(() => {
    getAllSubCategories();
  }, []);
  return (
    <section className="w-full md:max-w-7xl mx-auto sm:px-6 lg:px-8 md:py-28">
      <div className="flex flex-col justify-center items-center md:flex-col md:items-center w-full">
        <h2 className="mb-5 text-3xl font-extrabold text-primary sm:text-4xl dark:text-white">
          Discover Cars That Fit Your Style
        </h2>
        <p className="w-full md:max-w-4xl mx-auto text-gray-500">
          Explore a wide range of new cars tailored to your preferences — from
          sleek sedans to rugged SUVs. Whether you value comfort, space, or
          performance, there’s a body type that fits your needs. Compare top
          models by body style and find the one that matches your everyday
          drive. Start your journey with the perfect silhouette for your road
          ahead.
        </p>
        <div className="w-full mt-8">
          {/* <h4 className="text-2xl font-bold">New Cars by Body Type</h4> */}
          <Carousel slides={subCategories} options={OPTIONS} />
        </div>
      </div>
    </section>
  );
}
