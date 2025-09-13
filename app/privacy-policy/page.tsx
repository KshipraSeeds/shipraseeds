"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen mb-10 mt-24 md:mt-16 flex items-center justify-center py-10 px-4 ">
      <div className="max-w-3xl w-full bg-gradient-to-b from-green-50 border border-green-100 rounded-2xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4 leading-relaxed">
          At <span className="font-semibold text-green-700">Shipra seeds</span>, we respect your
          privacy and are committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, and protect the data you share with us through our website,
          WhatsApp messages, and related services.
        </p>

        <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">
          Information We Collect
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
          <li>Your name and contact details (e.g., phone number).</li>
          <li>Message content you send or receive via WhatsApp.</li>
          <li>Optional information you provide when registering or filling forms.</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">
          How We Use Your Data
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
          <li>To send updates about products, orders, and offers via WhatsApp.</li>
          <li>To provide customer support and respond to your inquiries.</li>
          <li>To improve our services and personalize your experience.</li>
        </ul>

        <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">
          Data Protection
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We take appropriate security measures to prevent unauthorized access, disclosure, or
          misuse of your data. Your information is stored securely and is never shared with
          third parties except where required by law.
        </p>

        <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">
          Your Rights
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You can request access, correction, or deletion of your data at any time. To delete your
          data, please contact us via email at{" "}
          <a
            href="mailto:kshipra@shipraseeds.com"
            className="text-green-600 font-medium hover:underline"
          >
            kshipra@shipraseeds.com
          </a>{" "}
          
          .
        </p>

        <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">
          Changes to this Policy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with the updated date.
        </p>

        {/* <p className="text-green-700 text-sm mt-8 text-center italic">
          Last updated: {new Date().toLocaleDateString()}
        </p> */}
      </div>
    </div>
  );
}
