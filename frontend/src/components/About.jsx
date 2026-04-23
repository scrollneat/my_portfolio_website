import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="pt-32 pb-24 px-8 max-w-[1600px] mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="max-w-4xl mx-auto bg-[#0a0a0a] dark:bg-[#050505] border border-card-border rounded-lg shadow-2xl overflow-hidden"
            >
                {/* Terminal Header */}
                <div className="flex items-center px-4 py-3 bg-white/5 border-b border-card-border">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="mx-auto font-mono text-xs text-white/50 tracking-widest">
                        barathiselvan@core: ~/about
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-8 md:p-12 font-mono text-sm md:text-base leading-relaxed text-white/80">
                    <div className="flex gap-4">
                        <span className="text-accent shrink-0">$</span>
                        <div className="typing-container">
                            <span className="text-white">cat profile.txt</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 space-y-6">
                        <p className="border-l-2 border-primary/50 pl-4 py-2">
                            1.6 years at Cognizant as a Data Tester. Transitioning into Data Engineering with a focus on Snowflake and Databricks Lakehouse architectures.
                        </p>
                        <p>
                            Driven by a passion for scalable systems and optimized data pipelines. I build reliable backend architectures that process data efficiently, ensuring data integrity across large-scale ETL flows.
                        </p>
                        <div className="flex gap-4 mt-8 pt-6 border-t border-white/5 text-xs text-white/40 uppercase tracking-widest">
                            <span>[Status: Online]</span>
                            <span>[Clearance: Level 4]</span>
                            <span>[Uptime: 99.9%]</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
