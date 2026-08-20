import {
  ArrowLeftRight,
  BarChart3,
  Boxes,
  Building2,
  FileBarChart,
  FolderOpen,
  Landmark,
  LayoutDashboard,
  Package,
  Percent,
  Receipt,
  Route as RouteIcon,
  Ruler,
  Send,
  ShieldCheck,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { PAYMENT_REQUESTS, SHIPMENTS } from "./mock-data";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export interface AdminNavSection {
  section: string;
  items: AdminNavItem[];
}

const PENDING_REQUESTS = PAYMENT_REQUESTS.filter(
  (p) => p.status === "Pending Review"
).length;

export const ADMIN_NAV: AdminNavSection[] = [
  {
    section: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    section: "Master Data",
    items: [
      { href: "/admin/shippers", label: "Shippers", icon: Building2 },
      { href: "/admin/carriers", label: "Carriers", icon: Truck },
      { href: "/admin/routes", label: "Routes", icon: RouteIcon },
      { href: "/admin/truck-sizes", label: "Truck Sizes", icon: Ruler },
      { href: "/admin/products", label: "Products", icon: Boxes },
    ],
  },
  {
    section: "Commercial",
    items: [
      { href: "/admin/pricing", label: "Price Management", icon: Percent },
      {
        href: "/admin/shipments",
        label: "Shipment Management",
        icon: Package,
        badge: SHIPMENTS.length,
      },
      {
        href: "/admin/payment-requests",
        label: "Payment Requests",
        icon: Send,
        badge: PENDING_REQUESTS,
      },
      { href: "/admin/investors", label: "Investor Management", icon: Landmark },
      { href: "/admin/invoices", label: "Invoice Management", icon: Receipt },
      { href: "/admin/collections", label: "Collections", icon: Wallet },
      { href: "/admin/reconciliation", label: "Reconciliation", icon: ArrowLeftRight },
    ],
  },
  {
    section: "Intelligence",
    items: [
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/documents", label: "Documents", icon: FolderOpen },
      { href: "/admin/reports", label: "Reports", icon: FileBarChart },
      { href: "/admin/audit", label: "Audit Centre", icon: ShieldCheck },
    ],
  },
];

export const ADMIN_NAV_ITEMS: AdminNavItem[] = ADMIN_NAV.flatMap((s) => s.items);

export interface AdminRoleOption {
  key: string;
  label: string;
}

export const ADMIN_ROLES: AdminRoleOption[] = [
  { key: "super", label: "Super Administrator" },
  { key: "ops", label: "Operations Administrator" },
  { key: "finance", label: "Finance Administrator" },
  { key: "reporting", label: "Reporting Administrator" },
];
