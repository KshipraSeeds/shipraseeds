"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function WhatsAppDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmers, setSelectedFarmers] = useState([]);
  const [message, setMessage] = useState("");
const [templates, setTemplates] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<{id: string, text: string, language?: string} | null>(null);

console.log(farmers);
  // Fetch farmers from Firebase
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const q = query(collection(db, "FarmerRegistrations"), orderBy("name"));
        const querySnapshot = await getDocs(q);
        const farmersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFarmers(farmersData);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    fetchFarmers();
  }, []);

  // Get unique states from farmers
  const getUniqueStates = () => {
    const statesSet = new Set<string>();
    farmers.forEach((farmer) => {
      if (farmer.state) statesSet.add(farmer.state as string);
    });

    // Convert Set to Array and sort
    return Array.from(statesSet).sort();
  };

  const uniqueStates = getUniqueStates();

  // Filter farmers based on search term and state filter
  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch =
      farmer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.mobileNumber?.includes(searchTerm);
    const matchesState = !selectedState || farmer.state === selectedState;

    return matchesSearch && matchesState;
  });

  const toggleFarmerSelection = (farmerId) => {
    if (selectedFarmers.includes(farmerId)) {
      setSelectedFarmers(selectedFarmers.filter((id) => id !== farmerId));
    } else {
      setSelectedFarmers([...selectedFarmers, farmerId]);
    }
  };

  const selectAllFarmers = () => {
    if (selectedFarmers.length === filteredFarmers.length) {
      setSelectedFarmers([]);
    } else {
      setSelectedFarmers(filteredFarmers.map((farmer) => farmer.id));
    }
  };

const applyTemplate = (template) => {
  setSelectedTemplate(template); // store selected template
  setMessage(template.text);     // populate textarea
};

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  

  const formatPhoneNumber = (num: string) => {
  // Remove spaces, dashes, etc.
  let clean = num.replace(/\D/g, "");

  // If number doesn’t start with country code, add +91 (India default here)
  if (!clean.startsWith("91")) {
    clean = "91" + clean;
  }

  return `+${clean}`;
};

   const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.PHONE_NUMBER_ID;



useEffect(() => {
  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/send-template");
      const data = await res.json();

      // Map Meta templates to a simple format for UI
      const mappedTemplates = (data.templates || []).map((template) => ({
        id: template.id,
        name: template.name,
        text: template.components.find((c) => c.type === "BODY")?.text || "",
        language: template.language,
      }));

      setTemplates(mappedTemplates);
      console.log("Fetched templates:", mappedTemplates);
    } catch (err) {
      console.error("Error fetching templates:", err);
    }
  };

  fetchTemplates();
}, []);


// const sendMessages = async () => {
//   if (selectedFarmers.length === 0) {
//     setSendStatus("Please select at least one farmer");
//     return;
//   }

//   setIsSending(true);
//   setSendStatus("Sending...");

//   try {
//     // Format selected farmers
//     const recipients = farmers
//       .filter((farmer) => selectedFarmers.includes(farmer.id))
//       .map((farmer) => ({
//         ...farmer,
//         mobileNumber: formatPhoneNumber(farmer.mobileNumber), // digits only, intl format
//       }));

//     const results: Array<{ number: string; status: string; error?: string }> = [];

//     // Send template message to each farmer
//     for (const recipient of recipients) {
//       try {
//         const response = await fetch("/api/send-message", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             recipients: [
//               {
//                 ...recipient,
//               },
//             ],
//             templateName: selectedTemplate?.id, // ← your approved template
//             timestamp: new Date().toISOString(),
//           }),
//         });

//         const data = await response.json().catch(() => ({ error: "Invalid JSON response" }));

//         if (response.ok && !data.error) {
//           results.push({ number: recipient.mobileNumber, status: "success" });
//         } else {
//           results.push({ number: recipient.mobileNumber, status: "failed", error: data.error });
//         }
//       } catch (err: any) {
//         results.push({ number: recipient.mobileNumber, status: "failed", error: err.message });
//       }
//     }

//     // Count successes and failures
//     const successCount = results.filter((r) => r.status === "success").length;
//     const errorCount = results.filter((r) => r.status === "failed").length;

//     // Update status in UI
//     setSendStatus(`Sent ${successCount} messages, ${errorCount} failed`);

//     // Log to Firestore
//     await addDoc(collection(db, "messageLogs"), {
//       recipients: selectedFarmers,
//       templateName: "hello_world",
//       timestamp: serverTimestamp(),
//       results,
//     });

