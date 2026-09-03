/** Roles that should land in the admin back office after login. */
const ADMIN_CONSOLE_ROLES = new Set([
  "Admin",
  "SuperAdmin",
  "StaffAdmin",
  "StaffMember",
]);

export function hasAdminConsoleAccess(
  roles: string[] | null | undefined
): boolean {
  return roles?.some((role) => ADMIN_CONSOLE_ROLES.has(role)) ?? false;
}

export function getPostLoginPath(
  roles: string[] | null | undefined
): "/admin" | "/dashboard" {
  return hasAdminConsoleAccess(roles) ? "/admin" : "/dashboard";
}
