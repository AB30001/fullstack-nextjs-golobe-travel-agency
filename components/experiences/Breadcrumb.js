import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ country, city, title }) {
  const breadcrumbs = [
    { label: "Europe", href: "/" },
    { label: country, href: `/${country.toLowerCase()}` },
    { label: city, href: `/experiences?country=${country}` },
    { label: "Things to Do", href: `/experiences?country=${country}` },
    { label: "Tours", href: `/experiences?country=${country}` },
  ];

  return (
    <nav className="mb-4 flex items-center gap-1 text-sm text-gray-600">
      {breadcrumbs.map((crumb, idx) => (
        <div key={idx} className="flex items-center gap-1">
          {idx > 0 && <ChevronRight className="h-4 w-4" />}
          <Link href={crumb.href} className="hover:text-gray-900 hover:underline">
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
