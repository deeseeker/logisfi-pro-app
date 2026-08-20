"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Check,
  ChevronDown,
  Command,
  HelpCircle,
  LogOut,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  User,
  UserCog,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActivityIcon } from "@/components/admin/ui/activity-icon";
import { AdminButton, IconButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { ACTIVITY_FEED } from "@/constants/admin/mock-data";
import { ADMIN_NAV_ITEMS, ADMIN_ROLES } from "@/constants/admin/nav";
import { cn } from "@/lib/utils";

const USER_MENU = [
  { icon: User, label: "My Profile" },
  { icon: UserCog, label: "Switch Role" },
  { icon: Settings, label: "Preferences" },
  { icon: ShieldCheck, label: "Security & 2FA" },
];

export interface TopbarProps {
  role: string;
  onRoleChange: (role: string) => void;
  onQuickAction: (action: "shipment" | "payment") => void;
}

export function Topbar({ role, onRoleChange, onQuickAction }: TopbarProps) {
  const pathname = usePathname();
  const [searchFocus, setSearchFocus] = React.useState(false);

  const title =
    ADMIN_NAV_ITEMS.find((i) => i.href === pathname)?.label ?? "Dashboard";
  const roleLabel = ADMIN_ROLES.find((r) => r.key === role)?.label;

  return (
    <header className="h-16 bg-white/90 backdrop-blur border-b border-slate-200 flex items-center gap-4 px-6 sticky top-0 z-30 shrink-0">
      <div className="hidden xl:block shrink-0 pr-2 border-r border-slate-200 mr-1">
        <p className="text-[15px] font-semibold text-slate-900 leading-none">{title}</p>
        <p className="text-[11px] text-slate-400 mt-1">The Haulage Hub · Back Office</p>
      </div>

      <div
        className={cn("relative flex-1 max-w-md transition-all", searchFocus && "max-w-lg")}
      >
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          placeholder="Search shipments, waybills, shippers, investors…"
          aria-label="Global search"
          className="w-full h-10 pl-10 pr-14 rounded-xl bg-slate-100 border border-transparent text-sm focus:outline-none focus:bg-white focus:border-blue-800/30 focus:ring-4 focus:ring-blue-800/10 transition-all"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 flex items-center gap-0.5">
          <Command className="w-2.5 h-2.5" />K
        </span>
      </div>

      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hidden md:flex h-9 pl-3 pr-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 items-center gap-2 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
            <span className="font-semibold text-slate-700">{roleLabel}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
            Switch Role
          </DropdownMenuLabel>
          {ADMIN_ROLES.map((r) => (
            <DropdownMenuItem
              key={r.key}
              onSelect={() => onRoleChange(r.key)}
              className={cn(
                "text-xs justify-between",
                role === r.key && "text-blue-800 font-semibold"
              )}
            >
              {r.label}
              {role === r.key && <Check className="w-3 h-3" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hidden lg:flex items-center gap-1.5 mr-1">
        <AdminButton
          size="sm"
          variant="secondary"
          icon={Plus}
          onClick={() => onQuickAction("shipment")}
        >
          New Shipment
        </AdminButton>
        <AdminButton
          size="sm"
          variant="accent"
          icon={Send}
          onClick={() => onQuickAction("payment")}
        >
          Request Financing
        </AdminButton>
      </div>

      <DropdownMenu>
        <div className="relative">
          <DropdownMenuTrigger asChild>
            <IconButton icon={Bell} label="Notifications" />
          </DropdownMenuTrigger>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white pointer-events-none" />
        </div>
        <DropdownMenuContent align="end" className="w-96 p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-900">Notifications</span>
            <span className="text-xs text-blue-800 font-medium cursor-pointer">
              Mark all read
            </span>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {ACTIVITY_FEED.slice(0, 6).map((a, i) => (
              <div
                key={i}
                className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50 border-b border-slate-50"
              >
                <ActivityIcon tone={a.tone} icon={a.icon} />
                <div className="min-w-0">
                  <p className="text-xs text-slate-700 leading-relaxed">{a.text}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <IconButton icon={HelpCircle} label="Help" />
      <IconButton icon={Settings} label="Settings" />

      <div className="w-px h-6 bg-slate-200 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2.5 pl-1 pr-2.5 py-1 rounded-lg hover:bg-slate-100">
            <AvatarInitials name="Haggaih Ekele" size="md" />
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                Haggaih Ekele
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">{roleLabel}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {USER_MENU.map((x) => (
            <DropdownMenuItem key={x.label} className="gap-2.5 text-sm text-slate-600">
              <x.icon className="w-4 h-4 text-slate-400" />
              {x.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2.5 text-sm text-red-600 focus:text-red-600 focus:bg-red-50">
            <LogOut className="w-4 h-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
