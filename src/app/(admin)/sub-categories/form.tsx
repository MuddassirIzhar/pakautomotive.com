"use client"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { subCategoryCreateUpdateSchema } from "@/app/(admin)/validation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY } from "@/utils/ApiRoutes";
import { Category, SubCategory } from "next-auth";
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
import { DropZone } from "@/app/components/DropZone";

interface subCategoryForm {
    name: string;
    category: number;
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
	images?: (any | undefined)[] | undefined;
	existingImages: string[];
}
const Form = ({ categories, subCategory, submissionCallback, noUpdateCallback, cancelCallback }: { categories: Category[],  subCategory?: SubCategory | null | undefined, submissionCallback: () => void, noUpdateCallback: () => void, cancelCallback: () => void }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>('Create');
    const [openLocation, setOpenLocation] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [clearCount, setClearCount] = useState<number>(0);
    const subCategoryOptions = {
        resolver: yupResolver(subCategoryCreateUpdateSchema),
        context: { isUpdate: !!subCategory },
        defaultValues: {
            images: [],
            existingImages:[],
        },    
    };
    const { register: subCategoryFields, control: subCategoryControl, formState: { errors: subCategoryErrors }, reset: subCategoryFormReset, handleSubmit: submitSubCategory, setValue: setSubCategory, getValues: getSubCategory, } = useForm<subCategoryForm>(subCategoryOptions);
    const onSubmitSubCategory = async (data: FormEvent<HTMLFormElement> | any, e: any) => {
        setIsLoading(true);
        try {
            if (subCategory) {
                const res = await axiosInstance.put(UPDATE_SUBCATEGORY(subCategory.id), data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
            } else {
                const res = await axiosInstance.post(CREATE_SUBCATEGORY, data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
            }
            e.target.reset();
            subCategoryFormReset();
            setSelectedCategory("");
            submissionCallback();
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
    useEffect(() => {
        if (subCategory) {
            setSubCategory("name", subCategory.name)
            setSubCategory("meta_title", subCategory.meta_title)
            setSubCategory("meta_keywords", subCategory.meta_keywords)
            setSubCategory("meta_description", subCategory.meta_description)
            setSubCategory("category", subCategory.category.id)
            setSelectedCategory(subCategory.category.id.toString());
            setExistingImages(subCategory.logo ? [subCategory.logo as any] : []);
            setSubCategory("existingImages",subCategory.logo ? [subCategory.logo as any] : [])
            setHeading("Update");
        } else {
            subCategoryFormReset();
            setHeading("Create");
        }
    }, [subCategory]);
    useEffect(() => {
        setSubCategory("category", parseInt(selectedCategory))
    }, [selectedCategory]);
    const cancelUpdate = () => {
        setSelectedCategory("");
        cancelCallback();
    }

    return (


        <form onSubmit={submitSubCategory(onSubmitSubCategory)} autoComplete="new-password">
            <Card className="w-full shadow-xl">
                <CardHeader>
                    <CardTitle>{heading} Sub Category</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="grid w-full grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                                id="Name"
                                type="text"
                                {...subCategoryFields("name")}
                                className={
                                    subCategoryErrors.name
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {subCategoryErrors.name && (
                                <p className="text-red-500 text-sm">
                                    {subCategoryErrors.name.message}
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
                                        {selectedCategory
                                            ? categories.find((category) => category.id === parseInt(selectedCategory))
                                                ?.name
                                            : "Select Category"}
                                        <FaChevronDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start" sideOffset={10}>
                                    <Command>
                                        <CommandInput
                                            placeholder="Select Category"
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {categories.map((category) => (
                                                    <CommandItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                        onSelect={(currentValue) => {
                                                            setSelectedCategory(currentValue === selectedCategory ? "" : currentValue);
                                                            setOpenLocation(false);
                                                        }}
                                                    >
                                                        {category.name}
                                                        <FaCheck
                                                            className={cn(
                                                                "ml-auto",
                                                                parseInt(selectedCategory) === category.id
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
                            {subCategoryErrors.category && (
                                <p className="text-red-500 text-sm">
                                    {subCategoryErrors.category.message}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-3 md:col-span-2 lg:col-span-2 space-y-1.5 gap-x-4">
                            <DropZone 
                                label="Logo"
                                text="Drag & drop logo here, or click to select"
                                isMultiple={false}
                                error={subCategoryErrors.images?.message} 
                                onChange={(files) => setSubCategory("images",files)} 
                                clearCount={clearCount} 
                                existingImages={existingImages} 
                                onExistingChange={(files) => setSubCategory("existingImages",files || [])} 
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
                                {...subCategoryFields("meta_title")}
                                className={
                                    subCategoryErrors.meta_title
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {subCategoryErrors.meta_title && (
                                <p className="text-red-500 text-sm">
                                    {subCategoryErrors.meta_title.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Meta-Keywords">Keywords</Label>
                            <Input
                                id="Meta-Keywords"
                                type="text"
                                {...subCategoryFields("meta_keywords")}
                                className={
                                    subCategoryErrors.meta_keywords
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {subCategoryErrors.meta_keywords && (
                                <p className="text-red-500 text-sm">
                                    {subCategoryErrors.meta_keywords.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-2 space-y-1.5">
                            <Label htmlFor="Meta-Description">Description</Label>
                            <Textarea
                                id="Meta-Description"
                                {...subCategoryFields("meta_description")}
                                className={
                                    subCategoryErrors.meta_description
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {subCategoryErrors.meta_description && (
                                <p className="text-red-500 text-sm">
                                    {subCategoryErrors.meta_description.message}
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
                    { subCategory && <Button type="button" variant="outline" onClick={() => {cancelUpdate()}}>Cancel</Button> }
                </CardFooter>
            </Card>
        </form>
    );
}
export default Form;