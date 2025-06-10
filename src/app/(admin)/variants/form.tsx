"use client"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { variantCreateUpdateSchema } from "@/app/(admin)/validation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { CREATE_VARIANT, UPDATE_VARIANT } from "@/utils/ApiRoutes";
import { Brand, Color, FeatureAndSpecification, Model, Variant } from "next-auth";
import { FaCheck, FaChevronDown, FaSpinner, FaXmark } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Minus } from "lucide-react";
import { DropZone } from "@/app/components/DropZone";
import dynamic from "next/dynamic";
const SettingsContext = dynamic(() => import("@/app/components/context/SettingsContext").then(mod => mod.SettingsContext), { ssr: false });
import { FlashMessageContext } from "@/app/components/context/FlashMessageContext";
import RichTextEditor from "@/app/components/RichTextEditor";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { groupedFeatureAndSpecificationHelper } from "@/utils/helper";

interface Option {
	id: number;
	name: number;
}

let years: Option[] = [];
let minYear = 1990;
let maxYear = new Date().getFullYear();

while (minYear <= maxYear) {
    years[minYear] = { id: minYear, name: minYear };
    minYear++;
}
enum TransmissionEnum {
    AUTOMATIC = "Manual",
    MANUAL = "Automatic",
	BOTH = "Automatic & Manual",
}
enum FuelTypeEnum {
    PETROL = "Petrol",
    DIESEL = "Diesel",
    ELECTRIC = "Electric",
    HYBRID = "Hybrid",
}

