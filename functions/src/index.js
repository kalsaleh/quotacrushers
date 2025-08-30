// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // In a real app, lock this down to your frontend's domain
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// The main fetch handler that routes requests
async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // API ROUTES
  if (path === '/api/health') {
    return handleHealthCheck();
  }
  if (path === '/api/auth/register' && request.method === 'POST') {
    return handleRegister(request, env);
  }
  // Add other routes here as needed...

  // If no route matches, return 404
  return new Response('Not Found', { status: 404, headers: corsHeaders });
}

// Route Handlers

function handleHealthCheck() {
  const healthStatus = {
    status: 'ok',
    message: 'Quota Crushers API is running',
    timestamp: new Date().toISOString()
  };
  return new Response(JSON.stringify(healthStatus), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleRegister(request, env) {
  try {
    const userData = await request.json();
    if (!userData.email || !userData.password) {
       return new Response('Email and password are required', { status: 400, headers: corsHeaders });
    }
    const userKey = `user:email:${userData.email}`;

    // Check if user already exists
    const existingUser = await env.SALES_DATA.get(userKey);
    if (existingUser) {
      return new Response('User already exists', { status: 409, headers: corsHeaders });
    }
    
    // Create the new user object
    const user = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In a real app, hash this password!
      role: userData.role || 'Sales Rep',
      team: userData.team || 'Default Team',
      createdAt: new Date().toISOString(),
    };

    // Store the user data
    await env.SALES_DATA.put(userKey, JSON.stringify(user));
    await env.SALES_DATA.put(`user:id:${user.id}`, JSON.stringify(user));
    
    // Don't send the password back to the client
    const userResponse = { ...user };
    delete userResponse.password;

    return new Response(JSON.stringify({ user: userResponse }), {
      status: 201, // 201 Created
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.log("Registration Error:", error);
    return new Response('Registration failed due to an internal error.', { status: 500, headers: corsHeaders });
  }
}


// The entry point for the Worker
export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env);
  }
};
