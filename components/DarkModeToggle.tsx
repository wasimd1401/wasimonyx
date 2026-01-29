import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-6 right-6 p-4 bg-white dark:bg-gray-800 rounded-full shadow-2xl z-50 text-primary dark:text-white hover:scale-110 transition-transform"
      aria-label="Toggle Dark Mode"
    >
      <span className="material-icons-outlined text-2xl">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

export default DarkModeToggle;