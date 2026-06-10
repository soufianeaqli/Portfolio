"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Tilt from "react-parallax-tilt";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

// Basic Github SVG
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Stage: Projet EHC",
      description: "Développement web sur projet d'EHC. Participation à la conception et réalisation des tâches confiées, nouvelles technologies web.",
      image: "💻",
      technologies: ["Web Technologies", "EHC Projet"],
      category: "frontend",
      status: "Terminé",
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "Stage: Gestion RH",
      description: "Développeur Web sur Projet de gestion RH chez YONETWORK. Participation à la conception et amélioration de modules existants.",
      image: "👥",
      technologies: ["PHP", "MySQL", "RH System"],
      category: "fullstack",
      status: "Terminé",
      github: "https://github.com/soufianeaqli/Gestion-RH",
      demo: "#"
    },
    {
      id: 3,
      title: "GoalTime",
      description: "Application de réservation de terrains sportifs avec système de planning intégré.",
      image: "⚽",
      technologies: ["PHP", "MySQL", "JavaScript"],
      category: "fullstack",
      status: "Terminé",
      github: "https://github.com/soufianeaqli/GoalTime",
      demo: "#"
    },
    {
      id: 4,
      title: "Python Data Management",
      description: "API de gestion de données MongoDB utilisant Python et PyMongo.",
      image: "🐍",
      technologies: ["Python", "MongoDB", "NoSQL"],
      category: "backend",
      status: "Terminé",
      github: "#",
      demo: "#"
    },
  ];

  const categories = [
    { id: "all", name: "Tous", icon: "🌟" },
    { id: "fullstack", name: "Full-Stack", icon: "🚀" },
    { id: "frontend", name: "Front-End", icon: "🎨" },
    { id: "backend", name: "Back-End", icon: "⚙️" },
  ];

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative z-10 px-8 bg-gradient-to-t from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <AnimatedTitle
            text="Mes Projets"
            highlightText="Projets"
            className="text-4xl md:text-5xl font-bold mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg mb-12"
          >
            Une sélection de mes travaux récents, démontrant mon expertise à travers différentes architectures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 md:cursor-none rounded-full font-medium transition-all duration-300 ${filter === cat.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-500/30 scale-105"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                className="h-full block"
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#ffffff"
                  glarePosition="all"
                  scale={1.02}
                  transitionSpeed={1000}
                  className="h-full group bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-red-500/50 overflow-hidden relative shadow-2xl flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="p-8 pb-0 flex justify-between items-start">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500 ease-out">{project.image}</div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/20">
                      {project.status}
                    </span>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {project.technologies.map(tech => (
                        <span key={tech} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 group-hover:border-red-500/30 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>


                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
