const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5001/api';

export interface LogbookEntry {
  _id?: string; // MongoDB adds an _id
  id?: string;
  type: string;
  date: Date;
  operator: string;
  filename?: string;
  note?: string;
}

class LogbookDatabase {
  async saveLogEntry(entry: Omit<LogbookEntry, 'date' | '_id' | 'id'>): Promise<LogbookEntry> {
    try {
      const response = await fetch(`${API_BASE_URL}/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
      if (!response.ok) {
        throw new Error('Failed to save log entry');
      }
      return await response.json();
    } catch (error) {
      console.error('Error saving logbook entry to server:', error);
      throw error;
    }
  }

  async getRecentLogEntries(limit: number = 50): Promise<LogbookEntry[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/logs?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch log entries');
      }
      const entries = await response.json();
      return entries.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
      }));
    } catch (error) {
      console.error('Error loading logbook entries from server:', error);
      return [];
    }
  }
}

export const logbookDatabase = new LogbookDatabase(); 