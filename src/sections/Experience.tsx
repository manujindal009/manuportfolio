import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const experiences = [
    {
        role: "Data Analyst Trainee",
        company: "ThinkNext Technologies Private Limited",
        duration: "May 2025 – June 2025",
        location: "Mohali, Punjab, India",
        achievements: [
            "Built a secure sales analytics dashboard, reducing manual analysis effort by 30%.",
            "Processed and analyzed complex sales datasets using Python, Pandas, and NumPy.",
            "Integrated role-based authentication to secure executive view dashboards.",
            "Improved secure analytics workflows to comply with company data protection protocols."
        ]
    }
];

export function Experience() {
    return (
        <section id="experience" className="py-24 relative overflow-hidden bg-bg-accent/15">
            {/* Background blur effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-[120px]" />
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
                        Work <span className="text-accent-primary">Experience</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-accent-primary mx-auto rounded-full mt-4"
                    />
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-border-color max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                            className="relative group"
                        >
                            {/* Glowing timeline dot */}
                            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-bg-primary border-4 border-accent-primary glow-effect flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-125" />
                            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-accent-primary/40 animate-ping pointer-events-none" />

                            {/* Experience Card */}
                            <div className="glassmorphism p-6 sm:p-8 rounded-3xl border border-border-color shadow-xl hover:border-accent-primary/40 transition-all duration-300 relative overflow-hidden">
                                {/* Top corner highlight */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-primary/10 to-transparent pointer-events-none rounded-bl-3xl" />

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors flex items-center gap-2">
                                            <Briefcase className="text-accent-primary shrink-0" size={24} />
                                            {exp.role}
                                        </h3>
                                        <p className="text-text-secondary font-medium text-lg mt-1">
                                            {exp.company}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 text-sm text-text-secondary">
                                        <span className="flex items-center gap-1.5 font-medium px-3 py-1 rounded-full bg-bg-accent border border-border-color shrink-0">
                                            <Calendar size={14} className="text-accent-primary" />
                                            {exp.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-accent/50 border border-border-color/50 shrink-0">
                                            <MapPin size={14} className="text-accent-primary" />
                                            {exp.location}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-accent-primary/80">
                                        Key Responsibilities & Achievements:
                                    </h4>
                                    <ul className="space-y-3.5">
                                        {exp.achievements.map((ach, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 * idx, duration: 0.4 }}
                                                className="flex items-start gap-3 text-text-secondary text-[15px] sm:text-base leading-relaxed"
                                            >
                                                <CheckCircle2 size={18} className="text-[#00f3ff] mt-1 shrink-0" />
                                                <span>{ach}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
