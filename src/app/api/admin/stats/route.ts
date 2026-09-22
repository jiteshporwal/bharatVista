import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSession(sessionToken);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }

    // Live queries against Neon PostgreSQL
    const [
      totalEnquiries,
      confirmedBookings,
      newEnquiries,
      contactedEnquiries,
      cancelledEnquiries,
      totalAmountAgg,
      recentEnquiries,
    ] = await Promise.all([
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: "CONFIRMED" } }),
      prisma.enquiry.count({ where: { status: "NEW" } }),
      prisma.enquiry.count({ where: { status: "CONTACTED" } }),
      prisma.enquiry.count({ where: { status: "CANCELLED" } }),
      prisma.enquiry.aggregate({ _sum: { totalAmount: true } }),
      prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // Format all enquiries for UI
    const formattedEnquiries = recentEnquiries.map((item) => ({
      id: item.id,
      bookingId: item.bookingId || item.id,
      name: item.name,
      phone: item.phone,
      email: item.email || "—",
      destination: item.destination,
      travelDate: item.travelDate,
      travellers: item.travellers,
      pickupPoint: item.pickupPoint || "Indore",
      customPickupRequest: item.customPickupRequest,
      amountPerPerson: item.amountPerPerson || 699,
      discountApplied: item.discountApplied || 0,
      totalAmount: item.totalAmount || item.travellers * 699,
      notes: item.notes || item.message,
      adminNotes: item.adminNotes,
      status: item.status,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    // Catalog counts
    const totalTours = 1; // 1 flagship circuit (Indore - Maheshwar Day Trip)
    const totalDestinations = 4; // Indore, Rau Circle, Jam Gate, Maheshwar

    return NextResponse.json({
      success: true,
      stats: {
        totalEnquiries,
        totalBookings: confirmedBookings > 0 ? confirmedBookings : totalEnquiries,
        confirmedBookings,
        newEnquiries,
        contactedEnquiries,
        cancelledEnquiries,
        pipelineValue: totalAmountAgg._sum.totalAmount || 0,
        totalTours,
        totalDestinations,
        sources: {
          enquiries: "Neon PostgreSQL (live)",
          bookings: "Neon PostgreSQL (live)",
          tours: "Catalog (DB table pending)",
          destinations: "Catalog (DB table pending)",
        },
      },
      recentEnquiries: formattedEnquiries,
    });
  } catch (error) {
    console.error("[BharatVista Admin Stats API Error]:", error);
    return NextResponse.json(
      { error: "Failed to retrieve statistics from database." },
      { status: 500 }
    );
  }
}
