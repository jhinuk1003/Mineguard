import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

// Extend jsPDF with the autoTable plugin
interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF;
}

export interface CoalBatchData {
  id: string;
  weight: number; // in tons
  quality: string;
  mineLocation: string;
  dispatchTime: Date;
  qrCode: string; // This will be a base64 data URL
}

export interface QRGenerationRequest {
  weight: number; // in tons
  quality: string;
  mineLocation: string;
  dispatchTime: Date;
}

class QRService {
  private generateBatchId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `CB-${timestamp}-${random}`;
  }

  async generateQRCode(batchData: Omit<CoalBatchData, 'qrCode'>): Promise<string> {
    const qrData = JSON.stringify({
      id: batchData.id,
      weight: batchData.weight,
      quality: batchData.quality,
      location: batchData.mineLocation,
      timestamp: batchData.dispatchTime.toISOString(),
      url: `${window.location.origin}/batch/${batchData.id}`
    });

    try {
      // Generate QR code as a data URL
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.9,
        margin: 1,
        width: 150,
      });
      return qrCodeDataUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw error;
    }
  }

  async createCoalBatch(request: QRGenerationRequest): Promise<CoalBatchData> {
    const batchId = this.generateBatchId();
    
    const partialBatchData: Omit<CoalBatchData, 'qrCode'> = {
      id: batchId,
      weight: request.weight,
      quality: request.quality,
      mineLocation: request.mineLocation,
      dispatchTime: request.dispatchTime,
    };

    // Generate QR code
    const qrCode = await this.generateQRCode(partialBatchData);

    const batchData: CoalBatchData = {
      ...partialBatchData,
      qrCode,
    };

    return batchData;
  }

  async generateAndDownloadPDF(batchData: CoalBatchData): Promise<void> {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MineGuard - Coal Batch Report', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // QR Code
    if (batchData.qrCode) {
      doc.addImage(batchData.qrCode, 'PNG', 15, 30, 50, 50);
    }
    
    // Batch Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Batch ID:`, 70, 40);
    doc.setFont('helvetica', 'bold');
    doc.text(`${batchData.id}`, 95, 40);

    doc.setFont('helvetica', 'normal');
    doc.text(`Dispatch Time:`, 70, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(`${batchData.dispatchTime.toLocaleString()}`, 95, 50);


    // Batch Details Table
    autoTable(doc, {
      startY: 90,
      head: [['Parameter', 'Value']],
      body: [
        ['Weight', `${batchData.weight.toLocaleString()} tons`],
        ['Quality Grade', batchData.quality],
        ['Mine Location', batchData.mineLocation],
        ['Status', 'Dispatched'],
        ['Verification', 'Verified by MineGuard System'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [255, 107, 0] }, // #ff6b00
    });
    
    // Footer
    const pageCount = doc.internal.pages.length;
    doc.setFontSize(10);
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() / 2, 287, { align: 'center' });
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 287);
    }

    doc.save(`Batch-Report-${batchData.id}.pdf`);
  }

  async generateProductionReport(
    stats: any, 
    recentBatches: CoalBatchData[],
    charts: { volumeChart: HTMLElement | null, qualityChart: HTMLElement | null, locationChart: HTMLElement | null }
  ): Promise<void> {
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MineGuard - Production Statistics Report', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, 28, { align: 'center' });
    
    let yPos = 40;

    // Key Stats
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Performance Indicators', margin, yPos);
    yPos += 8;

    autoTable(doc, {
        startY: yPos,
        body: [
            ['Total Production', `${stats.totalWeight.toLocaleString()} tons`],
            ['Total Batches', stats.totalBatches.toLocaleString()],
            ['Average Batch Weight', `${stats.averageWeight.toFixed(2)} tons`],
            ['Premium Quality Rate', `${(stats.qualityDistribution['Premium'] || 0) / stats.totalBatches * 100 > 0 ? ((stats.qualityDistribution['Premium'] || 0) / stats.totalBatches * 100).toFixed(1) : 0}%`],
        ],
        theme: 'plain',
        styles: { fontSize: 11 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Charts
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Data Visualizations', margin, yPos);
    yPos += 8;

    if (charts.volumeChart) {
        const canvas = await html2canvas(charts.volumeChart, { backgroundColor: '#2c2c2c' });
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', margin, yPos, 180, 80);
        yPos += 90;
    }

    if (charts.qualityChart) {
        const canvas = await html2canvas(charts.qualityChart, { backgroundColor: '#2c2c2c' });
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', margin, yPos, 85, 80);
    }
    
    if (charts.locationChart) {
        const canvas = await html2canvas(charts.locationChart, { backgroundColor: '#2c2c2c' });
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', margin + 95, yPos, 85, 80);
    }
    yPos += 90;

    // Recent Batches Table
    doc.addPage();
    yPos = 20;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Recent Production Batches', margin, yPos);
    yPos += 8;

    autoTable(doc, {
        startY: yPos,
        head: [['Batch ID', 'Weight (tons)', 'Quality', 'Location', 'Dispatch Time']],
        body: recentBatches.map(b => [b.id, b.weight.toLocaleString(), b.quality, b.mineLocation, b.dispatchTime.toLocaleString()]),
        theme: 'grid',
        headStyles: { fillColor: [255, 107, 0] },
    });


    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 287, { align: 'center' });
    }

    doc.save(`Production-Report-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  async validateBatchData(data: QRGenerationRequest): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    if (!data.weight || data.weight <= 0) {
      errors.push("Weight must be greater than 0");
    }

    if (data.weight > 1000) { // Max 1000 tons
      errors.push("Weight cannot exceed 1000 tons");
    }

    if (!data.quality || data.quality.trim() === "") {
      errors.push("Quality grade is required");
    }

    if (!data.mineLocation || data.mineLocation.trim() === "") {
      errors.push("Mine location is required");
    }

    if (!data.dispatchTime) {
      errors.push("Dispatch time is required");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  getQualityOptions(): string[] {
    return ["Premium", "Standard", "Low"];
  }

  getMineLocationOptions(): string[] {
    return [
      "East Pit",
      "West Pit", 
      "North Mine Section",
      "South Mine Section",
      "Shaft A",
      "Shaft B",
      "Level A",
      "Level B",
      "Level C",
      "Underground Section 1",
      "Underground Section 2",
      "Surface Mining Area"
    ];
  }

  async downloadQRCode(qrCodeData: string, batchId: string): Promise<void> {
    if (!qrCodeData || !qrCodeData.startsWith('data:image/png')) {
      console.error('Invalid QR code data provided for download.');
      return;
    }
    const link = document.createElement('a');
    link.href = qrCodeData;
    link.download = `QR-${batchId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const qrService = new QRService(); 