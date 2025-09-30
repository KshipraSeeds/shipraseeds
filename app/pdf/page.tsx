"use client";

import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";

export default function PdfUploaderFirestore() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    if (file.size > 1024 * 1024) {
      // 1 MB limit
      return alert("File too large. Max 1 MB allowed.");
    }

    try {
      // Convert file to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result;

        // Save to Firestore
        await addDoc(collection(db, "pdfs"), {
          name: file.name,
          data: base64Data,
          createdAt: Timestamp.now(),
        });

        alert("PDF saved successfully in Firestore!");
      };
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
}
