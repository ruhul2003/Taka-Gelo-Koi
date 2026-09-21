"use client";

import React, { useState } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImportTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (transactions: any[]) => void;
}

export default function ImportTransactionsModal({
  isOpen,
  onClose,
  onImportSuccess
}: ImportTransactionsModalProps) {
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (file.name.endsWith(".json")) {
          const json = JSON.parse(text);
          if (Array.isArray(json)) {
            const valid = json.filter(item => item.amount && item.type);
            setParsedData(valid);
          } else {
            setError("অবৈধ JSON ফরম্যাট। অ্যারে প্রত্যাশিত ছিল।");
          }
        } else if (file.name.endsWith(".csv")) {
          const lines = text.split("\n").filter(l => l.trim().length > 0);
          if (lines.length <= 1) {
            setError("CSV ফাইলে কোনো ডেটা পাওয়া যায়নি।");
            return;
          }
          const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim().toLowerCase());
          const rows: any[] = [];
          for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",").map(v => v.replace(/"/g, "").trim());
            const type = values[1]?.toLowerCase() === "income" ? "income" : "expense";
            const category = values[2] || "others";
            const amount = parseFloat(values[3]) || 0;
            const description = values[4] || "";
            const date = values[5] || new Date().toISOString().split("T")[0];

            if (amount > 0) {
              rows.push({
                id: `import-${Date.now()}-${i}`,
                type,
                category,
                amount,
                description,
                date
              });
            }
          }
          setParsedData(rows);
        } else {
          setError("অনুগ্রহ করে .json বা .csv ফাইল সিলেক্ট করুন।");
        }
      } catch (err: any) {
        setError("ফাইলটি প্রক্রিয়া করতে ত্রুটি হয়েছে: " + err.message);
      }
    };

    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (parsedData.length > 0) {
      onImportSuccess(parsedData);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                লেনদেন ব্যাকআপ ইমপোর্ট করুন
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                JSON বা CSV ব্যাকআপ ফাইল থেকে সরাসরি রিস্টোর করুন
              </p>
            </div>
          </div>

          <div className="mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer relative bg-slate-50/50 dark:bg-slate-800/30">
            <input
              type="file"
              accept=".json,.csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <FileText className="h-10 w-10 text-slate-400 mb-2" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {fileName || "ফাইল নির্বাচন করতে ক্লিক করুন বা ড্র্যাগ করুন"}
              </span>
              <span className="text-xs text-slate-400 mt-1">সমর্থিত ফরম্যাট: .json, .csv</span>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {parsedData.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>{parsedData.length} টি লেনদেন পাওয়া গেছে!</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                মোট আয় ও ব্যয়ের তথ্য সফলভাবে প্রস্তুত করা হয়েছে। ইমপোর্ট নিশ্চিত করতে নিচের বাটনে ক্লিক করুন।
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              বাতিল
            </button>
            <button
              onClick={handleConfirmImport}
              disabled={parsedData.length === 0}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
            >
              ইমপোর্ট কনফার্ম করুন
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
