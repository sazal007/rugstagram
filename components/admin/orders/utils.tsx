

import React from 'react';
import { CheckCircle, Clock, RefreshCw, Truck, XCircle, Package } from 'lucide-react';
import { OrderStatus, OrderStage } from '@/types/order';

export const STAGES: OrderStage[] = [
  "Wool Sorting",
  "Carding",
  "Spinning",
  "Pot Dyeing",
  "Graph Creation",
  "Hand Knotting",
  "Trimming",
  "Washing",
  "Stretching",
  "Finishing",
  "Shipping",
  "Delivered",
];

export const formatCurrency = (amount: string | number): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return '$0.00';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericAmount);
};


export const formatDate = (dateString: string, includeTime = false): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = includeTime
      ? { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }
      : { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } catch {
    return 'Invalid Date';
  }
};

export const getStatusIcon = (status?: OrderStatus): React.ReactNode => {
  const icons: Record<OrderStatus, React.ReactNode> = {
    delivered: <CheckCircle className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />,
    processing: <RefreshCw className="w-4 h-4" />,
    shipped: <Truck className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />,
  };
  return status ? icons[status] : <Package className="w-4 h-4" />;
};

export const getStatusColor = (status?: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    delivered: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return status ? colors[status] : 'bg-gray-100 text-gray-800';
};