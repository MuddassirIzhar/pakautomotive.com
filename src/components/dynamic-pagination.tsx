"use client";

import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

export function DynamicPagination({ 
    totalItems, 
    itemsPerPage,
    items,
    pageSize,
    currentPage,
    lastPage,
    onPageChange 
}: { 
    totalItems: number; 
    itemsPerPage: number;
    items: number;
    pageSize: number;
    currentPage: number;
    lastPage: number;
    onPageChange: any; 
}) {
    const pagesCount = Math.ceil(items / pageSize); // 100/10

    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    const range = 2;
    const showitems = range * 2 + 1;
    // Calculate total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            variant="outline"
            onClick={() => onPageChange(1)}
            // onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

                        {pages.map(function (page, i) {
                            if (
                                !(
                                    page >= currentPage + range + 1 ||
                                    page <= currentPage - range - 1
                                ) ||
                                lastPage <= showitems
                            ) {
                                    return (

                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => onPageChange(page)}
                                                variant={page === currentPage ? 'default' : 'outline'}
                                                isActive={page === currentPage}

                                                className={`${currentPage === page ? 'h-10 w-10' : 'h-8 w-8'} hidden  p-0 lg:flex`}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                            }
                        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}