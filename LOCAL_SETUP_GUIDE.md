# Local Setup Guide - Golobe Travel Agency

## Quick Start

### Step 1: Verify Prerequisites ✅
- **Node.js**: ✅ Installed (v22.14.0)
- **npm**: ✅ Installed (v11.3.0)
- **Dependencies**: ✅ Installed

### Step 2: Set Up MongoDB

You need to choose one of these options:

#### Option A: Local MongoDB (Recommended for Development)

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Download the Windows version
   - Install it (accept all defaults)

2. **Start MongoDB Service**
   - Press `Win + R`, type `services.msc`, press Enter
   - Find "MongoDB" in the list
   - Right-click → Start (if not already running)

3. **Verify Installation**
   ```powershell
   mongosh
   ```
   If you see the MongoDB shell, you're all set!

#### Option B: MongoDB Atlas (Cloud - Free)

1. **Create Account**
   - Go to: https://www.mongodb.com/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Create a Deployment"
   - Choose "M0 Free" tier
   - Select any cloud provider and region
   - Click "Create"

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Update .env.local**
   ```powershell
   # Open .env.local and update MONGODB_URI
   notepad .env.local
   ```
   Change this line:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/golobe_travel_agency
   ```

### Step 3: Configure Other Services (Optional)

#### Stripe (for Payments)
1. Go to https://dashboard.stripe.com/
2. Sign up or log in
3. Get your test API keys from Developers → API keys
4. Update in `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_your_key_here
   NEXT_PUBLIC_STRIPE_PK=pk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

#### Mailjet (for Emails)
1. Go to https://www.mailjet.com/
2. Sign up for a free account
3. Get your API credentials from Account → API Keys
4. Update in `.env.local`:
   ```
   MAIL_API_TOKEN=your_api_token
   MAIL_SECRET_TOKEN=your_secret_token
   MAIL_SENDER_EMAIL=your-email@example.com
   ```

**Note**: Stripe and Mailjet are optional for local development. The app will run without them, but some features (payments, emails) won't work.

### Step 4: Start the Development Server

Once MongoDB is running:

```powershell
npm run dev
```

The app will start at: **http://localhost:5000**

### Step 5: Generate Sample Data (Optional)

After the server starts, you can generate sample data for testing:

Open a new terminal and run:

```powershell
# Generate flights
curl.exe -X POST http://localhost:5000/api/generate/flights/upload_db -H "Authorization: Bearer dev-api-secret-token-change-in-production"

# Generate hotels
curl.exe -X POST http://localhost:5000/api/generate/hotels/upload_db -H "Authorization: Bearer dev-api-secret-token-change-in-production"

# Generate website config
curl.exe -X POST http://localhost:5000/api/generate/website_config -H "Authorization: Bearer dev-api-secret-token-change-in-production"
```

Or use the browser:
1. Visit: http://localhost:5000/api/generate/flights/upload_db
2. Add custom header: `Authorization: Bearer dev-api-secret-token-change-in-production`

## Troubleshooting

### Port Already in Use
If you get an error about port 5000 being in use:
```powershell
# Find and kill the process
Get-NetTCPConnection -LocalPort 5000 | Select-Object OwningProcess
taskkill /F /PID <process_id>
```

### MongoDB Connection Error
- **Local MongoDB**: Make sure the MongoDB service is running (see Step 2)
- **Atlas**: Check your connection string and network access settings

### Dependencies Not Found
```powershell
npm install
```

### Module Errors
If you see errors about missing modules:
```powershell
npm install --legacy-peer-deps
```

## Current Environment Setup

✅ Dependencies installed
✅ Environment file created (.env.local)
✅ Ready to start MongoDB

### Next Steps:
1. Set up MongoDB (choose one: Local or Atlas)
2. Run `npm run dev`
3. Open http://localhost:5000

## Project Commands

```powershell
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run setup    # Run setup script (if needed)
npm test         # Run tests
```

## Development Server Info

- **URL**: http://localhost:5000
- **Database**: MongoDB (localhost or Atlas)
- **Auth**: NextAuth.js with MongoDB adapter
- **Styling**: Tailwind CSS
- **State**: Redux Toolkit

## Need Help?

- Check the [Getting Started Guide](docs/GETTING_STARTED.md) for more details
- Review the [README.md](README.md) for project overview
- MongoDB help: https://docs.mongodb.com/manual/installation/
- Next.js help: https://nextjs.org/docs

Happy coding! 🚀

