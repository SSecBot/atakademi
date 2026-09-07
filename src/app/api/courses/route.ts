import { NextRequest, NextResponse } from "next/server";
import { ataRepository } from "@/lib/repository";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const courses = ataRepository.getAllCourses(all);
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Kurslar getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.category) {
      return NextResponse.json(
        { success: false, error: "Kurs başlığı ve kategori zorunludur." },
        { status: 400 }
      );
    }
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newCourse = ataRepository.createCourse({
      ...body,
      slug,
      learningOutcomes: body.learningOutcomes || [],
      modules: body.modules || [],
      isVisible: body.isVisible !== undefined ? body.isVisible : true,
      featured: body.featured !== undefined ? body.featured : false,
    });
    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Kurs oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
