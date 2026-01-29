import React, { useEffect, useState } from 'react';
import { TVMetricCard } from '../components/TVMetricCard';
import { CriticalTable } from '../components/CriticalTable';
import { KeyInsights } from '../components/KeyInsights';
import { MonthlyTrendChart } from '../components/MonthlyTrendChart';
import {
  metrics as initialMetrics,
  townStats,
  calculateMetrics,
  complaints
} from '@/lib/mockData';
import { Droplets, Waves, CheckCircle2, XCircle, AlertTriangle, TrendingUp, Clock, Award } from 'lucide-react';

export default function Index() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(calculateMetrics(complaints));
      setLastUpdate(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate water and sewerage breakdown (all time)
  const waterComplaints = complaints.filter(c => c.type === 'water');
  const sewerageComplaints = complaints.filter(c => c.type === 'sewerage');
  
  const waterStats = {
    total: waterComplaints.length,
    resolved: waterComplaints.filter(c => c.status === 'resolved').length,
    unresolved: waterComplaints.filter(c => c.status === 'unresolved').length,
    pending: waterComplaints.filter(c => c.status === 'pending').length
  };
  
  const sewerageStats = {
    total: sewerageComplaints.length,
    resolved: sewerageComplaints.filter(c => c.status === 'resolved').length,
    unresolved: sewerageComplaints.filter(c => c.status === 'unresolved').length,
    pending: sewerageComplaints.filter(c => c.status === 'pending').length
  };

  // Calculate insights
  const insights = [
    {
      title: 'Idle Complaints',
      value: `${metrics.idleComplaints}`,
      description: 'Complaints untouched for 2+ days - IMMEDIATE ACTION REQUIRED',
      type: 'critical' as const,
      icon: <AlertTriangle className="h-8 w-8 text-red-300" />
    },
    {
      title: 'Resolution Rate',
      value: `${metrics.resolvedPercentage.toFixed(0)}%`,
      description: metrics.resolvedPercentage < 80 
        ? 'Below 80% target - needs improvement' 
        : 'Meeting target - maintain performance',
      type: metrics.resolvedPercentage < 80 ? 'warning' as const : 'success' as const,
      icon: <TrendingUp className="h-8 w-8 text-amber-300" />
    },
    {
      title: 'Avg Response Time',
      value: '18.5h',
      description: 'Average time to first response across all complaints',
      type: 'info' as const,
      icon: <Clock className="h-8 w-8 text-blue-300" />
    },
    {
      title: 'Top Performer',
      value: 'Clifton',
      description: '92% resolution rate with 12h avg TAT',
      type: 'success' as const,
      icon: <Award className="h-8 w-8 text-green-300" />
    }
  ];

  return (
    <div 
      className="min-h-screen bg-background p-6"
      style={{
        backgroundImage: `url('/frontend/public/BG Image.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-[2000px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">
              KWSC DASHBOARD
            </h1>
            <p className="text-xl text-gray-200 mt-1 drop-shadow-md">
              Real-Time Complaint Monitoring System
            </p>
          </div>
          <div className="text-right bg-black/70 backdrop-blur-sm p-4 rounded-xl border-2 border-white/30">
            <p className="text-sm text-gray-300">Last Updated</p>
            <p className="text-xl font-bold text-white mt-1">
              {lastUpdate.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* Top Row - Main Metrics */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left - Overall Resolved */}
          <div className="col-span-12 lg:col-span-3">
            <TVMetricCard
              title="Total Resolved"
              value={metrics.resolvedComplaints}
              percentage={metrics.resolvedPercentage}
              trend={metrics.dailyChangePercentage}
              color="green"
              size="xlarge"
              icon={<CheckCircle2 className="h-12 w-12 text-green-300" />}
            />
          </div>

          {/* Center - Water & Sewerage Breakdown */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {/* Water Section */}
            <div className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border-2 border-cyan-500/40">
              <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-10 w-10 text-cyan-300" />
                <h2 className="text-2xl font-bold text-white">Water Complaints</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">Total</p>
                  <p className="text-3xl font-bold text-cyan-300">{waterStats.total}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">Resolved</p>
                  <p className="text-3xl font-bold text-green-300">{waterStats.resolved}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-amber-300">{waterStats.pending}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">Unresolved</p>
                  <p className="text-3xl font-bold text-red-300">{waterStats.unresolved}</p>
                </div>
              </div>
            </div>

            {/* Sewerage Section */}
            <div className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border-2 border-purple-500/40">
              <div className="flex items-center gap-3 mb-4">
              <Waves className="h-10 w-10 text-purple-300" />
                <h2 className="text-2xl font-bold text-white">Sewerage Complaints</h2>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">Total</p>
                  <p className="text-3xl font-bold text-purple-300">{sewerageStats.total}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">Resolved</p>
                  <p className="text-3xl font-bold text-green-300">{sewerageStats.resolved}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-amber-300">{sewerageStats.pending}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300 mb-1">Unresolved</p>
                  <p className="text-3xl font-bold text-red-300">{sewerageStats.unresolved}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Overall Unresolved */}
          <div className="col-span-12 lg:col-span-3">
            <TVMetricCard
              title="Total Unresolved"
              value={metrics.unresolvedComplaints}
              percentage={metrics.unresolvedPercentage}
              color="red"
              size="xlarge"
              icon={<XCircle className="h-12 w-12 text-red-300" />}
            />
          </div>
        </div>

        {/* Middle Row - Table and Insights */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left - Key Insights */}
          <div className="col-span-12 lg:col-span-3">
            <KeyInsights insights={insights} />
          </div>

          {/* Right - Critical Table */}
          <div className="col-span-12 lg:col-span-9">
            <CriticalTable data={townStats} />
          </div>
        </div>

        {/* Bottom Row - Monthly Trends */}
        <MonthlyTrendChart />
      </div>
    </div>
  );
}