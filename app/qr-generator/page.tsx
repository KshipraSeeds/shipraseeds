"use client";

import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import QRCode from "qrcode";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

const BASE_URL = "https://shipraseeds.com";

/* ---------------- HELPERS ---------------- */

function calculateBags(qtl: number, packKg: number) {
  return Math.round((qtl * 100) / packKg);
}

/* ---------------- PAGE ---------------- */

export default function AdminLotQRPage() {
  const [selectedYear, setSelectedYear] = useState("");
  const [filterYear, setFilterYear] = useState("All");
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchLots();
  }, []);

  async function fetchLots() {
    const snap = await getDocs(collection(db, "lots"));
    setLots(snap.docs.map((d) => d.data()));
  }

  async function deleteYearData() {
    if (!selectedYear) return alert("Select year first");
    if (!confirm(`Delete all LOTs for ${selectedYear}?`)) return;

    setLoading(true);

    const q = query(collection(db, "lots"), where("year", "==", selectedYear));
    const snap = await getDocs(q);

    for (const d of snap.docs) {
      await deleteDoc(d.ref);
    }

    await fetchLots();
    setLoading(false);
    setStatus(`🗑️ ${selectedYear} data deleted`);
  }

  /* ---------------- EXCEL UPLOAD ---------------- */

  async function handleExcelUpload(e: any) {
    const file = e.target.files?.[0];
    if (!file || !selectedYear) return;

    setLoading(true);
    setStatus("Processing Excel…");

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    console.log("payload", sheet);

   

    const raw: any[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
    });

    // ⛔ adjust if Excel has more header rows
    const dataRows = raw.slice(1);
console.log(dataRows)
    for (const row of dataRows) {
      if (!row[2]) continue; 
      if (!row[9]) continue; 
      const excel = {
        CROP: String(row[0]).trim(),
        VARIETY: String(row[1]).trim(),
        "LOT NO": String(row[2]).trim(),

        TAG_START: String(row[3]).trim(),
        TAG_END: String(row[4]).trim(),

        "CLASS OF SEEDS": String(row[5]).trim(),
        SPA: String(row[6]).trim(),

        "GROWER NAME": String(row[7]).trim(),
        "GROWER ADDRESS": String(row[8]).trim(),

        PROCESSED_PLANT_NAME: String(row[9]).trim(), // J
        "PROCESSED_PLANT_CODE": String(row[10]).trim(), // K
        "PROCESSED_PLANT_ADDRESS": String(row[11]).trim(), // L

        "PROCESSED_QUANTITY_TAKEN": Number(row[12]) || 0, // M
        "PROCESSED_QUANTITY_PROCESSED": Number(row[13]) || 0, // N
        "PROCESSED_REJECTION_PERCENT": Number(row[14]) || 0,
      
     Lab_Name: String(row[15]).trim(), // J
        "Lab Report": String(row[16]).trim(), // K
        "Pure Matter": String(row[17]).trim(), // L

        "Inert Matter": Number(row[18]) || 0, // M
        "Weed Seeds": Number(row[19]) || 0, // N
        "Total WS per kg": Number(row[20]) || 0,
    };

      await upsertLot(excel);
    }

    await fetchLots();
    setLoading(false);
    setStatus("✅ Upload completed");
    e.target.value = "";
  }


  async function upsertLot(row: any) {
    const lotId = String(row["LOT NO"]).trim();
    if (!lotId) return;

    const docId = `${selectedYear}_${lotId}`;
    const ref = doc(db, "lots", docId);

    const crop = String(row["CROP"] || "").toLowerCase();

    const payload = {
      docId,
      year: selectedYear,
      lotId,
      crop,

      excel: row,

      derived: {
        finalBags: 0,
      },

      updatedAt: serverTimestamp(),
    };

    const snap = await getDoc(ref);

    // if (snap.exists()) {
    //   await updateDoc(ref, payload);
    // } else {
    //   const cropSlug = crop.replace(/\s+/g, "-");
    //   const qrUrl = `${BASE_URL}/tag/${selectedYear}/${cropSlug}/${lotId}`;
    //   const qrImage = await QRCode.toDataURL(qrUrl);

    //   await setDoc(ref, {
    //     ...payload,
    //     qrUrl,
    //     qrImage,
    //     createdAt: serverTimestamp(),
    //   });
    // }

    if (snap.exists()) {
  await setDoc(ref, payload, { merge: true });
} else {
  const cropSlug = crop.replace(/\s+/g, "-");
  const qrUrl = `${BASE_URL}/tag/${selectedYear}/${cropSlug}/${lotId}`;
  const qrImage = await QRCode.toDataURL(qrUrl);

  await setDoc(ref, {
    ...payload,
    qrUrl,
    qrImage,
    createdAt: serverTimestamp(),
  });
}

  }

  /* ---------------- UI DATA ---------------- */

  const years = useMemo(
    () => Array.from(new Set(lots.map((l) => l.year))).sort(),
    [lots]
  );

  const visibleLots =
    filterYear === "All" ? lots : lots.filter((l) => l.year === filterYear);

  /* ---------------- UI ---------------- */

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 md:p-8">
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-700">Processing…</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Admin – LOT QR Control Panel</h1>

        {/* YEAR CONTROLS */}
        <div className="bg-white p-5 rounded-xl shadow flex gap-4 flex-wrap items-end">
          <div>
            <label className="text-sm font-medium">Select Year *</label>
            <input
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              placeholder="2025"
              className="mt-1 w-32 border rounded-lg px-3 py-2"
            />
          </div>

          <button
            onClick={deleteYearData}
            disabled={!selectedYear}
            className="bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg"
          >
            Delete Year
          </button>

          <input
            type="file"
            accept=".xlsx,.xls"
            disabled={!selectedYear}
            onChange={handleExcelUpload}
            className="ml-auto text-sm"
          />
        </div>

        {status && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm">
            {status}
          </div>
        )}

        {/* FILTER */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">Filter by year</span>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="All">All</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">LOT</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">Crop</th>
                <th className="p-3 text-left">Bags</th>
                <th className="p-3 text-left">QR</th>
              </tr>
            </thead>
            <tbody>
              {visibleLots.map((lot) => (
                <tr key={lot.docId} className="border-t">
                  <td className="p-3 font-medium">{lot.lotId}</td>
                  <td className="p-3">{lot.year}</td>
                  <td className="p-3">{lot.crop}</td>
                  <td className="p-3">{lot.derived?.finalBags}</td>
                  <td className="p-3">
                    <a
                      href={lot.qrImage}
                      download={`${lot.docId}.png`}
                      className="text-blue-600 underline"
                    >
                      Download QR
                    </a>
                  </td>
                </tr>
              ))}

              {!visibleLots.length && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
