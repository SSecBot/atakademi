import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const course = ataRepository.getCourseById(params.id);
    if (!course) {
      return NextResponse.json(
        { success: false, error: "Kurs bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Kurs getirilirken bir hata oluştu." },
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
    const updated = ataRepository.updateCourse(params.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Güncellenecek kurs bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Kurs güncellenirken bir hata oluştu." },
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
    const success = ataRepository.deleteCourse(params.id, !soft);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Silinecek kurs bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Kurs başarıyla silindi.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Kurs silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
