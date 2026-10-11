"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Eye, MessageCircle } from "lucide-react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_EMAIL = "aqlisoufiane364@gmail.com";
const WHATSAPP_NUMBER = "212679224411";

const DYNAMIC_TEXTS = [
  "développeur web Full Stack",
  "diplômé en Développement Digital OFPPT",
  "expert React.js & Laravel",
  "passionné par les technologies modernes",
  "développeur créatif",
];

// Isolated so its frequent re-renders don't affect the Hero animations
function Typewriter() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullText = DYNAMIC_TEXTS[textIndex];

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
          setTextIndex((prev) => (prev + 1) % DYNAMIC_TEXTS.length);
          timeout = setTimeout(handleTyping, 500);
        } else {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
          timeout = setTimeout(handleTyping, 50);
        }
      }
    };

    timeout = setTimeout(handleTyping, 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <span className="flex items-center">
      <span className="text-white">{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-1 h-5 bg-red-500 ml-2 shadow-[0_0_10px_#f00]"
      />
    </span>
  );
}

export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Close contact menu on outside click / Escape
  useEffect(() => {
    if (!contactOpen) return;
    const onClick = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [contactOpen]);
  
  // GSAP Scroll Parallax
  useEffect(() => {
    if (!heroRef.current || !textContainerRef.current || !imageContainerRef.current) return;

    // Subtle parallax on text only — image/buttons stay fully visible
    gsap.to(textContainerRef.current, {
      y: 60,
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
    <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative pt-20">
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
              className="text-red-500 font-mono font-bold tracking-widest uppercase text-xs md:text-sm mb-4"
            >
              Bienvenue sur mon Portfolio
            </motion.p>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
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
              className="text-lg md:text-2xl font-bold text-gray-200 mb-8"
            >
              Développeur Full Stack Expert
            </motion.h2>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              className="h-11 flex items-center justify-center md:justify-start text-sm md:text-lg font-medium text-gray-400 bg-white/5 backdrop-blur-sm px-5 py-6 rounded-2xl border border-white/10 w-fit mx-auto md:mx-0 shadow-2xl"
            >
              <span className="text-red-500 font-mono mr-3">~/root:</span>
              <Typewriter />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content - Modern Profile Frame */}
        <motion.div 
          ref={imageContainerRef}
          className="flex-1 flex flex-col justify-center items-center relative gap-8"
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
            className="relative w-64 h-64 md:w-[420px] md:h-[420px]"
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

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="relative z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-xs sm:max-w-sm"
          >
            <div ref={contactRef} className="relative w-full sm:w-auto">
              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, type: "spring", bounce: 0.3 }}
                    className="absolute bottom-full mb-3 left-0 right-0 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-60 z-30 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_10px_40px_rgba(220,38,38,0.25)]"
                  >
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour Soufiane, je vous contacte via votre portfolio.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-green-500/15 hover:text-green-400 transition-colors md:cursor-none"
                    >
                      <span className="w-9 h-9 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400">
                        <MessageCircle size={18} />
                      </span>
                      <span className="font-medium">WhatsApp</span>
                    </a>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent("Contact depuis le portfolio")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-500/15 hover:text-red-400 transition-colors md:cursor-none"
                    >
                      <span className="w-9 h-9 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                        <Mail size={18} />
                      </span>
                      <span className="font-medium">Gmail</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setContactOpen((prev) => !prev)}
                className="group relative w-full sm:w-auto px-6 py-3 md:px-7 md:py-3.5 bg-red-600 text-white rounded-full font-bold text-sm md:text-base overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.4)] md:cursor-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-800 group-hover:scale-110 transition-transform duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Mail size={18} />
                  Me Contacter
                </span>
              </button>
            </div>

            <a
              href="/cv-image.png"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-6 py-3 md:px-7 md:py-3.5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm md:text-base backdrop-blur-md hover:bg-white/10 hover:border-red-500/50 transition-all hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-2.5 md:cursor-none"
            >
              <Eye size={18} className="group-hover:scale-110 transition-transform" />
              Voir CV
            </a>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
