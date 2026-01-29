import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface VisualMetricCardProps {
  title: string;
  value: number;
  maxValue?: number;
  percentage?: number;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  icon?: React.ReactNode;
  showBar?: boolean;
}

export function VisualMetricCard({
  title,
  value,
  maxValue,
  percentage,
  color = 'blue',
  size = 'medium',
  className,
  icon,
  showBar = true
}: VisualMetricCardProps) {
  const colorClasses = {
    blue: 'from-blue-500/30 to-cyan-500/30 border-blue-500/50',
    green: 'from-green-500/30 to-emerald-500/30 border-green-500/50',
    red: 'from-red-500/30 to-rose-500/30 border-red-500/50',
    amber: 'from-amber-500/30 to-orange-500/30 border-amber-500/50',
    purple: 'from-purple-500/30 to-indigo-500/30 border-purple-500/50',
    cyan: 'from-cyan-500/30 to-blue-500/30 border-cyan-500/50'
  };

  const progressColors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500'
  };

  const sizeClasses = {
    small: 'col-span-12 sm:col-span-6 lg:col-span-3',
    medium: 'col-span-12 sm:col-span-6 lg:col-span-4',
    large: 'col-span-12 sm:col-span-6 lg:col-span-6'
  };

  const calculatedPercentage = percentage || (maxValue ? (value / maxValue) * 100 : 0);

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all hover:shadow-xl border-2 bg-gradient-to-br',
        colorClasses[color as keyof typeof colorClasses],
        sizeClasses[size],
        className
      )}
    >
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          {icon && <div className="opacity-80">{icon}</div>}
        </div>

        <div className="space-y-4">
          <div className="text-6xl font-bold text-white tracking-tight">
            {value}
          </div>

          {showBar && (
            <div className="space-y-2">
              <div className="h-4 bg-black/30 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-1000', progressColors[color as keyof typeof progressColors])}
                  style={{ width: `${Math.min(calculatedPercentage, 100)}%` }}
                />
              </div>
              <p className="text-sm text-white/70 font-medium">
                {calculatedPercentage.toFixed(0)}% {maxValue ? `of ${maxValue}` : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}