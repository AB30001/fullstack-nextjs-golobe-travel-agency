# Quick MongoDB Setup

## Option 1: MongoDB Atlas (Cloud - Recommended) 🌟

This is the **easiest** option and takes about 5 minutes:

### Steps:

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/atlas
   - Click "Try Free" or "Sign Up"

2. **Create Your Account**
   - Use your Google account or sign up with email
   - Verify your email

3. **Create a Free Cluster**
   - Select "Build a Database"
   - Choose "FREE" (M0 tier)
   - Select any cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region close to you
   - Click "Create Deployment"

4. **Set Up Database Access**
   - Go to "Database Access" (in the left menu)
   - Click "Add New Database User"
   - Username: `golobe_user` (or any name you like)
   - Password: Choose a secure password and **save it somewhere**!
   - Select "Atlas Admin" role
   - Click "Add User"

5. **Configure Network Access**
   - Go to "Network Access" (in the left menu)
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - Click "Confirm"

6. **Get Your Connection String**
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://...`)
   - Replace `<password>` with the password you created in step 4
   - Replace `<dbname>` with `golobe_travel_agency`

### Update Your .env.local File

Open `.env.local` in your project and update this line:

```env
MONGODB_URI=mongodb+srv://golobe_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/golobe_travel_agency?retryWrites=true&w=majority
```

Replace:
- `golobe_user` with your username
- `YOUR_PASSWORD` with your password
- The cluster address is already in the string

### Example:
```
MONGODB_URI=mongodb+srv://golobe_user:mypassword123@cluster0.abc123.mongodb.net/golobe_travel_agency?retryWrites=true&w=majority
```

---

## Option 2: Install MongoDB Locally 💻

If you prefer to run MongoDB on your computer:

### Steps for Windows:

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Choose:
     - Version: Latest (7.x or 8.x)
     - Platform: Windows
     - Package: MSI
   - Click "Download"

2. **Install MongoDB**
   - Run the downloaded .msi file
   - Click "Complete" installation
   - **IMPORTANT**: Check "Install MongoDB as a Service"
   - Check "Run service as Network Service user"
   - Install MongoDB Compass (optional, but recommended)

3. **Verify Installation**
   ```powershell
   mongosh --version
   ```
   
   If you see a version number, you're good!

4. **Start MongoDB Service**
   - Press `Win + R`
   - Type: `services.msc`
   - Press Enter
   - Find "MongoDB" in the list
   - Right-click → Start (if not running)

5. **Your .env.local is already configured correctly:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/golobe_travel_agency
   ```

---

## After Setting Up MongoDB

1. **Restart the development server:**
   ```powershell
   # Stop the current server (Ctrl+C if running)
   npm run dev
   ```

2. **The app should now connect to MongoDB**

3. **Generate sample data (optional):**
   ```powershell
   # Generate flights, hotels, and config data
   curl.exe -X POST http://localhost:5000/api/generate/flights/upload_db -H "Authorization: Bearer dev-api-secret-token-change-in-production"
   curl.exe -X POST http://localhost:5000/api/generate/hotels/upload_db -H "Authorization: Bearer dev-api-secret-token-change-in-production"
   curl.exe -X POST http://localhost:5000/api/generate/website_config -H "Authorization: Bearer dev-api-secret-token-change-in-production"
   ```

---

## Troubleshooting

### "Connection refused" Error
- **Atlas**: Make sure Network Access includes your IP address
- **Local**: Make sure MongoDB service is running (services.msc)

### "Authentication failed" Error
- Check your username and password in the connection string
- Make sure you replaced `<password>` with your actual password

### Still having issues?
Check:
1. The connection string format is correct
2. MongoDB service is running (for local) or cluster is active (for Atlas)
3. The .env.local file has the correct MONGODB_URI

---

## Quick Recommendation

**Use MongoDB Atlas** - it's free, takes 5 minutes, and you don't need to manage local services!

Good luck! 🚀

