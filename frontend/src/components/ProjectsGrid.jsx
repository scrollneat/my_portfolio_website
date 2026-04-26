import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
                                            className="p-3 pr-12 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-primary/30 transition-all group"
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
    },
    {
        id: 'obsidian-portfolio',
        title: "Obsidian: Data Engineer Portfolio",
        description: "A custom-engineered React portfolio featuring dynamic experience tracking and a Cyber-Industrial aesthetic.",
        tags: ["React", "Tailwind", "Framer-Motion"],
        status: "LIVE",
        icon: "shield",
        github: "https://github.com/scrollneat/my_portfolio_website",
        docs: {
            title: "Obsidian: Data Engineer Portfolio",
            subtitle: "Custom React UI/UX System & Data Tracking",
            summary: "A high-performance portfolio engineered for technical depth, featuring a modular documentation system and real-time experience logic.",
            sections: [
                {
                    title: "Design System: The Obsidian Theme",
                    color: "text-primary",
                    content: (
                        <div className="space-y-4">
                            <p>Developed a 'Cyber-Industrial' aesthetic using a custom color palette dominated by deep obsidian backgrounds and high-contrast vibrant accents.</p>
                            <img src="/assets/obsidian_theme.png" alt="Obsidian Theme" className="w-full rounded-xl border border-white/10 shadow-2xl" />
                        </div>
                    )
                },
                {
                    title: "Visual Excellence: Emerald Mode",
                    color: "text-accent",
                    content: (
                        <div className="space-y-4">
                            <p>Implemented dynamic theme switching with synchronized color tokens across all components. Emerald Mode provides a high-visibility alternative while maintaining the core industrial look.</p>
                            <img src="/assets/obsidian_emerald.png" alt="Emerald Mode" className="w-full rounded-xl border border-white/10 shadow-2xl" />
                        </div>
                    )
                },
                {
                    title: "Technical Core: Terminal UI & Live Metrics",
                    color: "text-primary",
                    content: (
                        <div className="space-y-4">
                            <p>The profile section features a terminal-style card with a custom logic engine to calculate experience years in real-time, ensuring the portfolio never requires manual history updates.</p>
                            <img src="/assets/obsidian_about.png" alt="About Interface" className="w-full rounded-xl border border-white/10 shadow-2xl" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                    <h4 className="text-primary text-xs font-mono uppercase mb-2">Real-Time History</h4>
                                    <p className="text-[10px] text-white/40">Custom hooks calculate 1.8+ years of experience based on hire dates and current UTC time.</p>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                    <h4 className="text-accent text-xs font-mono uppercase mb-2">Doc Engine</h4>
                                    <p className="text-[10px] text-white/40">A modular Markdown-to-Doc system that transforms project metadata into rich, immersive case studies.</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            ]
        }
    }
];

export default function ProjectsGrid() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedDistance, setDraggedDistance] = useState(0);
    const [startX, setStartX] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(0);
    
    const carouselRef = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.05 });

    // --- Task 1: Triple-Clone Technique ---
    const INFINITE_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS];
    const cardWidth = 450;
    const gap = 24;
    const singleSetWidth = PROJECTS.length * (cardWidth + gap);

    // --- Task 2: Initial 'Middle' Start ---
    useEffect(() => {
        if (carouselRef.current) {
            // Instant jump to middle set without animation
            carouselRef.current.scrollTo({
                left: singleSetWidth,
                behavior: 'auto'
            });
        }
    }, [singleSetWidth]);

    const openDocs = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const scroll = (direction) => {
        if (carouselRef.current) {
            const isMobile = window.innerWidth < 768;
            const currentCardWidth = isMobile ? window.innerWidth * 0.85 : cardWidth;
            const scrollAmount = direction === 'left' ? -(currentCardWidth + gap) : (currentCardWidth + gap);
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // --- Task 3: The Silent Reset (The Magic Trick) ---
    const handleScroll = () => {
        if (!carouselRef.current) return;

        const { scrollLeft, scrollWidth, offsetWidth } = carouselRef.current;
        const thirdWidth = scrollWidth / 3;
        
        // Instant jump to middle if user reaches boundaries
        if (scrollLeft < 10) {
            carouselRef.current.scrollTo({
                left: scrollLeft + thirdWidth,
                behavior: 'auto'
            });
        } else if (scrollLeft > scrollWidth - offsetWidth - 10) {
            carouselRef.current.scrollTo({
                left: scrollLeft - thirdWidth,
                behavior: 'auto'
            });
        }

        // Active Index Tracking (calculated from middle section)
        if (!isDragging) {
            const isMobile = window.innerWidth < 768;
            const currentCardWidth = isMobile ? offsetWidth * 0.85 : cardWidth;
            const index = Math.round((scrollLeft % singleSetWidth) / (currentCardWidth + gap));
            if (index !== activeIndex) {
                setActiveIndex(index % PROJECTS.length);
            }
        }
    };

    // --- Mouse Drag Logic with Click Protection ---
    const onMouseDown = (e) => {
        setIsDragging(true);
        setDraggedDistance(0);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeftState(carouselRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setTimeout(() => setIsDragging(false), 50);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const dist = Math.abs(x - startX);
        setDraggedDistance(dist);
        
        const walk = (x - startX) * 2;
        carouselRef.current.scrollTo({
            left: scrollLeftState - walk,
            behavior: 'auto'
        });
    };

    return (
        <motion.section
            ref={sectionRef}
            className="py-24 px-4 sm:px-8 max-w-[1600px] mx-auto space-y-12 overflow-hidden"
            id="projects"
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-4 sm:px-0">
                <div className="space-y-4">
                    <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-4xl font-headline font-bold text-white uppercase">Projects</h2>
                    <p className="font-label text-sm text-white/60 max-w-2xl">// Engineered solutions and automated pipelines.</p>
                </div>
            </div>

            {/* Task 4: Top-Center Navigation Controls */}
            <div className="flex justify-center gap-4 mb-8">
                <button 
                    onClick={() => scroll('left')}
                    className="w-12 h-12 bg-primary/10 border border-primary/30 text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-bg shadow-[0_0_20px_rgba(var(--primary),0.1)] active:scale-95"
                >
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="w-12 h-12 bg-primary/10 border border-primary/30 text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-bg shadow-[0_0_20px_rgba(var(--primary),0.1)] active:scale-95"
                >
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>

            <div className="relative group/carousel px-0 md:px-12">
                {/* Native Scroll Container with Manual Infinite Loop & Drag Logic */}
                <div 
                    ref={carouselRef}
                    onScroll={handleScroll}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                    className={`flex overflow-x-auto ${isDragging ? 'snap-none cursor-grabbing' : 'snap-x snap-mandatory cursor-grab'} scroll-smooth gap-6 py-8 px-4 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none`}
                >
                    {INFINITE_PROJECTS.map((project, idx) => (
                        <div
                            key={`${project.id}-${idx}`}
                            className="w-[85vw] md:w-[450px] snap-center shrink-0"
                        >
                            <div
                                className={`group relative h-full bg-bg/50 backdrop-blur-[12px] border rounded-2xl p-8 transition-all duration-500 hover:bg-bg/80 ${(idx % PROJECTS.length) === activeIndex ? 'border-primary/50 shadow-[0_0_50px_rgba(var(--primary),0.1)]' : 'border-white/5'} overflow-hidden min-h-[420px] flex flex-col justify-between cursor-pointer`}
                                onClick={(e) => {
                                    if (draggedDistance > 5) {
                                        e.preventDefault();
                                        return;
                                    }
                                    openDocs(project);
                                }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${idx % 2 === 0 ? 'from-primary/5' : 'from-accent/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
                                
                                <div className="relative z-10 pointer-events-none">
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

                                <div className="relative z-10 mt-8 flex justify-end gap-4">
                                    {project.docs && (
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                if (draggedDistance <= 5) openDocs(project); 
                                            }}
                                            className="font-label text-xs uppercase tracking-widest text-on-surface border border-outline px-4 py-3 hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2 relative z-20"
                                        >
                                            DOCS <span className="material-symbols-outlined text-sm">article</span>
                                        </button>
                                    )}
                                    <a 
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => {
                                            if (draggedDistance > 5) e.preventDefault();
                                            else e.stopPropagation();
                                        }}
                                        className={`font-label text-xs uppercase tracking-widest ${idx % 2 === 0 ? 'text-primary border-primary hover:bg-primary' : 'text-accent border-accent hover:bg-accent'} px-6 py-3 hover:text-bg transition-all duration-300 flex items-center gap-2 relative z-20`}
                                    >
                                        Source <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 pt-4">
                {PROJECTS.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            if (carouselRef.current) {
                                const isMobile = window.innerWidth < 768;
                                const currentCardWidth = isMobile ? carouselRef.current.offsetWidth * 0.85 : 450;
                                carouselRef.current.scrollTo({ left: singleSetWidth + idx * (currentCardWidth + gap), behavior: 'smooth' });
                            }
                        }}
                        className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === idx ? 'w-8 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]' : 'w-2 bg-white/20'}`}
                    />
                ))}
            </div>

            {/* Documentation Modal */}
            <AnimatePresence>
                {isModalOpen && selectedProject && selectedProject.docs && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-primary/30 bg-bg p-8 md:p-12 shadow-[0_0_80px_rgba(var(--primary),0.15)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 sm:top-8 right-6 sm:right-8 group flex items-center gap-2"
                            >
                                <span className="text-[10px] font-mono text-white/40 group-hover:text-primary transition-colors tracking-widest uppercase">Esc // Close</span>
                                <div className="w-10 h-10 bg-[#DC2626] flex items-center justify-center rounded-lg shadow-lg hover:scale-110 transition-all">
                                    <span className="material-symbols-outlined text-white font-bold">close</span>
                                </div>
                            </button>
                            
                            <div className="mb-10 border-b border-white/5 pb-8 pr-20">
                                <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white mb-3">{selectedProject.docs.title}</h2>
                                <p className="text-primary font-mono text-xs sm:text-sm uppercase tracking-widest opacity-80">{selectedProject.docs.subtitle}</p>
                            </div>
                            
                            <div className="space-y-16 font-body text-white/70 leading-relaxed">
                                <section>
                                    <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/60 mb-6 flex items-center gap-4">
                                        <span className="w-12 h-[1px] bg-primary/30"></span> Abstract
                                    </h3>
                                    <p className="text-lg sm:text-xl text-white/90 font-light italic border-l-2 border-primary/20 pl-6">{selectedProject.docs.summary}</p>
                                </section>

                                {selectedProject.docs.sections.map((section, idx) => (
                                    <section key={idx} className="space-y-6">
                                        <h3 className={`text-xl sm:text-2xl font-headline font-semibold ${section.color} flex items-center gap-3`}>
                                            <span className="w-2 h-2 rounded-full bg-current opacity-50"></span>
                                            {section.title}
                                        </h3>
                                        <div className="text-white/70 text-base sm:text-lg overflow-x-auto scrollbar-thin scrollbar-thumb-white/10">
                                            {section.content}
                                        </div>
                                    </section>
                                ))}
                                
                                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
                                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                        Terminal Endpoint // session_0x{selectedProject.id}
                                    </div>
                                    <a 
                                        href={selectedProject.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="font-label text-xs uppercase tracking-[0.2em] text-primary hover:text-white transition-all flex items-center gap-3 border border-primary/20 px-6 py-3 rounded-full hover:bg-primary/5"
                                    >
                                        <span className="whitespace-nowrap flex items-center justify-center gap-3">
                                            [ ACCESS_REPOSITORY ] <span className="material-symbols-outlined text-sm">open_in_new</span>
                                        </span>
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