// Sort by `id` in descending order (largest first)
years = years.sort((a, b) => b.id - a.id);
interface variantForm {
    name: string;
    heading: string;
    price: number;
    brand: number;
    model: number;
    year: number;
    description: string;
    content: string;
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
	mileage_from: number;
	mileage_to: number;
	cc: number;
	transmission: TransmissionEnum;
	fuel_type: FuelTypeEnum;
	images?: (any | undefined)[] | undefined;
	existingImages: string[];
    colors?: Array<{ name: string, hex: string }>;
    featureAndSpecifications?: Array<{ fas_id: number, value: boolean | string }>;
	// colors?: Color[];
}
const Form = ({ brands, allFeatureAndSpecifications, variant, submissionCallback, noUpdateCallback, cancelCallback }: { brands: Brand[], allFeatureAndSpecifications: FeatureAndSpecification[], variant?: Variant | null | undefined, submissionCallback: () => void, noUpdateCallback: () => void, cancelCallback: () => void }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>('Create');
    const [openBrand, setOpenBrand] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openYear, setOpenYear] = useState(false);
    const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [openTransmission, setOpenTransmission] = useState(false);
    const [selectedTransmission, setSelectedTransmission] = useState<TransmissionEnum | null>(null);
    const transmissionOptions = Object.values(TransmissionEnum).map((value, index) => ({
        id: index, // Index as ID
        name: value, // Enum value as name
        }));
    const [openFuelType, setOpenFuelType] = useState(false);
    const [selectedFuelType, setSelectedFuelType] = useState<FuelTypeEnum | null>(null);
    const fuelTypeOptions = Object.values(FuelTypeEnum).map((value, index) => ({
        id: index, // Index as ID
        name: value, // Enum value as name
    }));
    const [clearCount, setClearCount] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    // This maps each master field to a default structure
    // const initializeVariantFeatures = (specs: FeatureAndSpecification[]) => {
    //     return specs.map((spec: FeatureAndSpecification) => {
    //       return {
    //         fas_id: spec.id,
    //         value: spec.field === "boolean" ? false : "", // or false for default boolean
    //       };
    //     });
    // };
    const initializeVariantFeatures = (specs: FeatureAndSpecification[]) => {
        return specs.map(spec => ({
          fas_id: spec.id,
          value: spec.field === "boolean" ? false : "",
        }));
      };
    const variantOptions = {
        resolver: yupResolver(variantCreateUpdateSchema),
        context: { isUpdate: !!variant },
        defaultValues: {
            mileage_from: 0,
            mileage_to: 0,
            cc: 0,
            images:[],
            existingImages:[],
            colors: [{name:"", hex:""}],
            featureAndSpecifications: initializeVariantFeatures(allFeatureAndSpecifications),
        },
    };
    const { register: variantFields, control: variantControl, formState: { errors: variantErrors }, reset: variantFormReset, handleSubmit: submitVariant, setValue: setVariant, getValues: getVariant, } = useForm<variantForm>(variantOptions);

    const { fields: colorFields, append: colorAppend, remove: colorRemove } = useFieldArray({
        control:variantControl,
        name: "colors",
    });
    const { fields: featureAndSpecificationsFields, append: featureAndSpecificationsAppend, remove: featureAndSpecificationsRemove } = useFieldArray({
        control:variantControl,
        name: "featureAndSpecifications",
    });
    const onSubmitVariant = async (data: FormEvent<HTMLFormElement> | any, e: any) => {
        setIsLoading(true);
        console.log(data)
        try {
            if (variant) {
                const res = await axiosInstance.put(UPDATE_VARIANT(variant.id), data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
            } else {
                const res = await axiosInstance.post(CREATE_VARIANT, data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
            }
            e.target.reset();
            variantFormReset();
            setDescription("");
            setContent("");
            setSelectedTransmission(null);
            setSelectedFuelType(null);
            setSelectedBrand(null);
            setSelectedModel("");
            setSelectedYear(null);
            submissionCallback()
            setIsLoading(false);
            setClearCount((prevKey) => prevKey + 1);
            setFormResetCount((prevKey) => prevKey + 1);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.errors?.length > 0) {
                    toast.error(error.response?.data?.errors[0], {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                }
                toast.error(error.response?.data.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            } else {
                toast.error(error.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
            setIsLoading(false);
        }
    }
    const [formResetCount, setFormResetCount] = useState<number>(0);
    const DescriptionChange = (value: string) => {
        setDescription(value);
    };
    const ContentChange = (value: string) => {
        setContent(value);
    };
    useEffect(() => {
        if (content) {
            setVariant("content", content)
        }
    }, [content]);
    useEffect(() => {
        if (description) {
            setVariant("description", description)
        }
    }, [description]);
	const [groupedFeatureAndSpecification, setGroupedFeatureAndSpecification] = useState<Record<string, Record<string, { text: FeatureAndSpecification[]; number: FeatureAndSpecification[]; boolean: FeatureAndSpecification[] }>>>({});

    useEffect(() => {
        if (allFeatureAndSpecifications?.length) {
            setGroupedFeatureAndSpecification(groupedFeatureAndSpecificationHelper(allFeatureAndSpecifications));
            setVariant('featureAndSpecifications', initializeVariantFeatures(allFeatureAndSpecifications));
        }
    }, [allFeatureAndSpecifications]);
    useEffect(() => {
        if (variant) {
            setFormResetCount((prevKey) => prevKey + 1);
            setClearCount((prevKey) => prevKey + 1);
            setVariant("featureAndSpecifications",
                allFeatureAndSpecifications.map((spec) => {
                    const existing = variant.variantFeatureAndSpecifications?.find(
                        (fas) => fas.featureAndSpecification.id === spec.id
                    );
                  return {
                    fas_id: spec.id,
                    value: existing
                      ? existing.value
                      : spec.field === "boolean"
                        ? false
                        : "", // for text/number
                  };
                })
              );
            setVariant("colors", variant.colors?.map(color => ({ name: color.name, hex: color.hex })) || [])
            setDescription(variant.description);
            setContent(variant.content);
            setVariant("name", variant.name)
            setVariant("heading", variant.heading)
            setVariant("description", variant.description)
            setVariant("content", variant.content)
            setVariant("transmission", variant.transmission)
            setSelectedTransmission(variant.transmission);
            setVariant("fuel_type", variant.fuel_type)
            setSelectedFuelType(variant.fuel_type);
            setVariant("mileage_from", variant.mileage_from)
            setVariant("mileage_to", variant.mileage_to)
            setVariant("cc", variant.cc)
            setVariant("price", variant.price)
            setVariant("meta_title", variant.meta_title)
            setVariant("meta_keywords", variant.meta_keywords)
            setVariant("meta_description", variant.meta_description)
            setVariant("brand", variant.brand.id)
            setVariant("model", variant.model.id)
            setSelectedBrand(variant.brand);
            setSelectedModel(variant.model.id.toString());
            setSelectedYear(variant.year);
            setHeading("Update");
            setVariant("images", variant.images)
            setExistingImages(variant.images || []);
            setVariant("existingImages",variant.images || [])


            const initializedFeatures = allFeatureAndSpecifications.map((spec) => {
                const existing = variant.variantFeatureAndSpecifications?.find(
                    (fas) => fas.featureAndSpecification.id === spec.id
                );
                return {
                    fas_id: spec.id,
                    value: existing ? existing.value : spec.field === "boolean" ? false : ""
                };
            });
            // console.log(initializedFeatures)
            setVariant("featureAndSpecifications", initializedFeatures);
        } else {
            console.log('create',allFeatureAndSpecifications[0])
            // variantFormReset();
            // setVariant('featureAndSpecifications', initializeVariantFeatures(allFeatureAndSpecifications));
            variantFormReset(variantOptions.defaultValues);
            setHeading("Create");
        }
    }, [variant]);
    useEffect(() => {
        if (selectedBrand) {
            setVariant("brand", selectedBrand.id);
            setVariant("model", parseInt(selectedModel));

        }
    }, [selectedBrand]);
    useEffect(() => {
        if (selectedModel) {
            setVariant("model", parseInt(selectedModel));
        }
    }, [selectedModel]);
    useEffect(() => {
        if (selectedTransmission) {
            setVariant("transmission", selectedTransmission)
        }
    }, [selectedTransmission]);
    useEffect(() => {
        if (selectedFuelType) {
            setVariant("fuel_type", selectedFuelType)
        }
    }, [selectedFuelType]);
    useEffect(() => {
        if (selectedYear) {
            setVariant("year", selectedYear)
        }
    }, [selectedYear]);
    const cancelUpdate = () => {
        setSelectedBrand(null);
        setSelectedModel("");
        setSelectedYear(null);
        cancelCallback();
    }

    useEffect(() => {
        console.log(variantErrors)
    }, [variantErrors]);
    useEffect(() => {
        console.log(featureAndSpecificationsFields)
    }, [featureAndSpecificationsFields]);
    return (


        <form onSubmit={submitVariant(onSubmitVariant)} autoComplete="new-password">
            <Card className="w-full shadow-xl">
                <CardHeader>
                    <CardTitle>{heading} Variant</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="w-full grid md:grid-cols-3 gap-4">
                        <div className="flex flex-col md:col-span-2 space-y-1.5">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                                id="Name"
                                type="text"
                                {...variantFields("name")}
                                className={
                                    variantErrors.name
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {variantErrors.name && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Price">Price</Label>
                            <Input
                                id="Price"
                                type="text"
                                {...variantFields("price")}
                                className={
                                    variantErrors.price
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {variantErrors.price && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.price.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Brand</Label>
                            {/* Brand Dropdown */}
                            <Popover open={openBrand} onOpenChange={setOpenBrand}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openBrand}
                                        className="w-full flex justify-between"
                                    >
                                        {selectedBrand
                                            ? brands.find((brand) => brand.id === selectedBrand.id)
                                                ?.name
                                            : "Select Brand"}
                                        <FaChevronDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start" sideOffset={10}>
                                    <Command>
                                        <CommandInput
                                            placeholder="Select Brand"
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No brand found.</CommandEmpty>
                                            <CommandGroup>
                                                {brands.map((brand) => (
                                                    <CommandItem
                                                        key={brand.id}
                                                        value={brand.id.toString()}
                                                        onSelect={(currentValue) => {
                                                            setOpenBrand(false);
                                                            const selected = brands.find((brand) => brand.id.toString() === currentValue) || null;
                                                            setSelectedBrand(selected);
                                                            setSelectedModel("");
                                                        }}
                                                    >
                                                        {brand.name}
                                                        <FaCheck
                                                            className={cn(
                                                                "ml-auto",
                                                                selectedBrand?.id === brand.id
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {variantErrors.brand && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.brand.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Model</Label>
                            {/* Model Dropdown */}
                            <Popover open={openModel} onOpenChange={setOpenModel}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openModel}
                                        className="w-full flex justify-between"
                                    >
                                        {selectedModel
                                            ? selectedBrand?.models.find((model) => model.id === parseInt(selectedModel))
                                                ?.name
                                            : "Select Model"}
                                        <FaChevronDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start" sideOffset={10}>
                                    <Command>
                                        <CommandInput
                                            placeholder="Select Model"
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No model found.</CommandEmpty>
                                            <CommandGroup>
                                                {selectedBrand?.models.map((model) => 
                                                    <CommandItem
                                                        key={model.id}
                                                        value={model.id.toString()}
                                                        onSelect={(currentValue) => {
                                                            setSelectedModel(currentValue === selectedModel ? "" : currentValue);
                                                            setOpenModel(false);
                                                        }}
                                                    >
                                                        {model.name}
                                                        <FaCheck
                                                            className={cn(
                                                                "ml-auto",
                                                                parseInt(selectedModel) === model.id
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {variantErrors.model && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.model.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Year</Label>
                            {/* Year Dropdown */}
                            <Popover open={openYear} onOpenChange={setOpenYear}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openYear}
                                        className="w-full flex justify-between"
                                    >
                                        {selectedYear
                                            ? years.find((year) => year.id === selectedYear)
                                                ?.name
                                            : "Select Year"}
                                        <FaChevronDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start" sideOffset={10}>
                                    <Command>
                                        <CommandInput
                                            placeholder="Select Year"
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No year found.</CommandEmpty>
                                            <CommandGroup>
                                                {years.map((year) => (
                                                    <CommandItem
                                                        key={year.id}
                                                        value={year.id.toString()}
                                                        onSelect={(currentValue) => {
                                                            setSelectedYear(parseInt(currentValue) === selectedYear ? null : parseInt(currentValue));
                                                            setOpenYear(false);
                                                        }}
                                                    >
                                                        {year.name}
                                                        <FaCheck
                                                            className={cn(
                                                                "ml-auto",
                                                                selectedYear === year.id
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {variantErrors.year && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.year.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-3 space-y-1.5">
                            <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="Name">Transmission</Label>
                                    <Popover open={openTransmission} onOpenChange={setOpenTransmission}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openTransmission}
                                                className="w-full flex justify-between"
                                            >
                                                {selectedTransmission
                                                    ? transmissionOptions.find((transmission) => transmission.name === selectedTransmission)?.name
                                                    : "Select Transmission"}
                                                <FaChevronDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="start" sideOffset={10}>
                                            <Command>
                                                <CommandInput
                                                    placeholder="Select Transmission"
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No transmission found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {transmissionOptions.map((transmission) => (
                                                            <CommandItem
                                                                key={transmission.id}
                                                                value={transmission.id.toString()}
                                                                onSelect={(currentValue) => {
                                                                    const selected = transmissionOptions.find((transmission) => transmission.id.toString() === currentValue) || null;
                                                                    setSelectedTransmission(selected?.name || null);
                                                                    setOpenTransmission(false);
                                                                }}
                                                            >
                                                                {transmission.name}
                                                                <FaCheck
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        selectedTransmission === transmission.name
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    {variantErrors.transmission && (
                                        <p className="text-red-500 text-sm">
                                            {variantErrors.transmission.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="Name">Fuel Type</Label>
                                    <Popover open={openFuelType} onOpenChange={setOpenFuelType}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openFuelType}
                                                className="w-full flex justify-between"
                                            >
                                                {selectedFuelType
                                                    ? fuelTypeOptions.find((fuel_type) => fuel_type.name === selectedFuelType)?.name
                                                    : "Select Fuel Type"}
                                                <FaChevronDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="start" sideOffset={10}>
                                            <Command>
                                                <CommandInput
                                                    placeholder="Select Fuel Type"
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No fuel_type found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {fuelTypeOptions.map((fuel_type) => (
                                                            <CommandItem
                                                                key={fuel_type.id}
                                                                value={fuel_type.id.toString()}
                                                                onSelect={(currentValue) => {
                                                                    const selected = fuelTypeOptions.find((fuel_type) => fuel_type.id.toString() === currentValue) || null;
                                                                    setSelectedFuelType(selected?.name || null);
                                                                    setOpenFuelType(false);
                                                                }}
                                                            >
                                                                {fuel_type.name}
                                                                <FaCheck
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        selectedFuelType === fuel_type.name
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    {variantErrors.fuel_type && (
                                        <p className="text-red-500 text-sm">
                                            {variantErrors.fuel_type.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Engine (cc)</Label>
                                    <div className="flex flex-col gap-x-2">
                                        <div className="flex items-center gap-x-2">
                                            <Input
                                                id="cc_from"
                                                type="number"
                                                {...variantFields("cc")}
                                                className={
                                                    variantErrors.cc
                                                        ? "border-red-500 text-center"
                                                        : " text-center"
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            {variantErrors.cc && (
                                                <p className="text-red-500 text-sm">
                                                    {variantErrors.cc.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Mileage (km/ltr)</Label>
                                    <div className="flex flex-col gap-x-2">
                                        <div className="flex items-center gap-x-2">
                                            <Input
                                                id="mileage_from"
                                                type="number"
                                                {...variantFields("mileage_from")}
                                                className={
                                                    variantErrors.mileage_from
                                                        ? "border-red-500 text-center"
                                                        : " text-center"
                                                }
                                            />
                                            <Minus />
                                            <Input
                                                id="mileage_to"
                                                type="number"
                                                {...variantFields("mileage_to")}
                                                className={
                                                    variantErrors.mileage_to
                                                        ? "border-red-500 text-center"
                                                        : " text-center"
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            {variantErrors.mileage_from && (
                                                <p className="text-red-500 text-sm">
                                                    {variantErrors.mileage_from.message}
                                                </p>
                                            )}
                                            {variantErrors.mileage_to && (
                                                <p className="text-red-500 text-sm">
                                                    {variantErrors.mileage_to.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:col-span-3 lg:col-span-3 space-y-1.5">
                            <Label htmlFor="heding">Heading</Label>
                            <Input
                                id="heding"
                                type="text"
                                {...variantFields("heading")}
                                className={
                                    variantErrors.heading
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {variantErrors.heading && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.heading.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-3 lg:col-span-3 space-y-1.5">
                            <Label>Short Description</Label>
                            <div className="w-full">
                                <SettingsContext>
                                    <FlashMessageContext>
                                        <RichTextEditor key={formResetCount} onChange={DescriptionChange} value={description} />
                                    </FlashMessageContext>
                                </SettingsContext>
                                {variantErrors.description && (
                                    <p className="text-red-500 text-sm">
                                        {variantErrors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col md:col-span-3 lg:col-span-3 space-y-1.5">
                            <Label>Content</Label>
                            <div className="w-full">
                                <SettingsContext>
                                    <FlashMessageContext>
                                        <RichTextEditor key={formResetCount} onChange={ContentChange} value={content} />
                                    </FlashMessageContext>
                                </SettingsContext>
                                {variantErrors.content && (
                                    <p className="text-red-500 text-sm">
                                        {variantErrors.content.message}
                                    </p>
                                )}
                            </div>
                        </div>

						<div className="flex flex-col md:col-span-3 lg:col-span-3 space-y-1.5">
							<div className="flex justify-between">
								<Label htmlFor="Colors">Colors</Label>
								<Button
									type="button"
									size={'sm'}
									title="Add Colors"
									onClick={() => colorAppend({name: '', hex: '#ffffff'})}
								>
									<FaPlus />
								</Button>
							</div>

							<div className="flex-col md:col-span-3 lg:col-span-3 grid md:grid-cols-3 gap-4">
								{colorFields.map((colorField, colorFieldIndex) => (
									<div key={colorField.id} className="flex items-center gap-2">
                                        <Input
                                            type="color"
                                            {...variantFields(`colors.${colorFieldIndex}.hex` as const)}
                                            id={`hex-${colorFieldIndex + 1}`}
                                            className="w-11 h-9"
                                        />
										<div className="flex flex-1 flex-col">
											<Input
												{...variantFields(`colors.${colorFieldIndex}.name` as const)}
												placeholder={`Color Name ${colorFieldIndex + 1}`}
												id={`name-${colorFieldIndex + 1}`}
												type="text"
												className={
													variantErrors.colors && variantErrors.colors[colorFieldIndex]?.name?.message
														? "border-red-500"
														: ""
												}
											/>
											{variantErrors.colors && variantErrors.colors[colorFieldIndex]?.name?.message && (
												<p className="text-red-500 text-sm">
													{variantErrors.colors[colorFieldIndex].name.message}
												</p>
											)}
										</div>
										{colorFields.length > 0 && (
											<Button
												type="button"
												size={'sm'}
												variant={'destructive'}
												onClick={() => colorRemove(colorFieldIndex)}
											>
												<FaTrash />
											</Button>
										)}
									</div>
								))}
							</div>
							{variantErrors.colors && (
								<p className="text-red-500 text-sm">
									{variantErrors.colors.message}
								</p>
							)}
							{variantErrors.colors?.root && (
								<p className="text-red-500 text-sm">
									{variantErrors.colors.root.message}
								</p>
							)}
						</div>
                        <div className="flex flex-col md:col-span-3 lg:col-span-3 space-y-1.5">
                            <DropZone 
                                label="Images"
                                text="Drag & drop images here, or click to select"
                                isMultiple={true}
                                error={variantErrors.images?.message} 
                                onChange={(files) => setVariant("images",files)} 
                                clearCount={clearCount}
								existingImages={existingImages} 
								onExistingChange={(files) => setVariant("existingImages",files || [])} 
                            />
                        </div>
                    </div>
                </CardContent>
                <CardHeader>
                    <CardTitle>Meta Fields</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Meta-Title">Title</Label>
                            <Input
                                id="Meta-Title"
                                type="text"
                                {...variantFields("meta_title")}
                                className={
                                    variantErrors.meta_title
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {variantErrors.meta_title && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.meta_title.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Meta-Keywords">Keywords</Label>
                            <Input
                                id="Meta-Keywords"
                                type="text"
                                {...variantFields("meta_keywords")}
                                className={
                                    variantErrors.meta_keywords
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {variantErrors.meta_keywords && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.meta_keywords.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-2 space-y-1.5">
                            <Label htmlFor="Meta-Description">Description</Label>
                            <Textarea
                                id="Meta-Description"
                                {...variantFields("meta_description")}
                                className={
                                    variantErrors.meta_description
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {variantErrors.meta_description && (
                                <p className="text-red-500 text-sm">
                                    {variantErrors.meta_description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>

                <CardHeader>
                    <CardTitle>Feature & Specifications</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
										{Object.entries(groupedFeatureAndSpecification).map(([type, categories]) => (
  <div key={type} className="mb-6">
    <h2 className="text-lg font-bold mb-2 capitalize">{type}</h2>
    
    {Object.entries(categories).map(([category, fieldsByType]) => (
                    <CardContent key={category} className="p-6 space-y-4">
                        <h2 className="text-lg font-semibold border p-4 rounded-xl">{category}</h2>

                        <div className="w-full grid gap-4 gap-y-8 border p-4 rounded-xl">
                            {/* Text and Number fields */}
                            {(fieldsByType.number.length > 0 || fieldsByType.text.length > 0 )  && 
                                <div className="w-full grid md:grid-cols-4 gap-4">
                                    {featureAndSpecificationsFields.map((field, index) => {
                                        const spec = [...fieldsByType.text, ...fieldsByType.number].find(s => s.id === field.fas_id);
                                        if (!spec) return null;

                                        return (
                                            <div key={field.id} className="w-full">
                                            <Label htmlFor={`featureAndSpecifications.${index}.value`}>{spec.name}</Label>
                                            <Input
                                                id={`featureAndSpecifications.${index}.value`}
                                                {...variantFields(`featureAndSpecifications.${index}.value`)}
                                                type={spec.field}
                                                placeholder="Enter value"
                                            />
                                            </div>
                                        );
                                    })}
                                </div>
                            }

                            {/* Boolean fields */}
                            {(fieldsByType.boolean.length > 0)  && 
                                <div className="w-full grid md:grid-cols-4 gap-4">
                                {featureAndSpecificationsFields.map((field, index) => {
                                    const spec = fieldsByType.boolean.find(s => s.id === field.fas_id);
                                    if (!spec) return null;

                                    return (
                                        <div key={field.id} className="flex items-center gap-4">
                                        <Controller
                                        control={variantControl}
                                        name={`featureAndSpecifications.${index}.value`}
                                        render={({ field: controllerField }) => (
                                            <>
                                                <Checkbox
                                                    id={`${field.id}`}
                                                    checked={controllerField.value === true || controllerField.value === 'true'}
                                                    onCheckedChange={(checked) => {controllerField.onChange(checked === true)}}
                                                    className="size-6"
                                                />
                                                <Label htmlFor={`featureAndSpecifications.${index}.value`}>{spec.name}</Label>
                                            </>
                                        )}
                                        />
                                        </div>
                                    );
                                })}
                                </div>
                            }
                        </div>
                    </CardContent>
                    ))}
                    </div>
                  ))}


                <CardFooter className="flex justify-between">
                    <Button
                        type="submit"
                        className=""
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin-slow" />{" "}
                                Loading...{" "}
                            </>
                        ) : (
                            <> {heading} </>
                        )}
                    </Button>
                    { variant && <Button type="button" variant="outline" onClick={() => {cancelUpdate()}}>Cancel</Button> }
                </CardFooter>
            </Card>
        </form>
    );
}
export default Form;