import React from 'react';
import Badge from './Badge';

const StatusIndicator = ({ 
  status, 
  size = 'md', 
  showIcon = true,
  className = '' 
}) => {
  const statusConfig = {
    completed: {
      variant: 'success',
      icon: '✅',
      label: 'Completed'
    },
    ongoing: {
      variant: 'primary',
      icon: '🔄',
      label: 'Ongoing'
    },
    pending: {
      variant: 'warning',
      icon: '⏳',
      label: 'Pending'
    },
    active: {
      variant: 'success',
      icon: '🟢',
      label: 'Active'
    },
    inactive: {
      variant: 'default',
      icon: '⚪',
      label: 'Inactive'
    },
    high: {
      variant: 'danger',
      icon: '🔴',
      label: 'High Priority'
    },
    medium: {
      variant: 'warning',
      icon: '🟡',
      label: 'Medium Priority'
    },
    low: {
      variant: 'success',
      icon: '🟢',
      label: 'Low Priority'
    }
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

  return (
    <Badge 
      variant={config.variant} 
      size={size}
      className={`flex items-center space-x-1 ${className}`}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </Badge>
  );
};

export default StatusIndicator;
