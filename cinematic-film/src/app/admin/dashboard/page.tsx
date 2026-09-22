"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  MapPin,
  CalendarCheck,
  Inbox,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Phone,
  Mail,
  Calendar,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";

interface EnquiryItem {
  id: string;
  bookingId: string;
  name: string;
  phone: string;
  email?: string;
  destination: string;
  travelDate: string;
  travellers: number;
  pickupPoint: string;
  customPickupRequest?: string;
  amountPerPerson: number;
  discountApplied: number;
  totalAmount: number;
  notes?: string;
  status: string;
  createdAt: string;
}

interface StatsData {
  totalEnquiries: number;
  totalBookings: number;
  confirmedBookings: number;
  newEnquiries: number;
  contactedEnquiries: number;
  pipelineValue: number;
  totalTours: number;
  totalDestinations: number;
  sources: {
    enquiries: string;
    bookings: string;
    tours: string;
    destinations: string;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<EnquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecentEnquiries(data.recentEnquiries || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStats();
  };

  // Filtered list
  const filteredEnquiries = recentEnquiries.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.bookingId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>CONFIRMED</span>
          </span>
        );
      case "NEW":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            <span>NEW LEAD</span>
          </span>
        );
      case "CONTACTED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-sky-500/20 text-sky-300 border border-sky-500/30">
            <Phone className="w-3 h-3" />
            <span>CONTACTED</span>
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-red-500/20 text-red-300 border border-red-500/30">
            <AlertCircle className="w-3 h-3" />
            <span>CANCELLED</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-zinc-500/20 text-zinc-300 border border-zinc-500/30">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>NEON DATABASE CONNECTED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Tours &amp; Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1">
            Real-time enquiries, passenger bookings, and fleet status for BharatVista.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs font-medium text-zinc-200 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-amber-400" : ""}`} />
            <span>{isRefreshing ? "Updating..." : "Refresh Stats"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-[#EA580C] hover:bg-[#f97316] text-white text-xs font-semibold shadow-md shadow-[#EA580C]/30 transition-all flex items-center gap-1.5"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <div className="p-5 rounded-3xl bg-[#0A2E4C]/35 border border-white/10 relative overflow-hidden group hover:border-amber-400/30 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Total Bookings</span>
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1">
            {isLoading ? "..." : stats?.totalBookings ?? 0}
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>{stats?.confirmedBookings ?? 0} confirmed</span>
            <span className="text-emerald-400 font-bold">Neon DB</span>
          </div>
        </div>

        {/* Total Enquiries */}
        <div className="p-5 rounded-3xl bg-[#0A2E4C]/35 border border-white/10 relative overflow-hidden group hover:border-amber-400/30 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Total Enquiries</span>
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 mb-1">
            {isLoading ? "..." : stats?.totalEnquiries ?? 0}
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>{stats?.newEnquiries ?? 0} new leads</span>
            <span className="text-amber-400 font-bold">Neon DB</span>
          </div>
        </div>

        {/* Total Tours */}
        <div className="p-5 rounded-3xl bg-[#0A2E4C]/35 border border-white/10 relative overflow-hidden group hover:border-amber-400/30 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Active Tours</span>
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/20">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1">
            {isLoading ? "..." : stats?.totalTours ?? 1}
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>Maheshwar Circuit</span>
            <span className="text-purple-300">Catalog</span>
          </div>
        </div>

        {/* Total Destinations */}
        <div className="p-5 rounded-3xl bg-[#0A2E4C]/35 border border-white/10 relative overflow-hidden group hover:border-amber-400/30 transition-all">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider">Destinations</span>
            <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/20">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1">
            {isLoading ? "..." : stats?.totalDestinations ?? 4}
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>Indore, Jam Gate, etc.</span>
            <span className="text-sky-300">Catalog</span>
          </div>
        </div>
      </div>

      {/* Database Schema Status Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center gap-2.5 text-zinc-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Data Source Notice:</strong> Enquiries and customer reservations are fetched directly from your live <strong>Neon PostgreSQL</strong> database. Tours &amp; Destinations are currently catalog-backed until dynamic CRUD tables are introduced in the next phase.
          </span>
        </div>
        <div className="font-mono text-amber-300 shrink-0 font-semibold">
          Pipeline: ₹{stats?.pipelineValue.toLocaleString() || 0}
        </div>
      </div>

      {/* Recent Enquiries & Bookings Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <span>Recent Enquiries &amp; Bookings</span>
              <span className="text-xs font-mono text-zinc-400 font-normal">
                ({filteredEnquiries.length} records)
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Inbound customer leads recorded directly from the website booking modal.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search name, phone, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] text-xs text-white placeholder:text-zinc-500 focus:outline-none w-48 sm:w-56"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#081F33] border border-white/15 text-xs text-zinc-300 focus:border-[#EA580C] focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New Leads</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CONTACTED">Contacted</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-3xl bg-[#0A2E4C]/25 border border-white/10 overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="py-16 text-center text-xs text-zinc-400 font-mono">
              Loading enquiries from Neon PostgreSQL...
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Inbox className="w-10 h-10 text-zinc-500 mx-auto" />
              <div className="text-sm font-semibold text-zinc-300">No enquiries found</div>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                {searchQuery || statusFilter !== "ALL"
                  ? "Try adjusting your search or status filter."
                  : "Submit an enquiry via the website booking modal to see it appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4 font-medium">Ref &amp; Date</th>
                    <th className="py-3 px-4 font-medium">Traveller</th>
                    <th className="py-3 px-4 font-medium">Trip &amp; Boarding</th>
                    <th className="py-3 px-4 font-medium">Guests</th>
                    <th className="py-3 px-4 font-medium">Amount</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Ref & Date */}
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-amber-300">
                          {enquiry.bookingId}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                          {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* Traveller Contact */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{enquiry.name}</div>
                        <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-amber-400" />
                          <span>{enquiry.phone}</span>
                        </div>
                        {enquiry.email && enquiry.email !== "—" && (
                          <div className="text-[10px] text-zinc-500 truncate max-w-[150px]">
                            {enquiry.email}
                          </div>
                        )}
                      </td>

                      {/* Trip & Boarding */}
                      <td className="py-3 px-4">
                        <div className="text-zinc-200 font-medium">
                          {enquiry.travelDate}
                        </div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span className="capitalize">{enquiry.pickupPoint}</span>
                        </div>
                        {enquiry.customPickupRequest && (
                          <div className="text-[10px] text-amber-300/80 italic mt-0.5">
                            Stop: {enquiry.customPickupRequest}
                          </div>
                        )}
                      </td>

                      {/* Guests */}
                      <td className="py-3 px-4 font-mono font-semibold text-zinc-200">
                        {enquiry.travellers} {enquiry.travellers === 1 ? "seat" : "seats"}
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 font-mono">
                        <div className="font-bold text-amber-300">₹{enquiry.totalAmount}</div>
                        {enquiry.discountApplied > 0 && (
                          <div className="text-[10px] text-emerald-400">
                            -₹{enquiry.discountApplied} (20% off)
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getStatusBadge(enquiry.status)}
                      </td>

                      {/* Notes */}
                      <td className="py-3 px-4 max-w-xs">
                        <span className="text-zinc-300 line-clamp-2 text-[11px]">
                          {enquiry.notes || "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

