import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Moon, Terminal, Sun, Snowflake } from 'lucide-react';

export default function TopNavBar({ toggleTheme, theme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="text-lg md:text-xl font-bold font-mono tracking-tight text-white shrink-0 uppercase">
            PORTFOLIO
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
                <button 
                    key={link.name}
                    onClick={() => {
                        const el = document.getElementById(link.href.substring(1));
                        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                    }}
                    className="text-zinc-500 hover:text-primary transition-colors duration-300 font-mono tracking-tighter uppercase text-sm hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" 
                >
                    {link.name}
                </button>
            ))}
        </div>

            {/* Theme & Menu Controls */}
            <div className="flex items-center gap-3 relative z-[150]">
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={toggleTheme}
                    className="relative flex items-center gap-2 px-4 py-2 border-2 border-primary/50 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] group/theme overflow-hidden"
                >
                    <motion.div 
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/5"
                    />

                    <span className="font-mono text-[10px] tracking-[0.2em] font-bold">THEME</span>
                    
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {(() => {
                                const mobileThemes = ['quantum', 'emerald', 'obsidian', 'solar'];
                                const desktopThemes = ['obsidian', 'quantum', 'emerald', 'solar'];
                                
                                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                                const themeArray = isMobile ? mobileThemes : desktopThemes;
                                
                                const nextTheme = themeArray[(themeArray.indexOf(theme) + 1) % themeArray.length];
                                
                                const IconComponent = nextTheme === 'obsidian' ? Moon : 
                                                     nextTheme === 'emerald' ? Terminal : 
                                                     nextTheme === 'solar' ? Sun : 
                                                     null;
                                
                                const iconColor = nextTheme === 'obsidian' ? 'text-purple-400' : 
                                                 nextTheme === 'emerald' ? 'text-green-400' : 
                                                 nextTheme === 'solar' ? 'text-orange-500' : 
                                                 'text-cyan-400';

                                return (
                                    <motion.div 
                                        key={nextTheme}
                                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                        exit={{ scale: 0, rotate: 180, opacity: 0 }}
                                        transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                                        className={`absolute flex items-center justify-center ${iconColor}`}
                                    >
                                        {IconComponent ? (
                                            <IconComponent size={20} strokeWidth={2.5} />
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path d="M12 9.5L14.5 12L12 14.5L9.5 12L12 9.5ZM12 0L13.5 4H10.5L12 0ZM12 24L10.5 20H13.5L12 24ZM0 12L4 10.5V13.5L0 12ZM24 12L20 13.5V10.5L24 12ZM18 6L15.5 9L18.5 10L18 6ZM6 6L8.5 9L5.5 10L6 6ZM18 18L15.5 15L18.5 14L18 18ZM6 18L8.5 15L5.5 14L6 18Z" />
                                            </svg>
                                        )}
                                    </motion.div>
                                );
                            })()}
                        </AnimatePresence>
                    </div>
                </motion.button>

                {/* Brute-Force SVG Hamburger */}
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                    className="block md:hidden p-2 text-primary z-[160]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMobileMenuOpen ? (
                            <>
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </>
                        ) : (
                            <>
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </>
                        )}
                    </svg>
                </button>
            </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-8 z-[140]"
                >
                    <div className="flex flex-col items-center gap-8">
                        {navLinks.map((link, idx) => (
                            <button 
                                key={link.name}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    const el = document.getElementById(link.href.substring(1));
                                    if (el) setTimeout(() => window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }), 300);
                                }}
                                className="text-2xl font-mono tracking-[0.2em] text-zinc-400 hover:text-primary transition-all duration-300 flex flex-col items-center"
                            >
                                <span className="text-primary/40 text-xs font-bold mb-2">0{idx + 1}</span>
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