//     setSelectedFarmers([]);
//     setMessage("");
//   } catch (error) {
//     console.error("Error sending messages:", error);
//     setSendStatus("Failed to send messages. Please try again.");
//   } finally {
//     setIsSending(false);
//   }
// };



// async function sendMessages(recipients, message) {
//   const results = [];

//   for (const number of recipients) {
//     try {
//       const response = await fetch(`https://graph.facebook.com/v17.0/${phoneNumberId}/messages`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           messaging_product: "whatsapp",
//           to: number,
//           text: { body: message },
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Sandbox special: Meta returns a "messages" array with message IDs
//         if (data.messages && data.messages.length > 0) {
//           results.push({ number, status: "success", messageId: data.messages[0].id });
//         } else {
//           results.push({ number, status: "failed", error: "No message ID returned" });
//         }
//       } else {
//         // If API returns an error
//         results.push({ number, status: "failed", error: data.error || "Unknown error" });
//       }
//     } catch (err) {
//       results.push({ number, status: "failed", error: err.message });
//     }
//   }

//   // Return results array so your UI can display success/fail for each number
//   return results;
// }

// const sendMessages = async () => {
//   if (!selectedTemplate) {
//     setSendStatus("Please select a template first");
//     return;
//   }

//   if (selectedFarmers.length === 0) {
//     setSendStatus("Please select at least one farmer");
//     return;
//   }

//   setIsSending(true);
//   setSendStatus("Sending...");

//   try {
//     const recipients = farmers
//       .filter((farmer) => selectedFarmers.includes(farmer.id))
//       .map((farmer) => ({
//         ...farmer,
//         mobileNumber: formatPhoneNumber(farmer.mobileNumber),
//       }));

//     const results = [];

//     for (const recipient of recipients) {
//       // 🟢 Build dynamic parameters from placeholders in template text
//       const placeholderMatches = selectedTemplate.text.match(/{{\d+}}/g) || [];
//       const parameters = placeholderMatches.map((match, i) => {
//         if (i === 0) return { type: "text", text: recipient.name || "Farmer" };
//         return { type: "text", text: "N/A" }; // fallback for other placeholders
//       });

//       const response = await fetch("/api/send-message", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           recipients: [recipient],
//           templateName: selectedTemplate.id,
//           language: selectedTemplate.language,
//           parameters,
//         }),
//       });

//       const data = await response.json();

//       results.push({
//         number: recipient.mobileNumber,
//         status: response.ok ? "success" : "failed",
//         error: data.error,
//       });
//     }

//     const successCount = results.filter((r) => r.status === "success").length;
//     const errorCount = results.filter((r) => r.status === "failed").length;
//     setSendStatus(`Sent ${successCount} messages, ${errorCount} failed`);
//   } catch (error) {
//     console.error("Error sending messages:", error);
//     setSendStatus("Failed to send messages. Please try again.");
//   } finally {
//     setIsSending(false);
//   }
// };

