import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// --- MAIN STAGGER SEQUENCE ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const blurVariants = {
    hidden: { filter: 'blur(12px)', opacity: 0, y: 30 },
    visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", delay: 1.5 } }
};

// --- NEW: TYPING EFFECT VARIANTS ---
const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
};

const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 }
};

const galaxyNodeVariants = {
    animate: (i) => ({
        y: [0, i % 2 === 0 ? -12 : 12, 0],
        x: [0, i % 3 === 0 ? 8 : -8, 0],
        borderColor: i === 0 ? ["rgba(255,255,255,0.1)", "#00A36C", "rgba(255,255,255,0.1)"] : 
                     i === 1 ? ["rgba(255,255,255,0.1)", "#A855F7", "rgba(255,255,255,0.1)"] : undefined,
        boxShadow: i === 0 ? ["0 0 0px rgba(0,0,0,0)", "0 0 25px rgba(0,163,108,0.4)", "0 0 0px rgba(0,0,0,0)"] : 
                   i === 1 ? ["0 0 0px rgba(0,0,0,0)", "0 0 25px rgba(168,85,247,0.4)", "0 0 0px rgba(0,0,0,0)"] : undefined,
        transition: {
            y: { duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            x: { duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
        }
    })
};


export default function Hero() {
    const [nodeCount, setNodeCount] = useState('0');
    const [networkUplinks, setNetworkUplinks] = useState('0');
    const [status, setStatus] = useState('CONNECTING...');

    useEffect(() => {
        fetch('https://api.github.com/users/scrollneat')
            .then(res => {
                if (!res.ok) throw new Error("Fetch failed");
                return res.json();
            })
            .then(data => {
                if(data.public_repos !== undefined) {
                    setNodeCount(data.public_repos);
                    setNetworkUplinks(data.followers);
                    setStatus('OPERATIONAL');
                }
            })
            .catch(() => setStatus('OFFLINE_RETRYING'));
    }, []);

    return (
        <section id="home" className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center pt-24 mb-[-4rem] lg:mb-0 overflow-hidden bg-transparent transition-all duration-500 ease-in-out">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-network-grid pointer-events-none opacity-60"></div>
            <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

                {/* LEFT COLUMN: Text & Buttons */}
                <motion.div
                    className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 z-20 overflow-visible"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="space-y-4">
                        {/* Typing Effect */}
                        <motion.div
                            variants={sentenceVariants}
                            className="font-mono text-[12px] uppercase tracking-[0.15em] text-primary flex whitespace-pre"
                        >
                            {"WELCOME TO MY NODE".split("").map((char, index) => (
                                <motion.span key={index} variants={letterVariants}>
                                    {char}
                                </motion.span>
                            ))}
                        </motion.div>

                        <motion.h1 variants={blurVariants} className="font-display font-black text-on-surface tracking-tighter leading-[1.1]">
                            <span className="text-4xl md:text-5xl lg:text-6xl text-on-surface">Hi, I'm</span><br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary drop-shadow-[0_0_10px_var(--theme-glow)]" style={{ whiteSpace: "nowrap", fontSize: "clamp(2rem, 6vw, 5.5rem)" }}>Barathiselvan.</span>
                        </motion.h1>
                        {/* Task 2: responsive heading — text-2xl on mobile, scales up */}
                        <motion.h2 variants={itemVariants} className="font-headline text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
                            Aspiring Data Engineer.
                        </motion.h2>
                    </div>

                    <motion.p variants={itemVariants} className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                        Architecting scalable data pipelines, optimizing complex schemas, and building the resilient infrastructure necessary for tomorrow's analytical ecosystems.
                    </motion.p>
                    <div className="relative w-full py-12 lg:py-0 lg:pt-2 flex flex-col items-center lg:items-start">
                        {/* Task 1 & 2: Mobile-only background constellation stage */}
                        <div className="absolute inset-0 lg:hidden pointer-events-none overflow-hidden">
                            {/* Constellation Lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M20 20 L50 50" stroke="white" strokeWidth="0.2" fill="none" />
                                <path d="M80 20 L50 50" stroke="white" strokeWidth="0.2" fill="none" />
                                <path d="M50 50 L25 80" stroke="white" strokeWidth="0.2" fill="none" strokeDasharray="1 1" />
                                <path d="M50 50 L75 80" stroke="white" strokeWidth="0.2" fill="none" strokeDasharray="1 1" />
                            </svg>

                            {/* Floating Micro-Nodes */}
                            {[
                                { label: 'SQL', x: '20%', y: '20%', color: '#00A36C', i: 0 },
                                { label: 'Python', x: '80%', y: '20%', color: '#A855F7', i: 1 },
                                { label: 'PySpark', x: '50%', y: '50%', color: '#E25A1C', i: 2 },
                                { label: 'Snowflake', x: '25%', y: '80%', color: '#29B5E8', i: 3 },
                                { label: 'Databricks', x: '75%', y: '80%', color: '#FF3621', i: 4 },
                            ].map((node) => (
                                <motion.div
                                    key={node.label}
                                    className="absolute pointer-events-auto flex flex-col items-center gap-1"
                                    style={{ left: node.x, top: node.y }}
                                    initial={{ opacity: 0.6, scale: 0.8 }}
                                    animate={{ 
                                        y: [0, node.i % 2 === 0 ? -15 : 15, 0],
                                        x: [0, node.i % 3 === 0 ? 10 : -10, 0],
                                        opacity: [0.4, 0.7, 0.4]
                                    }}
                                    transition={{ 
                                        duration: 6 + node.i, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    whileHover={{ opacity: 1, scale: 1.2, zIndex: 30 }}
                                    whileTap={{ scale: 1.1 }}
                                >
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                        <div className="w-4 h-4 opacity-80" style={{ color: node.color }}>
                                            {node.label === 'SQL' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 4.02 2 6.5C2 8.98 6.48 11 12 11C17.52 11 22 8.98 22 6.5C22 4.02 17.52 2 12 2ZM2 9.5C2 11.98 6.48 14 12 14C17.52 14 22 11.98 22 9.5V12.5C22 14.98 17.52 17 12 17C6.48 17 2 14.98 2 12.5V9.5ZM2 15.5C2 17.98 6.48 20 12 20C17.52 20 22 17.98 22 15.5V18.5C22 20.98 17.52 23 12 23C6.48 23 2 20.98 2 18.5V15.5Z" /></svg>}
                                            {node.label === 'Python' && <svg viewBox="0 0 448 512" fill="currentColor"><path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 0-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" /></svg>}
                                            {node.label === 'PySpark' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.5 8.5H8.5L12 2ZM12 22L8.5 15.5H15.5L12 22ZM2 12L8.5 8.5V15.5L2 12ZM22 12L15.5 15.5V8.5L22 12Z" /><circle cx="12" cy="12" r="3" /></svg>}
                                            {node.label === 'Snowflake' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.4 7.2H21.6L15.6 11.4L18 18.6L12 14.4L6 18.6L8.4 11.4L2.4 7.2H9.6L12 0Z" /><path d="M12 24L9.6 16.8H2.4L8.4 12.6L6 5.4L12 9.6L18 5.4L15.6 12.6L21.6 16.8H14.4L12 24Z" opacity="0.5" /></svg>}
                                            {node.label === 'Databricks' && <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" /><path d="M2 10V15.5L12 21L22 15.5V10L12 15.5L2 10Z" opacity="0.6" /></svg>}
                                        </div>
                                    </div>
                                    <motion.span 
                                        initial={{ opacity: 0, y: 5 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        className="font-mono text-[7px] text-white/40 tracking-tighter uppercase"
                                    >
                                        {node.label}
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={itemVariants} className="relative z-20 flex flex-wrap justify-center lg:justify-start gap-4 items-center">
                            {/* Button with Cybernetic Glare */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-primary text-on-primary font-label font-bold tracking-wider rounded overflow-hidden shadow-[0_0_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_0_35px_rgba(var(--color-primary),0.5)] transition-all duration-500"
                            >
                                <span className="relative z-10">EXPLORE ARCHIVES</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-glare" />
                            </motion.button>

                            <motion.a
                                href="/resume.pdf"
                                whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block px-8 py-4 bg-transparent border border-outline text-on-surface font-label font-bold tracking-wide rounded hover:bg-surface-container-high hover:border-primary transition-all duration-300"
                            >
                                DOWNLOAD RESUME
                            </motion.a>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="pt-2">
                        <div className="inline-block rounded-md p-[1px] bg-gradient-to-r from-accent to-primary animate-pulse shadow-[0_0_8px_var(--theme-glow)]">
                            <div className="bg-bg px-4 py-2 rounded-md font-mono text-xs">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary font-bold tracking-wider">
                                    SYSTEM THROUGHPUT: STATUS: {status} | NODES: {nodeCount} | UPLINKS: {networkUplinks}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* RIGHT COLUMN: 3D Isometric Cluster — hidden on mobile, shown on lg only */}
                <motion.div
                    className="col-span-1 lg:col-span-5 hidden lg:flex items-center justify-center relative [perspective:2000px]"
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: 2.5 }}
                >
                    <div className="relative w-full aspect-square max-w-[500px] transform-gpu [transform:rotateX(35deg)_rotateZ(-45deg)] scale-[0.8] md:scale-100">

                        {/* Connection Lines (Updated for Diamond Layout) */}
                        <svg className="absolute inset-0 m-auto w-full h-full overflow-visible pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* SQL to PySpark */}
                            <motion.line x1="20" y1="10" x2="50" y2="50" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3 }} />
                            {/* Python to PySpark */}
                            <motion.line x1="80" y1="10" x2="50" y2="50" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3 }} />
                            {/* PySpark to Snowflake */}
                            <motion.line x1="50" y1="50" x2="20" y2="90" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3.2 }} />
                            {/* PySpark to Databricks */}
                            <motion.line x1="50" y1="50" x2="80" y2="90" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3.2 }} />
                        </svg>

                        {/* 1. SQL Node (TOP LEFT) */}
                        <motion.div 
                            variants={galaxyNodeVariants} 
                            animate="animate" 
                            custom={0}
                            className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#00A36C] hover:shadow-[0_0_40px_rgba(0,163,108,0.3)] group cursor-default"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#00A36C]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#00A36C] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 4.02 2 6.5C2 8.98 6.48 11 12 11C17.52 11 22 8.98 22 6.5C22 4.02 17.52 2 12 2ZM2 9.5C2 11.98 6.48 14 12 14C17.52 14 22 11.98 22 9.5V12.5C22 14.98 17.52 17 12 17C6.48 17 2 14.98 2 12.5V9.5ZM2 15.5C2 17.98 6.48 20 12 20C17.52 20 22 17.98 22 15.5V18.5C22 20.98 17.52 23 12 23C6.48 23 2 20.98 2 18.5V15.5Z" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/90 opacity-100 group-hover:text-[#00A36C] transition-colors uppercase tracking-widest pb-2">SQL</span>
                        </motion.div>

                        {/* 2. Python Node (TOP RIGHT) */}
                        <motion.div 
                            variants={galaxyNodeVariants} 
                            animate="animate" 
                            custom={1}
                            className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#3776AB] hover:shadow-[0_0_40px_rgba(55,118,171,0.3)] group cursor-default"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#3776AB]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#3776AB] transition-colors" viewBox="0 0 448 512" fill="currentColor">
                                    <path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 0-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/90 opacity-100 group-hover:text-[#3776AB] transition-colors uppercase tracking-widest pb-2">Python</span>
                        </motion.div>

                        {/* 3. PySpark Node (CENTER) */}
                        <motion.div 
                            variants={galaxyNodeVariants} 
                            animate="animate" 
                            custom={2}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-xl z-20 transition-all duration-500 hover:-translate-y-8 hover:border-[#E25A1C] hover:shadow-[0_0_40px_rgba(226,90,28,0.4)] group cursor-default"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#E25A1C]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#E25A1C] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.5 8.5H8.5L12 2ZM12 22L8.5 15.5H15.5L12 22ZM2 12L8.5 8.5V15.5L2 12ZM22 12L15.5 15.5V8.5L22 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/90 opacity-100 group-hover:text-[#E25A1C] transition-colors uppercase tracking-widest pb-2">PySpark</span>
                        </motion.div>

                        {/* 4. Snowflake Node (BOTTOM LEFT) */}
                        <motion.div 
                            variants={galaxyNodeVariants} 
                            animate="animate" 
                            custom={3}
                            className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#29B5E8] hover:shadow-[0_0_40px_rgba(41,181,232,0.3)] group cursor-default"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#29B5E8]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#29B5E8] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.4 7.2H21.6L15.6 11.4L18 18.6L12 14.4L6 18.6L8.4 11.4L2.4 7.2H9.6L12 0Z" />
                                    <path d="M12 24L9.6 16.8H2.4L8.4 12.6L6 5.4L12 9.6L18 5.4L15.6 12.6L21.6 16.8H14.4L12 24Z" opacity="0.5" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/90 opacity-100 group-hover:text-[#29B5E8] transition-colors uppercase tracking-widest pb-2">Snowflake</span>
                        </motion.div>

                        {/* 5. Databricks Node (BOTTOM RIGHT) */}
                        <motion.div 
                            variants={galaxyNodeVariants} 
                            animate="animate" 
                            custom={4}
                            className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#FF3621] hover:shadow-[0_0_40px_rgba(255,54,33,0.3)] group cursor-default"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#FF3621]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#FF3621] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" />
                                    <path d="M2 10V15.5L12 21L22 15.5V10L12 15.5L2 10Z" opacity="0.6" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/90 opacity-100 group-hover:text-[#FF3621] transition-colors uppercase tracking-widest pb-2">Databricks</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
