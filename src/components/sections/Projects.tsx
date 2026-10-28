"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Check } from "lucide-react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery";

// Basic Github SVG
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  status: string;
  github: string;
  demo: string;
  role?: string;
  year?: string;
  overview?: string;
  features?: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Stage: Projet EHC",
    description: "Développement web sur projet d'EHC. Participation à la conception et réalisation des tâches confiées, nouvelles technologies web.",
    image: "💻",
    technologies: ["Web Technologies", "EHC Projet"],
    category: "frontend",
    status: "Terminé",
    github: "#",
    demo: "#",
    role: "Stagiaire Développeur Web",
    overview: "Dans le cadre de mon stage, j'ai participé au développement web d'un projet d'EHC en utilisant des technologies web modernes. J'ai pris part à la conception ainsi qu'à la réalisation des tâches confiées au sein de l'équipe.",
    features: [
      "Participation à la conception de l'application",
      "Développement des fonctionnalités web assignées",
      "Travail en équipe avec les technologies web actuelles",
    ],
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
    demo: "#",
    role: "Développeur Web",
    overview: "Chez YONETWORK, j'ai évolué comme développeur web sur un projet de gestion RH. J'ai participé à la conception ainsi qu'à l'amélioration de modules existants.",
    features: [
      "Conception de nouveaux modules RH",
      "Amélioration de modules existants",
      "Développement back-end avec PHP et MySQL",
    ],
  },
  {
    id: 3,
    title: "GoalTime – Terrains & Tournois de Football",
    description: "Application web complète pour le football amateur : réservation de terrains, annonces pour trouver des joueurs, messagerie, système de réputation (avis, badges, classement) et tournois intelligents avec génération automatique des groupes, calendriers et phase finale.",
    image: "⚽",
    technologies: ["Laravel 12", "React 19", "Tailwind CSS", "Sanctum", "REST API", "SQLite/MySQL"],
    category: "fullstack",
    status: "Terminé",
    github: "https://github.com/soufianeaqli/GoalTime",
    demo: "https://goal-time-pi.vercel.app/accueil",
    role: "Développeur Full Stack",
    overview: "GoalTime est une application web complète dédiée au football amateur. Elle centralise la réservation de terrains, la recherche de joueurs et l'organisation de tournois intelligents au sein d'une seule plateforme moderne.",
    features: [
      "Réservation de terrains avec planning et validation de paiement",
      "Annonces « Trouver des joueurs » avec messagerie intégrée",
      "Tournois intelligents : groupes, calendriers round-robin, phase finale et classements",
      "Système de réputation : avis, notes, badges et classement des joueurs",
      "Notifications de match en temps réel",
      "Authentification par token + connexion Google OAuth",
    ],
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
    demo: "#",
    role: "Développeur Back-End",
    overview: "Une API back-end dédiée à la gestion de données stockées dans MongoDB, développée en Python avec PyMongo pour exploiter la flexibilité d'une base de données NoSQL.",
    features: [
      "API de gestion de données MongoDB",
      "Connexion à la base via PyMongo",
      "Opérations CRUD sur une base NoSQL",
    ],
  },
  {
    id: 5,
    title: "PT16 – Gestion des Références Bibliographiques",
    description: "Application web de gestion des références bibliographiques (PFE) : catalogue en ligne, réservation de documents, favoris, chatbot assistant bibliographique, notifications et authentification Google OAuth (Socialite).",
    image: "📚",
    technologies: ["Laravel 11", "React 19", "Tailwind CSS", "MySQL", "Sanctum", "Google Books API"],
    category: "fullstack",
    status: "Terminé",
    github: "https://github.com/soufianeaqli/bibliographies",
    demo: "https://bibliographies.vercel.app/",
    role: "Développeur Full Stack (PFE)",
    overview: "Projet de fin d'études (PFE) dont l'objectif est de digitaliser la gestion des références bibliographiques en contexte universitaire : consultation, réservation et suivi des documents, avec une assistance intelligente à la recherche.",
    features: [
      "Catalogue en ligne de références bibliographiques avec recherche et filtres",
      "Réservation de documents et gestion des favoris",
      "Chatbot assistant bibliographique",
      "Système de notifications pour les actions (réservations, etc.)",
      "Authentification classique + connexion Google OAuth (Socialite)",
      "Enrichissement du catalogue via l'API Google Books",
    ],
  },
  {
    id: 6,
    title: "HR Platform – Gestion des Ressources Humaines",
    description: "Plateforme SaaS RH couvrant tout le cycle de vie : recrutement, employés, contrats, réunions et finance. Trois espaces (Super Admin, Responsable RH, Candidat) avec suivi des candidatures, génération PDF de contrats et dashboard analytique.",
    image: "🏢",
    technologies: ["React", "Laravel", "MySQL", "REST API", "Tailwind CSS"],
    category: "fullstack",
    status: "Terminé",
    github: "https://github.com/soufianeaqli/entreprise",
    demo: "https://entreprise-teal.vercel.app/",
    role: "Développeur Full Stack",
    overview: "Une plateforme SaaS de gestion des ressources humaines qui couvre l'ensemble du cycle de vie RH, du recrutement à la gestion des employés, en passant par les contrats, les réunions et la finance, avec trois profils utilisateurs distincts.",
    features: [
      "Trois espaces dédiés : Super Administrateur, Responsable RH et Candidat",
      "Recrutement : offres, pipeline de candidatures à 7 statuts et planification d'entretiens",
      "Gestion des employés, départements et documents associés",
      "Contrats avec génération PDF et renouvellement",
      "Réunions : comptes-rendus, décisions, tâches et participants",
      "Module finance : projets, revenus, dépenses et dashboard analytique (KPIs)",
    ],
  },
  {
    id: 7,
    title: "Atlas Kicks – E-commerce Maillots",
    description: "Boutique e-commerce MERN de maillots et tenues de football marocaines. Panier, cadeau gratuit, programme VIP avec remises, avis vérifiés, paiement Stripe, suivi de livraison GPS et espace admin complet. Thème zellige marocain.",
    image: "👕",
    technologies: ["MongoDB", "Express", "React 19", "Node.js", "Tailwind CSS", "Stripe", "Cloudinary"],
    category: "fullstack",
    status: "Terminé",
    github: "https://github.com/soufianeaqli/KICKS-ATLAS-",
    demo: "https://kicks-atlas.vercel.app",
    role: "Développeur Full Stack (MERN)",
    overview: "Atlas Kicks est une boutique e-commerce dédiée aux maillots et tenues de football marocains (équipe nationale, Botola, clubs). Le projet adopte une stack MERN complète avec un thème inspiré du zellige marocain.",
    features: [
      "Catalogue de maillots marocains (équipe nationale, Botola, clubs)",
      "Panier, cadeau gratuit et programme VIP avec remises",
      "Avis vérifiés avec photos (Cloudinary)",
      "Paiement Stripe et suivi de livraison GPS (Leaflet)",
      "Espace administrateur complet (produits, commandes, utilisateurs, avis, cadeaux, VIP)",
      "Authentification JWT + connexion Google OAuth",
    ],
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  const hasLink = (href: string) => href && href !== "#";
  const galleryItems: GalleryItem[] = projects.map((project) => ({
    common: project.title,
    binomial: project.technologies.slice(0, 3).join(" · "),
    photo: {
      url: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
      ][project.id - 1],
      text: project.description,
      by: "Unsplash",
    },
  }));

  return (
    <section id="projects" className="py-24 relative z-10 px-8 bg-transparent">
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

        </div>

        <div className="relative h-[520px] overflow-hidden sm:h-[600px]">
          <CircularGallery
            items={galleryItems}
            radius={360}
            autoRotateSpeed={0.08}
            onItemClick={(_, index) => setSelected(projects[index])}
          />
        </div>
        <p className="mt-3 text-center text-xs text-gray-500">
          Faites glisser pour tourner la galerie · Cliquez sur une carte pour en savoir plus
        </p>

      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelected(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/95 to-black/95 backdrop-blur-xl shadow-[0_0_80px_rgba(220,38,38,0.25)]"
            >
              {/* Header */}
              <div className="relative p-8 md:p-10 border-b border-white/10 bg-gradient-to-br from-red-600/20 via-transparent to-transparent">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Fermer"
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-red-600/80 hover:border-red-500 transition-all duration-300 md:cursor-none"
                >
                  <X size={18} />
                </button>

                <div className="relative flex items-start gap-5">
                  <div className="text-6xl md:text-7xl drop-shadow-[0_0_25px_rgba(239,68,68,0.35)]">
                    {selected.image}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
                      {selected.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/20">
                        {selected.status}
                      </span>
                      {selected.role && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                          {selected.role}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 md:p-10 space-y-8">
                <p className="text-gray-300 leading-relaxed">
                  {selected.overview || selected.description}
                </p>

                {selected.features && selected.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-red-400 mb-4">
                      Fonctionnalités clés
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selected.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-red-500/30 transition-colors"
                        >
                          <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                            <Check size={12} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-red-400 mb-4">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 p-6 md:px-10 bg-black/80 backdrop-blur-lg border-t border-white/10 flex flex-wrap gap-3">
                {hasLink(selected.github) && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-red-500/40 transition-all duration-300 md:cursor-none"
                  >
                    <GithubIcon />
                    Code source
                  </a>
                )}
                {hasLink(selected.demo) && (
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-500 shadow-lg shadow-red-500/30 transition-all duration-300 md:cursor-none"
                  >
                    <ExternalLink size={16} />
                    Visiter le site
                  </a>
                )}
                {!hasLink(selected.github) && !hasLink(selected.demo) && (
                  <span className="text-sm text-gray-500">
                    Liens bientôt disponibles
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
