"use client";
import AdminProfile from "@/components/profiles/admin-profile";
import BankProfile from "@/components/profiles/bank-profile";
import InvestorProfile from "@/components/profiles/investor-profile";
import { Heading } from "@/components/ui/heading";
import { useEffect, useState } from "react";

export default function Profile() {
  // I need to use a state management for the user object

  return (
    <div>
      <AdminProfile />
    </div>
  );
}
