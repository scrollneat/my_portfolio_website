import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// --- Scroll Animation Variants ---
const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        }
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

function MobileRevealButtons({ children, className }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.5 });

    return (
        <motion.div
            ref={ref}
            className={className}
            animate={{
                opacity:   typeof window !== 'undefined' && window.innerWidth < 768 ? (inView ? 1 : 0) : undefined,
                y:         typeof window !== 'undefined' && window.innerWidth < 768 ? (inView ? 0 : 16) : undefined,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

const PROJECTS = [
    {
        id: 'databricks-sql',
        title: "Databricks SQL Warehouse",
        description: "Optimized Medallion pipeline for CRM/ERP data integration.",
        tags: ["Databricks", "SQL", "Medallion", "Spark"],
        status: "LIVE",
        icon: "database",
        github: "https://github.com/scrollneat/databrics-sql-datawarehouse-project",
        docs: {
            title: "End-to-End Databricks SQL Warehouse",
            subtitle: "Implementing Medallion Architecture for CRM & ERP Integration",
            summary: "A scalable data engineering solution that automates the journey of raw CSV data from disparate sources into a refined Star Schema for BI consumption.",
            sections: [
                {
                    title: "The Medallion Pipeline (ETL Strategy)",
                    color: "text-primary",
                    content: (
                        <div className="space-y-4">
                            <p>Implemented a three-stage Medallion architecture to ensure data quality and lineage:</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs font-mono">
                                <div className="border border-white/10 p-3 bg-white/5 rounded-lg">
                                    <h4 className="text-emerald-400 mb-2">[ BRONZE ]</h4>
                                    <p className="text-white/40">Raw ingestion of CRM and ERP data. Zero transformations to preserve lineage.</p>
                                </div>
                                <div className="border border-white/10 p-3 bg-white/5 rounded-lg">
                                    <h4 className="text-primary mb-2">[ SILVER ]</h4>
                                    <p className="text-white/40">Deduplication, type casting, and schema enforcement. Cleaned and standardized.</p>
                                </div>
                                <div className="border border-white/10 p-3 bg-white/5 rounded-lg">
                                    <h4 className="text-accent mb-2">[ GOLD ]</h4>
                                    <p className="text-white/40">Business-ready aggregates and Star Schema modeling for BI/ML apps.</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <img src="/assets/databricks_arch.png" alt="Medallion Architecture" className="w-full rounded-xl border border-white/10 shadow-2xl" />
                                <p className="text-[10px] text-center mt-2 text-white/30 uppercase tracking-widest">Fig 1: Medallion Architecture Workflow</p>
                            </div>
                        </div>
                    )
                },
                {
                    title: "Relational Modeling (Integration)",
                    color: "text-accent",
                    content: (
                        <div className="space-y-4">
                            <p>The project handles complex Master Data Management (MDM) by synthesizing disparate customer and product records into a unified source of truth.</p>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                <li>Joined <code className="text-accent">crm_cust_info</code> with <code className="text-accent">erp_cust_az12</code> using unique Customer IDs.</li>
                                <li>Created a central Sales fact table linked to optimized Dimensions (Product, Customer, Location).</li>
                            </ul>
                            <div className="mt-6">
                                <img src="/assets/databricks_er.png" alt="ER Diagram" className="w-full rounded-xl border border-white/10 shadow-2xl" />
                                <p className="text-[10px] text-center mt-2 text-white/30 uppercase tracking-widest">Fig 2: Integration & ER Model</p>
                            </div>
                        </div>
                    )
                },
                {
                    title: "Technical Execution",
                    color: "text-primary",
                    content: (
                        <div className="space-y-4">
                            <p>Leveraged Databricks SQL as the primary engine for complex transformations and business logic implementation.</p>
                            <div className="bg-black/40 p-4 rounded-lg font-mono text-xs border border-white/5">
                                <p className="text-emerald-400">// Automation Strategy</p>
                                <p className="text-white/60">The pipeline is designed to be self-healing and trigger-ready. New CSV uploads to the source landing zone automatically initiate the medallion refresh, ensuring BI dashboards remain current.</p>
                            </div>
                        </div>
                    )
                }
            ]
        }
    },
    {
        id: 'melanies-smoothies',
        title: "Melanie's Smoothies",
        description: "A Snowflake-powered Streamlit app for real-time data management and interactive ordering.",
        tags: ["Snowflake", "Python", "Streamlit"],
        status: "COMPLETED",
        icon: "nutrition",
        github: "https://github.com/scrollneat/melanies_smoothies",
        docs: {
            title: "Melanie's Smoothies: Snowflake Data App",
            subtitle: "End-to-End Snowflake Integration & Streamlit Application",
            summary: "A cloud-native application designed to manage smoothie orders, demonstrating seamless integration between Snowflake's data storage and a Streamlit frontend.",
            sections: [
                {
                    title: "Cloud Infrastructure (Modern Data Stack)",
                    color: "text-primary",
                    content: (
                        <div className="space-y-4">
                            <p>Implemented a robust data pipeline utilizing the following components:</p>
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                <li><strong className="text-primary">Data Source:</strong> External S3 Buckets containing fruit and nutrition data.</li>
                                <li><strong className="text-primary">Snowflake Integration:</strong> Configured Stages and File Formats to ingest raw data efficiently.</li>
                                <li><strong className="text-primary">Processing:</strong> Leveraged Snowflake SQL to query and organize fruit lists and nutritional information.</li>
                            </ul>
                        </div>
                    )
                },
                {
                    title: "Technical Implementation",
                    color: "text-accent",
                    content: (
                        <div className="space-y-4">
                            <ul className="list-disc list-inside space-y-2 text-sm">
                                <li><strong className="text-accent">Frontend:</strong> Developed with Streamlit to create an interactive 'Smoothie Lab' for custom orders.</li>
                                <li><strong className="text-accent">Connection:</strong> Utilized the Snowflake Connector for Python to fetch real-time data.</li>
                                <li><strong className="text-accent">Functionality:</strong> Dynamic fruit selection, nutritional lookups, and direct order submission to Snowflake tables.</li>
                            </ul>
                        </div>
                    )
                }
            ]
        }
    },
    {
        id: 'python-mastery',
        title: "Python Mastery: 100-Day Sprint",
        description: "A 21-day (and counting) technical journey mastering Python logic, from basic syntax to complex game engines and automation tools.",
        tags: ["Python", "Logic", "Algorithms"],
        status: "IN_PROGRESS (Day 21)",
        icon: "terminal",
        github: "https://github.com/scrollneat/Barathiselvan.github.io/tree/main/PYTHON_PROJECT",
        docs: {
            title: "Python Mastery: 100-Day Sprint",
            subtitle: "Intensive Logic & Algorithm Development",
            summary: "A rigorous 100-day commitment to mastering Python, transitioning from foundational syntax to building complex game engines and automated systems.",
            sections: [
                {
                    title: "Training Progress",
                    color: "text-primary",
                    content: (
                        <div className="space-y-4">
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-widest">Sprint Velocity</span>
                                <span className="font-mono text-lg sm:text-xl text-primary">25/100 DAYS</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '25%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                />
                            </div>
                        </div>
                    )
                },
                {
                    title: "Key Milestones & Sprint Log",
                    color: "text-accent",
                    content: (
                        <div className="space-y-6">
                            <p className="text-sm text-white/60 italic">Logging technical progress across the 100-day journey. Now in reverse chronological order.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40">
                                {Array.from({ length: 25 }, (_, i) => 25 - i).map(day => {
                                    // Based on repository structure: Day 13 is missing, and 20/21 are combined
                                    if (day === 13) return null;

                                    let folderName = `Day%20-%20${String(day).padStart(2, '0')}`;
                                    if (day === 20 || day === 21) {
                                        folderName = `Day%20-%2020,%2021`;
                                    }

                                    const milestones = {
                                        25: { t: "CSV Data Analysis", s: "Processing and analyzing external datasets using Python's built-in CSV libraries." },
                                        24: { t: "File & Directory Logic", s: "Managing local file systems and persistent data storage." },
                                        23: { t: "Turtle Crossing", s: "Dynamic obstacle generation and difficulty scaling." },
                                        22: { t: "Pong Game Engine", s: "Two-player event handling and vector motion physics." },
                                        21: { t: "Snake Game (Part 2)", s: "Implementing high scores and persistent data storage." },
                                        20: { t: "Snake Game (Part 1)", s: "Coordinate systems and collision physics." },
                                        19: { t: "Turtle Race", s: "Event listeners and state instances in Turtle graphics." },
                                        18: { t: "Turtle Graphics Suite", s: "Mastering graphical output and shape generation." },
                                        17: { t: "Quiz Project", s: "Building a modular, class-based quiz engine." },
                                        16: { t: "OOP Coffee Machine", s: "Refactoring logic into Object-Oriented paradigms." },
                                        15: { t: "Coffee Machine", s: "Complex state management and resource tracking." },
                                        14: { t: "Higher Lower Game", s: "Logic comparison and data parsing from dictionaries." },
                                        12: { t: "Number Guessing", s: "Scope management and global/local variable logic." },
                                        11: { t: "Blackjack Engine", s: "Advanced OOP and recursive probability logic." },
                                        10: { t: "Calculator App", s: "Function recursion and return value handling." },
                                        9: { t: "Secret Auction", s: "Dictionary manipulation and finding maximum values." },
                                        8: { t: "Cæsar Cipher", s: "Encipherment logic and function parameters." },
                                        7: { t: "Hangman Logic", s: "Complex state management and loop optimization." },
                                        6: { t: "Escaping the Maze", s: "Defining and calling complex logic functions." },
                                        5: { t: "Password Generator", s: "Randomization algorithms and list manipulation." },
                                        4: { t: "Rock Paper Scissors", s: "List structures and conditional logic gates." },
                                        3: { t: "Treasure Island", s: "Nested conditionals and choice-driven logic." },
                                        2: { t: "Tip Calculator", s: "Data type manipulation and mathematical precision." },
                                        1: { t: "Pizza Shop / Intro", s: "Foundational syntax and logic-based bill generation." }
                                    };
                                    const m = milestones[day] || { t: "Python Logic", s: "Algorithmic thinking and logic implementation." };
                                    return (
                                        <a 
                                            key={day}
                                            href={`https://github.com/scrollneat/Barathiselvan.github.io/tree/main/PYTHON_PROJECT/${folderName}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-all group"
                                        >
                                            <h4 className="text-accent text-sm font-bold group-hover:text-primary transition-colors">Day {String(day).padStart(2, '0')}: {m.t}</h4>
                                            <p className="text-[10px] text-white/40">{m.s}</p>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
            ]
        }
    }
];

export default function ProjectsGrid() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.05 });

    const openDocs = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <motion.section
            ref={sectionRef}
            className="py-24 px-8 max-w-[1600px] mx-auto space-y-12"
            id="projects"
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="space-y-4">
                <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-4xl font-headline font-bold text-white uppercase">Projects</h2>
                <p className="font-label text-sm text-white/60 max-w-2xl">// Engineered solutions and automated pipelines.</p>
            </div>

            <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                variants={gridContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {PROJECTS.map((project, idx) => (
                    <TiltCard 
                        key={project.id}
                        variants={{
                            hidden: { opacity: 0, y: 50 }, 
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: (idx + 1) * 0.1 } }
                        }} 
                        className="group relative bg-bg/50 backdrop-blur-[12px] border border-card-border rounded-2xl p-8 transition-all duration-700 hover:bg-bg/80 hover:border-primary/50 overflow-hidden min-h-[400px] flex flex-col justify-between touch-manipulation cursor-pointer"
                        onClick={() => {
                            if (typeof window !== 'undefined' && window.innerWidth < 1024 && project.docs) {
                                openDocs(project);
                            }
                        }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${idx % 2 === 0 ? 'from-primary/5' : 'from-accent/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                        
                        <div className={`relative z-10 transition-transform duration-700 group-hover:-translate-y-2 ${idx % 2 === 0 ? 'group-hover:rotate-y-6' : 'group-hover:-rotate-y-6'}`}>
                            <div className="flex justify-between items-start mb-6">
                                <span className={`material-symbols-outlined text-4xl ${idx % 2 === 0 ? 'text-primary' : 'text-accent'}`} style={{ fontVariationSettings: "'FILL' 0" }}>{project.icon}</span>
                                <span className={`font-label text-xs ${project.status === 'LIVE' ? 'text-accent bg-accent/10 border-accent/20' : 'text-outline bg-white/5 border-white/10'} px-2 py-1 border`}>
                                    {project.status}
                                </span>
                            </div>
                            <h3 className="text-2xl font-headline font-semibold text-white mb-2">{project.title}</h3>
                            <p className="text-white/60 font-label text-sm mb-6 max-w-[95%]">{project.description}</p>
                            <div className="flex flex-wrap gap-2 font-label text-[10px] text-on-surface-variant uppercase tracking-wider">
                                {project.tags.map(tag => (
                                    <span key={tag} className="bg-transparent border border-card-border text-white/60 px-2 py-1">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <MobileRevealButtons className={`relative z-10 mt-8 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 ${idx % 2 === 0 ? 'group-hover:rotate-y-6' : 'group-hover:-rotate-y-6'}`}>
                            {project.docs && (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); openDocs(project); }}
                                    className="font-label text-xs uppercase tracking-widest text-on-surface border border-outline px-4 py-3 hover:border-primary hover:text-primary transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.0)] hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] flex items-center gap-2"
                                >
                                    DOCS <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>article</span>
                                </button>
                            )}
                            <a 
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`font-label text-xs uppercase tracking-widest ${idx % 2 === 0 ? 'text-primary border-primary hover:bg-primary' : 'text-accent border-accent hover:bg-accent'} px-6 py-3 hover:text-bg transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.0)] hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] flex items-center gap-2`}
                            >
                                View Project <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_forward</span>
                            </a>
                        </MobileRevealButtons>
                    </TiltCard>
                ))}
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && selectedProject && selectedProject.docs && (
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
                            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl border border-primary bg-bg p-8 md:p-12 shadow-[0_0_50px_rgba(var(--primary),0.2)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-[60px] sm:top-[80px] right-4 sm:right-6 font-label text-[8px] sm:text-[10px] tracking-widest text-white font-bold uppercase bg-[#DC2626] px-2 py-1 sm:px-4 sm:py-2 mr-2 sm:mr-6 z-[60] shadow-lg hover:bg-red-700 transition-colors"
                            >
                                CLOSE
                            </button>
                            
                            <div className="mb-8 border-b border-white/10 pb-6">
                                <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white mb-2">{selectedProject.docs.title}</h2>
                                <p className="text-primary font-mono text-[10px] sm:text-xs uppercase tracking-widest">{selectedProject.docs.subtitle}</p>
                            </div>
                            
                            <div className="space-y-12 font-body text-white/70 leading-relaxed">
                                <section>
                                    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-[1px] bg-white/20"></span> Executive Summary
                                    </h3>
                                    <p className="text-base sm:text-lg text-white/90 font-light">{selectedProject.docs.summary}</p>
                                </section>

                                {selectedProject.docs.sections.map((section, idx) => (
                                    <section key={idx} className="space-y-4">
                                        <h3 className={`text-lg sm:text-xl font-headline font-semibold ${section.color}`}>{section.title}</h3>
                                        <div className="text-white/70">
                                            {section.content}
                                        </div>
                                    </section>
                                ))}
                                
                                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                                        End of documentation // session_id: {selectedProject.id}
                                    </div>
                                    <a 
                                        href={selectedProject.github} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-sm tracking-widest text-white/50 hover:text-white border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 transition-all flex items-center gap-2"
                                    >
                                        SOURCE_CODE <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span>
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