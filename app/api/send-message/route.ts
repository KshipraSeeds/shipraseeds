import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipients, templateName, language, parameters } = body;

    if (!recipients || recipients.length === 0) {
      return NextResponse.json({ error: "No recipients provided" }, { status: 400 });
    }

    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.PHONE_NUMBER_ID;

    if (!token || !phoneNumberId) {
      return NextResponse.json({ error: "Missing WhatsApp credentials" }, { status: 500 });
    }

    const results = [];

    for (const recipient of recipients) {
      const toNumber = recipient.mobileNumber.replace(/\D/g, "");

      const payload: any = {
        messaging_product: "whatsapp",
        to: toNumber,
        type: "template",
        template: {
          name: templateName, // ✅ Dynamic template name
          language: { code: language || "en_US" },
        },
      };

      // Only include components if parameters are provided
      if (parameters?.length) {
        payload.template.components = [
          { type: "body", parameters },
        ];
      }

      const response = await fetch(
        `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      results.push({
        recipient: recipient.mobileNumber,
        success: response.ok,
        response: data,
      });
    }

    return NextResponse.json({
      successCount: results.filter((r) => r.success).length,
      errorCount: results.filter((r) => !r.success).length,
      results,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
