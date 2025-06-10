'use client';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Search } from "@/app/components/Search";
import { BrowseByType } from "./components/BrowseByType";
import { BrowseByBrand } from "./components/BrowseByBrand";
import { Steps } from "./components/Steps";
import { FindYourBestCar } from "./components/FindYourBestCar";
import { Download } from "./components/Download";
import { HowItWork } from "./components/HowItWork";
import { About } from "./components/About";
import { Banner } from "./components/Banner";
import Footer from "./components/Footer";
import CallToAction from "./components/CallToAction";

export default function Index() {
  return (
    <div className="w-full relative">
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
        {/* <div className="bg-gradient-to-b from-indigo-800 to-indigo-700 bg-opacity-50p-4 max-h-max md:h-[510px]">
          <div className="flex flex-col justify-center items-center p-4 sm:px-6 lg:px-8 h-full">

          <h1 className="text-5xl text-white ">Find Used Cars in Pakistan</h1>
            <p className="text-2xl text-white ">With thousands of cars, we have just the right one for you</p>
            <div className="w-full">
              <Search />
            </div>
          </div>

        </div> */}
      {/* </AspectRatio> */}
      <main className="relative z-[2] mb-[430px] bg-gray-50">
        <Banner />
        <About />
        <BrowseByType />
        <BrowseByBrand />
        <Steps />
        <FindYourBestCar />
        <HowItWork />
        <Download />
        <CallToAction />
      </main>
        <Footer />
    </div>
  );
}
