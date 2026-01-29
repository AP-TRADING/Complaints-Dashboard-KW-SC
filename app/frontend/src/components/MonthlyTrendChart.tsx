import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

interface MonthlyTrendChartProps {
  className?: string;
}

export function MonthlyTrendChart({ className }: MonthlyTrendChartProps) {
  // Generate last 12 months data with water/sewerage breakdown
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const data = [];
    
    for (let i = 11; i >= 0; i--) {
      const monthIdx = (currentMonth - i + 12) % 12;
      const totalComplaints = Math.floor(Math.random() * 500) + 1800;
      const waterRatio = 0.55 + Math.random() * 0.1; // 55-65% water
      
      data.push({
        month: months[monthIdx],
        water: Math.floor(totalComplaints * waterRatio),
        sewerage: Math.floor(totalComplaints * (1 - waterRatio)),
        resolved: Math.floor(totalComplaints * 0.75),
        pending: Math.floor(totalComplaints * 0.15)
      });
    }
    
    return data;
  };

  const data = generateMonthlyData();

  return (
    <Card className={cn('p-6 bg-black/60 backdrop-blur-sm border-2 border-white/30', className)}>
      <h3 className="text-2xl font-semibold text-white mb-4">Monthly Complaint Trends - Water vs Sewerage</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis 
            dataKey="month" 
            stroke="#9CA3AF"
            tick={{ fill: '#E5E7EB', fontSize: 14 }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#E5E7EB', fontSize: 14 }}
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
          <Bar dataKey="water" fill="#06B6D4" name="Water Complaints" radius={[6, 6, 0, 0]} />
          <Bar dataKey="sewerage" fill="#A855F7" name="Sewerage Complaints" radius={[6, 6, 0, 0]} />
          <Bar dataKey="resolved" fill="#10B981" name="Resolved" radius={[6, 6, 0, 0]} />
          <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}