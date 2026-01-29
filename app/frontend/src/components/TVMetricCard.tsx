import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TVMetricCardProps {
  title: string;
  value: number;
  percentage?: number;
  trend?: number;
  subtitle?: string;
  color?: 'blue' | 'green' | 'red' | 'cyan' | 'purple' | 'amber';
  size?: 'large' | 'xlarge';
  icon?: React.ReactNode;
}

export function TVMetricCard({
  title,
  value,
  percentage,
  trend,
  subtitle,
  color = 'blue',
  size = 'large',
  icon
}: TVMetricCardProps) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30',
    cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    amber: 'from-amber-500/20 to-amber-600/20 border-amber-500/30'
  };

  const textColorClasses = {
    blue: 'text-blue-300',
    green: 'text-green-300',
    red: 'text-red-300',
    cyan: 'text-cyan-300',
    purple: 'text-purple-300',
    amber: 'text-amber-300'
  };

  return (
    <Card className={cn(
      'p-6 bg-gradient-to-br backdrop-blur-sm border-2',
      colorClasses[color],
      'hover:scale-105 transition-transform duration-300'
    )}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
        {icon && <div>{icon}</div>}
      </div>
      
      <div className="space-y-2">
        <div className={cn(
          'font-bold',
          textColorClasses[color],
          size === 'xlarge' ? 'text-6xl' : 'text-5xl'
        )}>
          {value.toLocaleString()}
        </div>
        
        {percentage !== undefined && (
          <div className="flex items-center gap-2">
            <span className={cn('text-3xl font-semibold', textColorClasses[color])}>
              {percentage.toFixed(1)}%
            </span>
          </div>
        )}
        
        {trend !== undefined && (
          <div className="flex items-center gap-2 text-lg">
            {trend >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-300" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-300" />
            )}
            <span className={trend >= 0 ? 'text-green-300' : 'text-red-300'}>
              {Math.abs(trend).toFixed(1)}% from yesterday
            </span>
          </div>
        )}
        
        {subtitle && (
          <p className="text-base text-gray-300 mt-2">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}