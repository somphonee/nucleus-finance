import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

// Add Lao font support for PDF
const addLaoFont = (doc: jsPDF) => {
  // Note: For production, you would need to add actual Lao font
  // This is a placeholder that uses default font
  doc.setFont('helvetica');
};

export interface PDFExportOptions {
  filename: string;
  title: string;
  language: 'en' | 'lo';
  orientation?: 'portrait' | 'landscape';
  data?: any[];
  columns?: string[];
  headers?: string[];
}

export const exportToPDF = async (options: PDFExportOptions) => {
  const {
    filename,
    title,
    language,
    orientation = 'portrait',
    data = [],
    columns = [],
    headers = []
  } = options;

  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format: 'a4'
  });

  addLaoFont(doc);

  // Add title
  doc.setFontSize(16);
  doc.text(title, 14, 15);

  // Add date
  const dateLabel = language === 'lo' ? 'ວັນທີ:' : 'Date:';
  doc.setFontSize(10);
  doc.text(`${dateLabel} ${new Date().toLocaleDateString()}`, 14, 25);

  // Add table if data provided
  if (data.length > 0 && headers.length > 0) {
    autoTable(doc, {
      head: [headers],
      body: data.map(row => 
        columns.map(col => row[col] || '')
      ),
      startY: 30,
      styles: {
        font: 'helvetica',
        fontSize: 9
      },
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      }
    });
  }

  // Save the PDF
  doc.save(`${filename}.pdf`);
};

export const exportPageToPDF = async (
  elementId: string,
  filename: string,
  title: string
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(`${filename}.pdf`);
};
