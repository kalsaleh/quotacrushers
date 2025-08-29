# Step-by-Step Worker Deployment Guide

## Prerequisites ✅
- Cloudflare account (free tier works)
- Wrangler CLI installed globally
- Logged into Cloudflare via Wrangler

## Step 1: Navigate to Worker Directory
```bash
cd worker
```

## Step 2: Install Dependencies
```bash
npm install
```
This installs the `itty-router` package for handling API routes.

## Step 3: Login to Cloudflare (if not done already)
```bash
wrangler login
```
This opens your browser to authenticate with Cloudflare.

## Step 4: Create KV Namespace for Data Storage
```bash
wrangler kv:namespace create "SALES_DATA"
```

**Expected Output:**
```
{ binding = "SALES_DATA", id = "abc123def456", preview_id = "xyz789uvw012" }
```

**IMPORTANT:** Copy the `id` value (e.g., `abc123def456`) - you'll need it in the next step!

## Step 5: Update wrangler.toml with Your KV Namespace ID

Open `worker/wrangler.toml` and replace `your-kv-namespace-id` with the actual ID from Step 4:

```toml
[[env.production.kv_namespaces]]
binding = "SALES_DATA"
id = "abc123def456"  # Replace with your actual ID

[[env.development.kv_namespaces]]
binding = "SALES_DATA"
id = "xyz789uvw012"  # Replace with your actual preview_id
```

## Step 6: Test Worker Locally (Optional)
**Note:** `wrangler dev` is not supported in StackBlitz WebContainer. Skip this step and proceed directly to deployment.

## Step 7: Deploy to Production
```bash
wrangler deploy
```

**Expected Output:**
```
Published quota-crushers-api (1.23s)
  https://quota-crushers-api.your-account.workers.dev
```

**IMPORTANT:** Copy this URL - you'll need it for the frontend!

## Step 8: Test Your Deployed Worker

Test the health endpoint:
```bash
curl https://sales-motivation-api.your-account.workers.dev/api/health
```

Expected response:
```json
{"status":"ok","message":"Sales Motivation API is running"}
```

## Step 9: Set Up Google Sheets API (Optional)

If you want Google Sheets integration:

```bash
wrangler secret put GOOGLE_SHEETS_API_KEY
```

Enter your Google Sheets API key when prompted.

## Step 10: Update Frontend Configuration

In your main project, update `src/services/api.ts`:

Replace `your-account` with your actual Cloudflare account subdomain from the Worker URL.

## Verification Checklist ✅

- [ ] Worker deployed successfully
- [ ] KV namespace created and configured
- [ ] API health endpoint responds
- [ ] Worker URL copied for frontend
- [ ] Google Sheets API key set (if using)

## Common Issues & Solutions

### Issue: "Missing entry-point" error
**Solution:** Make sure you're in the `worker` directory when running commands.

### Issue: KV namespace not found
**Solution:** Double-check the namespace ID in `wrangler.toml` matches the one from `wrangler kv:namespace create`.

### Issue: CORS errors
**Solution:** The Worker includes CORS headers. Make sure your frontend URL is correct.

## Next Steps

Once your Worker is deployed:
1. Update the frontend API URL
2. Deploy the frontend to Cloudflare Pages
3. Test the complete application

Your backend is now live and ready to handle:
- User authentication
- Goal tracking
- Activity logging
- Challenge management
- Google Sheets integration
- Real-time leaderboards