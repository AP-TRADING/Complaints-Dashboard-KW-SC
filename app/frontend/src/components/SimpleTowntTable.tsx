import { Card } from '@/components/ui/card';
import { TownStats } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface SimpleTownTableProps {
  data: TownStats[];
  className?: string;
}

export function SimpleTownTable({ data, className }: SimpleTownTableProps) {
  // Show only top 10 towns by pending complaints
  const topTowns = [...data]
    .sort((a, b) => b.pending - a.pending)
    .slice(0, 10);

  return (
    <Card className={cn('p-8', className)}>
      <h3 className="text-2xl font-semibold mb-8">Top Towns - Pending Complaints</h3>
      <div className="space-y-4">
        {topTowns.map((town, idx) => (
          <div
            key={town.town}
            className={cn(
              'p-6 rounded-xl border-2 transition-all hover:shadow-lg',
              idx < 3 && 'bg-red-500/10 border-red-500/50',
              idx >= 3 && 'bg-muted/20 border-muted'
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl',
                  idx < 3 ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'
                )}>
                  {idx + 1}
                </div>
                <div>
                  <p className="text-2xl font-bold">{town.town}</p>
                  <p className="text-sm text-muted-foreground">Last 30 Days</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center p-4 bg-amber-500/20 rounded-lg">
                <p className="text-3xl font-bold text-amber-400">{town.pending}</p>
                <p className="text-xs text-muted-foreground mt-1">Pending</p>
              </div>
              <div className="text-center p-4 bg-green-500/20 rounded-lg">
                <p className="text-3xl font-bold text-green-400">{town.resolved}</p>
                <p className="text-xs text-muted-foreground mt-1">Resolved</p>
              </div>
              <div className="text-center p-4 bg-cyan-500/20 rounded-lg">
                <p className="text-3xl font-bold text-cyan-400">{town.water}</p>
                <p className="text-xs text-muted-foreground mt-1">Water</p>
              </div>
              <div className="text-center p-4 bg-purple-500/20 rounded-lg">
                <p className="text-3xl font-bold text-purple-400">{town.sewerage}</p>
                <p className="text-xs text-muted-foreground mt-1">Sewerage</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}