import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const review = ataRepository.getReviewById(params.id);
    if (!review) {
      return NextResponse.json(
        { success: false, error: "Yorum bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Yorum getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = ataRepository.updateReview(params.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Güncellenecek yorum bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Yorum güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const soft = searchParams.get("soft") === "true";
    const success = ataRepository.deleteReview(params.id, !soft);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Silinecek yorum bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Yorum başarıyla silindi.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Yorum silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
