"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NavNordic({ className, type = "default", ...props }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const types = {
    home: {
      nav: "rounded-[24px] px-[32px] text-white backdrop-blur-[2px]",
      logoText: "text-white",
    },
    default: {
      nav: "relative bg-white text-secondary shadow-md",
      logoText: "text-gray-900",
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/experiences?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/experiences');
    }
  };

  return (
    <nav
      className={cn(
        "flex h-[70px] w-full items-center justify-between px-[5%] lg:h-[90px]",
        types[type].nav,
        className
      )}
      {...props}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/nordtravel-logo.svg"
          alt="NordTravel"
          width={182}
          height={59}
          className="h-[52px] w-auto"
          priority
        />
      </Link>

      {/* Navigation Links */}
      <div className="hidden items-center gap-8 md:flex">
        <Link href="/experiences" className="font-medium hover:text-blue-600">
          All Experiences
        </Link>
        <Link
          href="/experiences?category=Northern Lights"
          className="font-medium hover:text-blue-600"
        >
          Northern Lights
        </Link>
        <Link
          href="/experiences?category=Fjord Tours"
          className="font-medium hover:text-blue-600"
        >
          Fjord Tours
        </Link>
        <Link
          href="/experiences?category=Wildlife Safari"
          className="font-medium hover:text-blue-600"
        >
          Whale Safari
        </Link>
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experiences..."
            className="w-[240px] rounded-lg border border-gray-300 py-2 pl-4 pr-10 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Link
          href="/experiences"
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
        >
          <Search className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}
