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

/**
 * Parse API money that may already be compact (`₦1.5M+`, `1.5M`, `1500000`).
 */
export function parseCompactNaira(
  value: string | number | null | undefined
): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }
  if (value == null || value === "") {
    return 0;
  }
  const trimmed = String(value).trim().replace(/,/g, "").replace(/\+$/, "");
  const match = trimmed.match(/^₦?\s*(-?[\d.]+)\s*([KMB])?$/i);
  if (!match) {
    const fallback = Number(trimmed);
    return Number.isFinite(fallback) ? fallback : 0;
  }
  const amount = Number(match[1]);
  if (!Number.isFinite(amount)) {
    return 0;
  }
  const suffix = match[2]?.toUpperCase();
  if (suffix === "B") return amount * 1_000_000_000;
  if (suffix === "M") return amount * 1_000_000;
  if (suffix === "K") return amount * 1_000;
  return amount;
}

/** Show the API's own compact string when present; otherwise format a number. */
export function displayAdminMoney(
  value: string | number | null | undefined
): string {
  if (value == null || value === "") {
    return "—";
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return "—";
    }
    if (/₦|[KMB]/i.test(trimmed) && Number.isNaN(Number(trimmed))) {
      return trimmed;
    }
  }
  return formatNairaCompact(parseCompactNaira(value));
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
