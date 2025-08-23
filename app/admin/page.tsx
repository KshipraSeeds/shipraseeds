'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { db } from "@/firebase";
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function WhatsAppDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmers, setSelectedFarmers] = useState([]);
  const [message, setMessage] = useState('');
  const [templates, setTemplates] = useState([
    { id: 1, text: 'Hello {name}, your appointment is confirmed for {date}.' },
    { id: 2, text: 'Hi {name}, we have a special offer just for you!' },
    { id: 3, text: 'Dear {name}, thank you for your inquiry. We will get back to you soon.' }
  ]);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');

  // Fetch farmers from Firebase
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const q = query(collection(db, 'FarmerRegistrations'), orderBy('name'));
        const querySnapshot = await getDocs(q);
        const farmersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFarmers(farmersData);
      } catch (error) {
        console.error('Error fetching farmers:', error);
      }
    };

    fetchFarmers();
  }, []);

  // Get unique states from farmers
  const getUniqueStates = () => {
    const statesSet = new Set<string>();
    farmers.forEach(farmer => {
      if (farmer.state) statesSet.add(farmer.state as string);
    });
    
    // Convert Set to Array and sort
    return Array.from(statesSet).sort();
  };
  
  const uniqueStates = getUniqueStates();

  // Filter farmers based on search term and state filter
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          farmer.mobileNumber?.includes(searchTerm);
    const matchesState = !selectedState || farmer.state === selectedState;
    
    return matchesSearch && matchesState;
  });

  const toggleFarmerSelection = (farmerId) => {
    if (selectedFarmers.includes(farmerId)) {
      setSelectedFarmers(selectedFarmers.filter(id => id !== farmerId));
    } else {
      setSelectedFarmers([...selectedFarmers, farmerId]);
    }
  };

  const selectAllFarmers = () => {
    if (selectedFarmers.length === filteredFarmers.length) {
      setSelectedFarmers([]);
    } else {
      setSelectedFarmers(filteredFarmers.map(farmer => farmer.id));
    }
  };

  const applyTemplate = (template) => {
    setMessage(template.text);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const sendMessages = async () => {
    if (selectedFarmers.length === 0) {
      setSendStatus('Please select at least one farmer');
      return;
    }

    if (!message.trim()) {
      setSendStatus('Please enter a message');
      return;
    }

    setIsSending(true);
    setSendStatus('Sending...');

    try {
      // Get selected farmer details
      const recipients = farmers.filter(farmer => 
        selectedFarmers.includes(farmer.id)
      );

      // Call your Cloud Function
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients,
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSendStatus(`Successfully sent ${result.successCount} messages`);
        
        // Log this activity to Firebase
        await addDoc(collection(db, 'messageLogs'), {
          recipients: selectedFarmers,
          message,
          timestamp: serverTimestamp(),
          status: 'success',
          successCount: result.successCount,
          errorCount: result.errorCount
        });
        
        // Clear selection after successful send
        setSelectedFarmers([]);
        setMessage('');
      } else {
        setSendStatus(`Error: ${result.error}`);
        
        // Log error to Firebase
        await addDoc(collection(db, 'messageLogs'), {
          recipients: selectedFarmers,
          message,
          timestamp: serverTimestamp(),
          status: 'error',
          error: result.error
        });
      }
    } catch (error) {
      console.error('Error sending messages:', error);
      setSendStatus('Failed to send messages. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen m-4 mt-24 bg-gray-50">
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
                <h2 className="text-lg font-medium text-gray-900">Select Farmers / Retailer</h2>
                <button
                  onClick={selectAllFarmers}
                  className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200"
                >
                  {selectedFarmers.length === filteredFarmers.length ? 'Deselect All' : 'Select All'}
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
                    <option className="text-grayish" value="By state">By state</option>
                    {uniqueStates?.map(state => (
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
                    {filteredFarmers.map(farmer => (
                      <li 
                        key={farmer.id} 
                        className={`flex items-center p-3 rounded-md cursor-pointer ${selectedFarmers.includes(farmer.id) ? 'bg-green-50 border-green-500 border' : 'bg-gray-50 border-gray-200 border'}`}
                        onClick={() => toggleFarmerSelection(farmer.id)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFarmers.includes(farmer.id)}
                          onChange={() => toggleFarmerSelection(farmer.id)}
                          className="h-4 w-4 text-green-600 rounded"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{farmer.name}</p>
                          <p className="text-xs text-gray-500">{farmer.mobileNumber}</p>
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
                    {searchTerm || selectedState ? 'No farmers match your filters' : 'No farmers registered yet'}
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
              <h2 className="text-lg font-medium text-gray-900 mb-4">Compose Message</h2>
              
              {/* Template Selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Templates</h3>
                <div className="flex flex-wrap gap-2">
                  {templates.map(template => (
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                  <p className={`text-sm ${sendStatus.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {sendStatus}
                  </p>
                )}
              </div>
              <button
                onClick={sendMessages}
                disabled={isSending}
                className={`px-4 py-2 rounded-md text-white font-medium ${isSending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isSending ? 'Sending...' : `Send to ${selectedFarmers.length} Farmers`}
              </button>
            </div>
          </div>
        </div>

        {/* Cloud Function Instructions */}
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h2 className="text-lg font-medium text-yellow-800 mb-2">Setup Instructions</h2>
          
          <div className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
            <pre>
{`// pages/api/send-whatsapp.js (or in Firebase Cloud Functions)
import { httpsCallable } from "firebase/functions";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { recipients, message } = req.body;

  try {
    // Initialize Twilio client (you'll need to set up environment variables)
    const twilioClient = require('twilio')(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const results = [];
    const errors = [];

    // Send messages to each recipient
    for (const recipient of recipients) {
      try {
        // Format phone number for WhatsApp
        const toNumber = 'whatsapp:' + recipient.phone.replace(/\\D/g, '');
        
        // Personalize message - replace placeholders
        let personalizedMessage = message;
        personalizedMessage = personalizedMessage.replace(/{name}/g, recipient.name);
        
        // Send via Twilio
        const result = await twilioClient.messages.create({
          body: personalizedMessage,
          from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
          to: toNumber
        });
        
        results.push({ id: recipient.id, sid: result.sid });
      } catch (error) {
        errors.push({ id: recipient.id, error: error.message });
      }
    }

    res.status(200).json({
      successCount: results.length,
      errorCount: errors.length,
      results,
      errors
    });
  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).json({ error: 'Failed to send messages' });
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
    </div>
  );
}