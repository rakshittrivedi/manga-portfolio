const nodemailer = require('nodemailer')

// Simple in-memory rate limiter: 5 requests per IP per hour
const rateLimitMap = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
  const max = 5

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, start: now })
    return false
  }

  const record = rateLimitMap.get(ip)
  if (now - record.start > windowMs) {
    rateLimitMap.set(ip, { count: 1, start: now })
    return false
  }

  if (record.count >= max) return true
  record.count++
  return false
}

function validateInput({ name, email, message }) {
  const errors = []
  if (!name || typeof name !== 'string' || name.trim().length < 1)
    errors.push('Name required.')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push('Valid email required.')
  if (!message || typeof message !== 'string' || message.trim().length < 10)
    errors.push('Message must be at least 10 characters.')
  return errors
}

function sanitize(str) {
  return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

module.exports = async function handler(req, res) {
  // CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  // Rate limit
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Cool down, samurai.' })
  }

  const { name, email, message, _honey } = req.body || {}

  // Honeypot — silently drop bots
  if (_honey) {
    return res.status(200).json({ success: true })
  }

  // Validate
  const errors = validateInput({ name, email, message })
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(' ') })
  }

  // Build transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { margin: 0; padding: 24px; background: #f5f0e8; font-family: Georgia, serif; color: #0a0a0a; }
    .panel { border: 5px solid #0a0a0a; padding: 28px; max-width: 560px; margin: 0 auto; box-shadow: 8px 8px 0 #0a0a0a; background: #fff; }
    .heading { font-size: 24px; letter-spacing: 0.08em; font-weight: bold; border-bottom: 4px solid #0a0a0a; padding-bottom: 10px; margin-bottom: 20px; font-family: Impact, sans-serif; }
    .label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.5; margin-bottom: 4px; }
    .value { font-size: 15px; font-weight: bold; margin-bottom: 18px; }
    .message-box { border: 3px solid #0a0a0a; padding: 14px; background: #f5f0e8; white-space: pre-wrap; line-height: 1.7; font-size: 14px; }
    .footer { margin-top: 24px; font-size: 11px; opacity: 0.4; border-top: 2px solid #0a0a0a; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="panel">
    <div class="heading">⚔ NEW SCROLL — MANGA PORTFOLIO</div>
    <div class="label">From</div>
    <div class="value">${sanitize(name)}</div>
    <div class="label">Reply-To</div>
    <div class="value">${sanitize(email)}</div>
    <div class="label">Message</div>
    <div class="message-box">${sanitize(message)}</div>
    <div class="footer">Sent via rakshit-trivedi.vercel.app contact form</div>
  </div>
</body>
</html>`

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `[Portfolio] New scroll from ${sanitize(name)}`,
      html: htmlBody,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Mail error:', err.message)
    return res.status(500).json({ error: 'Failed to send. Try again later.' })
  }
}
