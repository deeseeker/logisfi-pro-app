import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileShimmer() {
  return (
    <div className="space-y-4">
      {/* Profile Card Shimmer */}
      <Card className="relative flex items-center bg-gradient-to-r from-[#205BBB] to-[#06337C]">
        <div className="w-full flex items-center p-4">
          <Skeleton className="h-20 w-20 rounded-full mr-4" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        </div>
      </Card>

      {/* Profile Details Shimmer */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-y-12">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    </div>
  );
}
