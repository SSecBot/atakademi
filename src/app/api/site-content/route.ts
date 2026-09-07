import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const homeContent = ataRepository.getHomeContent();
    return NextResponse.json({ success: true, data: homeContent });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Site içerik verileri getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = ataRepository.updateHomeContent(body);
    return NextResponse.json({
      success: true,
      message: "Ana sayfa içerikleri ve site modu başarıyla güncellendi.",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Site içerikleri güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let updated;
    if (body.mode) {
      updated = ataRepository.setSiteMode(body.mode);
    } else {
      updated = ataRepository.toggleSiteMode();
    }
    return NextResponse.json({
      success: true,
      message: `Site modu '${updated.siteMode === "NEW_REGISTRATION" ? "Yeni Dönem Kayıtları" : "Kurslar Başladı"}' olarak güncellendi.`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Site modu değiştirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
