import re

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/ProjectsGrid.jsx", "r") as f:
    content = f.read()

# Add imports and TiltCard
imports = """import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

function TiltCard({ children, className }) {
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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function ProjectsGrid() {"""

content = content.replace("export default function ProjectsGrid() {", imports)

# Replace the outer divs of the 4 cards
# The cards start with <div className="group relative bg-surface-container/50... style={{ perspective: "1000px" }}>
# and end right before the next {/* Project Card X */} or </div>\n        </section>

# regex to replace <div className="group relative ... style={{ perspective: "1000px" }}>
# with <TiltCard className="group relative ...">
content = re.sub(
    r'<div className="(group relative bg-surface-[^"]+)" style={{ perspective: "1000px" }}>',
    r'<TiltCard className="\1">',
    content
)

# Replace the closing </div> for each card. 
# It's tricky with regex, let's just do a string replace of the exact card structure closures.
# Actually, if we just look at the indentation...
# A card ends with:
#                     </div>
#                 </div>
# And the next line is either \n                {/* Project Card X */} or \n            </div>\n        </section>

# It might be easier to just manually write the replacements for the 4 closures:
# Card 1:
content = content.replace("""                    </div>
                </div>

                {/* Project Card 2 */}""", """                    </div>
                </TiltCard>

                {/* Project Card 2 */}""")

# Card 2:
content = content.replace("""                    </div>
                </div>

                {/* Project Card 3 */}""", """                    </div>
                </TiltCard>

                {/* Project Card 3 */}""")

# Card 3:
content = content.replace("""                    </div>
                </div>

                {/* Project Card 4 */}""", """                    </div>
                </TiltCard>

                {/* Project Card 4 */}""")

# Card 4:
content = content.replace("""                    </div>
                </div>
            </div>
        </section>""", """                    </div>
                </TiltCard>
            </div>
        </section>""")

with open("/home/visalini/Documents/Portfolio_Website/frontend/src/components/ProjectsGrid.jsx", "w") as f:
    f.write(content)

