"use client";

import * as React from "react";

const DEFAULT_PAGE_SIZE = 10;

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export function usePagedListParams(pageSize = DEFAULT_PAGE_SIZE) {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebouncedValue(search, 300);

  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const params = React.useMemo(
    () => ({
      PageNumber: page,
      PageSize: pageSize,
      SearchKey: debouncedSearch.trim() || undefined,
    }),
    [debouncedSearch, page, pageSize]
  );

  return {
    page,
    setPage,
    search,
    setSearch,
    params,
    pageSize,
  };
}
