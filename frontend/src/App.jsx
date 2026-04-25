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

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'obsidian';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.add('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'obsidian' ? 'emerald' : 'obsidian');
  };

  return (
    <div className="min-h-screen relative z-10">
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
