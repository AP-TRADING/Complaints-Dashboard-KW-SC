import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TownStats } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface TownDetailPopupProps {
  town: TownStats;
  isOpen: boolean;
  onClose: () => void;
}

// Mock XEN and attendance data
const mockXENData = {
  'Korangi': { name: 'Mr. Ahmed Khan', contact: '+92-300-1234567', email: 'ahmed.khan@kws.gov.pk' },
  'Landhi': { name: 'Ms. Fatima Ali', contact: '+92-300-2345678', email: 'fatima.ali@kws.gov.pk' },
  'Malir': { name: 'Mr. Usman Shah', contact: '+92-300-3456789', email: 'usman.shah@kws.gov.pk' },
  'Gulshan': { name: 'Ms. Ayesha Siddiqui', contact: '+92-300-4567890', email: 'ayesha.siddiqui@kws.gov.pk' },
  'Gulistan-e-Johar': { name: 'Mr. Bilal Raza', contact: '+92-300-5678901', email: 'bilal.raza@kws.gov.pk' },
  'North Nazimabad': { name: 'Ms. Hina Qureshi', contact: '+92-300-6789012', email: 'hina.qureshi@kws.gov.pk' },
  'Liaquatabad': { name: 'Mr. Farhan Ahmed', contact: '+92-300-7890123', email: 'farhan.ahmed@kws.gov.pk' },
  'New Karachi': { name: 'Ms. Sana Malik', contact: '+92-300-8901234', email: 'sana.malik@kws.gov.pk' },
  'Orangi': { name: 'Mr. Imran Hussain', contact: '+92-300-9012345', email: 'imran.hussain@kws.gov.pk' },
  'SITE': { name: 'Ms. Maria Khan', contact: '+92-300-0123456', email: 'maria.khan@kws.gov.pk' },
  'Saddar': { name: 'Mr. Tariq Mehmood', contact: '+92-300-1234567', email: 'tariq.mehmood@kws.gov.pk' },
  'Lyari': { name: 'Ms. Zainab Ali', contact: '+92-300-2345678', email: 'zainab.ali@kws.gov.pk' },
  'Keamari': { name: 'Mr. Nadeem Akhtar', contact: '+92-300-3456789', email: 'nadeem.akhtar@kws.gov.pk' },
  'Baldia': { name: 'Ms. Rabia Shah', contact: '+92-300-4567890', email: 'rabia.shah@kws.gov.pk' },
  'Clifton': { name: 'Mr. Haris Ahmed', contact: '+92-300-5678901', email: 'haris.ahmed@kws.gov.pk' },
};

const mockAttendanceData = {
  'Korangi': { present: 18, absent: 2, total: 20, percentage: 90 },
  'Landhi': { present: 16, absent: 4, total: 20, percentage: 80 },
  'Malir': { present: 19, absent: 1, total: 20, percentage: 95 },
  'Gulshan': { present: 17, absent: 3, total: 20, percentage: 85 },
  'Gulistan-e-Johar': { present: 15, absent: 5, total: 20, percentage: 75 },
  'North Nazimabad': { present: 18, absent: 2, total: 20, percentage: 90 },
  'Liaquatabad': { present: 16, absent: 4, total: 20, percentage: 80 },
  'New Karachi': { present: 19, absent: 1, total: 20, percentage: 95 },
  'Orangi': { present: 14, absent: 6, total: 20, percentage: 70 },
  'SITE': { present: 17, absent: 3, total: 20, percentage: 85 },
  'Saddar': { present: 18, absent: 2, total: 20, percentage: 90 },
  'Lyari': { present: 15, absent: 5, total: 20, percentage: 75 },
  'Keamari': { present: 16, absent: 4, total: 20, percentage: 80 },
  'Baldia': { present: 19, absent: 1, total: 20, percentage: 95 },
  'Clifton': { present: 17, absent: 3, total: 20, percentage: 85 },
};

