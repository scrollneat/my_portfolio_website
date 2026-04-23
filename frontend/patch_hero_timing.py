import re

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "r") as f:
    content = f.read()

# Replace blurVariants, typingContainer, typingChild, and eyebrowText definition
old_variants = """const blurVariants = {
  hidden: { filter: 'blur(12px)', opacity: 0, y: 30 },
  visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
};

const typingContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const typingChild = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const eyebrowText = "WELCOME TO MY NODE".split("");"""

new_variants = """const blurVariants = {
  hidden: { filter: 'blur(12px)', opacity: 0, y: 30 },
  visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut", delay: 1.5 } }
};

const text = "WELCOME TO MY NODE";

const typingContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const typingChild = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};"""

content = content.replace(old_variants, new_variants)

# Replace the eyebrow text rendering
old_render = """                    <motion.div 
                        className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate-500 dark:text-violet-400 flex"
                        variants={typingContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {eyebrowText.map((char, index) => (
                            <motion.span 
                                key={index} 
                                variants={typingChild}
                            >
                                {char === " " ? "\\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.div>"""

new_render = """                    <motion.div 
                        className="font-mono text-[12px] uppercase tracking-[0.15em] text-slate-500 dark:text-violet-400 flex whitespace-pre"
                        variants={typingContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {text.split("").map((char, index) => <motion.span key={index} variants={typingChild}>{char}</motion.span>)}
                    </motion.div>"""

content = content.replace(old_render, new_render)

# Replace the 3D cluster delay
old_cluster = """            <motion.div 
                className="col-span-1 lg:col-span-5 flex items-center justify-center relative [perspective:2000px]"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: 1.2 }}
            >"""

new_cluster = """            <motion.div 
                className="col-span-1 lg:col-span-5 flex items-center justify-center relative [perspective:2000px]"
                initial={{ opacity: 0, x: 100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: 2.5 }}
            >"""

content = content.replace(old_cluster, new_cluster)

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "w") as f:
    f.write(content)
