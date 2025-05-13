export default function ProductSkeleton() {
  return (
    <div className="p-5 space-y-4">
      {/* Skeleton for Image */}
      <div className="h-72 bg-gray-200 animate-pulse rounded-md"></div>

      {/* Skeleton for Title */}
      <div className="h-5 bg-gray-200 animate-pulse rounded-md w-4/5"></div>

      {/* Skeleton for Subtitle */}
      <div className="h-5 bg-gray-200 animate-pulse rounded-md w-3/5"></div>
    </div>
  );
}
