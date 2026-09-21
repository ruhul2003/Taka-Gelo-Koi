export interface ExportableTransaction {
  id?: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description?: string;
  date: string | Date;
  dashboard?: string;
}

/**
 * Converts a list of transactions to CSV format and triggers a download in the browser.
 */
export function exportTransactionsToCSV(transactions: ExportableTransaction[], filename = "taka-gelo-koi-transactions.csv") {
  if (!transactions || transactions.length === 0) {
    alert("ডাউনলোড করার মতো কোনো লেনদেন পাওয়া যায়নি।");
    return;
  }

  const headers = ["ID", "Type", "Category", "Amount (BDT)", "Description", "Date", "Dashboard"];
  
  const rows = transactions.map((t) => [
    `"${t.id || ""}"`,
    `"${t.type}"`,
    `"${t.category}"`,
    t.amount,
    `"${(t.description || "").replace(/"/g, '""')}"`,
    `"${new Date(t.date).toISOString().split("T")[0]}"`,
    `"${t.dashboard || "daily"}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Converts transactions into formatted JSON and downloads it as a backup file.
 */
export function exportTransactionsToJSON(transactions: ExportableTransaction[], filename = "taka-gelo-koi-backup.json") {
  if (!transactions || transactions.length === 0) {
    alert("ডাউনলোড করার মতো কোনো লেনদেন পাওয়া যায়নি।");
    return;
  }

  const dataStr = JSON.stringify(transactions, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
