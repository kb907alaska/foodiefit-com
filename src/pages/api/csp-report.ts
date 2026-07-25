import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type');
    if (contentType && (contentType.includes('application/json') || contentType.includes('application/csp-report'))) {
      const body = await request.json();
      const report = body['csp-report'] || body;
      
      console.warn('[CSP Violation Report Received]:', {
        documentUri: report['document-uri'],
        blockedUri: report['blocked-uri'],
        violatedDirective: report['violated-directive'] || report['effective-directive'],
        timestamp: new Date().toISOString()
      });
    }

    return new Response(JSON.stringify({ status: 'received' }), {
      status: 204,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ status: 'ignored' }), {
      status: 204,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
