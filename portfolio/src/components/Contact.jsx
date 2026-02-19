import { useState } from 'react'
import NetworkBackground from './NetworkBackground'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('')
      }, 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'soufiane.aqli@example.com',
      link: 'mailto:soufiane.aqli@example.com',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+212 6XX XXX XXX',
      link: 'tel:+212600000000',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Casablanca, Morocco',
      link: '#',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '👨‍💻',
      title: 'LinkedIn',
      value: 'Soufiane Aqli',
      link: 'https://linkedin.com/in/soufiane-aqli',
      color: 'from-blue-600 to-blue-700'
    }
  ]

  const services = [
    {
      icon: '🌐',
      title: 'Développement Web Full-Stack',
      description: 'Applications React.js, Laravel, sites web performants',
      technologies: ['React.js', 'Laravel', 'Tailwind CSS', 'PHP']
    },
    {
      icon: '⚙️',
      title: 'Backend & APIs',
      description: 'APIs REST, gestion de données, architecture serveur',
      technologies: ['Laravel', 'Node.js', 'Python', 'Django']
    },
    {
      icon: '🗄️',
      title: 'Bases de Données',
      description: 'Conception et gestion de bases de données',
      technologies: ['MySQL', 'MongoDB', 'Eloquent ORM', 'Migrations']
    },
    {
      icon: '🎓',
      title: 'Projets Académiques & Professionnels',
      description: 'Gestion RH, réservations, systèmes complexes',
      technologies: ['UML', 'Modélisation', 'Git', 'Docker']
    }
  ]

  return (
    <section id="contact" className="py-20 px-8 bg-black relative overflow-hidden">
      <NetworkBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your projects to life? Let's discuss your ideas and create 
            something extraordinary together. I'm always open to new opportunities!
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg rounded-2xl p-8 border border-red-500/20 shadow-2xl shadow-red-500/10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">
                Contactez-moi
              </h3>
              <p className="text-lg text-gray-300">
                Prêt à donner vie à vos projets ? Discutons de vos idées.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-600/20 to-green-700/20 border border-green-500/30 rounded-2xl text-green-300 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Message envoyé avec succès !</h4>
                  <p>Je vous répondrai dans les plus brefs délais.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-white font-semibold text-lg">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-gray-800/80 transition-all duration-300 text-base backdrop-blur-sm"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-white font-semibold text-lg">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-gray-800/80 transition-all duration-300 text-base backdrop-blur-sm"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-white font-semibold text-lg">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-gray-800/80 transition-all duration-300 text-base backdrop-blur-sm"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-white font-semibold text-lg">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-gray-800/80 transition-all duration-300 text-base resize-none backdrop-blur-sm"
                  placeholder="Décrivez votre projet, vos besoins ou votre demande en détail..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:via-red-600 hover:to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/50 overflow-hidden transform hover:-translate-y-1 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-red-600/30 animate-pulse opacity-50 group-hover:animate-none"></div>
                  <div className="absolute inset-0 bg-red-400/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        Envoyer le message
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 mt-16">
          {/* Email Card */}
          <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-red-500/50 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">Email</h3>
              <a href="mailto:aqlisoufiane364@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium break-all">
                aqlisoufiane364@gmail.com
              </a>
            </div>
          </div>
          
          {/* LinkedIn Card */}
          <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">LinkedIn</h3>
              <a href="https://www.linkedin.com/in/soufiane-aqli-b31ba8328/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                Soufiane Aqli
              </a>
            </div>
          </div>
          
          {/* GitHub Card */}
          <div className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">GitHub</h3>
              <a href="https://github.com/soufianeaqli" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                @soufianeaqli
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
