"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

export default function WhatsAppDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmers, setSelectedFarmers] = useState([]);
  const [message, setMessage] = useState("");
  const [templates, setTemplates] = useState([
    { id: 1, text: "Hello {name}, your appointment is confirmed for {date}." },
    { id: 2, text: "Hi {name}, we have a special offer just for you!" },
    {
      id: 3,
      text: "Dear {name}, thank you for your inquiry. We will get back to you soon.",
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");

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
    setMessage(template.text);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  // const sendMessages = async () => {
  //   if (selectedFarmers.length === 0) {
  //     setSendStatus("Please select at least one farmer");
  //     return;
  //   }

  //   if (!message.trim()) {
  //     setSendStatus("Please enter a message");
  //     return;
  //   }

  //   setIsSending(true);
  //   setSendStatus("Sending...");

  //   try {
  //     // Get selected farmer details
  //     const recipients = farmers.filter((farmer) =>
  //       selectedFarmers.includes(farmer.id)
  //     );

  //     // Call your Cloud Function
  //     const response = await fetch("/api/send-whatsapp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         recipients,
  //         message,
  //         timestamp: new Date().toISOString(),
  //       }),
  //     });

  //     const result = await response?.json();

  //     if (response.ok) {
  //       setSendStatus(`Successfully sent ${result.successCount} messages`);

  //       // Log this activity to Firebase
  //       await addDoc(collection(db, "messageLogs"), {
  //         recipients: selectedFarmers,
  //         message,
  //         timestamp: serverTimestamp(),
  //         status: "success",
  //         successCount: result.successCount,
  //         errorCount: result.errorCount,
  //       });

  //       // Clear selection after successful send
  //       setSelectedFarmers([]);
  //       setMessage("");
  //     } else {
  //       setSendStatus(`Error: ${result.error}`);

  //       // Log error to Firebase
  //       await addDoc(collection(db, "messageLogs"), {
  //         recipients: selectedFarmers,
  //         message,
  //         timestamp: serverTimestamp(),
  //         status: "error",
  //         error: result.error,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error sending messages:", error);
  //     setSendStatus("Failed to send messages. Please try again.");
  //   } finally {
  //     setIsSending(false);
  //   }
  // };

  const formatPhoneNumber = (num: string) => {
  // Remove spaces, dashes, etc.
  let clean = num.replace(/\D/g, "");

  // If number doesn’t start with country code, add +91 (India default here)
  if (!clean.startsWith("91")) {
    clean = "91" + clean;
  }

  return `+${clean}`;
};

const sendMessages = async () => {
  if (selectedFarmers.length === 0) {
    setSendStatus("Please select at least one farmer");
    return;
  }

  if (!message.trim()) {
    setSendStatus("Please enter a message");
    return;
  }

  setIsSending(true);
  setSendStatus("Sending...");

  try {
    // ✅ Format farmer phone numbers correctly
    const recipients = farmers
      .filter((farmer) => selectedFarmers.includes(farmer.id))
      .map((farmer) => ({
        ...farmer,
        mobileNumber: formatPhoneNumber(farmer.mobileNumber),
      }));

    // Call your Cloud Function
    const response = await fetch("/api/send-whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipients,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    let result: any = {};
    try {
      result = await response.json();
    } catch {
      result = { error: "Invalid JSON response from API" };
    }

    if (response.ok) {
      const successCount = result.successCount ?? 0;
      const errorCount = result.errorCount ?? 0;

      setSendStatus(`Successfully sent ${successCount} messages`);

      await addDoc(collection(db, "messageLogs"), {
        recipients: selectedFarmers,
        message,
        timestamp: serverTimestamp(),
        status: "success",
        successCount,
        errorCount,
      });

      setSelectedFarmers([]);
      setMessage("");
    } else {
      const errorMsg = result.error ?? "Unknown error";
      setSendStatus(`Error: ${errorMsg}`);

      await addDoc(collection(db, "messageLogs"), {
        recipients: selectedFarmers,
        message,
        timestamp: serverTimestamp(),
        status: "error",
        error: errorMsg,
      });
    }
  } catch (error) {
    console.error("Error sending messages:", error);
    setSendStatus("Failed to send messages. Please try again.");
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

          {/* Twilio Connection Panel */}
          {/* <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-blue-800">
                  WhatsApp Connection
                </h3>
                <p className="text-blue-600">
                  {twilioConnected
                    ? "Connected to Twilio WhatsApp Sandbox"
                    : "Connect to WhatsApp to start messaging"}
                </p>
              </div>
              <button
                onClick={() => setShowTwilioSetup(!showTwilioSetup)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                {showTwilioSetup ? "Hide Instructions" : "Show Setup"}
              </button>
            </div>

            {showTwilioSetup && (
              <div className="mt-4 space-y-4">
                <div className="bg-white p-4 rounded-md border">
                  <h4 className="font-medium text-gray-700 mb-2">
                    To test WhatsApp messaging:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Open WhatsApp on your phone</li>
                    <li>
                      Send{" "}
                      <span className="font-mono bg-gray-100 px-1">
                        {sandboxCode}
                      </span>{" "}
                      to
                      <span className="font-mono bg-gray-100 px-1 ml-1">
                        {sandboxNumber}
                      </span>
                    </li>
                    <li>Wait for confirmation message</li>
                    <li>Select your number from the list above</li>
                    <li>Compose and send a test message</li>
                  </ol>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      // Copy the message to clipboard
                      navigator.clipboard.writeText(sandboxCode);
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                  >
                    Copy Join Code
                  </button>
                  <button
                    onClick={() => {
                      // Open WhatsApp with the number pre-filled
                      window.open(
                        `https://wa.me/${sandboxNumber.replace(/\D/g, "")}?text=${encodeURIComponent(sandboxCode)}`,
                        "_blank"
                      );
                    }}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
                  >
                    Open WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div> */}

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
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template)}
                      className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200"
                    >
                      Template {template.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                  placeholder="Type your message here. Use {name} to include the farmer's name."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {message.length} characters
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
                disabled={isSending}
                className={`px-4 py-2 rounded-md text-white font-medium ${isSending ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
              >
                {isSending
                  ? "Sending..."
                  : `Send to ${selectedFarmers.length} Farmers`}
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
