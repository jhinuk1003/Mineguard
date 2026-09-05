// Environment configuration for MineGuard
export const config = {
  // Database Configuration (IndexedDB)
  database: {
    name: 'mineguard',
    version: 1,
    collections: {
      scans: 'scans',
      logbookEntries: 'logbook_entries',
      ocrScans: 'ocr_scans',
      coalBatches: 'coal_batches'
    }
  },

  // Civic Authentication
  civic: {
    appId: import.meta.env.VITE_CIVIC_APP_ID || "67d7e55d-719e-42b5-859a-ab4dfae9de62",
    cluster: import.meta.env.VITE_CIVIC_CLUSTER || "mainnet-beta",
    gatekeeperNetwork: import.meta.env.VITE_CIVIC_GATEKEEPER_NETWORK || "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6"
  },

  // Gemini AI
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  },

  // QR Tracking Configuration
  qrTracking: {
    enabled: true,
    defaultQuality: 'Standard',
    maxWeight: 1000, // tons
    supportedQualities: ['Premium', 'Standard', 'Low'],
    pdfTemplate: import.meta.env.VITE_PDF_TEMPLATE_URL || '/templates/batch-report.html'
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'MineGuard',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.MODE || 'development'
  }
};

// Helper function to check if running in development
export const isDevelopment = (): boolean => {
  return config.app.environment === 'development';
};

// Helper function to check if running in production
export const isProduction = (): boolean => {
  return config.app.environment === 'production';
};

// Helper function to get database name
export const getDatabaseName = (): string => {
  return config.database.name;
};

// Helper function to get database version
export const getDatabaseVersion = (): number => {
  return config.database.version;
}; 