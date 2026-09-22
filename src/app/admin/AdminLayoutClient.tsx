"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  MapPin,
  CalendarCheck,
  Inbox,
  Users,
  Film,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  adminEmail: string;
}

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, ready: true },
  { name: "Tours", href: "/admin/tours", icon: Compass, ready: false },
  { name: "Destinations", href: "/admin/destinations", icon: MapPin, ready: false },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck, ready: false },
  { name: "Enquiries", href: "/admin/enquiries", icon: Inbox, ready: false },
  { name: "Customers", href: "/admin/customers", icon: Users, ready: false },
  { name: "Media", href: "/admin/media", icon: Film, ready: false },
  { name: "Settings", href: "/admin/settings", icon: Settings, ready: false },
];

export default function AdminLayoutClient({ children, adminEmail }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#061727] text-[#FFFDF9] flex flex-col md:flex-row selection:bg-[#EA580C] selection:text-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#081F33] border-b border-white/10 sticky top-0 z-30">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-400/30">
            <Image src="/logo.png" alt="BharatVista Logo" fill className="object-cover" />
          </div>
          <div>
            <div className="text-sm font-serif font-bold text-white leading-tight">BharatVista</div>
            <div className="text-[10px] text-amber-300 font-mono">ADMIN CONSOLE</div>
          </div>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#081F33] border-r border-white/10 flex flex-col justify-between z-40 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto p-5">
          {/* Logo & Brand */}
          <div className="pb-6 border-b border-white/10">
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-400/40 shadow-md group-hover:scale-105 transition-transform">
                <Image src="/logo.png" alt="BharatVista Logo" fill className="object-cover" priority />
              </div>
              <div>
                <div className="text-base font-serif font-bold text-white leading-tight flex items-center gap-1.5">
                  <span>BharatVista</span>
                </div>
                <div className="text-[10px] text-amber-300 font-mono tracking-wider uppercase flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>Admin Console</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="py-6 space-y-1.5 flex-1">
            <div className="px-3 text-[10px] font-mono uppercase text-zinc-400 tracking-wider mb-2">
              Menu Navigation
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? "bg-[#EA580C] text-white shadow-md shadow-[#EA580C]/25"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-white" : "text-zinc-400 group-hover:text-amber-300"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {!item.ready && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-zinc-400 border border-white/10 group-hover:border-amber-400/30 group-hover:text-amber-200 transition-colors">
                      Soon
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer: Public site shortcut + Admin profile + Logout */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>View Public Site</span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </Link>

            {/* Profile Area */}
            <div className="p-3 rounded-2xl bg-[#061727]/80 border border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  BV
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">Administrator</div>
                  <div className="text-[10px] font-mono text-zinc-400 truncate">{adminEmail}</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Sign out of console"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-300 hover:bg-red-500/15 transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

