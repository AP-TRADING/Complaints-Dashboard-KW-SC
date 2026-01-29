import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HorizontalBarChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  className?: string;
  maxValue?: number;
}

export function HorizontalBarChart({ title, data, className, maxValue }: HorizontalBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <Card className={cn('p-8', className)}>
      <h3 className="text-2xl font-semibold mb-8">{title}</h3>
      <div className="space-y-6">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">{item.name}</span>
              <span className="text-2xl font-bold" style={{ color: item.color }}>
                {item.value}
              </span>
            </div>
            <div className="h-8 bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-4"
                style={{
                  width: `${(item.value / max) * 100}%`,
                  backgroundColor: item.color
                }}
              >
                <span className="text-sm font-bold text-white">
                  {((item.value / max) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}