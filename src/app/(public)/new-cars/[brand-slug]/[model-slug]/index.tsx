"use client";
import ImageSlider from "@/app/components/ImageSlider";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { notFound, useParams } from "next/navigation";
import { PiEngineBold, PiGasPumpBold, PiSpeedometerBold } from "react-icons/pi";
import { IoSpeedometerOutline, IoSpeedometerSharp } from "react-icons/io5";
import { FaCheck, FaCheckDouble, FaGasPump, FaSquareCheck, FaThumbsDown, FaThumbsUp, FaX } from "react-icons/fa6";
import { GiGearStickPattern } from "react-icons/gi";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { axiosAuth } from "@/lib/axiosInstance";
import { ALL_BLOGS, GET_BLOG, GET_MODEL } from "@/utils/ApiRoutes";
import { useEffect, useState } from "react";
import { Model, Pros } from "next-auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatPriceHelper } from "@/utils/helper";
import { Variant } from "next-auth";
import { Cons } from "next-auth";
import { MdHome } from "react-icons/md";

export default function Index() {
	const params = useParams();
	const brandSlug = params["brand-slug"];
	const modelSlug = params["model-slug"];
	const [model, setModel] = useState<Model>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getModel = async () => {
		try {
			// const rest = await axiosAuth.get(ALL_BLOGS);
			const res = await axiosAuth.get(GET_MODEL(modelSlug));
			if (res.data) {
				console.log(res.data.model);
				setModel(res.data.model);
			} else {
				return notFound();
			}
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data?.errors?.length > 0) {
					toast.error(error.response?.data?.errors[0], {
						style: {
							borderRadius: "10px",
							background: "#333",
							color: "#fff",
						},
					});
				}
				toast.error(error.response?.data.message, {
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
			} else {
				toast.error(error.message, {
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
			}
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (modelSlug) {
			getModel();
		}
	}, [modelSlug]);
	return (
		<>
			<div className="py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="flex flex-wrap mb-6 gap-4">
						<div className="w-full">
							{model ? (
								<>
									<Breadcrumb className="h-8">
										<BreadcrumbList>
											<BreadcrumbItem>
                        
					  <BreadcrumbLink asChild>
							<Link href="/" className="flex gap-1">
							<MdHome size={20} className="text-primary" />
							Home
							</Link>
                        </BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
                        
					  <BreadcrumbLink asChild>
							<Link href="/new-cars">
							New Cars
							</Link>
                        </BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
                        
					  <BreadcrumbLink asChild>
							<Link href={`/new-cars/${model.brand.slug}`}>
							{model.brand.name}
							</Link>
                        </BreadcrumbLink>
											</BreadcrumbItem>
											<BreadcrumbSeparator />
											<BreadcrumbItem>
												<BreadcrumbPage>{model.name}</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</>
							) : (
								<Skeleton className="h-8 w-full rounded-xl shadow-xl" />
							)}
						</div>
						<div className="w-full grid md:grid-cols-3 gap-4">
							<div className="flex flex-col md:col-span-2">
								{model ? (
									<ImageSlider images={model.images || []} />
								) : (
									<>
										<Skeleton className="h-[530px] w-full rounded-xl shadow-xl" />
										<div className="w-full grid md:grid-cols-5 gap-4 mt-4">
											<Skeleton className="h-20 w-full rounded-xl shadow-xl" />
											<Skeleton className="h-20 w-full rounded-xl shadow-xl" />
											<Skeleton className="h-20 w-full rounded-xl shadow-xl" />
											<Skeleton className="h-20 w-full rounded-xl shadow-xl" />
											<Skeleton className="h-20 w-full rounded-xl shadow-xl" />
										</div>
									</>
								)}
							</div>
							{!model ? (
								<Skeleton className="h-[530px] w-full rounded-xl shadow-xl" />
							) : (
								<>
									<div className="flex flex-col">
										<Card className="w-full shadow-xl">
											<CardHeader>
												<CardTitle className="text-2xl">{model.heading}</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="flex items-baseline gap-1 text-xs">
													<b className="text-base text-indigo-500">
														{(() => {
															const minPrice = formatPriceHelper(
																model?.variants?.reduce(
																	(min, v) => (v.price < min.price ? v : min),
																	model?.variants[0]
																)?.price ?? 0
															);
															const maxPrice = formatPriceHelper(
																model?.variants?.reduce(
																	(max, v) => (v.price > max.price ? v : max),
																	model?.variants[0]
																)?.price ?? 0
															);

															return minPrice === maxPrice ? (
																<span>{minPrice}</span>
															) : (
																<span>
																	{minPrice} - {maxPrice}
																</span>
															);
														})()}
													</b>
												</div>
												<div className="flex items-baseline text-xs">
													(*Ex-Factory Price)
												</div>
											</CardContent>
											<CardFooter className="flex justify-between flex-col">
												<div className="w-full grid grid-cols-1 gap-2">
													<div className="flex py-2 border-2 rounded-lg items-center">
														<span className="flex m-2">
															<span className="rounded-full bg-gray-100 p-3">
																<IoSpeedometerOutline
																	size={"1.5em"}
																	className="text-indigo-500"
																/>
															</span>
														</span>
														<span className="flex flex-col">
															<div className="flex items-baseline gap-1">
																<b className="text-base">
																	{(() => {
																		const minMileage =
																			model?.variants?.reduce(
																				(min, v) =>
																					v.mileage_from < min.mileage_from
																						? v
																						: min,
																				model?.variants[0]
																			)?.mileage_from ?? 0;
																		const maxMileage =
																			model?.variants?.reduce(
																				(max, v) =>
																					v.mileage_to > max.mileage_to
																						? v
																						: max,
																				model?.variants[0]
																			)?.mileage_to ?? 0;

																		return minMileage === maxMileage ? (
																			<span>{minMileage} km/ltr</span>
																		) : (
																			<span>
																				{minMileage} km/ltr - {maxMileage}{" "}
																				km/ltr
																			</span>
																		);
																	})()}
																</b>
															</div>
															<span className="text-xs">Mileage (km/ltr)</span>
														</span>
													</div>
													<div className="flex py-2 border-2 rounded-lg items-center">
														<span className="flex m-2">
															<span className="rounded-full bg-gray-100 p-3">
																<PiGasPumpBold
																	size={"1.5em"}
																	className="text-indigo-500"
																/>
															</span>
														</span>
														<span className="flex flex-col">
															<div className="flex items-baseline gap-1">
																<b className="text-base">
																	{(() => {
																		const fuelTypes = model?.variants?.map(
																			(v) => v.fuel_type
																		);
																		const uniqueFuelTypes = [
																			...new Set(fuelTypes),
																		];

																		return (
																			<span>
																				{uniqueFuelTypes.length === 1
																					? uniqueFuelTypes[0]
																					: uniqueFuelTypes.join(", ")}
																			</span>
																		);
																	})()}
																</b>
															</div>
															<span className="text-xs">Fuel Type</span>
														</span>
													</div>
													<div className="flex py-2 border-2 rounded-lg items-center">
														<span className="flex m-2">
															<span className="rounded-full bg-gray-100 p-3">
																<GiGearStickPattern
																	size={"1.5em"}
																	className="text-indigo-500"
																/>
															</span>
														</span>
														<span className="flex flex-col">
															<div className="flex items-baseline gap-1">
																<b className="text-base">
																	{(() => {
																		const transmissions = model?.variants?.map(
																			(v) => v.transmission
																		);
																		const uniqueTransmissions = [
																			...new Set(transmissions),
																		];

																		return (
																			<span>
																				{uniqueTransmissions.length === 1
																					? uniqueTransmissions[0]
																					: "Automatic & Manual"}
																			</span>
																		);
																	})()}
																</b>
															</div>
															<span className="text-xs">Transmission</span>
														</span>
													</div>
													<div className="flex py-2 border-2 rounded-lg items-center">
														<span className="flex m-2">
															<span className="rounded-full bg-gray-100 p-3">
																<PiEngineBold
																	size={"1.5em"}
																	className="text-indigo-500"
																/>
															</span>
														</span>
														<span className="flex flex-col">
															<div className="flex items-baseline gap-1">
																<b className="text-base">
																	{(() => {
																		const minCc =
																			model?.variants?.reduce(
																				(min, v) => (v.cc < min.cc ? v : min),
																				model?.variants[0]
																			)?.cc ?? 0;
																		const maxCc =
																			model?.variants?.reduce(
																				(max, v) => (v.cc > max.cc ? v : max),
																				model?.variants[0]
																			)?.cc ?? 0;

																		return minCc === maxCc ? (
																			<span>{minCc} cc</span>
																		) : (
																			<span>
																				{minCc} cc - {maxCc} cc
																			</span>
																		);
																	})()}
																</b>
															</div>
															<span className="text-xs">Engine</span>
														</span>
													</div>
												</div>
											</CardFooter>
										</Card>
									</div>
								</>
							)}
						</div>
						<div className="w-full grid md:grid-cols-6 gap-4 mt-4">
							{!model ? (
								<>
									<div className="flex flex-col md:col-span-1">
										<Skeleton className="h-10 w-full rounded-full shadow-xl" />
									</div>
									<div className="flex flex-col md:col-span-1">
										<Skeleton className="h-10 w-full rounded-full shadow-xl" />
									</div>
									<div className="flex flex-col md:col-span-1">
										<Skeleton className="h-10 w-full rounded-full shadow-xl" />
									</div>
									<div className="flex flex-col md:col-span-1">
										<Skeleton className="h-10 w-full rounded-full shadow-xl" />
									</div>
									<div className="flex flex-col md:col-span-1">
										<Skeleton className="h-10 w-full rounded-full shadow-xl" />
									</div>
									<div className="flex flex-col md:col-span-1">
										<Skeleton className="h-10 w-full rounded-full shadow-xl" />
									</div>
								</>
							) : (
								<>
									<div className="flex flex-col md:col-span-1">
										<div className="border border-indigo-500 rounded-full text-center p-2 font-bold shadow-xl cursor-pointer">
											{model?.brand.name} {model?.name}
										</div>
									</div>
									<div className="flex flex-col md:col-span-1">
										<div className="border border-indigo-500 rounded-full text-center p-2 font-bold shadow-xl cursor-pointer">
											Price
										</div>
									</div>
									<div className="flex flex-col md:col-span-1">
										<div className="border border-indigo-500 rounded-full text-center p-2 font-bold shadow-xl cursor-pointer">
											Specs & features
										</div>
									</div>
									<div className="flex flex-col md:col-span-1">
										<div className="border border-indigo-500 rounded-full text-center p-2 font-bold shadow-xl cursor-pointer">
											Overview
										</div>
									</div>
									<div className="flex flex-col md:col-span-1">
										<div className="border border-indigo-500 rounded-full text-center p-2 font-bold shadow-xl cursor-pointer">
											Pros & Cons
										</div>
									</div>
									<div className="flex flex-col md:col-span-1">
										<div className="border border-indigo-500 rounded-full text-center p-2 font-bold shadow-xl cursor-pointer">
											Reviews
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="flex flex-wrap mb-6 gap-4">
						<div
							dangerouslySetInnerHTML={{ __html: model?.description || '' }}
						/>
						<div className="w-full">
							<Table className="border-2 border-indigo-500 rounded-xl shadow-xl w-full mt-6">
								<TableCaption>
									A list Variants of {model?.brand.name} {model?.name} 2025.
								</TableCaption>
								<TableHeader>
									<TableRow>
										<TableHead className="h-12 font-black text-xl text-gray-900">
											Variants
										</TableHead>
										<TableHead className="h-12 font-black text-xl text-gray-900">
											Ex-Factory Price
										</TableHead>
										<TableHead className="w-[100px] text-right h-12 font-black text-xl text-gray-900">
											Compare
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{model?.variants?.map((variant: Variant) => (
										<TableRow key={variant.id}>
											<TableCell>
												<div className="font-semibold text-base">
													
													<Link title={variant.name} href={`/new-cars/${brandSlug}/${modelSlug}/${variant.slug}`} >
														{variant.name}
													</Link>
												</div>
												<div className="">
													{variant.cc} cc, {variant.fuel_type},{" "}
													{variant.transmission}.
												</div>
												<div>{variant.year}</div>
											</TableCell>
											<TableCell>
												<span className="font-semibold text-indigo-500">
													{new Intl.NumberFormat("en-US", {
														style: "currency",
														currency: "PKR",
													}).format(variant.price)}
												</span>
											</TableCell>
											<TableCell className="text-right">
												<FaSquareCheck />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</div>
			<div className="py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="flex flex-wrap mb-6 gap-4">
						<div className="w-full">
							<h2 className="text-2xl font-bold mb-4">
								{model?.brand.name} {model?.name} 2025 Pros & Cons
							</h2>
						</div>
						<div className="w-full">
							<Card className="w-full shadow-xl">
								<CardContent className="p-6">
									<div className="w-full grid md:grid-cols-2 gap-4">
										<div className="flex flex-col gap-4 md:col-span-1">
											<div className="flex items-center mb-4 gap-4">
												<span className="flex rounded-full bg-green-100 p-3 gap-2">
													<FaThumbsUp
														size={"1.5em"}
														className="text-green-700"
													/>
												</span>
													What we like
											</div>
											
											{model?.pros?.map((pro: Pros) => (
												<div key={pro.id} className="flex gap-4 items-center">
													<FaCheck size={16} 
														className="text-green-700" />
													{pro.value}
												</div>
											))}
										</div>
										<div className="flex flex-col gap-4 md:col-span-1">
											<div className="flex items-center mb-4 gap-4">
												<span className="flex rounded-full bg-red-100 p-3 gap-2">
													<FaThumbsDown
														size={"1.5em"}
														className="text-red-700"
													/>
												</span>
													What we don't like
											</div>
											
											{model?.cons?.map((con: Cons) => (
												<div key={con.id} className="flex gap-4 items-center">
													<FaX size={16}
														className="text-red-700" />
													{con.value}
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="flex flex-wrap mb-6 gap-4">
						<div className="w-full">
							<h2 className="text-2xl font-bold mb-4">
								{model?.brand.name} {model?.name} 2025 Overview
							</h2>
						</div>
						<div className="w-full">
							<Card className="w-full shadow-xl">
								<CardContent className="p-6">
									<div className="w-full grid md:grid-cols-1 gap-4">
									{!model ? (
										<div className="flex flex-col gap-8">
											<Skeleton className="h-12 w-full md:w-32 rounded-xl shadow-xl" />
											<div className="flex flex-col gap-2">
												<Skeleton className="h-8 w-full md:w-[100%] rounded-xl shadow-xl" />
												<Skeleton className="h-8 w-full md:w-[95%] rounded-xl shadow-xl" />
												<Skeleton className="h-8 w-full md:w-[98%] rounded-xl shadow-xl" />
												<Skeleton className="h-8 w-full md:w-[40%] rounded-xl shadow-xl" />
											</div>
										</div>
									) : (
										<div className="flex flex-col gap-4">
											<div
												dangerouslySetInnerHTML={{ __html: model.content }}
											/>
										</div>
									)}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
