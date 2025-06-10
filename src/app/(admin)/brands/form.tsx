"use client"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { brandCreateUpdateSchema } from "@/app/(admin)/validation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { CREATE_BRAND, UPDATE_BRAND } from "@/utils/ApiRoutes";
import { Brand, Category } from "next-auth";
import { FaSpinner, FaXmark } from "react-icons/fa6";
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
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
const SettingsContext = dynamic(() => import("@/app/components/context/SettingsContext").then(mod => mod.SettingsContext), { ssr: false });
import { FlashMessageContext } from "@/app/components/context/FlashMessageContext";
import RichTextEditor from "@/app/components/RichTextEditor";
import { DropZone } from "@/app/components/DropZone";

interface brandForm {
    name: string;
    heading: string;
    categories: number[];
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
    description: string;
    content?: string;
	images?: (any | undefined)[] | undefined;
	existingImages: string[];
}
const Form = ({ categories, brand, submissionCallback, noUpdateCallback, cancelCallback }: { categories: Category[], brand?: Brand | null | undefined, submissionCallback: () => void, noUpdateCallback: () => void, cancelCallback: () => void }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>('Create');
    const [openLocation, setOpenLocation] = React.useState(false);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [clearCount, setClearCount] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const brandOptions = {
        resolver: yupResolver(brandCreateUpdateSchema),
        context: { isUpdate: !!brand },
        defaultValues: {
            images: [],
            existingImages:[],
        },    
    };
    const { register: brandFields, control: brandControl, formState: { errors: brandErrors }, reset: brandFormReset, handleSubmit: submitBrand, setValue: setBrand, getValues: getBrand, } = useForm<brandForm>(brandOptions);
    const onSubmitBrand = async (data: FormEvent<HTMLFormElement> | any, e: any) => {
        setIsLoading(true);
        try {
            if (brand) {
                const res = await axiosInstance.put(UPDATE_BRAND(brand.id), data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
            } else {
                const res = await axiosInstance.post(CREATE_BRAND, data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
            }
            e.target.reset();
            brandFormReset();
            setSelectedCategories([]);
            setDescription("");
            setContent("");
            submissionCallback()
            setFormResetCount((prevKey) => prevKey + 1);
            setClearCount((prevKey) => prevKey + 1);
            setExistingImages([]);
            setIsLoading(false);
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
            setBrand("content", content)
        }
    }, [content]);
    useEffect(() => {
        if (description) {
            setBrand("description", description)
        }
    }, [description]);
    useEffect(() => {
        if (brand) {
            setFormResetCount((prevKey) => prevKey + 1);
            setDescription(brand.description);
            setContent(brand.content);
            setBrand("name", brand.name)
            setBrand("heading", brand.heading)
            setBrand("description", brand.description)
            setBrand("content", brand.content)
            setBrand("meta_title", brand.meta_title)
            setBrand("meta_keywords", brand.meta_keywords)
            setBrand("meta_description", brand.meta_description)
            setBrand("categories", brand.categories.map(category => category.id))
            setSelectedCategories(brand.categories.map(category => category.id))
            setExistingImages(brand.logo ? [brand.logo as any] : []);
            setBrand("existingImages",brand.logo ? [brand.logo as any] : [])
            setHeading("Update");
        } else {
            brandFormReset();
            setHeading("Create");
        }
    }, [brand]);
    useEffect(() => {
        if (selectedCategories) {
            setBrand("categories", selectedCategories)
        }
    }, [selectedCategories]);

    const toggleCategory = (categoryId: number) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter((id) => id !== categoryId) // Remove if exists
                : [...prevSelected, categoryId] // Add if not exists
        );
    };
    const cancelUpdate = () => {
        setSelectedCategories([]);
        cancelCallback();
    }


    return (


        <form onSubmit={submitBrand(onSubmitBrand)} autoComplete="new-password">
            <Card className="w-full shadow-xl">
                <CardHeader>
                    <CardTitle>{heading} Brand</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>

                <div className="grid w-full grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                                id="Name"
                                type="text"
                                {...brandFields("name")}
                                className={
                                    brandErrors.name
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {brandErrors.name && (
                                <p className="text-red-500 text-sm">
                                    {brandErrors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Category</Label>
                            {/* Location Dropdown */}

                            <Popover open={openLocation} onOpenChange={setOpenLocation}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openLocation}
                                        className="w-full flex justify-between"
                                    >
                                        {selectedCategories.length > 0
                                            ? categories
                                                .filter((category) => selectedCategories.includes(category.id))
                                                .map((c) => c.name)
                                                .join(", ") // Show selected categories
                                            : "Select Categories"}
                                        <FaChevronDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-0" align="start" sideOffset={10}>
                                    <Command>
                                        <CommandInput placeholder="Search Category" className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {categories.map((category) => (
                                                    <CommandItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                        onSelect={() => toggleCategory(category.id)}
                                                    >
                                                        {category.name}
                                                        <FaCheck
                                                            className={cn(
                                                                "ml-auto transition-opacity",
                                                                selectedCategories.includes(category.id)
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
                            {brandErrors.categories && (
                                <p className="text-red-500 text-sm">
                                    {brandErrors.categories.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-2 lg:col-span-2 space-y-1.5">
                            <Label htmlFor="heding">Heading</Label>
                            <Input
                                id="heding"
                                type="text"
                                {...brandFields("heading")}
                                className={
                                    brandErrors.heading
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {brandErrors.heading && (
                                <p className="text-red-500 text-sm">
                                    {brandErrors.heading.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-2 lg:col-span-2 space-y-1.5">
                            <Label>Short Description</Label>
                            <div className="w-full">
                                <SettingsContext>
                                    <FlashMessageContext>
                                        <RichTextEditor key={formResetCount} onChange={DescriptionChange} value={description} />
                                    </FlashMessageContext>
                                </SettingsContext>
                                {brandErrors.description && (
                                    <p className="text-red-500 text-sm">
                                        {brandErrors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col md:col-span-2 lg:col-span-2 space-y-1.5">
                            <Label>Content</Label>
                            <div className="w-full">
                                <SettingsContext>
                                    <FlashMessageContext>
                                        <RichTextEditor key={formResetCount} onChange={ContentChange} value={content} />
                                    </FlashMessageContext>
                                </SettingsContext>
                                {brandErrors.content && (
                                    <p className="text-red-500 text-sm">
                                        {brandErrors.content.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 md:col-span-2 lg:col-span-2 space-y-1.5 gap-x-4">
                            <DropZone 
                                label="Logo"
                                text="Drag & drop logo here, or click to select"
                                isMultiple={false}
                                error={brandErrors.images?.message} 
                                onChange={(files) => setBrand("images",files)} 
                                clearCount={clearCount} 
                                existingImages={existingImages} 
                                onExistingChange={(files) => setBrand("existingImages",files || [])} 
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
                                {...brandFields("meta_title")}
                                className={
                                    brandErrors.meta_title
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {brandErrors.meta_title && (
                                <p className="text-red-500 text-sm">
                                    {brandErrors.meta_title.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Meta-Keywords">Keywords</Label>
                            <Input
                                id="Meta-Keywords"
                                type="text"
                                {...brandFields("meta_keywords")}
                                className={
                                    brandErrors.meta_keywords
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {brandErrors.meta_keywords && (
                                <p className="text-red-500 text-sm">
                                    {brandErrors.meta_keywords.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-2 space-y-1.5">
                            <Label htmlFor="Meta-Description">Description</Label>
                            <Textarea
                                id="Meta-Description"
                                {...brandFields("meta_description")}
                                className={
                                    brandErrors.meta_description
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {brandErrors.meta_description && (
                                <p className="text-red-500 text-sm">
                                    {brandErrors.meta_description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
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
                    { brand && <Button type="button" variant="outline" onClick={() => {cancelUpdate()}}>Cancel</Button> }
                </CardFooter>
            </Card>
        </form>
    );
}
export default Form;