'use client'

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Requirement {
  reqId: string;
  text: string;
  type: string;
  priority: string;
  riskLevel: string;
  ambiguityScore: number;
}

export default function ExportCsvButton({ data }: { data: Requirement[] }) {
  const handleExport = () => {
    if (!data || data.length === 0) return;

    // Create CSV header
    const headers = ["ID", "Description", "Type", "Priority", "Risk Level", "Quality Score"];
    
    // Create CSV rows
    const rows = data.map(req => {
      // Escape quotes and wrap text in quotes to handle commas within the text
      const safeText = `"${req.text.replace(/"/g, '""')}"`;
      return [
        req.reqId,
        safeText,
        req.type,
        req.priority,
        req.riskLevel,
        req.ambiguityScore
      ].join(",");
    });

    // Combine header and rows
    const csvContent = [headers.join(","), ...rows].join("\n");
    
    // Create Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "requirements_export.csv");
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
