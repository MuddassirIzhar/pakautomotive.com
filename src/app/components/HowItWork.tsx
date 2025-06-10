"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CarImg from "@/assets/car.svg";
import GooglePlayStoreImg from "@/assets/google-play.jpg";
import AppleAppStoreImg from "@/assets/apple.jpg";
import LoginImg from "@/assets/login-2.png";
import ForgotImg from "@/assets/forgot-2.png";
import CommunincateImg from "@/assets/communicate3.svg";
import LocationImg from "@/assets/location2.svg";
import { FaCheckCircle } from "react-icons/fa";

export function HowItWork() {
  return (
		<section className="">
			<div className="w-full md:max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 md:py-28">
        <div className="flex justify-center -mx-4">
          <div className="w-full px-4">
            <div className="max-w-[510px] mx-auto text-center mb-[70px] wow fadeInUp" >
              <h2 className="mb-5 text-3xl font-extrabold text-black sm:text-4xl dark:text-white">How it Works?</h2>
              <p className="text-base font-semibold text-body-color">There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="text-center group cursor-pointer wow fadeInUp bg-white rounded-xl hover:shadow-xl p-8" >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 transition-all rounded-3xl bg-primary/5 text-primary group-hover:bg-primary/100 group-hover:text-white">
                <svg width="42" height="43" viewBox="0 0 42 43" className="fill-current">
                  <path d="M3.5 21.3843H7V30.1343H35V21.3843H38.5V30.1343C38.5 32.0768 36.9425 33.6343 35 33.6343H7C5.075 33.6343 3.5 32.0768 3.5 30.1343V21.3843ZM21 26.6343L30.7125 17.0793L28.2275 14.6118L22.75 20.0718V3.88428H19.25V20.0718L13.79 14.6118L11.305 17.0968L21 26.6343Z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl md:text-xl lg:text-2xl dark:text-white">Download for Free</h3>
              <p className="text-base font-semibold text-body-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit lectus non ipsum.</p>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="text-center group cursor-pointer wow fadeInUp bg-white rounded-xl hover:shadow-xl p-8" >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 transition-all rounded-3xl bg-primary/5 text-primary group-hover:bg-primary/100 group-hover:text-white">
                <svg width="42" height="43" viewBox="0 0 42 43" className="fill-current">
                  <path d="M21 7.38428C22.8565 7.38428 24.637 8.12177 25.9497 9.43453C27.2625 10.7473 28 12.5278 28 14.3843C28 16.2408 27.2625 18.0213 25.9497 19.334C24.637 20.6468 22.8565 21.3843 21 21.3843C19.1435 21.3843 17.363 20.6468 16.0503 19.334C14.7375 18.0213 14 16.2408 14 14.3843C14 12.5278 14.7375 10.7473 16.0503 9.43453C17.363 8.12177 19.1435 7.38428 21 7.38428ZM21 24.8843C28.735 24.8843 35 28.0168 35 31.8843V35.3843H7V31.8843C7 28.0168 13.265 24.8843 21 24.8843Z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl md:text-xl lg:text-2xl dark:text-white">Open an Account</h3>
              <p className="text-base font-semibold text-body-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit lectus non ipsum.</p>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="text-center group cursor-pointer wow fadeInUp bg-white rounded-xl hover:shadow-xl p-8" >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 transition-all rounded-3xl bg-primary/5 text-primary group-hover:bg-primary/100 group-hover:text-white">
                <svg width="42" height="43" viewBox="0 0 42 43" className="fill-current">
                  <path d="M13.825 37.9568C10.5 35.0518 9.3625 30.4318 10.815 26.3543L14.5425 15.9768C14.9275 14.9093 16.38 14.7693 16.9575 15.7493L17.5 16.7118C17.92 17.3943 18.0075 18.2343 17.745 18.9868L16.03 23.7818L16.7825 24.4468L27.2125 12.6343C27.825 11.9343 28.875 11.8643 29.5925 12.4768C30.275 13.0893 30.345 14.1568 29.75 14.8393L21.9625 23.6418L22.9775 24.5343L32.515 13.7193C33.1275 13.0193 34.195 12.9493 34.8775 13.5618C35.5775 14.1743 35.6475 15.2593 35 15.9418L25.48 26.7568L26.495 27.6493L34.7025 18.3393C35.315 17.6393 36.3825 17.5693 37.065 18.1818C37.7475 18.7943 37.835 19.8618 37.2225 20.5093L29.015 29.8543L30.0125 30.7468L35.56 24.4643C36.1725 23.7643 37.24 23.6943 37.94 24.3068C38.64 24.9193 38.6925 25.9868 38.08 26.6343L28.98 36.9943C25.06 41.4568 18.27 41.8768 13.825 37.9568ZM20.2825 16.5193L25.2525 10.8843C25.6725 10.4118 26.1975 10.0093 26.775 9.78177L27.44 8.41677C27.86 7.59427 27.51 6.57927 26.67 6.17677C25.8475 5.77427 24.8325 6.12427 24.43 6.94677L20.0375 15.9418C20.125 16.1343 20.23 16.3268 20.2825 16.5193ZM19.25 14.3843V14.4718L24.115 4.54927C24.5 3.70927 24.1675 2.71177 23.3275 2.30927C22.505 1.89802 21.49 2.23927 21.0875 3.07927L16.4675 12.5468C17.605 12.7393 18.6025 13.3868 19.25 14.3843ZM8.3475 25.4618L12.075 15.0843C12.5475 13.7718 13.65 12.8793 14.9625 12.5818L18.7075 4.89927C19.11 4.05927 18.76 3.06177 17.9375 2.65927C17.0975 2.25677 16.1 2.58927 15.6975 3.42927L8.75 17.6043L7.875 17.1668L8.2425 12.0743C8.3125 11.2868 7.9975 10.4993 7.4375 9.93927L6.6325 9.13427C5.81 8.38177 4.4625 8.88927 4.375 10.0093L3.5 21.0168C3.2725 24.5868 4.8475 27.9993 7.6125 30.1343C7.5775 28.5943 7.805 27.0018 8.3475 25.4618Z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl md:text-xl lg:text-2xl dark:text-white">Enjoy our App</h3>
              <p className="text-base font-semibold text-body-color">Lorem ipsum dolor sit amet, consectetur adipiscing elit lectus non ipsum.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
