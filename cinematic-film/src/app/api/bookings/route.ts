import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      totalBookings: enquiries.length,
      bookings: enquiries.map((item) => ({
        id: item.id,
        bookingId: item.bookingId || item.id,
        name: item.name,
        mobile: item.phone,
        email: item.email || undefined,
        travellers: item.travellers,
        pickupPoint: item.pickupPoint || "vijay-nagar",
        customPickupRequest: item.customPickupRequest || undefined,
        travelDate: item.travelDate,
        notes: item.notes || item.message || undefined,
        status: item.status,
        amountPerPerson: item.amountPerPerson || 699,
        discountApplied: item.discountApplied || 0,
        totalAmount: item.totalAmount || item.travellers * 699,
        createdAt: item.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("[BharatVista Bookings GET API Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries from database." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      mobile,
      email,
      travellers,
      seats,
      pickupPoint = "vijay-nagar",
      customPickupRequest,
      travelDate,
      tripDate,
      notes,
    } = body;

    // Mobile is strictly REQUIRED; Name is required; Email is OPTIONAL
    if (!mobile || !String(mobile).trim()) {
      return NextResponse.json(
        { error: "Mobile number is required so our team can reach you on WhatsApp/call." },
        { status: 400 }
      );
    }

    if (!name || !String(name).trim()) {
      return NextResponse.json(
        { error: "Please provide your full name." },
        { status: 400 }
      );
    }

    const count = Number(travellers || seats) || 1;
    const bookingId = `BV-${Date.now().toString().slice(-6)}`;

    // 20% discount for 4 or more travellers
    const baseTotal = count * 699;
    const discountApplied = count >= 4 ? Math.round(baseTotal * 0.2) : 0;
    const totalAmount = baseTotal - discountApplied;
    const cleanTravelDate = String(travelDate || tripDate || "Upcoming Weekend").trim();
    const cleanNotes = notes ? String(notes).trim() : null;
    const cleanCustomPickup = customPickupRequest ? String(customPickupRequest).trim() : null;

    // Persist directly into Neon PostgreSQL via Prisma
    const record = await prisma.enquiry.create({
      data: {
        bookingId,
        name: String(name).trim(),
        phone: String(mobile).trim(),
        email: email ? String(email).trim().toLowerCase() : null,
        destination: "Maheshwar & Jam Gate (Indore Departure)",
        travelDate: cleanTravelDate,
        travellers: count,
        pickupPoint: String(pickupPoint),
        customPickupRequest: cleanCustomPickup,
        amountPerPerson: 699,
        discountApplied,
        totalAmount,
        notes: cleanNotes,
        message: cleanNotes,
        status: "NEW",
      },
    });

    console.log("[BharatVista Enquiry] Successfully persisted to Neon DB:", {
      id: record.id,
      bookingId: record.bookingId,
      name: record.name,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry successfully registered.",
        booking: {
          id: record.id,
          bookingId: record.bookingId || record.id,
          name: record.name,
          mobile: record.phone,
          email: record.email || undefined,
          travellers: record.travellers,
          pickupPoint: record.pickupPoint || "vijay-nagar",
          customPickupRequest: record.customPickupRequest || undefined,
          travelDate: record.travelDate,
          notes: record.notes || undefined,
          status: record.status,
          amountPerPerson: record.amountPerPerson || 699,
          discountApplied: record.discountApplied || 0,
          totalAmount: record.totalAmount || totalAmount,
          createdAt: record.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BharatVista Booking API Error]:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing reservation." },
      { status: 500 }
    );
  }
}
