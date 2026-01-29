import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  alert?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  icon?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  alert,
  size = 'medium',
  className,
  icon
}: MetricCardProps) {
  const sizeClasses = {
    small: 'col-span-12 sm:col-span-6 lg:col-span-3',
    medium: 'col-span-12 sm:col-span-6 lg:col-span-4',
    large: 'col-span-12 sm:col-span-6 lg:col-span-6'
  };

  const valueSizes = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-5xl lg:text-6xl'
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all hover:shadow-lg',
        sizeClasses[size],
        alert && 'border-red-500 border-2 animate-pulse',
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
              {title}
            </p>
            {alert && (
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-xs font-semibold text-red-500">CRITICAL ALERT</span>
              </div>
            )}
          </div>
          {icon && <div className="ml-4">{icon}</div>}
        </div>

        <div className="space-y-2">
          <p className={cn('font-bold tracking-tight', valueSizes[size])}>
            {value}
          </p>

          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}

          {trend !== undefined && (
            <div className="flex items-center gap-2 mt-3">
              {trend >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={cn(
                  'text-sm font-semibold',
                  trend >= 0 ? 'text-green-500' : 'text-red-500'
                )}
              >
                {trend >= 0 ? '+' : ''}{trend.toFixed(1)}% from yesterday
              </span>
            </div>
          )}
        </div>
      </div>

      {alert && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-3xl" />
      )}
    </Card>
  );
}