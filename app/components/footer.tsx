export function Footer() {
    return (
      <footer className="flex justify-between p-6 backdrop-blur-md bg-black/20 border-t border-white/10 py-12">
            {/* Brand */}
              <div className="mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66] bg-clip-text text-transparent">
                  Keychain
                </span>
                <p className="text-gray-400 text-sm mb-4">
                The future of password management, powered by Solana blockchain technology.
              </p>
              <p className="text-gray-400 text-sm">© 2025 Keychain. All rights reserved.</p>
              </div>
              
              <div className="flex space-x-4">
  {/* GitHub */}
  <a href="https://github.com/yourusername" className="text-gray-400 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.26.82-.577 
        0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.729.082-.729 
        1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.996.108-.775.418-1.304.76-1.604-2.665-.3-5.467-1.334-5.467-5.931 
        0-1.31.47-2.381 1.236-3.221-.124-.303-.536-1.523.116-3.176 
        0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.403c1.018.005 
        2.045.138 3.003.403 2.291-1.552 3.297-1.23 3.297-1.23.653 
        1.653.241 2.873.118 3.176.77.84 1.234 1.911 1.234 
        3.221 0 4.609-2.807 5.628-5.479 
        5.921.43.37.823 1.102.823 
        2.222 0 1.604-.015 2.896-.015 
        3.293 0 .32.216.694.825.576C20.565 
        21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  </a>
  
  {/* Twitter/X */}
  <a href="https://x.com/yourhandle" className="text-gray-400 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>
  
  {/* LinkedIn */}
  <a href="https://linkedin.com/in/yourhandle" className="text-gray-400 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </a>
</div>


      </footer>
    )
  }
  