# Civic Authentication Setup Guide

This guide will help you set up Civic authentication for your MineGuard application.

## Prerequisites

1. A Civic developer account
2. Your Civic App ID
3. Node.js and npm installed

## Environment Configuration

1. Create a `.env` file in the root directory of your project:

```bash
# Civic Authentication Configuration
VITE_CIVIC_APP_ID=your_civic_app_id_here
VITE_CIVIC_AUTH_SERVER_URL=https://auth.civic.com
VITE_CIVIC_REDIRECT_URL=http://localhost:5173
```

2. Replace the values with your actual Civic credentials:
   - `your_civic_app_id_here`: Your Civic App ID
   - `VITE_CIVIC_REDIRECT_URL`: Your application's URL (use `http://localhost:5173` for development)

## Redirect URL Configuration

### Development Environment
For local development, use:
```bash
VITE_CIVIC_REDIRECT_URL=http://localhost:5173
```

### Production Environment
For production deployment, use your actual domain:
```bash
VITE_CIVIC_REDIRECT_URL=https://yourdomain.com
```

### Civic Developer Portal Setup
1. Go to your Civic Developer Portal
2. Navigate to your application settings
3. Add the following redirect URLs:
   - `http://localhost:5173` (for development)
   - `https://yourdomain.com` (for production)
4. Save the changes

## Getting Your Civic App ID

1. Go to [Civic Developer Portal](https://developer.civic.com)
2. Sign up or log in to your account
3. Create a new application
4. Copy the App ID from your application dashboard
5. Add the App ID to your `.env` file

## Features Implemented

### ✅ Login Page
- Beautiful Civic-themed login interface
- Secure authentication flow using `signIn()` function
- Error handling and loading states
- Civic Identity verification benefits display

### ✅ Dashboard Navigation
- User profile display with Civic verification badge
- Enhanced dropdown menu with user details
- Logout functionality using `signOut()` function
- Civic user information integration

### ✅ Dashboard Page
- Welcome message with user name
- Civic verification status display
- User email and identity information
- Secure authentication indicators

## How It Works

1. **Authentication Flow**: Users click "Continue with Civic" → `signIn()` → Redirect to Civic → Back to your app → Dashboard
2. **User Data**: Civic provides user information including name, email, and avatar
3. **Verification**: Users get a green verification badge when authenticated
4. **Logout**: Users can logout using the profile dropdown menu → `signOut()`

## API Usage

The application uses the Civic Auth React hooks:

```typescript
import { useUser } from "@civic/auth/react";

// In your component
const { user, signIn, signOut } = useUser();

// To sign in
await signIn();

// To sign out
await signOut();

// Access user data
console.log(user.name, user.email, user.avatar);
```

## Security Features

- ✅ Blockchain-based identity verification
- ✅ Zero-knowledge proof technology
- ✅ Decentralized authentication
- ✅ Privacy-preserving authentication
- ✅ Enhanced security for mining operations

## Troubleshooting

### Common Issues

1. **"Login failed" error**
   - Check your Civic App ID in the `.env` file
   - Ensure your Civic application is properly configured
   - Verify your redirect URL is correct and added to Civic Developer Portal
   - Verify your internet connection

2. **Redirect URL mismatch error**
   - Make sure the redirect URL in your `.env` file matches exactly what's configured in Civic Developer Portal
   - For development: `http://localhost:5173`
   - For production: `https://yourdomain.com`

3. **User not showing as verified**
   - Make sure you're using the Civic authentication flow
   - Check that the Civic user data is being received properly

4. **Environment variables not loading**
   - Restart your development server after adding the `.env` file
   - Ensure the `.env` file is in the root directory
   - Check that variable names start with `VITE_`

5. **Import errors**
   - Make sure you're using the correct imports: `import { useUser } from "@civic/auth/react"`
   - The `useUser` hook provides `user`, `signIn`, and `signOut`

## Development

To run the application in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Production Deployment

1. Set up your environment variables in your production environment:
   ```bash
   VITE_CIVIC_APP_ID=your_production_app_id
   VITE_CIVIC_AUTH_SERVER_URL=https://auth.civic.com
   VITE_CIVIC_REDIRECT_URL=https://yourdomain.com
   ```

2. Add your production redirect URL to Civic Developer Portal
3. Build the application: `npm run build`
4. Deploy the built files to your hosting provider

## Support

For Civic authentication issues:
- [Civic Documentation](https://docs.civic.com)
- [Civic Developer Portal](https://developer.civic.com)

For MineGuard application issues:
- Check the console for error messages
- Verify your environment configuration
- Ensure all dependencies are installed 