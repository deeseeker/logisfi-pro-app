export interface PagedMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function readNumber(
  record: Record<string, unknown>,
  keys: string[]
): number | undefined {
  const lowered = Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key.toLowerCase(), value])
  );
  for (const key of keys) {
    const value = lowered[key.toLowerCase()];
    const amount = typeof value === "number" ? value : Number(value);
    if (Number.isFinite(amount)) {
      return amount;
    }
  }
  return undefined;
}

/**
 * ASP.NET paged envelopes leave `metaData` untyped. Accept common key spellings
 * and fall back to the current page size when the server omits totals.
 */
export function parsePagedMeta(
  metaData: unknown,
  fallback: { page: number; pageSize: number; itemCount: number }
): PagedMeta {
  const record = asRecord(metaData);
  const page =
    (record &&
      readNumber(record, ["pageNumber", "currentPage", "page"])) ??
    fallback.page;
  const pageSize =
    (record && readNumber(record, ["pageSize"])) ?? fallback.pageSize;
  const totalCount =
    (record &&
      readNumber(record, [
        "totalCount",
        "totalItemCount",
        "totalItems",
        "total",
        "count",
      ])) ??
    (fallback.itemCount === pageSize
      ? page * pageSize + 1
      : (page - 1) * pageSize + fallback.itemCount);
  const totalPages =
    (record && readNumber(record, ["totalPages", "pageCount"])) ??
    Math.max(1, Math.ceil(totalCount / Math.max(pageSize, 1)));

  return {
    page,
    pageSize,
    totalCount,
    totalPages,
  };
}

export function visiblePageNumbers(current: number, total: number): number[] {
  const last = Math.max(1, total);
  if (last <= 5) {
    return Array.from({ length: last }, (_, index) => index + 1);
  }
  const start = Math.max(1, Math.min(current - 2, last - 4));
  return Array.from({ length: 5 }, (_, index) => start + index);
}
