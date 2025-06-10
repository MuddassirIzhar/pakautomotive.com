"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LogoImg from "@/assets/logo.png";
import { Twitter, X } from "lucide-react";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="fixed bottom-0 w-full h-[430px] bg-black text-[#F56469] text-[100px] flex flex-col items-center pt-28">
      <div className="w-full md:max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between">
          {/* Logo and Newsletter */}
          <div className="w-full sm:w-5/12 flex flex-col items-start">
            <a href="/" className="">
              <Image
                src={LogoImg}
                className="h-16 w-auto mx-auto"
                priority
                alt="Logo"
              />
            </a>
            <p className="mb-4 text-sm text-gray-300">
              Don’t miss out on the latest updates, exclusive offers, and
              insider news. Join our community and get everything.
            </p>
            <form
              action="#"
              className="flex bg-white p-2 rounded-xl shadow-xl gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none w-full px-4 py-2 rounded-md text-black"
              />
              <Button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Contact & Legal */}
          <div className="w-full sm:w-1/6 flex flex-col items-start">
            <h6 className="text-lg font-semibold mb-6">Contact & Legal</h6>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/6 flex flex-col items-start">
            <h6 className="text-lg font-semibold mb-6">Quick Links</h6>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:underline">
                  Get In Touch
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Car Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Maintenance Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* App Download */}
          <div className="w-full sm:w-1/5 flex flex-col items-start">
            <h6 className="text-lg font-semibold mb-6">Download App</h6>
            <div className="flex flex-col items-start gap-4">
              <a
                href="javascript:void(0)"
                className="flex items-center p-1 transition-all bg-primary rounded-xl sm:px-4 hover:shadow-primary-hover shadow-xl"
              >
                <span className="pr-3">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 28.9958V4.9125C4 4.07667 4.48167 3.34 5.19 3L19.1442 16.9542L5.19 30.9083C4.48167 30.5542 4 29.8317 4 28.9958ZM23.5642 21.3742L8.32083 30.1858L20.3483 18.1583L23.5642 21.3742ZM28.31 15.2683C28.7917 15.6508 29.1458 16.2458 29.1458 16.9542C29.1458 17.6625 28.8342 18.2292 28.3383 18.6258L25.0942 20.4958L21.5525 16.9542L25.0942 13.4125L28.31 15.2683ZM8.32083 3.7225L23.5642 12.5342L20.3483 15.75L8.32083 3.7225Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
                <span className="text-base font-bold text-white">
                  <span className="block text-xs text-white opacity-70">
                    {" "}
                    Get it on{" "}
                  </span>
                  Google Play
                </span>
              </a>
              <a
                href="javascript:void(0)"
                className="flex items-center p-1 transition-all bg-primary dark:bg-white rounded-xl sm:px-4 hover:shadow-black-hover shadow-xl"
              >
                <span className="pr-3 text-white dark:text-black">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.5058 27.625C25.33 29.3817 24.0833 31.0958 22.185 31.1242C20.2866 31.1667 19.6775 30.005 17.5241 30.005C15.3566 30.005 14.6908 31.0958 12.8916 31.1667C11.0358 31.2375 9.6333 29.2967 8.4433 27.5825C6.0208 24.0833 4.16497 17.6375 6.6583 13.3025C7.8908 11.1492 10.1008 9.78916 12.495 9.74666C14.3083 9.71833 16.0366 10.9792 17.1558 10.9792C18.2608 10.9792 20.3575 9.46333 22.5533 9.68999C23.4741 9.73249 26.0525 10.0583 27.71 12.495C27.5825 12.58 24.6358 14.3083 24.6641 17.8925C24.7066 22.1708 28.4183 23.6017 28.4608 23.6158C28.4183 23.715 27.8658 25.6558 26.5058 27.625ZM18.4166 4.95833C19.4508 3.78249 21.165 2.88999 22.5816 2.83333C22.7658 4.49083 22.1 6.16249 21.1083 7.35249C20.1308 8.55666 18.5158 9.49166 16.9291 9.36416C16.7166 7.73499 17.51 6.03499 18.4166 4.95833Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <span className="text-base font-bold text-white dark:text-black">
                  <span className="block text-xs text-white dark:text-black opacity-70 dark:opacity-70">
                    {" "}
                    Download from{" "}
                  </span>
                  App Store
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Socials */}
      <div className="w-full mt-12 border-t border-gray-700 py-6">
        <div className="w-full md:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} All Rights Reserved by PakAutomotive
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#">
                <FaXTwitter className="size-6" />
            </a>
            <a href="#">
                <FaFacebook className="size-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
