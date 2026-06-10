"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Eye } from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  const dynamicTexts = [
    "développeur web Full Stack",
    "diplômé en Développement Digital OFPPT",
    "expert React.js & Laravel",
    "passionné par les technologies modernes",
    "développeur créatif"
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullText = dynamicTexts[textIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        if (displayText !== currentFullText) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
          timeout = setTimeout(handleTyping, 100);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
          timeout = setTimeout(handleTyping, 500);
        } else {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
          timeout = setTimeout(handleTyping, 50);
        }
      }
    };

    timeout = setTimeout(handleTyping, 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, dynamicTexts]);

  // GSAP Scroll Parallax
  useEffect(() => {
    if (!heroRef.current || !textContainerRef.current || !imageContainerRef.current) return;

    // Different speeds for parallax
    gsap.to(textContainerRef.current, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(imageContainerRef.current, {
      y: 300,
      opacity: 0,
      rotate: 5,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-8 z-10 gap-12">
        
        {/* Left Content */}
        <motion.div 
          ref={textContainerRef}
          className="flex-1 text-center md:text-left z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.3 }
            }
          }}
        >
          <div className="mb-8">
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-red-500 font-mono font-bold tracking-widest uppercase mb-4"
            >
              Bienvenue sur mon Portfolio
            </motion.p>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              className="text-5xl md:text-8xl font-black text-white mb-4 leading-tight"
            >
              Salut, <br />
              <span className="text-white">Je suis </span>
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-800 inline-block"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Soufiane Aqli
              </motion.span>
            </motion.h1>

            <motion.h2 
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="text-2xl md:text-4xl font-bold text-gray-200 mb-8"
            >
              Développeur Full Stack Expert
            </motion.h2>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className="h-12 flex items-center justify-center md:justify-start text-lg md:text-2xl font-medium text-gray-400 bg-white/5 backdrop-blur-sm px-6 py-8 rounded-2xl border border-white/10 w-fit mx-auto md:mx-0 shadow-2xl"
            >
              <span className="text-red-500 font-mono mr-4">~/root:</span>
              <span className="text-white">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-1 h-6 bg-red-500 ml-2 shadow-[0_0_10px_#f00]"
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-6"
          >
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative px-10 py-5 bg-red-600 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.4)] md:cursor-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                <Mail size={22} />
                Me Contacter
              </span>
            </button>
            
            <a
              href="/cv-image.png"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-red-500/50 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3 md:cursor-none"
            >
              <Eye size={22} className="group-hover:scale-110 transition-transform" />
              Voir CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content - Modern Profile Frame */}
        <motion.div 
          ref={imageContainerRef}
          className="flex-1 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            transitionSpeed={1500}
            scale={1.02}
            gyroscope={true}
            className="relative w-72 h-72 md:w-[500px] md:h-[500px]"
          >
            {/* Visual background layers */}
            <motion.div 
              className="absolute inset-0 bg-red-500/10 rounded-full blur-[80px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            
            {/* Main Picture Frame */}
            <div className="relative w-full h-full rounded-[3rem] md:rounded-full overflow-hidden border-4 border-red-500/30 p-4 bg-gradient-to-b from-red-500/10 to-transparent group shadow-[0_20px_50px_rgba(239,68,68,0.2)] backdrop-blur-sm">
              <div className="w-full h-full rounded-[2.5rem] md:rounded-full overflow-hidden relative">
                <Image 
                  src="/profile.jpeg" 
                  alt="Soufiane Aqli" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-110 transition-transform duration-1000 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Floating badges / Micro-animations */}
              <motion.div 
                className="absolute top-10 right-0 md:right-10 bg-black/80 backdrop-blur-xl border border-red-500/50 p-4 rounded-2xl shadow-2xl z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Disponible</span>
                </div>
              </motion.div>
            </div>

            {/* Glowing ring */}
            <motion.div 
              className="absolute -inset-4 border-2 border-red-500/20 rounded-full z-0 pointer-events-none"
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            />
          </Tilt>
        </motion.div>
        
      </div>
    </section>
  );
}
