// Mock data structure matching KWSC complaint pattern
export interface Complaint {
    id: string;
    town: string;
    type: 'water' | 'sewerage' | 'other';
    status: 'resolved' | 'unresolved' | 'pending';
    priority: 'high' | 'medium' | 'low';
    createdAt: Date;
    resolvedAt?: Date;
    tat: number; // Turn Around Time in hours
    satisfactionRating?: number; // 0-100
    lastTouched: Date;
  }
  
export interface TownStats {
  town: string;
  total: number;
  resolved: number;
  unresolved: number;
  pending: number;
  water: number;
  sewerage: number;
  other: number;
  avgTAT: number;
  satisfactionRate: number;
}
  
  export interface DashboardMetrics {
    totalComplaints: number;
    resolvedComplaints: number;
    unresolvedComplaints: number;
    pendingComplaints: number;
    waterComplaints: number;
    sewerageComplaints: number;
    todayComplaints: number;
    monthComplaints: number;
    resolvedPercentage: number;
    unresolvedPercentage: number;
    dailyChangePercentage: number;
    idleComplaints: number;
    lastUpdated: Date;
  }
  
  const towns = [
    'Korangi',
    'Landhi',
    'Malir',
    'Gulshan',
    'Gulistan-e-Johar',
    'North Nazimabad',
    'Liaquatabad',
    'New Karachi',
    'Orangi',
    'SITE',
    'Saddar',
    'Lyari',
    'Keamari',
    'Baldia',
    'Clifton'
  ];
  
  // Generate realistic complaint data
  export const generateComplaints = (count: number): Complaint[] => {
    const complaints: Complaint[] = [];
    const now = new Date();
    
    for (let i = 0; i < count; i++) {
      const createdDaysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date(now.getTime() - createdDaysAgo * 24 * 60 * 60 * 1000);
      const typeRand = Math.random();
      let type: 'water' | 'sewerage' | 'other';
      if (typeRand < 0.45) type = 'water';
      else if (typeRand < 0.9) type = 'sewerage';
      else type = 'other';
      const statusRand = Math.random();
      let status: 'resolved' | 'unresolved' | 'pending';
      let resolvedAt: Date | undefined;
      let tat = 0;
      
      if (statusRand < 0.75) {
        status = 'resolved';
        const resolvedHours = Math.floor(Math.random() * 72) + 1;
        resolvedAt = new Date(createdAt.getTime() + resolvedHours * 60 * 60 * 1000);
        tat = resolvedHours;
      } else if (statusRand < 0.9) {
        status = 'pending';
        tat = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
      } else {
        status = 'unresolved';
        tat = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
      }
      
      const lastTouchedHours = Math.floor(Math.random() * 48);
      const lastTouched = new Date(now.getTime() - lastTouchedHours * 60 * 60 * 1000);
      
      complaints.push({
        id: `KWSC-${String(i + 1).padStart(6, '0')}`,
        town: towns[Math.floor(Math.random() * towns.length)],
        type,
        status,
        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
        createdAt,
        resolvedAt,
        tat,
        satisfactionRating: status === 'resolved' ? Math.floor(Math.random() * 40) + 60 : undefined,
        lastTouched
      });
    }
    
    return complaints;
  };
  
  // Calculate town-wise statistics
  export const calculateTownStats = (complaints: Complaint[]): TownStats[] => {
    const townMap = new Map<string, TownStats>();
    
    towns.forEach(town => {
      townMap.set(town, {
        town,
        total: 0,
        resolved: 0,
        unresolved: 0,
        pending: 0,
        water: 0,
        sewerage: 0,
        other: 0,
        avgTAT: 0,
        satisfactionRate: 0
      });
    });
    
    complaints.forEach(complaint => {
      const stats = townMap.get(complaint.town)!;
      stats.total++;
      
      if (complaint.status === 'resolved') stats.resolved++;
      else if (complaint.status === 'unresolved') stats.unresolved++;
      else stats.pending++;
      
      if (complaint.type === 'water') stats.water++;
      else if (complaint.type === 'sewerage') stats.sewerage++;
      else stats.other++;
    });
    
    // Calculate averages
    townMap.forEach((stats, town) => {
      const townComplaints = complaints.filter(c => c.town === town);
      const resolvedComplaints = townComplaints.filter(c => c.status === 'resolved');
      
      if (resolvedComplaints.length > 0) {
        stats.avgTAT = resolvedComplaints.reduce((sum, c) => sum + c.tat, 0) / resolvedComplaints.length;
        const ratingsSum = resolvedComplaints
          .filter(c => c.satisfactionRating)
          .reduce((sum, c) => sum + (c.satisfactionRating || 0), 0);
        stats.satisfactionRate = ratingsSum / resolvedComplaints.length;
      }
    });
    
    return Array.from(townMap.values()).sort((a, b) => b.total - a.total);
  };
  
  // Calculate dashboard metrics
  export const calculateMetrics = (complaints: Complaint[]): DashboardMetrics => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const todayComplaints = complaints.filter(c => c.createdAt >= todayStart).length;
    const yesterdayComplaints = complaints.filter(
      c => c.createdAt >= yesterdayStart && c.createdAt < todayStart
    ).length;
    const monthComplaints = complaints.filter(c => c.createdAt >= monthStart).length;
    
    const resolved = complaints.filter(c => c.status === 'resolved').length;
    const unresolved = complaints.filter(c => c.status === 'unresolved').length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const water = complaints.filter(c => c.type === 'water').length;
    const sewerage = complaints.filter(c => c.type === 'sewerage').length;
    
    const idleComplaints = complaints.filter(c => {
      const hoursSinceTouch = (now.getTime() - c.lastTouched.getTime()) / (1000 * 60 * 60);
      return c.status !== 'resolved' && hoursSinceTouch >= 48;
    }).length;
    
    const dailyChange = yesterdayComplaints > 0 
      ? ((todayComplaints - yesterdayComplaints) / yesterdayComplaints) * 100 
      : 0;
    
    return {
      totalComplaints: complaints.length,
      resolvedComplaints: resolved,
      unresolvedComplaints: unresolved,
      pendingComplaints: pending,
      waterComplaints: water,
      sewerageComplaints: sewerage,
      todayComplaints,
      monthComplaints,
      resolvedPercentage: (resolved / complaints.length) * 100,
      unresolvedPercentage: (unresolved / complaints.length) * 100,
      dailyChangePercentage: dailyChange,
      idleComplaints,
      lastUpdated: now
    };
  };
  
  // Get best performers
  export const getBestPerformers = (townStats: TownStats[]) => {
    return townStats
      .filter(t => t.resolved > 0)
      .sort((a, b) => {
        const scoreA = (a.satisfactionRate * 0.6) + ((1 / a.avgTAT) * 100 * 0.4);
        const scoreB = (b.satisfactionRate * 0.6) + ((1 / b.avgTAT) * 100 * 0.4);
        return scoreB - scoreA;
      })
      .slice(0, 5);
  };
  
  // Generate initial data
  export const complaints = generateComplaints(2500);
  export const townStats = calculateTownStats(complaints);
  export const metrics = calculateMetrics(complaints);
  export const bestPerformers = getBestPerformers(townStats);

  // Debug: Log complaint distribution to verify "other" complaints are being generated
  const complaintCounts = complaints.reduce((acc, complaint) => {
    acc[complaint.type] = (acc[complaint.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('Complaint distribution:', complaintCounts);
