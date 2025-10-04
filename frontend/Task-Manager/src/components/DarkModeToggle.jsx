import React from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

const DarkModeToggle = ({ isDarkMode, onToggle, size = 'default' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    default: 'h-10 w-10',
    large: 'h-12 w-12'
  };

  const iconSizes = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl'
  };

  return (
    <button
      onClick={onToggle}
      className={`
        ${sizeClasses[size]}
        relative flex items-center justify-center
        bg-neutral-100 dark:bg-dark-surface
        hover:bg-neutral-200 dark:hover:bg-dark-surfaceHover
        rounded-full
        transition-all duration-300
        transform hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg
        shadow-soft hover:shadow-soft-lg
        group
      `}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative overflow-hidden">
        <LuSun 
          className={`
            ${iconSizes[size]}
            text-warning-500
            transition-all duration-500
            ${isDarkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}
            absolute inset-0
          `}
        />
        <LuMoon 
          className={`
            ${iconSizes[size]}
            text-primary-600
            transition-all duration-500
            ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}
            absolute inset-0
          `}
        />
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-primary-500/20 scale-0 group-active:scale-100 transition-transform duration-300" />
    </button>
  );
};

export default DarkModeToggle;
