// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST() {
  try {
    const formData = await req.formData();

    const from = formData.get("From");   // farmer WhatsApp number
    const body = formData.get("Body");   // message text
    const to = formData.get("To");       // your Twilio WhatsApp number

    // Save incoming message to Firestore
    await addDoc(collection(db, "messageLogs"), {
      from,
      to,
      body,
      direction: "inbound",
      timestamp: serverTimestamp(),
    });

    // Twilio expects valid XML response
    return new Response("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Failed to handle webhook" }, { status: 500 });
  }
}
