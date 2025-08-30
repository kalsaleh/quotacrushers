// Cloudflare Worker for Sales Motivation API - Full Application Logic with Native Routing

// --- HELPER FUNCTIONS (from your original code) ---

// CORS headers for all responses
function getCorsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.CORS_ORIGIN || '*', 
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

// Authentication middleware
async function authenticate(request, env) {
  const corsHeaders = getCorsHeaders(env);
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401, headers: corsHeaders });
  }
  
  const token = authHeader.substring(7);
  const userJson = await env.SALES_DATA.get(`user:${token}`);
  
  if (!userJson) {
    return new Response('Invalid token', { status: 401, headers: corsHeaders });
  }
  
  request.user = JSON.parse(userJson);
  return null; 
}

// Helper function to update goal progress
async function updateGoalProgress(env, userId, activity) {
  try {
    const goalsData = await env.SALES_DATA.get(`goals:${userId}`);
    if (!goalsData) return;
    
    const goals = JSON.parse(goalsData);
    let updated = false;
    
    goals.forEach(goal => {
      if (goal.category === activity.type) {
        if (activity.type === 'deal' && activity.value) {
          goal.current += activity.value;
        } else {
          goal.current += 1;
        }
        updated = true;
      }
    });
    
    if (updated) {
      await env.SALES_DATA.put(`goals:${userId}`, JSON.stringify(goals));
    }
  } catch (error) {
    console.error('Failed to update goal progress:', error);
  }
}


// --- MAIN WORKER LOGIC ---

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = getCorsHeaders(env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // --- PUBLIC ROUTES ---

    if (path === '/api/health' && request.method === 'GET') {
      const healthStatus = {
        status: 'ok',
        message: 'Sales Motivation API is running',
        timestamp: new Date().toISOString()
      };
      return new Response(JSON.stringify(healthStatus), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/auth/login' && request.method === 'POST') {
      try {
        const { email, password } = await request.json();
        const userKey = `user:email:${email}`;
        const userData = await env.SALES_DATA.get(userKey);
        
        if (!userData) return new Response('User not found', { status: 404, headers: corsHeaders });
        
        const user = JSON.parse(userData);
        if (user.password !== password) return new Response('Invalid password', { status: 401, headers: corsHeaders });
        
        const token = btoa(`${email}:${Date.now()}`);
        await env.SALES_DATA.put(`user:${token}`, JSON.stringify(user), { expirationTtl: 86400 });
        
        delete user.password;
        return new Response(JSON.stringify({ token, user }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error("Login Error:", error); // Added logging
        return new Response('Login failed', { status: 500, headers: corsHeaders });
      }
    }

    if (path === '/api/auth/register' && request.method === 'POST') {
       try {
        const userData = await request.json();
        const userKey = `user:email:${userData.email}`;
        
        if (await env.SALES_DATA.get(userKey)) {
            return new Response('User already exists', { status: 409, headers: corsHeaders });
        }
        
        const user = { id: crypto.randomUUID(), ...userData, createdAt: new Date().toISOString(), role: 'rep' };
        
        await env.SALES_DATA.put(userKey, JSON.stringify(user));
        await env.SALES_DATA.put(`user:id:${user.id}`, JSON.stringify(user));
        
        delete user.password;
        return new Response(JSON.stringify({ user }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error("Registration Error:", error); // Added logging
        return new Response('Registration failed', { status: 500, headers: corsHeaders });
      }
    }

    // --- AUTHENTICATED ROUTES ---
    const authError = await authenticate(request, env);
    if (authError) return authError; 

    const user = request.user;

    if (path === '/api/goals' && request.method === 'GET') {
      const goalsData = await env.SALES_DATA.get(`goals:${user.id}`);
      const goals = goalsData ? JSON.parse(goalsData) : [];
      return new Response(JSON.stringify(goals), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
    }

    if (path === '/api/goals' && request.method === 'POST') {
      const goalData = await request.json();
      const goal = { id: crypto.randomUUID(), ...goalData, userId: user.id, createdAt: new Date().toISOString() };
      const goalsData = await env.SALES_DATA.get(`goals:${user.id}`);
      const goals = goalsData ? JSON.parse(goalsData) : [];
      goals.push(goal);
      await env.SALES_DATA.put(`goals:${user.id}`, JSON.stringify(goals));
      return new Response(JSON.stringify(goal), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
    }
    
    // Default "Not Found" for all other requests
    return new Response('Not Found', {
      status: 404,
      headers: corsHeaders,
    });
  }
};

