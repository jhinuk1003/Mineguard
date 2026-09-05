import { CoalBatchData } from './qrService';
import { browserDatabase } from './browserDatabase';

class QRDatabase {
  private readonly COLLECTION_NAME = 'coal_batches';

  async saveCoalBatch(batch: CoalBatchData): Promise<void> {
    try {
      const batchToSave = {
        ...batch,
        dispatchTime: batch.dispatchTime.toISOString(),
        createdAt: new Date().toISOString()
      };
      
      await browserDatabase.insertOne(this.COLLECTION_NAME, batchToSave);
    } catch (error) {
      console.error('Error saving coal batch to database:', error);
      throw error;
    }
  }

  async getRecentBatches(limit: number = 10): Promise<CoalBatchData[]> {
    try {
      const batches = await browserDatabase.find(this.COLLECTION_NAME, {}, {
        sort: { createdAt: -1 },
        limit: limit
      });

      return batches.map((batch: any) => ({
        ...batch,
        dispatchTime: new Date(batch.dispatchTime),
        createdAt: new Date(batch.createdAt)
      }));
    } catch (error) {
      console.error('Error loading coal batches from database:', error);
      return [];
    }
  }

  async getBatchById(id: string): Promise<CoalBatchData | null> {
    try {
      const batch = await browserDatabase.findOne(this.COLLECTION_NAME, { id });
      if (!batch) return null;

      return {
        ...batch,
        dispatchTime: new Date(batch.dispatchTime),
        createdAt: new Date(batch.createdAt)
      };
    } catch (error) {
      console.error('Error loading coal batch from database:', error);
      return null;
    }
  }

  async getBatchesByQuality(quality: string): Promise<CoalBatchData[]> {
    try {
      const batches = await browserDatabase.find(this.COLLECTION_NAME, { quality });
      
      return batches.map((batch: any) => ({
        ...batch,
        dispatchTime: new Date(batch.dispatchTime),
        createdAt: new Date(batch.createdAt)
      }));
    } catch (error) {
      console.error('Error loading coal batches by quality from database:', error);
      return [];
    }
  }

  async getBatchesByLocation(location: string): Promise<CoalBatchData[]> {
    try {
      const batches = await browserDatabase.find(this.COLLECTION_NAME, { mineLocation: location });
      
      return batches.map((batch: any) => ({
        ...batch,
        dispatchTime: new Date(batch.dispatchTime),
        createdAt: new Date(batch.createdAt)
      }));
    } catch (error) {
      console.error('Error loading coal batches by location from database:', error);
      return [];
    }
  }

  async getBatchesByDateRange(startDate: Date, endDate: Date): Promise<CoalBatchData[]> {
    try {
      const batches = await browserDatabase.find(this.COLLECTION_NAME, {
        dispatchTime: {
          $gte: startDate.toISOString(),
          $lte: endDate.toISOString()
        }
      });
      
      return batches.map((batch: any) => ({
        ...batch,
        dispatchTime: new Date(batch.dispatchTime),
        createdAt: new Date(batch.createdAt)
      }));
    } catch (error) {
      console.error('Error loading coal batches by date range from database:', error);
      return [];
    }
  }

  async getBatchStats(): Promise<{
    totalBatches: number;
    totalWeight: number;
    qualityDistribution: Record<string, number>;
    locationDistribution: Record<string, number>;
    averageWeight: number;
  }> {
    try {
      const totalBatches = await browserDatabase.countDocuments(this.COLLECTION_NAME);
      const batches = await this.getRecentBatches(1000); // Get all batches for stats

      const totalWeight = batches.reduce((sum, batch) => sum + batch.weight, 0);
      const averageWeight = totalBatches > 0 ? totalWeight / totalBatches : 0;

      const qualityDistribution: Record<string, number> = {};
      const locationDistribution: Record<string, number> = {};

      batches.forEach(batch => {
        qualityDistribution[batch.quality] = (qualityDistribution[batch.quality] || 0) + 1;
        locationDistribution[batch.mineLocation] = (locationDistribution[batch.mineLocation] || 0) + 1;
      });

      return {
        totalBatches,
        totalWeight,
        qualityDistribution,
        locationDistribution,
        averageWeight
      };
    } catch (error) {
      console.error('Error getting batch stats from database:', error);
      return {
        totalBatches: 0,
        totalWeight: 0,
        qualityDistribution: {},
        locationDistribution: {},
        averageWeight: 0
      };
    }
  }

  async updateBatch(id: string, updates: Partial<CoalBatchData>): Promise<void> {
    try {
      const updateData: any = { ...updates };
      if (updates.dispatchTime) {
        updateData.dispatchTime = updates.dispatchTime.toISOString();
      }
      updateData.updatedAt = new Date().toISOString();

      await browserDatabase.updateOne(this.COLLECTION_NAME, { id }, updateData);
    } catch (error) {
      console.error('Error updating coal batch in database:', error);
      throw error;
    }
  }

  async deleteBatch(id: string): Promise<void> {
    try {
      await browserDatabase.deleteOne(this.COLLECTION_NAME, { id });
    } catch (error) {
      console.error('Error deleting coal batch from database:', error);
      throw error;
    }
  }

  async searchBatches(query: string): Promise<CoalBatchData[]> {
    try {
      // Simple text search across id, quality, and location
      const batches = await browserDatabase.find(this.COLLECTION_NAME, {
        $or: [
          { id: { $regex: query, $options: 'i' } },
          { quality: { $regex: query, $options: 'i' } },
          { mineLocation: { $regex: query, $options: 'i' } }
        ]
      });
      
      return batches.map((batch: any) => ({
        ...batch,
        dispatchTime: new Date(batch.dispatchTime),
        createdAt: new Date(batch.createdAt)
      }));
    } catch (error) {
      console.error('Error searching coal batches in database:', error);
      return [];
    }
  }
}

export const qrDatabase = new QRDatabase(); 