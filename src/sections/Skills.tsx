import { motion } from 'framer-motion';
import { Code2, Layout, Wrench, GraduationCap, Users } from 'lucide-react';

const skillsData = [
    {
        icon: <Code2 size={32} className="text-[#00f3ff]" strokeWidth={2.5} />,
        title: "Languages",
        description: "C, C++, Java, SQL, JavaScript"
    },
    {
        icon: <Layout size={32} className="text-[#00f3ff]" strokeWidth={2.5} />,
        title: "Frameworks & Libraries",
        description: "React.js, Next.js, Tailwind CSS, Pandas, NumPy"
    },
    {
        icon: <Wrench size={32} className="text-[#00f3ff]" strokeWidth={2.5} />,
        title: "Tools & Platforms",
        description: "GitHub, Vercel, Supabase, Firebase, Selenium, Percy"
    },
    {
        icon: <GraduationCap size={32} className="text-[#00f3ff]" strokeWidth={2.5} />,
        title: "Core Concepts",
        description: "DSA, DBMS, OOPs, System Design, REST APIs, Automation Testing"
    },
    {
        icon: <Users size={32} className="text-[#00f3ff]" strokeWidth={2.5} />,
        title: "Soft Skills",
        description: "Leadership, Teamwork, Quick Learner"
    }
];

export function Skills() {
    return (
        <section id="skills" className="py-32 relative overflow-hidden bg-transparent">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight"
                    >
                        Skills & <span className="text-accent-primary">Technologies</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-accent-primary mx-auto rounded-full mt-4"
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={skill.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group cursor-pointer rounded-2xl p-[1px] bg-gradient-to-br from-[#1a2d3d] via-transparent to-transparent hover:from-[#00f3ff] hover:to-neon-purple transition-all duration-500 shadow-[0_0_25px_rgba(0,243,255,0.0)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]"
                        >
                            <div className="bg-[#0a0f18]/80 backdrop-blur-md h-full rounded-2xl p-8 relative overflow-hidden glassmorphism flex flex-col items-start text-left z-10 transition-all duration-300">
                                {/* Decorative background blur */}
                                <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#00f3ff]/10 rounded-full blur-[50px] group-hover:bg-[#00f3ff]/20 transition-all duration-500" />

                                <div className="mb-6 transition-transform duration-300 group-hover:scale-110 origin-left relative z-10">
                                    {skill.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-wide relative z-10 group-hover:text-[#00f3ff] transition-colors">{skill.title}</h3>
                                <p className="text-[15px] text-text-secondary leading-relaxed relative z-10">
                                    {skill.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
