import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = ataRepository.deleteMessage(params.id);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Silinecek mesaj bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Mesaj başarıyla silindi.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Mesaj silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
