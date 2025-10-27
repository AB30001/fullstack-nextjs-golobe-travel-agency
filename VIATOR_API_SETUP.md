# Viator API Setup Guide

## How to Get Your Viator API Key

### Step 1: Sign Up for Viator Partner Account

1. **Visit Viator Partner Portal**
   - Go to: https://www.viator.com/affiliate
   - Click "Partner with Viator" or "Sign Up"

2. **Create Your Account**
   - Fill in your business information
   - Agree to partner terms
   - Complete verification

### Step 2: Get Your API Credentials

1. **Log into Partner Center**
   - Go to: https://www.viator.com/affiliates
   - Log in with your partner credentials

2. **Navigate to API Section**
   - Look for "API" or "Developers" section
   - Click on "API Keys" or "Credentials"

3. **Generate API Key**
   - Request a new API key if you don't have one
   - Copy your API key (keep it secure!)

### Step 3: Add to Environment File

1. **Open `.env.local` in your project**
   ```bash
   notepad .env.local
   ```

2. **Find the line with VIATOR_API_KEY and replace it:**
   ```env
   VIATOR_API_KEY=your_actual_api_key_here
   ```

3. **Save the file**

### Step 4: Restart Your Development Server

1. **Stop the server** (Ctrl+C if running)

2. **Start again:**
   ```bash
   npm run dev
   ```

### Step 5: Import Real Viator Data

Once your API key is set up, you can import real Nordic tours:

```powershell
# This will fetch real Viator data
curl.exe -X POST http://localhost:5000/api/viator/import -H "Authorization: Bearer dev-api-secret-token-change-in-production" -H "Content-Type: application/json" -d '{"maxPerCountry": 30, "clearExisting": true}'
```

### What You'll Get

When you import from Viator API, you'll get:
- ✅ **Real tour data** with actual prices from Viator
- ✅ **Full descriptions** and itineraries
- ✅ **Real images** from Viator
- ✅ **Actual ratings and reviews**
- ✅ **Live booking links** (affiliate links)
- ✅ **150 Nordic tours** (30 per country)

### Alternative: Use Without API Key

If you don't have a Viator API key yet, the site currently uses **realistic mock data** that mimics real tours. You can:

1. Continue developing with mock data
2. Get Viator API credentials for production
3. Switch to real data later

### Need Help?

- **Viator API Documentation**: https://docs.viator.com/partner-api/partner-api-reference
- **Partner Support**: Contact Viator affiliate team
- **Testing**: Use test credentials if provided by Viator

---

**Note**: The Viator API key is required to fetch real-time tour data. Without it, you'll continue using the mock data generator.

