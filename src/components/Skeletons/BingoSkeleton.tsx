import { Skeleton } from "@/components/ui/skeleton";

function BingoSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-6">
      {Array.from({ length: 16 }).map((_, index) => (
        <Skeleton key={index} className="w-32 h-24" />
      ))}
    </div>
  );
}

export default BingoSkeleton;
