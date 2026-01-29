import React from 'react';

const PromiseSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative z-10 overflow-hidden" id="about">
      {/* Background Decor */}
      <div className="absolute top-20 right-10 md:right-32 w-24 h-24 md:w-32 md:h-32 rounded-full bg-sphere-1 shadow-sphere animate-float opacity-80 z-0"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-onyx-orange to-onyx-yellow rounded-3xl transform -rotate-12 blur-sm opacity-60 animate-float-delayed -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-onyx-pink/5 via-onyx-orange/5 to-transparent rounded-full blur-3xl -z-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-24 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-onyx-pink"></div>
            <span className="font-display font-bold text-onyx-pink uppercase tracking-widest text-sm">
              Our Promise
            </span>
          </div>
          <h2 className="font-display font-extrabold text-6xl md:text-8xl leading-[0.9] tracking-tighter text-primary dark:text-white">
            Human-First,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-onyx-pink via-onyx-orange to-onyx-yellow">
              AI-Second.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 relative z-10">
          <div className="group">
            <h3 className="font-display font-bold text-4xl md:text-5xl mb-6 text-primary dark:text-white group-hover:text-onyx-pink transition-colors duration-300">
              Partners, not
              <br />
              just tools.
            </h3>
            <p className="font-body text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
              We're not here to replace the owner—we're here to empower them. We
              build systems that amplify your intuition, not override it. Think of
              us as your technical co-founder who handles the complexity so you
              can lead.
            </p>
          </div>
          <div className="group">
            <h3 className="font-display font-bold text-4xl md:text-5xl mb-6 text-primary dark:text-white group-hover:text-onyx-orange transition-colors duration-300">
              Visible results,
              <br />
              zero stress.
            </h3>
            <p className="font-body text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
              Forget the jargon and the steep learning curves. We deliver clean,
              working solutions that integrate silently into your workflow. You
              see the efficiency gains immediately; we handle the code, the
              prompts, and the updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;