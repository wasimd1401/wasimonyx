import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light dark:bg-background-dark text-primary dark:text-white pt-24 pb-8 px-6 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 lg:gap-8 mb-24">
        <div className="lg:w-1/3">
          <h3 className="font-display font-black text-7xl md:text-9xl tracking-tighter leading-none text-primary dark:text-white">
            ONYX<span className="text-onyx-pink">.</span>
          </h3>
        </div>

        <div className="lg:w-1/3 flex justify-start lg:justify-center w-full">
          <nav className="flex flex-col md:flex-row gap-6 md:gap-12 font-display font-bold text-2xl tracking-tight">
            <a href="#" className="hover:text-onyx-pink transition-colors">
              Home
            </a>
            <a href="#services" className="hover:text-onyx-pink transition-colors">
              Services
            </a>
            <a href="#about" className="hover:text-onyx-pink transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-onyx-pink transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="lg:w-1/3 flex flex-row justify-start lg:justify-end gap-16 w-full lg:w-auto">
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xs uppercase tracking-widest text-gray-400">
              Social
            </span>
            <div className="flex flex-col gap-2 font-medium text-lg text-gray-600 dark:text-gray-300">
              <a href="#" className="hover:text-onyx-orange transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-onyx-orange transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-onyx-orange transition-colors">
                Twitter/X
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xs uppercase tracking-widest text-gray-400">
              Legal
            </span>
            <div className="flex flex-col gap-2 font-medium text-lg text-gray-600 dark:text-gray-300">
              <a href="#" className="hover:text-onyx-teal transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-onyx-teal transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative pt-8">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-onyx-pink to-onyx-orange"></div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
          <p>© 2023 Onyx AI Consulting.</p>
          <p className="mt-2 md:mt-0 font-display text-primary dark:text-white font-bold tracking-wide">
            Built for humans.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;