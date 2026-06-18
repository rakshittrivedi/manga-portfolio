/**
 * Production server — serves the React SPA + /api/contact endpoint.
 * Used inside Docker (Render, Hostinger, or any container host).
 */

require('dotenv').config()
const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 8080
const DIST = path.join(__dirname, 'dist')

// MIME types for static assets
const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
}

// Load the contact handler (CommonJS)
const contactHandler = require('./api/contact')

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)

  // ── API route ──────────────────────────────────────────────────────────────
  if (url.pathname === '/api/contact') {
    if (req.method === 'OPTIONS') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
      return res.end()
    }

    if (req.method === 'POST') {
      let body = ''
      req.on('data', (c) => (body += c))
      req.on('end', async () => {
        try { req.body = JSON.parse(body) } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Invalid JSON' }))
        }
        await contactHandler(req, res)
      })
      return
    }
  }

  // ── Static file serving ────────────────────────────────────────────────────
  let filePath = path.join(DIST, url.pathname)

  // SPA fallback — serve index.html for all non-asset routes
  const ext = path.extname(filePath)
  if (!ext || !fs.existsSync(filePath)) {
    filePath = path.join(DIST, 'index.html')
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      return res.end('Not found')
    }

    const fileExt = path.extname(filePath)
    const contentType = MIME[fileExt] || 'application/octet-stream'

    // Long cache for hashed assets, no-cache for index.html
    const cacheControl = fileExt === '.html'
      ? 'no-cache'
      : 'public, max-age=31536000, immutable'

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    })
    res.end(data)
  })
})

server.listen(PORT, () => {
  console.log(`[prod] Server running on http://localhost:${PORT}`)
  console.log(`[prod] Serving dist/ + /api/contact`)
})
