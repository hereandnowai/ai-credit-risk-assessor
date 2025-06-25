import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BRANDING_INFO } from '../constants';

// Declare global generateUUID if not using import for it
declare global {
  function generateUUID(): string;
}

export const downloadAssessmentAsPdf = async (
  elementToCapture: HTMLElement,
  fileNamePrefix: string = 'Credit_Risk_Assessment'
): Promise<void> => {
  if (!elementToCapture) {
    console.error('PDF Download Error: Element to capture not found.');
    alert('Could not generate PDF: content element not found.');
    return;
  }

  try {
    const canvas = await html2canvas(elementToCapture, {
      scale: 2, // Increase scale for better resolution
      useCORS: true, // If images are from external sources
      backgroundColor: '#1f2937', // Match dark theme background for consistency (bg-gray-800)
      onclone: (document) => {
        // Potentially adjust styles for PDF rendering if needed
        // e.g., ensure all text is visible, remove interactive elements not relevant for PDF
        const clonedElement = document.getElementById(elementToCapture.id);
        if (clonedElement) {
          // Example: Make sure text colors are suitable for PDF (might not be needed with dark bg)
        }
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt', // points
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;

    let imgWidth = pdfWidth - 40; // With some margin
    let imgHeight = imgWidth / ratio;

    // If image height exceeds page height, scale by height instead
    if (imgHeight > pdfHeight - 40) {
      imgHeight = pdfHeight - 40;
      imgWidth = imgHeight * ratio;
    }
    
    // Center the image
    const x = (pdfWidth - imgWidth) / 2;
    const y = 20; // Top margin

    // Add a header
    pdf.setFontSize(16);
    pdf.setTextColor(BRANDING_INFO.brand.colors.primary); // Use brand primary for header text
    pdf.text(BRANDING_INFO.brand.shortName + ' - Credit Risk Assessment', pdfWidth / 2, y + 15, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.setTextColor(150); // Gray text for footer
    const generationDate = new Date().toLocaleDateString();
    pdf.text(`Report Generated: ${generationDate}`, pdfWidth / 2, y + 30, { align: 'center' });


    pdf.addImage(imgData, 'PNG', x, y + 50, imgWidth, imgHeight);

    // Add a footer
    const pageCount = pdf.getNumberOfPages(); // For multi-page, but html2canvas makes one large image
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150);
      pdf.text(
        `Page ${i} of ${pageCount} | ${BRANDING_INFO.brand.website}`,
        pdfWidth / 2,
        pdfHeight - 20,
        { align: 'center' }
      );
    }

    const fileName = `${fileNamePrefix}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('An error occurred while generating the PDF. Please try again.');
  }
};
