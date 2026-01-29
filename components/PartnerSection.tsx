import React from 'react';
import { STEPS } from '../constants';

const PartnerSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative z-10">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-onyx-pink/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-onyx-teal/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 md:text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-5xl md:text-7xl mb-6 text-primary dark:text-white">
            How We{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-onyx-blue to-onyx-teal">
              Partner.
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300">
            Three simple steps to automation. Zero jargon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[3rem] left-[16%] right-[16%] h-1 bg-gradient-to-r from-onyx-pink via-onyx-orange to-onyx-teal opacity-30 border-t-2 border-dashed border-gray-400/50"></div>

          {STEPS.map((step, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center"
            >
              <div
                className={`w-24 h-24 rounded-full bg-${step.gradient} flex items-center justify-center relative mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl z-10 text-white ${
                  index === 1 ? 'delay-75' : index === 2 ? 'delay-150' : ''
                }`}
              >
                <span className="material-icons-outlined text-4xl">
                  {step.icon}
                </span>
              </div>
              
              <h3 className="font-display text-3xl font-bold mb-3 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4 max-w-xs">
                {step.description}
              </p>
              
              <div className="h-0 overflow-hidden opacity-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0">
                <p className={`text-sm font-bold ${step.color} max-w-xs mx-auto`}>
                  {step.subDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;