import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const skillCategories = [
    {
        title: "LANGUAGES",
        icon: "code",
        skills: ["Python", "SQL", "Go"]
    },
    {
        title: "CLOUD",
        icon: "cloud",
        skills: ["Snowflake", "Databricks", "AWS"]
    },
    {
        title: "TOOLS",
        icon: "build",
        skills: ["Airflow", "Selenium", "GitHub Actions"]
    }
];

export default function Skills() {
    return (
        <motion.section id="skills" className="py-24 px-8 max-w-[1600px] mx-auto space-y-12" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="space-y-4">
                <h2 className="text-4xl font-headline font-bold tracking-tight text-white uppercase">Technical_Arsenal</h2>
                <p className="font-label text-sm text-white/60 max-w-2xl">// Core competencies and operational tooling.</p>
            </div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {skillCategories.map((category, idx) => (
                    <motion.div 
                        key={idx} 
                        variants={cardVariants} transition={{ delay: idx * 0.1, duration: 0.6, ease: 'easeOut' }}
                        className="group relative bg-bg/50 backdrop-blur-md border border-card-border p-8 transition-all duration-500 hover:bg-bg/80 hover:border-primary flex flex-col h-full overflow-hidden"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-xl"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="material-symbols-outlined text-3xl text-primary" style={{fontVariationSettings: "'FILL' 0"}}>{category.icon}</span>
                                <h3 className="font-mono text-lg font-bold text-white tracking-widest">{category.title}</h3>
                            </div>
                            
                            <div className="flex flex-wrap gap-3 mt-auto">
                                {category.skills.map((skill, sIdx) => (
                                    <span 
                                        key={sIdx} 
                                        className="font-label text-xs uppercase tracking-wider text-white/80 bg-white/5 border border-white/10 px-4 py-2 group-hover:border-primary/40 group-hover:text-primary transition-colors duration-300 shadow-[0_0_10px_rgba(var(--primary),0.0)] group-hover:shadow-[0_0_10px_rgba(var(--primary),0.2)]"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
