import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { adminId, password } = await req.json();

  const validAdminId = process.env.ADMIN_ID;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (adminId === validAdminId && password === validPassword) {
    return NextResponse.json({ success: true, message: "로그인 성공" });
  } else {
    return NextResponse.json(
      { success: false, message: "아이디 또는 비밀번호가 틀렸습니다." },
      { status: 401 }
    );
  }
}
