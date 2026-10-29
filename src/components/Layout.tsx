"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./Button";
import {
  Home,
  ShoppingCart,
  PackageSearch,
  Users,
  CircleUserRound,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { id: "dashboard", href: "/dashboard", label: "Dashboard", icon: Home },
  { id: "products", href: "/products", label: "Products", icon: PackageSearch },
  { id: "orders", href: "/orders", label: "Orders", icon: ShoppingCart },
  { id: "users", href: "/users", label: "Users", icon: Users },
];

export function Layout({ children }: { children: ReactNode }) {
  const { email, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <div className="hidden lg:flex flex-col w-80 sticky top-0 left-0 h-screen bg-[#8B9A6E] px-6 py-6">
        {/* Logo */}
        <div className="mb-6">
          <Link href="/ExploreFeeds" className="flex items-baseline gap-0.5">
            <span className="font-black text-[#F7F2EB] text-2xl">
              IMAMISMAIL
            </span>
            <sup className="text-[#EAE2D6] font-bold text-xs">APP</sup>
          </Link>
        </div>

        {NAV.map((n) => {
          const Icon = n.icon;
          const active = pathname.startsWith(n.href);
          return (
            <Link
              key={n.id}
              href={n.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl font-semibold ${
                active ? "bg-[#EAE2D6] text-[#8B9A6E]" : "text-[#EAE2D6]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {n.label}
            </Link>
          );
        })}

        <Button
          className="mt-auto bg-[#F7F2EB] hover:bg-red-50 hover:text-red-600"
          onClick={logout}
        >
          Keluar
        </Button>
      </div>

      <div className="h-full lg:hidden">
        {!open && (
          <div className="flex flex-col w-10 md:w-20 sticky top-0 left-0 h-full bg-[#8B9A6E]">
            <button className="mx-auto py-10" onClick={() => setOpen(true)}>
              <Menu size={22} />
            </button>
          </div>
        )}

        {open && (
          <div className="w-80 h-screen bg-[#8B9A6E] flex flex-col fixed px-6 py-6">
            {/* Logo */}
            <div className="flex justify-between mb-6">
              <Link
                href="/ExploreFeeds"
                className="flex items-baseline gap-0.5"
              >
                <span className="font-black text-[#F7F2EB] text-xl tracking-tight">
                  IMAMISMAIL
                </span>
                <sup className="text-[#EAE2D6] font-bold text-xs">APP</sup>
              </Link>
              <button onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {NAV.map((n) => {
              const Icon = n.icon;
              const active = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl font-semibold ${
                    active ? "bg-[#EAE2D6] text-[#8B9A6E]" : "text-[#EAE2D6]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {n.label}
                </Link>
              );
            })}

            <Button
              className="mt-auto bg-[#F7F2EB] hover:bg-red-50 hover:text-red-600"
              onClick={logout}
            >
              Keluar
            </Button>
          </div>
        )}
      </div>

      <main className="mx-auto max-w-6xl px-6 py-6">
        <header className="mb-6">
          <div className="flex justify-end items-center gap-2 text-sm text-muted">
            <CircleUserRound className="w-5 h-5" />
            <span>{email}</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
