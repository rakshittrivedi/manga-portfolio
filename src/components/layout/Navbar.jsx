import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const links = [
  { label: 'HERO', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
  { label: '⚔ SIDE QUEST', href: '#games', special: true },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Logo */}
      <a href="#hero" className="navbar__logo" onClick={(e) => handleNav(e, '#hero')}>
        <span className="navbar__logo-text">RT</span>
        <span className="navbar__logo-sub">// manga.portfolio</span>
      </a>

      {/* Desktop links */}
      <ul className="navbar__links">
        {links.map((link, i) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <a
              href={link.href}
              className={`navbar__link ${link.special ? 'navbar__link--special' : ''}`}
              onClick={(e) => handleNav(e, link.href)}
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        className={`navbar__hamburger ${open ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="navbar__drawer"
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="navbar__drawer-links">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`navbar__drawer-link ${link.special ? 'navbar__link--special' : ''}`}
                    onClick={(e) => handleNav(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
