import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rowCount?: number;
}

export const TableSkeleton = ({ rowCount = 5 }: TableSkeletonProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/4" />
      </div>
      <div className="rounded-md border">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        {[...Array(rowCount)].map((_, i) => (
          <div key={i} className="p-4 border-b last:border-0">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
