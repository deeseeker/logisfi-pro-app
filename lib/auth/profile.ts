import type { UserModel } from "@/lib/api/types/models";

const ROLE_LABELS: Record<string, string> = {
  SuperAdmin: "Super Administrator",
  Admin: "Administrator",
  StaffAdmin: "Staff Administrator",
  StaffMember: "Staff Member",
  Approver: "Approver",
  Initiator: "Initiator",
};

const ROLE_PRIORITY = [
  "SuperAdmin",
  "Admin",
  "StaffAdmin",
  "StaffMember",
  "Approver",
  "Initiator",
] as const;

export function formatUserDisplayName(profile?: UserModel | null): string {
  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return fullName || profile?.email || "User";
}

export function getPrimaryRoleLabel(
  roles: string[] | null | undefined
): string | undefined {
  for (const role of ROLE_PRIORITY) {
    if (roles?.includes(role)) {
      return ROLE_LABELS[role];
    }
  }

  return undefined;
}
