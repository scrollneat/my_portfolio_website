import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import profileImg from '../assets/profile.png';

const floatingCircles = [
    { id: 1, size: 120, top: "10%", left: "5%", duration: 15, delay: 0, color: "bg-primary/20" },
    { id: 2, size: 80, top: "20%", left: "85%", duration: 18, delay: 2, color: "bg-emerald-500/20" },
    { id: 3, size: 150, top: "70%", left: "15%", duration: 20, delay: 1, color: "bg-purple-500/20" },
    { id: 4, size: 60, top: "80%", left: "75%", duration: 12, delay: 3, color: "bg-accent/20" },
    { id: 5, size: 90, top: "40%", left: "50%", duration: 16, delay: 0.5, color: "bg-primary/20" },
    { id: 6, size: 110, top: "5%", left: "60%", duration: 14, delay: 4, color: "bg-emerald-500/20" },
    { id: 7, size: 130, top: "90%", left: "40%", duration: 19, delay: 1.5, color: "bg-purple-500/20" },
    { id: 8, size: 70, top: "50%", left: "10%", duration: 13, delay: 2.5, color: "bg-accent/20" },
    { id: 9, size: 140, top: "30%", left: "90%", duration: 17, delay: 3.5, color: "bg-primary/20" },
    { id: 10, size: 100, top: "60%", left: "30%", duration: 15, delay: 1.2, color: "bg-emerald-500/20" },
];

const EASE = [0.22, 1, 0.36, 1];

