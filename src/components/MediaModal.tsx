import React from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

export const MediaModal: React.FC = () => {
  const { activeMediaModal, closeMediaModal } = useApp();

  if (!activeMediaModal || !activeMediaModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={closeMediaModal} />

      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col z-10">
        <div className="flex items-center justify-between pb-3 text-xs text-[#A7A7A7] font-mono">
          <span className="text-[#C6A66B]">{activeMediaModal.title || 'VANTERRA Curated Media'}</span>
          <button
            onClick={closeMediaModal}
            className="p-1.5 text-[#F5F1E8] hover:text-[#C6A66B] cursor-pointer"
            aria-label="Close media viewer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-[#000] border border-[#C6A66B]/30 overflow-hidden flex items-center justify-center">
          {activeMediaModal.type === 'video' ? (
            <video
              src={activeMediaModal.url}
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
          ) : (
            <img
              src={activeMediaModal.url}
              alt={activeMediaModal.title || 'Property Media'}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};
