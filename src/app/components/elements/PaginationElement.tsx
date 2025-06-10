"use client";
import Link from "next/link";
import React from "react";

const PaginationElement = ({
    items,
    pageSize,
    currentPage,
    lastPage,
    onPageChange,
}: {
    items: number;
    pageSize: number;
    currentPage: number;
    lastPage: number;
    onPageChange: any;
}) => {
    const pagesCount = Math.ceil(items / pageSize); // 100/10

    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const range = 2;
    const showitems = range * 2 + 1;

    const activeClass =
        "flex items-center justify-center px-3 h-8 text-white border border-theme-primary-600 bg-theme-primary-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
    const inActiveClass =
        "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
    return (
        <>
            {lastPage > 1 && (
                <nav
                    className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                    aria-label="Table navigation"
                >
                    {(currentPage > lastPage) ? 
                        (<span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                            Showing <span className="font-semibold"> {((currentPage - 1) * pageSize) + 1} to {currentPage * pageSize} </span> of <span className="font-semibold"> {items} </span>
                        </span>) : (<span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold"> {((currentPage - 1) * pageSize) + 1} to {items} </span> of <span className="font-semibold"> {items} </span>
                    </span>)

                    }
                    
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        {currentPage > 1 ? (
                            <>
                                <li>
                                    <a
                                        className={`${inActiveClass} cursor-pointer rounded-s-lg`}
                                        onClick={() => onPageChange(1)}
                                    >
                                        &laquo;
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className={`${inActiveClass} cursor-pointer`}
                                        onClick={() => onPageChange(currentPage - 1)}
                                    >
                                        &lsaquo;
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <span className={`${inActiveClass} rounded-s-lg`}>
                                        &laquo;
                                    </span>
                                </li>
                                <li>
                                    <span className={`${inActiveClass}`}>&lsaquo;</span>
                                </li>
                            </>
                        )}
                        {pages.map(function (page, i) {
                            if (
                                !(
                                    page >= currentPage + range + 1 ||
                                    page <= currentPage - range - 1
                                ) ||
                                lastPage <= showitems
                            ) {
                                if (currentPage == page) {
                                    return (
                                        <li key={page}>
                                            <span className={activeClass}>{page}</span>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a
                                                className={` ${inActiveClass } cursor-pointer`}
                                                onClick={() => onPageChange(page)}
                                            >
                                                {page}
                                            </a>
                                        </li>
                                    );
                                }
                            }
                        })}

                        {currentPage < lastPage ? (
                            <>
                                <li>
                                    <a
                                        className={`${inActiveClass} cursor-pointer`}
                                        onClick={() => onPageChange(currentPage + 1)}
                                    >
                                        &rsaquo;
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className={`${inActiveClass} cursor-pointer rounded-e-lg`}
                                        onClick={() => onPageChange(lastPage)}
                                    >
                                        &raquo;
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <span className={`${inActiveClass}`}>&rsaquo;</span>
                                </li>
                                <li>
                                    <span className={`${inActiveClass} rounded-e-lg`}>
                                        &raquo;
                                    </span>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </>
    );
};

export default PaginationElement;
