import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
    { title: "LANGUAGES", icon: "code",  skills: ["Python", "SQL", "Go"] },
    { title: "CLOUD & BIG DATA", icon: "cloud", skills: ["Snowflake", "Databricks", "PySpark", "AWS"] },
    { title: "TOOLS",     icon: "build", skills: ["Airflow", "Selenium", "GitHub Actions"] },
];

// Task 2 — Each card gets its own inView ref so it pulses when centered on screen
function SkillCard({ category, idx }) {
    const cardRef = useRef(null);
    // amount: 0.5 → lights up when 50% of the card is visible (centered on mobile)
    const inView = useInView(cardRef, { once: false, amount: 0.5 });

    return (
        <motion.div
            ref={cardRef}
            animate={inView
                ? { borderColor: 'var(--primary)', boxShadow: '0 0 30px var(--theme-glow)', scale: 1 }
                : { borderColor: 'rgba(255,255,255,0.1)', boxShadow: 'none', scale: 1 }
            }
            transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.05 }}
            className="group relative bg-bg/50 backdrop-blur-md border border-card-border p-8 transition-colors duration-500 hover:bg-bg/80 hover:border-primary flex flex-col h-full overflow-hidden rounded-2xl"
        >
            {/* Hover/inView Glow Overlay */}
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
                    <h3 className="font-mono text-lg font-bold text-white tracking-widest">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                    {category.skills.map((skill, sIdx) => (
                        <motion.span
                            key={sIdx}
                            animate={inView
                                ? { borderColor: 'color-mix(in srgb, var(--primary) 40%, transparent)', color: 'var(--primary)' }
                                : { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }
                            }
                            transition={{ duration: 0.4, delay: sIdx * 0.05 }}
                            className="font-label text-xs uppercase tracking-wider bg-white/5 border px-4 py-2 transition-shadow duration-300"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

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
            {/* Task 4 — text-2xl on mobile, scales up */}
            <div className="space-y-4">
                <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-4xl font-headline font-bold text-white uppercase">
                    Technical_Arsenal
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
