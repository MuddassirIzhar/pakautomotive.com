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
import {
  FaCheck,
  FaCheckDouble,
  FaGasPump,
  FaSquareCheck,
  FaThumbsDown,
  FaThumbsUp,
  FaX,
} from "react-icons/fa6";
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
import { ALL_FEATURE_AND_SPECIFICATIONS, GET_VARIANT } from "@/utils/ApiRoutes";
import { useEffect, useState } from "react";
import { Variant, Pros, Cons, Color } from "next-auth";
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
import {
  formatPriceHelper,
  groupedFeatureAndSpecificationHelper,
} from "@/utils/helper";
import { FeatureAndSpecification } from "next-auth";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { HomeIcon } from "lucide-react";
import { MdHome } from "react-icons/md";

export default function Index() {
  const params = useParams();
  const variantSlug = params["variant-slug"];
  const [variant, setVariant] = useState<Variant>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [featureAndSpecifications, setFeatureAndSpecifications] = useState<
    FeatureAndSpecification[]
  >([]);

  const getVariant = async () => {
    try {
      // const rest = await axiosAuth.get(ALL_BLOGS);
      const res = await axiosAuth.get(GET_VARIANT(variantSlug));
      if (res.data) {
        console.log(res.data.variant);
        setVariant(res.data.variant);
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
  const getAllFeatureAndSpecifications = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const url = new URL(`${BASE_URL}/${ALL_FEATURE_AND_SPECIFICATIONS}`);
      const res = await axiosAuth.get(url.toString());
      console.log(res.data.data);
      setFeatureAndSpecifications(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching brands:", error);
      alert("Error fetching the brands. Please try again.");
    }
  };
  useEffect(() => {
    if (variantSlug) {
      getVariant();
      getAllFeatureAndSpecifications();
    }
  }, [variantSlug]);

  const [groupedFeatureAndSpecification, setGroupedFeatureAndSpecification] =
    useState<
      Record<
        string,
        Record<
          string,
          {
            text: FeatureAndSpecification[];
            number: FeatureAndSpecification[];
            boolean: FeatureAndSpecification[];
          }
        >
      >
    >({});
  useEffect(() => {
    if (featureAndSpecifications?.length) {
      setGroupedFeatureAndSpecification(
        groupedFeatureAndSpecificationHelper(featureAndSpecifications)
      );
    }
  }, [featureAndSpecifications]);
  return (
    <>
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-wrap mb-6 gap-4">
            <div className="w-full">
              {variant ? (
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
							<Link href={`/new-cars/${variant.brand.slug}`}>
							{variant.brand.name}
							</Link>
						</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
					  <BreadcrumbLink asChild>
							<Link href={`/new-cars/${variant.brand.slug}/${variant.model.slug}`}>
								{variant.model.name}
							</Link>
							</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{variant.name}</BreadcrumbPage>
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
                {variant ? (
                  <ImageSlider images={variant.images || []} />
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
              {!variant ? (
                <Skeleton className="h-[530px] w-full rounded-xl shadow-xl" />
              ) : (
                <>
                  <div className="flex flex-col">
                    <Card className="w-full shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-2xl">
                          {variant.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-baseline gap-1 text-xs">
                          <b className="text-base text-indigo-500">
                            {(() => {
                              const price = formatPriceHelper(
                                variant?.price ?? 0
                              );

                              return <span>{price}</span>;
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
                                      variant?.mileage_from ?? 0;
                                    const maxMileage = variant?.mileage_to ?? 0;

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
                                  {variant?.fuel_type}
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
                                  {variant?.transmission}
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
                                <b className="text-base">{variant?.cc} cc</b>
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
              {!variant ? (
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
                      {/* {variant?.brand.name} {variant?.name} */}
                      Overview
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
              dangerouslySetInnerHTML={{ __html: variant?.description || "" }}
            />
            <div className="w-full">
              <Table className="border-2 border-indigo-500 rounded-xl shadow-xl w-full mt-6">
                <TableCaption>
                  A list other Variants of {variant?.brand.name} {variant?.name}{" "}
                  2025.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-12 font-black text-xl text-gray-900">
                      Other Variants
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
                  {variant?.model.variants
                    ?.filter((v) => v.id !== variant.id)
                    .map((otherVariant: Variant) => (
                      <TableRow key={otherVariant.id}>
                        <TableCell>
                          <div className="font-semibold text-base">
                            {otherVariant.name}
                          </div>
                          <div className="">
                            {otherVariant.cc} cc, {otherVariant.fuel_type},{" "}
                            {otherVariant.transmission}.
                          </div>
                          <div>{otherVariant.year}</div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-indigo-500">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "PKR",
                            }).format(otherVariant.price)}
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
                {variant?.name} Colors
              </h2>
              <h2 className="mb-4">
                {variant?.name} is available in {variant?.colors?.length}{" "}
                color(s) -
                {variant?.colors &&
                  variant.colors.length > 0 &&
                  (variant.colors.length === 1
                    ? variant.colors[0].name
                    : variant.colors
                        .map((color: Color) => color.name)
                        .reduce((acc, curr, idx, arr) => {
                          if (idx === arr.length - 1)
                            return ` ${acc}, and ${curr}.`;
                          return ` ${acc}, ${curr}`;
                        }))}
              </h2>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-6 gap-1 md:gap-2 lg:gap-3">
                {variant?.colors?.map((color: Color) => (
                  <div className="col-span-2 md:col-span-1" key={color.id}>
                    <Card className="cursor-pointer rounded-xl shadow-xl border-0">
                      <CardContent className="flex flex-col justify-center items-center p-2 gap-2">
                        <span
                          className="rounded-full shadow-xl border bg-white p-8 flex items-center justify-center"
                          style={{ background: color.hex }}
                        ></span>
                        {color.name}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-wrap mb-6 gap-4">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">
                {variant?.name} Overview
              </h2>
            </div>
            <div className="w-full">
              <Card className="w-full shadow-xl">
                <CardContent className="p-6">
                  <div className="w-full grid md:grid-cols-1 gap-4">
                    {!variant ? (
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
                          dangerouslySetInnerHTML={{ __html: variant.content }}
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
      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-wrap mb-6 gap-4">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">
                {variant?.name} Features & Specifications
              </h2>
            </div>
			</div>
			</div>
                {!variant ? (
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
						<div className="w-full">
						<div className="w-full grid md:grid-cols-1 gap-4">
							<div className="flex flex-col gap-8">
								<Skeleton className="h-12 w-full md:w-32 rounded-xl shadow-xl" />
								<div className="flex flex-col gap-2">
								<Skeleton className="h-8 w-full md:w-[100%] rounded-xl shadow-xl" />
								<Skeleton className="h-8 w-full md:w-[95%] rounded-xl shadow-xl" />
								<Skeleton className="h-8 w-full md:w-[98%] rounded-xl shadow-xl" />
								<Skeleton className="h-8 w-full md:w-[40%] rounded-xl shadow-xl" />
								</div>
							</div>
						</div>
						</div>
					</div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {Object.entries(groupedFeatureAndSpecification).map(
                      ([type, categories]) => (
                        <div key={type} className="mb-6 w-full grid gap-4 ">
							<div className="bg-white">
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
						<div className="w-full h-16 flex items-center">
								<h2 className="text-xl font-bold mb-2 capitalize">
									{type}
								</h2>
							</div>
							</div>
							</div>

							<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
						<div className="w-full grid gap-8">
                          {Object.entries(categories).map(
                            ([category, fieldsByType]) => (
                              <Card key={category} className="w-full shadow-xl">
							  <CardHeader className="bg-gray-100 rounded-t-xl">
								<CardTitle className="text-lg">
								{category}
								</CardTitle>
							  </CardHeader>
                                <CardContent className="px-x py-8 space-y-4">

                                  <div className="w-full grid gap-4 gap-y-8">
                                    <div className="w-full grid md:grid-cols-3 gap-4">
                                      {/* Text and Number fields */}
                                      {(fieldsByType.number.length > 0 ||
                                        fieldsByType.text.length > 0) &&
                                        [
                                          ...fieldsByType.text,
                                          ...fieldsByType.number,
                                        ].map((field, indexOfField) => {
                                          const spec =
                                            variant?.variantFeatureAndSpecifications?.find(
                                              (fas) =>
                                                fas.featureAndSpecification
                                                  .id === field.id
                                            );
                                          if (!spec) return null;
                                          return (
                                            <div
                                              key={field.id}
                                                className="w-full grid md:grid-cols-2 gap-4 border shadow-xl rounded-xl p-2 min-h-16 items-center"
                                            >
                                              <span className="text-sm text-start">
                                                {field.name}
                                              </span>
                                              <span className="text-base font-semibold flex flex-row justify-end items-end text-end">
                                                {spec.value}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      {/* Boolean fields */}
                                      {fieldsByType.boolean.length > 0 &&
                                        fieldsByType.boolean.map(
                                          (field, indexOfField) => {
                                            const spec =
                                              variant?.variantFeatureAndSpecifications?.find(
                                                (fas) =>
                                                  fas.featureAndSpecification
                                                    .id === field.id
                                              );
                                            if (!spec) return null;
                                            return (
                                              <div
                                                key={field.id}
                                                className="w-full grid md:grid-cols-2 gap-4 border shadow-xl rounded-xl p-2 min-h-16 items-center"
                                              >
												<span className="text-sm text-start">
													{field.name}
												</span>
												<span className="text-xl font-semibold flex flex-row justify-end items-start">
													{spec.value === "true" && <FaCheckCircle className="text-green-500"/>}
													{spec.value === "false" && <FaTimesCircle className="text-red-500"/>}
												</span>
                                              </div>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                        </div>
                        </div>
                      )
                    )}
                  </div>
                )}
      </div>
    </>
  );
}
