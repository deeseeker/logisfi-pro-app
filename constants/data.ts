import useRole from "@/hooks/useRole";
import { NavItem } from "@/types";

function NavItems() {
  const role = useRole();
  const adminItems: NavItem[] =
    role === "Clearing"
      ? [
          {
            title: "Order",
            icon: "order",
            href: "/dashboard/order",
          },
          {
            title: "Shipment",
            icon: "load",
            href: "/dashboard/shipment",
          },
          {
            title: "Mobilizations",
            icon: "mobilization",
            href: "/dashboard/mobilization",
          },
          {
            title: "Investments",
            href: "/dashboard/investment",
            icon: "investments",
            label: "investments",
          },

          {
            title: "Clients",
            icon: "client",
            href: "#",
            label: "clients",
            isChidren: true,
            children: [
              {
                title: "Investors",
                href: "/dashboard/investors",
                icon: "investor",
                label: "investors",
              },
              {
                title: "Shippers",
                href: "/dashboard/shipper",
                icon: "shipper",
                label: "shippers",
              },
              {
                title: "Vendors",
                href: "/dashboard/vendor",
                icon: "vendors",
                label: "vendors",
              },
            ],
          },
          {
            title: "Price",
            icon: "finance",
            href: "#",
            label: "finance",
            isChidren: true,
            children: [
              {
                title: "Shipper Price",
                href: "/dashboard/shipper-price",
                icon: "transactions",
                label: "shipper's price",
              },
              {
                title: "Vendor Price",
                href: "/dashboard/vendor-price",
                icon: "investments",
                label: "vendor's price",
              },
            ],
          },
          // {
          //   title: "Shipment",
          //   icon: "example",
          //   href: "#",
          //   label: "example",
          //   isChidren: true,
          //   children: [
          //     {
          //       title: "Order",
          //       icon: "order",
          //       href: "/dashboard/order",
          //     },
          //     {
          //       title: "Load",
          //       icon: "load",
          //       href: "/dashboard/load",
          //     },
          //     {
          //       title: "Mobilizations",
          //       href: "/dashboard/mobilizations",
          //       icon: "transactions",
          //       label: "mobilizations",
          //     },
          //   ],
          // },
          //{
          //   title: "Organizations",
          //   href: "/dashboard/organization",
          //   icon: "shippers",
          //   label: "organizations",
          // },
          // {
          //   title: "Shippers",
          //   href: "/dashboard/shippers",
          //   icon: "shippers",
          //   label: "shippers",
          // },
          // {
          //   title: "Vendors",
          //   href: "/dashboard/vendors",
          //   icon: "vendors",
          //   label: "vendors",
          // },
          {
            title: "Routes",
            href: "/dashboard/routes",
            icon: "routes",
            label: "routes",
          },
        ]
      : [];
  const investorItems: NavItem[] =
    role === "Investor"
      ? [
          {
            title: "Investments",
            href: "/dashboard/investment",
            icon: "investments",
            label: "investments",
          },
          {
            title: "Beneficiary",
            href: "/dashboard/beneficiary",
            icon: "beneficiary",
            label: "beneficiary",
          },
        ]
      : [];

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "dashboard",
      label: "Dashboard",
    },

    ...adminItems,

    ...investorItems,
    //  role==='admin' && ...adminItems,
    // {
    //   title: "Account",
    //   href: "/dashboard/account",
    //   icon: "account",
    //   label: "account",
    // },
    // {
    //   title: "Profile",
    //   href: "/dashboard/profile",
    //   icon: "profile",
    //   label: "profile",
    // },

    // {
    //   title: "Transactions",
    //   href: "/dashboard/history",
    //   icon: "history",
    //   label: "history",
    // },
    {
      title: "Logout",
      href: "/",
      icon: "logout",
      label: "logout",
    },
  ];
  return navItems;
}

export default NavItems;
