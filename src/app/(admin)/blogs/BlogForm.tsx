"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, X } from "lucide-react";
import Image from "next/image";
import { blogCreateUpdateSchema } from "@/app/(admin)/validation";
import { Label } from "@radix-ui/react-label";
import { useDropzone } from "react-dropzone";
import { FaCheck, FaChevronDown, FaPlus, FaSpinner, FaTrash } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/app/components/DateTimePicker";
import dynamic from "next/dynamic";
const SettingsContext = dynamic(() => import("@/app/components/context/SettingsContext").then(mod => mod.SettingsContext), { ssr: false });
import RichTextEditor from "@/app/components/RichTextEditor";
import { FlashMessageContext } from "@/app/components/context/FlashMessageContext";
import { axiosAuth, axiosInstance } from "@/lib/axiosInstance";
import { ALL_MODELS, CREATE_BLOG, GET_BLOG, UPDATE_BLOG } from "@/utils/ApiRoutes";

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
import { Blog, Model, Tag } from "next-auth";
import { cn } from "@/lib/utils";
import * as React from "react";
import { useSession } from "next-auth/react";
import TagsInput from "@/app/components/TagsInput";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@radix-ui/react-separator";
import { useParams, useRouter } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { DropZone } from "@/app/components/DropZone";

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
interface blogForm {
	slug?: string | undefined;
	images?: (any | undefined)[] | undefined;
	existingImages: string[];
	// mileage_from: number;
	// mileage_to: number;
	// cc_from: number;
	// cc_to: number;
	title: string;
	// transmission: TransmissionEnum;
	// fuel_type: FuelTypeEnum;
	content: string;
	author: number;
	published_at: Date;
	meta_title: string;
	meta_keywords: string;
	meta_description: string;
	model: number;
	pros?: { value: string }[];
	cons?: { value: string }[];
	tags?: { value: string }[];
  }
