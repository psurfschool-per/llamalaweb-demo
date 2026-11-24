/**
 * Servidor estático de producción (sirve `dist/`).
 *
 * Motivo: `astro preview` no aplica los plugins del usuario (dentro de Astro la
 * config `vite.preview` tampoco acepta cabeceras por ruta), así que este
 * servidor pequeño nos deja controlar:
 *   - Redirección 301 HTTP -> HTTPS (petición llegada con X-Forwarded-Proto: http).
 *   - Cabecera HSTS para que el navegador exija HTTPS.
 *   - Cache-Control: inmutable (1 año) para /_astro/ (assets con hash) y
 *     imágenes; sin caché para el HTML y el sitemap.
 *   - Last-Modified + 304 para revalidar el HTML sin re-descargarlo.
 *   - 404 con la página `dist/404.html` si existe.
 */
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

function cacheControlFor(urlPath) {
  if (urlPath.startsWith("/_astro/")) {
    return "public, max-age=31536000, immutable";
  }
  if (/\.(png|jpe?g|webp|avif|svg|ico|woff2?)$/.test(urlPath)) {
    // Estáticos sin hash: 1 año. Si cambias una imagen, renómbrala
    // (p. ej. `camden-v2.jpg`) o purga la caché en Cloudflare.
    return "public, max-age=31536000";
  }
  if (/\.(xml|txt|webmanifest)$/.test(urlPath)) {
    return "public, max-age=3600";
  }
  return "no-cache";
}

function securityHeaders(res) {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
}

function redirectHttps(req, res) {
  const host = req.headers.host || "llamalaweb.com";
  securityHeaders(res);
  res.writeHead(301, { Location: `https://${host}${req.url || "/"}` });
  res.end();
}

async function sendFile(req, res, filePath, urlPath, stat) {
  const ext = path.extname(filePath).toLowerCase();
  const lastModified = stat.mtime.toUTCString();

  securityHeaders(res);
  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  res.setHeader("Cache-Control", cacheControlFor(urlPath));
  res.setHeader("Last-Modified", lastModified);

  const ifModifiedSince = req.headers["if-modified-since"];
  if (ifModifiedSince && new Date(ifModifiedSince).getTime() >= stat.mtime.getTime() - 1000) {
    res.writeHead(304);
    res.end();
    return;
  }

  res.setHeader("Content-Length", stat.size);
  res.writeHead(200);

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  const stream = (await import("node:fs")).createReadStream(filePath);
  stream.pipe(res);
  stream.on("error", () => res.destroy());
}

async function send404(req, res) {
  securityHeaders(res);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  const page = path.join(ROOT, "404.html");
  try {
    const body = await fs.readFile(page);
    res.setHeader("Content-Length", body.length);
    res.writeHead(404);
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    const body = Buffer.from(
      '<!doctype html><html lang="es"><meta charset="utf-8"><title>404</title>' +
        '<body style="font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0">' +
        "<div><h1>404</h1><p>Página no encontrada.</p><p><a href='/'>Volver al inicio</a></p></div></body></html>",
    );
    res.setHeader("Content-Length", body.length);
    res.writeHead(404);
    res.end(req.method === "HEAD" ? undefined : body);
  }
}

const server = createServer(async (req, res) => {
  try {
    if (req.headers["x-forwarded-proto"] === "http") {
      redirectHttps(req, res);
      return;
    }

    let urlPath;
    try {
      urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    } catch {
      urlPath = "/";
    }
    if (!urlPath.startsWith("/")) urlPath = `/${urlPath}`;

    // Evita salir de dist/ (..%2f, rutas raras).
    const candidate = path.normalize(path.join(ROOT, urlPath));
    if (!candidate.startsWith(ROOT)) {
      await send404(req, res);
      return;
    }

    const candidates = urlPath.endsWith("/")
      ? [path.join(candidate, "index.html")]
      : [candidate, path.join(candidate, "index.html")];

    for (const file of candidates) {
      try {
        const stat = await fs.stat(file);
        if (stat.isFile()) {
          await sendFile(req, res, file, urlPath, stat);
          return;
        }
      } catch {
        // siguiente candidato
      }
    }

    await send404(req, res);
  } catch (err) {
    securityHeaders(res);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Error interno");
    console.error("[serve]", err);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[serve] dist/ escuchando en http://${HOST}:${PORT}`);
});
