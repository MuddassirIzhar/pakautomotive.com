"use client"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { typeCreateUpdateSchema } from "@/app/(admin)/validation";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { CREATE_TYPE, UPDATE_TYPE } from "@/utils/ApiRoutes";
import { Type } from "next-auth";
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

interface typeForm {
    name: string;
}
const Form = ({ type, submissionCallback, noUpdateCallback, cancelCallback }: { type?: Type | null | undefined, submissionCallback: () => void, noUpdateCallback: () => void, cancelCallback: () => void }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [heading, setHeading] = useState<string>('Create');
    const typeOptions = {
        resolver: yupResolver(typeCreateUpdateSchema)
    };
    const { register: typeFields, control: typeControl, formState: { errors: typeErrors }, reset: typeFormReset, handleSubmit: submitType, setValue: setType, getValues: getType, } = useForm<typeForm>(typeOptions);
    const onSubmitType = async (data: FormEvent<HTMLFormElement> | any, e: any) => {
        setIsLoading(true);
        try {
            if (type) {
                const res = await axiosInstance.put(UPDATE_TYPE(type.id), data);
                toast.success(res?.data?.message);
            } else {
                const res = await axiosInstance.post(CREATE_TYPE, data);
                toast.success(res?.data?.message);
                typeFormReset();
                e.target.reset();
            }
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
        if (type) {
            setType("name", type.name)
            setHeading("Update");
        } else {
            typeFormReset();
            setHeading("Create");
        }
    }, [type]);


    return (


        <form onSubmit={submitType(onSubmitType)} autoComplete="new-password">
            <Card className="w-full shadow-xl">
                <CardHeader>
                    <CardTitle>{heading} Type</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Name">Name</Label>
                            <Input
                                id="Name"
                                type="text"
                                {...typeFields("name")}
                                className={
                                    typeErrors.name
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {typeErrors.name && (
                                <p className="text-red-500 text-sm">
                                    {typeErrors.name.message}
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
                    { type && <Button type="button" variant="outline" onClick={() => {cancelCallback()}}>Cancel</Button> }
                </CardFooter>
            </Card>
        </form>
    );
}
export default Form;