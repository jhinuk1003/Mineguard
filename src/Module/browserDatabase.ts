// Browser-compatible database service using IndexedDB
import { config } from '../config/environment';

export class BrowserDatabase {
  private dbName = config.database.name;
  private version = 2; // Incremented version to trigger upgrade
  private db: IDBDatabase | null = null;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        console.error('Failed to open IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('Connected to IndexedDB successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create collections (object stores)
        if (!db.objectStoreNames.contains('scans')) {
          const scansStore = db.createObjectStore('scans', { keyPath: 'id' });
          scansStore.createIndex('timestamp', 'timestamp', { unique: false });
          scansStore.createIndex('overallPassed', 'overallPassed', { unique: false });
          scansStore.createIndex('workerName', 'workerName', { unique: false });
        }

        if (!db.objectStoreNames.contains('logbook_entries')) {
          const logbookStore = db.createObjectStore('logbook_entries', { keyPath: 'id' });
          logbookStore.createIndex('date', 'date', { unique: false });
          logbookStore.createIndex('type', 'type', { unique: false });
          logbookStore.createIndex('operator', 'operator', { unique: false });
        }

        if (!db.objectStoreNames.contains('ocr_scans')) {
          const ocrStore = db.createObjectStore('ocr_scans', { keyPath: 'id' });
          ocrStore.createIndex('timestamp', 'timestamp', { unique: false });
          ocrStore.createIndex('filename', 'filename', { unique: false });
        }

        if (!db.objectStoreNames.contains('coal_batches')) {
          const batchesStore = db.createObjectStore('coal_batches', { keyPath: 'id' });
          batchesStore.createIndex('dispatchTime', 'dispatchTime', { unique: false });
          batchesStore.createIndex('quality', 'quality', { unique: false });
          batchesStore.createIndex('mineLocation', 'mineLocation', { unique: false });
          batchesStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        console.log('IndexedDB schema upgraded successfully');
      };
    });
  }

  async disconnect(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log('Disconnected from IndexedDB');
    }
  }

  private getObjectStore(collectionName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) {
      throw new Error('IndexedDB not connected. Call connect() first.');
    }
    const transaction = this.db.transaction([collectionName], mode);
    return transaction.objectStore(collectionName);
  }

  // Generic CRUD operations
  async insertOne<T>(collectionName: string, document: T): Promise<any> {
    await this.connect();
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(collectionName, 'readwrite');
      const request = store.add(document);

      request.onsuccess = () => resolve({ insertedId: request.result });
      request.onerror = () => reject(request.error);
    });
  }

  async insertMany<T>(collectionName: string, documents: T[]): Promise<any> {
    await this.connect();
    const results = [];
    
    for (const doc of documents) {
      try {
        const result = await this.insertOne(collectionName, doc);
        results.push(result);
      } catch (error) {
        console.error('Error inserting document:', error);
      }
    }
    
    return { insertedIds: results.map(r => r.insertedId) };
  }

  async find<T>(collectionName: string, filter: any = {}, options: any = {}): Promise<T[]> {
    await this.connect();
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(collectionName);
      const request = store.getAll();

      request.onsuccess = () => {
        let results = request.result as T[];
        
        // Apply filters (simplified - only exact matches for now)
        if (filter && Object.keys(filter).length > 0) {
          results = results.filter(item => {
            return Object.entries(filter).every(([key, value]) => {
              return (item as any)[key] === value;
            });
          });
        }

        // Apply sorting
        if (options.sort) {
          const [field, direction] = Object.entries(options.sort)[0];
          results.sort((a, b) => {
            const aVal = (a as any)[field];
            const bVal = (b as any)[field];
            if (direction === -1) {
              return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
            }
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
          });
        }

        // Apply limit
        if (options.limit) {
          results = results.slice(0, options.limit);
        }

        resolve(results);
      };

      request.onerror = () => reject(request.error);
    });
  }

  async findOne<T>(collectionName: string, filter: any): Promise<T | null> {
    const results = await this.find<T>(collectionName, filter, { limit: 1 });
    return results.length > 0 ? results[0] : null;
  }

  async updateOne(collectionName: string, filter: any, update: any): Promise<any> {
    await this.connect();
    const existing = await this.findOne(collectionName, filter);
    if (!existing) return { matchedCount: 0, modifiedCount: 0 };

    const updated = { ...existing, ...update };
    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(collectionName, 'readwrite');
      const request = store.put(updated);

      request.onsuccess = () => resolve({ matchedCount: 1, modifiedCount: 1 });
      request.onerror = () => reject(request.error);
    });
  }

  async updateMany(collectionName: string, filter: any, update: any): Promise<any> {
    const existing = await this.find(collectionName, filter);
    let modifiedCount = 0;

    for (const item of existing) {
      try {
        await this.updateOne(collectionName, { id: (item as any).id }, update);
        modifiedCount++;
      } catch (error) {
        console.error('Error updating document:', error);
      }
    }

    return { matchedCount: existing.length, modifiedCount };
  }

  async deleteOne(collectionName: string, filter: any): Promise<any> {
    await this.connect();
    const existing = await this.findOne(collectionName, filter);
    if (!existing) return { deletedCount: 0 };

    return new Promise((resolve, reject) => {
      const store = this.getObjectStore(collectionName, 'readwrite');
      const request = store.delete((existing as any).id);

      request.onsuccess = () => resolve({ deletedCount: 1 });
      request.onerror = () => reject(request.error);
    });
  }

  async deleteMany(collectionName: string, filter: any): Promise<any> {
    const existing = await this.find(collectionName, filter);
    let deletedCount = 0;

    for (const item of existing) {
      try {
        await this.deleteOne(collectionName, { id: (item as any).id });
        deletedCount++;
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }

    return { deletedCount };
  }

  async countDocuments(collectionName: string, filter: any = {}): Promise<number> {
    const results = await this.find(collectionName, filter);
    return results.length;
  }

  async aggregate(collectionName: string, pipeline: any[]): Promise<any[]> {
    // Simplified aggregation - only supports basic operations
    const allData = await this.find(collectionName);
    let results = [...allData];

    for (const stage of pipeline) {
      if (stage.$match) {
        results = results.filter(item => {
          return Object.entries(stage.$match).every(([key, value]) => {
            return (item as any)[key] === value;
          });
        });
      } else if (stage.$group) {
        // Simplified grouping
        const groups: any = {};
        const groupKey = stage.$group._id;
        
        results.forEach(item => {
          const key = typeof groupKey === 'string' ? (item as any)[groupKey] : groupKey;
          if (!groups[key]) {
            groups[key] = { _id: key };
            Object.entries(stage.$group).forEach(([field, operation]) => {
              if (field !== '_id') {
                if (operation === { $sum: 1 }) {
                  groups[key][field] = 0;
                }
              }
            });
          }
          
          Object.entries(stage.$group).forEach(([field, operation]) => {
            if (field !== '_id') {
              if (operation === { $sum: 1 }) {
                groups[key][field]++;
              }
            }
          });
        });
        
        results = Object.values(groups);
      } else if (stage.$sort) {
        const [field, direction] = Object.entries(stage.$sort)[0];
        results.sort((a, b) => {
          const aVal = (a as any)[field];
          const bVal = (b as any)[field];
          if (direction === -1) {
            return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
          }
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
      }
    }

    return results;
  }

  async isConnectedToDb(): Promise<boolean> {
    return this.db !== null;
  }
}

export const browserDatabase = new BrowserDatabase(); 