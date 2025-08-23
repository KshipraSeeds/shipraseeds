import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "formSubmissions")); // adjust collection name
    const customers = snapshot.docs.map(doc => doc.data());

    return NextResponse.json({ customers });
  } catch (error) {
    console.error("Firebase fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
