
import { CheckCircle, Info, XCircle } from 'lucide-react';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";


type ToastContextType = {
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: number) => void;
};

export type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <ToastItem onRemove={removeToast} toast={toast} key={toast.id}/>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Enter animation
    const enterTimer = setTimeout(() => setVisible(true), 50);

    return () => {
      clearTimeout(enterTimer);
    };
  }, []);



  return (
    <div
      onClick={()=> onRemove(toast.id)}
      className={`cursor-pointer px-4 py-2 rounded shadow text-white flex justify-center items-center gap-2 transform transition-all duration-500 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        ${
          toast.type === "success"
            ? "bg-green-500"
            : toast.type === "error"
            ? "bg-red-500"
            : "bg-gray-800"
        }`}
    >
      {toast.type === "success" ? (
        <CheckCircle />
      ) : toast.type === "error" ? (
        <XCircle />
      ) : (
        <Info />
      )}
      {toast.message}
    </div>
  );
};


export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};