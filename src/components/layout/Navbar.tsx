"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  FolderKanban,
  Home,
  Mail,
  UserRound,
  Wrench,
} from "lucide-react";

const navItems = [
  { id: "home", label: "Accueil", icon: Home },
  { id: "about", label: "À propos", icon: UserRound },
  { id: "services", label: "Services", icon: BriefcaseBusiness },
  { id: "skills", label: "Compétences", icon: Wrench },
  { id: "projects", label: "Projets", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let currentSection = navItems[0].id;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && marker >= section.offsetTop) currentSection = item.id;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        currentSection = navItems[navItems.length - 1].id;
      }

      setActiveSection((current) => current === currentSection ? current : currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto w-[min(94vw,560px)] sm:bottom-6"
    >
      <div className="flex items-center justify-around gap-1 rounded-full border border-white/15 bg-zinc-950/80 p-2 shadow-[0_12px_48px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:gap-2 sm:p-2.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              aria-current={isActive ? "location" : undefined}
              animate={{ flexGrow: isActive ? 1.8 : 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className={`relative flex h-11 min-w-0 flex-1 items-center justify-center overflow-hidden rounded-full px-1 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 sm:h-12 sm:px-2 ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeBottomNav"
                  className="absolute inset-0 rounded-full bg-white/15"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex min-w-0 items-center justify-center gap-1.5">
                <Icon className="shrink-0" size={19} strokeWidth={isActive ? 2.3 : 1.9} />
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.18 }}
                      className="max-w-[4.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-semibold sm:max-w-none sm:text-xs"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
