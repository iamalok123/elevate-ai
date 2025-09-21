import React, { useState, useEffect } from 'react';

const EnhancedChart = ({ data, type = 'bar', title, height = 300, className = '', animated = true }) => {
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setAnimationProgress(1), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimationProgress(1);
    }
  }, [animated]);

  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-48 text-gray-500 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));

  if (type === 'bar') {
    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-500">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                    item.color || 'bg-gradient-to-r from-blue-500 to-blue-600'
                  }`}
                  style={{ 
                    width: `${(item.value / maxValue) * 100 * animationProgress}%`,
                    transform: 'translateX(0)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90 transition-all duration-1000" viewBox="0 0 36 36">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const strokeDasharray = `${percentage * animationProgress}, 100`;
                const strokeDashoffset = -cumulativePercentage;
                cumulativePercentage += percentage;

                return (
                  <path
                    key={index}
                    className={`${item.color || 'text-gray-400'} transition-all duration-1000`}
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 transition-all duration-1000">
                  {Math.round(total * animationProgress)}
                </div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${item.color || 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-700 truncate">{item.label}</span>
              <span className="text-sm text-gray-500">
                {Math.round((item.value / total) * 100 * animationProgress)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'line') {
    const width = 300;
    const height = 200;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((item, index) => ({
      x: padding + (index / (data.length - 1)) * chartWidth,
      y: padding + (1 - item.value / maxValue) * chartHeight
    }));

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <div className={`space-y-4 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        <div className="flex justify-center">
          <svg width={width} height={height} className="border border-gray-200 rounded-lg bg-gray-50">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            <path
              d={pathData}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathData.length}
              strokeDashoffset={pathData.length * (1 - animationProgress)}
              className="transition-all duration-1000"
            />
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3B82F6"
                className="transition-all duration-1000"
                style={{ opacity: animationProgress }}
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          {data.map((item, index) => (
            <span key={index}>{item.label}</span>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default EnhancedChart;
