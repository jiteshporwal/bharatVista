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

    // 1. Full name validation (required)
    if (!name || !String(name).trim() || String(name).trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    // 2. Mobile validation (required, Indian mobile number)
    const rawMobile = String(mobile || "").trim();
    const digitsOnly = rawMobile.replace(/[\s\-\(\)\+]/g, "").replace(/^91/, "").replace(/^0/, "");
    const isValidIndianMobile = /^[6-9]\d{9}$/.test(digitsOnly);

    if (!isValidIndianMobile) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit Indian mobile number (e.g. 9876543210)." },
        { status: 400 }
      );
    }

    // 3. Email validation (optional, but validated if provided)
    const cleanEmail = email && String(email).trim() ? String(email).trim().toLowerCase() : null;
    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address (or leave it blank)." },
        { status: 400 }
      );
    }

    // 4. Travellers count validation
    const count = Number(travellers || seats) || 1;
    if (count < 1 || count > 50) {
      return NextResponse.json(
        { error: "Number of travellers must be between 1 and 50." },
        { status: 400 }
      );
    }

    // 5. Travel date & pickup validation
    const cleanTravelDate = String(travelDate || tripDate || "").trim() || "Upcoming Weekend";
    const cleanPickup = String(pickupPoint || "").trim() || "vijay-nagar";

    const bookingId = `BV-${Date.now().toString().slice(-6)}`;

    // 20% discount for 4 or more travellers
    const baseTotal = count * 699;
    const discountApplied = count >= 4 ? Math.round(baseTotal * 0.2) : 0;
    const totalAmount = baseTotal - discountApplied;
    const cleanNotes = notes ? String(notes).trim() : null;
    const cleanCustomPickup = customPickupRequest ? String(customPickupRequest).trim() : null;
    const formattedPhone = rawMobile.startsWith("+91") ? rawMobile : `+91 ${digitsOnly}`;

    // Persist directly into Neon PostgreSQL via Prisma
    const record = await prisma.enquiry.create({
      data: {
        bookingId,
        name: String(name).trim(),
        phone: formattedPhone,
        email: cleanEmail,
        destination: "Maheshwar & Jam Gate (Indore Departure)",
        travelDate: cleanTravelDate,
        travellers: count,
        pickupPoint: cleanPickup,
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
