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
    const [throughput, setThroughput] = useState("CONNECTING TO CORE...");

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
        fetch(`${apiUrl}/api/system-status`)
            .then(res => res.json())
            .then(data => {
                if (data.throughput) {
                    setThroughput(data.throughput);
                }
            })
            .catch(err => {
                console.error("Failed to fetch system status", err);
                setThroughput("OFFLINE");
            });
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
                        {/* FIXED: True Typing Effect */}
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
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary" style={{ whiteSpace: "nowrap", fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>Barathiselvan.</span>
                        </motion.h1>
                        <motion.h2 variants={itemVariants} className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
                            Aspiring Data Engineer.
                        </motion.h2>
                    </div>

                    <motion.p variants={itemVariants} className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                        Architecting scalable data pipelines, optimizing complex schemas, and building the resilient infrastructure necessary for tomorrow's analytical ecosystems.
                    </motion.p>

                    <motion.div variants={itemVariants} className="pt-4 flex flex-wrap gap-4 items-center">
                        {/* FIXED: Button with Cybernetic Glare */}
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
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4">
                        <p className="font-mono text-xs bg-primary/5 text-primary border border-primary/20 inline-block px-4 py-2 rounded transition-colors duration-400">
                            SYSTEM THROUGHPUT: {throughput}
                        </p>
                    </motion.div>
                </motion.div>

                {/* RIGHT COLUMN: 3D Isometric Cluster */}
                <motion.div
                    className="col-span-1 lg:col-span-5 flex items-center justify-center relative [perspective:2000px]"
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: 2.5 }}
                >
                    <div className="relative w-full aspect-square max-w-[500px] transform-gpu [transform:rotateX(35deg)_rotateZ(-45deg)] scale-[0.8] md:scale-100">

                        {/* FIXED: Drawing SVG Lines */}
                        <svg className="absolute inset-0 m-auto w-full h-full overflow-visible pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.line
                                x1="50" y1="50" x2="85" y2="15"
                                className="stroke-primary"
                                strokeWidth="0.5"
                                strokeOpacity="0.6"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 3.0, ease: "easeInOut" }}
                            />
                            <motion.line
                                x1="50" y1="50" x2="15" y2="85"
                                className="stroke-primary"
                                strokeWidth="0.5"
                                strokeOpacity="0.6"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 3.0, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Databricks Node */}
                        <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg dark:shadow-2xl transition-all duration-500 hover:-translate-y-8 hover:border-primary hover:shadow-[0_0_40px_rgba(207,188,255,0.3)] group cursor-default">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" />
                                    <path d="M2 10V15.5L12 21L22 15.5V10L12 15.5L2 10Z" opacity="0.6" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/60 group-hover:text-primary transition-colors">Databricks</span>
                        </div>

                        {/* Snowflake Node */}
                        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-bg/50 border border-card-border rounded-xl flex flex-col items-center justify-center backdrop-blur-[12px] shadow-lg dark:shadow-2xl transition-all duration-500 hover:-translate-y-8 hover:border-primary hover:shadow-[0_0_40px_rgba(var(--primary),0.3)] group cursor-default">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                                <svg className="w-8 h-8 text-white/60 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15 7H9L12 2ZM12 22L9 17H15L12 22ZM2 12L7 9V15L2 12ZM22 12L17 15V9L22 12ZM7 6.5L12 9.5L17 6.5L14 3L10 3L7 6.5ZM7 17.5L10 21L14 21L17 17.5L12 14.5L7 17.5Z" />
                                </svg>
                            </div>
                            <span className="font-mono text-xs text-white/60 group-hover:text-primary transition-colors">Snowflake</span>
                        </div>

                        {/* Python Node (Center) */}
                        <div className="absolute inset-0 m-auto w-36 h-36 md:w-48 md:h-48 bg-bg/80 border border-primary/40 rounded-xl flex flex-col items-center justify-center backdrop-blur-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 [transform:translateZ(-40px)_translateY(-20px)] hover:[transform:translateZ(-40px)_translateY(-40px)] hover:border-primary hover:shadow-[0_0_60px_rgba(207,188,255,0.4)] group cursor-default z-10">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/30 transition-colors border border-primary/20">
                                <svg className="w-10 h-10 text-primary" viewBox="0 0 448 512" fill="currentColor">
                                    <path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4 .1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8 .1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3 0-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" />
                                </svg>
                            </div>
                            <span className="font-mono text-sm font-bold text-primary tracking-widest">PYTHON</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}