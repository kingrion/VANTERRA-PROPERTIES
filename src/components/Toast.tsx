import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#151515] border border-[#C6A66B]/50 p-4 shadow-2xl flex items-start gap-3 animate-fadeIn text-xs"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-[#A7A7A7] shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <span className="font-semibold text-[#F5F1E8] block tracking-wide">
              {toast.title}
            </span>
            <span className="text-[#A7A7A7] font-light mt-0.5 block leading-relaxed">
              {toast.message}
            </span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-500 hover:text-[#F5F1E8] p-1 cursor-pointer"
            aria-label="Dismiss toast notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
