export type Env = Record<string, never>;

export default {
  async fetch(request: Request): Promise<Response> {
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
