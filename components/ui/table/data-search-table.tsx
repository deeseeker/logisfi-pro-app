"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface DataTableSearchProps {
  searchKey: string;
}

export function DataTableSearch({ searchKey }: DataTableSearchProps) {
  const router = useRouter();
  const { query } = router;

  // Get the initial search query from the URL
  const [searchQuery, setSearchQuery] = useState<string>(
    (query[searchKey] as string) || ""
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    // Update the URL query parameters
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          [searchKey]: value || undefined, // Remove key if the value is empty
          page: 1, // Reset the page to 1 when search changes
        },
      },
      undefined,
      { shallow: true } // Use shallow routing to avoid a full page reload
    );
  };

  // Sync the local state with URL changes (e.g., when the user navigates)
  useEffect(() => {
    if (query[searchKey] !== searchQuery) {
      setSearchQuery((query[searchKey] as string) || "");
    }
  }, [query, searchKey]);

  return (
    <Input
      placeholder={`Search ${searchKey}...`}
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      className={cn("w-full md:max-w-sm", !searchQuery && "animate-pulse")}
    />
  );
}
