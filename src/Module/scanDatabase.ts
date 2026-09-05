import { ScanResult } from './geminiService';
import { browserDatabase } from './browserDatabase';

export interface ScanSession {
  id: string;
  timestamp: Date;
  workerName?: string;
  results: ScanResult[];
  overallPassed: boolean;
  imageData?: string;
}

class ScanDatabase {
  private readonly COLLECTION_NAME = 'scans';

  async saveScanSession(session: ScanSession): Promise<void> {
    try {
      // Convert Date objects to ISO strings for storage
      const sessionToSave = {
        ...session,
        timestamp: session.timestamp.toISOString(),
        results: session.results.map(result => ({
          ...result,
          timestamp: result.timestamp.toISOString()
        }))
      };
      
      await browserDatabase.insertOne(this.COLLECTION_NAME, sessionToSave);
    } catch (error) {
      console.error('Error saving scan session to database:', error);
      throw error;
    }
  }

  async getRecentScans(limit: number = 10): Promise<ScanSession[]> {
    try {
      const scans = await browserDatabase.find(this.COLLECTION_NAME, {}, {
        sort: { timestamp: -1 },
        limit: limit
      });

      // Convert ISO strings back to Date objects
      return scans.map((scan: any) => ({
        ...scan,
        timestamp: new Date(scan.timestamp),
        results: scan.results.map((result: any) => ({
          ...result,
          timestamp: new Date(result.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Error loading scans from database:', error);
      return [];
    }
  }

  async getScanById(id: string): Promise<ScanSession | null> {
    try {
      const scan = await browserDatabase.findOne(this.COLLECTION_NAME, { id });
      if (!scan) return null;

      // Convert ISO strings back to Date objects
      return {
        ...scan,
        timestamp: new Date(scan.timestamp),
        results: scan.results.map((result: any) => ({
          ...result,
          timestamp: new Date(result.timestamp)
        }))
      };
    } catch (error) {
      console.error('Error loading scan from database:', error);
      return null;
    }
  }

  async deleteScan(id: string): Promise<void> {
    try {
      await browserDatabase.deleteOne(this.COLLECTION_NAME, { id });
    } catch (error) {
      console.error('Error deleting scan from database:', error);
      throw error;
    }
  }

  async clearAllScans(): Promise<void> {
    try {
      await browserDatabase.deleteMany(this.COLLECTION_NAME, {});
    } catch (error) {
      console.error('Error clearing all scans from database:', error);
      throw error;
    }
  }

  async getScanStats(): Promise<{
    totalScans: number;
    passedScans: number;
    failedScans: number;
    successRate: number;
  }> {
    try {
      const totalScans = await browserDatabase.countDocuments(this.COLLECTION_NAME);
      const passedScans = await browserDatabase.countDocuments(this.COLLECTION_NAME, { overallPassed: true });
      const failedScans = totalScans - passedScans;
      const successRate = totalScans > 0 ? (passedScans / totalScans) * 100 : 0;

      return {
        totalScans,
        passedScans,
        failedScans,
        successRate
      };
    } catch (error) {
      console.error('Error getting scan stats from database:', error);
      return {
        totalScans: 0,
        passedScans: 0,
        failedScans: 0,
        successRate: 0
      };
    }
  }

  async getEquipmentStats(): Promise<Record<string, { passed: number; failed: number; total: number }>> {
    try {
      const pipeline = [
        { $unwind: '$results' },
        {
          $group: {
            _id: '$results.equipmentName',
            total: { $sum: 1 },
            passed: {
              $sum: {
                $cond: ['$results.isPresent', 1, 0]
              }
            }
          }
        },
        {
          $project: {
            equipmentName: '$_id',
            total: 1,
            passed: 1,
            failed: { $subtract: ['$total', '$passed'] }
          }
        }
      ];

      const stats = await browserDatabase.aggregate(this.COLLECTION_NAME, pipeline);
      
      const result: Record<string, { passed: number; failed: number; total: number }> = {};
      stats.forEach((stat: any) => {
        result[stat.equipmentName] = {
          passed: stat.passed,
          failed: stat.failed,
          total: stat.total
        };
      });

      return result;
    } catch (error) {
      console.error('Error getting equipment stats from database:', error);
      return {};
    }
  }
}

export const scanDatabase = new ScanDatabase(); 