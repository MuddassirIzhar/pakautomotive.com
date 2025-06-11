'use client';
import Link from 'next/link';
import { FaCalendar, FaCircleCheck, FaPenToSquare, FaRegStar, FaSortDown, FaSortUp, FaStar, FaTrashCan, FaXmark } from 'react-icons/fa6';
import { SetStateAction, useEffect, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { ALL_CATEGORIES, DELETE_CATEGORY } from '@/utils/ApiRoutes';
import moment from 'moment';
import { Category } from 'next-auth';
// import PaginationElement from '../components/elements/PaginationElement';
import { DynamicPagination } from "@/components/dynamic-pagination";

import { DynamicAlertDialog } from '@/app/components/DynamicAlertDialog';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Form from './form';
import { axiosAuth } from "@/lib/axiosInstance";
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

export default function Index() {

    const [deleteData, setDeleteData] = useState<Category | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [take, setTake] = useState<number>(5);
    const [category, setCategory] = useState<Category | null | undefined>(undefined);


    const [categories, setCategories] = useState([]);
    const [categoryData, setCategoryData] = useState<any>({});
    const [categoryPage, setCategoryPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState(0);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filter, setFilter] = useState("");
    const getAllCategories = async () => {
        try {
            setIsLoading(true)
            // const res = await axiosAuth.get(`${ALL_CATEGORIES}?take=${take}&page=${categoryPage}&role=1`);
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            const url = new URL(`${BASE_URL}/${ALL_CATEGORIES}`);
            url.searchParams.set("role", (1).toString());
            url.searchParams.set("page", (pagination.pageIndex + 1).toString());
            url.searchParams.set("pageSize", pagination.pageSize.toString());
            url.searchParams.set("sort", JSON.stringify(sorting));
            url.searchParams.set("query", filter);
            const res = await axiosAuth.get(url.toString());

            setCategories(res.data.data)
            setCategoryData(res.data);
            setPageCount(res.data.meta?.last_page);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error("Error fetching categories:", error);
            // alert"Error fetching the categories. Please try again.");
        }
    };
    const onCategoryPageChange = (page: number) => {
        setCategoryPage(page);
    };

    const deleteConfirm = (category: Category) => {
        setShowModal(true)
        setDeleteData(category);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete the item");
            }

            getAllCategories();
            // alert`Item with ID ${id} deleted successfully!`);
            return response.json();
        } catch (error) {
            console.error("Error deleting item:", error);
            // alert"Error deleting the item. Please try again.");
        }
    };

    const handleEdit = async (data: Category) => {
        setCategory(data)
    };

    const getConfirmationDelete = async (confirm: boolean) => {
        if (confirm) {
            try {
                const res = await axiosAuth.delete(DELETE_CATEGORY(deleteData?.id));
                toast.success(res?.data?.message);
                getAllCategories();
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
        }
        setDeleteData(null);
        setShowModal(false);
    };


    //   useEffect(() => {
    //     fetchData();
    //   }, [pagination, sorting, filter]);

    useEffect(() => {
        getAllCategories();
        // }, [categoryPage]);
    }, [pagination, sorting, filter]);
    return (
        <>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full mb-3">
                            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl">
                                <div className="relative overflow-x-auto">
                                    <Form category={category} submissionCallback={() => {getAllCategories();setCategory(undefined)}} noUpdateCallback={() => {getAllCategories();setCategory(undefined)}} cancelCallback={() => setCategory(undefined)} />
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
                                            <CardTitle>Categories</CardTitle>
                                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {/* {(!isLoading) ? (
                                                <DataTable
                                                    columns={columns({ handleDelete, handleEdit })} // Pass callbacks
                                                    data={categories}
                                                    items={categoryData.meta?.total}
                                                    pageSize={take}
                                                    currentPage={categoryPage}
                                                    lastPage={categoryData.meta?.last_page}
                                                    onPageChange={onCategoryPageChange}
                                                    isLoading={isLoading}
                                                />
                                            ) : (
                                                <SkeletonTable columnsCount={6} rowsCount={take} />
                                            )
                                            } */}



                                            {/* {(!isLoading) ? ( */}
                                                <TableServerSide
                                                    columns={columns({ handleDelete, handleEdit })} // Pass callbacks
                                                    data={categories}
                                                    pageCount={categoryData.meta?.last_page}
                                                    total={categoryData.meta?.totalRecords}
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