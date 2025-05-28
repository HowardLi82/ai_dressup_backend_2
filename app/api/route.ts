import { NextResponse } from "next/server";

const allowedOrigin = "https://ai-weather-dress-up.vercel.app"; // ✅ 指定前端網址
const cloudnary_id = process.env.CLOUDINARY_ID; 

export async function GET() {
  return NextResponse.json({ message: "API 正常運行！" });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  try {
    const message = await req.json(); // ✅ 確保解析 JSON 正確
    console.log("收到前端資料：", message);

    const imgurl = message.url;


    const formData = new FormData();
    formData.append('file', imgurl);
    formData.append('upload_preset', 'ai_dressUp');

    const postToCloudinary = await fetch (
    `https://api.cloudinary.com/v1_1/${cloudnary_id}/image/upload`,
    {
      method: "POST",
      body: formData,
    }).then(r => r.json());

    return new NextResponse(
      JSON.stringify({ "body": postToCloudinary }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("API 錯誤：", error);
    return new NextResponse(
      JSON.stringify({ error: "伺服器錯誤，請檢查 API 設定" }),
      { status: 500 }
    );
  }
}