export function TownDetailPopup({ town, isOpen, onClose }: TownDetailPopupProps) {
  const xenData = mockXENData[town.town as keyof typeof mockXENData];
  const attendanceData = mockAttendanceData[town.town as keyof typeof mockAttendanceData];
  const resolutionRate = (town.resolved / town.total) * 100;

  const getStatusBadge = () => {
    if (town.pending > 50 || resolutionRate < 60) {
      return <Badge variant="destructive" className="text-sm">CRITICAL</Badge>;
    } else if (town.pending > 30 || resolutionRate < 75) {
      return <Badge className="bg-amber-500 hover:bg-amber-600 text-sm">WARNING</Badge>;
    }
    return <Badge variant="outline" className="text-sm text-white">NORMAL</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-white/20">
        <DialogHeader className="pb-4 border-b border-white/20">
          <DialogTitle className="text-3xl font-bold text-white flex items-center justify-between">
            <span>{town.town} - Detailed Analysis</span>
            {getStatusBadge()}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Comprehensive overview of complaint status, XEN information, and team performance
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4">
            {/* Complaint Statistics */}
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">Complaint Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400">{town.total}</div>
                    <div className="text-sm text-slate-400">Total Complaints</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{town.resolved}</div>
                    <div className="text-sm text-slate-400">Resolved</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-amber-400">{town.pending}</div>
                    <div className="text-sm text-slate-400">Pending</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-400">{town.unresolved}</div>
                    <div className="text-sm text-slate-400">Unresolved</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-xl font-bold text-cyan-400">{town.water}</div>
                    <div className="text-sm text-slate-400">Water Complaints</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-xl font-bold text-purple-400">{town.sewerage}</div>
                    <div className="text-sm text-slate-400">Sewerage Complaints</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Resolution Rate</span>
                    <span className="font-bold text-white">{resolutionRate.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        resolutionRate >= 75 ? "bg-green-500" : resolutionRate >= 60 ? "bg-amber-500" : "bg-red-500"
                      )}
                      style={{ width: `${resolutionRate}%` }}
                    />
                  </div>
                </div>

                {town.avgTAT > 0 && (
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-lg font-bold text-white">{town.avgTAT.toFixed(1)} hours</div>
                    <div className="text-sm text-slate-400">Average Turnaround Time</div>
                  </div>
                )}

                {town.satisfactionRate > 0 && (
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <div className="text-lg font-bold text-white">{town.satisfactionRate.toFixed(1)}%</div>
                    <div className="text-sm text-slate-400">Customer Satisfaction</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* XEN Information */}
            <Card className="bg-black/50 border-white/20">
              <CardHeader>
                <CardTitle className="text-xl text-white">XEN Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-800/50 p-6 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {xenData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white">{xenData.name}</div>
                      <div className="text-slate-400">Executive Engineer (XEN)</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-white">
                    <span className="text-cyan-400">📞</span>
                    <span className="font-medium">Contact:</span>
                    <span className="text-slate-300">{xenData.contact}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white">
                    <span className="text-cyan-400">✉️</span>
                    <span className="font-medium">Email:</span>
                    <span className="text-slate-300">{xenData.email}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg border border-white/20">
                  <div className="text-sm text-slate-300 mb-2">Direct Line</div>
                  <div className="text-lg font-bold text-white">+92-21-12345678</div>
                  <div className="text-xs text-slate-400 mt-1">Office Hours: 9:00 AM - 5:00 PM</div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Information */}
            <Card className="bg-black/50 border-white/20 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-white">Team Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-400">{attendanceData.present}</div>
                    <div className="text-sm text-slate-400 mt-2">Present</div>
                  </div>
                  
                  <div className="bg-slate-800/50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-red-400">{attendanceData.absent}</div>
                    <div className="text-sm text-slate-400 mt-2">Absent</div>
                  </div>
                  
                  <div className="bg-slate-800/50 p-6 rounded-lg text-center">
                    <div className="text-3xl font-bold text-white">{attendanceData.total}</div>
                    <div className="text-sm text-slate-400 mt-2">Total Staff</div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Attendance Rate</span>
                    <span className="text-2xl font-bold text-green-400">{attendanceData.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-4">
                    <div 
                      className="h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${attendanceData.percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-4 rounded-lg border border-white/20">
                    <div className="text-sm text-slate-300 mb-2">Monthly Target</div>
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div className="text-xs text-slate-400 mt-1">Minimum required attendance</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-500/20 to-red-500/20 p-4 rounded-lg border border-white/20">
                    <div className="text-sm text-slate-300 mb-2">Performance Gap</div>
                    <div className={cn(
                      "text-2xl font-bold",
                      attendanceData.percentage >= 95 ? "text-green-400" : "text-amber-400"
                    )}>
                      {Math.max(0, 95 - attendanceData.percentage)}%
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Below target</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card className="bg-black/50 border-white/20 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-white">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {town.pending > 30 && (
                    <div className="bg-amber-500/20 border border-amber-500/50 p-4 rounded-lg">
                      <div className="font-semibold text-amber-400">High Pending Cases</div>
                      <div className="text-slate-300 text-sm mt-2">
                        {town.pending} pending complaints require immediate attention. 
                        Consider deploying additional field staff to clear the backlog.
                      </div>
                    </div>
                  )}
                  
                  {resolutionRate < 75 && (
                    <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg">
                      <div className="font-semibold text-red-400">Low Resolution Rate</div>
                      <div className="text-slate-300 text-sm mt-2">
                        Resolution rate is below 75%. Review field team efficiency 
                        and complaint handling procedures.
                      </div>
                    </div>
                  )}
                  
                  {attendanceData.percentage < 90 && (
                    <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg">
                      <div className="font-semibold text-red-400">Attendance Concern</div>
                      <div className="text-slate-300 text-sm mt-2">
                        Attendance rate is below 90%. Coordinate with XEN to 
                        improve team availability.
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-lg">
                    <div className="font-semibold text-green-400">Strengths</div>
                    <div className="text-slate-300 text-sm mt-2">
                      {town.water > town.sewerage ? "Strong performance in water complaint resolution" : "Strong performance in sewerage complaint resolution"}
                    </div>
                  </div>
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
              // In a real app, this would trigger a notification or escalation
              alert(`Escalation initiated for ${town.town}`);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Escalate Issue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}