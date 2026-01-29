import React from 'react';

const NoiseOverlay: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-40 dark:opacity-20 mix-blend-overlay bg-noise"></div>
  );
};

export default NoiseOverlay;