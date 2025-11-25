"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export function NavNordic({ className, type = "default", ...props }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const countries = [
    "Norway",
    "Sweden",
    "Iceland",
    "Denmark",
    "Finland",
  ];

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

  const handleCountrySelect = (country) => {
    router.push(`/experiences?country=${country}`);
    setIsOpen(false);
  };

  return (
    <nav
      className={cn(
        "flex h-[70px] w-full items-center justify-between px-4 lg:h-[90px]",
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
      <div className="flex items-center gap-6 md:gap-8">
        <Link
          href="/experiences"
          className="hidden font-medium text-gray-900 transition-colors hover:text-blue-600 lg:block"
        >
          All Experiences
        </Link>
        <Link
          href="/experiences?category=Northern Lights"
          className="hidden font-medium text-gray-900 transition-colors hover:text-blue-600 lg:block"
        >
          Northern Lights
        </Link>
        <Link
          href="/experiences?category=Fjord Tours"
          className="hidden font-medium text-gray-900 transition-colors hover:text-blue-600 lg:block"
        >
          Fjord Tours
        </Link>
        <Link
          href="/experiences?category=Wildlife Safari"
          className="hidden font-medium text-gray-900 transition-colors hover:text-blue-600 lg:block"
        >
          Whale Safari
        </Link>
        
        {/* Currency Selector */}
        <CurrencySelector />
        
        {/* Country Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <span>Countries</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    {country}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
