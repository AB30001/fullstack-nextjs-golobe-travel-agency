import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }) {
  return (
    <Link aria-label={"NordTravel logo. Click to go to home page"} href={"/"}>
      <Image
        src="/images/nordtravel-logo.svg"
        alt="NordTravel"
        width={156}
        height={52}
        className={cn("h-[52px] w-auto", className)}
        priority
      />
    </Link>
  );
}
