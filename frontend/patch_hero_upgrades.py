import re

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "r") as f:
    content = f.read()

# Replace the buttons
old_buttons = """                <motion.div variants={itemVariants} className="pt-4 flex flex-wrap gap-4 items-center">
                    <button className="px-8 py-4 bg-primary text-on-primary font-label font-bold tracking-wide rounded hover:bg-primary-fixed transition-colors duration-300 shadow-[0_0_15px_rgba(207,188,255,0.2)] hover:shadow-[0_0_25px_rgba(207,188,255,0.4)]">VIEW PROJECTS</button>
                    <button className="px-8 py-4 bg-transparent border border-outline text-on-surface font-label font-bold tracking-wide rounded hover:bg-surface-container-high hover:border-primary transition-all duration-300">DOWNLOAD RESUME</button>
                </motion.div>"""

new_buttons = """                <motion.div variants={itemVariants} className="pt-4 flex flex-wrap gap-4 items-center">
                    <motion.button 
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                        variants={{ hover: { scale: 1.05 } }}
                        className="relative overflow-hidden px-8 py-4 bg-primary text-on-primary font-label font-bold tracking-wide rounded transition-colors duration-300 shadow-[0_0_15px_rgba(207,188,255,0.2)] hover:shadow-[0_0_25px_rgba(207,188,255,0.4)]"
                    >
                        <motion.div 
                            className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-100/50 to-transparent -skew-x-12"
                            variants={{
                                hidden: { left: "-100%" },
                                hover: { left: "100%" }
                            }}
                            initial="hidden"
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{ top: 0, bottom: 0 }}
                        />
                        <span className="relative z-10">VIEW PROJECTS</span>
                    </motion.button>
                    <button className="px-8 py-4 bg-transparent border border-outline text-on-surface font-label font-bold tracking-wide rounded hover:bg-surface-container-high hover:border-primary transition-all duration-300">DOWNLOAD RESUME</button>
                </motion.div>"""

content = content.replace(old_buttons, new_buttons)

# Replace the connection div
old_connection = """                <div className="relative w-full aspect-square max-w-[500px] transform-gpu [transform:rotateX(35deg)_rotateZ(-45deg)] scale-[0.8] md:scale-100">
                    <div className="absolute inset-0 m-auto w-[60%] h-[60%] border-l-2 border-t-2 border-primary/20 -translate-x-4 translate-y-4"></div>"""

new_connection = """                <div className="relative w-full aspect-square max-w-[500px] transform-gpu [transform:rotateX(35deg)_rotateZ(-45deg)] scale-[0.8] md:scale-100">
                    <svg className="absolute inset-0 m-auto w-full h-full overflow-visible pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.line 
                            x1="50" y1="50" x2="85" y2="15"
                            stroke="#cfbcff" 
                            strokeWidth="0.5" 
                            strokeOpacity="0.4" 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 4.0 }}
                        />
                        <motion.line 
                            x1="50" y1="50" x2="15" y2="85"
                            stroke="#cfbcff" 
                            strokeWidth="0.5" 
                            strokeOpacity="0.4" 
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut", delay: 4.0 }}
                        />
                    </svg>"""

content = content.replace(old_connection, new_connection)

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/Hero.jsx", "w") as f:
    f.write(content)
