import { useEffect, useRef } from 'react';

export function Background3D() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        const numStars = 400;
        const stars: { x: number, y: number, z: number, o: number, size: number }[] = [];

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * 2000,
                o: Math.random(),
                size: Math.random() * 1.5 + 0.5
            });
        }

        let scrollY = window.scrollY;
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            scrollY = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll);

        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX - width / 2) * 0.05;
            mouseY = (e.clientY - height / 2) * 0.05;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            // Check current theme
            const isNeon = document.documentElement.classList.contains('neon');
            const isDark = document.documentElement.classList.contains('dark') || document.documentElement.classList.length === 0; // Defaulting to dark

            // Set canvas background filling
            if (isNeon) {
                ctx.fillStyle = 'rgba(10, 10, 15, 0.4)';
            } else if (isDark) {
                ctx.fillStyle = 'rgba(10, 10, 10, 0.4)';
            } else {
                ctx.fillStyle = 'rgba(240, 245, 250, 0.4)'; // Light background
            }

            ctx.fillRect(0, 0, width, height);

            let r = 255, g = 255, b = 255;
            if (isNeon) {
                r = 0; g = 243; b = 255;
            } else if (!isDark) {
                r = 50; g = 100; b = 200;
            }

            const centerX = width / 2;
            const centerY = height / 2;

            const scrollDiff = scrollY - lastScrollY;
            lastScrollY = scrollY;

            for (let i = 0; i < numStars; i++) {
                const star = stars[i];

                // Constant base speed + dynamic scroll speed
                star.z -= (2 + scrollDiff * 0.5);

                // Re-spawn star at the back if it passes the camera
                if (star.z <= 0) {
                    star.z += 2000;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                } else if (star.z > 2000) {
                    // Re-spawn star at the front if moving backwards away
                    star.z -= 2000;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                // Perspective projection
                const k = 128.0 / Math.max(star.z, 1);
                const px = star.x * k + centerX - mouseX * k;
                const py = star.y * k + centerY - mouseY * k;

                // Opacity fades out slightly as items get too close to the screen edge or if z goes out
                const size = (1 - star.z / 2000) * star.size * 3;
                let opacity = (1 - star.z / 2000) * star.o;
                if (opacity < 0) opacity = 0;

                ctx.beginPath();
                ctx.arc(px, py, size < 0 ? 0 : size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none w-full h-full"
            style={{ opacity: 0.8 }}
        />
    );
}
