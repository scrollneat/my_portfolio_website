import { useState, useEffect } from 'react';
import TopNavBar from './components/TopNavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import ProjectsGrid from './components/ProjectsGrid';
import ContactFooter from './components/ContactFooter';
import ParticleNetwork from './components/ParticleNetwork';
import ScrollToTop from './components/ScrollToTop';

const mobileThemes = ['quantum', 'emerald', 'obsidian', 'solar'];
const desktopThemes = ['obsidian', 'quantum', 'emerald', 'solar'];

function App() {
  const [theme, setTheme] = useState('obsidian');

  // Initialization & Hydration Safety
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const isMobile = window.innerWidth < 768;
      setTheme(isMobile ? 'quantum' : 'obsidian');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const isMobile = window.innerWidth < 768;
    const themeArray = isMobile ? mobileThemes : desktopThemes;
    
    setTheme(prev => {
      // Find current theme in the active array
      // If the current theme isn't in the array (shouldn't happen), default to index 0
      const currentIndex = themeArray.indexOf(prev);
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeArray.length;
      return themeArray[nextIndex];
    });
  };

  return (
    <div className="min-h-screen relative z-10 overflow-x-hidden w-full">
      <div className="fixed inset-0 w-full h-full -z-10 bg-surface">
        <ParticleNetwork theme={theme} />
      </div>
      <TopNavBar toggleTheme={toggleTheme} theme={theme} />
      <ScrollToTop />
      {/* 
        AnimatePresence is intentionally NOT wrapping these sections.
        These sections are always mounted and never unmount, so AnimatePresence 
        and exit props do nothing here. Scroll animations are handled via 
        useInView inside each component.
      */}
      <Hero />
      <About />
      <ProjectsGrid />
      <Skills />
      <Certifications />
      <ContactFooter />
    </div>
  );
}

export default App;