const BlogForm = () => {
    const {id} = useParams();

    const axiosAuth = useAxiosAuth();
    const router = useRouter();
	const { data: session } = useSession();
    const [models, setModels] = useState<Model[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [customSlug, setCustomSlug] = useState<boolean>(false);
	const [isModelLoading, setIsModelLoading] = useState<boolean>(false);
	const [clearCount, setClearCount] = useState<number>(0);
	const [heading, setHeading] = useState<string>('Create');
	const [openModel, setOpenModel] = useState(false);
	const [selectedModel, setSelectedModel] = useState<string>("");
	// const [files, setFiles] = useState<(File & { preview: string })[]>([]);
	const [content, setContent] = useState("");
	const [existingImages, setExistingImages] = useState<string[]>([]);
	
	const getAllModels = async () => {
			try {
				setIsModelLoading(true)
				const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
				const url = new URL(`${BASE_URL}/${ALL_MODELS}`);
				const res = await axiosAuth.get(url.toString());
	
				setModels(res.data.data)
				setIsModelLoading(false)
			} catch (error) {
				setIsModelLoading(false)
				console.error("Error fetching models:", error);
			}
	};
	const blogOptions = {
			resolver: yupResolver(blogCreateUpdateSchema),
			context: { isUpdate: !!id },      
			defaultValues: {
				// mileage_from: 0,
				// mileage_to: 0,
				// cc_from: 0,
				// cc_to: 0,
				images: [],
				existingImages:[],
				pros: [{value:""}],
				cons: [{value:""}],
				tags: []
			},
		};
	const { register: blogFields, control: blogControl, formState: { errors: blogErrors }, reset: blogFormReset, handleSubmit: submitBlog, setValue: setBlog, watch: blogWatch, getValues: getBlog, } = useForm<blogForm>(blogOptions);

	const { fields: proFields, append: proAppend, remove: proRemove } = useFieldArray({
		control:blogControl,
		name: "pros",
	});
	const { fields: conFields, append: conAppend, remove: conRemove } = useFieldArray({
		control:blogControl,
		name: "cons",
	});
	const tags = blogWatch("tags") || [];
	const onSubmitBlog = async (data: FormEvent<HTMLFormElement> | any, e: any) => {
        setIsLoading(true);
        try {
                const res = await axiosInstance.post(CREATE_BLOG, data, {headers: {'Content-Type': 'multipart/form-data'}});
                toast.success(res?.data?.message);
				// setFiles([]);
				setSelectedModel("");
				setCustomSlug(false);
				// setSelectedTransmission(null);
				// setSelectedFuelType(null);
				e.target.reset();
				blogFormReset();
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
	};

	const [formResetCount, setFormResetCount] = useState<number>(0);
	const RichTextEditorChange = (value: string) => {
		setContent(value);
	};
	// useEffect(() => {
	// 	if (files) {
	// 		setBlog("images", files);
	// 	}
	// }, [files]);
	useEffect(() => {
		if (content) {
			setBlog("content", content)
		}
	}, [content]);
	// useEffect(() => {
	// 	if (selectedTransmission) {
	// 		setBlog("transmission", selectedTransmission)
	// 	}
	// }, [selectedTransmission]);

	// useEffect(() => {
	// 	if (selectedFuelType) {
	// 		setBlog("fuel_type", selectedFuelType)
	// 	}
	// }, [selectedFuelType]);
	useEffect(() => {
		if (selectedModel) {
			setBlog("model", parseInt(selectedModel));
		}
	}, [selectedModel]);

    // Update user data when session changes
    useEffect(() => {
        if (session?.user) {
			setBlog("author",session.user.id);
        }
    }, [session]);
    useEffect(() => {
        getAllModels();
    }, []);
    useEffect(() => {
        // console.log(blogErrors)
    }, [blogErrors]);

    // Function to generate a slug from the title
    const generateSlug = (title:string) => {
        return title
            .toLowerCase() // Convert to lowercase
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, '') // Remove special characters
            .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
            .trim(); // Remove leading/trailing spaces
    };
    // Function to generate a slug from the title
    const fullUrl = (modelName:string | undefined) => {
		let url = "https://www.pakwheels.com/new-cars/";
		if(modelName){
			let modelSlug =  modelName
				.toLowerCase() // Convert to lowercase
				.replace(/\s+/g, '-') // Replace spaces with hyphens
				.replace(/[^a-z0-9-]/g, '') // Remove special characters
				.replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
				.trim(); // Remove leading/trailing spaces
			url += modelSlug + "/";
		}
		return url;
    };

    // Update the slug when the title changes
	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = (event.target as HTMLInputElement).value;
		if(!customSlug){
			setBlog("slug",generateSlug(newTitle));
		}
    };

    // Handle switch toggle
    const handleSwitchChange = (checked: boolean) => {
        setCustomSlug(checked);
		if(!checked){
			setBlog("slug",generateSlug(getBlog("title")));
		}
    };


    const getBlogData = async () => {
        const res = await axiosAuth.get(GET_BLOG(id));
        if (res.data) {
            // console.log(res.data.blog)
            blogFormReset(res.data.blog);
        } else {
            router.push('/blogs')
        }
    }
    useEffect(() => {
        if(id){
            setHeading("Update");
            getBlogData();
        }
    }, [id]);

	return (
		<form onSubmit={submitBlog(onSubmitBlog)}>
			<Card className="w-full shadow-xl">
				<CardHeader>
					<CardTitle>{heading} Blog</CardTitle>
					<CardDescription>Write and publish a new blog post effortlessly today.</CardDescription>
				</CardHeader>
				<CardContent>
						
					<div className="w-full grid md:grid-cols-2 gap-4">
						<div className="flex flex-col md:col-span-2 space-y-1.5">
							<Label htmlFor="title">Title</Label>
							<Input
								id="title"
								type="text"
								{...blogFields("title")}
								onChange={(e) => handleTitleChange(e)}
								className={
									blogErrors.title
										? "border-red-500"
										: ""
								}
							/>
							{blogErrors.title && (
								<p className="text-red-500 text-sm">
									{blogErrors.title.message}
								</p>
							)}
						</div>
						<div className="flex flex-col md:col-span-2 space-y-1.5">
							<div className="flex justify-between items-center">
								<Label htmlFor="slug">Slug</Label>
								<div className="flex items-center gap-2">
									<Label htmlFor="custom-slug">Custom Slug?</Label>
									<Switch 
										id="custom-slug"
										checked={customSlug}
										onCheckedChange={handleSwitchChange}
									/>
								</div>
							</div>
							<div className="flex items-center border border-gray-300 rounded-lg flex-nowrap overflow-hidden">
								<span className="bg-gray-100 whitespace-nowrap h-full flex items-center px-2 border-0 border-gray-300 border-r">
									{ fullUrl(models.find((model) => model.id === parseInt(selectedModel))?.name) }
								</span>
								<Input
									id="slug"
									type="text"
									{...blogFields("slug", {
										onChange: (e) => {
										setBlog("slug", generateSlug(e.target.value), {
											shouldValidate: true,
										});
										},
									})}
									readOnly={!customSlug}
									className={ ( blogErrors.slug ? "border-red-500" : "" ) +" border-none rounded-none shadow-none "+ ( customSlug ? "" : "bg-gray-100" )}
								/>
							</div>

							{blogErrors.slug && (
								<p className="text-red-500 text-sm">
									{blogErrors.slug.message}
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
                                            ? models.find((model) => model.id === parseInt(selectedModel))
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
                                                {models.map((model) => 
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
                            {blogErrors.model && (
                                <p className="text-red-500 text-sm">
                                    {blogErrors.model.message}
                                </p>
                            )}
                        </div>
						<div className="flex flex-col space-y-1.5">
							<Label>Published At</Label>
							<DateTimePicker key={formResetCount} onPublishedAtChange={(date: Date) => setBlog("published_at", date)} />
							{blogErrors.published_at && <p className="text-red-500">{blogErrors.published_at.message}</p>}
						</div>
						<div className="flex flex-col md:col-span-2 space-y-1.5">
							<Label htmlFor="tags">Tags</Label>
							<TagsInput value={tags.map(tag => tag.value)} onChange={(newTags) => setBlog("tags", newTags.map(tag => ({ value: tag })), { shouldValidate: true })} />
							{blogErrors.tags && (
								<p className="text-red-500 text-sm">
									{blogErrors.tags.message}
								</p>
							)}
						</div>
						<div className="flex flex-col md:col-span-2 space-y-1.5">
							<Label>Content</Label>
							<div className="w-full">
							<SettingsContext>
								<FlashMessageContext>
									<RichTextEditor key={formResetCount} onChange={RichTextEditorChange} value={content} />
								</FlashMessageContext>
							</SettingsContext>
							</div>
						</div>
						<div className="flex flex-col md:col-span-2 lg:col-span-2 space-y-1.5">
							<DropZone 
								error={blogErrors.images?.message} 
								onChange={(files) => setBlog("images",files)} 
								clearCount={clearCount} 
								existingImages={existingImages} 
								onExistingChange={(files) => setBlog("existingImages",files || [])} 
							/>
						</div>
					</div>
				</CardContent>
				<Separator orientation="horizontal" className="mx-6 h-0.5 bg-gray-200 my-4" />
				<CardHeader>
					<CardTitle>Meta Fields</CardTitle>
					<CardDescription>Meta Fields for SEO and Blog: Title, Description, Keywords, Tags, Author.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="w-full grid md:grid-cols-2 gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="Meta-Title">Title</Label>
							<Input
								id="Meta-Title"
								type="text"
								{...blogFields("meta_title")}
								className={
									blogErrors.meta_title
										? "border-red-500"
										: ""
								}
							/>
							{blogErrors.meta_title && (
								<p className="text-red-500 text-sm">
									{blogErrors.meta_title.message}
								</p>
							)}
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="Meta-Keywords">Keywords</Label>
							<Input
								id="Meta-Keywords"
								type="text"
								{...blogFields("meta_keywords")}
								className={
									blogErrors.meta_keywords
										? "border-red-500"
										: ""
								}
							/>
							{blogErrors.meta_keywords && (
								<p className="text-red-500 text-sm">
									{blogErrors.meta_keywords.message}
								</p>
							)}
						</div>
						<div className="flex flex-col md:col-span-2 space-y-1.5">
							<Label htmlFor="Meta-Description">Description</Label>
							<Textarea
								id="Meta-Description"
								{...blogFields("meta_description")}
								className={
									blogErrors.meta_description
										? "border-red-500"
										: ""
								}
							/>
							{blogErrors.meta_description && (
								<p className="text-red-500 text-sm">
									{blogErrors.meta_description.message}
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
												{...blogFields(`pros.${proFieldIndex}.value` as const)}
												placeholder={`Pro ${proFieldIndex + 1}`}
												id={`Pro-${proFieldIndex + 1}`}
												type="text"
												className={
													blogErrors.pros && blogErrors.pros[proFieldIndex]?.value?.message
														? "border-red-500"
														: ""
												}
											/>
											{blogErrors.pros && blogErrors.pros[proFieldIndex]?.value?.message && (
												<p className="text-red-500 text-sm">
													{blogErrors.pros[proFieldIndex].value.message}
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
							{blogErrors.pros && (
								<p className="text-red-500 text-sm">
									{blogErrors.pros.message}
								</p>
							)}
							{blogErrors.pros?.root && (
								<p className="text-red-500 text-sm">
									{blogErrors.pros.root.message}
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
												{...blogFields(`cons.${conFieldIndex}.value` as const)}
												placeholder={`Pro ${conFieldIndex + 1}`}
												id={`Pro-${conFieldIndex + 1}`}
												type="text"
												className={
													blogErrors.cons && blogErrors.cons[conFieldIndex]?.value?.message
														? "border-red-500"
														: ""
												}
											/>
											{blogErrors.cons && blogErrors.cons[conFieldIndex]?.value?.message && (
												<p className="text-red-500 text-sm">
													{blogErrors.cons[conFieldIndex].value.message}
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
							{blogErrors.cons && (
								<p className="text-red-500 text-sm">
									{blogErrors.cons.message}
								</p>
							)}
							{blogErrors.cons?.root && (
								<p className="text-red-500 text-sm">
									{blogErrors.cons.root.message}
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
					{/* { blog && <Button type="button" variant="outline" onClick={() => {cancelUpdate()}}>Cancel</Button> } */}
				</CardFooter>
			</Card>

		</form>
	);
}

export default BlogForm;