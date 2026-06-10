"use client";

import { motion } from "framer-motion";
import { Code, Server, Monitor } from "lucide-react";
import Tilt from "react-parallax-tilt";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Création de sites web vitrines et applications web sur mesure avec React, Next.js, et Laravel.",
      icon: <Code size={32} />
    },
    {
      title: "Ecommerce Websites",
      description: "Solutions e-commerce complètes avec gestion de panier, paiements et tableau de bord administrateur.",
      icon: <Monitor size={32} />
    },
    {
      title: "Desktop Applications",
      description: "Applications de bureau performantes et sécurisées utilisant C#, .NET ou les technologies web.",
      icon: <Server size={32} />
    },
  ];

  return (
    <section id="services" className="py-24 relative z-10 px-8 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedTitle 
            text="Mes Services"
            highlightText="Services"
            className="text-4xl md:text-5xl font-bold mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Je vous accompagne dans la conception et le développement de vos projets numériques avec des solutions innovantes et performantes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              className="h-full block"
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.02}
                transitionSpeed={1000}
                className="group h-full relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-black/80 transition-colors overflow-hidden backdrop-blur-sm shadow-xl flex flex-col items-center text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-red-500 mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
