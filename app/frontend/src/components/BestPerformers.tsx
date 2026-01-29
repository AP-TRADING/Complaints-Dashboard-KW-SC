import { Card } from '@/components/ui/card';
import { TownStats } from '@/lib/mockData';
import { Trophy, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BestPerformersProps {
  performers: TownStats[];
  className?: string;
}

export function BestPerformers({ performers, className }: BestPerformersProps) {
  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center gap-3 mb-6">
        <img 
          src="https://mgx-backend-cdn.metadl.com/generate/images/676545/2026-01-26/e5686e35-f308-4a32-861d-c97d6c24afee.png"
          alt="Best Performers"
          className="w-8 h-8"
        />
        <h3 className="text-xl font-semibold">Best Performers</h3>
      </div>

      <div className="space-y-4">
        {performers.map((performer, idx) => (
          <div
            key={performer.town}
            className={cn(
              'p-4 rounded-lg border transition-all hover:shadow-md',
              idx === 0 && 'bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/50',
              idx === 1 && 'bg-gradient-to-r from-gray-400/10 to-transparent border-gray-400/50',
              idx === 2 && 'bg-gradient-to-r from-orange-600/10 to-transparent border-orange-600/50',
              idx > 2 && 'bg-muted/20 border-muted'
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full font-bold',
                  idx === 0 && 'bg-amber-500 text-black',
                  idx === 1 && 'bg-gray-400 text-black',
                  idx === 2 && 'bg-orange-600 text-white',
                  idx > 2 && 'bg-muted text-muted-foreground'
                )}>
                  {idx + 1}
                </div>
                <div>
                  <p className="font-semibold text-lg">{performer.town}</p>
                  <p className="text-sm text-muted-foreground">
                    {performer.resolved} resolved / {performer.total} total
                  </p>
                </div>
              </div>
              {idx === 0 && <Trophy className="h-6 w-6 text-amber-500" />}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg TAT</p>
                  <p className="font-semibold">{performer.avgTAT.toFixed(1)}h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Satisfaction</p>
                  <p className="font-semibold">{performer.satisfactionRate.toFixed(0)}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}