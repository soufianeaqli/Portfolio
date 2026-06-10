"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const timelineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const experienceData = [
    {
      year: "2023 - Présent",
      title: "Licence Pro. Génie Informatique",
      company: "École High-Tech, Rabat",
      description: "Approfondissement des concepts avancés en ingénierie logicielle et développement Full Stack."
    },
    {
      year: "2021 - 2023",
      title: "Technicien Spécialisé Dev Digital",
      company: "OFPPT ISTAG, Meknès",
      description: "Formation intensive en développement web Full Stack, maîtrise de React.js et Laravel."
    },
    {
      year: "Projets & Stages",
      title: "Développeur Full Stack",
      company: "Divers",
      description: "Plus de 10 projets réalisés incluant de la gestion RH, réservation de terrains sportifs et API complexes."
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10 px-8 bg-gradient-to-t from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedTitle 
            text="À Propos" 
            highlightText="Propos" 
            className="text-4xl md:text-5xl font-bold mb-6"
          />
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-transparent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative"
          >
            {/* Profile Image with 3D Tilt Effect */}
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareColor="#ff0000"
              glarePosition="all"
              scale={1.02}
              transitionSpeed={1500}
              className="w-full aspect-square md:aspect-auto md:h-[600px] rounded-[2rem] overflow-hidden relative group border border-red-500/30 bg-black/50 backdrop-blur-md shadow-[0_0_50px_rgba(220,38,38,0.2)] hover:shadow-[0_0_80px_rgba(220,38,38,0.5)] z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 via-transparent to-red-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none mix-blend-overlay" />
              <Image 
                src="/profile.jpeg" 
                alt="Soufiane Aqli Profile" 
                width={600}
                height={800}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
              />
              {/* Scanning laser line effect on hover */}
              <motion.div 
                className="absolute left-0 right-0 h-1 bg-red-400 shadow-[0_0_20px_rgba(248,113,113,1)] opacity-0 group-hover:opacity-100 z-20 pointer-events-none"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
            </Tilt>
            
            {/* Pulsing Background Orbs */}
            <motion.div 
              className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-600/30 blur-[80px] rounded-full z-0 pointer-events-none" 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            <motion.div 
              className="absolute -top-10 -left-10 w-48 h-48 bg-red-800/40 blur-[60px] rounded-full z-0 pointer-events-none" 
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.8, 0.2] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
            />
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-white">
                Développeur Full Stack Créatif
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Salut ! Je suis Soufiane Aqli, un Développeur Full Stack passionné, actuellement étudiant en Licence Professionnelle en Génie Informatique à l'École High-Tech de Rabat. 
                Titulaire d'un diplôme de Technicien Spécialisé en Développement Digital de l'OFPPT, je combine une solide base théorique avec une expérience pratique acquise lors de projets et de stages.
              </p>
            </motion.div>

            {/* Timeline Section */}
            <div ref={timelineRef} className="relative pl-6 md:pl-8 border-l border-white/10 space-y-12">
              {/* Animated Progress Line */}
              <motion.div 
                className="absolute top-0 bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-red-500 to-red-800 origin-top"
                style={{ scaleY: timelineScaleY }}
              />

              {experienceData.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[30px] md:-left-[38px] top-1 w-4 h-4 rounded-full bg-black border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                  
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-red-500/30 transition-colors shadow-lg">
                    <span className="text-red-500 font-bold mb-2 block">{exp.year}</span>
                    <h4 className="text-xl font-bold text-white mb-1">{exp.title}</h4>
                    <span className="text-white/60 mb-3 block text-sm">{exp.company}</span>
                    <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
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
