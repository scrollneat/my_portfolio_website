import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-primary text-bg rounded-full shadow-[0_0_20px_rgba(var(--primary),0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
                >
                    <span className="material-symbols-outlined text-3xl group-hover:-translate-y-1 transition-transform">
                        arrow_upward
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
