import React from 'react';
import { FEATURES } from '../constants';

const ImpactsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-black relative z-10 rounded-t-[3rem] rounded-b-[3rem] shadow-2xl mb-12" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h3 className="font-display text-4xl md:text-5xl font-bold mb-4 dark:text-white">
            Practical Impacts
          </h3>
          <p className="text-gray-500 font-light text-lg">
            Real tools for real business problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-3xl bg-background-light dark:bg-gray-900 overflow-hidden hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-onyx-${feature.color}/30`}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-onyx-${feature.color} to-transparent opacity-20 rounded-bl-full transition-transform group-hover:scale-150 duration-500`}
              ></div>
              
              <div
                className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center shadow-lg text-white ${
                  feature.color === 'pink' ? 'bg-gradient-to-br from-onyx-pink to-red-500' :
                  feature.color === 'orange' ? 'bg-sphere-2 rounded-full' :
                  'bg-gradient-to-br from-onyx-teal to-blue-500 rounded-tr-[2rem] rounded-bl-[2rem] transform rotate-3 group-hover:rotate-12 transition-transform'
                }`}
              >
                <span className="material-icons-outlined text-3xl">
                  {feature.icon}
                </span>
              </div>

              <h4 className="font-display text-2xl font-bold mb-4 dark:text-white">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6">
                <a
                  href="#"
                  className={`inline-flex items-center font-bold group-hover:translate-x-2 transition-transform ${
                    feature.color === 'pink' ? 'text-onyx-pink' :
                    feature.color === 'orange' ? 'text-onyx-orange' : 'text-onyx-teal'
                  }`}
                >
                  See How
                  <span className="material-icons-outlined ml-1 text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactsSection;