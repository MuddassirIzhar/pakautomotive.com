"use client";

import React, { useEffect, useState } from "react";
import { ALL_BRAND_MODEL_AND_VARIANTS, ALL_BRANDS } from "@/utils/ApiRoutes";
import { axiosAuth } from "@/lib/axiosInstance";

import Image from "next/image";
import BannerImg from "@/assets/banner2.webp";
import BannerBgImg from "@/assets/banner-bg.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaCheck, FaChevronDown, FaSpinner } from "react-icons/fa6";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Brand } from "next-auth";
import { bannerCreateUpdateSchema } from "../(admin)/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";

interface bannerForm {
  brand: number;
  model?: number | null | undefined;
  variant?: number | null | undefined;
}
export function Banner() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openBrand, setOpenBrand] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>();
  const [openModel, setOpenModel] = useState(false);
  const [selectedModel, setSelectedModel] = useState<any>();
  const [openVariant, setOpenVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<any>();
  const [url, setUrl] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [brands, setBrands] = useState<any[]>([]);
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const getAllBrands = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const url = new URL(`${BASE_URL}/${ALL_BRAND_MODEL_AND_VARIANTS}`);
      const res = await axiosAuth.get(url.toString());
      console.log(res.data.data);
      setBrands(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching brands:", error);
      alert("Error fetching the brands. Please try again.");
    }
  };
  useEffect(() => {
    getAllBrands();
  }, []);

  const goToPage = () => {
    if (url) {
      setSearchError("");
      setIsLoading(true);
      redirect(url);
    } else {
      setSearchError("Please select a option  ");
    }
  };
  return (
    <section className="bg-white">
      <div className="w-full md:max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 md:py-28">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
            <div>
              <p className="text-sm text-primary font-medium mb-2">
                Shop With Confidence – Quality Vehicles
              </p>
              <h1 className="mb-5 text-3xl font-extrabold sm:text-5xl dark:text-white">
                Where Meets the Road: Discover Next{" "}
                <span className="text-primary">Car</span> Today
              </h1>
            </div>
          </div>

          <div className="w-full lg:w-5/12">
            <p className="text-gray-600 text-lg">
              Welcome to PakAutomotive where innovation drives every journey.
              Discover a range designed to elevate your driving experience.
            </p>
          </div>

          <div className="w-full mt-8 z-10 p-6 rounded-xl shadow-xl bg-gray-50">
            <div className="flex flex-wrap p-6 rounded-xl shadow-xl bg-white">
              <div className="w-full sm:w-1/5 p-2">
                {/* Brand Dropdown */}
                <Popover open={openBrand} onOpenChange={setOpenBrand}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openBrand}
                      className="w-full flex justify-between"
                    >
                      {selectedBrand
                        ? brands.find(
                            (brand: any) =>
                              brand.id === parseInt(selectedBrand?.id)
                          )?.name
                        : "Select Brand"}
                      <FaChevronDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full p-0"
                    align="start"
                    sideOffset={10}
                  >
                    <Command>
                      <CommandInput
                        placeholder="Select Brand"
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No brand found.</CommandEmpty>
                        <CommandGroup>
                          {brands.map((brand: any) => (
                            <CommandItem
                              key={brand.id}
                              value={brand.id.toString()}
                              onSelect={(currentValue) => {
                                setSearchError("");
                                const selected =
                                  brands.find(
                                    (brand) =>
                                      brand.id.toString() === currentValue
                                  ) || null;
                                setSelectedBrand(selected);
                                setUrl(`new-cars/${selected.slug}`);
                                setSelectedModel(null);
                                setSelectedVariant(null);
                                setOpenBrand(false);
                              }}
                            >
                              {brand.name}
                              <FaCheck
                                className={cn(
                                  "ml-auto",
                                  parseInt(selectedBrand?.id) === brand.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full sm:w-1/5 p-2">
                {/* Model Dropdown */}
                <Popover open={openModel} onOpenChange={setOpenModel}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openModel}
                      className="w-full flex justify-between"
                    >
                      {selectedModel
                        ? selectedBrand?.models.find(
                            (model: any) =>
                              model.id === parseInt(selectedModel?.id)
                          )?.name
                        : "Select Model"}
                      <FaChevronDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full p-0"
                    align="start"
                    sideOffset={10}
                  >
                    <Command>
                      <CommandInput
                        placeholder="Select Model"
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No model found.</CommandEmpty>
                        <CommandGroup>
                          {selectedBrand?.models.map((model: any) => (
                            <CommandItem
                              key={model.id}
                              value={model.id.toString()}
                              onSelect={(currentValue) => {
                                setSearchError("");
                                const selected =
                                  selectedBrand.models.find(
                                    (model: any) =>
                                      model.id.toString() === currentValue
                                  ) || null;
                                setSelectedModel(selected);
                                setUrl(
                                  `new-cars/${selectedBrand.slug}/${selected.slug}`
                                );
                                setSelectedVariant(null);
                                setOpenModel(false);
                              }}
                            >
                              {model.name}
                              <FaCheck
                                className={cn(
                                  "ml-auto",
                                  parseInt(selectedModel?.id) === model.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full sm:w-2/5 p-2">
                {/* Variant Dropdown */}
                <Popover open={openVariant} onOpenChange={setOpenVariant}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openVariant}
                      className="w-full flex justify-between"
                    >
                      {selectedVariant
                        ? selectedModel?.variants.find(
                            (variant: any) =>
                              variant.id === parseInt(selectedVariant?.id)
                          )?.name
                        : "Select Variant"}
                      <FaChevronDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full p-0"
                    align="start"
                    sideOffset={10}
                  >
                    <Command>
                      <CommandInput
                        placeholder="Select Variant"
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No variant found.</CommandEmpty>
                        <CommandGroup>
                          {selectedModel?.variants.map((variant: any) => (
                            <CommandItem
                              key={variant.id}
                              value={variant.id.toString()}
                              onSelect={(currentValue) => {
                                setSearchError("");
                                const selected =
                                  selectedModel.variants.find(
                                    (variant: any) =>
                                      variant.id.toString() === currentValue
                                  ) || null;
                                setSelectedVariant(selected);
                                setUrl(
                                  `new-cars/${selectedBrand.slug}/${selectedModel.slug}/${selected.slug}`
                                );
                                setOpenVariant(false);
                              }}
                            >
                              {variant.name}
                              <FaCheck
                                className={cn(
                                  "ml-auto",
                                  parseInt(selectedVariant?.id) === variant.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full sm:w-1/5 p-2">
                <Button
                  type="button"
                  className="w-full"
                  disabled={isLoading}
                  onClick={goToPage}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin-slow" />{" "}
                      Searching...{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <Search /> Search{" "}
                    </>
                  )}
                </Button>
                {searchError && (
                  <p className="text-red-500 text-sm text-center">
                    {searchError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${BannerBgImg.src})` }}
        className="pt-28 flex justify-end overflow-x-clip relative z-[1] bg-center bg-cover bg-no-repeat bg-gray-100 -mt-40 ml-10 text-right rounded-bl-[60px]"
      >
        <img
          src={BannerImg.src}
          alt="Car Banner"
          width="1555"
          className="relative right-[-12%] bottom-[-55px]"
        />
      </div>
    </section>
  );
}
