'use client';
import Link from 'next/link';
import { FaCalendar, FaCircleCheck, FaPenToSquare, FaRegStar, FaSortDown, FaSortUp, FaStar, FaTrashCan, FaXmark } from 'react-icons/fa6';
import { SetStateAction, useEffect, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { ALL_BRANDS, ALL_VARIANTS, DELETE_VARIANT, ALL_FEATURE_AND_SPECIFICATIONS } from '@/utils/ApiRoutes';
import moment from 'moment';
import { Brand, Variant } from 'next-auth';
// import PaginationElement from '../components/elements/PaginationElement';
import { DynamicPagination } from "@/components/dynamic-pagination";

import { DynamicAlertDialog } from '@/app/components/DynamicAlertDialog';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Form from './form';
import { axiosAuth, axiosInstance } from "@/lib/axiosInstance";
import { Button } from '@/components/ui/button';
import { columns } from "./columns"
import { DataTable } from "@/app/components/DataTable";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton';
import { SkeletonTable } from '@/app/components/SkeletonTable';
import { TableServerSide } from '@/app/components/TableServerSide';
import { FeatureAndSpecification } from 'next-auth';

export default function Index() {

    const [deleteData, setDeleteData] = useState<Variant | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(true)
    const [take, setTake] = useState<number>(5);
    const [variant, setVariant] = useState<Variant | null | undefined>(undefined);


    const [brands, setBrands] = useState<Brand[]>([]);
    const [featureAndSpecifications, setFeatureAndSpecifications] = useState<FeatureAndSpecification[]>([]);
    const [variants, setVariants] = useState([]);
    const [variantData, setVariantData] = useState<any>({});
    const [variantPage, setVariantPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState(0);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filter, setFilter] = useState("");
    const getAllBrands = async () => {
        try {
            setIsCategoryLoading(true)
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            const url = new URL(`${BASE_URL}/${ALL_BRANDS}`);
            const res = await axiosAuth.get(url.toString());

            setBrands(res.data.data)
            setIsCategoryLoading(false)
        } catch (error) {
            setIsCategoryLoading(false)
            console.error("Error fetching brands:", error);
            alert("Error fetching the brands. Please try again.");
        }
    };
    const getAllFeatureAndSpecifications = async () => {
        try {
            setIsCategoryLoading(true)
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            const url = new URL(`${BASE_URL}/${ALL_FEATURE_AND_SPECIFICATIONS}`);
            const res = await axiosAuth.get(url.toString());
            console.log(res.data.data)
            setFeatureAndSpecifications(res.data.data)
            setIsCategoryLoading(false)
        } catch (error) {
            setIsCategoryLoading(false)
            console.error("Error fetching brands:", error);
            alert("Error fetching the brands. Please try again.");
        }
    };
    const getAllVariants = async () => {
        try {
            setIsLoading(true)
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            const url = new URL(`${BASE_URL}/${ALL_VARIANTS}`);
            url.searchParams.set("role", (1).toString());
            url.searchParams.set("page", (pagination.pageIndex + 1).toString());
            url.searchParams.set("pageSize", pagination.pageSize.toString());
            url.searchParams.set("sort", JSON.stringify(sorting));
            url.searchParams.set("query", filter);
            const res = await axiosAuth.get(url.toString());

            setVariants(res.data.data)
            setVariantData(res.data);
            setPageCount(res.data.meta?.last_page);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error("Error fetching variants:", error);
            alert("Error fetching the variants. Please try again.");
        }
    };
    const onVariantPageChange = (page: number) => {
        setVariantPage(page);
    };

    const deleteConfirm = (variant: Variant) => {
        setShowModal(true)
        setDeleteData(variant);
    };

    const handleDelete = async (id: number) => {

        try {
            const res = await axiosAuth.delete(DELETE_VARIANT(id));
            toast.success(res?.data?.message);
            getAllVariants();
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
        }
    };

    const handleEdit = async (data: Variant) => {
        setVariant(data)
    };
    useEffect(() => {
        getAllVariants();
    }, [pagination, sorting, filter]);
    useEffect(() => {
        getAllBrands();
        getAllFeatureAndSpecifications();
    }, []);
    return (
        <>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full mb-3">
                            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl">
                                <div className="relative overflow-x-auto">
                                    <Form brands={brands} allFeatureAndSpecifications={featureAndSpecifications} variant={variant} submissionCallback={() => {getAllVariants();setVariant(undefined)}} noUpdateCallback={() => {getAllVariants();setVariant(undefined)}} cancelCallback={() => setVariant(undefined)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full mb-3">
                            <div className="bg-white shadow-xl dark:bg-gray-800">
                                <div className="relative overflow-x-auto">

                                    <Card className="w-full shadow-xl">
                                        <CardHeader>
                                            <CardTitle>Variants</CardTitle>
                                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {/* {(!isLoading) ? (
                                                <DataTable
                                                    columns={columns({ handleDelete, handleEdit })} // Pass callbacks
                                                    data={variants}
                                                    items={variantData.meta?.total}
                                                    pageSize={take}
                                                    currentPage={variantPage}
                                                    lastPage={variantData.meta?.last_page}
                                                    onPageChange={onVariantPageChange}
                                                    isLoading={isLoading}
                                                />
                                            ) : (
                                                <SkeletonTable columnsCount={6} rowsCount={take} />
                                            )
                                            } */}



                                            {/* {(!isLoading) ? ( */}
                                                <TableServerSide
                                                    columns={columns({ handleDelete, handleEdit })} // Pass callbacks
                                                    data={variants}
                                                    pageCount={variantData.meta?.last_page}
                                                    total={variantData.meta?.totalRecords}
                                                    onPaginationChange={(pageIndex, pageSize) =>
                                                        setPagination({ pageIndex, pageSize })
                                                    }
                                                    onSortingChange={setSorting}
                                                    onFilterChange={setFilter}
                                                    isLoading={isLoading}
                                                />
                                            {/* ) : (
                                                <SkeletonTable columnsCount={6} rowsCount={pagination.pageSize} />
                                            )
                                            } */}
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}