import { NextResponse } from "next/server";

const allowedOrigin = "http://localhost:5173"; // ✅ 指定前端網址
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
      "Access-Control-Allow-Headers": "Content-Type",
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













// import type { NextApiRequest, NextApiResponse } from "next";
// import { createRouter } from "next-connect";
// import cors from "cors";
// import { NextResponse } from "next/server";

// export async function GET() {
//     const headers = new Headers();
//     headers.set("Access-Control-Allow-Origin", "*"); // 允許所有來源
//     headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // 允許的方法
//     headers.set("Access-Control-Allow-Headers", "Content-Type");
    
//     return new NextResponse(JSON.stringify({ message: "API 正常運行！" }), {
//     status: 200,
//     headers,
//   });

// }


// // const cloudnary_id = process.env.CLOUDINARY_ID;。。
// const handler = createRouter<NextApiRequest, NextApiResponse>();
// handler.use(cors());

// // 啟用 CORS，允許前端發送請求
// handler.use(
//   cors({
//     origin: "http://localhost:5173", // 設定允許的前端來源
//     methods: ["GET", "POST"], // 允許的 HTTP 方法
//   })
// );

// handler.post(async (req, res) => {
//   const message = req.body; // ✅ 解析前端傳來的資料
//   console.log("收到前端資料：", message);

//   res.status(200).json({ status: "成功", message });
// });












//  const imgurl = req.body.url;

//   try {

//   const formData = new FormData();
//   formData.append('file', imgurl);
//   formData.append('upload_preset', 'ai_dressUp');

  // const postToCloudinary = await fetch (
  //   `https://api.cloudinary.com/v1_1/${cloudnary_id}/image/upload`,
  //   {
  //     method: "POST",
  //     body: formData,
  //   }).then(r => r.json());

  // // return console.log('data', postToCloudinary);
  //   return res.status(200).json({ "body": postToCloudinary });

    
//     // const result = postToCloudinary.json();

//     // if (!postToCloudinary.ok) {
//     //   console.error("Imgur 錯誤：", result);
//     //   return res.status(500).json({ error: "Imgur upload failed",postToCloudinary });
//     // }

//     // return res.status(200).json({ link: result });
//   } catch (err: any) {
//     console.error("錯誤：", err.message);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }