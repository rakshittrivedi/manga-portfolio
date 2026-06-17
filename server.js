/**
 * Local dev server for testing the contact API.
 * Run: node server.js
 * Vite proxy forwards /api requests here on port 5000.
 */

require('dotenv').config()
const http = require('http')

const PORT = 5000

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    return res.end()
  }

  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', async () => {
      try {
        req.body = JSON.parse(body)
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'Invalid JSON' }))
      }

      // Reuse the same handler as the Vercel function
      const handler = require('./api/contact')
      const mockRes = {
        _status: 200,
        _headers: {},
        _body: '',
        setHeader(k, v) { this._headers[k] = v },
        status(code) { this._status = code; return this },
        json(data) {
          res.writeHead(this._status, { 'Content-Type': 'application/json', ...this._headers })
          res.end(JSON.stringify(data))
        },
        end() {
          res.writeHead(this._status, this._headers)
          res.end()
        },
      }

      await handler(req, mockRes)
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  }
})

server.listen(PORT, () => {
  console.log(`[dev] Contact API running on http://localhost:${PORT}`)
  console.log(`[dev] SMTP user: ${process.env.SMTP_USER}`)
})
