# Complete Beginner's Guide: How to Update Quota Crushers

## 🎯 What We're Going to Do
We're going to update your Quota Crushers app with the latest fixes so the "Failed to fetch" error goes away.

---

## STEP 1: OPEN YOUR TERMINAL/COMMAND PROMPT

### On Windows:
1. Press the **Windows key** (the one with the Windows logo) + **R** at the same time
2. A small box will appear
3. Type `cmd` and press **Enter**
4. A black window will open - this is your terminal

### On Mac:
1. Press **Cmd** + **Space** at the same time
2. Type `Terminal` 
3. Press **Enter**
4. A window will open - this is your terminal

### On Linux:
1. Press **Ctrl** + **Alt** + **T** at the same time
2. Terminal will open

---

## STEP 2: NAVIGATE TO YOUR PROJECT FOLDER

### If you're using StackBlitz (online):
- You're already in the right place! Skip to Step 3.

### If you downloaded the project to your computer:
1. In your terminal, you need to "go to" your project folder
2. Type `cd ` (that's "cd" followed by a space)
3. Then type the path to your project folder. For example:
   - Windows: `cd C:\Users\YourName\Downloads\sales-motivation-app`
   - Mac: `cd /Users/YourName/Downloads/sales-motivation-app`
   - Linux: `cd /home/YourName/Downloads/sales-motivation-app`
4. Press **Enter**

**How to find your path:**
- **Windows**: Open File Explorer, navigate to your project folder, click in the address bar, copy the path
- **Mac**: Open Finder, navigate to your project folder, right-click the folder, hold Option, click "Copy as Pathname"
- **Linux**: Open file manager, navigate to your project folder, copy the path from the address bar

---

## STEP 3: UPDATE THE API SERVICE FILE

1. **Find the file** `src/services/api.ts` in your project
2. **Open it** in any text editor (Notepad on Windows, TextEdit on Mac, or any code editor)
3. **Delete everything** in the file (select all with Ctrl+A or Cmd+A, then delete)
4. **Copy and paste** this entire code:

```typescript
// API service for communicating with Cloudflare Workers backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://sales-motivation-api.your-account.workers.dev' // Replace 'your-account' with your actual Cloudflare account subdomain
    : 'http://localhost:8787');

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log('🔗 Making API request to:', url);
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('📡 API Response status:', response.status);

      if (response.status === 401) {
        this.logout();
        throw new Error('Unauthorized - please log in again');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error:', errorText);
        throw new Error(errorText || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      console.error('🚨 Network Error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is deployed and the URL is correct.');
      }
      
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.token = response.token;
    localStorage.setItem('auth_token', this.token);
    return response;
  }

  async register(userData: any) {
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // If registration includes a token, store it for immediate login
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', this.token);
    }
    
    return response;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated() {
    return !!this.token;
  }

  // Goals
  async getGoals() {
    return this.request('/api/goals');
  }

  async createGoal(goalData: any) {
    return this.request('/api/goals', {
      method: 'POST',
      body: JSON.stringify(goalData),
    });
  }

  async updateGoal(id: string, goalData: any) {
    return this.request(`/api/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(goalData),
    });
  }

  // Activities
  async getActivities() {
    return this.request('/api/activities');
  }

  async createActivity(activityData: any) {
    return this.request('/api/activities', {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
  }

  // Challenges
  async getChallenges() {
    return this.request('/api/challenges');
  }

  async createChallenge(challengeData: any) {
    return this.request('/api/challenges', {
      method: 'POST',
      body: JSON.stringify(challengeData),
    });
  }

  // Google Sheets
  async syncGoogleSheets(config: any) {
    return this.request('/api/sheets/sync', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  // Leaderboard
  async getLeaderboard() {
    return this.request('/api/leaderboard');
  }
}

export const apiService = new ApiService();
```

5. **Save the file** (Ctrl+S or Cmd+S)

---

## STEP 4: UPDATE THE AUTH FORM FILE

1. **Find the file** `src/components/AuthForm.tsx` in your project
2. **Open it** in your text editor
3. **Find this part** (around line 30-35):
```typescript
} catch (err: any) {
  setError(err.message || 'Authentication failed');
}
```

4. **Replace it with**:
```typescript
} catch (err: any) {
  console.error('Authentication error:', err);
  setError(err.message || 'Authentication failed. Please check your connection and try again.');
}
```

5. **Save the file** (Ctrl+S or Cmd+S)

---

## STEP 5: CREATE ENVIRONMENT FILE

1. **In your main project folder** (not inside any subfolder), create a new file
2. **Name it exactly**: `.env` (yes, it starts with a dot!)
3. **Open the file** and add this line:
```
VITE_API_URL=https://sales-motivation-api.YOUR-ACCOUNT.workers.dev
```

**IMPORTANT**: Replace `YOUR-ACCOUNT` with your actual Cloudflare account name!

**How to find your account name:**
- Go to https://dash.cloudflare.com
- Look at the URL or your Worker URL
- It will be something like `https://sales-motivation-api.abc123.workers.dev`
- Your account name is the part before `.workers.dev` (like `abc123`)

4. **Save the file**

---

## STEP 6: REDEPLOY YOUR WORKER (BACKEND)

1. **In your terminal**, type this command and press Enter:
```bash
cd worker
```

2. **Deploy the worker** by typing this and pressing Enter:
```bash
wrangler deploy
```

3. **Wait for it to finish**. You should see something like:
```
Published sales-motivation-api (1.23s)
  https://sales-motivation-api.your-account.workers.dev
```

4. **Copy this URL** - you'll need it!

---

## STEP 7: TEST YOUR WORKER

1. **Open your web browser**
2. **Go to this URL** (replace with YOUR actual Worker URL):
```
https://sales-motivation-api.YOUR-ACCOUNT.workers.dev/api/health
```

3. **You should see**:
```json
{"status":"ok","message":"Sales Motivation API is running","timestamp":"2025-01-10T..."}
```

If you see this, your backend is working! 🎉

---

## STEP 8: UPDATE YOUR ENVIRONMENT FILE

1. **Go back to your `.env` file**
2. **Make sure the URL matches** the Worker URL from Step 6
3. **Save the file**

---

## STEP 9: RESTART YOUR FRONTEND

### If you're using StackBlitz:
- The page should automatically refresh

### If you're running locally:
1. **In your terminal**, go back to the main project folder:
```bash
cd ..
```

2. **Stop the current server** (if it's running) by pressing **Ctrl+C**

3. **Start the server again**:
```bash
npm run dev
```

4. **Wait for it to start**. You should see something like:
```
Local:   http://localhost:5173/
```

---

## STEP 10: TEST YOUR APP

1. **Open your browser**
2. **Go to your app** (the URL from Step 9 or your deployed Pages URL)
3. **Try creating an account** with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Role: Sales Rep
   - Team: Test Team

4. **If it works**, you'll see the dashboard! 🎉

---

## 🔍 IF SOMETHING GOES WRONG

### Check the Browser Console:
1. **Press F12** in your browser
2. **Click the "Console" tab**
3. **Look for error messages** (they'll be in red)
4. **Take a screenshot** and share it if you need help

### Common Issues:
- **"Cannot connect to server"**: Your Worker isn't deployed or the URL is wrong
- **"404 Not Found"**: Check your Worker URL is correct
- **"CORS error"**: Your Worker needs to be redeployed

---

## 🎉 SUCCESS!

If everything worked, your app should now:
- ✅ Let you create accounts without "Failed to fetch" errors
- ✅ Show helpful error messages if something goes wrong
- ✅ Connect properly to your backend

Your sales team can now use the app! 🚀