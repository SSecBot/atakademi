import { NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function GET() {
  try {
    const stats = ataRepository.getStatistics();
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "İstatistikler getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
