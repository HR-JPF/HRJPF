'use client';

import React from 'react';

interface BadgeProps {
  variant?:
    | 'default'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'emerald'
    | 'purple';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}) => {
  const variants = {
    default: 'bg-gray-500 text-white',
    success: 'bg-green-500/20 text-green-300 border border-green-500/30',
    danger: 'bg-red-500/20 text-red-300 border border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    info: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    emerald: 'bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/30',
    purple: 'bg-purple-main/20 text-purple-main border border-purple-main/30',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`inline-block rounded-full font-cairo font-600 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
