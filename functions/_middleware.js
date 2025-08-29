// Cloudflare Pages Functions middleware
export async function onRequest(context) {
  // Add CORS headers for API routes
  if (context.request.url.includes('/api/')) {
    const response = await context.next();
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }
  
  return context.next();
}