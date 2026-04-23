import { motion } from 'framer-motion';

export default function TopNavBar({ toggleTheme, theme }) {
  return (
    <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-8 max-w-full bg-transparent backdrop-blur-[20px] border-b border-white/10 shadow-[0_4px_30px_rgba(103,80,164,0.1)] z-50 transition-all duration-500 ease-out active:scale-95">
        <div className="text-lg font-black font-mono tracking-widest text-white">
            DATA_ENGINEER//V1.0
        </div>
        <div className="hidden md:flex gap-8">
            <a className="text-primary border-b-2 border-primary pb-1 font-mono tracking-tighter uppercase text-sm hover:text-accent hover:drop-shadow-[0_0_8px_rgba(var(--accent),0.6)] transition-colors duration-300" href="#about">ABOUT</a>
            <a className="text-zinc-500 hover:text-primary transition-colors duration-500 font-mono tracking-tighter uppercase text-sm hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" href="#projects">PROJECTS</a>
            <a className="text-zinc-500 hover:text-primary transition-colors duration-500 font-mono tracking-tighter uppercase text-sm hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" href="#skills">SKILLS</a>
            <a className="text-zinc-500 hover:text-primary transition-colors duration-500 font-mono tracking-tighter uppercase text-sm hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" href="#certifications">CERTIFICATIONS</a>
            <a className="text-zinc-500 hover:text-primary transition-colors duration-500 font-mono tracking-tighter uppercase text-sm hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" href="#connect">CONTACT</a>
        </div>
        <div className="flex gap-4">
            <motion.button 
                whileTap={{ scale: 0.8, rotate: -90 }}
                whileHover={{ scale: 1.2, color: 'var(--accent)' }}
                onClick={toggleTheme}
                title={theme === 'obsidian' ? "Switch to Emerald Mode" : "Switch to Obsidian Mode"}
                className="text-primary hover:text-accent hover:drop-shadow-[0_0_8px_rgba(var(--accent),0.6)] transition-colors"
            >
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>
                    palette
                </span>
            </motion.button>
        </div>
    </motion.nav>
  );
}
