"use client";

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen mb-10 mt-24 md:mt-16 flex items-center justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-green-50 rounded-2xl shadow-xl p-6 md:p-10 border border-green-100">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">
          User Data Deletion
        </h1>

        <p className="text-green-900 text-lg mb-4 text-center">
          We respect your privacy. If you would like to have your personal data deleted from our
          systems, please follow the instructions below.
        </p>

        <div className="bg-white rounded-xl shadow-md p-5 mb-6">
          <h2 className="text-xl font-semibold text-green-700 mb-3">How to Request Deletion</h2>
          <p className="text-gray-700 mb-2">
            To request deletion of your personal data (e.g., your name, contact number, or any
            messages stored), please contact us through one of the following:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Email us at{" "}
              <a
                href="mailto:kshipra@shipraseeds.com"
                className="text-green-700 font-medium hover:underline"
              >
                kshipra@shipraseeds.com
              </a>
            </li>
          </ul>
          <p className="text-gray-600 mt-3">
            We will process your request within <span className="font-medium">7 working days</span> and confirm once your data has been removed.
          </p>
        </div>

        <div className="bg-green-100 rounded-xl p-4 text-center">
          <p className="text-green-900 text-sm">
            ⚠️ Please note: Some data may be retained if required by law or for legal compliance.
          </p>
        </div>

        <p className="text-gray-500 text-sm mt-8 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
