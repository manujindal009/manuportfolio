import { motion } from 'framer-motion';
import { GraduationCap, School, Calendar, BookOpen } from 'lucide-react';

const educationData = [
    {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "Chandigarh University",
        duration: "2023 – 2027",
        details: "Focusing on core Software Engineering principles, Advanced Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, and Full Stack Development.",
        grade: "Ongoing",
        icon: <GraduationCap size={26} className="text-accent-primary" />
    },
    {
        degree: "Senior Secondary (12th Grade)",
        institution: "S.U.S.G.S.S.S School, Sunam",
        duration: "2021 – 2022",
        details: "Specialized in Science stream with Mathematics and Computer Science basics. Formed strong foundational logic and analytics skills.",
        grade: "Completed",
        icon: <School size={24} className="text-accent-primary" />
    },
    {
        degree: "Secondary (10th Grade)",
        institution: "D.A.V Public School, Sunam",
        duration: "2019 – 2020",
        details: "General curriculum with high performance in Science and Mathematics, fostering early interests in scientific research and computing paradigms.",
        grade: "Completed",
        icon: <BookOpen size={24} className="text-accent-primary" />
    }
];

export function Education() {
    return (
        <section id="education" className="py-24 relative overflow-hidden bg-transparent">
            {/* Background glowing particles */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight"
                    >
                        Academic <span className="text-accent-primary">Education</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-accent-primary mx-auto rounded-full mt-4"
                    />
                </div>

                {/* Timeline Grid / Row */}
                <div className="relative border-l-2 border-border-color max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                            className="relative group"
                        >
                            {/* Glowing timeline dot */}
                            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-bg-primary border-4 border-border-color group-hover:border-accent-primary flex items-center justify-center z-10 transition-colors duration-300 shadow-[0_0_10px_rgba(0,0,0,0.3)]" />

                            {/* Card Content */}
                            <div className="glassmorphism p-6 sm:p-8 rounded-3xl border border-border-color shadow-xl hover:border-accent-primary/40 hover:shadow-[0_0_30px_rgba(0,243,255,0.05)] transition-all duration-300 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-primary/30 group-hover:bg-accent-primary transition-colors" />

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-accent-primary/10 rounded-2xl text-accent-primary border border-accent-primary/20 shrink-0">
                                            {edu.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-text-secondary font-medium text-[15px] sm:text-base">
                                                {edu.institution}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 self-start sm:self-center">
                                        <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-bg-accent border border-border-color text-text-secondary">
                                            <Calendar size={12} className="text-accent-primary" />
                                            {edu.duration}
                                        </span>
                                        <span className="hidden sm:inline-block text-xs font-bold px-2 py-0.5 rounded bg-accent-primary/10 text-accent-primary border border-accent-primary/20">
                                            {edu.grade}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-text-secondary leading-relaxed text-[15px] sm:text-base">
                                    {edu.details}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
