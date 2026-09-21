import { NextResponse } from "next/server";

interface BookingRecord {
  bookingId: string;
  name: string;
  mobile: string;
  email?: string;
  travellers: number;
  pickupPoint: string;
  customPickupRequest?: string;
  travelDate: string;
  notes?: string;
  status: "ENQUIRY_CONFIRMED";
  amountPerPerson: number;
  discountApplied: number;
  totalAmount: number;
  createdAt: string;
}

const bookingsStore: BookingRecord[] = [];

export async function GET() {
  return NextResponse.json({
    totalBookings: bookingsStore.length,
    bookings: bookingsStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile, email, travellers = 1, pickupPoint, travelDate } = body;
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

    // Validate essential fields
    if (!name || !mobile || !email) {
    // Mobile is strictly REQUIRED; Name is required; Email is OPTIONAL
    if (!mobile || !String(mobile).trim()) {
      return NextResponse.json(
        { error: "Name, mobile number, and email are required." },
        { error: "Mobile number is required so our team can reach you on WhatsApp/call." },
        { status: 400 }
      );
    }

    // Clean, structured booking reference
    if (!name || !String(name).trim()) {
      return NextResponse.json(
        { error: "Please provide your full name." },
        { status: 400 }
      );
    }

    const count = Number(travellers || seats) || 1;
    const bookingId = `BV-${Date.now().toString().slice(-6)}`;
    const timestamp = new Date().toISOString();

    const bookingRecord = {
    // 20% discount for 4 or more travellers
    const baseTotal = count * 699;
    const discountApplied = count >= 4 ? Math.round(baseTotal * 0.2) : 0;
    const totalAmount = baseTotal - discountApplied;

    const record: BookingRecord = {
      bookingId,
      name: String(name).trim(),
      mobile: String(mobile).trim(),
      email: String(email).trim().toLowerCase(),
      travellers: Number(travellers) || 1,
      pickupPoint: pickupPoint || "vijay-nagar",
      travelDate: travelDate || "2026-10-04",
      status: "CONFIRMED",
      amountPerPerson: 700,
      totalAmount: (Number(travellers) || 1) * 700,
      email: email ? String(email).trim().toLowerCase() : undefined,
      travellers: count,
      pickupPoint: String(pickupPoint),
      customPickupRequest: customPickupRequest ? String(customPickupRequest).trim() : undefined,
      travelDate: travelDate || tripDate || "Upcoming Weekend",
      notes: notes ? String(notes).trim() : undefined,
      status: "ENQUIRY_CONFIRMED",
      amountPerPerson: 699,
      discountApplied,
      totalAmount,
      createdAt: timestamp,
      qualifiesForExclusiveGift: true, // First 5 customers campaign
    };

    console.log("[BharatVista Booking API] New seat booking registered:", bookingRecord);
    bookingsStore.push(record);
    console.log("[BharatVista Enquiry] Successfully registered:", record);

    return NextResponse.json(
      {
        success: true,
        message: "Seat reservation confirmed successfully.",
        booking: bookingRecord,
        message: "Enquiry successfully registered.",
        booking: record,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BharatVista Booking API] Error processing reservation:", error);
    console.error("[BharatVista Booking API Error]:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing reservation." },
      { status: 500 }
    );
  }
}

