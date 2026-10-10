'use client'

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExportDataButtonProps {
  data: any[];
  filename: string;
  columns: { header: string; key: string }[];
}

export default function ExportDataButton({ data, filename, columns }: ExportDataButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    // Create CSV header
    const headers = columns.map(c => c.header);
    
    // Create CSV rows
    const rows = data.map(row => {
      return columns.map(c => {
        const val = row[c.key] || '';
        // Escape quotes and wrap text in quotes to handle commas within the text
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(",");
    });

    // Combine header and rows
    const csvContent = [headers.join(","), ...rows].join("\n");
    
    // Create Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Button onClick={handleExport} variant="outline" size="sm" className="flex items-center gap-2">
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  )
}
