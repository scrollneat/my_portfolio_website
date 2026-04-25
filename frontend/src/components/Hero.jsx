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
        <section className="relative min-h-screen w-full flex items-center justify-center pt-24 overflow-hidden bg-transparent transition-all duration-500 ease-in-out">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-network-grid pointer-events-none opacity-60"></div>
            <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

                {/* LEFT COLUMN: Text & Buttons */}
                <motion.div
                    className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-8 z-20 overflow-visible"
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

                    <motion.div variants={itemVariants} className="pt-4 flex flex-wrap gap-4 items-center">
                        {/* Button with Cybernetic Glare */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative overflow-hidden px-8 py-4 bg-primary text-on-primary font-label font-bold tracking-wide rounded hover:bg-primary-fixed transition-colors duration-300 shadow-[0_0_15px_rgba(207,188,255,0.2)] hover:shadow-[0_0_25px_rgba(207,188,255,0.4)]"
                        >
                            <motion.div
                                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent -skew-x-12"
                                initial={{ left: "-100%" }}
                                whileHover={{ left: "200%" }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                            />
                            <span className="relative z-10">VIEW PROJECTS</span>
                        </motion.button>

                        <motion.a
                            href="/Barathiselvan_Resume.pdf"
                            download
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block px-8 py-4 bg-transparent border border-outline text-on-surface font-label font-bold tracking-wide rounded hover:bg-surface-container-high hover:border-primary transition-all duration-300"
                        >
                            DOWNLOAD RESUME
                        </motion.a>
                    </motion.div>                    {/* Task 1: Mobile-only tile grid — hidden on lg (3D cluster takes over) */}
                    <motion.div variants={itemVariants} className="flex lg:hidden flex-wrap gap-2 pt-2">
                        {[
                            { 
                                label: 'SQL', 
                                color: 'border-emerald-500/40 bg-emerald-500/10',
                                icon: (
                                    <svg className="w-6 h-6 text-[#00A36C]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 4.02 2 6.5C2 8.98 6.48 11 12 11C17.52 11 22 8.98 22 6.5C22 4.02 17.52 2 12 2ZM2 9.5C2 11.98 6.48 14 12 14C17.52 14 22 11.98 22 9.5V12.5C22 14.98 17.52 17 12 17C6.48 17 2 14.98 2 12.5V9.5ZM2 15.5C2 17.98 6.48 20 12 20C17.52 20 22 17.98 22 15.5V18.5C22 20.98 17.52 23 12 23C6.48 23 2 20.98 2 18.5V15.5Z" />
                                    </svg>
                                )
                            },
                            { 
                                label: 'PySpark', 
                                color: 'border-orange-400/40 bg-orange-400/10',
                                icon: (
                                    <svg className="w-6 h-6 text-[#E25A1C]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L15.5 8.5H8.5L12 2ZM12 22L8.5 15.5H15.5L12 22ZM2 12L8.5 8.5V15.5L2 12ZM22 12L15.5 15.5V8.5L22 12Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )
                            },
                            { 
                                label: 'Python', 
                                color: 'border-yellow-500/40 bg-yellow-500/10',
                                icon: (
                                    <svg className="w-6 h-6 text-[#3776AB]" viewBox="0 0 448 512" fill="currentColor">
                                        <path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 0-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" />
                                    </svg>
                                )
                            },
                            { 
                                label: 'Snowflake', 
                                color: 'border-blue-400/40 bg-blue-400/10',
                                icon: (
                                    <svg className="w-6 h-6 text-[#29B5E8]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0L14.4 7.2H21.6L15.6 11.4L18 18.6L12 14.4L6 18.6L8.4 11.4L2.4 7.2H9.6L12 0Z" />
                                        <path d="M12 24L9.6 16.8H2.4L8.4 12.6L6 5.4L12 9.6L18 5.4L15.6 12.6L21.6 16.8H14.4L12 24Z" opacity="0.5" />
                                    </svg>
                                )
                            },
                            { 
                                label: 'Databricks', 
                                color: 'border-orange-500/40 bg-orange-500/10',
                                icon: (
                                    <svg className="w-6 h-6 text-[#FF3621]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" />
                                        <path d="M2 10V15.5L12 21L22 15.5V10L12 15.5L2 10Z" opacity="0.6" />
                                    </svg>
                                )
                            },
                        ].map((tile) => (
                            <motion.div
                                key={tile.label}
                                whileTap={{ scale: 0.93, y: -4 }}
                                className={`min-w-[100px] flex-1 flex flex-col items-center justify-center gap-1 border ${tile.color} rounded-xl py-3 backdrop-blur-sm cursor-default`}
                            >
                                {tile.icon}
                                <span className="font-mono text-[9px] text-white/60 tracking-widest uppercase">{tile.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>

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

                        {/* Connection Lines (Refactored for 5 nodes) */}
                        <svg className="absolute inset-0 m-auto w-full h-full overflow-visible pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* SQL to PySpark */}
                            <motion.line x1="50" y1="10" x2="15" y2="40" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3 }} />
                            {/* SQL to Python */}
                            <motion.line x1="50" y1="10" x2="85" y2="40" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3 }} />
                            {/* PySpark to Snowflake */}
                            <motion.line x1="15" y1="40" x2="15" y2="85" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3.2 }} />
                            {/* Python to Databricks */}
                            <motion.line x1="85" y1="40" x2="85" y2="85" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3.2 }} />
                            {/* PySpark to Python (Middle Connection) */}
                            <motion.line x1="15" y1="40" x2="85" y2="40" className="stroke-primary" strokeWidth="0.5" strokeOpacity="0.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 3.4 }} />
                        </svg>

                        {/* 1. SQL Node (TOP) */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#00A36C] hover:shadow-[0_0_40px_rgba(0,163,108,0.3)] group cursor-default">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#00A36C]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#00A36C] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 4.02 2 6.5C2 8.98 6.48 11 12 11C17.52 11 22 8.98 22 6.5C22 4.02 17.52 2 12 2ZM2 9.5C2 11.98 6.48 14 12 14C17.52 14 22 11.98 22 9.5V12.5C22 14.98 17.52 17 12 17C6.48 17 2 14.98 2 12.5V9.5ZM2 15.5C2 17.98 6.48 20 12 20C17.52 20 22 17.98 22 15.5V18.5C22 20.98 17.52 23 12 23C6.48 23 2 20.98 2 18.5V15.5Z" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/60 group-hover:text-[#00A36C] transition-colors uppercase tracking-widest">SQL</span>
                        </div>

                        {/* 2. PySpark Node (MIDDLE LEFT) */}
                        <div className="absolute top-1/3 left-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#E25A1C] hover:shadow-[0_0_40px_rgba(226,90,28,0.3)] group cursor-default">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#E25A1C]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#E25A1C] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.5 8.5H8.5L12 2ZM12 22L8.5 15.5H15.5L12 22ZM2 12L8.5 8.5V15.5L2 12ZM22 12L15.5 15.5V8.5L22 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/60 group-hover:text-[#E25A1C] transition-colors uppercase tracking-widest">PySpark</span>
                        </div>

                        {/* 3. Python Node (MIDDLE RIGHT) */}
                        <div className="absolute top-1/3 right-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#3776AB] hover:shadow-[0_0_40px_rgba(55,118,171,0.3)] group cursor-default">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#3776AB]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#3776AB] transition-colors" viewBox="0 0 448 512" fill="currentColor">
                                    <path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 0-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/60 group-hover:text-[#3776AB] transition-colors uppercase tracking-widest">Python</span>
                        </div>

                        {/* 4. Snowflake Node (BOTTOM LEFT) */}
                        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#29B5E8] hover:shadow-[0_0_40px_rgba(41,181,232,0.3)] group cursor-default">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#29B5E8]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#29B5E8] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0L14.4 7.2H21.6L15.6 11.4L18 18.6L12 14.4L6 18.6L8.4 11.4L2.4 7.2H9.6L12 0Z" />
                                    <path d="M12 24L9.6 16.8H2.4L8.4 12.6L6 5.4L12 9.6L18 5.4L15.6 12.6L21.6 16.8H14.4L12 24Z" opacity="0.5" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/60 group-hover:text-[#29B5E8] transition-colors uppercase tracking-widest">Snowflake</span>
                        </div>

                        {/* 5. Databricks Node (BOTTOM RIGHT) */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg transition-all duration-500 hover:-translate-y-8 hover:border-[#FF3621] hover:shadow-[0_0_40px_rgba(255,54,33,0.3)] group cursor-default">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-[#FF3621]/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-[#FF3621] transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" />
                                    <path d="M2 10V15.5L12 21L22 15.5V10L12 15.5L2 10Z" opacity="0.6" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/60 group-hover:text-[#FF3621] transition-colors uppercase tracking-widest">Databricks</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
