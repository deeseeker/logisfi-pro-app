export function splitCamelCase(phrase: string): string {
  // Regular expression to test for camelCase
  const camelCaseRegex = /([a-z])([A-Z])/g;

  // Split the phrase at each capital letter if camelCase is detected
  if (camelCaseRegex.test(phrase)) {
    const words = phrase.replace(camelCaseRegex, "$1 $2");

    // Convert each word to title case
    const titleCase = words
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return titleCase;
  }

  // If it's not in camel case, return the string as is
  return phrase
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "); // Handle snake_case and convert to title case
}
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Abbreviated naira for dense financial UI — ₦4.82B, ₦452.40M, ₦1.2K. */
export function formatNairaCompact(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000)
    return `${sign}₦${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}₦${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}₦${(abs / 1_000).toFixed(1)}K`;
  return `${sign}₦${abs.toFixed(0)}`;
}

/** 04 Aug 2026 — pinned to UTC so server and client agree. */
export function formatDateShort(date: Date | string | number): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** 04 Aug 2026, 13:52 — pinned to UTC so server and client agree. */
export function formatDateTime(date: Date | string | number): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
