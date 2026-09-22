import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/auth";
import { EnquiryStatus } from "@prisma/client";

const VALID_STATUSES: EnquiryStatus[] = [
  "NEW",
  "CONTACTED",
  "FOLLOW_UP",
  "QUOTATION_SENT",
  "CONFIRMED",
  "CLOSED",
  "CANCELLED",
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSession(sessionToken);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in as administrator." },
        { status: 401 }
      );
    }

    const { id } = await params;

    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
    });

    if (!enquiry) {
      return NextResponse.json(
        { error: "Enquiry record not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      enquiry: {
        ...enquiry,
        createdAt: enquiry.createdAt.toISOString(),
        updatedAt: enquiry.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[BharatVista Enquiry GET Error]:", error);
    return NextResponse.json(
      { error: "Internal server error fetching enquiry details." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifyAdminSession(sessionToken);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Admin session required to update enquiries." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    // Check if record exists
    const existing = await prisma.enquiry.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Enquiry not found." },
        { status: 404 }
      );
    }

    // Validate status if passed
    if (status && !VALID_STATUSES.includes(status as EnquiryStatus)) {
      return NextResponse.json(
        {
          error: `Invalid status '${status}'. Allowed values are: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const updateData: { status?: EnquiryStatus; adminNotes?: string | null } = {};

    if (status) {
      updateData.status = status as EnquiryStatus;
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes ? String(adminNotes).trim() : null;
    }

    const updatedRecord = await prisma.enquiry.update({
      where: { id },
      data: updateData,
    });

    console.log("[BharatVista Enquiry Updated]:", {
      id: updatedRecord.id,
      bookingId: updatedRecord.bookingId,
      status: updatedRecord.status,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry updated successfully.",
      enquiry: {
        ...updatedRecord,
        createdAt: updatedRecord.createdAt.toISOString(),
        updatedAt: updatedRecord.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[BharatVista Enquiry PATCH Error]:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry in database." },
      { status: 500 }
    );
  }
}

