import NetworkBackground from './NetworkBackground'

const About = () => {
  return (
    <section id="about" className="py-20 px-8 bg-black relative overflow-hidden">
      <NetworkBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            À propos
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ma Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Passionné par le développement web, je crée des solutions numériques innovantes 
                qui allient performance, esthétique et expérience utilisateur exceptionnelle. 
                Mon objectif est de transformer vos idées en réalité digitale.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">
                Mon Parcours
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Diplômé en Développement Digital de l'OFPPT, j'ai acquis une solide expertise 
                en développement Full Stack. Ma passion pour les nouvelles technologies me pousse 
                à me perfectionner constamment et à rester à la pointe de l'innovation.
              </p>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-8">Mes Compétences</h3>
            </div>

            {/* Skills Progress */}
            <div className="space-y-6">
              {[
                { skill: 'React.js & Laravel', level: 95 },
                { skill: 'JavaScript/TypeScript', level: 92 },
                { skill: 'Node.js & Python', level: 85 },
                { skill: 'MySQL & MongoDB', level: 88 },
                { skill: 'Tailwind CSS', level: 95 },
                { skill: 'Git & GitHub', level: 90 }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">
                      {item.skill}
                    </span>
                    <span className="text-red-400 font-bold">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
