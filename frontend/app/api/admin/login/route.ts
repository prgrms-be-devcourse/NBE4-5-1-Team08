import { NextResponse } from "next/server";
import { generateToken } from "@/utils/jwt";

export async function POST(req: Request) {
  const { adminId, password } = await req.json();

  const adminUser = process.env.ADMIN_ID;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminId === adminUser && password === adminPassword) {
    const token = generateToken(adminId);

    const response = NextResponse.json({
      success: true,
      message: "로그인 성공",
    });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "아이디 또는 비밀번호가 틀렸습니다." },
    { status: 401 }
  );
}
