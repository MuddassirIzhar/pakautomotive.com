import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SkeletonTable } from "./SkeletonTable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  total: number;
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
  onSortingChange: (sorting: SortingState) => void;
  onFilterChange: (filter: string) => void;
  isLoading: boolean;
}

export function TableServerSide<TData, TValue>({
  columns,
  data,
  pageCount,
  total,
  onPaginationChange,
  onSortingChange,
  onFilterChange,
  isLoading
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filter, setFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    pageCount,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
      onSortingChange(newSorting);
    },
    onPaginationChange: (updater) => {
      setPagination(updater);
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
      onPaginationChange(newPagination.pageIndex, newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
  });
  const [page, setPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const pageSize = 10;

const handleGoToPage = () => {
  const pageNumber = parseInt(inputPage, 10);
  if (pageNumber >= 1 && pageNumber <= table.getPageCount()) {
    setPage(pageNumber);
  }
};

  return (
    <div>
      <Input
        placeholder="Filter..."
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          onFilterChange(e.target.value);
        }}
        className="max-w-sm mb-4"
      />

      {(!isLoading) ? (
        <>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  if (value == 'All') {
                    // Set pageSize to the total number of rows
                    table.setPageSize(total); // You need to know the total row count
                  } else {
                    table.setPageSize(Number(value))
                  }
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 25, 50, 100 ].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      { pageSize }
                    </SelectItem>
                  ))}
                  { total > 100 && <SelectItem value={`${total}`}> All </SelectItem>}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => {setPage(1);table.setPageIndex(0)}}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => {setPage((prev) => Math.max(prev - 1));table.previousPage()}}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft />
              </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  className={`${pageNumber === page ? 'h-10 w-10' : 'h-8 w-8'} hidden  p-0 lg:flex`}
                  variant={pageNumber === page ? 'default' : 'outline'}
                  onClick={() => {setPage(pageNumber);table.setPageIndex(pageNumber -1)}}
                >
                  {pageNumber}
                </Button>
              ))}
            </div>

              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => {setPage((prev) => Math.max(prev + 1));table.nextPage()}}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => {setPage(table.getPageCount());table.setPageIndex(table.getPageCount() - 1)}}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div> */}
        </>
        ) : (
            <SkeletonTable columnsCount={6} rowsCount={pagination.pageSize} />
        )
        }

    </div>
  );
}