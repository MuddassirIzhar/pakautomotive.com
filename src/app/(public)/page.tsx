import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Search } from "@/app/components/Search";
import { BrowseByType } from "../components/BrowseByType";
import { BrowseByBrand } from "../components/BrowseByBrand";

export default function Home() {
  return (
    <div className="w-full">
      {/* <AspectRatio ratio={16 / 9}>
        <div className="bg-gradient-to-b from-indigo-800 to-indigo-700 bg-opacity-50p-4 h-[510px]">
          <div className="flex flex-col justify-center items-center p-4 sm:px-6 lg:px-8 h-full">

            <h1 className="text-5xl text-white ">Find Used Cars in Pakistan</h1>
            <p className="text-2xl text-white ">With thousands of cars, we have just the right one for you</p>
            <div className="w-full">
              <Search />
            </div>
          </div>

        </div>
      </AspectRatio> */}
      {/* <AspectRatio ratio={16 / 9}> */}
        <div className="bg-gradient-to-b from-indigo-800 to-indigo-700 bg-opacity-50p-4 max-h-max md:h-[510px]">
          <div className="flex flex-col justify-center items-center p-4 sm:px-6 lg:px-8 h-full">

          <h1 className="text-5xl text-white ">Find Used Cars in Pakistan</h1>
            <p className="text-2xl text-white ">With thousands of cars, we have just the right one for you</p>
            <div className="w-full">
              <Search />
            </div>
          </div>

        </div>
      {/* </AspectRatio> */}
      <BrowseByType />
      <BrowseByBrand />
    </div>
  );
}
