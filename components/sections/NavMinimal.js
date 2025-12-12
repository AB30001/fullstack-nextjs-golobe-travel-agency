"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export function NavMinimal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/experiences", label: "All Experiences" },
    { href: "/experiences?category=Northern Lights", label: "Northern Lights" },
    { href: "/experiences?category=Fjord Tours", label: "Fjord Tours" },
    { href: "/experiences?category=Wildlife Safari", label: "Whale Safari" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      <nav className="relative z-50 flex h-[70px] w-full items-center justify-between bg-white px-4 shadow-sm lg:h-[90px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/nordexplore-logo.svg"
            alt="NordExplore"
            width={182}
            height={59}
            className="h-[40px] w-auto lg:h-[52px]"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-6 lg:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-gray-900 transition-colors hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <CurrencySelector />
        </div>

        {/* Mobile: Currency + Burger Menu */}
        <div className="flex items-center gap-3 lg:hidden">
          <CurrencySelector />
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white shadow-xl">
            {/* Header */}
            <div className="flex h-[70px] items-center justify-between border-b px-4">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-4 border-t" />

            {/* Countries Section */}
            <div className="py-4">
              <p className="px-6 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Explore by Country
              </p>
              {["Norway", "Iceland", "Sweden", "Finland", "Denmark"].map((country) => (
                <Link
                  key={country}
                  href={`/experiences?country=${country}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
                >
                  {country}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
