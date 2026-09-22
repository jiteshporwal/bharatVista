"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  CalendarCheck,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  ExternalLink,
  MapPin,
  Calendar,
  X,
  Sparkles,
  MessageCircle,
  Save,
  Loader2,
  User,
  Mail,
  FileText,
  ShieldCheck,
  Tag,
  ArrowRight,
} from "lucide-react";

export interface EnquiryItem {
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
  adminNotes?: string | null;
  status: "NEW" | "CONTACTED" | "CONFIRMED" | "CANCELLED" | string;
  createdAt: string;
  updatedAt: string;
}

interface StatsData {
  totalEnquiries: number;
  totalBookings: number;
  confirmedBookings: number;
  newEnquiries: number;
  contactedEnquiries: number;
  cancelledEnquiries: number;
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
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Detail Modal / Drawer state
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [modalStatus, setModalStatus] = useState<string>("NEW");
  const [modalAdminNotes, setModalAdminNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [saveErrorMsg, setSaveErrorMsg] = useState("");

  const fetchStatsAndEnquiries = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setEnquiries(data.recentEnquiries || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatsAndEnquiries();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStatsAndEnquiries();
  };

  // Open detail view
  const openDetailView = (item: EnquiryItem) => {
    setSelectedEnquiry(item);
    setModalStatus(item.status);
    setModalAdminNotes(item.adminNotes || "");
    setSaveSuccessMsg("");
    setSaveErrorMsg("");
  };

  const closeDetailView = () => {
    setSelectedEnquiry(null);
    setSaveSuccessMsg("");
    setSaveErrorMsg("");
  };

  // Save updated status and admin notes
  const handleSaveDetail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setIsSaving(true);
    setSaveSuccessMsg("");
    setSaveErrorMsg("");

    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: modalStatus,
          adminNotes: modalAdminNotes,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSaveSuccessMsg("Enquiry updated successfully!");

        // Update local item in list immediately without full page refresh
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === selectedEnquiry.id
              ? {
                  ...item,
                  status: modalStatus,
                  adminNotes: modalAdminNotes,
                  updatedAt: new Date().toISOString(),
                }
              : item
          )
        );

        // Update selected item reference
        setSelectedEnquiry((prev) =>
          prev
            ? {
                ...prev,
                status: modalStatus,
                adminNotes: modalAdminNotes,
                updatedAt: new Date().toISOString(),
              }
            : null
        );

        // Refresh counters in background
        fetchStatsAndEnquiries();
      } else {
        setSaveErrorMsg(data.error || "Failed to update enquiry.");
      }
    } catch {
      setSaveErrorMsg("Network error occurred while updating enquiry.");
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered enquiry list
  const filteredEnquiries = enquiries.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.phone.includes(q) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      item.bookingId.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
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
            <span>LIVE NEON DATABASE CONNECTED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Enquiries &amp; Bookings Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1">
            Track, contact, and confirm customer enquiries in real time.
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
            <span>{isRefreshing ? "Refreshing..." : "Refresh Data"}</span>
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

      {/* Operational Status Metric Cards (Neon DB) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Enquiries */}
        <div
          onClick={() => setStatusFilter("ALL")}
          className={`p-4 rounded-2xl bg-[#0A2E4C]/35 border transition-all cursor-pointer ${
            statusFilter === "ALL" ? "border-amber-400/50 bg-[#0A2E4C]/60" : "border-white/10 hover:border-white/20"
          }`}
        >
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
            Total Leads
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {isLoading ? "..." : stats?.totalEnquiries ?? 0}
          </div>
          <div className="text-[10px] text-zinc-400 font-mono mt-1">All submissions</div>
        </div>

        {/* New Leads */}
        <div
          onClick={() => setStatusFilter("NEW")}
          className={`p-4 rounded-2xl bg-[#0A2E4C]/35 border transition-all cursor-pointer ${
            statusFilter === "NEW" ? "border-amber-400 bg-[#0A2E4C]/60" : "border-white/10 hover:border-amber-400/30"
          }`}
        >
          <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>New</span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">
            {isLoading ? "..." : stats?.newEnquiries ?? 0}
          </div>
          <div className="text-[10px] text-amber-300/80 font-mono mt-1">Awaiting review</div>
        </div>

        {/* Contacted */}
        <div
          onClick={() => setStatusFilter("CONTACTED")}
          className={`p-4 rounded-2xl bg-[#0A2E4C]/35 border transition-all cursor-pointer ${
            statusFilter === "CONTACTED" ? "border-sky-400 bg-[#0A2E4C]/60" : "border-white/10 hover:border-sky-400/30"
          }`}
        >
          <div className="text-[11px] font-mono text-sky-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Phone className="w-3 h-3" />
            <span>Contacted</span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-sky-300">
            {isLoading ? "..." : stats?.contactedEnquiries ?? 0}
          </div>
          <div className="text-[10px] text-sky-300/80 font-mono mt-1">In discussion</div>
        </div>

        {/* Confirmed */}
        <div
          onClick={() => setStatusFilter("CONFIRMED")}
          className={`p-4 rounded-2xl bg-[#0A2E4C]/35 border transition-all cursor-pointer ${
            statusFilter === "CONFIRMED" ? "border-emerald-400 bg-[#0A2E4C]/60" : "border-white/10 hover:border-emerald-400/30"
          }`}
        >
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed</span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300">
            {isLoading ? "..." : stats?.confirmedBookings ?? 0}
          </div>
          <div className="text-[10px] text-emerald-300/80 font-mono mt-1">Ready for trip</div>
        </div>

        {/* Cancelled */}
        <div
          onClick={() => setStatusFilter("CANCELLED")}
          className={`p-4 rounded-2xl bg-[#0A2E4C]/35 border transition-all cursor-pointer ${
            statusFilter === "CANCELLED" ? "border-red-400 bg-[#0A2E4C]/60" : "border-white/10 hover:border-red-400/30"
          }`}
        >
          <div className="text-[11px] font-mono text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-red-300">
            {isLoading ? "..." : stats?.cancelledEnquiries ?? 0}
          </div>
          <div className="text-[10px] text-red-300/80 font-mono mt-1">Closed/Dropped</div>
        </div>

        {/* Pipeline Value */}
        <div className="p-4 rounded-2xl bg-[#0A2E4C]/35 border border-white/10">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
            Pipeline Value
          </div>
          <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300 truncate">
            ₹{stats?.pipelineValue.toLocaleString("en-IN") || 0}
          </div>
          <div className="text-[10px] text-zinc-400 font-mono mt-1">Total booking value</div>
        </div>
      </div>

      {/* Main Enquiries Management Section */}
      <div className="space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: "ALL", label: "All" },
              { id: "NEW", label: "New Leads" },
              { id: "CONTACTED", label: "Contacted" },
              { id: "CONFIRMED", label: "Confirmed" },
              { id: "CANCELLED", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-[#EA580C] text-white shadow-sm"
                    : "bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search customer, mobile, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/15 focus:border-[#EA580C] text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Desktop Table View (Visible md and up) */}
        <div className="hidden md:block rounded-3xl bg-[#0A2E4C]/25 border border-white/10 overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="py-16 text-center text-xs text-zinc-400 font-mono">
              Loading enquiries from Neon PostgreSQL...
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Inbox className="w-10 h-10 text-zinc-500 mx-auto" />
              <div className="text-sm font-semibold text-zinc-300">No enquiries match your filter</div>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                {searchQuery || statusFilter !== "ALL"
                  ? "Try clearing your search or status filter."
                  : "Customer enquiries submitted via the booking form will appear here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
                    <th className="py-3.5 px-4 font-medium">Customer</th>
                    <th className="py-3.5 px-4 font-medium">Mobile</th>
                    <th className="py-3.5 px-4 font-medium text-center">Travellers</th>
                    <th className="py-3.5 px-4 font-medium">Travel Date</th>
                    <th className="py-3.5 px-4 font-medium">Pickup</th>
                    <th className="py-3.5 px-4 font-medium">Status</th>
                    <th className="py-3.5 px-4 font-medium text-right">Amount</th>
                    <th className="py-3.5 px-4 font-medium">Submitted</th>
                    <th className="py-3.5 px-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-white/[0.02] transition-colors">
                      {/* Customer */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{enquiry.name}</div>
                        <div className="text-[10px] font-mono text-zinc-500">
                          {enquiry.bookingId}
                        </div>
                      </td>

                      {/* Mobile */}
                      <td className="py-3 px-4 font-mono text-zinc-300">
                        {enquiry.phone}
                      </td>

                      {/* Travellers */}
                      <td className="py-3 px-4 font-mono font-semibold text-center text-zinc-200">
                        {enquiry.travellers}
                      </td>

                      {/* Travel Date */}
                      <td className="py-3 px-4 text-zinc-300">
                        {enquiry.travelDate}
                      </td>

                      {/* Pickup */}
                      <td className="py-3 px-4 text-zinc-300 capitalize">
                        {enquiry.pickupPoint}
                        {enquiry.customPickupRequest && (
                          <span className="block text-[10px] text-amber-300 italic truncate max-w-[120px]">
                            {enquiry.customPickupRequest}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getStatusBadge(enquiry.status)}
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 font-mono font-bold text-amber-300 text-right">
                        ₹{enquiry.totalAmount.toLocaleString("en-IN")}
                      </td>

                      {/* Submitted */}
                      <td className="py-3 px-4 font-mono text-[10px] text-zinc-400">
                        {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => openDetailView(enquiry)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold text-xs transition-all cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Mobile Card Layout (Visible on small screens) */}
        <div className="md:hidden space-y-3">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-zinc-400 font-mono">
              Loading enquiries...
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 text-xs">
              No matching enquiries found.
            </div>
          ) : (
            filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="p-4 rounded-2xl bg-[#0A2E4C]/30 border border-white/10 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-white text-sm">{enquiry.name}</div>
                    <div className="text-[11px] font-mono text-zinc-400">{enquiry.phone}</div>
                  </div>
                  <div>{getStatusBadge(enquiry.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">TRAVEL DATE</span>
                    <span>{enquiry.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">GUESTS &amp; TOTAL</span>
                    <span className="font-mono text-amber-300 font-bold">
                      {enquiry.travellers} seats • ₹{enquiry.totalAmount}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] font-mono text-zinc-500 block">PICKUP</span>
                    <span className="capitalize">{enquiry.pickupPoint}</span>
                    {enquiry.customPickupRequest && (
                      <span className="text-amber-300 italic text-[11px] ml-1">
                        ({enquiry.customPickupRequest})
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/5">
                  <span className="text-[10px] font-mono text-zinc-500">
                    Ref: {enquiry.bookingId}
                  </span>
                  <button
                    onClick={() => openDetailView(enquiry)}
                    className="px-4 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold cursor-pointer"
                  >
                    View &amp; Manage
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ENQUIRY DETAIL VIEW DRAWER / MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={closeDetailView}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-[#081F33] border border-amber-400/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl z-10 my-auto max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh] overflow-y-auto text-white space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono mb-1">
                  <span>BOOKING REFERENCE: {selectedEnquiry.bookingId}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {selectedEnquiry.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
                  Submitted: {new Date(selectedEnquiry.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <button
                onClick={closeDetailView}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer shrink-0"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Alert Messages */}
            {saveSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}
            {saveErrorMsg && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{saveErrorMsg}</span>
              </div>
            )}

            {/* 3 Information Grid Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Customer Information */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Customer Contact</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-zinc-400">Phone:</div>
                  <div className="font-mono text-white flex items-center gap-2">
                    <span>{selectedEnquiry.phone}</span>
                    <a
                      href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(selectedEnquiry.name)}%2C%20greetings%20from%20BharatVista!%20Regarding%20your%20booking%20enquiry%20${selectedEnquiry.bookingId}...`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 text-[10px] font-sans flex items-center gap-1"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-zinc-400">Email:</div>
                  <div className="text-zinc-200">{selectedEnquiry.email || "Not provided"}</div>
                </div>
              </div>

              {/* 2. Trip & Pickup Details */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Trip &amp; Boarding</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-zinc-400">Travel Date:</div>
                    <div className="text-white font-medium">{selectedEnquiry.travelDate}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400">Travellers:</div>
                    <div className="text-white font-mono font-bold">{selectedEnquiry.travellers} Seats</div>
                  </div>
                </div>

                <div className="text-xs">
                  <div className="text-zinc-400">Pickup Location:</div>
                  <div className="text-zinc-200 capitalize font-medium">{selectedEnquiry.pickupPoint}</div>
                  {selectedEnquiry.customPickupRequest && (
                    <div className="text-[11px] text-amber-300 italic mt-0.5">
                      Custom stop: {selectedEnquiry.customPickupRequest}
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Pricing & Customer Notes */}
              <div className="md:col-span-2 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <div className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Booking Value &amp; Preferences</span>
                  </div>
                  <div className="font-mono text-sm">
                    Total: <span className="font-bold text-amber-300">₹{selectedEnquiry.totalAmount}</span>
                    {selectedEnquiry.discountApplied > 0 && (
                      <span className="text-[11px] text-emerald-400 ml-2">
                        (includes ₹{selectedEnquiry.discountApplied} group discount)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-zinc-400">Customer Request / Notes: </span>
                  <span className="text-zinc-200 italic">
                    {selectedEnquiry.notes || "No special dietary or seating requests noted."}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Management Section */}
            <form onSubmit={handleSaveDetail} className="p-5 rounded-2xl bg-[#061727] border border-amber-400/30 space-y-4">
              <div className="text-xs font-mono uppercase text-white font-bold tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Operations &amp; Status Management</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 mb-1.5">
                    Enquiry Status *
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#081F33] border border-white/15 focus:border-[#EA580C] text-base sm:text-sm text-white focus:outline-none"
                  >
                    <option value="NEW">NEW LEAD (Initial Submission)</option>
                    <option value="CONTACTED">CONTACTED (Staff Reached Out)</option>
                    <option value="CONFIRMED">CONFIRMED (Seat Booked &amp; Ready)</option>
                    <option value="CANCELLED">CANCELLED (Customer Declined)</option>
                  </select>
                </div>

                {/* Last updated */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Last Database Update
                  </label>
                  <div className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                    {new Date(selectedEnquiry.updatedAt).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Internal Admin Notes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Internal Staff / Operations Notes</span>
                  </label>
                  <span className="text-[10px] text-zinc-400 font-mono italic">
                    (Private • Not shown to customer)
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={modalAdminNotes}
                  onChange={(e) => setModalAdminNotes(e.target.value)}
                  placeholder="e.g. Spoke with Rahul on WhatsApp. Requested 2 front-row seats. Sent payment link via UPI."
                  className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#081F33] border border-white/15 focus:border-[#EA580C] text-base sm:text-xs text-white placeholder:text-zinc-500 focus:outline-none"
                />
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeDetailView}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer min-h-[44px]"
                >
                  Close
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] shadow-md shadow-[#EA580C]/30 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 min-h-[44px]"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Status &amp; Notes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
