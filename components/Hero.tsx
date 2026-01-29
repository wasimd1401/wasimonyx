import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Sphere 1 */}
        <div className="absolute top-20 right-[10%] w-32 h-32 md:w-64 md:h-64 rounded-full bg-sphere-1 shadow-sphere animate-float"></div>
        
        {/* Abstract Shape 2 */}
        <div className="absolute bottom-32 left-[5%] w-48 h-24 md:w-96 md:h-40 rounded-full bg-gradient-to-r from-onyx-orange to-onyx-yellow transform -rotate-12 opacity-90 blur-sm dark:opacity-80 animate-float-delayed"></div>
        
        {/* Rotating Shape 3 */}
        <div className="absolute top-1/3 left-[15%] w-24 h-24 md:w-40 md:h-40 bg-gradient-to-br from-onyx-teal to-blue-600 transform rotate-45 rounded-3xl shadow-xl opacity-80 animate-spin-slow"></div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-background-light dark:to-background-dark z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 md:mt-0">
        <h2 className="font-display font-semibold tracking-widest text-sm md:text-base uppercase text-onyx-teal mb-6 animate-pulse">
          Smart Automation for Small Business
        </h2>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-9xl leading-[1] tracking-tight select-none text-primary dark:text-white mb-8">
          Get your <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-onyx-pink to-onyx-orange">
            Saturdays
          </span>{' '}
          back.
        </h1>
        <p className="mt-4 font-body text-xl md:text-2xl font-light text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Onyx builds custom AI tools that handle the repetitive stuff, so you
          don't have to.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-primary text-white rounded-full overflow-hidden font-display font-bold tracking-wide shadow-lg hover:shadow-onyx-pink/50 transition-all duration-300"
          >
            <span className="relative z-10 group-hover:text-primary transition-colors">
              START SAVING TIME
            </span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;