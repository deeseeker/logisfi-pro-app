import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const schemaToDate = (date: any): string | null => {
  const dateValue = new Date(date);

  // Check if dateValue is a valid date
  if (isNaN(dateValue.getTime())) {
    console.error("Invalid date value:", date);
    return null; // or return a default value if preferred
  }

  const year = dateValue.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    dateValue
  );
  const day = dateValue.getDate();

  return `${month} ${day}, ${year}`;
};
