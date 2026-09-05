# MongoDB Setup for MineGuard

This guide explains how to set up MongoDB for the MineGuard application.

## Prerequisites

1. **MongoDB Installation**: Install MongoDB on your system or use MongoDB Atlas (cloud service)
2. **Node.js**: Ensure Node.js is installed (already included in project dependencies)

## Setup Options

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Edition**:
   - [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your operating system
   - Start MongoDB service

2. **Default Connection**:
   - The app will automatically connect to `mongodb://localhost:27017/mineguard`
   - No additional configuration needed

### Option 2: MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account
   - Create a new cluster

2. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Configure Environment Variables**:
   Create a `.env` file in the project root:
   ```env
   VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mineguard?retryWrites=true&w=majority
   VITE_CIVIC_APP_ID=your_civic_app_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

## Database Collections

The application automatically creates the following collections:

- **`scans`**: Equipment scan sessions and results
- **`logbook_entries`**: Maintenance logs and safety reports
- **`ocr_scans`**: OCR document scans and extracted text

## Database Indexes

The following indexes are automatically created for optimal performance:

### Scans Collection
- `timestamp` (descending) - For recent scans queries
- `id` (unique) - For individual scan lookups
- `overallPassed` - For filtering passed/failed scans
- `workerName` - For worker-specific queries

### Logbook Entries Collection
- `date` (descending) - For recent entries queries
- `id` (unique) - For individual entry lookups
- `type` - For filtering by entry type
- `operator` - For operator-specific queries

### OCR Scans Collection
- `timestamp` (descending) - For recent scans queries
- `id` (unique) - For individual scan lookups
- `filename` - For filename-based queries
- `extractedText` (text index) - For full-text search

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/mineguard` |
| `VITE_CIVIC_APP_ID` | Civic authentication app ID | `67d7e55d-719e-42b5-859a-ab4dfae9de62` |
| `VITE_GEMINI_API_KEY` | Gemini AI API key | (empty) |

## Testing the Connection

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Check browser console** for connection messages:
   - "Connected to MongoDB successfully" - Connection successful
   - "Database indexes created successfully" - Indexes created
   - "Database initialized successfully" - Full initialization complete

3. **Database Health Check**:
   The application includes a health check function that can be called to verify database status.

## Troubleshooting

### Connection Issues

1. **MongoDB not running**:
   - Start MongoDB service: `sudo systemctl start mongod` (Linux)
   - Or start MongoDB manually from installation directory

2. **Wrong connection string**:
   - Verify your MongoDB URI format
   - Check username/password for Atlas connections
   - Ensure network access is configured for Atlas

3. **Port conflicts**:
   - Default MongoDB port is 27017
   - Check if another service is using this port

### Performance Issues

1. **Slow queries**:
   - Ensure indexes are created (check console logs)
   - Monitor query performance in MongoDB Compass

2. **Connection pool exhaustion**:
   - Adjust `maxPoolSize` in configuration if needed
   - Default is 10 connections

## Migration from LocalStorage

The application now uses MongoDB instead of localStorage. Existing localStorage data will be preserved but not automatically migrated. To migrate data:

1. Export localStorage data (if needed)
2. The new MongoDB collections will start fresh
3. Future data will be stored in MongoDB

## Security Considerations

1. **Production Deployment**:
   - Use MongoDB Atlas or secure MongoDB instance
   - Enable authentication
   - Use SSL/TLS connections
   - Configure network access restrictions

2. **Environment Variables**:
   - Never commit `.env` files to version control
   - Use secure environment variable management in production

3. **Database Access**:
   - Use read-only users for reporting
   - Implement proper user roles and permissions

## Support

For MongoDB-specific issues:
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Community Forums](https://developer.mongodb.com/community/forums/) 