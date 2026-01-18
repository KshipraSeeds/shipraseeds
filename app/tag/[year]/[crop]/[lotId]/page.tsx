"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import ExpandableCard from "@/components/ExpandableCard";
import Image from "next/image";
/* ---------------- PAGE ---------------- */

export default function Page({ params }) {
  const { year, crop, lotId } = params;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLot();
  }, [year, lotId]);

  async function fetchLot() {
    try {
      const docId = `${year}_${lotId}`;
      const ref = doc(db, "lots", docId);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setError("Invalid or expired QR");
        return;
      }

      const docData = snap.data();
      const excel = docData.excel || {};
      const derived = docData.derived || {};

      /* 🔁 FIREBASE → UI MAPPING (FIXED) */
      setData({
        productImage: "/seedbag.jpg",

        variety: excel["VARIETY"],
        class: excel["CLASS OF SEEDS"],
        spa: excel["SPA"],
        tags: `${derived.finalBags || 0} Bags`,

        grower: {
          name: excel["GROWER NAME"],
          village: excel["GROWER ADDRESS"],
          contact: "",
          totalQty: "",
          processedQty: "",
        },

        testResults: {
          labName: excel["Lab_Name"],
          labReport: excel["Lab Report"],
          pureSeed: excel["Pure Matter"],
          inertMatter: excel["Inert Matter"],
          weedSeed: excel["Weed Seeds"],
          totalWSPERKG: excel["Total WS per kg"],
        },

        processedBy: {
          Name: excel["PROCESSED_PLANT_NAME"],
          Code: excel["PROCESSED_PLANT_CODE"],
          address: excel["PROCESSED_PLANT_ADDRESS"],
          date: docData.createdAt?.toDate?.().toLocaleDateString(),
          quantity_taken: excel["PROCESSED_QUANTITY_TAKEN"],
          processedQuantity: excel["PROCESSED_QUANTITY_PROCESSED"],
          rejection_percentage: excel["PROCESSED_REJECTION_PERCENT"],
        },
      });
    } catch (e) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  const grower = data.grower;
  const test = data.testResults;
  const processed = data.processedBy;

  function maskWithStars(text = "") {
    return text
      .split(" ")
      .map((word) => {
        let result = "";
        let alphaIndex = 0;
        const letters = word.replace(/[^a-zA-Z]/g, "");

        for (let i = 0; i < word.length; i++) {
          const ch = word[i];
          if (!/[a-zA-Z]/.test(ch)) {
            result += ch;
            continue;
          }

          if (alphaIndex === 0 || alphaIndex === letters.length - 1) {
            result += ch;
          } else {
            result += alphaIndex % 2 === 1 ? "*" : ch;
          }
          alphaIndex++;
        }
        return result;
      })
      .join(" ");
  }

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="min-h-screen bg-[#F6F7F9] px-4 py-6 sm:px-6 md:px-10">
      {/* PRODUCT HERO */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-5 sm:p-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
            ✔ Verified Product
          </span>
          <span className="text-xs text-gray-500">
            Scan Date: {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-center mt-4">
          <Image
            src={"/bagPics/jowar/Jowar-20250519T122831Z-1-001/Jowar/SS-17.jpg"}
            alt="Seed Bag"
            width={100}
            height={100}
            className="rounded-xl object-contain"
            priority
          />
        </div>

        <h1 className="text-3xl font-extrabold text-center mt-3">
          {data.variety}
        </h1>

        <p className="text-center text-gray-500 mt-1 capitalize">
          {crop} • {data.class} Seed • {year}
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SummaryField label="Lot Number" value={lotId} />
          <SummaryField label="Total Tags" value={data.tags} />
          <SummaryField label="Class of Seed" value={data.class} />
          <SummaryField label="SPA" value={data.spa} />
        </div>
      </div>

      {/* TEST RESULTS */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">Quality Check Results</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <BadgeField
            label="Germination"
            value={test.germination}
            color="green"
          />
          <BadgeField label="Moisture" value={test.moisture} color="yellow" />
          <BadgeField label="Dead" value={test.dead} color="red" />
          <BadgeField label="Abnormal" value={test.abnormal} color="orange" />
          <BadgeField label="Disease" value={test.disease} color="purple" />
          <BadgeField label="Lab" value={test.lab} color="blue" />
        </div>
      </div>

      {/* DETAILS */}
      <div className="max-w-3xl mx-auto space-y-6">
        <ExpandableCard title="Grower Details">
          <Detail label="Grower Name" value={maskWithStars(grower.name)} />
          <Detail label="Address" value={maskWithStars(grower.village)} />
          {/* <Detail label="Phone" value={grower.contact} />
          <Detail label="Total Quantity" value={grower.totalQty} />
          <Detail label="Processed Quantity" value={grower.processedQty} /> */}
        </ExpandableCard>

        <ExpandableCard title="Processed By">
          <Detail label="Plant Name" value={processed.Name} />
          <Detail label="Plant Code" value={processed.Code} />
          <Detail label="PLant Address" value={processed.address} />
          <Detail label="Quantity Taken" value={processed.quantity_taken} />
          <Detail
            label="Quantity Processed"
            value={processed.processedQuantity}
          />
          <Detail
            label="Rejection%"
            value={
              typeof processed.rejection_percentage === "number"
                ? (processed.rejection_percentage * 100).toFixed(2)
                : "—"
            }
          />
        </ExpandableCard>

        <ExpandableCard title="Complete Test Report">
          <Detail label="Lab Name" value={test.labName} />
          <Detail label="Lab Report No" value={test.labReport} />
          <Detail label="Pure seeds" value={test.pureSeed} />
          <Detail label="Inert Matter" value={test.inertMatter} />
          <Detail label="Weed Seeds" value={test.weedSeed} />
          <Detail label="Total WS Per Kg" value={test.totalWSPERKG} />
        </ExpandableCard>
      </div>

      <p className="text-center text-gray-400 mt-10 text-sm">
        Shipra Seeds • Certified & Verified Product
      </p>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function SummaryField({ label, value }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border">
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="text-lg font-bold">{value || "—"}</p>
    </div>
  );
}

function BadgeField({ label, value, color }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    orange: "bg-orange-100 text-orange-700",
    purple: "bg-purple-100 text-purple-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <div className={`p-4 rounded-xl ${colors[color]}`}>
      <p className="text-xs uppercase">{label}</p>
      <p className="font-bold">{value || "—"}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="p-4 border rounded-xl">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="font-semibold">{value || "—"}</p>
    </div>
  );
}
