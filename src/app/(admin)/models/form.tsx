"use client"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { modelCreateUpdateSchema } from "@/app/(admin)/validation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { CREATE_MODEL, UPDATE_MODEL } from "@/utils/ApiRoutes";
import { Brand, Model, SubCategory } from "next-auth";
import { FaCheck, FaChevronDown, FaPlus, FaSpinner, FaTrash, FaXmark } from "react-icons/fa6";
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
import dynamic from "next/dynamic";
const SettingsContext = dynamic(() => import("@/app/components/context/SettingsContext").then(mod => mod.SettingsContext), { ssr: false });
import { FlashMessageContext } from "@/app/components/context/FlashMessageContext";
import RichTextEditor from "@/app/components/RichTextEditor";
import { Separator } from "@radix-ui/react-separator";

interface ModelForm {
    name: string;
    brand: number;
    sub_category: number;
	heading: string;
	description: string;
	content: string;
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
	images?: (any | undefined)[] | undefined;
	existingImages: string[];
	pros?: { value: string }[];
	cons?: { value: string }[];
}
const Form = ({ brands, model, submissionCallback, noUpdateCallback, cancelCallback }: { brands: Brand[],  model?: Model | null | undefined, submissionCallback: () => void, noUpdateCallback: () => void, cancelCallback: () => void }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>('Create');
    const [openSubCategory, setOpenSubCategory] = React.useState(false);
    const [openBrand, setOpenBrand] = React.useState(false);
    const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = React.useState("");
    const [clearCount, setClearCount] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const ModelOptions = {
        resolver: yupResolver(modelCreateUpdateSchema),
        context: { isUpdate: !!model },      
        defaultValues: {
            images: [],
            existingImages:[],
            pros: [{value:""}],
            cons: [{value:""}],
        },
    };
    const { register: modelFields, control: ModelControl, formState: { errors: modelErrors }, reset: modelFormReset, handleSubmit: submitModel, setValue: setModel, watch: modelWatch, getValues: getModel, } = useForm<ModelForm>(ModelOptions);

        const { fields: proFields, append: proAppend, remove: proRemove } = useFieldArray({
            control:ModelControl,
            name: "pros",
        });
        const { fields: conFields, append: conAppend, remove: conRemove } = useFieldArray({
            control:ModelControl,
            name: "cons",
        });
    const onSubmitModel = async (data: FormEvent<HTMLFormElement> | any, e: any) => {
        setIsLoading(true);
        try {
            if (model) {
                const res = await axiosInstance.put(UPDATE_MODEL(model.id), data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
            } else {
                const res = await axiosInstance.post(CREATE_MODEL, data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
            }
            e.target.reset();
            modelFormReset();
            setSelectedBrand(null);
            setDescription("");
            setContent("");
            setSelectedSubCategory("");
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
        } finally {
            setIsLoading(false);
        }

    }
    const [formResetCount, setFormResetCount] = useState<number>(0);
    const ContentChange = (value: string) => {
        setContent(value);
    };
    const DescriptionChange = (value: string) => {
        setDescription(value);
    };
    useEffect(() => {
        if (content) {
            setModel("content", content)
        }
    }, [content]);
    useEffect(() => {
        if (description) {
            setModel("description", description)
        }
    }, [description]);
    useEffect(() => {
        if (model) {
            setFormResetCount((prevKey) => prevKey + 1);
            setDescription(model.description);
            setContent(model.content);
            setModel("pros", model.pros?.map(pro => ({ value: pro.value })) || [])
            setModel("cons", model.cons?.map(con => ({ value: con.value })) || [])
            setModel("name", model.name)
            setModel("heading", model.heading)
            setModel("description", model.description)
            setModel("content", model.content)
            setModel("brand", model.brand.id)
            setModel("meta_title", model.meta_title)
            setModel("meta_keywords", model.meta_keywords)
            setModel("meta_description", model.meta_description)
            setModel("sub_category", model.sub_category.id)
            // setModel("images", model.images)
            setExistingImages(model.images || []);
            setModel("existingImages",model.images || [])
            setSelectedBrand(model.brand);
            setSelectedSubCategory(model.sub_category.id.toString());
            setHeading("Update");
        } else {
            modelFormReset();
            setHeading("Create");
        }
    }, [model]);
    useEffect(() => {
        if (selectedBrand) {
            setModel("brand", selectedBrand.id)
        }
    }, [selectedBrand]);
    useEffect(() => {
        if (selectedSubCategory) {
            setModel("sub_category", parseInt(selectedSubCategory))
        }
    }, [selectedSubCategory]);
    const cancelUpdate = () => {
        setSelectedBrand(null);
        setSelectedSubCategory("");
        cancelCallback();
    }

    useEffect(() => {
        // console.log(modelErrors)
    }, [modelErrors]);
    return (


        <form onSubmit={submitModel(onSubmitModel)} autoComplete="new-password">
            <Card className="w-full shadow-xl">
                <CardHeader>
                    <CardTitle>{heading} Model</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="w-full grid md:grid-cols-4 gap-4">
                        <div className="flex flex-col md:col-span-2 space-y-1.5">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                                id="Name"
                                type="text"
                                {...modelFields("name")}
                                className={
                                    modelErrors.name
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {modelErrors.name && (
                                <p className="text-red-500 text-sm">
                                    {modelErrors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Brand</Label>
                            {/* Location Dropdown */}
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
                                                            const selected = brands.find((brand) => brand.id.toString() === currentValue) || null;
                                                            setSelectedBrand(selected);
                                                            setSelectedSubCategory("");
                                                            setOpenBrand(false);
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
                            {modelErrors.brand && (
                                <p className="text-red-500 text-sm">
                                    {modelErrors.brand.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Sub Category</Label>
                            {/* Location Dropdown */}
                            <Popover open={openSubCategory} onOpenChange={setOpenSubCategory}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openSubCategory}
                                        className="w-full flex justify-between"
                                    >
                                        {selectedSubCategory
                                            ? 
                                            selectedBrand?.categories.flatMap((category) => category.sub_categories).find((sub_category) => sub_category.id === parseInt(selectedSubCategory))
                                                ?.name
                                            : "Select Sub Category"}
                                        <FaChevronDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0" align="start" sideOffset={10}>
                                    <Command>
                                        <CommandInput
                                            placeholder="Select Sub Category"
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {selectedBrand?.categories.map((category) => 

                                                        category.sub_categories.map((sub_category) => (
                                                        <CommandItem
                                                            key={sub_category.id}
                                                            value={sub_category.id.toString()}
                                                            onSelect={(currentValue) => {
                                                                setSelectedSubCategory(currentValue === selectedSubCategory ? "" : currentValue);
                                                                setOpenSubCategory(false);
                                                            }}
                                                        >
                                                            {sub_category.name}
                                                            <FaCheck
                                                                className={cn(
                                                                    "ml-auto",
                                                                    parseInt(selectedSubCategory) === sub_category.id
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            {modelErrors.sub_category && (
                                <p className="text-red-500 text-sm">
                                    {modelErrors.sub_category.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-4 lg:col-span-4 space-y-1.5">
                            <Label htmlFor="heding">Heading</Label>
                            <Input
                                id="heding"
                                type="text"
                                {...modelFields("heading")}
                                className={
                                    modelErrors.heading
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {modelErrors.heading && (
                                <p className="text-red-500 text-sm">
                                    {modelErrors.heading.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-4 lg:col-span-4 space-y-1.5">
                            <Label>Short Description</Label>
                            <div className="w-full">
                                <SettingsContext>
                                    <FlashMessageContext>
                                        <RichTextEditor key={formResetCount} onChange={DescriptionChange} value={description} />
                                    </FlashMessageContext>
                                </SettingsContext>
                                {modelErrors.description && (
                                    <p className="text-red-500 text-sm">
                                        {modelErrors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:col-span-4 lg:col-span-4 space-y-1.5">
							<Label>Content</Label>
							<div className="w-full">
                                <SettingsContext>
                                    <FlashMessageContext>
                                        <RichTextEditor key={formResetCount} onChange={ContentChange} value={content} />
                                    </FlashMessageContext>
                                </SettingsContext>
                                {modelErrors.content && (
                                    <p className="text-red-500 text-sm">
                                        {modelErrors.content.message}
                                    </p>
                                )}
							</div>
						</div>
                        <div className="flex flex-col md:col-span-4 lg:col-span-4 space-y-1.5">
                            <DropZone 
                                error={modelErrors.images?.message} 
                                onChange={(files) => setModel("images",files)} 
                                clearCount={clearCount} 
                                existingImages={existingImages} 
                                onExistingChange={(files) => setModel("existingImages",files || [])} 
                            />
                        </div>
                    </div>
                </CardContent>
                <Separator orientation="horizontal" className="mx-6 h-0.5 bg-gray-200 my-4" />
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
                                {...modelFields("meta_title")}
                                className={
                                    modelErrors.meta_title
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {modelErrors.meta_title && (
                                <p className="text-red-500 text-sm">
                                    {modelErrors.meta_title.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Meta-Keywords">Keywords</Label>
                            <Input
                                id="Meta-Keywords"
                                type="text"
                                {...modelFields("meta_keywords")}
                                className={
                                    modelErrors.meta_keywords
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {modelErrors.meta_keywords && (
                                <p className="text-red-500 text-sm">
                                    {modelErrors.meta_keywords.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-2 space-y-1.5">
                            <Label htmlFor="Meta-Description">Description</Label>
                            <Textarea
                                id="Meta-Description"
                                {...modelFields("meta_description")}
                                className={
                                    modelErrors.meta_description
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {modelErrors.meta_description && (
                                <p className="text-red-500 text-sm">
                                    {modelErrors.meta_description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
				<Separator orientation="horizontal" className="mx-6 h-0.5 bg-gray-200 my-4" />
				<CardHeader>
					<CardTitle>Pros & Cons</CardTitle>
					<CardDescription>Pros & Cons: Benefits, Drawbacks, Advantages, Disadvantages, Strengths, Weaknesses, Upsides, Downsides, Positives, Negatives.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="w-full grid md:grid-cols-2 gap-4">
						<div className="flex flex-col space-y-1.5">
							<div className="flex justify-between">
								<Label htmlFor="Pros">Pros</Label>
								<Button
									type="button"
									size={'sm'}
									title="Add Pros"
									onClick={() => proAppend({ value: "" })}
								>
									<FaPlus />
								</Button>
							</div>

							<div className="flex flex-col gap-y-2">
								{proFields.map((proField, proFieldIndex) => (
									<div key={proField.id} className="flex items-start gap-2">
										<div className="flex flex-1 flex-col">
											<Input
												{...modelFields(`pros.${proFieldIndex}.value` as const)}
												placeholder={`Pro ${proFieldIndex + 1}`}
												id={`Pro-${proFieldIndex + 1}`}
												type="text"
												className={
													modelErrors.pros && modelErrors.pros[proFieldIndex]?.value?.message
														? "border-red-500"
														: ""
												}
											/>
											{modelErrors.pros && modelErrors.pros[proFieldIndex]?.value?.message && (
												<p className="text-red-500 text-sm">
													{modelErrors.pros[proFieldIndex].value.message}
												</p>
											)}
										</div>
										{proFields.length > 0 && (
											<Button
												type="button"
												size={'sm'}
												variant={'destructive'}
												onClick={() => proRemove(proFieldIndex)}
											>
												<FaTrash />
											</Button>
										)}
									</div>
								))}
							</div>
							{modelErrors.pros && (
								<p className="text-red-500 text-sm">
									{modelErrors.pros.message}
								</p>
							)}
							{modelErrors.pros?.root && (
								<p className="text-red-500 text-sm">
									{modelErrors.pros.root.message}
								</p>
							)}
						</div>
						<div className="flex flex-col space-y-1.5">
							<div className="flex justify-between">
								<Label htmlFor="Cons">Cons</Label>
								<Button
									type="button"
									size={'sm'}
									title="Add Cons"
									onClick={() => conAppend({ value: "" })}
								>
									<FaPlus />
								</Button>
							</div>

							<div className="flex flex-col gap-y-2">
								{conFields.map((conField, conFieldIndex) => (
									<div key={conField.id} className="flex items-start gap-2">
										<div className="flex flex-1 flex-col">
											<Input
												{...modelFields(`cons.${conFieldIndex}.value` as const)}
												placeholder={`Pro ${conFieldIndex + 1}`}
												id={`Pro-${conFieldIndex + 1}`}
												type="text"
												className={
													modelErrors.cons && modelErrors.cons[conFieldIndex]?.value?.message
														? "border-red-500"
														: ""
												}
											/>
											{modelErrors.cons && modelErrors.cons[conFieldIndex]?.value?.message && (
												<p className="text-red-500 text-sm">
													{modelErrors.cons[conFieldIndex].value.message}
												</p>
											)}
										</div>
										{conFields.length > 0 && (
											<Button
												type="button"
												size={'sm'}
												variant={'destructive'}
												onClick={() => conRemove(conFieldIndex)}
											>
												<FaTrash />
											</Button>
										)}
									</div>
								))}
							</div>
							{modelErrors.cons && (
								<p className="text-red-500 text-sm">
									{modelErrors.cons.message}
								</p>
							)}
							{modelErrors.cons?.root && (
								<p className="text-red-500 text-sm">
									{modelErrors.cons.root.message}
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
                    { model && <Button type="button" variant="outline" onClick={() => {cancelUpdate()}}>Cancel</Button> }
                </CardFooter>
            </Card>
        </form>
    );
}
export default Form;