import Navbar from './components/layout/Navbar'
import HeroSection from './components/hero/HeroSection'
import AboutSection from './components/about/AboutSection'
import ProjectsSection from './components/projects/ProjectsSection'
import ContactSection from './components/contact/ContactSection'
import GameHub from './components/games/GameHub'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} RAKSHIT TRIVEDI — Built with React, Framer Motion, and unreasonable amounts of caffeine.
        </p>
        <p style={{ opacity: 0.45, fontSize: '0.75rem', marginTop: 4 }}>
          If your portfolio doesn't have speed lines, does it even exist?
        </p>
      </footer>
      <GameHub />
    </>
  )
}
