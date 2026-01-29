import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Insight {
  title: string;
  value: string;
  description: string;
  type: 'critical' | 'warning' | 'success' | 'info';
  icon: React.ReactNode;
}

interface KeyInsightsProps {
  insights: Insight[];
}

export function KeyInsights({ insights }: KeyInsightsProps) {
  const typeClasses = {
    critical: 'from-red-500/30 to-red-600/30 border-red-500/50 bg-red-950/40',
    warning: 'from-amber-500/30 to-amber-600/30 border-amber-500/50 bg-amber-950/40',
    success: 'from-green-500/30 to-green-600/30 border-green-500/50 bg-green-950/40',
    info: 'from-blue-500/30 to-blue-600/30 border-blue-500/50 bg-blue-950/40'
  };

  const valueColorClasses = {
    critical: 'text-red-300',
    warning: 'text-amber-300',
    success: 'text-green-300',
    info: 'text-blue-300'
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-4">Key Insights</h2>
      {insights.map((insight, index) => (
        <Card
          key={index}
          className={cn(
            'p-4 bg-gradient-to-br backdrop-blur-sm border-2',
            typeClasses[insight.type],
            'hover:scale-105 transition-transform duration-300'
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">{insight.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white mb-1">{insight.title}</h3>
              <p className={cn('text-3xl font-bold mb-2', valueColorClasses[insight.type])}>
                {insight.value}
              </p>
              <p className="text-xs text-gray-200 leading-tight">
                {insight.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}