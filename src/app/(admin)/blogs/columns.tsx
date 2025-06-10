"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    MoreHorizontal,
    ArrowUpDown,
    ArrowDown,
    ArrowUp,
    ChevronsUpDown,
    EyeOff,
} from "lucide-react";
import moment from "moment";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GiGearStick } from "react-icons/gi";
import { TbAutomaticGearbox, TbAutomaticGearboxFilled } from "react-icons/tb";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DynamicAlertDialog } from "@/app/components/DynamicAlertDialog";
import { Blog, FuelTypeEnum, StatusEnum, TransmissionEnum } from "next-auth";
import { FaCircleCheck, FaCircleXmark, FaHourglass } from "react-icons/fa6";
import { BlogStatusEnum } from "next-auth";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDown />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUp />
                        ) : (
                            <ChevronsUpDown />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                    {column.getIsSorted() && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => column.clearSorting()}>
                                <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                                UnSort
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

// export const columns: ColumnDef<Blog>[] = [

export const columns = ({
    handleDelete,
    handleEdit,
}: {
    handleDelete: (id: number) => void;
    handleEdit: (data: Blog) => void;
}): ColumnDef<Blog>[] => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Title" />
            ),
        },
        {
            accessorKey: "model.name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Model" />
            ),
        },
        {
            accessorKey: "tags",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tags" />
            ),
            cell: ({ row }) => {
                const tags = row.getValue("tags") as Array<string>;
        
                // Display tags as a comma-separated list
                return (
                    <div className="flex flex-wrap gap-1">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="border-primary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                );
            },
        
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = row.getValue("status") as BlogStatusEnum;

                return (
                  {
                    draft: <Badge variant="secondary"><FaHourglass className="mr-1" /> DRAFT</Badge>,
                    published: <Badge variant="default"><FaCircleCheck className="mr-1" />PUBLISHED</Badge>,
                    archived: <Badge variant="destructive"><FaCircleXmark className="mr-1" />ARCHIVED</Badge>,
                  }[status] || <Badge variant="outline">Unknown</Badge>
                );

            },
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ row }) => {
                const created_at = row.getValue("created_at") as string;
                const formatted = moment(created_at).format("DD-MM-YYYY H:mm A");

                return (
                    <div className="whitespace-nowrap">
                        {formatted}
                    </div>
                );

            },
        },
        {
            accessorKey: "updated_at",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Updated At" />
            ),
            cell: ({ row }) => {
                const updated_at = row.getValue("updated_at") as string;
                const formatted = moment(updated_at).format("DD-MM-YYYY H:mm A");

                return (
                    <div className="whitespace-nowrap">
                        {formatted}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: ({ column }) => {
                return <div className="text-center"> Actions </div>;
            },
            cell: ({ row }) => {
                const blog = row.original;
                const deleteIcon = {
                    library: "fa6",
                    iconName: "FaRegTrashCan",
                    color: "red",
                };
                const editIcon = {
                    library: "fa6",
                    iconName: "FaPenToSquare",
                    color: "orange",
                };

                return (
                    <div className="text-center whitespace-nowrap">
                        <DynamicAlertDialog
                            triggerText=""
                            icon={deleteIcon}
                            title="Are you sure?"
                            description={`Are you sure you want to delete this ${blog.title}?`}
                            actionText="Delete"
                            onAction={() => handleDelete(blog.id)}
                        />
                        <DynamicAlertDialog
                            triggerText=""
                            icon={editIcon}
                            title="Are you sure?"
                            description={`Are you sure you want to edit this ${blog.title}?`}
                            actionText="Edit"
                            onAction={() => handleEdit(blog)}
                        />
                    </div>
                );
            },
        },
    ];
