import express from 'express';
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Security Headers with Helmet
  // This protects against XSS, Clickjacking, and other common vulnerabilities
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https://qiye.aliyun.com", "https://picsum.photos", "https://img.alicdn.com"],
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for Vite
        "connect-src": ["'self'", "https://generativelanguage.googleapis.com"],
      },
    },
    crossOriginEmbedderPolicy: false, // Often interferes with external images
  }));

  // 2. Cloaking / Bot Detection
  app.use((req, res, next) => {
    const userAgent = req.headers['user-agent']?.toLowerCase() || '';
    const bots = ['googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot', 'sogou', 'exabot', 'facebot', 'ia_archiver'];
    
    if (bots.some(bot => userAgent.includes(bot))) {
      // Serve a generic maintenance page to bots
      return res.status(200).send(`
        <html>
          <head><title>System Maintenance</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>System Maintenance</h1>
            <p>We are currently performing scheduled maintenance. Please check back later.</p>
          </body>
        </html>
      `);
    }
    next();
  });

  // 3. Rate Limiting
  // Protects against DDoS and brute force attacks
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Service unavailable. Please try again later.',
  });
  app.use('/api/', limiter);

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', protected: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Security protections active: Helmet, Rate Limiting, CSP');
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