export default function About() {
    const startDate = new Date('2024-08-22');
    const today = new Date();

    // Calculate the difference in months
    let months = (today.getFullYear() - startDate.getFullYear()) * 12;
    months += today.getMonth() - startDate.getMonth();

    // If today's date is on or after the start day of the month, 
    // count the current month as 'active' or 'started'
    if (today.getDate() >= startDate.getDate()) {
        months += 1;
    }

    // Convert to decimal years and round to 1 decimal place
    // This matches company portals that round up to the next tenth
    const yearsOfExperience = (months / 12).toFixed(1);

    const photoRef = useRef(null);
    const terminalRef = useRef(null);

    // useInView toggles true/false on scroll in and out — drives the slide animation
    const photoInView = useInView(photoRef, { once: false, amount: 0.1 });
    const terminalInView = useInView(terminalRef, { once: false, amount: 0.1 });

    // Touch-activated glitch for mobile (CSS group-hover doesn't fire on touch)
    const [isGlitching, setIsGlitching] = useState(false);
    const triggerGlitch = () => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 600);
    };

    // Task 3 — Auto-glitch every 5 seconds (for mobile where hover never fires)
    useEffect(() => {
        const interval = setInterval(triggerGlitch, 5000);
        return () => clearInterval(interval);
    }, []);

    // Also glitch immediately when the photo first slides into view
    useEffect(() => {
        if (photoInView) {
            const t = setTimeout(triggerGlitch, 400);
            return () => clearTimeout(t);
        }
    }, [photoInView]);

    return (
        <section
            id="about"
            className="relative pt-12 md:pt-28 pb-24 px-4 sm:px-8 max-w-[1600px] mx-auto overflow-hidden"
        >
            {/* Floating Background Circles — clipped by overflow-hidden on section */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {floatingCircles.map((circle) => (
                    <motion.div
                        key={circle.id}
                        className={`absolute rounded-full blur-[60px] ${circle.color}`}
                        style={{
                            width: circle.size,
                            height: circle.size,
                            top: circle.top,
                            left: circle.left,
                        }}
                        animate={{
                            x: [0, 40, -40, 0],
                            y: [0, -50, 50, 0],
                            scale: [1, 1.2, 0.8, 1],
                        }}
                        transition={{
                            duration: circle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: circle.delay,
                        }}
                    />
                ))}
            </div>

            {/* Main content — flex-col on mobile, flex-row on md+ */}
            <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">

                {/* ───── Left Column: Photo ───── */}
                <motion.div
                    ref={photoRef}
                    animate={photoInView
                        ? { x: 0, opacity: 1 }
                        : { x: -150, opacity: 0 }
                    }
                    transition={{ duration: 0.9, ease: EASE }}
                    whileTap={{ scale: 0.95 }}
                    className="flex justify-center w-full md:w-auto flex-shrink-0"
                >
                    {/* Outer wrapper — NOT overflow-hidden so halo is never clipped */}
                    <div
                        className="relative group w-full max-w-[320px] sm:max-w-[380px] md:max-w-[480px] mx-auto md:mt-0 z-20 bg-bg"
                        onTouchStart={triggerGlitch}
                    >
                        {/* Cinematic Background Layer */}
                        <div 
                            className="absolute inset-x-[-10%] inset-y-[-5%] -z-10 rounded-[3rem] overflow-hidden opacity-80"
                            style={{
                                background: 'radial-gradient(circle at 50% 30%, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%), linear-gradient(180deg, transparent, rgba(0,0,0,0.8) 90%)'
                            }}
                        >
                            {/* Subtle Glitch Scanline */}
                            <motion.div 
                                className="absolute inset-x-0 h-[1px] bg-primary/30 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                                animate={{ top: ['-10%', '110%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Portrait Cutout Container */}
                        <div className="relative z-10 w-full aspect-square transition-all duration-700 ease-in-out group-hover:scale-105 overflow-hidden rounded-2xl">
                            {/* Base Image */}
                            <img
                                src={profileImg}
                                alt="Barathiselvan Profile"
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out filter brightness-110 contrast-110"
                            />

                            {/* Glitch Image Layer */}
                            <img
                                src={profileImg}
                                alt="Barathiselvan Profile Glitch"
                                className={`absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen transition-opacity duration-300 ${
                                    isGlitching
                                        ? 'opacity-100 animate-tv-glitch'
                                        : 'opacity-0 group-hover:opacity-100 group-hover:animate-tv-glitch'
                                }`}
                            />

                            {/* Cinematic Digital Scan Line (Overlay on Photo) */}
                            <motion.div
                                className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 via-primary to-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-20"
                                animate={{ top: ["0%", "100%"] }}
                                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                            />

                            {/* Overlay Tint */}
                            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </div>
                </motion.div>

                {/* ───── Right Column: Terminal ───── */}
                <motion.div
                    ref={terminalRef}
                    animate={terminalInView
                        ? { x: 0, opacity: 1 }
                        : { x: 150, opacity: 0 }
                    }
                    transition={{ duration: 0.9, ease: EASE }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#0a0a0a]/50 dark:bg-[#050505]/50 backdrop-blur-md border border-card-border rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Terminal Header */}
                    <div className="flex items-center px-4 py-3 bg-white/5 border-b border-card-border relative">
                        <div className="absolute left-4 flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
                        </div>
                        <div className="w-full text-center font-mono text-xs text-white/50 tracking-widest font-bold">
                            ABOUT_ME
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="px-8 sm:px-10 py-10 font-mono text-sm sm:text-base md:text-lg leading-loose text-white/80">
                        <div className="flex gap-4">
                            <span className="text-accent shrink-0">$</span>
                            <div className="typing-container">
                                <span className="text-white">open profile.info</span>
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
                            <div className="flex flex-col sm:flex-row sm:gap-4 border-l-2 border-primary/50 pl-4 py-1 items-start sm:items-center">
                                <span className="bg-primary/20 text-primary font-bold min-w-[120px] sm:min-w-[140px] text-center rounded-full px-3 py-1 text-xs sm:text-sm shadow-[0_0_10px_var(--theme-glow)] border border-primary/20">[ROLE]</span>
                                <span className="text-white mt-1 sm:mt-0 text-sm sm:text-base">Aspiring Data Engineer</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-4 border-l-2 border-primary/50 pl-4 py-1 items-start sm:items-center">
                                <span className="bg-emerald-500/20 text-emerald-400 font-bold min-w-[120px] sm:min-w-[140px] text-center rounded-full px-3 py-1 text-xs sm:text-sm shadow-[0_0_10px_rgba(16,185,129,0.2)] border border-emerald-500/20">[HISTORY]</span>
                                <span className="text-white mt-1 sm:mt-0 text-sm sm:text-base">
                                    {yearsOfExperience} Years @ Cognizant | Freelance Content Writer
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-4 border-l-2 border-primary/50 pl-4 py-1 items-start sm:items-center">
                                <span className="bg-accent/20 text-accent font-bold min-w-[120px] sm:min-w-[140px] text-center rounded-full px-3 py-1 text-xs sm:text-sm shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-accent/20">[SKILLS]</span>
                                <span className="text-white mt-1 sm:mt-0 text-sm sm:text-base">SQL | PySpark | Python | Snowflake | Databricks</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:gap-4 border-l-2 border-primary/50 pl-4 py-1 items-start sm:items-center">
                                <span className="bg-purple-500/20 text-purple-400 font-bold min-w-[120px] sm:min-w-[140px] text-center rounded-full px-3 py-1 text-xs sm:text-sm shadow-[0_0_10px_rgba(168,85,247,0.2)] border border-purple-500/20">[MISSION]</span>
                                <span className="text-white/80 text-xs sm:text-sm md:text-base mt-1 sm:mt-0">Building scalable and optimized data pipelines.</span>
                            </div>

                            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-white/5 text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">
                                <span>[Status: Online]</span>
                                <span>[Clearance: Level 4]</span>
                                <span>[Uptime: 99.9%]</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
