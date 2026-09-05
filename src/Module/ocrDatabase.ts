import { browserDatabase } from './browserDatabase';

export interface OcrScan {
  id: string;
  filename: string;
  timestamp: Date;
  extractedText: string;
  imageData?: string; // a thumbnail
  note?: string;
}

class OcrDatabase {
  private readonly COLLECTION_NAME = 'ocr_scans';

  async saveOcrScan(scanData: OcrScan): Promise<void> {
    try {
      // Convert Date object to ISO string for storage
      const scanToSave = {
        ...scanData,
        timestamp: scanData.timestamp.toISOString()
      };
      
      await browserDatabase.insertOne(this.COLLECTION_NAME, scanToSave);
    } catch (error) {
      console.error('Error saving OCR scan to database:', error);
      throw error;
    }
  }
  
  async getRecentOcrScans(limit: number = 10): Promise<OcrScan[]> {
    try {
      const scans = await browserDatabase.find(this.COLLECTION_NAME, {}, {
        sort: { timestamp: -1 },
        limit: limit
      });

      // Convert ISO strings back to Date objects
      return scans.map((scan: any) => ({
        ...scan,
        timestamp: new Date(scan.timestamp)
      }));
    } catch (error) {
      console.error('Error loading OCR scans from database:', error);
      return [];
    }
  }

  async getOcrScanById(id: string): Promise<OcrScan | null> {
    try {
      const scan = await browserDatabase.findOne(this.COLLECTION_NAME, { id });
      if (!scan) return null;

      // Convert ISO string back to Date object
      return {
        ...scan,
        timestamp: new Date(scan.timestamp)
      };
    } catch (error) {
      console.error('Error loading OCR scan from database:', error);
      return null;
    }
  }

  async deleteOcrScan(id: string): Promise<void> {
    try {
      await browserDatabase.deleteOne(this.COLLECTION_NAME, { id });
    } catch (error) {
      console.error('Error deleting OCR scan from database:', error);
      throw error;
    }
  }

  async clearAllOcrScans(): Promise<void> {
    try {
      await browserDatabase.deleteMany(this.COLLECTION_NAME, {});
    } catch (error) {
      console.error('Error clearing all OCR scans from database:', error);
      throw error;
    }
  }

  async searchOcrScans(searchText: string, limit: number = 10): Promise<OcrScan[]> {
    try {
      // Simple text search implementation
      const allScans = await browserDatabase.find(this.COLLECTION_NAME, {});
      const filteredScans = allScans.filter((scan: any) => 
        scan.extractedText.toLowerCase().includes(searchText.toLowerCase())
      );

      // Sort by timestamp and limit
      const sortedScans = filteredScans.sort((a: any, b: any) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      const limitedScans = sortedScans.slice(0, limit);

      return limitedScans.map((scan: any) => ({
        ...scan,
        timestamp: new Date(scan.timestamp)
      }));
    } catch (error) {
      console.error('Error searching OCR scans from database:', error);
      return [];
    }
  }

  async getOcrStats(): Promise<{
    totalScans: number;
    scansByDate: Record<string, number>;
    averageTextLength: number;
  }> {
    try {
      const totalScans = await browserDatabase.countDocuments(this.COLLECTION_NAME);
      
      // Get scans by date (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const allScans = await browserDatabase.find(this.COLLECTION_NAME, {});
      const recentScans = allScans.filter((scan: any) => 
        new Date(scan.timestamp) >= thirtyDaysAgo
      );

      // Group by date
      const scansByDate: Record<string, number> = {};
      recentScans.forEach((scan: any) => {
        const date = new Date(scan.timestamp).toISOString().split('T')[0];
        scansByDate[date] = (scansByDate[date] || 0) + 1;
      });

      // Calculate average text length
      const totalTextLength = allScans.reduce((sum: number, scan: any) => 
        sum + (scan.extractedText?.length || 0), 0
      );
      const averageTextLength = totalScans > 0 ? totalTextLength / totalScans : 0;

      return {
        totalScans,
        scansByDate,
        averageTextLength
      };
    } catch (error) {
      console.error('Error getting OCR stats from database:', error);
      return {
        totalScans: 0,
        scansByDate: {},
        averageTextLength: 0
      };
    }
  }
}

export const ocrDatabase = new OcrDatabase(); 