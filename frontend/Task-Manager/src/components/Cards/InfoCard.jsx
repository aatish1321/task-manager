import React from 'react'
import { HiOutlineUsers, HiOutlineClock, HiOutlineCheckCircle } from 'react-icons/hi2'
import { HiOutlineTrendingUp } from 'react-icons/hi'

const InfoCard = ({icon, label, value, color, trend, trendValue}) => {
  const getIcon = () => {
    if (icon) return icon;
    
    // Default icons based on label
    if (label.toLowerCase().includes('task')) return HiOutlineCheckCircle;
    if (label.toLowerCase().includes('user')) return HiOutlineUsers;
    if (label.toLowerCase().includes('time') || label.toLowerCase().includes('pending')) return HiOutlineClock;
    return HiOutlineTrendingUp;
  };

  const IconComponent = getIcon();

  return (
    <div className="card-hover group p-6 bg-gradient-to-br from-white to-neutral-50 dark:from-dark-surface dark:to-dark-bg border border-neutral-200/50 dark:border-dark-border">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${color} shadow-soft group-hover:shadow-glow transition-all duration-300`}>
          <IconComponent className="text-2xl text-white" />
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' 
              ? 'text-success-600 bg-success-50 dark:text-success-400 dark:bg-success-900/20' 
              : 'text-error-600 bg-error-50 dark:text-error-400 dark:bg-error-900/20'
          }`}>
            <HiOutlineTrendingUp className={`text-sm ${trend === 'down' ? 'rotate-180' : ''}`} />
            {trendValue}%
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold text-neutral-900 dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {value}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
          {label}
        </p>
      </div>

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}

export default InfoCard