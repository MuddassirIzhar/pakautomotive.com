'use client';
import { useEffect, useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { ALL_BLOGS, DELETE_BLOG } from '@/utils/ApiRoutes';
import { Blog } from 'next-auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { axiosAuth } from "@/lib/axiosInstance";
import { columns } from "./columns"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TableServerSide } from '@/app/components/TableServerSide';

export default function Index() {

    const [deleteData, setDeleteData] = useState<Blog | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(true)
    const [take, setTake] = useState<number>(5);
    const [blog, setBlog] = useState<Blog | null | undefined>(undefined);

    const [blogs, setBlogs] = useState([]);
    const [blogData, setBlogData] = useState<any>({});
    const [blogPage, setBlogPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState(0);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [filter, setFilter] = useState("");
    const getAllBlogs = async () => {
        try {
            setIsLoading(true)
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
            const url = new URL(`${BASE_URL}/${ALL_BLOGS}`);
            url.searchParams.set("page", (pagination.pageIndex + 1).toString());
            url.searchParams.set("pageSize", pagination.pageSize.toString());
            url.searchParams.set("sort", JSON.stringify(sorting));
            url.searchParams.set("query", filter);
            const res = await axiosAuth.get(url.toString());

            setBlogs(res.data.data)
            setBlogData(res.data);
            setPageCount(res.data.meta?.last_page);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error("Error fetching blogs:", error);
            alert("Error fetching the blogs. Please try again.");
        }
    };
    const onBlogPageChange = (page: number) => {
        setBlogPage(page);
    };

    const deleteConfirm = (blog: Blog) => {
        setShowModal(true)
        setDeleteData(blog);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete the item");
            }

            getAllBlogs();
            alert(`Item with ID ${id} deleted successfully!`);
            return response.json();
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Error deleting the item. Please try again.");
        }
    };

    const handleEdit = async (data: Blog) => {
        setBlog(data)
    };

    const getConfirmationDelete = async (confirm: boolean) => {
        if (confirm) {
            try {
                const res = await axiosAuth.delete(DELETE_BLOG(deleteData?.id));
                toast.success(res?.data?.message);
                getAllBlogs();
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
    useEffect(() => {
        getAllBlogs();
    }, [pagination, sorting, filter]);
    return (
        <>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full mb-3">
                            <div className="bg-white shadow-xl dark:bg-gray-800">
                                <div className="relative overflow-x-auto">

                                    <Card className="w-full shadow-xl">
                                        <CardHeader>
                                            <CardTitle>Blogs</CardTitle>
                                            <CardDescription>Blogs are online journals sharing information, opinions, or personal experiences.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                                <TableServerSide
                                                    columns={columns({ handleDelete, handleEdit })} // Pass callbacks
                                                    data={blogs}
                                                    pageCount={blogData.meta?.last_page}
                                                    total={blogData.meta?.totalRecords}
                                                    onPaginationChange={(pageIndex, pageSize) =>
                                                        setPagination({ pageIndex, pageSize })
                                                    }
                                                    onSortingChange={setSorting}
                                                    onFilterChange={setFilter}
                                                    isLoading={isLoading}
                                                />
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