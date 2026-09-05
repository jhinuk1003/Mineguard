import { browserDatabase } from './browserDatabase';

export class DatabaseInitializer {
  static async initializeDatabase(): Promise<void> {
    try {
      console.log('Initializing IndexedDB database...');
      
      // Connect to IndexedDB
      await browserDatabase.connect();
      
      console.log('IndexedDB database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize IndexedDB database:', error);
      throw error;
    }
  }

  static async checkDatabaseHealth(): Promise<{
    isConnected: boolean;
    collections: string[];
    totalDocuments: Record<string, number>;
  }> {
    try {
      const isConnected = await browserDatabase.isConnectedToDb();
      
      if (!isConnected) {
        return {
          isConnected: false,
          collections: [],
          totalDocuments: {}
        };
      }

      // For IndexedDB, we'll return the collections we know about
      const collections = ['scans', 'logbook_entries', 'ocr_scans', 'coal_batches'];

      const totalDocuments: Record<string, number> = {};
      for (const collectionName of collections) {
        totalDocuments[collectionName] = await browserDatabase.countDocuments(collectionName);
      }

      return {
        isConnected: true,
        collections: collections,
        totalDocuments
      };
    } catch (error) {
      console.error('Error checking database health:', error);
      return {
        isConnected: false,
        collections: [],
        totalDocuments: {}
      };
    }
  }

  static async migrateFromLocalStorage(): Promise<void> {
    try {
      console.log('Starting migration from localStorage to IndexedDB...');
      
      // This function can be used to migrate existing localStorage data
      // For now, we'll just log that migration is available
      console.log('Migration functionality is available but not implemented yet.');
      console.log('Existing localStorage data will be preserved.');
      
    } catch (error) {
      console.error('Error during migration:', error);
      throw error;
    }
  }
} 