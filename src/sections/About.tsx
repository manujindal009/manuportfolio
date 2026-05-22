import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, School, Calendar, BookOpen } from 'lucide-react';

const educationData = [
    {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "Chandigarh University",
        duration: "2023 – 2027",
        details: "Focusing on core Software Engineering principles, Advanced Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, and Full Stack Development.",
        grade: "Ongoing",
        icon: <GraduationCap size={20} className="text-accent-primary" />
    },
    {
        degree: "Senior Secondary (12th Grade)",
        institution: "S.U.S.G.S.S.S School, Sunam",
        duration: "2021 – 2022",
        details: "Specialized in Science stream with Mathematics and Computer Science basics. Formed strong foundational logic and analytics skills.",
        grade: "Completed",
        icon: <School size={18} className="text-accent-primary" />
    },
    {
        degree: "Secondary (10th Grade)",
        institution: "D.A.V Public School, Sunam",
        duration: "2019 – 2020",
        details: "General curriculum with high performance in Science and Mathematics, fostering early interests in computing.",
        grade: "Completed",
        icon: <BookOpen size={18} className="text-accent-primary" />
    }
];

export function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden bg-transparent">
            {/* Ambient Background glows */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight"
                    >
                        About <span className="text-accent-primary">Me</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-accent-primary mx-auto rounded-full mt-4"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

                    {/* Detailed Profile Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6 flex flex-col justify-between"
                    >
                        <div className="glassmorphism p-6 sm:p-10 rounded-3xl border border-border-color shadow-xl hover:border-accent-primary/30 transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden">
                            {/* Inner ambient glow */}
                            <div className="absolute -left-20 -top-20 w-40 h-40 bg-accent-primary/10 rounded-full blur-[50px] pointer-events-none" />

                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-3 text-accent-primary">
                                    <div className="p-2 bg-accent-primary/10 rounded-xl border border-accent-primary/25">
                                        <User size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-primary">Profile Summary</h3>
                                </div>
                                <p className="text-text-secondary leading-relaxed text-[16px] sm:text-lg">
                                    I am a Computer Science Engineering student passionate about full-stack development, scalable systems, and high-performance applications. I enjoy solving real-world problems and building impactful digital products that impress users and deliver immediate business insights.
                                </p>
                                <p className="text-text-secondary leading-relaxed text-[16px] sm:text-lg">
                                    I have experience working with modular React platforms, automated cross-browser visual testing pipelines, and real-time backend integrations with cloud ecosystems. I excel in translating conceptual requirements into production-ready deployments.
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 pt-6 border-t border-border-color/50 flex flex-wrap items-center justify-between gap-4 text-text-secondary text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-accent-primary" size={18} />
                                    <span>Mohali, Punjab, India</span>
                                </div>
                                <span className="font-semibold text-accent-primary">CS Student @ Chandigarh University</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Education Timeline on the Right */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <div className="flex items-center gap-3 text-accent-primary">
                            <div className="p-2 bg-accent-primary/10 rounded-xl border border-accent-primary/25">
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary">Education</h3>
                        </div>

                        <div className="relative border-l-2 border-border-color pl-6 space-y-6 flex-grow flex flex-col justify-between">
                            {educationData.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                                    className="relative group flex-grow flex flex-col"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-border-color group-hover:border-accent-primary transition-colors duration-300 shadow-[0_0_8px_rgba(0,0,0,0.2)]" />

                                    {/* Card */}
                                    <div className="glassmorphism p-5 rounded-2xl border border-border-color shadow-md hover:border-accent-primary/40 hover:shadow-[0_0_20px_rgba(0,243,255,0.03)] transition-all duration-300 relative overflow-hidden flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                                                <h4 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors leading-tight">
                                                    {edu.degree}
                                                </h4>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-accent-primary/10 text-accent-primary border border-accent-primary/20 shrink-0">
                                                    {edu.grade}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-1.5">
                                                {edu.icon}
                                                {edu.institution}
                                            </p>
                                            <p className="text-xs text-text-secondary leading-relaxed">
                                                {edu.details}
                                            </p>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-border-color/30 flex items-center justify-between text-xs text-text-secondary">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} className="text-accent-primary" />
                                                {edu.duration}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
