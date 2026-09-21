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
    const timestamp = new Date().toISOString();

    // 20% discount for 4 or more travellers
    const baseTotal = count * 699;
    const discountApplied = count >= 4 ? Math.round(baseTotal * 0.2) : 0;
    const totalAmount = baseTotal - discountApplied;

    const record: BookingRecord = {
      bookingId,
      name: String(name).trim(),
      mobile: String(mobile).trim(),
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
    };

    bookingsStore.push(record);
    console.log("[BharatVista Enquiry] Successfully registered:", record);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry successfully registered.",
        booking: record,
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
