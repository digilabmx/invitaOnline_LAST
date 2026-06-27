import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Serve static assets with explicit mime types in production
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "preview") {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Explicitly define mime-types for static files to prevent browser-side blocking
    express.static.mime.define({
      'image/webp': ['webp'],
      'image/jpeg': ['jpg', 'jpeg'],
      'image/png': ['png'],
      'image/svg+xml': ['svg'],
      'text/css': ['css'],
      'application/javascript': ['js']
    });

    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.webp')) {
          res.setHeader('Content-Type', 'image/webp');
        } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
          res.setHeader('Content-Type', 'image/jpeg');
        }
      }
    }));

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // In development mode, mount Vite middleware to serve index.html and assets
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
