// app/api/send-whatsapp/route.js
import twilio from "twilio";

export async function POST(req) {
  try {
    console.log("API hit: /api/send-whatsapp");

    // Parse request body
    const { recipients, message } = await req.json();
    console.log("Received body:", { recipients, message });

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return Response.json(
        { success: false, error: "Recipients list is missing or invalid" },
        { status: 400 }
      );
    }

    if (!message) {
      return Response.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    // Check env vars
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER } =
      process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
      return Response.json(
        { success: false, error: "Missing Twilio environment variables" },
        { status: 500 }
      );
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    // Send messages
    const results = [];
    for (const recipient of recipients) {
      try {
        const toNumber = `whatsapp:${recipient.mobileNumber}`; // ✅ Twilio format
        const msg = await client.messages.create({
          body: message,
          from: `${TWILIO_WHATSAPP_NUMBER}`, // ✅ Ensure from is whatsapp:+<your-twilio-sandbox-number>
          to: toNumber,
        });
        results.push({
          to: recipient.mobileNumber,
          sid: msg.sid,
          status: msg.status,
        });
      } catch (err) {
        console.error(`Failed to send to ${recipient.mobileNumber}:`, err);
        results.push({
          to: recipient.mobileNumber,
          error: err.message,
        });
      }
    }

    return Response.json({ success: true, results });
  } catch (err) {
    console.error("Server crash in /send-whatsapp:", err);
    return Response.json(
      { success: false, error: err.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
