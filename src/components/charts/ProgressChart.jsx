import React, { useState, useEffect } from 'react';

const ProgressChart = ({ 
  value, 
  max = 100, 
  size = 'md', 
  variant = 'circular', 
  label, 
  showValue = true,
  color = 'blue',
  animated = true,
  className = ''
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setProgress(value), 300);
      return () => clearTimeout(timer);
    } else {
      setProgress(value);
    }
  }, [value, animated]);

  // Ensure valid numeric values
  const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(progress, max));
  const safeMax = isNaN(max) || max <= 0 ? 100 : max;
  const percentage = (safeProgress / safeMax) * 100;

  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600'
  };

  const sizes = {
    sm: { size: 80, strokeWidth: 4, fontSize: 'text-sm' },
    md: { size: 120, strokeWidth: 6, fontSize: 'text-lg' },
    lg: { size: 160, strokeWidth: 8, fontSize: 'text-xl' }
  };

  const { size: chartSize, strokeWidth, fontSize } = sizes[size];
  const radius = (chartSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  if (variant === 'circular') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div className="relative">
          <svg width={chartSize} height={chartSize} className="transform -rotate-90">
            <circle
              cx={chartSize / 2}
              cy={chartSize / 2}
              r={radius}
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={chartSize / 2}
              cy={chartSize / 2}
              r={radius}
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6"/>
                <stop offset="100%" stopColor="#1D4ED8"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {showValue && (
                <div className={`font-bold text-gray-900 ${fontSize}`}>
                  {Math.round(progress)}%
                </div>
              )}
              {label && (
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'linear') {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">{label}</span>
            {showValue && (
              <span className="text-gray-500">{Math.round(progress)}%</span>
            )}
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full bg-gradient-to-r ${colors[color]} transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default ProgressChart;
