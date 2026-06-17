/**
 * Contact form serverless handler.
 * Compatible with Vercel serverless functions or Express.
 * 
 * Env vars required:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO
 */

import nodemailer from 'nodemailer'

// Simple in-memory rate limiter: 5 requests per IP per hour
const rateLimitMap = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
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
  if (!name || typeof name !== 'string' || name.trim().length < 1) errors.push('name required')
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('valid email required')
  if (!message || typeof message !== 'string' || message.trim().length < 10) errors.push('message must be at least 10 chars')
  return errors
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limit by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Cool down, samurai.' })
  }

  const { name, email, message, _honey } = req.body || {}

  // Honeypot check
  if (_honey) {
    return res.status(200).json({ success: true }) // silently drop
  }

  // Validate
  const errors = validateInput({ name, email, message })
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') })
  }

  // Send email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
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
  <style>
    body { font-family: 'Comic Sans MS', cursive, sans-serif; background: #f5f0e8; color: #0a0a0a; padding: 24px; }
    .panel { border: 4px solid #0a0a0a; padding: 24px; max-width: 600px; margin: 0 auto; box-shadow: 6px 6px 0 #0a0a0a; background: #fff; }
    .heading { font-size: 28px; letter-spacing: 0.1em; margin-bottom: 16px; border-bottom: 3px solid #0a0a0a; padding-bottom: 8px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.6; }
    .value { font-size: 16px; font-weight: bold; margin-top: 4px; }
    .message-box { border: 2px solid #0a0a0a; padding: 14px; background: #f5f0e8; white-space: pre-wrap; line-height: 1.6; }
    .footer { margin-top: 24px; font-size: 12px; opacity: 0.5; border-top: 2px solid #0a0a0a; padding-top: 12px; }
  </style>
</head>
<body>
  <div class="panel">
    <div class="heading">⚔ NEW SCROLL RECEIVED — MANGA PORTFOLIO</div>
    <div class="field">
      <div class="label">From</div>
      <div class="value">${name.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value">${email.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>
    <div class="footer">Sent via rakshit-portfolio contact form</div>
  </div>
</body>
</html>
  `

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || 'rakshittrivedi106@mail.com',
      replyTo: email,
      subject: `[Portfolio] New scroll from ${name}`,
      html: htmlBody,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Mail send error:', err)
    return res.status(500).json({ error: 'Failed to send. Try again later.' })
  }
}
