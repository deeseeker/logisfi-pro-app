import {
  AlertOctagon,
  AlertTriangle,
  Clock,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import type {
  AdminActivityItem,
  AdminAuditEvent,
  AdminCarrier,
  AdminDocument,
  AdminInvestor,
  AdminInvoice,
  AdminPaymentRequest,
  AdminPriceRule,
  AdminProduct,
  AdminRoute,
  AdminSettlement,
  AdminShipment,
  AdminShipper,
  AdminTickerItem,
  AdminTruckSize,
} from "@/types/admin";

/* =========================================================================
   ADMIN BACK OFFICE — mock dataset.
   Single swap point for real APIs later. Everything here is deterministic:
   no Math.random(), no `new Date()` at module scope and all dates are built
   with Date.UTC so server and client render identical markup.
   ========================================================================= */

/** Fixed "today" for the admin section — replaces `new Date()` in previews. */
export const AS_OF = new Date(Date.UTC(2026, 7, 4, 9, 0));

export const SHIPPERS: AdminShipper[] = [
  { id: "SHP-001", name: "Dangote Group", type: "FMCG / Cement", contact: "Aisha Bello", email: "logistics@dangote.com", phone: "+234 803 555 1201", city: "Lagos", state: "Lagos", status: "Active", tier: "Platinum", onboarded: "2023-02-14", shipments: 412, volume: 1850000000, rating: 4.8 },
  { id: "SHP-002", name: "Flour Mills of Nigeria", type: "FMCG / Grains", contact: "Chidi Okafor", email: "supplychain@fmn.com", phone: "+234 802 444 7788", city: "Apapa", state: "Lagos", status: "Active", tier: "Platinum", onboarded: "2022-11-02", shipments: 356, volume: 1420000000, rating: 4.7 },
  { id: "SHP-003", name: "BUA Foods Plc", type: "FMCG / Sugar & Rice", contact: "Ngozi Eze", email: "ops@buafoods.com", phone: "+234 809 221 3345", city: "Port Harcourt", state: "Rivers", status: "Active", tier: "Gold", onboarded: "2023-06-19", shipments: 289, volume: 980000000, rating: 4.6 },
  { id: "SHP-004", name: "Promasidor Nigeria", type: "FMCG / Dairy", contact: "Tunde Adewale", email: "distribution@promasidor.com", phone: "+234 701 998 4432", city: "Ibadan", state: "Oyo", status: "Active", tier: "Gold", onboarded: "2023-09-01", shipments: 201, volume: 640000000, rating: 4.5 },
  { id: "SHP-005", name: "Olam Nigeria", type: "Agro Commodities", contact: "Grace Uduak", email: "logistics@olamgroup.com", phone: "+234 812 663 9021", city: "Kano", state: "Kano", status: "Under Review", tier: "Silver", onboarded: "2024-01-22", shipments: 88, volume: 210000000, rating: 4.1 },
  { id: "SHP-006", name: "Unilever Nigeria", type: "FMCG / HPC", contact: "Emeka Nwachukwu", email: "supply@unilever.com.ng", phone: "+234 805 112 7743", city: "Lagos", state: "Lagos", status: "Active", tier: "Platinum", onboarded: "2022-05-30", shipments: 503, volume: 2210000000, rating: 4.9 },
  { id: "SHP-007", name: "Nestlé Nigeria Plc", type: "FMCG / Beverages", contact: "Funke Ajayi", email: "ops@ng.nestle.com", phone: "+234 803 776 5521", city: "Agbara", state: "Ogun", status: "Active", tier: "Gold", onboarded: "2023-03-11", shipments: 267, volume: 875000000, rating: 4.6 },
  { id: "SHP-008", name: "Honeywell Flour Mills", type: "FMCG / Grains", contact: "Ibrahim Musa", email: "logistics@honeywellflour.com", phone: "+234 706 221 0098", city: "Lagos", state: "Lagos", status: "Suspended", tier: "Silver", onboarded: "2023-08-08", shipments: 64, volume: 152000000, rating: 3.4 },
];

export const CARRIERS: AdminCarrier[] = [
  { id: "CAR-001", name: "TSL Logistics Ltd", fleet: 128, activeTrucks: 96, contact: "Sam Okoro", phone: "+234 802 331 9021", city: "Lagos", status: "Active", rating: 4.6, onTime: 94, insurance: "Valid", insuranceExpiry: "2027-01-14" },
  { id: "CAR-002", name: "GIGM Freight & Cargo", fleet: 210, activeTrucks: 173, contact: "Blessing Nwosu", phone: "+234 809 774 2201", city: "Ibadan", status: "Active", rating: 4.4, onTime: 91, insurance: "Valid", insuranceExpiry: "2026-11-02" },
  { id: "CAR-003", name: "Continental Haulage Ltd", fleet: 84, activeTrucks: 61, contact: "David Yakubu", phone: "+234 703 552 8890", city: "Kano", status: "Active", rating: 4.2, onTime: 88, insurance: "Valid", insuranceExpiry: "2026-08-30" },
  { id: "CAR-004", name: "Zenith Carriers Nigeria", fleet: 156, activeTrucks: 140, contact: "Kemi Balogun", phone: "+234 815 663 4471", city: "Onitsha", status: "Active", rating: 4.7, onTime: 96, insurance: "Valid", insuranceExpiry: "2027-03-19" },
  { id: "CAR-005", name: "Kobo Express Haulage", fleet: 52, activeTrucks: 33, contact: "Yusuf Aliyu", phone: "+234 706 991 3320", city: "Kaduna", status: "Under Review", rating: 3.9, onTime: 79, insurance: "Expiring", insuranceExpiry: "2026-08-21" },
  { id: "CAR-006", name: "Truck Africa Fleet Ltd", fleet: 97, activeTrucks: 70, contact: "Chinedu Obi", phone: "+234 802 118 7754", city: "Port Harcourt", status: "Active", rating: 4.3, onTime: 90, insurance: "Valid", insuranceExpiry: "2026-12-05" },
];

export const PRODUCTS: AdminProduct[] = [
  { id: "PRD-001", name: "Flour — 50kg Bag", category: "Grains", unit: "Bag", avgWeight: "50kg", hazmat: false, status: "Active" },
  { id: "PRD-002", name: "Rice — 50kg Bag", category: "Grains", unit: "Bag", avgWeight: "50kg", hazmat: false, status: "Active" },
  { id: "PRD-003", name: "Refined Sugar — 50kg Bag", category: "Sugar", unit: "Bag", avgWeight: "50kg", hazmat: false, status: "Active" },
  { id: "PRD-004", name: "Vegetable Oil — 25L Jerrycan", category: "Edible Oil", unit: "Jerrycan", avgWeight: "25L", hazmat: false, status: "Active" },
  { id: "PRD-005", name: "Portland Cement — 50kg Bag", category: "Construction", unit: "Bag", avgWeight: "50kg", hazmat: false, status: "Active" },
  { id: "PRD-006", name: "Beverage Cartons (Assorted)", category: "Beverages", unit: "Carton", avgWeight: "12kg", hazmat: false, status: "Active" },
  { id: "PRD-007", name: "Detergent — 1kg Sachet Pack", category: "HPC", unit: "Pack", avgWeight: "20kg", hazmat: false, status: "Active" },
  { id: "PRD-008", name: "Diesel (AGO) — Bulk", category: "Fuel", unit: "Litre", avgWeight: "—", hazmat: true, status: "Active" },
];

export const TRUCK_SIZES: AdminTruckSize[] = [
  { id: "TRK-10T", name: "10 Tonner", capacity: "10T", maxWeight: "10,000 kg", axles: 2, baseRatePerKm: 420, status: "Active" },
  { id: "TRK-20T", name: "20 Tonner", capacity: "20T", maxWeight: "20,000 kg", axles: 3, baseRatePerKm: 610, status: "Active" },
  { id: "TRK-30T", name: "30 Tonner (Trailer)", capacity: "30T", maxWeight: "30,000 kg", axles: 4, baseRatePerKm: 780, status: "Active" },
  { id: "TRK-40T", name: "40 Tonner (Flatbed)", capacity: "40T", maxWeight: "40,000 kg", axles: 5, baseRatePerKm: 940, status: "Active" },
  { id: "TRK-45T", name: "45 Tonner (Low-bed)", capacity: "45T", maxWeight: "45,000 kg", axles: 6, baseRatePerKm: 1050, status: "Active" },
];

export const ROUTES: AdminRoute[] = [
  { id: "RT-001", origin: "Apapa", destination: "Kano", distanceKm: 1140, avgTransitHrs: 22, tollPoints: 4, status: "Active" },
  { id: "RT-002", origin: "Lagos", destination: "Abuja", distanceKm: 760, avgTransitHrs: 14, tollPoints: 3, status: "Active" },
  { id: "RT-003", origin: "Onitsha", destination: "Port Harcourt", distanceKm: 210, avgTransitHrs: 5, tollPoints: 1, status: "Active" },
  { id: "RT-004", origin: "Kano", destination: "Lagos", distanceKm: 1140, avgTransitHrs: 22, tollPoints: 4, status: "Active" },
  { id: "RT-005", origin: "Ibadan", destination: "Kaduna", distanceKm: 820, avgTransitHrs: 16, tollPoints: 3, status: "Active" },
  { id: "RT-006", origin: "Agbara", destination: "Enugu", distanceKm: 590, avgTransitHrs: 11, tollPoints: 2, status: "Active" },
];

export const INVESTORS: AdminInvestor[] = [
  { id: "INV-001", name: "Moniepoint MFB", type: "Digital Bank", wallet: 480000000, exposureLimit: 900000000, exposureUsed: 612000000, interestRate: 3.2, activeFinancings: 48, status: "Active", tier: "Tier 1", since: "2022-09-01" },
  { id: "INV-002", name: "FairMoney Bank", type: "Digital Bank", wallet: 265000000, exposureLimit: 500000000, exposureUsed: 341000000, interestRate: 3.6, activeFinancings: 31, status: "Active", tier: "Tier 1", since: "2023-01-15" },
  { id: "INV-003", name: "Union Bank of Nigeria", type: "Commercial Bank", wallet: 920000000, exposureLimit: 2000000000, exposureUsed: 1180000000, interestRate: 2.8, activeFinancings: 76, status: "Active", tier: "Tier 1", since: "2021-11-20" },
  { id: "INV-004", name: "Wema Bank Plc", type: "Commercial Bank", wallet: 410000000, exposureLimit: 800000000, exposureUsed: 505000000, interestRate: 3.0, activeFinancings: 39, status: "Active", tier: "Tier 2", since: "2022-04-04" },
  { id: "INV-005", name: "Sterling Bank Plc", type: "Commercial Bank", wallet: 155000000, exposureLimit: 400000000, exposureUsed: 372000000, interestRate: 3.4, activeFinancings: 22, status: "Exposure Warning", tier: "Tier 2", since: "2023-07-09" },
  // Low wallet but ample exposure headroom — the only way the financing form's
  // "insufficient wallet balance" block is reachable without also breaching exposure.
  { id: "INV-006", name: "Providus Bank", type: "Commercial Bank", wallet: 42000000, exposureLimit: 600000000, exposureUsed: 210000000, interestRate: 3.8, activeFinancings: 14, status: "Active", tier: "Tier 2", since: "2024-03-12" },
];

export const STATUS_FLOW = [
  "Draft",
  "Submitted",
  "Confirmed",
  "In Transit",
  "Delivered",
  "Waybill Confirmed",
  "Financing Requested",
  "Funded",
  "Invoiced",
  "Collected",
  "Reconciled",
] as const;

/** Shipment whose waybill the fraud engine flags as a duplicate. */
export const DUPLICATE_SHIPMENT_ID = "SHM-2631";

const SHIPMENT_STATUSES = [
  "Draft",
  "Submitted",
  "Confirmed",
  "In Transit",
  "Delivered",
  "Waybill Confirmed",
  "Financing Requested",
  "Funded",
  "Invoiced",
  "Collected",
];

/**
 * The prototype drew statuses from a weighted `Math.random()`. Here the same
 * distribution ([6,8,10,14,16,14,12,10,6,4] per 100) is expanded into a fixed
 * 100-slot bucket that gets indexed deterministically.
 */
const STATUS_BUCKET: string[] = [6, 8, 10, 14, 16, 14, 12, 10, 6, 4].flatMap(
  (count, index) => Array<string>(count).fill(SHIPMENT_STATUSES[index])
);

const DRIVERS = [
  "Ahmed Suleiman",
  "John Etim",
  "Musa Garba",
  "Peter Okon",
  "Ibrahim Sani",
  "Emeka Diala",
];

function makeShipments(): AdminShipment[] {
  const rows: AdminShipment[] = [];
  for (let i = 1; i <= 64; i++) {
    const shipper = SHIPPERS[i % SHIPPERS.length];
    const carrier = CARRIERS[i % CARRIERS.length];
    const route = ROUTES[i % ROUTES.length];
    const product = PRODUCTS[i % PRODUCTS.length];
    const truck = TRUCK_SIZES[i % TRUCK_SIZES.length];
    const id = `SHM-${String(2600 + i)}`;
    const status =
      id === DUPLICATE_SHIPMENT_ID
        ? "Waybill Confirmed"
        : STATUS_BUCKET[(i * 37) % 100];
    // Replaces `0.9 + Math.random() * 0.4` — same 0.90–1.30 band, deterministic.
    const jitter = 0.9 + ((i * 17) % 41) / 100;
    const value =
      Math.round(
        (route.distanceKm * (parseInt(truck.capacity, 10) * 4200) * jitter) /
          1000
      ) * 1000;
    const created = new Date(Date.UTC(2026, 6, 1 + (i % 30), 8 + (i % 10)));
    rows.push({
      id,
      waybill: `WB-NG-${String(90210 + i)}`,
      shipper: shipper.name,
      shipperId: shipper.id,
      carrier: carrier.name,
      route: `${route.origin} → ${route.destination}`,
      product: product.name,
      truck: truck.capacity,
      driver: DRIVERS[i % DRIVERS.length],
      plate: `KJA-${100 + i}XA`,
      value,
      status,
      created,
      eta: new Date(created.getTime() + route.avgTransitHrs * 3600 * 1000),
      distance: route.distanceKm,
    });
  }
  return rows;
}

export const SHIPMENTS: AdminShipment[] = makeShipments();

function makePaymentRequests(): AdminPaymentRequest[] {
  const statuses = ["Pending Review", "Approved", "Disbursed", "Rejected"];
  const funded = SHIPMENTS.filter((s) =>
    ["Financing Requested", "Funded", "Invoiced", "Collected"].includes(s.status)
  );
  return funded.map((s, i) => {
    const investor = INVESTORS[i % INVESTORS.length];
    const requestAmt = Math.round((s.value * 0.85) / 1000) * 1000;
    const status =
      s.status === "Funded" || s.status === "Invoiced" || s.status === "Collected"
        ? "Disbursed"
        : statuses[i % statuses.length];
    return {
      id: `PRQ-${String(4400 + i)}`,
      shipmentId: s.id,
      waybill: s.waybill,
      shipper: s.shipper,
      investor: investor.name,
      investorId: investor.id,
      requested: requestAmt,
      approved: status === "Rejected" ? 0 : requestAmt,
      status,
      requestedOn: new Date(s.created.getTime() + 3600 * 1000 * 6),
      dueDate: new Date(s.created.getTime() + 3600 * 1000 * 24 * 30),
      interestRate: investor.interestRate,
      flagged: i % 17 === 0,
    };
  });
}

export const PAYMENT_REQUESTS: AdminPaymentRequest[] = makePaymentRequests();

function makeInvoices(): AdminInvoice[] {
  return SHIPMENTS.filter((s) => ["Invoiced", "Collected"].includes(s.status)).map(
    (s, i) => {
      const amount = Math.round((s.value * 1.08) / 1000) * 1000;
      const paid = s.status === "Collected";
      return {
        id: `INV-${String(78000 + i)}`,
        shipmentId: s.id,
        waybill: s.waybill,
        shipper: s.shipper,
        amount,
        paidAmount: paid ? amount : i % 4 === 0 ? Math.round(amount * 0.5) : 0,
        status: paid
          ? "Paid"
          : i % 4 === 0
            ? "Partially Paid"
            : i % 6 === 0
              ? "Overdue"
              : "Outstanding",
        issued: new Date(s.created.getTime() + 3600 * 1000 * 30),
        dueDate: new Date(s.created.getTime() + 3600 * 1000 * 24 * 21),
      };
    }
  );
}

export const INVOICES: AdminInvoice[] = makeInvoices();

function makePricingRows(): AdminPriceRule[] {
  const rows: AdminPriceRule[] = [];
  SHIPPERS.slice(0, 6).forEach((s, i) => {
    TRUCK_SIZES.forEach((t, j) => {
      const route = ROUTES[(i + j) % ROUTES.length];
      rows.push({
        id: `PRC-${s.id}-${t.capacity}`,
        shipper: s.name,
        truck: t.capacity,
        route: `${route.origin} → ${route.destination}`,
        rate: t.baseRatePerKm + i * 12 - j * 3,
        effective: "2026-06-01",
        status: j % 5 === 0 ? "Pending Approval" : "Active",
      });
    });
  });
  return rows;
}

export const PRICING_ROWS: AdminPriceRule[] = makePricingRows();

function makeReconRows(): AdminSettlement[] {
  return PAYMENT_REQUESTS.filter((p) => p.status === "Disbursed")
    .slice(0, 22)
    .map((p, i) => ({
      id: `SET-${String(9100 + i)}`,
      requestId: p.id,
      shipper: p.shipper,
      investor: p.investor,
      principal: p.approved,
      interest: Math.round(p.approved * (p.interestRate / 100)),
      thhFee: Math.round(p.approved * 0.015),
      status: i % 5 === 0 ? "Pending Settlement" : "Completed",
      date: new Date(Date.UTC(2026, 6, 1 + i)),
    }));
}

export const RECON_ROWS: AdminSettlement[] = makeReconRows();

export const ACTIVITY_FEED: AdminActivityItem[] = [
  { icon: "check", text: "Waybill WB-NG-90244 confirmed by Ops Admin — Chiamaka R.", time: "3 min ago", tone: "success" },
  { icon: "money", text: "Disbursement of ₦18.2M approved for PRQ-4412 via Union Bank", time: "18 min ago", tone: "success" },
  { icon: "alert", text: "Possible duplicate waybill detected — WB-NG-90198 flagged for review", time: "42 min ago", tone: "warning" },
  { icon: "invoice", text: "Invoice INV-78021 marked overdue (7 days) — BUA Foods Plc", time: "1 hr ago", tone: "error" },
  { icon: "truck", text: "Shipment SHM-2631 departed Apapa on route to Kano", time: "2 hr ago", tone: "info" },
  { icon: "check", text: "New shipper onboarded — Olam Nigeria (pending KYC review)", time: "3 hr ago", tone: "info" },
  { icon: "money", text: "Settlement batch #SB-0919 completed — ₦142.6M reconciled", time: "5 hr ago", tone: "success" },
];

export interface AdminAlert {
  title: string;
  detail: string;
  level: "critical" | "warning";
  icon: LucideIcon;
}

export const ALERTS: AdminAlert[] = [
  { title: "Exposure threshold breached", detail: "Sterling Bank Plc at 93% of exposure limit", level: "critical", icon: ShieldAlert },
  { title: "Duplicate waybill flagged", detail: "WB-NG-90198 matches WB-NG-90031 (98% similarity)", level: "critical", icon: AlertOctagon },
  { title: "3 invoices overdue > 14 days", detail: "Total outstanding ₦64.8M across 3 shippers", level: "warning", icon: AlertTriangle },
  { title: "Carrier insurance expiring", detail: "Kobo Express Haulage — expires in 17 days", level: "warning", icon: Clock },
];

export const TICKER: AdminTickerItem[] = [
  { label: "Total Funded", value: "₦4.82B", tone: "success" },
  { label: "Active Exposure", value: "₦3.01B", tone: "info" },
  { label: "Overdue Receivables", value: "₦64.8M", tone: "warning" },
  { label: "Portfolio Yield", value: "3.14% avg", tone: "success" },
  { label: "Fraud Flags (24h)", value: "2 open", tone: "error" },
  { label: "Settlement Queue", value: "₦142.6M", tone: "info" },
];

export const DOCS: AdminDocument[] = [
  { id: "DOC-001", name: "Waybill_WB-NG-90212.pdf", type: "Waybill", shipper: "Dangote Group", size: "1.2 MB", uploaded: "2026-07-28", tag: "Verified" },
  { id: "DOC-002", name: "Invoice_INV-78014.pdf", type: "Invoice", shipper: "BUA Foods Plc", size: "340 KB", uploaded: "2026-07-27", tag: "Sent" },
  { id: "DOC-003", name: "Settlement_SET-9104.pdf", type: "Settlement", shipper: "Union Bank", size: "512 KB", uploaded: "2026-07-26", tag: "Final" },
  { id: "DOC-004", name: "POD_SHM-2618.jpg", type: "Proof of Delivery", shipper: "Unilever Nigeria", size: "2.1 MB", uploaded: "2026-07-25", tag: "Verified" },
  { id: "DOC-005", name: "KYC_OlamNigeria_CAC.pdf", type: "KYC", shipper: "Olam Nigeria", size: "780 KB", uploaded: "2026-07-20", tag: "Pending Review" },
  { id: "DOC-006", name: "Insurance_TSLLogistics.pdf", type: "Insurance", shipper: "TSL Logistics Ltd", size: "410 KB", uploaded: "2026-07-18", tag: "Valid" },
];

export const AUDIT_LOG: AdminAuditEvent[] = [
  { id: "AUD-9921", actor: "Chiamaka Reginald", role: "Ops Admin", action: "Confirmed waybill WB-NG-90244", entity: "SHM-2644", time: "2026-08-04T13:52:00Z", severity: "info" },
  { id: "AUD-9920", actor: "Ada Okonkwo", role: "Finance Admin", action: "Approved disbursement of ₦18.2M", entity: "PRQ-4412", time: "2026-08-04T13:34:00Z", severity: "info" },
  { id: "AUD-9919", actor: "System", role: "Fraud Engine", action: "Flagged duplicate waybill match (98% similarity)", entity: "WB-NG-90198", time: "2026-08-04T13:12:00Z", severity: "critical" },
  { id: "AUD-9918", actor: "Femi Kalejaiye", role: "Ops Admin", action: "Edited carrier rate card", entity: "PRC-CAR-002", time: "2026-08-04T11:47:00Z", severity: "warning" },
  { id: "AUD-9917", actor: "System", role: "Scheduler", action: "Marked INV-78021 overdue (7 days)", entity: "INV-78021", time: "2026-08-04T09:00:00Z", severity: "warning" },
  { id: "AUD-9916", actor: "Tolu Adeyemi", role: "Super Admin", action: "Created new user — Reporting Admin role", entity: "USR-0142", time: "2026-08-03T17:21:00Z", severity: "info" },
  { id: "AUD-9915", actor: "Ada Okonkwo", role: "Finance Admin", action: "Completed settlement batch #SB-0919", entity: "SET-9104", time: "2026-08-03T15:03:00Z", severity: "info" },
  { id: "AUD-9914", actor: "System", role: "Fraud Engine", action: "Duplicate shipment check passed for 41 new shipments", entity: "BATCH-0731", time: "2026-08-03T08:00:00Z", severity: "info" },
];

/* ---------------------------- chart series ------------------------------ */

export const REVENUE_TREND = [
  { m: "Feb", funded: 210, revenue: 18, defaults: 2 },
  { m: "Mar", funded: 265, revenue: 22, defaults: 3 },
  { m: "Apr", funded: 298, revenue: 27, defaults: 1 },
  { m: "May", funded: 340, revenue: 31, defaults: 4 },
  { m: "Jun", funded: 388, revenue: 36, defaults: 2 },
  { m: "Jul", funded: 452, revenue: 42, defaults: 3 },
];

export const EXPOSURE_BY_INVESTOR = INVESTORS.map((i) => ({
  name: i.name.split(" ")[0],
  used: Math.round(i.exposureUsed / 1e6),
  limit: Math.round(i.exposureLimit / 1e6),
}));

export const PORTFOLIO_MIX = [
  { name: "FMCG", value: 46 },
  { name: "Agro Commodities", value: 21 },
  { name: "Construction", value: 14 },
  { name: "Fuel & Energy", value: 11 },
  { name: "Beverages", value: 8 },
];

export const PIE_COLORS = ["#1e3a8a", "#059669", "#0891b2", "#d97706", "#7c3aed"];

export const COLLECTIONS_TREND = [
  { m: "Feb", collected: 152, outstanding: 48 },
  { m: "Mar", collected: 178, outstanding: 52 },
  { m: "Apr", collected: 205, outstanding: 41 },
  { m: "May", collected: 231, outstanding: 58 },
  { m: "Jun", collected: 268, outstanding: 63 },
  { m: "Jul", collected: 302, outstanding: 55 },
];

export const AGEING = [
  { bucket: "0-15 days", amount: 84 },
  { bucket: "16-30 days", amount: 52 },
  { bucket: "31-45 days", amount: 27 },
  { bucket: "46-60 days", amount: 14 },
  { bucket: "60+ days", amount: 9 },
];
