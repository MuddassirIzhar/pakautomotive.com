"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import * as React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import about1 from "@/assets/about.svg";
import about2 from "@/assets/about-2.svg";

export function About() {
	return (
			<div className="bg-white">
				<div className="w-full md:max-w-7xl mx-auto py-28">
					<div className="flex flex-col justify-center grid-cols-2 space-y-2 md:flex-row md:space-x-2 md:space-y-0 w-full">
						<div className="w-full grid col-span-2 md:col-span-1 gap-4 px-3">
							<div className="relative">
								{/* <Image src={about2} className="absolute z-[2] left-20 -top-12 animate-top-bottom" alt="about 2" /> */}
								<Image src={about2} className="relative z-[1] w-full" alt="about 1" />
							</div>
						</div>
						<div className="w-full grid col-span-2 md:col-span-1 gap-4 px-3">
							<div className="ps-8 flex flex-col gap-2">
								<h2 className="text-xl uppercase text-primary">
									About Company
								</h2>
								<span className="text-[40px] font-semibold">
									Experience intelligence like never before
								</span>
								<p className="py-4 text-gray-400">
									You can access SaaS applications through a web browser or mobile app, as long as you have an internet connection.
								</p>
								<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex gap-x-4 items-center">
										<FaCheckCircle className="text-primary" size={20} />
										Mistakes To Avoid to the
									</div>
									<div className="flex gap-x-4 items-center">
										<FaCheckCircle className="text-primary" size={20} />
										Mistakes To Avoid to the
									</div>
									<div className="flex gap-x-4 items-center">
										<FaCheckCircle className="text-primary" size={20} />
										Mistakes To Avoid to the
									</div>
									<div className="flex gap-x-4 items-center">
										<FaCheckCircle className="text-primary" size={20} />
										Mistakes To Avoid to the
									</div>
								</div>
								<Button
									variant="default"
									className="px-8 py-7 has-[>svg]:px-8 max-w-fit mt-8 text-base"
								>
									Discover More
									<FaArrowRight />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
}
