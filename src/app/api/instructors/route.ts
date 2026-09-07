import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const instructors = ataRepository.getAllInstructors(all);
    return NextResponse.json({ success: true, data: instructors });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Eğitmenler getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.title) {
      return NextResponse.json(
        { success: false, error: "Eğitmen adı ve unvanı zorunludur." },
        { status: 400 }
      );
    }
    const newInstructor = ataRepository.createInstructor({
      ...body,
      languages: body.languages || ["İngilizce"],
      isVisible: body.isVisible !== undefined ? body.isVisible : true,
      rating: body.rating || 5.0,
      studentCount: body.studentCount || 0,
      image: body.image || "/assets/instructors/instructor-1.webp",
    });
    return NextResponse.json({ success: true, data: newInstructor }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Eğitmen oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
