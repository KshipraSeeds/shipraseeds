import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkle,
  ShieldCheck,
  FlaskConical,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const seedPoints = [
  {
    id: "a",
    title: "Stronger Germination and Uniform Growth",
    summary:
      "Processed seeds are carefully graded to select only bold, healthy grains. This improves germination and helps your crop grow more evenly from the start.",
    readMore: `Grading is a key part of seed processing. Seeds are passed through machines that separate them by size, weight, and shape. Only well-developed, mature seeds are selected—those with better nutrient reserves and higher chances of germination. Broken, shrivelled, or underdeveloped grains are removed.
      
      This results in a seed lot where most seeds are of similar quality. When sown, these seeds tend to sprout more uniformly and establish better in the field.
      
      Because weak seeds are removed during grading, you don’t need to over-sow to compensate for poor germination. This means a lower seed rate is enough to achieve a healthy plant population—saving cost and effort.`,
    example:
      "Home-saved seeds often contain small or weak grains, which may sprout late or not at all. In contrast, graded seeds provide a stronger, more synchronized start.",
    analogy: `It’s like cooking with clean, full grains of rice. If you mix in broken or damaged ones, the dish won’t cook evenly. Seeds work the same way—uniform quality gives better results.`,
    href: "/why-processed-seed#a",
    icon: <Sparkle className="w-6 h-6 text-purple-600" />,
  },

  {
    id: "b",
    title: "Treated vs Non-Treated Seeds – A Safer Start, A Better Outcome",
    summary:
      "Treated seeds protect your crop from the start—against pests, diseases, and early losses. They grow faster, stronger, and give better yield.",
    href: "/why-processed-seed#b",
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
  },
  {
    id: "c",
    title: "Tested, Trusted, and Foundational to Your Yield",
    summary:
      "Processed seeds are lab-tested, performance-verified, and give your crop a reliable head start. Even before any input is added, they set the foundation for your harvest.",
    href: "/why-processed-seed#c",
    icon: <FlaskConical className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "d",
    title: "Real Value, Less Risk – A Smart Investment",
    summary:
      "Processed seeds may cost more upfront, but they reduce risk, save effort, and bring better returns. The hidden costs of home-saved seed often outweigh the savings.",
    href: "/why-processed-seed#d",
    icon: <Wallet className="w-6 h-6 text-yellow-600" />,
  },
];

export const WhyProcessedSeedCard = () => {
    const [openId, setOpenId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<any>(null);
  
    const toggle = (id: string) => {
      setOpenId((prev) => (prev === id ? null : id));
    };
  
    const openModal = (point: any) => {
      setModalContent(point);  // Set the content for the modal
      setModalOpen(true);  // Open the modal
    };
  
    const closeModal = () => {
      setModalOpen(false);  // Close the modal
      setModalContent(null);  // Clear the modal content
    };
  
    return (
      <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 border border-purple-200 rounded-3xl p-6 sm:p-10 shadow-xl max-w-5xl mx-auto my-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-800 mb-8 text-center">
          🌾 Why Processed Seed?
        </h2>
  
        <div className="space-y-6">
          {seedPoints.map((point) => (
            <div
              key={point.id}
              className="bg-white hover:bg-purple-50 border border-purple-200 rounded-2xl px-6 py-5 transition-all duration-300 shadow-sm group"
            >
              <button
                onClick={() => toggle(point.id)}
                className="w-full flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-3">
                  {point.icon}
                  <h3 className="text-lg sm:text-xl font-semibold text-purple-900 group-hover:text-purple-700">
                    {point.id}. {point.title}
                  </h3>
                </div>
                {openId === point.id ? (
                  <ChevronUp className="w-5 h-5 text-purple-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-600" />
                )}
              </button>
  
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openId === point.id
                    ? "max-h-40 mt-3 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-700 text-sm sm:text-base mb-4">
                  {point.summary}
                </p>
                <button
                  onClick={() => openModal(point)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Modal */}
        {modalOpen && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-auto px-4 sm:px-0" // Added horizontal padding for small screens
    onClick={closeModal}
  >
    <div
      className="bg-white rounded-2xl shadow-xl p-8 max-w-xl mx-auto relative w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 max-h-screen overflow-y-auto my-6 sm:my-12" // Adjusted vertical margin for better spacing
      onClick={(e) => e.stopPropagation()} // Prevent closing on click inside the modal
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        ✖
      </button>
      <h3 className="text-2xl font-semibold text-purple-800 mb-4">
        {modalContent?.title}
      </h3>
      <p className="text-gray-700 mb-4">{modalContent?.readMore}</p>
      <h4 className="font-semibold text-purple-600 mb-2">Example:</h4>
      <p className="text-gray-700 mb-4">{modalContent?.example}</p>
      <h4 className="font-semibold text-purple-600 mb-2">Analogy:</h4>
      <p className="text-gray-700">{modalContent?.analogy}</p>
    </div>
  </div>
)}

      </div>
    );
  };
