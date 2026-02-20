const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cors = require('cors'); // Import the CORS package

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

// CORS middleware configuration
const corsOptions = {
  origin: 'https://zipsy.co.uk', // Allow requests only from this domain (production use)
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-localization', 'X-software-id', 'latitude', 'longitude', 'zoneid'], // Allowed headers
  credentials: true, // Allow credentials (cookies, auth tokens)
};

app.prepare().then(() => {
  createServer((req, res) => {
    // Use the CORS middleware to handle OPTIONS requests and add CORS headers
    cors(corsOptions)(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});