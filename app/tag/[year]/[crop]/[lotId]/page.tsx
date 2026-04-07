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

  const cropImages = {
  paddy: "/bagPics/paddy/5 KG PADDY-20250519T122829Z-1-001/5 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (5).png",
  wheat: "/bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/Render_Mockup_1080_1920_2025-05-15 (1).png",
  sorghum: "/bagPics/jowar/Jowar-20250519T122831Z-1-001/Jowar/SS-17.jpg",
};

  async function fetchLot() {
    try {
      const decodedLotId = decodeURIComponent(lotId);
      //const docId = `${year}_${lotId}`;
      const docId = `${year}_${decodedLotId}`;
      const ref = doc(db, "lots", docId);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setError("Invalid or expired QR");
        return;
      }

      const docData = snap.data();
      const excel = docData.excel || {};
      const derived = docData.derived || {};

      setData({
        variety: excel["VARIETY"],
        class: excel["CLASS OF SEEDS"],
        spa: excel["SPA"],
        tags: derived.finalBags,

        grower: {
          name: excel["GROWER NAME"],
          village: excel["GROWER ADDRESS"],
        },

        testResults: {
          labName: excel["Lab_Name"],
          labReport: excel["Lab Report"],
          pureSeed: excel["Pure Matter"],
          inertMatter: excel["Inert Matter"],
          weedSeed: excel["Weed Seeds"],
          totalWSPERKG: excel["Total WS per kg"],
            otherCropSeeds: excel["Other Crop Seeds"],
  germination: excel["Germination"],
  deadSeeds: excel["Dead Seeds"],
  abnormalSeeds: excel["Abnormal Seeds"],
        },

        processedBy: {
          Name: excel["PROCESSED_PLANT_NAME"],
          Code: excel["PROCESSED_PLANT_CODE"],
          address: excel["PROCESSED_PLANT_ADDRESS"],
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

  /* ---------------- HELPERS ---------------- */

  function hasValue(value: any) {
    if (value === null || value === undefined) return false;

    // Empty string
    if (typeof value === "string" && value.trim() === "") return false;

    // Number 0
    if (typeof value === "number" && value === 0) return false;

    // String numeric zero like "0", "0.00", "0%"
    if (typeof value === "string") {
      const cleaned = value.replace(/[%\s]/g, "");
      if (!isNaN(Number(cleaned)) && Number(cleaned) === 0) return false;
    }

    return true;
  }

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

  /* ---------------- FIELD ARRAYS ---------------- */

  const summaryFields = [
    { label: "Lot Number", value: decodeURIComponent(lotId) },
    // { label: "Total Tags", value: data.tags },
    { label: "Class of Seed", value: data.class },
     { label: "Pure Seeds", value: `${test.pureSeed * 100}%` },
     { label: "Germination", value: `${test.germination}%` },
    { label: "SPA", value: data.spa },
  ].filter((f) => hasValue(f.value));

  const growerFields = [
    { label: "Grower Name", value: maskWithStars(grower.name) },
    { label: "Address", value: maskWithStars(grower.village) },
  ].filter((f) => hasValue(f.value));

  const processedFields = [
    { label: "Plant Name", value: processed.Name },
    { label: "Plant Code", value: processed.Code },
    { label: "Plant Address", value: processed.address },
    { label: "Quantity Taken", value: processed.quantity_taken },
    { label: "Quantity Processed", value: processed.processedQuantity },
    {
      label: "Rejection %",
      value:
        typeof processed.rejection_percentage === "number"
          ? (processed.rejection_percentage * 100).toFixed(2)
          : processed.rejection_percentage,
    },
  ].filter((f) => hasValue(f.value));

  const testReportFields = [
    { label: "Lab Name", value: test.labName },
    { label: "Lab Report No", value: test.labReport },
    { label: "Pure Seeds", value: `${test.pureSeed * 100}%` },
    { label: "Inert Matter", value: test.inertMatter },
    { label: "Weed Seeds", value: test.weedSeed },
    { label: "Total WS Per Kg", value: test.totalWSPERKG },
  { label: "Other Crop Seeds", value: `${test.otherCropSeeds}%` },
{ label: "Germination", value: `${test.germination}%` },
{ label: "Dead Seeds", value: `${test.deadSeeds}%` },
{ label: "Abnormal Seeds", value: `${test.abnormalSeeds}%` },


  ].filter((f) => hasValue(f.value));

  /* ---------------- UI ---------------- */
const filteredFields = testReportFields.filter(
  (field) =>
    field.value !== undefined &&
    field.value !== null &&
    field.value !== "undefined%" &&
    field.value !== ""
);
  return (
    <div className="min-h-screen bg-[#F6F7F9] px-4 py-6 sm:px-6 md:px-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-6 mb-8">
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
            src={cropImages[crop] ||"/bagPics/jowar/Jowar-20250519T122831Z-1-001/Jowar/SS-17.jpg"}
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

      {summaryFields.length > 0 && (
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {summaryFields.map((field, i) => (
      <SummaryField
        key={i}
        label={field.label}
        value={field.value}
        index={i}   // ✅ add this
      />
    ))}
  </div>
)}
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {growerFields.length > 0 && (
          <ExpandableCard title="Grower Details">
            {growerFields.map((field, i) => (
              <Detail key={i} label={field.label} value={field.value} />
            ))}
          </ExpandableCard>
        )}

        {processedFields.length > 0 && (
          <ExpandableCard title="Processed By">
            {processedFields.map((field, i) => (
              <Detail key={i} label={field.label} value={field.value} />
            ))}
          </ExpandableCard>
        )}

        {filteredFields.length > 0 && (
          <ExpandableCard title="Complete Test Report">
            {filteredFields.map((field, i) => (
              <Detail key={i} label={field.label} value={field.value} />
            ))}
          </ExpandableCard>
        )}
      </div>

      <p className="text-center text-gray-400 mt-10 text-sm">
        Shipra Seeds • Certified & Verified Product
      </p>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function SummaryField({ label, value, index }) {
  const styles = [
    "from-blue-100/60 to-blue-50/40 text-blue-900 border-blue-200/60",
    "from-emerald-100/60 to-emerald-50/40 text-emerald-900 border-emerald-200/60",
    "from-violet-100/60 to-violet-50/40 text-violet-900 border-violet-200/60",
    "from-orange-100/60 to-orange-50/40 text-orange-900 border-orange-200/60",
    "from-pink-100/60 to-pink-50/40 text-pink-900 border-pink-200/60",
  ];

  const color = styles[index % styles.length];

  return (
    <div
      className={`relative p-3.5 rounded-xl 
      bg-gradient-to-br ${color}
      backdrop-blur-md border
      hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
      transition duration-300 hover:-translate-y-1`}
    >
      {/* Label */}
      <p className="text-[11px] italic tracking-wide opacity-70 mb-0.5">
        {label}
      </p>

      {/* Value */}
      <p className="text-lg font-semibold tracking-tight leading-tight">
        {value}
      </p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="p-4 border rounded-xl">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
