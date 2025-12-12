"use client";

import Link from "next/link";
import Image from "next/image";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export function NavMinimal() {
  return (
    <nav className="relative z-50 flex h-[70px] w-full items-center justify-between bg-white px-4 shadow-sm lg:h-[90px]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/nordexplore-logo.svg"
          alt="NordExplore"
          width={182}
          height={59}
          className="h-[52px] w-auto"
          style={{ width: 'auto', height: 'auto' }}
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
        <Link
          href="/blog"
          className="hidden font-medium text-gray-900 transition-colors hover:text-blue-600 lg:block"
        >
          Blog
        </Link>
        
        {/* Currency Selector */}
        <CurrencySelector />
      </div>
    </nav>
  );
}
