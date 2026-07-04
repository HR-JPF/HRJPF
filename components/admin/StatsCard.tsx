'use client';

import React from 'react';
import Badge from '../ui/Badge';
import { Users, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  trend?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'default',
  trend,
}) => {
  const variants = {
    default: 'bg-purple-main/10 border-purple-main/30',
    success: 'bg-emerald-accent/10 border-emerald-accent/30',
    warning: 'bg-yellow-500/10 border-yellow-500/30',
    danger: 'bg-red-500/10 border-red-500/30',
  };

  return (
    <div
      className={`glass p-6 border ${variants[variant]} group hover:border-white/20 transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm font-cairo">{title}</p>
          <h3 className="text-3xl font-cairo font-700 text-white mt-2">
            {value}
          </h3>
          {subtitle && (
            <p className="text-gray-500 text-sm font-cairo mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
          {icon || <Users className="w-6 h-6 text-purple-main" />}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-green-400 text-sm font-cairo">
          <TrendingUp className="w-4 h-4" /{
>          {trend}% من الشهر الماضي
        </div>
      )}
    </div>
  );
};

export default StatsCard;
