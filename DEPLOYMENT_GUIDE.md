# Complete Deployment Guide - Quota Crushers App

## Prerequisites
- Cloudflare account (free tier works)
- GitHub account
- Node.js installed locally

## Step 1: Set Up Cloudflare Workers (Backend)

### 1.1 Install Wrangler CLI
```bash
npm install -g wrangler
```

### 1.2 Login to Cloudflare
```bash
wrangler login
```
This will open a browser window to authenticate with Cloudflare.

### 1.3 Navigate to Worker Directory
```bash
cd worker
```

### 1.4 Install Worker Dependencies
```bash
npm install
```

### 1.5 Create KV Namespace for Data Storage
```bash
wrangler kv:namespace create "SALES_DATA"
```

You'll get output like:
```
{ binding = "SALES_DATA", id = "abc123def456", preview_id = "xyz789uvw012" }
```

### 1.6 Update wrangler.toml with Your KV Namespace ID
Edit `worker/wrangler.toml` and replace `your-kv-namespace-id` with the actual ID from step 1.5:

```toml
[[env.production.kv_namespaces]]
binding = "SALES_DATA"
id = "abc123def456"  # Replace with your actual ID

[[env.development.kv_namespaces]]
binding = "SALES_DATA"
id = "xyz789uvw012"  # Replace with your actual preview_id
```

### 1.7 Deploy the Worker
```bash
wrangler deploy
```

You'll get output like:
```
Published sales-motivation-api (1.23s)
  https://sales-motivation-api.your-account.workers.dev
```

**Save this URL - you'll need it for the frontend!**

## Step 2: Set Up Google Sheets Integration (Optional)

### 2.1 Enable Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Create credentials (API Key)

### 2.2 Add API Key to Worker
```bash
wrangler secret put GOOGLE_SHEETS_API_KEY
```
Enter your Google Sheets API key when prompted.

## Step 3: Update Frontend Configuration

### 3.1 Update API URL
Edit `src/services/api.ts` and replace the API_BASE_URL:

```typescript
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://sales-motivation-api.your-account.workers.dev'  // Replace with your Worker URL
  : 'http://localhost:8787';
```

## Step 4: Deploy Frontend to Cloudflare Pages

### 4.1 Push Code to GitHub
1. Create a new GitHub repository
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/sales-motivation-app.git
git push -u origin main
```

### 4.2 Connect to Cloudflare Pages
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click "Pages" in the sidebar
3. Click "Create a project"
4. Click "Connect to Git"
5. Select your GitHub repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)

### 4.3 Add Environment Variables (Optional)
In Cloudflare Pages settings, add:
- `VITE_API_URL`: Your Worker URL from Step 1.7

### 4.4 Deploy
Click "Save and Deploy"

Your app will be available at: `https://your-project-name.pages.dev`

## Step 5: Test Your Application

### 5.1 Create Test Account
1. Visit your Cloudflare Pages URL
2. Click "Create Account"
3. Fill in test user details:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Team: Sales Team

### 5.2 Test Core Features
- ✅ Login/logout functionality
- ✅ Create and track goals
- ✅ Log activities (calls, meetings, deals)
- ✅ View dashboard metrics
- ✅ Check leaderboard
- ✅ Create challenges

## Step 6: Configure Google Sheets (Optional)

### 6.1 Create Test Spreadsheet
1. Create a Google Sheet with columns:
   - Column A: User ID
   - Column B: Metric (calls, meetings, deals, revenue)
   - Column C: Value
   - Column D: Date

### 6.2 Make Sheet Public
1. Click "Share" in Google Sheets
2. Change to "Anyone with the link can view"
3. Copy the Sheet ID from URL

### 6.3 Test Integration
1. Go to Admin → Google Sheets tab
2. Enter your Sheet ID
3. Configure column mappings
4. Click "Test Connection"

## Troubleshooting

### Worker Issues
- **"Missing entry-point" error**: Make sure you're in the `worker` directory when running `wrangler deploy`
- **KV namespace errors**: Verify the namespace ID in `wrangler.toml` matches the one created
- **CORS errors**: Check that your frontend URL is added to CORS_ORIGIN in worker environment

### Pages Issues
- **Build failures**: Check that `npm run build` works locally
- **API connection issues**: Verify the API URL in `src/services/api.ts` matches your Worker URL
- **Authentication issues**: Clear browser storage and try creating a new account

### Google Sheets Issues
- **API errors**: Verify your API key is correct and has Sheets API enabled
- **Permission errors**: Make sure the sheet is publicly accessible

## Production Considerations

### Security
- Change default passwords
- Add rate limiting
- Implement proper JWT secret rotation
- Add input validation

### Performance
- Enable Cloudflare caching
- Optimize images
- Add service worker for offline functionality

### Monitoring
- Set up Cloudflare Analytics
- Monitor Worker usage and KV operations
- Set up error tracking

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Cloudflare Workers logs in the dashboard
3. Verify all environment variables are set correctly
4. Test API endpoints directly using curl or Postman

Your sales motivation app should now be fully functional and accessible to your team!