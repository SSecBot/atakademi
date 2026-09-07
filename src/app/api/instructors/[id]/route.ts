import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const instructor = ataRepository.getInstructorById(params.id);
    if (!instructor) {
      return NextResponse.json(
        { success: false, error: "Eğitmen bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: instructor });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Eğitmen getirilirken bir hata oluştu." },
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
    const updated = ataRepository.updateInstructor(params.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Güncellenecek eğitmen bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Eğitmen güncellenirken bir hata oluştu." },
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
    const success = ataRepository.deleteInstructor(params.id, !soft);
    if (!success) {
      return NextResponse.json(
        { success: false, error: "Silinecek eğitmen bulunamadı." },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Eğitmen başarıyla silindi.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Eğitmen silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
