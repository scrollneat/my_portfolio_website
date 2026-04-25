import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function TopNavBar({ toggleTheme, theme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CERTIFICATIONS', href: '#certifications' },
    { name: 'CONTACT', href: '#connect' },
  ];

  return (
    <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 md:px-12 bg-bg/80 backdrop-blur-xl border-b border-white/10 z-[100]">
        
        {/* Logo */}
        <div className="text-lg font-black font-mono tracking-widest text-white shrink-0">
            DATA_ENGINEER//V1.0
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
                <button 
                    key={link.name}
                    onClick={() => {
                        const el = document.getElementById(link.href.substring(1));
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-zinc-500 hover:text-primary transition-colors duration-300 font-mono tracking-tighter uppercase text-sm hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" 
                >
                    {link.name}
                </button>
            ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
            <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="flex items-center gap-2 p-2 border border-primary/40 rounded-full bg-primary/10 text-primary hover:text-accent hover:border-accent transition-colors duration-300 shadow-[0_0_8px_var(--theme-glow)]"
            >
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>
                    {theme === 'obsidian' ? 'dark_mode' : 'light_mode'}
                </span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 z-[110]"
            >
                <motion.div 
                    animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    className="w-6 h-0.5 bg-primary rounded-full"
                />
                <motion.div 
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-6 h-0.5 bg-primary rounded-full"
                />
                <motion.div 
                    animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    className="w-6 h-0.5 bg-primary rounded-full"
                />
            </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="absolute top-20 left-0 w-full bg-bg/95 backdrop-blur-2xl border-b border-white/10 lg:hidden overflow-hidden z-[90]"
                >
                    <div className="flex flex-col p-8 gap-6">
                        {navLinks.map((link) => (
                            <button 
                                key={link.name}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    const el = document.getElementById(link.href.substring(1));
                                    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
                                }}
                                className="text-2xl font-mono tracking-widest text-zinc-400 hover:text-primary transition-all duration-300 text-left"
                            >
                                <span className="text-primary/40 mr-4 text-sm font-bold">0{navLinks.indexOf(link)+1}</span>
                                {link.name}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.nav>
  );
}
