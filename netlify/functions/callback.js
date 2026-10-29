// Callback endpoint for PoC pages: logs every hit (Netlify function logs) and answers 204.
// Deploy: `netlify deploy --prod` from this folder, then point PoC pages at /.netlify/functions/callback
exports.handler = async (event) => {
  const q = event.queryStringParameters || {};
  console.log(JSON.stringify({
    at: new Date().toISOString(),
    method: event.httpMethod,
    query: q,
    ua: event.headers['user-agent'],
    referer: event.headers.referer || null,
    body: (event.body || '').slice(0, 2000),
  }));
  return { statusCode: 204, body: '' };
};
