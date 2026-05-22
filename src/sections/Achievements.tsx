import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';

const achievements = [
    {
        title: "AI HackMatrix Runner-Up",
        detail: "Secured 2nd place among 250+ competing teams in a national-level hackathon, building high-performance AI placement preparation solutions.",
        icon: <Trophy size={36} className="text-yellow-400" />
    },
    {
        title: "ML Research Paper",
        detail: "Authored and published a research paper on 'Fake Image Detection using Machine Learning', detailing CNN and computer vision verification models.",
        icon: <Award size={36} className="text-[#00f3ff]" />
    }
];

export function Achievements() {
    return (
        <section id="achievements" className="py-24 relative overflow-hidden bg-bg-accent/10">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight"
                    >
                        My <span className="text-accent-primary">Achievements</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-accent-primary mx-auto rounded-full mt-4"
                    />
                </div>

                {/* Achievement Cards Grid (Flex to center 2 cards beautifully) */}
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-4xl mx-auto">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.2, type: "spring", bounce: 0.3 }}
                            whileHover={{ y: -8 }}
                            className="flex-1 glassmorphism p-8 rounded-3xl border border-border-color text-center hover:border-accent-primary/50 transition-all duration-300 relative overflow-hidden group"
                        >
                            {/* Moving gradient shine filter */}
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />

                            <div className="bg-bg-primary w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 border border-border-color/80 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                {achievement.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                                {achievement.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed text-sm md:text-[15px]">
                                {achievement.detail}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
