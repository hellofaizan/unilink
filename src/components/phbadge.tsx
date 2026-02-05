import Link from "next/link";
import React from "react";

export default function PHBadge() {
  return (
    <Link
      href={"/"}
      className="flex items-center w-max gap-3 rounded-full border border-rose-200 bg-rose-50/80 px-4 py-3 text-left shadow-sm"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-amber-900">
        <img src={"/socials/producthunt.svg"} />
      </div>
      <div className="leading-tight">
        <p className="text-xs font-semibold text-slate-900">
          {/* #1 Product of the Day */}
          We are live on
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-rose-500">
          Product Hunt
        </p>
      </div>
    </Link>
  );
}
