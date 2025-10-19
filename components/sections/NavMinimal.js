import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export function NavMinimal() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex h-[70px] w-full items-center justify-between px-[5%] lg:h-[90px]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/nordtravel-logo.svg"
          alt="NordTravel"
          width={182}
          height={59}
          className="h-[52px] w-auto brightness-0 invert"
          priority
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 md:gap-8">
        <Link
          href="/experiences?category=Northern Lights"
          className="hidden font-medium text-white transition-colors hover:text-blue-300 lg:block"
        >
          Northern Lights
        </Link>
        <Link
          href="/experiences?category=Fjord Tours"
          className="hidden font-medium text-white transition-colors hover:text-blue-300 lg:block"
        >
          Fjord Tours
        </Link>
        <Link
          href="/experiences?category=Wildlife Safari"
          className="hidden font-medium text-white transition-colors hover:text-blue-300 lg:block"
        >
          Wildlife Safari
        </Link>
        <Link
          href="/experiences"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </Link>
      </div>
    </nav>
  );
}
