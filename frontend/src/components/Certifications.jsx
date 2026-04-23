import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const certVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const certs = [
    {
        title: "Snowflake Core Certification",
        issuer: "Snowflake",
        image: "/certs/snowflake.png",
        date: "2023",
        colorClass: "from-[#29b5e8]/20 to-transparent",
        borderClass: "hover:border-[#29b5e8]/50",
        textClass: "group-hover:text-[#29b5e8]"
    },
    {
        title: "Databricks Data Engineer Associate",
        issuer: "Databricks",
        image: "/certs/databricks.png",
        date: "2024",
        colorClass: "from-[#ff3621]/20 to-transparent",
        borderClass: "hover:border-[#ff3621]/50",
        textClass: "group-hover:text-[#ff3621]"
    }
];

export default function Certifications() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <motion.section id="certifications" className="py-24 px-8 max-w-[1600px] mx-auto space-y-12" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="space-y-4">
                <h2 className="text-4xl font-headline font-bold tracking-tight text-white uppercase">Credentials</h2>
                <p className="font-label text-sm text-white/60 max-w-2xl">// Verified capabilities in core data platform ecosystems.</p>
            </div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {certs.map((cert, idx) => (
                    <motion.div 
                        key={idx}
                        variants={certVariants} transition={{ delay: idx * 0.2, duration: 0.7, ease: 'easeOut' }}
                        onClick={() => setSelectedImage(cert.image)}
                        className={`cursor-pointer group relative bg-white/5 backdrop-blur-[20px] border border-card-border p-8 transition-all duration-500 overflow-hidden ${cert.borderClass}`}
                    >
                        {/* Glassmorphism gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${cert.colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                        
                        <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-colors duration-500 group-hover:bg-white/10 overflow-hidden p-2">
                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                                </div>
                                <span className="font-mono text-xs text-white/40 border border-white/10 px-3 py-1 rounded-full">{cert.date}</span>
                            </div>
                            
                            <div>
                                <h3 className="font-headline text-2xl font-bold text-white mb-2">{cert.title}</h3>
                                <p className="font-mono text-sm text-white/60 tracking-widest uppercase">{cert.issuer}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* LightBox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                            className="relative w-full max-w-4xl rounded-xl border border-primary bg-bg shadow-[0_0_50px_rgba(var(--primary),0.2)] p-4 flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full flex justify-end pb-4">
                                <button 
                                    onClick={() => setSelectedImage(null)}
                                    className="font-label text-[10px] tracking-widest text-primary uppercase border border-primary/30 px-3 py-1 hover:bg-primary/10 transition-colors"
                                >
                                    [ CLOSE_SESSION ]
                                </button>
                            </div>
                            
                            <img src={selectedImage} alt="Certificate Full View" className="w-full max-h-[80vh] object-contain rounded" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
