import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TownStats } from '@/lib/mockData';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TownTableProps {
  data: TownStats[];
  className?: string;
}

type SortField = 'town' | 'total' | 'pending' | 'resolved' | 'unresolved';

export function TownTable({ data, className }: TownTableProps) {
  const [sortField, setSortField] = useState<SortField>('pending');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * multiplier;
    }
    return ((aVal as number) - (bVal as number)) * multiplier;
  });

  return (
    <Card className={cn('p-6', className)}>
      <h3 className="text-xl font-semibold mb-6">Last 30 Days - Town Wise Complaints</h3>
      <div className="overflow-auto max-h-[600px]">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('town')}
              >
                <div className="flex items-center gap-2">
                  Town
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50 text-right"
                onClick={() => handleSort('total')}
              >
                <div className="flex items-center justify-end gap-2">
                  Total
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50 text-right"
                onClick={() => handleSort('pending')}
              >
                <div className="flex items-center justify-end gap-2">
                  Pending
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50 text-right"
                onClick={() => handleSort('resolved')}
              >
                <div className="flex items-center justify-end gap-2">
                  Resolved
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50 text-right"
                onClick={() => handleSort('unresolved')}
              >
                <div className="flex items-center justify-end gap-2">
                  Unresolved
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Water</TableHead>
              <TableHead className="text-right">Sewerage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((town, idx) => (
              <TableRow 
                key={town.town}
                className={cn(
                  'hover:bg-muted/50',
                  idx % 2 === 0 && 'bg-muted/20'
                )}
              >
                <TableCell className="font-medium">{town.town}</TableCell>
                <TableCell className="text-right font-semibold">{town.total}</TableCell>
                <TableCell className="text-right">
                  <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-500 font-semibold">
                    {town.pending}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-green-500 font-semibold">{town.resolved}</span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-red-500 font-semibold">{town.unresolved}</span>
                </TableCell>
                <TableCell className="text-right text-cyan-400">{town.water}</TableCell>
                <TableCell className="text-right text-purple-400">{town.sewerage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}