const sendMessages = async () => {
  if (!selectedTemplate) {
    setSendStatus("Please select a template first");
    return;
  }

  if (selectedFarmers.length === 0) {
    setSendStatus("Please select at least one farmer");
    return;
  }

  setIsSending(true);
  setSendStatus("Sending...");

  try {
    const recipients = farmers
      .filter((farmer) => selectedFarmers.includes(farmer.id))
      .map((farmer) => ({
        ...farmer,
        mobileNumber: formatPhoneNumber(farmer.mobileNumber),
      }));

    const results = [];


    for (const recipient of recipients) {
      // Build dynamic parameters from placeholders in template text
      const placeholderMatches = selectedTemplate.text.match(/{{\d+}}/g) || [];
      const parameters = placeholderMatches.map((match, i) => {
        if (i === 0) return { type: "text", text: recipient.name || "Farmer" };
        if (i === 1) return { type: "text", text: recipient.district + ", " + recipient.state};

        return { type: "text", text: "N/A" };
      });

      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: [recipient],
          templateName: selectedTemplate.id,
          language: selectedTemplate.language,
          parameters,
        }),
      });

      const data = await response.json();

      results.push({
        number: recipient.mobileNumber,
        status: response.ok ? "success" : "failed",
        error: data.error,
      });
    }

    const successCount = results.filter((r) => r.status === "success").length;
    const errorCount = results.filter((r) => r.status === "failed").length;

    if (errorCount > 0) {
      // Show popup if there are errors
      alert(`❌ ${errorCount} message(s) failed. Please check console for details.`);
      console.error("Failed messages:", results.filter((r) => r.status === "failed"));
    }

    setSendStatus(`✅ Sent ${successCount} messages, ${errorCount} failed`);

    // ✅ Reset everything only if all succeeded
    if (successCount > 0 && errorCount === 0) {
      setSelectedFarmers([]);
      setSelectedTemplate(null);
      setMessage("");
      setSearchTerm("");
      setSelectedState("");
    }
  } catch (error) {
    console.error("Error sending messages:", error);
    alert("❌ Failed to send messages. Please check your network or try again.");
    setSendStatus("Failed to send messages.");
  } finally {
    setIsSending(false);
  }
};


  return (
    <div className="min-h-screen m-4 mt-24">
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Send WhatsApp messages to farmers" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 bg-green-600 text-white">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-1">Send messages to registered farmers</p>
          </div>

          

          <div className="p-6">
            {/* Farmer Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Select Farmers / Retailer
                </h2>
                <button
                  onClick={selectAllFarmers}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200"
                >
                  {selectedFarmers.length === filteredFarmers.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>

              {/* Filter Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Search Box */}
                <div>
                  {/* <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search by name or number
                  </label> */}
                  <input
                    id="search"
                    type="text"
                    placeholder="Search farmers by name or number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* State Filter */}
                <div>
                  {/* <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Filter by State
                  </label> */}
                  <select
                    id="stateFilter"
                    name="state"
                    value={selectedState}
                    onChange={handleStateChange}
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                  >
                    <option className="text-grayish" value="">
                      By state
                    </option>
                    {uniqueStates?.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-md">
                {filteredFarmers.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredFarmers.map((farmer) => (
                      <li
                        key={farmer.id}
                        className={`flex items-center p-3 rounded-md cursor-pointer ${selectedFarmers.includes(farmer.id) ? "bg-green-50 border-green-500 border" : "bg-gray-50 border-gray-200 border"}`}
                        onClick={() => toggleFarmerSelection(farmer.id)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFarmers.includes(farmer.id)}
                          onChange={() => toggleFarmerSelection(farmer.id)}
                          className="h-4 w-4 text-green-600 rounded"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {farmer.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {farmer.mobileNumber}
                          </p>
                          {farmer.district && farmer.state && (
                            <p className="text-xs text-gray-400">
                              {farmer.district}, {farmer.state}
                            </p>
                          )}
                          {farmer.preferredLanguage && (
                            <p className="text-xs text-gray-400">
                              Language: {farmer.preferredLanguage}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    {searchTerm || selectedState
                      ? "No farmers match your filters"
                      : "No farmers registered yet"}
                  </p>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {selectedFarmers.length} of {filteredFarmers.length} selected
                {selectedState && ` (Filtered by: ${selectedState})`}
              </p>
            </div>

            {/* Message Composition */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Compose Message
              </h2>

              {/* Template Selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Quick Templates
                </h3>
             <div className="flex flex-wrap gap-2">
<div className="flex flex-wrap gap-2">
  {templates.map((template) => {
    return (
      <button
        key={template.id}
        onClick={() =>
          applyTemplate({
            id: template.name, // Meta expects template name, not ID
            text: template?.text || "",
            language: template.language,
          })
        }
        className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200"
      >
        {template.name} ({template.language})
      </button>
    );
  })}
</div>

</div>

              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                 Template Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                  placeholder="Type your message here. Use {name} to include the farmer's name."
                  value={message}
                  disabled
                  onChange={(e) => setMessage(e.target.value)}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {message?.length} characters
                </p>
              </div>
            </div>

            {/* Send Button and Status */}
            <div className="flex items-center justify-between">
              <div>
                {sendStatus && (
                  <p
                    className={`text-sm ${sendStatus.includes("Error") ? "text-red-600" : "text-green-600"}`}
                  >
                    {sendStatus}
                  </p>
                )}
              </div>
           <button
  onClick={sendMessages}
  disabled={isSending || !selectedTemplate}
  className={`px-4 py-2 rounded-md text-white font-medium ${isSending || !selectedTemplate ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
>
  {isSending ? "Sending..." : `Send to ${selectedFarmers.length} Farmers`}
</button>

            </div>
          </div>
        </div>

        
      </div>

      <style jsx global>{`
        body {
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
}
