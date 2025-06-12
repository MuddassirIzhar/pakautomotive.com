"use client";

import React from "react";
import Image from "next/image";
import CarImg from "@/assets/car.svg";
import { FaCheckCircle } from "react-icons/fa";

export function FindYourBestCar() {
  return (
    <section className="bg-white">
      <div className="w-full md:max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 md:py-28">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Image and counters */}
          <div className="lg:w-7/12 w-full">
            <div className="relative group transition-all duration-300">
              <figure className="overflow-hidden rounded-xl">
                <Image
                  src={CarImg}
                  width={400}
                  height={400}
                  // unoptimized
                  alt="Car Image"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-xl">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-primary">
                    274<sup className="text-xl">k</sup>
                  </h3>
                  <span className="block text-sm text-gray-600">
                    Satisfied Clients
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-primary">
                    40<sup className="text-xl">%</sup>
                  </h3>
                  <span className="block text-sm text-gray-600">
                    Client Referrals
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Heading and List */}
          <div className="lg:w-5/12 w-full">
            <div className="mb-6">
              <span className="text-sm uppercase text-primary tracking-wider">
                Dream Rent a Car
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Find Your Best Car <span className="text-primary">Here</span>
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, conse li tetur sadipscing elit sed
                nonumy nairmod tempor invidunt ut. Lorem ipsum dol sit amet,
                conse li tetur sadipscing. Lorem ipsum dolor sit amet, conse li
                tetur sadipscing elit sed nonumy nairmod li tempor invidunt ut.
              </p>
            </div>

            <ul className="space-y-2 text-gray-700 list-none list-inside">
              <li className="flex items-center gap-4">
                <FaCheckCircle className="text-primary" /> Lorem ipsum dolor sit
                amet, consetetur.
              </li>
              <li className="flex items-center gap-4">
                <FaCheckCircle className="text-primary" /> Magnaed aliquyam
                erat, sed diam voluptua.
              </li>
              <li className="flex items-center gap-4">
                <FaCheckCircle className="text-primary" /> Nonumy eirmod tempor
                invidunt ut labore et dolore.
              </li>
              <li className="flex items-center gap-4">
                <FaCheckCircle className="text-primary" /> At vero eos et
                accusam et ea rebum.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
