import { cn } from "@/lib/utils";
import Link from "next/link";
import { Search } from "lucide-react";

export function NavNordic({ className, type = "default", ...props }) {
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
        <span className={cn("text-2xl font-bold", types[type].logoText)}>
          Nordic Experiences
        </span>
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
          Wildlife
        </Link>
        <Link
          href="/experiences"
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          <Search className="h-4 w-4" />
          Search
        </Link>
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
