import * as React from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TownStats } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { TownDetailPopup } from './TownDetailPopup';

interface CriticalTableProps {
  data: TownStats[];
}

export function CriticalTable({ data }: CriticalTableProps) {
  const [selectedTown, setSelectedTown] = React.useState<TownStats | null>(null);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const handleTownClick = (town: TownStats) => {
    setSelectedTown(town);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTown(null);
  };

  // Sort by criticality: unresolved desc, then pending desc
  const sortedData = [...data]
    .sort((a, b) => {
      const scoreA = a.unresolved * 2 + a.pending;
      const scoreB = b.unresolved * 2 + b.pending;
      return scoreB - scoreA;
    })
    .slice(0, 12);

  const getStatusBadge = (stats: TownStats) => {
    const resolutionRate = (stats.resolved / stats.total) * 100;
    
    if (stats.pending > 50 || resolutionRate < 60) {
      return <Badge variant="destructive" className="text-sm">CRITICAL</Badge>;
    } else if (stats.pending > 30 || resolutionRate < 75) {
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-sm">WARNING</Badge>;
    }
    return <Badge variant="outline" className="text-sm">NORMAL</Badge>;
  };

  const getRowClass = (stats: TownStats) => {
    const resolutionRate = (stats.resolved / stats.total) * 100;
    
    if (stats.pending > 50 || resolutionRate < 60) {
      return 'bg-red-500/10 hover:bg-red-500/20 border-l-4 border-red-500';
    } else if (stats.pending > 30 || resolutionRate < 75) {
      return 'bg-amber-500/10 hover:bg-amber-500/20 border-l-4 border-amber-500';
    }
    return 'hover:bg-muted/50';
  };

  return (
    <Card className="p-6 bg-black/60 backdrop-blur-sm border-2 border-white/30">
      <h2 className="text-2xl font-bold text-white mb-4">Critical Towns - Immediate Attention Required</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-white/20">
              <TableHead className="text-base font-bold text-white">Town</TableHead>
              <TableHead className="text-base font-bold text-center text-white">Status</TableHead>
              <TableHead className="text-base font-bold text-right text-white">Pending</TableHead>
              <TableHead className="text-base font-bold text-right text-white">Unresolved</TableHead>
              <TableHead className="text-base font-bold text-right text-white">Resolved</TableHead>
              <TableHead className="text-base font-bold text-right text-white">Water</TableHead>
              <TableHead className="text-base font-bold text-right text-white">Sewerage</TableHead>
              <TableHead className="text-base font-bold text-right text-white">Resolution %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((town) => {
              const resolutionRate = (town.resolved / town.total) * 100;
              return (
                <TableRow 
                  key={town.town} 
                  className={cn('border-b border-white/10', getRowClass(town), 'cursor-pointer')}
                  onClick={() => handleTownClick(town)}
                >
                  <TableCell className="font-semibold text-base text-white hover:text-cyan-400 transition-colors">
                    {town.town}
                  </TableCell>
                  <TableCell className="text-center">{getStatusBadge(town)}</TableCell>
                  <TableCell className="text-right text-base font-semibold text-amber-400">
                    {town.pending}
                  </TableCell>
                  <TableCell className="text-right text-base font-semibold text-red-400">
                    {town.unresolved}
                  </TableCell>
                  <TableCell className="text-right text-base font-semibold text-green-400">
                    {town.resolved}
                  </TableCell>
                  <TableCell className="text-right text-base text-cyan-400">
                    {town.water}
                  </TableCell>
                  <TableCell className="text-right text-base text-purple-400">
                    {town.sewerage}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      'text-base font-bold',
                      resolutionRate >= 75 ? 'text-green-400' : resolutionRate >= 60 ? 'text-amber-400' : 'text-red-400'
                    )}>
                      {resolutionRate.toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {selectedTown && (
        <TownDetailPopup
          town={selectedTown}
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
        />
      )}
    </Card>
  );
}
