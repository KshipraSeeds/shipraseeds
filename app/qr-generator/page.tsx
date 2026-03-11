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
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

const BASE_URL = "https://shipraseeds.com";
const DEFAULT_PACK_SIZE = 5;

export default function AdminLotQRPage() {
  const [selectedYear, setSelectedYear] = useState("");
  const [filterYear, setFilterYear] = useState("All");
  const [lots, setLots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [includeGrower, setIncludeGrower] = useState(true);

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

    const raw: any[][] = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      defval: "",
    });

    const dataRows = raw.slice(1);

    for (const row of dataRows) {
      if (!row[2] || !row[9]) continue;

      const excel: any = {
        CROP: String(row[1]).trim(),
        VARIETY: String(row[2]).trim(),
        "LOT NO": String(row[3]).trim(),
        //TAG_START: String(row[3]).trim(),
        //TAG_END: String(row[4]).trim(),
        "CLASS OF SEEDS": String(row[4]).trim(),
        SPA: String(row[5]).trim(),
        PROCESSED_PLANT_NAME: String(row[8]).trim(),
        PROCESSED_PLANT_CODE: String(row[9]).trim(),
        PROCESSED_PLANT_ADDRESS: String(row[10]).trim(),
        PROCESSED_QUANTITY_TAKEN: Number(row[11]) || 0,
        PROCESSED_QUANTITY_PROCESSED: Number(row[12]) || 0,
        PROCESSED_REJECTION_PERCENT: Number(row[13]) || 0,
        Lab_Name: String(row[14]).trim(),
        "Lab Report": String(row[15]).trim(),
        "Pure Matter": String(row[16]).trim(),
        "Inert Matter": Number(row[17]) || 0,
        "Weed Seeds": Number(row[18]) || 0,
        "Total WS per kg": Number(row[19]) || 0,
      };

      if (includeGrower) {
        excel["GROWER NAME"] = String(row[6]).trim();
        excel["GROWER ADDRESS"] = String(row[7]).trim();
      }

      await upsertLot(excel);
    }

    await fetchLots();
    setLoading(false);
    setStatus("✅ Upload completed");
    e.target.value = "";
  }

  /* ---------------- UPSERT ---------------- */

  async function upsertLot(row: any) {
    const lotId = String(row["LOT NO"]).trim();
    if (!lotId) return;

    const docId = `${selectedYear}_${lotId}`;
    const ref = doc(db, "lots", docId);

    const crop = String(row["CROP"] || "").toLowerCase();
    const processedQtl =
      Number(row["PROCESSED_QUANTITY_PROCESSED"]) || 0;

    const packSize = DEFAULT_PACK_SIZE;
    const rawBags = (processedQtl * 100) / packSize;
    const finalBags = Math.round(rawBags);

    const payload = {
      docId,
      year: selectedYear,
      lotId,
      crop,
      excel: row,
      packSize,
      derived: { finalBags },
      updatedAt: serverTimestamp(),
    };

    const snap = await getDoc(ref);

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

  /* ---------------- UPDATE PACK SIZE ---------------- */

  async function updatePackSize(lot: any, newPackSize: number) {
    if (!newPackSize || newPackSize <= 0) return;

    const ref = doc(db, "lots", lot.docId);
    const processedQtl =
      Number(lot.excel?.PROCESSED_QUANTITY_PROCESSED) || 0;

    const rawBags = (processedQtl * 100) / newPackSize;
    const finalBags = Math.round(rawBags);

    await setDoc(
      ref,
      {
        packSize: newPackSize,
        derived: { finalBags },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    setLots((prev) =>
      prev.map((l) =>
        l.docId === lot.docId
          ? { ...l, packSize: newPackSize, derived: { finalBags } }
          : l
      )
    );
  }

  /* ---------------- UI DATA ---------------- */

  const years = useMemo(
    () => Array.from(new Set(lots.map((l) => l.year))).sort(),
    [lots]
  );

  const visibleLots =
    filterYear === "All"
      ? lots
      : lots.filter((l) => l.year === filterYear);

  /* ---------------- UI ---------------- */

  return (
    <div className="relative min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur flex items-center justify-center z-50">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Admin – LOT QR Control Panel
        </h1>

        {/* ===== CONTROLS ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

    {/* LEFT SECTION */}
    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-1/2">

      {/* Select Year */}
      <div className="flex flex-col w-full sm:w-56">
        <label className="text-sm font-semibold mb-1">
          Select Year *
        </label>
        <input
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="2025"
          className="h-11 border border-gray-300 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Delete Button */}
      <div className="flex items-end">
        <button
          onClick={deleteYearData}
          disabled={!selectedYear}
          className="h-11 px-6 bg-red-600 disabled:bg-red-300 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
        >
          Delete Year
        </button>
      </div>

    </div>

    {/* RIGHT SECTION */}
    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 w-full lg:w-1/2 lg:justify-end">

      {/* Grower Toggle */}
      <div className="flex items-center gap-3 h-11">
        <span className="text-sm font-semibold">
          Grower
        </span>

        <button
          onClick={() => setIncludeGrower(!includeGrower)}
          className={`h-11 px-5 rounded-lg text-sm font-semibold transition ${
            includeGrower
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {includeGrower ? "YES" : "NO"}
        </button>
      </div>

      {/* Upload Button */}
      <label className="h-11 px-6 flex items-center justify-center bg-blue-600 text-white text-sm font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition w-full sm:w-auto">
        Upload Excel
        <input
          type="file"
          accept=".xlsx,.xls"
          disabled={!selectedYear}
          onChange={handleExcelUpload}
          className="hidden"
        />
      </label>

    </div>
  </div>
</div>


        {/* STATUS */}
        {status && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm">
            {status}
          </div>
        )}

        {/* FILTER */}
        <div>
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

        {/* ===== DESKTOP TABLE ===== */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">LOT</th>
                <th className="p-4">Year</th>
                <th className="p-4">Crop</th>
                <th className="p-4">Pack Size</th>
                <th className="p-4">Bags</th>
                <th className="p-4">QR</th>
              </tr>
            </thead>
            <tbody>
              {visibleLots.map((lot) => (
                <tr key={lot.docId} className="border-t">
                  <td className="p-4">{lot.lotId}</td>
                  <td className="p-4">{lot.year}</td>
                  <td className="p-4 capitalize">{lot.crop}</td>
                  <td className="p-4">
                    <input
                      type="number"
                      defaultValue={lot.packSize || DEFAULT_PACK_SIZE}
                      onBlur={(e) =>
                        updatePackSize(lot, Number(e.target.value))
                      }
                      className="w-20 text-center border rounded-md"
                    />
                  </td>
                  <td className="p-4 text-blue-600 font-semibold">
                    {lot.derived?.finalBags}
                  </td>
                  <td className="p-4">
                    <a
                      href={lot.qrImage}
                      download={`${lot.docId}.png`}
                      className="text-blue-600"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== MOBILE CARDS ===== */}
        <div className="md:hidden space-y-4">
          {visibleLots.map((lot) => (
            <div key={lot.docId} className="bg-white p-4 rounded-xl shadow space-y-2">
              <div className="flex justify-between">
                <span>LOT</span>
                <span>{lot.lotId}</span>
              </div>
              <div className="flex justify-between">
                <span>Year</span>
                <span>{lot.year}</span>
              </div>
              <div className="flex justify-between">
                <span>Crop</span>
                <span>{lot.crop}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pack Size</span>
                <input
                  type="number"
                  defaultValue={lot.packSize || DEFAULT_PACK_SIZE}
                  onBlur={(e) =>
                    updatePackSize(lot, Number(e.target.value))
                  }
                  className="w-20 text-center border rounded-md"
                />
              </div>
              <div className="flex justify-between">
                <span>Bags</span>
                <span className="text-blue-600 font-semibold">
                  {lot.derived?.finalBags}
                </span>
              </div>
              <a
                href={lot.qrImage}
                download={`${lot.docId}.png`}
                className="block text-center bg-blue-600 text-white py-2 rounded-lg"
              >
                Download QR
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

