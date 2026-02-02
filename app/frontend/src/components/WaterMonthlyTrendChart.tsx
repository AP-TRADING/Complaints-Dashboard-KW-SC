import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface WaterMonthlyTrendChartProps {
  className?: string;
}

export function WaterMonthlyTrendChart({ className }: WaterMonthlyTrendChartProps) {
  // Generate last 12 months data for water complaints only
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const data = [];

    for (let i = 11; i >= 0; i--) {
      const monthIdx = (currentMonth - i + 12) % 12;
      const totalComplaints = Math.floor(Math.random() * 300) + 1000;
      const resolvedRatio = 0.7 + Math.random() * 0.2; // 70-90% resolved

      data.push({
        month: months[monthIdx],
        total: totalComplaints,
        resolved: Math.floor(totalComplaints * resolvedRatio),
        pending: Math.floor(totalComplaints * 0.15),
        unresolved: Math.floor(totalComplaints * (1 - resolvedRatio - 0.15))
      });
    }

    return data;
  };

  const data = generateMonthlyData();

  // Responsive chart dimensions with explicit height
  const chartHeight = 350;
  const chartWidth = '100%';

  return (
    <Card 
      className={cn(
        'p-4 sm:p-6 bg-black/60 backdrop-blur-sm border-2 border-cyan-500/40',
        'min-h-[300px] sm:min-h-[400px] h-auto w-full',
        'flex flex-col',
        className
      )}
      style={{
        minHeight: '300px',
        height: 'auto',
        width: '100%',
        display: 'block',
        visibility: 'visible',
        opacity: 1
      }}
    >
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Monthly Water Complaint Trends</h3>
      <div className="w-full flex-1" style={{ minHeight: '250px', height: '300px', maxHeight: '400px' }}>
        <ResponsiveContainer width={chartWidth} height={chartHeight}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              tick={{ fill: '#E5E7EB', fontSize: '14px' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#E5E7EB', fontSize: '14px' }}
              domain={[0, 'dataMax + 100']}
              scale="linear"
              allowDataOverflow={false}
              padding={{ bottom: 0, top: 0 }}
              allowDecimals={false}
              interval={0}
              tickCount={6}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #4B5563',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                padding: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px', paddingTop: '16px', color: '#E5E7EB' }}
              iconSize={16}
            />
            <Bar dataKey="total" fill="#06B6D4" name="Total Water Complaints" radius={[6, 6, 0, 0]} />
            <Bar dataKey="resolved" fill="#10B981" name="Resolved" radius={[6, 6, 0, 0]} />
            <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[6, 6, 0, 0]} />
            <Bar dataKey="unresolved" fill="#EF4444" name="Unresolved" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}