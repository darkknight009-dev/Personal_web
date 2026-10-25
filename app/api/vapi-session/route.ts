import { NextResponse } from "next/server";

// Next.js Route Handler for secure Vapi session retrieval
// Keys are read strictly from server-side environment variables (.env.local)
export async function GET() {
  const publicKey = process.env.VAPI_PUBLIC_KEY || process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";
  const assistantId = process.env.VAPI_ASSISTANT_ID || process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || "";

  if (!publicKey || !assistantId) {
    return NextResponse.json(
      {
        configured: false,
        message: "Vapi credentials are not configured in server environment (.env.local).",
      },
      { status: 200 }
    );
  }

  return NextResponse.json({
    configured: true,
    publicKey,
    assistantId,
  });
}
