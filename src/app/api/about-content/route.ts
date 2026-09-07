import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const aboutContent = ataRepository.getAboutContent();
    return NextResponse.json({ success: true, data: aboutContent });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Hakkımızda sayfa içerikleri getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = ataRepository.updateAboutContent(body);
    return NextResponse.json({
      success: true,
      message: "Hakkımızda sayfası içerikleri başarıyla güncellendi.",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Hakkımızda sayfası güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = ataRepository.updateAboutContent(body);
    return NextResponse.json({
      success: true,
      message: "Hakkımızda sayfası içerikleri başarıyla güncellendi.",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Hakkımızda sayfası güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
