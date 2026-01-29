import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden" id="contact">
      {/* Decorative Gradients */}
      <div className="absolute top-1/2 left-10 w-40 h-40 bg-sphere-3 rounded-full opacity-50 blur-2xl animate-float shadow-sphere"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-t from-onyx-pink to-purple-600 rounded-full opacity-30 blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-display text-5xl md:text-7xl font-black mb-8 leading-none tracking-tight dark:text-white">
          READY TO
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-onyx-orange via-onyx-pink to-purple-600">
            RECLAIM YOUR TIME?
          </span>
        </h2>
        <p className="text-xl md:text-2xl mb-12 font-light text-gray-600 dark:text-gray-300">
          Let's simplify your business operations today.
        </p>

        <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-transparent focus:border-onyx-pink rounded-xl outline-none transition-all shadow-sm text-lg placeholder-gray-400 dark:text-white"
          />
          <button
            type="submit"
            className="w-full py-4 bg-primary text-white font-display font-bold text-xl rounded-xl hover:bg-onyx-pink transition-colors shadow-lg"
          >
            Let's Talk
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;