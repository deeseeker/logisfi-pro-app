"use client";
import { useProfile } from "@/hooks/useRole";
import React from "react";

function TopNav() {
  const { data, isPending } = useProfile();
  console.log(data);
  return (
    <div className=" p-4 border border-[#D9D9DC80] bg-white">
      {/* <h2 className="text-2xl tracking-tight text-customblue">
        {isPending ? "" : data.firstName + " " + data.lastName} 👋
      </h2> */}
    </div>
  );
}

export default TopNav;
