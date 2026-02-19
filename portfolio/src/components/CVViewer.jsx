import { useState } from 'react'

const CVViewer = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true)

  if (!isOpen) return null

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'Soufiane_Aqli_CV.pdf'
    link.click()
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-gradient-to-br from-gray-900/95 to-black/95 rounded-3xl border border-red-500/30 shadow-2xl shadow-red-500/20 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CV - Soufiane Aqli</h2>
              <p className="text-sm text-gray-400">Développeur Full Stack</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z M12,19L8,15H10.5V12H13.5V15H16L12,19Z"/>
                </svg>
                Télécharger
              </span>
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white w-14 h-14 rounded-xl font-bold transition-all duration-300 hover:scale-110 shadow-lg shadow-red-500/30 overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-7 h-7 relative z-10 stroke-current stroke-[2.5]" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
              <p className="text-white font-semibold">Chargement du CV...</p>
            </div>
          </div>
        )}

        {/* PDF Viewer */}
        <div className="h-full pb-6 px-6">
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="/cv.pdf"
              className="w-full h-full"
              title="CV Soufiane Aqli"
              onLoad={handleLoad}
              style={{ minHeight: '600px' }}
            />
          </div>
        </div>

      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      ></div>
    </div>
  )
}

export default CVViewer
