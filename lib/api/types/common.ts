import type { DateRangePeriod } from "./enums";

export type {
  QueryParamValue,
  QueryParams,
  RequestOptions,
  ResponseParseAs,
} from "../client";

/** Shared date-range query used by analytics, dashboard, and reports. */
export interface DateRangeQuery {
  period?: DateRangePeriod;
  fromDate?: string;
  toDate?: string;
}

/** ASP.NET paginated list query (PascalCase as published by Swagger). */
export interface PaginationQuery {
  PageNumber?: number;
  PageSize?: number;
}
