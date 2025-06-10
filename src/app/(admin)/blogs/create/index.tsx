'use client';


import LinkElement from "@/app/components/elements/LinkElement";
import BlogForm from "../BlogForm";

export default function Index() {
    return (
        <>
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full mb-3">
                            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl">
                                <div className="relative overflow-x-auto">
                                    <BlogForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}