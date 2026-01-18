"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ExpandableCard({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="
      w-full 
      bg-white 
      border 
      rounded-3xl 
      shadow-lg 
      overflow-hidden 
      transition-all 
      duration-300
    ">
      
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex justify-between items-center 
          px-6 py-5 
          bg-gradient-to-r from-gray-50 to-gray-100
          hover:bg-gray-200 
          transition
        "
      >
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {open ? (
          <ChevronUp className="text-gray-600" />
        ) : (
          <ChevronDown className="text-gray-600" />
        )}
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-500 ${
          open ? "max-h-[1000px] p-6" : "max-h-0 p-0"
        } overflow-hidden bg-white`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {children}
        </div>
      </div>

    </div>
  );
}
