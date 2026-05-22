import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, ExternalLink } from 'lucide-react';

const certs = [
    {
        name: "Negotiation Skills – University of Michigan",
        url: "https://www.coursera.org/learn/negotiation-skills"
    },
    {
        name: "Programming for Everybody – University of Michigan",
        url: "https://www.coursera.org/learn/python"
    }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
};

export function Certifications() {
    return (
        <section id="certifications" className="py-24 relative overflow-hidden bg-transparent">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight"
                    >
                        Professional <span className="text-accent-primary">Certifications</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-accent-primary mx-auto rounded-full mt-4"
                    />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-4 max-w-3xl mx-auto"
                >
                    {certs.map((cert, index) => {
                        const content = (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, x: 8 }}
                                className="glassmorphism p-6 rounded-2xl border border-border-color flex items-center justify-between gap-4 transition-all duration-300 hover:border-accent-primary hover:shadow-[0_0_20px_rgba(0,243,255,0.06)] cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-accent-primary/10 rounded-xl text-accent-primary border border-accent-primary/20 group-hover:scale-115 transition-transform duration-300">
                                        <CheckCircle2 size={22} className="text-[#00f3ff]" />
                                    </div>
                                    <h4 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                                        {cert.name}
                                    </h4>
                                </div>
                                <ExternalLink size={18} className="text-text-secondary group-hover:text-accent-primary transition-colors shrink-0" />
                            </motion.div>
                        );

                        return (
                            <a
                                key={index}
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                {content}
                            </a>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
