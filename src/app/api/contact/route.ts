import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.fullName || !body.phone || !body.message) {
      return NextResponse.json(
        { success: false, error: "Ad Soyad, Telefon ve Mesaj alanları zorunludur." },
        { status: 400 }
      );
    }
    const message = ataRepository.createContactMessage({
      fullName: body.fullName,
      email: body.email || "",
      phone: body.phone,
      courseInterest: body.courseInterest || "Genel Bilgi",
      message: body.message,
    });
    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.",
      data: message,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Mesaj gönderilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = ataRepository.getAllMessages();
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Mesajlar getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
