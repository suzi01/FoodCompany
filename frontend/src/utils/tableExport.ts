import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface ExportColumn {
  key: string;
  label: string;
}

const normalizeCellValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map((entry) => String(entry)).join(', ');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
};

const downloadBlob = (blob: Blob, fileName: string) => {
  const link = document.createElement('a');
  const objectUrl = URL.createObjectURL(blob);

  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(objectUrl);
};

const escapeCsvCell = (value: string): string => {
  const escapedValue = value.replace(/"/g, '""');
  return `"${escapedValue}"`;
};

export const exportToCsv = (
  columns: ExportColumn[],
  rows: Record<string, unknown>[],
  fileName: string,
) => {
  const header = columns.map((column) => escapeCsvCell(column.label)).join(',');
  const body = rows.map((row) =>
    columns
      .map((col) => escapeCsvCell(normalizeCellValue(row[col.key])))
      .join(','),
  );

  const csv = [header, ...body].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  downloadBlob(blob, `${fileName}.csv`);
};

export const exportToExcel = (
  columns: ExportColumn[],
  rows: Record<string, unknown>[],
  fileName: string,
) => {
  const worksheetData = [
    columns.map((column) => column.label),
    ...rows.map((row) =>
      columns.map((column) => normalizeCellValue(row[column.key])),
    ),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Auto-fit column widths based on content
  const colWidths = columns.map((column) => {
    const headerWidth = column.label.length;
    const maxRowWidth = Math.max(
      ...rows.map((row) => normalizeCellValue(row[column.key]).length),
    );
    const width = Math.max(headerWidth, maxRowWidth) + 2; // Add padding
    return { wch: Math.min(width, 50) }; // Cap at 50 to avoid extremely wide columns
  });

  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Export');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  downloadBlob(blob, `${fileName}.xlsx`);
};

export const exportToPdf = (
  columns: ExportColumn[],
  rows: Record<string, unknown>[],
  fileName: string,
) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // Add title
  doc.setFontSize(14);
  doc.text(fileName, 14, 15);

  // Prepare table data
  const tableBody = rows.map((row) =>
    columns.map((column) => normalizeCellValue(row[column.key])),
  );

  // Generate table using autoTable
  autoTable(doc, {
    head: [columns.map((column) => column.label)],
    body: tableBody,
    startY: 22,
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [60, 76, 227], // #3C4CE3 from your design
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    columnStyles: {},
    margin: { left: 14, right: 14, top: 22, bottom: 14 },
    didDrawPage: () => {
      doc.setFontSize(8);
      const pageCount = doc.internal.pages.length;
      doc.text(
        `Page ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 7,
        { align: 'center' },
      );
    },
  });

  doc.save(`${fileName}.pdf`);
};

export const handleTableExport = (
  format: ExportFormat,
  columns: ExportColumn[],
  rows: Record<string, unknown>[],
  fileName: string,
) => {
  if (format === 'csv') {
    exportToCsv(columns, rows, fileName);
    return;
  }

  if (format === 'excel') {
    exportToExcel(columns, rows, fileName);
    return;
  }

  exportToPdf(columns, rows, fileName);
};
