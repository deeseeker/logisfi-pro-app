import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function AccountAndMembersShimmer() {
  return (
    <div className="space-y-4">
      {/* Account Details Card Shimmer */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-y-12">
            <div>
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Card Shimmer */}
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
                  <Skeleton className="h-6 w-3/4" />
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
