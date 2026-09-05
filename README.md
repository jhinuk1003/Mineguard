# MineGuard

Welcome! To this amazing project for Mines.

## Getting Started

> **Prerequisites:**
> - [NodeJS](https://nodejs.org/en/) (v16 or higher)
> - Git

## Quick Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd MineGuard-1
   ```

2. **Run the setup script:**
   ```bash
   npm run setup
   ```
   This will:
   - Create a `.env` file from the template

3. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

4. **Configure environment variables:**
   Edit the `.env` file with your actual values:
   ```env
   # Civic Authentication
   VITE_CIVIC_APP_ID=your_civic_app_id_here
   VITE_CIVIC_AUTH_SERVER_URL=https://auth.civic.com

   # Server Configuration
   PORT=5001

   # Gemini AI Configuration
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

5. **Start the development environment:**
   ```bash
   npm run dev
   ```
   This will start:
   - Frontend (Vite) on http://localhost:5173
   - Backend (Express) on http://localhost:5001
   - Connected to MongoDB Atlas

## Available Scripts

- `npm run setup` - Initial project setup
- `npm run dev` - Start all services (frontend, backend)
- `npm run dev:setup` - Start all services (alias for dev)
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run install:all` - Install dependencies for both frontend and backend
- `npm run build` - Build the project for production

## Environment Configuration

The project uses a single `.env` file in the root directory for environment variables:

- **Civic Authentication**: Configure your Civic App ID and Auth Server URL
- **Server**: Configure the backend port
- **Gemini AI**: Set your Gemini API key for AI features

## MongoDB Setup

The project is configured to use **MongoDB Atlas** (cloud database) by default. The connection string is hardcoded in the server configuration, so no additional setup is required.

## Project Structure

```
MineGuard-1/
├── src/                    # Frontend React application
├── server/                 # Backend Express server
├── public/                 # Static assets
├── .env                    # Environment variables (create from env.example)
├── env.example            # Environment template
├── setup.js               # Setup script
└── package.json           # Root package.json with scripts
```

## Troubleshooting

### MongoDB Connection Issues
- The MongoDB Atlas connection is pre-configured
- If you encounter connection issues, check your internet connection
- The database will be automatically created when first accessed

### Port Conflicts
- Frontend runs on port 5173 (Vite default)
- Backend runs on port 5001 (configurable via `PORT` env var)

### Environment Variables
- Make sure all required environment variables are set in `.env`
- Copy `env.example` to `.env` if you haven't already
- Restart the development server after changing environment variables

## Deployment

### Option 1: Full Stack Deployment (Recommended)

To deploy with MongoDB connection, you need to run both the build and the server:

```bash
# Build the frontend
npm run build

# Start the production server (includes MongoDB connection)
npm run deploy:prod
```

Or use the combined command:
```bash
npm run deploy:prod
```

This will:
- Build the React app to `dist/` folder
- Start the Express server with MongoDB connection
- Serve the built frontend files
- Handle client-side routing

### Option 2: Frontend Only (Static Hosting)

If you only want to deploy the frontend (without backend/MongoDB):

```bash
npm run build
```

Then upload the `dist/` folder to a static hosting service (Netlify, Vercel, etc.).

**⚠️ Note:** This option will NOT connect to MongoDB - you'll need to deploy the backend separately or use a different database solution.

### Deployment Scripts

- `npm run build` - Build frontend only (no MongoDB connection)
- `npm run deploy` - Build frontend + start development server
- `npm run deploy:prod` - Build frontend + start production server with MongoDB
- `npm run start:prod` - Start production server only

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

```env
NODE_ENV=production
PORT=5001
VITE_CIVIC_APP_ID=your_civic_app_id_here
VITE_CIVIC_AUTH_SERVER_URL=https://auth.civic.com
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

The built files will be in the `dist/` directory.

For more detailed setup instructions, check the individual setup files:
- `CIVIC_SETUP.md` - Civic authentication setup
- `MONGODB_SETUP.md` - MongoDB configuration details
- `GEMINI_SETUP.md` - Gemini AI integration setup
