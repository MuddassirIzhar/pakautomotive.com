"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchImg from "@/assets/search2.svg";
import CommunincateImg from "@/assets/communicate3.svg";
import LocationImg from "@/assets/location2.svg";

export function Steps() {
  return (
    <section className="w-full md:max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 md:py-28">
      <div className="text-center mb-12">
        <span className="text-lg text-gray-600 uppercase tracking-wide">
          How do I buy a car?
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Buying car in three simple{" "}
          <span className="text-primary uppercase">steps</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="group cursor-pointer wow fadeInUp">
          <div className="p-6 border rounded-xl shadow-xl bg-white text-center hover:shadow-lg transition group-hover:bg-primary group-hover:text-white">
            <Image
              src={SearchImg}
              width={200}
              height={200}
              unoptimized
              alt="Search Image"
              className="mx-auto mb-4 object-contain h-60"
            />
            <h4 className="text-primary group-hover:text-white uppercase font-semibold">Step 1:</h4>
            <h3 className="text-xl font-bold mb-2">Search vehicle</h3>
            <p className="text-gray-600 group-hover:text-gray-200">
              Lorem ipsum dolor sit amet, conse li tetur sadipscing elitr, sed
              nonumy na irmod tempor invidunt ut.
            </p>
          </div>
        </div>

        <div className="group cursor-pointer wow fadeInUp">
          <div className="p-6 border rounded-xl shadow-xl bg-white text-center hover:shadow-lg transition group-hover:bg-primary group-hover:text-white">
            <Image
              src={CommunincateImg}
              width={200}
              height={200}
              unoptimized
              alt="Communication Image"
              className="mx-auto mb-4 object-contain h-60"
            />
            <h4 className="text-primary group-hover:text-white uppercase font-semibold">Step 2:</h4>
            <h3 className="text-xl font-bold mb-2">Communicate</h3>
            <p className="text-gray-600 group-hover:text-gray-200">
              Lorem ipsum dolor sit amet, conse li tetur sadipscing elitr, sed
              nonumy na irmod tempor invidunt ut.
            </p>
          </div>
        </div>

        <div className="group cursor-pointer wow fadeInUp">
          <div className="p-6 border rounded-xl shadow-xl bg-white text-center hover:shadow-lg transition group-hover:bg-primary group-hover:text-white">
            <Image
              src={LocationImg}
              width={200}
              height={200}
              unoptimized
              alt="Location Image"
              className="mx-auto mb-4 object-contain h-60"
            />
            <h4 className="text-primary group-hover:text-white uppercase font-semibold">Step 3:</h4>
            <h3 className="text-xl font-bold mb-2">Visit location</h3>
            <p className="text-gray-600 group-hover:text-gray-200">
              Lorem ipsum dolor sit amet, conse li tetur sadipscing elitr, sed
              nonumy na irmod tempor invidunt ut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
