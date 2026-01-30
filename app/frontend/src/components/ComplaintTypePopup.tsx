import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Droplets, Waves, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface ComplaintTypeStats {
  total: number;
  resolved: number;
  unresolved: number;
  pending: number;
}

interface ComplaintSubType {
  name: string;
  count: number;
  resolved: number;
  pending: number;
  unresolved: number;
  isCritical: boolean;
}

interface ComplaintTypePopupProps {
  isOpen: boolean;
  onClose: () => void;
  complaintType: 'water' | 'sewerage' | 'other';
  stats: ComplaintTypeStats;
}

// Sub-type definitions for water and sewerage complaints
const WATER_SUB_TYPES: ComplaintSubType[] = [
  { name: 'LEAKAGE', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'NO SUPPLY', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'SHORTAGE OF WATER', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'LOW PRESSURE', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'LINE BURST', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'CONTAMINATED WATER', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'ILLEGAL CONNECTION', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'LINE CHOKED', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'IRREGULAR SUPPLY', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'WATER THEFT REPORT', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'NEW CONNECTION RESIDENTIAL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'REQUIRED CONNECTION RESTORED', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'ELECTRICAL & MECHANICAL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'LINE DAMAGED', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'DISPUTE ON DIGGING', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
];

const SEWERAGE_SUB_TYPES: ComplaintSubType[] = [
  { name: 'OVER FLOW', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'LINE LEAKAGE', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'LINE DAMAGE', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'LINE CHOKED', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'OPEN MANHOLE', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'DAMAGED MANHOLE', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'STORM & DRAINNING', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'NEW CONNECTION RESIDENTIAL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'ELECTRICAL & MECHANICAL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'BROKEN RING SLAB', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
  { name: 'DISPUTE ON DIGGING', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
];

// Categorized sub-types for other complaints
const OTHER_SUB_TYPES = [
  {
    category: 'BILLING SUB-TYPES',
    subTypes: [
      { name: 'Bill not received', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'issue new bill', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'duplicate bill', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Correction in Bill', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Bill Installment', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'ACCOUNT TITLE CHANGE', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'BILL NOT DELIVERED', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'BILL NOT DELIVERED AFTER ANNUAL BILL PAID', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'BILL REVIEVED AFTER DUE DATE', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'ONLINE BILLING NOT WORKING', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'UNABLE TO DOWNLOAD BILL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'BANK IS NOT ACCEPTING BILL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'ACTIVATION OF MONTHLY BILL SUBSCRIPTION', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'DE_ACTIVATE MONTHLY BILL SUBSCRIPTION', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'RECIEVED ANOTHER CONSUMER BILL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Applications For NDC', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Ownership-Change', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Consumer Payment Statement', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Tax Certificate', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Application for N O C', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Consumer data update', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
    ]
  },
  {
    category: 'BULK SUPPLY WATER SUB-TYPES',
    subTypes: [
      { name: 'Water Line Burst', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'Water Line leaking', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'No Water Supply', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'Water Shortage', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
    ]
  },
  {
    category: 'NEW CONNECTION COMMERCIAL SUB-TYPES',
    subTypes: [
      { name: 'COMMERCIAL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'BULK', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
    ]
  },
  {
    category: 'ENVIRONMENTAL/SOCIAL COMPLAINS SUB-TYPES',
    subTypes: [
      { name: 'GENERAL REQUEST', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Dust, noise, and air pollution', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'Community health and safety', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'BLOCKED ACCESS', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'DAMAGE OF WATER SUPPLY', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'Damage and blockage of sewerage lines', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'Sewerage overflow due to choked sewerage lines.', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'Traffic inconvenience', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Livelihood disturbance', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
      { name: 'Relocation of mobile vendors', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Land and Land-based assets compensation', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'Gender-based violence, sexual exploitation and abuse, sexual harassment', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: true }, // Critical
    ]
  },
  {
    category: 'HYDRANT COMPLAINT SUB-TYPES',
    subTypes: [
      { name: 'BOOK TANKER', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'GENERAL', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'FALSE TANKER DISPATCH', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'TANKER NOT DELIVERED', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'OTS APP NOT WORKING', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
      { name: 'OTS MOBILE APP', count: 0, resolved: 0, pending: 0, unresolved: 0, isCritical: false },
    ]
  }
];

export function ComplaintTypePopup({ isOpen, onClose, complaintType, stats }: ComplaintTypePopupProps) {
  const [subTypes, setSubTypes] = React.useState<ComplaintSubType[]>([]);
  const resolutionRate = stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0;

  // Generate mock data for sub-types based on the overall stats
  React.useEffect(() => {
    let baseSubTypes: ComplaintSubType[] = [];
    let totalSubTypes = 0;
    
    if (complaintType === 'water') {
      baseSubTypes = WATER_SUB_TYPES;
      totalSubTypes = baseSubTypes.length;
    } else if (complaintType === 'sewerage') {
      baseSubTypes = SEWERAGE_SUB_TYPES;
      totalSubTypes = baseSubTypes.length;
    } else if (complaintType === 'other') {
      // Flatten all other sub-types
      baseSubTypes = OTHER_SUB_TYPES.flatMap(category => category.subTypes);
      totalSubTypes = baseSubTypes.length;
    }
    
    // Distribute the total complaints among sub-types
    const remainingTotal = stats.total;
    const remainingResolved = stats.resolved;
    const remainingPending = stats.pending;
    const remainingUnresolved = stats.unresolved;
    
    const newSubTypes = baseSubTypes.map((subType, index) => {
      // Distribute complaints proportionally
      const count = Math.floor(remainingTotal * (1 / totalSubTypes)) + 
                   (index < (remainingTotal % totalSubTypes) ? 1 : 0);
      
      // Distribute resolved complaints
      const resolved = Math.floor(remainingResolved * (count / remainingTotal));
      
      // Distribute unresolved complaints
      const unresolved = Math.floor(remainingUnresolved * (count / remainingTotal));
      
      // Remaining are pending
      const pending = count - resolved - unresolved;
      
      // For "other" complaints, preserve the predefined critical status
      // For water/sewerage, determine if critical (high unresolved or pending ratio)
      const isCritical = complaintType === 'other' 
        ? subType.isCritical 
        : (unresolved / Math.max(count, 1)) > 0.3 || (pending / Math.max(count, 1)) > 0.4;
      
      return {
        ...subType,
        count,
        resolved,
        pending,
        unresolved,
        isCritical
      };
    });
    
    setSubTypes(newSubTypes);
  }, [complaintType, stats]);

  const getPopupTitle = () => {
    switch (complaintType) {
      case 'water':
        return 'Water Complaints Breakdown';
      case 'sewerage':
        return 'Sewerage Complaints Breakdown';
      case 'other':
        return 'Other Complaints Breakdown';
      default:
        return 'Complaints Breakdown';
    }
  };

  const getPopupIcon = () => {
    switch (complaintType) {
      case 'water':
        return <Droplets className="h-10 w-10 text-cyan-300" />;
      case 'sewerage':
        return <Waves className="h-10 w-10 text-purple-300" />;
      case 'other':
        return (
          <svg className="h-10 w-10 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    if (resolutionRate < 60) {
      return <Badge variant="destructive" className="text-sm">CRITICAL</Badge>;
    } else if (resolutionRate < 75) {
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-sm">WARNING</Badge>;
    }
    return <Badge variant="outline" className="text-sm text-white">NORMAL</Badge>;
  };

  const getCriticalCount = () => {
    return subTypes.filter(st => st.isCritical).length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-white/20">
        <DialogHeader className="pb-4 border-b border-white/20">
          <DialogTitle className="text-3xl font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-4">
              {getPopupIcon()}
              {getPopupTitle()}
            </span>
            {getStatusBadge()}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Detailed breakdown of {complaintType} complaint sub-types with critical issue highlighting
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-6 max-h-[70vh]">
          <div className="space-y-6 pb-4">
            {/* Summary Statistics */}
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Summary Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-cyan-400">{stats.total}</div>
                  <div className="text-sm text-slate-400">Total Complaints</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.resolved}</div>
                  <div className="text-sm text-slate-400">Resolved</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-400">{stats.pending}</div>
                  <div className="text-sm text-slate-400">Pending</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-400">{stats.unresolved}</div>
                  <div className="text-sm text-slate-400">Unresolved</div>
                </div>
              </CardContent>
            </Card>

            {/* Critical Issues Summary */}
            {getCriticalCount() > 0 && (
              <Card className="bg-red-500/10 border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                    Critical Issues Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300">
                    {getCriticalCount()} out of {subTypes.length} complaint types require immediate attention
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Sub-Type Breakdown */}
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Sub-Type Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subTypes.map((subType) => (
                    <div
                      key={subType.name}
                      className={cn(
                        "p-4 rounded-lg border transition-all",
                        subType.isCritical 
                          ? "bg-red-500/20 border-red-500/50 animate-pulse" 
                          : "bg-slate-800/50 border-white/20 hover:bg-slate-700/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {subType.isCritical && (
                            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                          )}
                          <div>
                            <div className="font-semibold text-white">{subType.name}</div>
                            {subType.isCritical && (
                              <div className="text-xs text-red-400 font-medium">CRITICAL ISSUE</div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-cyan-400 font-bold">{subType.count}</div>
                            <div className="text-slate-400">Total</div>
                          </div>
                          <div className="text-center">
                            <div className="text-green-400 font-bold">{subType.resolved}</div>
                            <div className="text-slate-400">Resolved</div>
                          </div>
                          <div className="text-center">
                            <div className="text-amber-400 font-bold">{subType.pending}</div>
                            <div className="text-slate-400">Pending</div>
                          </div>
                          <div className="text-center">
                            <div className="text-red-400 font-bold">{subType.unresolved}</div>
                            <div className="text-slate-400">Unresolved</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar for this sub-type */}
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Resolution Progress</span>
                          <span>{subType.resolved > 0 ? ((subType.resolved / subType.count) * 100).toFixed(0) : '0'}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              subType.resolved >= subType.count * 0.8 ? "bg-green-500" : 
                              subType.resolved >= subType.count * 0.5 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${Math.min((subType.resolved / Math.max(subType.count, 1)) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insights and Recommendations */}
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Insights & Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-4 rounded-lg border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      <span className="font-semibold text-white">Resolution Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{resolutionRate.toFixed(1)}%</div>
                    <div className="text-sm text-slate-300 mt-1">
                      {resolutionRate >= 80 ? "Excellent performance" : 
                       resolutionRate >= 60 ? "Good performance, room for improvement" : 
                       "Critical attention needed"}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-500/20 to-red-500/20 p-4 rounded-lg border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-amber-400" />
                      <span className="font-semibold text-white">Critical Issues</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{getCriticalCount()}</div>
                    <div className="text-sm text-slate-300 mt-1">
                      {getCriticalCount() === 0 ? "No critical issues detected" : 
                       getCriticalCount() <= 3 ? "Moderate issues requiring attention" : 
                       "Multiple critical issues need immediate action"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-white">Recommended Actions:</div>
                  {getCriticalCount() > 0 ? (
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>Focus resources on the {getCriticalCount()} critical complaint types</li>
                      <li>Prioritize unresolved cases in critical categories</li>
                      <li>Review field team allocation for high-volume sub-types</li>
                      <li>Implement targeted resolution strategies for critical issues</li>
                    </ul>
                  ) : (
                    <p className="text-slate-300">Continue current performance and monitor for emerging issues.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="flex justify-end space-x-3 pt-4 border-t border-white/20">
          <Button variant="outline" onClick={onClose} className="border-white/30 text-white hover:bg-white/10">
            Close
          </Button>
          <Button 
            onClick={() => {
              // In a real app, this would trigger escalation for critical issues
              alert(`Escalation initiated for critical ${complaintType} issues`);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Escalate Critical Issues
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}