import React from 'react';

const Marquee: React.FC = () => {
  return (
    <div className="bg-primary text-white py-6 overflow-hidden border-y border-gray-800 relative z-20 transform -skew-y-2">
      <div className="whitespace-nowrap flex animate-marquee">
        <span className="text-4xl md:text-6xl font-display font-bold px-8">
          AUTOMATION • EFFICIENCY • FREEDOM • GROWTH •
        </span>
        <span className="text-4xl md:text-6xl font-display font-bold px-8">
          AUTOMATION • EFFICIENCY • FREEDOM • GROWTH •
        </span>
        <span className="text-4xl md:text-6xl font-display font-bold px-8">
          AUTOMATION • EFFICIENCY • FREEDOM • GROWTH •
        </span>
        <span className="text-4xl md:text-6xl font-display font-bold px-8">
          AUTOMATION • EFFICIENCY • FREEDOM • GROWTH •
        </span>
      </div>
    </div>
  );
};

export default Marquee;