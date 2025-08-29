# Quick Start Guide

## 🚀 Deploy in 5 Minutes

### 1. Deploy Worker (Backend)
```bash
cd worker
npm install
wrangler login
wrangler kv:namespace create "SALES_DATA"
# Copy the ID and update worker/wrangler.toml
wrangler deploy
# Save the Worker URL that's displayed
```

### 2. Update Frontend Config
Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = 'https://quota-crushers-api.YOUR-ACCOUNT.workers.dev'
```

### 3. Deploy Frontend
1. Push to GitHub
2. Go to Cloudflare Pages
3. Connect repository
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy!

### 4. Test
Visit your Pages URL and create an account!

## 📋 What You Get
- ✅ User authentication
- ✅ Goal tracking
- ✅ Activity logging
- ✅ Team leaderboards
- ✅ Challenge system
- ✅ Admin dashboard
- ✅ Mobile-optimized UI

## 🔧 Optional: Google Sheets
1. Get Google Sheets API key
2. `wrangler secret put GOOGLE_SHEETS_API_KEY`
3. Configure in Admin panel

Done! Your sales team can now track goals and compete in challenges! 🎯