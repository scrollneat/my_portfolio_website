import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ResponsiveHeader } from './ResponsiveHeader';

/* ── Inline SVG skill icons ─────────────────────────────── */
const skillIcons = {
    Python: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M11.914 0C5.826 0 6.2 2.66 6.2 2.66l.007 2.756h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.403 3.35-3.403h5.766s3.24.053 3.24-3.134V3.152S18.28 0 11.914 0zM8.708 1.82a1.047 1.047 0 1 1 0 2.094 1.047 1.047 0 0 1 0-2.094z" fill="currentColor" opacity=".85"/>
            <path d="M12.087 24c6.088 0 5.714-2.66 5.714-2.66l-.007-2.756h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.403-3.35 3.403H9.451s-3.24-.053-3.24 3.134v5.373S5.72 24 12.087 24zm3.206-1.82a1.047 1.047 0 1 1 0-2.094 1.047 1.047 0 0 1 0 2.094z" fill="currentColor" opacity=".85"/>
        </svg>
    ),
    SQL: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
    ),
    "C++": (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <text x="12" y="15" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold" fontFamily="monospace">C+</text>
        </svg>
    ),
    HTML: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M4 2l1.5 18L12 22l6.5-2L20 2H4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7.5 7h9l-.3 3H9l.2 3h7l-.5 4.5L12 19l-3.7-1.5-.2-2.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        </svg>
    ),
    CSS: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M4 2l1.5 18L12 22l6.5-2L20 2H4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M16 6H8l.3 3h7.2l-.5 5L12 15.5 9 14l-.2-2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        </svg>
    ),
    Snowflake: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity=".6"/>
        </svg>
    ),
    Databricks: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
            <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
            <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
        </svg>
    ),
    Pyspark: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        </svg>
    ),
    AWS: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M6 16c-2.5-1-4-3.5-4-6.5C2 5.36 5.36 2 9.5 2c3 0 5.56 1.77 6.76 4.32A5 5 0 0 1 22 11c0 2.76-2.24 5-5 5H6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M8 19l2 2m4-4l2 2m-6-1l1 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
    ),
    GitHub: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" fill="currentColor" opacity=".85"/>
        </svg>
    ),
    Jenkins: (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <circle cx="12" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M12 17v4M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="9" r="1" fill="currentColor"/>
            <circle cx="14" cy="9" r="1" fill="currentColor"/>
            <path d="M9.5 12.5c1 1 4 1 5 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none"/>
        </svg>
    ),
    "MS Office": (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1.2"/>
            <text x="15" y="17" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="bold" fontFamily="sans-serif">M</text>
        </svg>
    ),
    "Power Automate": (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path d="M5 4h14l-6 8 6 8H5l6-8-6-8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        </svg>
    ),
};

/* ── Skill data ──────────────────────────────────────────── */
const skillCategories = [
    { title: "LANGUAGES", icon: "code",  skills: ["Python", "SQL", "C++", "HTML", "CSS"] },
    { title: "BIG DATA & CLOUD INFRASTRUCTURE", icon: "cloud", skills: ["Snowflake", "Databricks", "Pyspark", "AWS"] },
    { title: "TOOLS",     icon: "build", skills: ["GitHub", "Jenkins", "MS Office", "Power Automate"] },
];

/* ── Individual Skill Badge ──────────────────────────────── */
function SkillBadge({ skill, sIdx, inView }) {
    return (
        <motion.span
            key={sIdx}
            animate={inView
                ? { borderColor: 'color-mix(in srgb, var(--primary) 50%, transparent)', color: 'var(--primary)' }
                : { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }
            }
            transition={{ duration: 0.4, delay: sIdx * 0.06 }}
            className="skill-badge font-label text-xs uppercase tracking-wider border px-4 py-2 rounded-lg inline-flex items-center gap-2 cursor-default select-none"
        >
            {skillIcons[skill] || null}
            {skill}
        </motion.span>
    );
}

/* ── Skill Card ──────────────────────────────────────────── */
function SkillCard({ category, idx }) {
    const cardRef = useRef(null);
    const inView = useInView(cardRef, { once: false, amount: 0.5 });

    return (
        <motion.div
            ref={cardRef}
            animate={inView
                ? { borderColor: 'var(--primary)', boxShadow: '0 0 40px var(--theme-glow)', scale: 1 }
                : { borderColor: 'rgba(255,255,255,0.1)', boxShadow: 'none', scale: 1 }
            }
            transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.05 }}
            className="skill-card group relative bg-bg/50 backdrop-blur-md border border-card-border p-8 transition-colors duration-500 hover:bg-bg/80 hover:border-primary flex flex-col h-full overflow-hidden rounded-2xl"
        >
            <motion.div
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-xl" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                    <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>
                        {category.icon}
                    </span>
                    <h3 className="font-mono text-lg font-bold text-white tracking-widest px-4 sm:px-0 leading-tight">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                    {category.skills.map((skill, sIdx) => (
                        <SkillBadge key={sIdx} skill={skill} sIdx={sIdx} inView={inView} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ── Skills Section ──────────────────────────────────────── */
export default function Skills() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.05 });

    return (
        <motion.section
            ref={sectionRef}
            id="skills"
            className="py-24 px-6 sm:px-8 max-w-[1600px] mx-auto space-y-12"
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
                    <ResponsiveHeader title="TECHNICAL_SKILLS" />
                </h2>
                <p className="font-label text-sm text-white/60 max-w-2xl">// Core competencies and operational tooling.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                {skillCategories.map((category, idx) => (
                    <SkillCard key={idx} category={category} idx={idx} />
                ))}
            </div>
        </motion.section>
    );
}
