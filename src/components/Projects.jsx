import { useState, useEffect } from 'react'
import NetworkBackground from './NetworkBackground'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [projectsVisible, setProjectsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'projects-grid') {
            setProjectsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    const projectsGrid = document.getElementById('projects-grid')
    if (projectsGrid) observer.observe(projectsGrid)

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'GoalTime',
      description: 'Application de réservation de terrains développée en PHP. Une solution complète pour la gestion et la réservation de terrains sportifs avec système de planning intégré.',
      image: '⚽',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      category: 'fullstack',
      status: 'Terminé',
      github: 'https://github.com/soufianeaqli/GoalTime',
      demo: '#',
      features: ['Réservation terrains', 'Gestion planning', 'Système paiement', 'Interface admin']
    },
    {
      id: 2,
      title: 'Gestion-RH',
      description: 'Système complet de gestion des ressources humaines développé en PHP. Permet la gestion du personnel, des salaires, et des relations entre entités avec une interface moderne.',
      image: '👥',
      technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      category: 'fullstack',
      status: 'Terminé',
      github: 'https://github.com/soufianeaqli/Gestion-RH',
      demo: '#',
      features: ['Gestion personnel', 'Calcul salaires', 'Relations entités', 'Interface admin']
    },
    {
      id: 3,
      title: 'Mini-Projet Python + MongoDB',
      description: 'Projet de gestion de données avec Python et MongoDB, démontrant l\'utilisation des bases de données NoSQL.',
      image: '🐍',
      technologies: ['Python', 'MongoDB', 'PyMongo', 'NoSQL'],
      category: 'backend',
      status: 'Terminé',
      github: '#',
      demo: '#',
      features: ['Base NoSQL', 'Gestion données', 'Requêtes MongoDB', 'Python scripting']
    },
    {
      id: 4,
      title: 'Modélisation UML',
      description: 'Exercices de modélisation de systèmes avec diagrammes d\'utilisation, classes et séquences pour différents projets.',
      image: '📊',
      technologies: ['UML', 'Modélisation', 'Diagrammes', 'Analyse'],
      category: 'frontend',
      status: 'Terminé',
      github: '#',
      demo: '#',
      features: ['Diagrammes utilisation', 'Diagrammes classes', 'Diagrammes séquences', 'Modélisation système']
    }
  ]

  const categories = [
    { id: 'all', name: 'Tous les projets', icon: '🌟' },
    { id: 'fullstack', name: 'Full-Stack', icon: '🚀' },
    { id: 'frontend', name: 'Front-End', icon: '🎨' },
    { id: 'backend', name: 'Back-End', icon: '⚙️' },
    { id: 'mobile', name: 'Mobile', icon: '📱' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'En cours':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Planifié':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <section id="projects" className="py-20 px-8 bg-black relative overflow-hidden">
      <NetworkBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Mes Projets
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes réalisations techniques, des projets académiques aux applications professionnelles. 
            Chaque projet reflète ma passion pour le développement et mon engagement vers l'excellence.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-3 overflow-hidden ${
                filter === category.id
                  ? 'bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-2xl shadow-red-500/40 scale-105'
                  : 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 text-gray-300 hover:text-white border border-gray-700/50 hover:border-red-500/50 backdrop-blur-sm hover:scale-105 hover:shadow-xl hover:shadow-red-500/20'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-xl relative z-10">{category.icon}</span>
              <span className="relative z-10">{category.name}</span>
              {filter === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-red-500/30 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/10 ${
                projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies && project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-red-600/20 to-red-800/20 text-red-300 rounded-full text-xs border border-red-500/20 hover:border-red-400/40 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="px-6 pb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Fonctionnalités clés :</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  {project.features && project.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6">
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    className="group flex-1 relative bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 text-white text-center py-3 px-5 rounded-2xl transition-all duration-500 hover:scale-110 border border-gray-600/30 hover:border-red-400/50 text-sm font-semibold backdrop-blur-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="mr-2 text-base relative z-10">💻</span>
                    <span className="relative z-10">Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className="group flex-1 relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:via-red-600 hover:to-red-700 text-white text-center py-3 px-5 rounded-2xl transition-all duration-500 hover:scale-110 text-sm font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="mr-2 text-base relative z-10">🚀</span>
                    <span className="relative z-10">Démo</span>
                  </a>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects
