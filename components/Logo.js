import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }) {
  return (
    <Link aria-label={"NordExplore logo. Click to go to home page"} href={"/"}>
      <Image
        src="/images/nordexplore-logo.svg"
        alt="NordExplore"
        width={133}
        height={44}
        className={cn("h-[44px]", className)}
        style={{ width: 'auto', height: 'auto' }}
        priority
      />
    </Link>
  );
}
