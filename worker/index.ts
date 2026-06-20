export interface Env {
  // Add your bindings here, e.g., KV Namespaces, D1 Databases, etc.
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Example API route
    if (url.pathname.startsWith('/api/hello')) {
      return new Response(JSON.stringify({ message: "Hello from Cloudflare Worker!" }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
