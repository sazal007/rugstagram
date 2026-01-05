

"use client";
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { StatCard, LoadingState, RevenueChart } from '@/components/admin/dashboard';
import { useDashboardStats } from '@/hooks/use-dashboard';

export default function AdminDashboard() {
  const { data, isLoading, isError, error, refetch } = useDashboardStats();

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const stats = {
    totalProducts: data?.total_products ?? 0,
    totalOrders: data?.total_orders ?? 0,
    pendingOrders: data?.pending_orders ?? 0,
    revenue: data?.total_revenue ?? 0
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleRefresh}
            className="flex items-center cursor-pointer px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-100 disabled:opacity-50"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2  ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {isError && (
          <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-200 rounded-lg">
            <p className="font-medium">Error loading dashboard data</p>
            <p className="text-sm">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Products" value={stats.totalProducts} icon="Package" iconColor="blue" />
          <StatCard title="Total Orders" value={stats.totalOrders} icon="ShoppingCart" iconColor="purple" />
          <StatCard title="Pending Orders" value={stats.pendingOrders} icon="Clock" iconColor="yellow" />
          <StatCard title="Total Revenue" value={stats.revenue} icon="DollarSign" iconColor="green" isCurrency />
        </div>

        <div className="mb-8">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
}