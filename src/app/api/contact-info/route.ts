import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const contactInfo = ataRepository.getContactInfo();
    return NextResponse.json({ success: true, data: contactInfo });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "İletişim bilgileri getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = ataRepository.updateContactInfo(body);
    return NextResponse.json({
      success: true,
      message: "İletişim ve konum bilgileri başarıyla güncellendi.",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "İletişim bilgileri güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
