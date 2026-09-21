import { NextResponse } from "next/server";

export interface ReviewRecord {
  id: string;
  name: string;
  rating: number;
  tag?: string;
  comment: string;
  createdAt: string;
}

// Initial state: strictly 0 reviews (NO fake reviews or fake metrics)
const reviewsStore: ReviewRecord[] = [];

export async function GET() {
  return NextResponse.json({
    count: reviewsStore.length,
    reviews: reviewsStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name = "Traveller", rating = 5, tag, comment } = body;

    if (!comment || !String(comment).trim()) {
      return NextResponse.json(
        { error: "Please write a brief comment sharing your experience." },
        { status: 400 }
      );
    }

    const newReview: ReviewRecord = {
      id: `REV-${Date.now().toString().slice(-6)}`,
      name: String(name).trim() || "BharatVista Traveller",
      rating: Math.max(1, Math.min(5, Number(rating) || 5)),
      tag: tag ? String(tag).trim() : undefined,
      comment: String(comment).trim(),
      createdAt: new Date().toISOString(),
    };

    reviewsStore.unshift(newReview);
    console.log("[BharatVista Review API] New review recorded:", newReview);

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your review has been saved.",
        review: newReview,
        totalReviews: reviewsStore.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[BharatVista Review API Error]:", error);
    return NextResponse.json(
      { error: "Failed to submit review." },
      { status: 500 }
    );
  }
}

