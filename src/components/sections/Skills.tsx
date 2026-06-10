"use client";

import { motion } from "framer-motion";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

export default function Skills() {
  const skillsList = [
    { name: "Python / JavaScript / PHP / CSS", level: 90 },
    { name: "React.js / Node.js / Laravel", level: 88 },
    { name: "MySQL / MongoDB", level: 85 },
    { name: "Git / WordPress / Postman", level: 92 },
    { name: "Méthodologie Agile / UI/UX", level: 85 },
    { name: "Java / UML / Modélisation", level: 80 },
  ];

  return (
    <section id="skills" className="py-24 relative z-10 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedTitle 
            text="Mes Compétences" 
            highlightText="Compétences" 
            className="text-4xl md:text-5xl font-bold mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Un panel de technologies modernes pour répondre à tous types de besoins.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {skillsList.map((skill, index) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              {/* Floating wrapper */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4, 
                  ease: "easeInOut",
                  delay: index * 0.2 // stagger the floating effect
                }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-red-500/50 transition-colors shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-medium text-lg">{skill.name}</span>
                  <span className="text-gray-400 text-sm font-bold bg-white/10 px-3 py-1 rounded-full">{skill.level}%</span>
                </div>
                <div className="w-full bg-black/50 border border-white/5 rounded-full h-3 overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
