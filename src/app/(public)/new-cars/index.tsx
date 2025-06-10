'use client';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Search } from "@/app/components/Search";
import { BrowseByType } from "@/app/components/BrowseByType";
import { BrowseByBrand } from "@/app/components/BrowseByBrand";
import { Banner } from "@/app/components/Banner";

export default function Index() {
  return (
    <div className="w-full">
      {/* <AspectRatio ratio={16 / 9}> */}
        {/* <div className="bg-gradient-to-b from-indigo-800 to-indigo-700 bg-opacity-50p-4 max-h-max md:h-[510px]">
          <div className="flex flex-col justify-center items-center p-4 sm:px-6 lg:px-8 h-full">

            <h1 className="text-5xl text-white ">Find New Cars in Pakistan</h1>
            <p className="text-2xl text-white ">Find information about the latest cars in the market</p>
            <div className="w-full">
              <Search />
            </div>
          </div>

        </div> */}
      {/* </AspectRatio> */}
       
      <Banner />
      <BrowseByType />
      <BrowseByBrand />
    </div>
  );
}
