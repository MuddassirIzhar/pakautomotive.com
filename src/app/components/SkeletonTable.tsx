"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react/jsx-runtime";

type SkeletonProps = {
  columnsCount: number;
  rowsCount: number;
};

export function SkeletonTable({
    columnsCount,
    rowsCount,
}: SkeletonProps) {
    const th: JSX.Element[] = [];

    // Use a for loop to create an array of JSX elements
    for (let i = 0; i < columnsCount; i++) {
        th.push(
            <Skeleton className="h-8 block w-full " key={i} />
        );
    }
    const thead: JSX.Element = <div className="flex w-full items-center space-x-4">{th}</div>;

    const tdata: JSX.Element[] = [];
    for (let j = 0; j < rowsCount; j++) {
        const td: JSX.Element[] = [];
        for (let i = 0; i < columnsCount; i++) {
            td.push(
                <Skeleton className="h-12 block w-full " key={i} />
            );
        }
        tdata.push(<div className="flex w-full items-center space-x-4" key={j} >{td} </div>);
    }

  return (
    <div className="flex flex-row flex-wrap space-y-4">
        {thead}
        {tdata}
    </div>
  );
}