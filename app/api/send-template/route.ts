import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const wabaId = process.env.WABA_ID;

    if (!token || !wabaId) {
      return NextResponse.json({ error: "Missing WhatsApp credentials" }, { status: 500 });
    }

    const response = await fetch(
      `https://graph.facebook.com/v22.0/${wabaId}/message_templates`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log(data);

    return NextResponse.json({ templates: data.data || [] });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
  }
}
