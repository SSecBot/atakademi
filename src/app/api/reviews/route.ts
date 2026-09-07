import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const reviews = ataRepository.getAllReviews(all);
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Yorumlar getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.studentName || !body.comment) {
      return NextResponse.json(
        { success: false, error: "Öğrenci adı ve yorum içeriği zorunludur." },
        { status: 400 }
      );
    }
    const newReview = ataRepository.createReview({
      ...body,
      courseTitle: body.courseTitle || "Genel Eğitim",
      rating: body.rating || 5,
      avatar: body.avatar || "/assets/reviews/student-1.webp",
      date: body.date || new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
      isVisible: body.isVisible !== undefined ? body.isVisible : true,
      featured: body.featured !== undefined ? body.featured : false,
    });
    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Yorum eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
