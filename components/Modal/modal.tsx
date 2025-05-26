// src/components/Modal/modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-scale-in">
                <h2 className="font-montserrat text-2xl font-bold text-shipra-green-700 mb-4 border-b pb-2">{title}</h2>
                <div className="text-shipra-text text-base leading-relaxed">
                    {children}
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl font-light leading-none"
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Modal;