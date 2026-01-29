import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface DonutChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  className?: string;
  centerText?: string;
  centerSubtext?: string;
}

export function DonutChart({ title, data, className, centerText, centerSubtext }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className={cn('p-8', className)}>
      <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={150}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A1A',
              border: '1px solid #333',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px',
              padding: '12px'
            }}
            formatter={(value: number) => [
              `${value} (${((value / total) * 100).toFixed(1)}%)`,
              ''
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={16}
            wrapperStyle={{
              fontSize: '16px',
              fontWeight: '600'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {centerText && (
        <div className="text-center -mt-64 pointer-events-none">
          <div className="text-5xl font-bold">{centerText}</div>
          {centerSubtext && (
            <div className="text-lg text-muted-foreground mt-2">{centerSubtext}</div>
          )}
        </div>
      )}
    </Card>
  );
}