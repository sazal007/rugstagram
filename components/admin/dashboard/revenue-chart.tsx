

"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';
import { useRevenueData } from '@/hooks/use-dashboard';
import { RevenueFilterType, RevenueDataItem } from '@/types/dashboard';
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: RevenueDataItem & { period: string };
  }>;
  label?: string;
}

const formatPeriodLabel = (period: string, type: RevenueFilterType): string => {
  const date = new Date(period);
  if (isNaN(date.getTime())) return period;

  switch (type) {
    case 'daily':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    case 'weekly':
     
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
      return `W${Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)}`;
    case 'monthly':
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    case 'yearly':
      return date.getFullYear().toString();
    default:
      return period;
  }
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as RevenueDataItem & { period: string };
    return (
      <div className="max-w-xs p-2 bg-white border border-gray-200 rounded-lg shadow-lg sm:p-3">
        <p className="text-xs font-medium text-gray-800 sm:text-sm">{label}</p>
        <p className="text-xs text-green-600 sm:text-sm">Revenue: {formatCurrency(payload[0].value!)}</p>
        {data.order_count && (
          <p className="text-xs text-blue-600 sm:text-sm">Orders: {data.order_count}</p>
        )}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const [filterType, setFilterType] = useState<RevenueFilterType>('daily');
  const { data: response, isLoading, isError, error } = useRevenueData(filterType);

  const formattedData = React.useMemo(() => {
    return response?.data.map(item => ({
      ...item,
      period: formatPeriodLabel(item.period, filterType),
    })) ?? [];
  }, [response, filterType]);

  const yAxisTickFormatter = (value: number) => `$${(value / 1000).toFixed(0)}k`;

  if (isLoading) {
    return (
      <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-4 md:p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="w-1/2 h-4 mb-3 bg-gray-200 rounded sm:h-5 sm:mb-4 md:h-6 sm:w-1/3"></div>
          <div className="h-48 bg-gray-200 rounded sm:h-56 md:h-64 lg:h-72 xl:h-80"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col mb-4 space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between sm:mb-6 lg:mb-8">
        <div className="flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-green-600 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          <h3 className="text-base font-semibold text-gray-800 sm:text-lg md:text-xl lg:text-2xl">
            Revenue Chart
          </h3>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex p-1 bg-gray-100 rounded-lg overflow-x-auto">
          {(['daily', 'weekly', 'monthly', 'yearly'] as RevenueFilterType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterType(filter)}
              className={`shrink-0 px-2 py-1 rounded text-xs font-medium capitalize transition-colors whitespace-nowrap sm:px-3 sm:text-sm md:px-4 md:py-2 ${
                filterType === filter 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-200 rounded-lg sm:p-4">
          <p className="text-sm font-medium sm:text-base">Error loading chart data</p>
          <p className="text-xs sm:text-sm">{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        </div>
      )}

      {/* Chart Section */}
      {formattedData.length > 0 ? (
        <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={formattedData} 
              margin={{ 
                top: 5, 
                right: window.innerWidth < 640 ? 10 : 30, 
                left: window.innerWidth < 640 ? 10 : 20, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="period" 
                stroke="#6b7280" 
                fontSize={window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12}
                tick={{ fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12 }}
                interval={window.innerWidth < 640 ? 'preserveStartEnd' : 0}
                angle={window.innerWidth < 640 ? -45 : 0}
                textAnchor={window.innerWidth < 640 ? 'end' : 'middle'}
                height={window.innerWidth < 640 ? 60 : 30}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12}
                tick={{ fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 768 ? 11 : 12 }}
                tickFormatter={yAxisTickFormatter}
                width={window.innerWidth < 640 ? 40 : window.innerWidth < 768 ? 50 : 60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="total_revenue" 
                name="Revenue" 
                stroke="#10b981" 
                strokeWidth={window.innerWidth < 640 ? 2 : window.innerWidth < 768 ? 2.5 : 3}
                dot={{ 
                  fill: '#10b981', 
                  r: window.innerWidth < 640 ? 3 : window.innerWidth < 768 ? 3.5 : 4 
                }} 
                activeDot={{ 
                  r: window.innerWidth < 640 ? 4 : window.innerWidth < 768 ? 5 : 6, 
                  fill: '#059669' 
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
         !isLoading && (
            <div className="py-6 text-center sm:py-8 md:py-12">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400 sm:w-10 sm:h-10 sm:mb-3 md:w-12 md:h-12" />
              <p className="text-sm text-gray-600 sm:text-base md:text-lg">
                No revenue data available for this period.
              </p>
            </div>
         )
      )}
    </div>
  );
}