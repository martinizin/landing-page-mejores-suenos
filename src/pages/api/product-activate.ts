import type { APIRoute } from 'astro';
export const prerender = false;
export const post: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};