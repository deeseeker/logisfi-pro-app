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
