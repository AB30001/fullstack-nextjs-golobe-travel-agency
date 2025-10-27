"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function NavMinimal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const countries = [
    { name: "Norway", slug: "norway" },
    { name: "Sweden", slug: "sweden" },
    { name: "Iceland", slug: "iceland" },
    { name: "Denmark", slug: "denmark" },
    { name: "Finland", slug: "finland" },
  ];

  const handleCountrySelect = (slug) => {
    router.push(`/experiences?country=${slug}`);
    setIsOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex h-[70px] w-full items-center justify-between bg-white px-4 shadow-sm lg:h-[90px]">
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
                    key={country.slug}
                    onClick={() => handleCountrySelect(country.slug)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    {country.name}
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
