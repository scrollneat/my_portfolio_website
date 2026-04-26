import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ResponsiveHeader } from './ResponsiveHeader';

const HERO_CERTS = [
    {
        title: "Databricks Certified Data Engineer Associate",
        issuer: "Databricks",
        image: "/assets/badges/Databricks Certified Data Engineer Associate-1.png",
        id: "Credential ID: 180688714",
        date: "Apr 2026",
        expiry: "Apr 2028",
        color: "rgba(255, 109, 0, 0.3)"
    },
    {
        title: "SnowPro Core Certification",
        issuer: "Snowflake",
        image: "/assets/badges/snowprocore_certification-1.png",
        id: "Credential ID: S122635-260405-COF",
        date: "Apr 2026",
        expiry: "Apr 2028",
        color: "rgba(56, 189, 248, 0.3)"
    }
];

const WORKSHOPS = [
    { 
        title: "Data Warehousing", 
        image: "/assets/badges/Data Warehousing Workshop-1.png",
        date: "Oct 5, 2025",
        issuer: "Snowflake"
    },
    { 
        title: "Collaboration & Marketplace", 
        image: "/assets/badges/Collaboration, Marketplace  Cost Estimation-1.png",
        date: "Oct 7, 2025",
        issuer: "Snowflake"
    },
    { 
        title: "Data Applications", 
        image: "/assets/badges/Data Application Builders Workshop-1.png",
        date: "Oct 11, 2025",
        issuer: "Snowflake"
    },
    { 
        title: "Data Lake", 
        image: "/assets/badges/Data Lake Workshop-1.png",
        date: "Oct 12, 2025",
        issuer: "Snowflake"
    },
    { 
        title: "Data Engineering", 
        image: "/assets/badges/Data Engineering Workshop-1.png",
        date: "Oct 21, 2025",
        issuer: "Snowflake"
    }
];

export default function Certifications() {
    const [selectedImage, setSelectedImage] = useState(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.05 });

    return (
        <motion.section
            ref={sectionRef}
            id="certifications"
            className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto space-y-20"
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Header */}
            <div className="relative z-10 space-y-4 px-2 md:px-0 w-full max-w-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase leading-tight w-full">
                    <ResponsiveHeader title="PROFESSIONAL_CERTIFICATIONS" />
                </h2>
                <p className="font-label text-sm text-white/60 max-w-2xl pl-1">// Verified expertise in distributed computing and cloud data architecture.</p>
            </div>

            {/* Hero Credentials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {HERO_CERTS.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedImage(cert.image)}
                        className="group relative cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary/50"
                    >
                        <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-primary/10 to-transparent"
                            style={{ background: `radial-gradient(circle at center, ${cert.color}, transparent 70%)` }}
                        ></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="w-48 h-48 flex-shrink-0 flex items-center justify-center p-4 bg-white/5 border border-white/5 rounded-2xl group-hover:bg-white/10 transition-colors duration-500">
                                <img 
                                    src={cert.image} 
                                    alt={cert.title} 
                                    className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500" 
                                />
                            </div>
                            <div className="flex-grow space-y-4 text-center md:text-left">
                                <div>
                                    <h3 className="font-headline text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{cert.title}</h3>
                                    <p className="font-mono text-xs text-primary tracking-widest uppercase">{cert.issuer}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                    <div>
                                        <p className="font-label text-[10px] text-white/40 uppercase tracking-tighter">Issued</p>
                                        <p className="font-mono text-xs text-white/80">{cert.date}</p>
                                    </div>
                                    <div>
                                        <p className="font-label text-[10px] text-white/40 uppercase tracking-tighter">Expires</p>
                                        <p className="font-mono text-xs text-white/80">{cert.expiry}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="font-label text-[10px] text-white/40 uppercase tracking-tighter">Verification</p>
                                        <p className="font-mono text-[10px] text-white/60 truncate">{cert.id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Workshops Section */}
            <div className="space-y-10 pt-12">
                <div className="relative z-10 flex items-center gap-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white/80 uppercase leading-tight">
                        <ResponsiveHeader title="HANDS-ON_WORKSHOPS" />
                    </h2>
                    <div className="h-[1px] flex-grow bg-white/10"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {WORKSHOPS.map((workshop, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10, scale: 1.02 }}
                            onClick={() => setSelectedImage(workshop.image)}
                            className="group relative cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 hover:border-primary/50 hover:bg-white/10"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="w-full h-24 flex items-center justify-center p-2 rounded-xl overflow-hidden mb-2">
                                <img 
                                    src={workshop.image} 
                                    alt={workshop.title} 
                                    className="h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-500" 
                                />
                            </div>
                            
                            <div className="w-full space-y-2 text-center">
                                <h4 className="font-headline text-sm font-bold text-white/90 group-hover:text-white transition-colors line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                                    {workshop.title}
                                </h4>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="font-mono text-[10px] text-primary tracking-widest uppercase">{workshop.issuer}</span>
                                    <span className="font-label text-[10px] text-white/40 uppercase tracking-tighter">{workshop.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* LightBox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                            className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">CERTIFICATE_FULL_VIEW</span>
                                <button 
                                    onClick={() => setSelectedImage(null)}
                                    className="material-symbols-outlined text-white/60 hover:text-white transition-colors"
                                >
                                    close
                                </button>
                            </div>
                            <div className="w-full flex items-center justify-center cursor-zoom-in">
                                <Zoom>
                                    <img 
                                        src={selectedImage} 
                                        alt="Certificate Full View" 
                                        className="w-full max-h-[70vh] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
                                    />
                                </Zoom>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}
