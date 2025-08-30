# Quota Crushers - Sales Motivation Platform

//testingtesting123

Quota Crushers is a comprehensive sales motivation and tracking platform built with React and Cloudflare infrastructure.

## Architecture

- **Frontend**: React SPA hosted on Cloudflare Pages
- **Backend**: Cloudflare Workers for API endpoints
- **Database**: Cloudflare KV for data persistence
- **File Storage**: Cloudflare R2 for uploads
- **Authentication**: JWT-based auth with KV storage

## Features

- 🎯 Goal tracking and progress visualization
- 📊 Activity logging (calls, meetings, emails, deals)
- 🏆 Team leaderboards and challenges
- 🎮 Gamification with badges and rewards
- 📱 Mobile-first responsive design
- 🔗 Google Sheets integration
- 👥 Team and individual challenges
- ⚔️ Peer-to-peer duels
- 🔐 User authentication and authorization

## Setup Instructions

### 1. Cloudflare Workers Setup

Navigate to the worker directory:
```bash
cd worker
```

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Create KV namespace:
   ```bash
   wrangler kv:namespace create "SALES_DATA"
   wrangler kv:namespace create "SALES_DATA" --preview
   ```

4. Create R2 bucket:
   ```bash
   wrangler r2 bucket create sales-uploads
   ```

5. Update `worker/wrangler.toml` with your namespace IDs

6. Deploy the Worker:
   ```bash
   npm install
   wrangler deploy
   ```

### 2. Environment Variables

Set these in your Cloudflare Workers dashboard:

- `GOOGLE_SHEETS_API_KEY`: Your Google Sheets API key
- `JWT_SECRET`: Secret for JWT token signing
- `CORS_ORIGIN`: Your frontend domain

### 3. Cloudflare Pages Setup

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `dist`
4. Add environment variables:
   - `VITE_API_URL`: Your Worker URL

### 4. Google Sheets Integration

1. Enable Google Sheets API in Google Cloud Console
2. Create API credentials
3. Add the API key to your Worker environment variables

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Start the Worker locally:
   ```bash
   wrangler dev
   ```

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/goals` - Get user goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/:id` - Update goal
- `GET /api/activities` - Get user activities
- `POST /api/activities` - Log new activity
- `GET /api/challenges` - Get challenges
- `POST /api/challenges` - Create challenge
- `POST /api/sheets/sync` - Sync Google Sheets data
- `GET /api/leaderboard` - Get team leaderboard

## Deployment

The application automatically deploys when you push to your main branch:

1. **Frontend**: Deployed to Cloudflare Pages
2. **Backend**: Deployed to Cloudflare Workers
3. **Database**: Cloudflare KV (automatically provisioned)

## Security Features

- JWT-based authentication
- CORS protection
- Input validation
- Rate limiting (configurable)
- Secure password handling

## Mobile Optimization

- Touch-friendly interface
- Responsive design
- Offline capability (service worker)
- Fast loading with edge caching
- Progressive Web App features