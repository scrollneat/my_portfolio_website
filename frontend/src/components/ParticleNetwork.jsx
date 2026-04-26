import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleNetwork({ theme }) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const obsidianOptions = {
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
            modes: {
                grab: { distance: 200, links: { opacity: 0.8, color: "#06b6d4" } },
            },
        },
        particles: {
            color: { value: ["#a855f7", "#06b6d4"] },
            links: { color: "#8b5cf6", distance: 150, enable: true, opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1.2, direction: "none", random: false, straight: false, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: { min: 0.2, max: 0.6 } },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    };

    const emeraldOptions = {
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
            modes: {
                grab: { distance: 200, links: { opacity: 0.8, color: "#34d399" } },
            },
        },
        particles: {
            color: { value: ["#10b981", "#34d399"] },
            links: { color: "#10b981", distance: 150, enable: true, opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1.2, direction: "none", random: false, straight: false, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: { min: 0.2, max: 0.6 } },
            size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    };

    const solarOptions = {
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
            modes: {
                grab: { distance: 200, links: { opacity: 0.8, color: "#FF6D00" } },
            },
        },
        particles: {
            color: { value: ["#FF6D00", "#FBBF24"] },
            links: { color: "#FF6D00", distance: 150, enable: true, opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1.4, direction: "none", random: false, straight: false, outModes: { default: "bounce" } },
            number: { density: { enable: true, area: 800 }, value: 90 },
            opacity: { value: { min: 0.3, max: 0.7 } },
            size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
    };

    if (init) {
        return (
            <div className="fixed inset-0 -z-10">
                <Particles
                    key={theme}   /* remount on theme change */
                    id="tsparticles"
                    options={
                        theme === 'emerald' ? emeraldOptions : 
                        theme === 'solar' ? solarOptions : 
                        obsidianOptions
                    }
                />
            </div>
        );
    }

    return null;
}