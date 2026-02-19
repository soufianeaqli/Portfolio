import { useState, useEffect } from 'react'
import profileImage from '../assets/profile.jpeg'
import NetworkBackground from './NetworkBackground'
import CVViewer from './CVViewer'

const Hero = ({ scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [isCVViewerOpen, setIsCVViewerOpen] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  const dynamicTexts = [
    "développeur web Full Stack",
    "diplômé en Développement Digital OFPPT",
    "expert React.js & Laravel",
    "passionné par les technologies modernes",
    "gamer passionné 🎮",
    "créateur d'expériences interactives",
    "développeur & joueur stratégique"
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    let typeTimer
    let deleteTimer
    let nextTimer

    const typeText = () => {
      const currentText = dynamicTexts[textIndex]
      let charIndex = 0
      
      setIsTyping(true)
      setDisplayText('')
      
      const typeChar = () => {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1))
          charIndex++
          typeTimer = setTimeout(typeChar, 100)
        } else {
          setIsTyping(false)
          deleteTimer = setTimeout(deleteText, 2000)
        }
      }
      
      typeChar()
    }

    const deleteText = () => {
      const currentText = displayText
      let charIndex = currentText.length
      
      setIsTyping(true)
      
      const deleteChar = () => {
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1))
          charIndex--
          deleteTimer = setTimeout(deleteChar, 50)
        } else {
          setIsTyping(false)
          setTextIndex((prev) => (prev + 1) % dynamicTexts.length)
          nextTimer = setTimeout(typeText, 500)
        }
      }
      
      deleteChar()
    }

    typeText()

    return () => {
      clearTimeout(typeTimer)
      clearTimeout(deleteTimer)
      clearTimeout(nextTimer)
    }
  }, [textIndex])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section id="home" className="pt-0 min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Network Background */}
      <NetworkBackground />

      {/* Main Content */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-8 z-10">
        {/* Left Content */}
        <div className={`flex-1 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
              Salut,
            </h1>
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-white">Je suis </span><span className="text-red-500">Soufiane Aqli</span>
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Développeur Full Stack
            </h3>
            
            {/* Typewriter Effect */}
            <div className="h-16 flex items-center mb-8">
              <div className="text-2xl md:text-3xl font-semibold text-gray-300">
                <span className="text-red-400">&gt;</span> 
                <span className="ml-2">
                  {displayText}
                </span>
                <span className={`text-red-400 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-12 flex gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:via-red-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-500 hover:scale-110 shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-red-600/30 animate-pulse opacity-50"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span>📧</span>
                Contact
              </span>
            </button>
            
            <button 
              onClick={() => setIsCVViewerOpen(true)}
              className="group relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:via-red-600 hover:to-red-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-500 hover:scale-110 shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-red-600/30 animate-pulse opacity-50"></div>
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                Voir CV
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/soufiane-aqli-b31ba8328/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/soufianeaqli" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="mailto:aqlisoufiane364@gmail.com" className="text-white hover:text-red-500 transition-colors">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.454-6.269h.91c.904 0 1.636.732 1.636 1.636z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Content - Profile Image */}
        <div className="flex-1 flex justify-end">
          <div className="relative">
            <div className="w-96 h-96 relative">
              {/* Organic shape background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] animate-pulse"></div>
              <img 
                src={profileImage} 
                alt="Safet - React.js Developer" 
                className="w-full h-full object-cover rounded-[40%_60%_70%_30%/60%_30%_70%_40%] relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CV Viewer Modal */}
      <CVViewer 
        isOpen={isCVViewerOpen} 
        onClose={() => setIsCVViewerOpen(false)} 
      />
    </section>
  )
}

export default Hero
