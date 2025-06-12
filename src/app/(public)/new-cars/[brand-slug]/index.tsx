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
import { FaCheck, FaGasPump, FaPhotoFilm, FaSquareCheck } from "react-icons/fa6";
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
import { ALL_BLOGS, GET_BLOG, GET_BRAND } from "@/utils/ApiRoutes";
import { useCallback, useEffect, useState } from "react";
import { Brand, Category, SubCategory } from "next-auth";
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
import Image from "next/image";
import "@/app/components/themes/PlaygroundEditorTheme.css";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { useDotButton } from "@/app/components/CarouselDotButton";
import { NextButton, PrevButton, usePrevNextButtons } from "@/app/components/CarouselArrowButtons";

import '@/app/components/Carousel.css';
import { Model } from "next-auth";
import { formatPriceHelper } from "@/utils/helper";
import { MdHome } from "react-icons/md";

export default function Index() {
	const params = useParams();
	const brandSlug = params["brand-slug"];

	const imageUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const [brand, setBrand] = useState<Brand>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>();
	const [modelSubCategoryIds, setModelSubCategoryIds] = useState<Set<number>>(new Set());

	const getBrand = async () => {
		try {
			// const rest = await axiosAuth.get(ALL_BLOGS);
			const res = await axiosAuth.get(GET_BRAND(brandSlug));
			if (res.data) {
				setBrand(res.data.brand);
				// setModelSubCategoryIds(new Set(res.data.brand.models.map((model: Model) => model.sub_category.id)));
				const subCategoryIds: Set<number> = new Set(res.data.brand.models.map((model: Model) => model.sub_category.id));
				setModelSubCategoryIds(subCategoryIds);

				// Get first matching sub-category
				const firstSubCategory = res.data.brand.categories
					.flatMap((category: Category) => category.sub_categories) // Flatten all sub_categories
					.find((sub_category: SubCategory) => subCategoryIds.has(sub_category.id)); // Get first valid sub_category

				if (firstSubCategory) {
					setSelectedSubCategory(firstSubCategory); // Set first entry as selected
				}
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
		if (brandSlug) {
			getBrand();
		}
	}, [brandSlug]);


	const OPTIONS: EmblaOptionsType = { align: 'start', dragFree: true, loop: true }
	const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Autoplay()])

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay
		if (!autoplay) return

		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop

		resetOrStop()
	}, [])
	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick
	} = usePrevNextButtons(emblaApi, onNavButtonClick)
	return (
		<>
			<div className="py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="flex flex-wrap mb-6 gap-4">
						<div className="w-full">
							{brand ? (
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
												<BreadcrumbPage>{brand.name}</BreadcrumbPage>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</>
							) : (
								<Skeleton className="h-8 w-full md:w-64 rounded-xl shadow-xl" />
							)}
						</div>
						<div className="w-full">
							{brand ? (
								<h1 className="text-2xl font-semibold">
									{brand.name} 2025 Car Models, Prices & Pictures in Pakistan
								</h1>
							) : (
								<Skeleton className="h-8 w-full md:w-1/2 rounded-xl shadow-xl" />
							)}
						</div>
						<div className="w-full bg-white rounded-xl shadow-xl border flex flex-col p-4">
							<div className="w-full grid md:grid-cols-4 gap-4">
								<div className="flex flex-col">
									{brand ? (
										<div className="relative w-full h-full max-h-60 rounded-xl shadow-xl border bg-primary/5">
											<Image
												src={`${imageUrl}/${brand.logo}`}
												alt={brand.name}
												fill
												className="object-cover"
											/>
										</div>
									) : (
										<>
											<Skeleton className="h-60 w-full rounded-xl shadow-xl" />
										</>
									)}
								</div>
								<div className="flex flex-col md:col-span-3">
									{!brand ? (
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
											<div className="">
												<span className="text-2xl font-bold text-primary">
													{brand.name}
												</span>
											</div>
											<div
												dangerouslySetInnerHTML={{ __html: brand.content }}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full bg-white py-6">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					{brand && <h2 className="text-2xl font-bold mb-4">
						{brand.name} 2025 Price in Pakistan
					</h2>}

					<div
						dangerouslySetInnerHTML={{ __html: brand?.description || '' }}
					/>
				</div>
				<div className="w-full mb-3 bg-white py-6">
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
						<div className="w-full shadow-xl">
							<Table className="w-full mt-6">
								<TableHeader>
									<TableRow>
										<TableHead className="border border-black h-14 font-black text-xl text-gray-900">
											Models
										</TableHead>
										<TableHead className="border border-black h-14 font-black text-xl text-gray-900">
											Ex-Factory Price
											<div className="text-xs text-gray-600 font-normal"> (From base variant to most expensive one) </div>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{brand?.models?.map((model: Model) => (
										<TableRow key={model.id}>
											<TableCell className="border h-12 border-black">
												<div className="font-semibold text-xl text-primary">
													{model.name}
												</div>
											</TableCell>
											<TableCell className="border h-12 border-black">
												<span className="font-semibold text-green-500">
													{/* Price formatting */}
													{new Intl.NumberFormat("en-US", { style: "currency", currency: "PKR" }).format(
														(model?.variants?.reduce((min, v) => (v.price < min.price ? v : min), model?.variants[0])?.price ?? 0)
													)}
													{ " - "}
													{new Intl.NumberFormat("en-US", { style: "currency", currency: "PKR" }).format(
														(model?.variants?.reduce((max, v) => (v.price < max.price ? v : max), model?.variants[0])?.price ?? 0)
													)}
												</span>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>

			</div>
			<div className="">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="flex flex-wrap mb-6 gap-4">
						<div className="w-full mt-4">
							{!brand ? (
								<div  className="w-full grid md:grid-cols-6 gap-4">
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
								</div>
							) : (

								<section className="embla w-full">
									<div className="embla__viewport" ref={emblaRef}>
										<div className="embla__container">

											{brand.categories.map((category) => {

												return category.sub_categories
													.filter((sub_category: SubCategory) => modelSubCategoryIds.has(sub_category.id))
													.map((sub_category: SubCategory) => (
														<div key={sub_category.id} className="embla__slide px-2" onClick={() => setSelectedSubCategory(sub_category)}>
															<div className="flex flex-col whitespace-nowrap">
																<div className="border border-indigo-500 rounded-full text-center p-2 font-bold shadow-xl cursor-pointer">
																	{sub_category.name}
																</div>
															</div>
														</div>
													));
											})}

										</div>
									</div>
								</section>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-white">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="flex flex-wrap mb-6 gap-4">
						<div className="w-full my-8">
						<div  className="w-full grid md:grid-cols-4 gap-4">
							{!selectedSubCategory ? (
								<div  className="w-full md:col-span-1">
								</div>
							) : (
								brand?.models
									?.filter((model: Model) => model.sub_category.id === selectedSubCategory.id)
									?.map((model: Model) => (
										<div key={model.id} className="border rounded-xl shadow-xl flex flex-col md:col-span-1 bg-white">
											<Link title={brand.name} href={`/new-cars/${brandSlug}/${model.slug}`} >
												<div className="relative w-full rounded-t-xl bg-white border-0 flex flex-col justify-center">
													<div className="flex items-center justify-start absolute left-4 top-4 z-10">
														<ul className="flex gap-2">
															{ ((model?.images ?? []).length > 0) && (
																<li className="flex items-center gap-3 bg-gray-200 rounded-full py-0.5 px-2 text-primary">
																	<FaPhotoFilm size={20} />
																	{model.images?.length}
																</li>
															)}
														</ul>
													</div>
													<Image 
														src={`${imageUrl}/${model.images?.[0] ?? "uploads/photo/company-placeholder.png"}`} 
														className="w-full rounded-t-xl" 
														width={300} // Default width
														height={300} // Default height
														priority 
														alt={brand.name} 
													/>
												</div>
											</Link>
											<div className="flex flex-col gap-1 p-4">
												<div className="text-primary">
													{selectedSubCategory.name}
												</div>
												<Link title={brand.name} href={`/new-cars/${brandSlug}/${model.slug}`} >
													<h5 className="text-xl font-bold text-black">
														{model.name}
													</h5>
												</Link>
												<span className="font-semibold text-green-500">
													{(() => {
														const minPrice = formatPriceHelper(model?.variants?.reduce((min, v) => (v.price < min.price ? v : min), model?.variants[0])?.price ?? 0);
														const maxPrice = formatPriceHelper(model?.variants?.reduce((max, v) => (v.price > max.price ? v : max), model?.variants[0])?.price ?? 0);

														return minPrice === maxPrice ? (
															<span>{minPrice}</span>
														) : (
															<span>{minPrice} - {maxPrice}</span>
														);
													})()}
												</span>
												<hr className="my-3" />
												<div className="flex text-sm">
													<div className="flex items-center gap-2">
														<GiGearStickPattern 
															size={"1.5em"}
															className="text-primary"
														/>
														<span>
															{(() => {
																const transmissions = model?.variants?.map(v => v.transmission);
																const uniqueTransmissions = [...new Set(transmissions)];
																
																return <span>
																{uniqueTransmissions.length === 1 ? uniqueTransmissions[0] : "Automatic & Manual"}
																</span>
																
															})()}
														</span>
													</div>

												</div>
												<div className="flex text-sm">
													<div className="flex items-center gap-2">
														<PiGasPumpBold 
															size={"1.5em"}
															className="text-primary"
														/>
														<span>
															{(() => {
																const fuelTypes = model?.variants?.map(v => v.fuel_type);
																const uniqueFuelTypes = [...new Set(fuelTypes)];
																
																return <span>
																{uniqueFuelTypes.length === 1 
																? uniqueFuelTypes[0] 
																: uniqueFuelTypes.join(", ")}
															</span>
																
															})()}
														</span>
													</div>

												</div>
												<div className="flex text-sm">
													<div className="flex items-center gap-2">
														<IoSpeedometerOutline 
															size={"1.5em"}
															className="text-primary"
														/>
														<span>
															{(() => {
																const minMileage = model?.variants?.reduce((min, v) => (v.mileage_from < min.mileage_from ? v : min), model?.variants[0])?.mileage_from ?? 0;
																const maxMileage = model?.variants?.reduce((max, v) => (v.mileage_to > max.mileage_to ? v : max), model?.variants[0])?.mileage_to ?? 0;

																return minMileage === maxMileage ? (
																	<span>{minMileage} km/ltr</span>
																) : (
																	<span>{minMileage} km/ltr - {maxMileage} km/ltr</span>
																);
															})()}
														</span>
													</div>
												</div>
												<div className="flex text-sm">
													<div className="flex items-center gap-2">
														<PiEngineBold 
															size={"1.5em"}
															className="text-primary"
														/>
														<span>
															{(() => {
																const minCc = model?.variants?.reduce((min, v) => (v.cc < min.cc ? v : min), model?.variants[0])?.cc ?? 0;
																const maxCc = model?.variants?.reduce((max, v) => (v.cc > max.cc ? v : max), model?.variants[0])?.cc ?? 0;

																return minCc === maxCc ? (
																	<span>{minCc} cc</span>
																) : (
																	<span>{minCc} cc - {maxCc} cc</span>
																);
															})()}
														</span>
													</div>
												</div>
											</div>
										</div>
									))
							)
						}
						</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
