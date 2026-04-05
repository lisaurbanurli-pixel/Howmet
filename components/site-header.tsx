"use client";

import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 lg:px-12 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <img
              src="/Howmet Login Logo Small.png"
              alt="Howmet Aerospace"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <span className="text-gray-900 font-medium">Howmet Aerospace</span>
        </div>
      </div>
    </header>
  );
}
