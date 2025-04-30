"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: HomeIcon },
    { href: "/workflows", label: "Workflows", icon: ArrowPathIcon },
    { href: "/templates", label: "Templates", icon: DocumentDuplicateIcon },
    { href: "/settings", label: "Settings", icon: Cog6ToothIcon },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            <Link href="/" className="flex items-center">
              VFX Workflow
            </Link>
          </div>
          <div className="flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium
                   ${
                     isActive(item.href)
                       ? "bg-gray-900 text-white"
                       : "text-gray-300 hover:bg-gray-700 hover:text-white"
                   }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
