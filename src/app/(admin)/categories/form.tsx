"use client"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { categoryCreateUpdateSchema } from "@/app/(admin)/validation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/utils/ApiRoutes";
import { Category } from "next-auth";
import { FaSpinner, FaXmark } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

interface categoryForm {
    name: string;
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
}
const Form = ({ category, submissionCallback, noUpdateCallback, cancelCallback }: { category?: Category | null | undefined, submissionCallback: () => void, noUpdateCallback: () => void, cancelCallback: () => void }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>('Create');
    const categoryOptions = {
        resolver: yupResolver(categoryCreateUpdateSchema)
    };
    const { register: categoryFields, control: categoryControl, formState: { errors: categoryErrors }, reset: categoryFormReset, handleSubmit: submitCategory, setValue: setCategory, getValues: getCategory, } = useForm<categoryForm>(categoryOptions);
    const onSubmitCategory = async (data: FormEvent<HTMLFormElement> | any, e: any) => {
        setIsLoading(true);
        try {
            if (category) {
                const res = await axiosInstance.put(UPDATE_CATEGORY(category.id), data);
                toast.success(res?.data?.message);
            } else {
                const res = await axiosInstance.post(CREATE_CATEGORY, data);
                toast.success(res?.data?.message);
            }
            e.target.reset();
            categoryFormReset();
            submissionCallback()
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
        if (category) {
            setCategory("name", category.name)
            setCategory("meta_title", category.meta_title)
            setCategory("meta_keywords", category.meta_keywords)
            setCategory("meta_description", category.meta_description)
            setHeading("Update");
        } else {
            categoryFormReset();
            setHeading("Create");
        }
    }, [category]);


    return (


        <form onSubmit={submitCategory(onSubmitCategory)} autoComplete="new-password">
            <Card className="w-full shadow-xl">
                <CardHeader>
                    <CardTitle>{heading} Category</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                                id="Name"
                                type="text"
                                {...categoryFields("name")}
                                className={
                                    categoryErrors.name
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {categoryErrors.name && (
                                <p className="text-red-500 text-sm">
                                    {categoryErrors.name.message}
                                </p>
                            )}
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
                                {...categoryFields("meta_title")}
                                className={
                                    categoryErrors.meta_title
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {categoryErrors.meta_title && (
                                <p className="text-red-500 text-sm">
                                    {categoryErrors.meta_title.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Meta-Keywords">Keywords</Label>
                            <Input
                                id="Meta-Keywords"
                                type="text"
                                {...categoryFields("meta_keywords")}
                                className={
                                    categoryErrors.meta_keywords
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {categoryErrors.meta_keywords && (
                                <p className="text-red-500 text-sm">
                                    {categoryErrors.meta_keywords.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:col-span-2 space-y-1.5">
                            <Label htmlFor="Meta-Description">Description</Label>
                            <Textarea
                                id="Meta-Description"
                                {...categoryFields("meta_description")}
                                className={
                                    categoryErrors.meta_description
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {categoryErrors.meta_description && (
                                <p className="text-red-500 text-sm">
                                    {categoryErrors.meta_description.message}
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
                    { category && <Button type="button" variant="outline" onClick={() => {cancelCallback()}}>Cancel</Button> }
                </CardFooter>
            </Card>
        </form>
    );
}
export default Form;