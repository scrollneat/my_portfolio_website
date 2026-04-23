import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

// --- Scroll Animation Variants ---
const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Delays each card by 0.2s for a cascading effect
        }
    }
};

const projectCardVariants = {
    hidden: { opacity: 0, y: 50 }, // Starts 50px lower and invisible
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

function TiltCard({ children, className, variants }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function ProjectsGrid() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <motion.section className="py-24 px-8 max-w-[1600px] mx-auto space-y-12" id="projects" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="space-y-4">
                <h2 className="text-4xl font-headline font-bold tracking-tight text-white uppercase">Projects</h2>
                <p className="font-label text-sm text-white/60 max-w-2xl">// Engineered solutions and automated pipelines.</p>
            </div>

            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >

                {/* Project Card 1 */}
                <TiltCard variants={{hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } }}} className="group relative bg-bg/50 backdrop-blur-[12px] border border-card-border rounded-none p-8 transition-all duration-700 hover:bg-bg/80 hover:border-primary/50 overflow-hidden min-h-[350px] flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-y-6">
                        <div className="flex justify-between items-start mb-6">
                            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>automation</span>
                            <span className="font-label text-xs text-accent bg-accent/10 px-2 py-1 border border-accent/20">LIVE</span>
                        </div>
                        <h3 className="text-2xl font-headline font-semibold text-white mb-2">Automated Gold Rate Scraper</h3>
                        <p className="text-white/60 font-label text-sm mb-6 max-w-[90%]">A daily automated scraper that fetches gold rates and updates a data store via GitHub Actions.</p>
                        <div className="flex flex-wrap gap-2 font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                            <span className="bg-transparent border border-card-border text-white/60 px-2 py-1">Python</span>
                            <span className="bg-transparent border border-card-border text-white/60 px-2 py-1">Selenium</span>
                            <span className="bg-transparent border border-card-border text-white/60 px-2 py-1">GitHub Actions</span>
                        </div>
                    </div>
                    <div className="relative z-10 mt-8 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 group-hover:rotate-y-6">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="font-label text-xs uppercase tracking-widest text-on-surface border border-outline px-4 py-3 hover:border-primary hover:text-primary transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.0)] hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] flex items-center gap-2"
                        >
                            DOCS <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>article</span>
                        </button>
                        <button className="font-label text-xs uppercase tracking-widest text-primary border border-primary px-6 py-3 hover:bg-primary hover:text-bg transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.0)] hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] flex items-center gap-2">
                            View Project <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                        </button>
                    </div>
                </TiltCard>

                {/* Project Card 2 */}
                <TiltCard variants={{hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } }}} className="group relative bg-bg/50 backdrop-blur-[12px] border border-card-border rounded-none p-8 transition-all duration-700 hover:bg-bg/80 hover:border-primary/50 overflow-hidden min-h-[350px] flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-2 group-hover:-rotate-y-6">
                        <div className="flex justify-between items-start mb-6">
                            <span className="material-symbols-outlined text-4xl text-accent" style={{ fontVariationSettings: "'FILL' 0" }}>sports_esports</span>
                            <span className="font-label text-xs text-outline bg-white/5 px-2 py-1 border border-white/10">COMPLETED</span>
                        </div>
                        <h3 className="text-2xl font-headline font-semibold text-white mb-2">Python Pong Engine</h3>
                        <p className="text-white/60 font-label text-sm mb-6 max-w-[90%]">A classic game engine built to demonstrate core Python logic and event handling.</p>
                        <div className="flex flex-wrap gap-2 font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                            <span className="bg-transparent border border-card-border text-white/60 px-2 py-1">Python</span>
                            <span className="bg-transparent border border-card-border text-white/60 px-2 py-1">Turtle</span>
                        </div>
                    </div>
                    <div className="relative z-10 mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 group-hover:-rotate-y-6">
                        <button className="font-label text-xs uppercase tracking-widest text-accent border border-accent px-6 py-3 hover:bg-accent hover:text-bg transition-all duration-300 shadow-[0_0_15px_rgba(var(--accent),0.0)] hover:shadow-[0_0_20px_rgba(var(--accent),0.4)] flex items-center gap-2">
                            View Project <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                        </button>
                    </div>
                </TiltCard>

                {/* Project Card 3 */}
                <TiltCard variants={{hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.3 } }}} className="group relative bg-bg/50 backdrop-blur-[12px] border border-card-border rounded-none p-8 transition-all duration-700 hover:bg-bg/80 hover:border-primary/50 overflow-hidden min-h-[350px] flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-y-6">
                        <div className="flex justify-between items-start mb-6">
                            <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>verified_user</span>
                            <span className="font-label text-xs text-accent bg-accent/10 px-2 py-1 border border-accent/20">TESTING</span>
                        </div>
                        <h3 className="text-2xl font-headline font-semibold text-white mb-2">Data Validation Framework</h3>
                        <p className="text-white/60 font-label text-sm mb-6 max-w-[90%]">Automated QA suite for ensuring data integrity across large-scale ETL pipelines.</p>
                        <div className="flex flex-wrap gap-2 font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                            <span className="bg-transparent border border-card-border text-white/60 px-2 py-1">Python</span>
                            <span className="bg-transparent border border-card-border text-white/60 px-2 py-1">PyTest</span>
                            <span className="bg-transparent border border-card-border text-white/60 px-2 py-1">SQL</span>
                        </div>
                    </div>
                    <div className="relative z-10 mt-8 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 group-hover:rotate-y-6">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="font-label text-xs uppercase tracking-widest text-on-surface border border-outline px-4 py-3 hover:border-primary hover:text-primary transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.0)] hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] flex items-center gap-2"
                        >
                            DOCS <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>article</span>
                        </button>
                        <button className="font-label text-xs uppercase tracking-widest text-primary border border-primary px-6 py-3 hover:bg-primary hover:text-bg transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.0)] hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] flex items-center gap-2">
                            View Project <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                        </button>
                    </div>
                </TiltCard>

            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl border border-primary bg-bg p-8 md:p-12 shadow-[0_0_50px_rgba(var(--primary),0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 font-label text-[10px] tracking-widest text-primary uppercase border border-primary/30 px-3 py-1 hover:bg-primary/10 transition-colors"
                            >
                                [ CLOSE_SESSION ]
                            </button>
                            
                            <h2 className="text-3xl font-headline font-bold text-white mb-8 border-b border-white/10 pb-4">Data Pipeline Analysis</h2>
                            
                            <div className="space-y-8 font-body text-white/70 leading-relaxed">
                                <section>
                                    <h3 className="text-xl font-headline font-semibold text-primary mb-3">Architecture</h3>
                                    <p>The automated gold rate scraper is designed as a serverless micro-pipeline. It acts as an automated ingestion layer that fetches time-series data from public commodities exchanges, parses the unstructured HTML, and normalizes the payload into a structured JSON and CSV format suitable for downstream analytical warehouses.</p>
                                </section>
                                
                                <section>
                                    <h3 className="text-xl font-headline font-semibold text-accent mb-3">Tooling (Selenium/Python)</h3>
                                    <p>Python drives the core execution logic, utilizing Selenium WebDriver in headless mode to bypass dynamic JavaScript rendering barriers. The DOM is traversed using robust XPath selectors, ensuring high fault tolerance against minor UI updates on the target site. The extracted data is cast to strictly typed pandas DataFrames for validation.</p>
                                </section>
                                
                                <section>
                                    <h3 className="text-xl font-headline font-semibold text-primary mb-3">Automated Execution (GitHub Actions)</h3>
                                    <p>The entire pipeline is orchestrated via GitHub Actions. A CRON job triggers the workflow daily at market close. The action spins up an Ubuntu runner, installs the necessary dependencies, executes the scraping script, and automatically commits the resulting datasets back to the repository—acting as a free, decentralized data store.</p>
                                </section>
                                
                                <div className="pt-8 border-t border-white/10 flex justify-end">
                                    <a href="#" className="font-mono text-sm tracking-widest text-white/50 hover:text-white border-b border-transparent hover:border-white transition-all pb-1 flex items-center gap-2">
                                        VIEW REPOSITORY <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}