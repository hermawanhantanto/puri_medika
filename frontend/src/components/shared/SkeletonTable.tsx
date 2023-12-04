import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <div className="flex flex-col w-full gap-8">
      <Skeleton className="min-w-full h-[40px]" />
      <Skeleton className="min-w-full h-[40px]" />
      <Skeleton className="min-w-full h-[40px]" />
      <Skeleton className="min-w-full h-[40px]" />
      <Skeleton className="min-w-full h-[40px]" />
      <Skeleton className="min-w-full h-[40px]" />
    </div>
  );
};

export default SkeletonTable;
